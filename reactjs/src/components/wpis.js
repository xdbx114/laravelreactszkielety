import React, { useEffect, useState} from 'react';
import {toast} from 'react-toastify';
import { useParams } from 'react-router-dom';
import AuthUser from './AuthUser';


export default function Wpis() {//To dopiero szablon szczegółów wpisu oraz sekcji komentarzy. 
  const { id } = useParams();
  const { wpisy, fetchPosts, getUserNickById, fetchComments, komentarze } = AuthUser();
  const [tytul, setTytul] = useState('');
  const [wpis, setWpis] = useState({});
  const [tresc, setTresc] = useState('');
  const [userId, setUserId] = useState('');

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
          <ul class="list-group">
              {komentarze.map((komentarz) => (
                <li className="list-group-item" key={komentarz.id}>
                  <h6 className="mb-0">{getUserNickById(komentarz.user_id)}</h6>
                  <p className="mb-2">{komentarz.content}</p>
                </li>
              ))}
          </ul>
        </div>
      </div>

      <div class="card mt-4">
        <div class="card-body">
          <h5 class="card-title">Dodaj komentarz</h5>
          <form>
            <div class="form-group">
              <label for="author">Autor</label>
              <input type="text" class="form-control" id="author"/>
            </div>
            <div class="form-group">
              <label for="comment">Treść komentarza</label>
              <textarea class="form-control" id="comment" rows="3"></textarea>
            </div>
            <button type="submit" class="btn btn-primary">Dodaj</button>
          </form>
        </div>
      </div>
    </div>
  </div>
  );
}