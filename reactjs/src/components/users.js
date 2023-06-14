import { useEffect } from "react";
import AuthUser from './AuthUser';

export default function Users() {
    const { fetchUsers, users } = AuthUser();

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <table className="table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nick</th>
          <th>Email</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.id}>
            <td>{user.id}</td>
            <td>{user.name}</td>
            <td>{user.email}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}