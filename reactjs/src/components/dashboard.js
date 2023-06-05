import React, { useEffect, useState } from 'react';
import AuthUser from './AuthUser';
import { Link,useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const { wpisy, fetchPosts } = AuthUser();
  useEffect(() => {
    fetchPosts();
  }, []);
  const navigate = useNavigate();
  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <Link to="/create" className="btn btn-success">
        Dodaj
      </Link>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>User</th>
            <th>Tresc</th>
            <th>Akcje</th>
          </tr>
        </thead>
        <tbody>
          {wpisy.map((wpis) => (
            <tr key={wpis.id}>
              <td>{wpis.id}</td>
              <td>{wpis.user_id}</td>
              <td>{wpis.tresc}</td>
              <td>
                <button
                  className="btn btn-primary"
                  onClick={() => handleEdit(wpis.id)}
                >
                  Edytuj
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
