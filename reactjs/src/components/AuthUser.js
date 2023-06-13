import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AuthUser() {
  const navigate = useNavigate();

  const getToken = () => {
    const tokenString = sessionStorage.getItem('token');
    const userToken = JSON.parse(tokenString);
    return userToken;
  };

  const getUser = () => {
    const userString = sessionStorage.getItem('user');
    const user_detail = JSON.parse(userString);
    return user_detail;
  };

  const [token, setToken] = useState(getToken());
  const [user, setUser] = useState(getUser());
  const [users, setUsers] = useState([]);
  const [wpisy, setPosts] = useState([]);
  const [komentarze, setKomentarze] = useState([]);

  const saveToken = (user, token) => {
    sessionStorage.setItem('token', JSON.stringify(token));
    sessionStorage.setItem('user', JSON.stringify(user));

    setToken(token);
    setUser(user);
    navigate('/');
  };

  const logout = () => {
    sessionStorage.clear();
    navigate('/login');
  };

  const http = axios.create({
    baseURL: "http://localhost:8000/api",
    headers: {
      "Content-type": "application/json",
      "Authorization": `Bearer ${token}`
    }
  });

  const fetchUsers = async () => {
    try {
      const response = await http.get('/users');
      setUsers(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchPosts = async () => {
    try {
      const response = await http.get('/wpisy');
      setPosts(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchComments = async (wpisId) => {
    try {
      const response = await http.get(`/commentsget/${wpisId}`);
      setKomentarze(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getUserNickById = (userId) => {
    const user = users.find((user) => user.id === userId);
    return user ? user.name : '';
  };

  useEffect(() => {
    fetchUsers();
    fetchPosts();
  }, []);

  return {
    setToken: saveToken,
    token,
    user,
    getToken,
    getUser,
    http,
    logout,
    users,
    wpisy,
    fetchUsers,
    fetchPosts,
    getUserNickById,
    fetchComments,
    komentarze
  };
}
