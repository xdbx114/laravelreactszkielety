// import React, { useState, useEffect } from 'react';
// import AuthUser from './AuthUser';

// const edit = () => {
//   const auth = AuthUser();
//   const [user, setUser] = useState({});
//   const [newName, setNewName] = useState('');

//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const response = await auth.http.get('/users/me');
//         setUser(response.data);
//       } catch (error) {
//         console.error(error);
//       }
//     };

//     fetchUser();
//   }, []);

//   const handleUpdateUser = async () => {
//     const updatedUser = { ...user, name: newName };
//     await auth.updateUser(user.id, updatedUser);
//     setUser(updatedUser);
//   };

//   return (
//     <div>
//       <h2>Edit User</h2>
//       <div>
//         <label htmlFor="name">Name:</label>
//         <input
//           type="text"
//           id="name"
//           value={newName}
//           onChange={(e) => setNewName(e.target.value)}
//         />
//       </div>
//       <button onClick={handleUpdateUser}>Save</button>
//     </div>
//   );
// };

// export default edit;