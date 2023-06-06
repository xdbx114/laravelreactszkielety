import React, { useState } from 'react';
import {toast} from 'react-toastify';
import axios from 'axios';
import AuthUser from './AuthUser';
import { useNavigate } from 'react-router-dom';

export default function Addwpis() {
  const { user } = AuthUser(); // Pobierz użytkownika z kontekstu autoryzacji

  const [tytul, setTytul] = useState('');
  const [tresc, setTresc] = useState('');
  const navigate = useNavigate();

  const notifyadd = () => {
    toast.success('Pomyślnie dodano wpis!', { autoClose: 5000 });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === 'tytul') {
      setTytul(value);
    }
    if (name === 'tresc') {
      setTresc(value);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:8000/api/wpisy', {
        tytul: tytul,
        tresc: tresc,
        user_id: user.id, // Użyj ID zalogowanego użytkownika
      });

      console.log(response.data);
      notifyadd();
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
       <div class="container">
    <center><h1 class="mt-4 mb-4">Dodaj Wpis</h1></center>
    <div className="col-md-8 offset-md-2">
    <form onSubmit={handleSubmit}>
      <div class="form-group">
        <label for="tytul">Tytuł:</label>
        <input
          type="text"
          class="form-control"
          id="tytul"
          name="tytul"
          value={tytul}
          onChange={handleInputChange}
          required
        />
      </div>
      <div class="form-group">
        <label for="tresc">Treść:</label>
        <textarea
          class="form-control"
          id="tresc"
          name="tresc"
          rows="5"
          value={tresc}
          onChange={handleInputChange}
          required
        ></textarea>
      </div>
      <button type="submit" class="btn btn-primary btn-block">Dodaj</button>
    </form>
  </div>
  </div>
    </div>
  );
}
