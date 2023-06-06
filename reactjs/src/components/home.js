import React, { useEffect} from 'react';
import AuthUser from './AuthUser';
import { Link, useNavigate } from 'react-router-dom';

export default function AddWpis() {
  const { wpisy, fetchPosts, fetchUsers, getUserNickById, http } = AuthUser();
  const navigate = useNavigate();

  useEffect(() => {
    fetchPosts();
    fetchUsers();
  }, []);

  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
  };

  const handleDelete = async (wpisId) => {
    try {
      await http.delete(`/wpisy/${wpisId}`);
      fetchPosts();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div className="container">
        <center>
          <h1 className="mt-4 mb-4">Posty</h1>
        </center>
        <div className="row">
          <div className="col-md-8 offset-md-2">
            <center>
              <Link to="/addwpis" className="btn btn-success">
                Dodaj post
              </Link>
            </center>
          </div>
        </div>
        <br></br>
        <div className="row">
          <div className="col-md-8 offset-md-2">
            {wpisy.map((wpis) => (
              <div className="card mb-4" key={wpis.id}>
                <div className="card-body">
                  <h5 className="card-title">{wpis.tytul}</h5>
                  <h6 className="card-subtitle mb-2 text-muted">
                  {getUserNickById(wpis.user_id)}
                  </h6>
                  <p className="card-text">{wpis.tresc}</p>
                  <button
                    className="btn btn-primary"
                    onClick={() => handleEdit(wpis.id)}
                  >
                    Edytuj
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(wpis.id)}
                  >
                    Usuń
                  </button>
                  <a href="#" className="btn btn-info">
                    Komentarze (0)
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
