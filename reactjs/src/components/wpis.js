import React, { useEffect, useState} from 'react';
import {toast} from 'react-toastify';
import { useParams } from 'react-router-dom';
import AuthUser from './AuthUser';


export default function Wpis() {//To dopiero szablon szczegółów wpisu oraz sekcji komentarzy. 
  const { id } = useParams();
  const { wpisy, fetchPosts, getUserNickById, fetchComments, komentarze, http, user } = AuthUser();
  const [tytul, setTytul] = useState('');
  const [wpis, setWpis] = useState({});
  const [tresc, setTresc] = useState('');
  const [userId, setUserId] = useState('');
  const [nowyKomentarz, setNowyKomentarz] = useState({ autor: '', tresc: '' });
  const handleInputChange = (event) => {
    setNowyKomentarz({
      ...nowyKomentarz,
      [event.target.name]: event.target.value,
    });
  };

  const dodajKomentarz = async (event) => {
    event.preventDefault();
  
    try {
      const response = await http.post('/comments', {
        content: nowyKomentarz.tresc,
        user_id: user.id,
        wpis_id: wpis.id,
      });
      setNowyKomentarz({ tresc: '' });
      fetchComments(wpis.id);
      toast.success('Komentarz został dodany');
    } catch (error) {
      console.error(error);
      toast.error('Pole treści komentarza nie może być puste!');
    }
  };

  const usunKomentarz = async (komentarzId) => {
    try {
      await http.delete(`/comments/${komentarzId}`);
      fetchComments(wpis.id);
      toast.success('Komentarz został usunięty');
    } catch (error) {
      console.error(error);
      toast.error('Wystąpił błąd podczas usuwania komentarza');
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  useEffect(() => {
    const selectedWpis = wpisy.find((item) => item.id === parseInt(id));
    if (selectedWpis) {
      setWpis(selectedWpis);
      setTytul(selectedWpis.tytul);
      setTresc(selectedWpis.tresc);
      setUserId(selectedWpis.user_id);
      fetchComments(selectedWpis.id);
    }
  }, [id, wpisy]);

  return (
  <div class="row">
    <div class="col-md-8 offset-md-2">
      <div class="card mt-4">
        <div class="card-body">
          <h5 class="card-title">{tytul}</h5>
          <h6 class="card-subtitle mb-2 text-muted">{getUserNickById(wpis.user_id)} | ID:{userId}</h6>
          <p class="card-text">{tresc}</p>
        </div>
      </div>

      <div class="card mt-4">
        <div class="card-body">
          <h5 class="card-title">Komentarze</h5>
          {komentarze.length > 0 ? (
      <ul className="list-group">
        {komentarze.map((komentarz) => (
          <li className="list-group-item" key={komentarz.id}>
            <h6 className="mb-0">{getUserNickById(komentarz.user_id)}</h6>
            <p className="mb-2">{komentarz.content}</p>
            <button
              type="button"
              className="btn btn-danger btn-sm"
              onClick={() => usunKomentarz(komentarz.id)}
            >
              Usuń
            </button>
          </li>
        ))}
      </ul>
        ) : (
          <div class="alert alert-secondary" role="alert">Brak komentarzy<b> Dodaj nowy poniżej!</b></div>
        )}
        </div>
      </div>

      <div class="card mt-4">
        <div class="card-body">
          <h5 class="card-title">Dodaj komentarz</h5>
          <form onSubmit={dodajKomentarz}>
          <div className="form-group">
            <label htmlFor="comment">Treść komentarza</label>
            <textarea
              className="form-control"
              id="comment"
              rows="3"
              name="tresc"
              value={nowyKomentarz.tresc}
              onChange={handleInputChange}
            ></textarea>
          </div>
          <button type="submit" className="btn btn-primary">
            Dodaj
          </button>
        </form>
        </div>
      </div>
    </div>
  </div>
  );
}