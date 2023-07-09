import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000', // Replace with your server URL
  headers: {
    'Content-Type': 'application/json',
  },
});

export const login = (username, password) => {
  return api.post('/login.php', { username, password });
};
