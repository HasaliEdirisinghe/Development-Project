import './css/Style.css';
import { useState } from 'react';
import axios from 'axios';
import React from 'react';

export function LoginPage() {

  // State variables to hold the username and password
  const [name,setName] = useState('');
  const [password,setPassword] = useState('');

  const handleSubmit = async () => {
    // Check if the username field is empty
    if(name.length === 0){
      alert("Please enter your username!");
    }
    // Check if the password field is empty
    else if(password.length === 0){
      alert("Please enter your password!");
    }
    else {
      // If both fields are filled, make a request to the server
      const url = 'http://localhost/backend/login.php';
      let fData = new FormData();
      fData.append('name', name);
      fData.append('password', password);
      // Send a POST request with the form data
      axios.post(url, fData)
        .then(response => {
          if (response.data === 'Login successful.') {
            // Redirect to the dashboard page
            window.location.href = '/dashboard';
          } else {
            alert('Invalid credentials.');
          }
        })
        .catch(error => alert(error.message)); // Display an error message if the request fails
    }
  }

  return (
    <div className="page">
      <h1>SAL</h1>
      {/* The banner image
      <img src="C:\xampp\MITProject\sal-app\src\img\bannerImage.png" alt="BannerImage" />
   */}
      <div className="login">
        {/* Username label */}
        <label htmlFor="name">Username</label>
        {/* Username input field */}
        <input type="text" name="name" id="name" value={name} onChange={(e) => setName(e.target.value)} />
  
        {/* Password label */}
        <label htmlFor="password">Password</label>
        {/* Password input field */}
        <input type="password" name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
  
        <div className="center">
          {/* Login button */}
          <input type="button" name="submit" id="submit" value="Login" onClick={handleSubmit} />
        </div>
      </div>
    </div>
  );
  
}

