import React, { useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import AuthUser from './AuthUser';

export default function EditWpis({ match }) {
    const { id } = useParams();
  const { wpisy, fetchPosts, http, user } = AuthUser();

  const [tytul, setTytul] = useState('');
  const [wpis, setWpis] = useState({});
  const [tresc, setTresc] = useState('');
  const [userId, setUserId] = useState('');
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

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
    }
  }, [id, wpisy]);
  

  const handleUpdate = async () => {
    try {
      const response = await http.put(`/wpisy/${id}`, {
        tytul: tytul,
        tresc: tresc,
        user_id: user.id,
      });
      console.log('Wpis został zaktualizowany:', response.data);
      setShowSuccessAlert(true);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div><div class="container">
      <center><h1 class="mt-4 mb-4">Edytuj Wpis</h1></center>
  <div className="col-md-8 offset-md-2">
    {showSuccessAlert && (
                        <div className="alert alert-success" role="alert">
                        Wpis został zmieniony pomyślnie!
                        </div>
                    )}
      <div class="form-group">
        <label htmlFor="tytul">Tytuł:</label>
        <input
          type="tytul"
          class="form-control"
          id="tytul"
          value={tytul}
          onChange={(e) => setTytul(e.target.value)}
        ></input>
      </div>
      <div class="form-group">
        <label htmlFor="tresc">Treść:</label>
        <textarea
          class="form-control"
          id="tresc"
          rows="5"
          value={tresc}
          onChange={(e) => setTresc(e.target.value)}
        ></textarea>
      </div>
      <button className="btn btn-primary" onClick={handleUpdate}>
        Zaktualizuj
      </button>
      </div>
      </div>
    </div>
  );
}
