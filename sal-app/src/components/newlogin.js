import React, { useState } from 'react';
import axios from 'axios';

export function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = () => {
    // Make a POST request to the PHP file with the login credentials
    axios.post('http://localhost/backend/newlogin.php', { username, password })
      .then(response => {
        setMessage(response.data);
      })
      .catch(error => {
        setMessage('An error occurred. Please try again.');
        console.error(error);
      });
  };

  return (
    <div>
      <div>
        <label htmlFor="username">Username</label>
        <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <button onClick={handleLogin}>Login</button>
      <p>{message}</p>
    </div>
  );
}


