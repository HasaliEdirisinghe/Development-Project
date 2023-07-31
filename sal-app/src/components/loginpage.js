import './css/Style.css';
import { useState } from 'react';
import axios from 'axios';
import React from 'react';
import { setUsername } from './LocalStorageUtils';
import bannerImage from './img/bannerImage.png';


export function LoginPage() {

  // State variables to hold the username and password
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async () => {
    // Check if the username field is empty
    if (name.length === 0) {
      alert("Please enter your username!");
    } else if (password.length === 0) {
      alert("Please enter your password!");
    } else {
      const url = 'http://localhost/backend/login.php';
      const formData = new FormData();
      formData.append('name', name);
      formData.append('password', password);

      try {
        // Send a POST request to the login endpoint
        const response = await axios.post(url, formData);
        
        // Check if the login was successful
        if (response.data === 'Login successful.') {
          // Set the username in local storage
          setUsername(name);
          
          // Request the designation for the logged-in user
          const designationUrl = 'http://localhost/backend/getdesignation.php';
          const designationResponse = await axios.post(designationUrl, formData);
          const designation = designationResponse.data;
          
          // Check if the user's status is "active"
          const statusUrl = 'http://localhost/backend/getemployeestatus.php';
          const statusResponse = await axios.post(statusUrl, formData);
          const status = statusResponse.data;

          if (status === 'Active') {
            // Redirect the user based on the designation
            if (designation === 'Admin') {
              window.location.href = '/admindashboard';
            } else if (designation === 'Sales Manager') {
              window.location.href = '/salesmanagerdashboard';
            } else if (designation === 'Sales Officer') {
              window.location.href = '/salesofficerdashboard';
            } else if (designation === 'Accountant') {
              window.location.href = '/accountantdashboard';
            } else if (designation === 'Chief Accountant') {
              window.location.href = '/chiefaccountantdashboard';
            } else if (designation === 'Legal Officer') {
              window.location.href = '/legalofficerdashboard';
            } else if (designation === 'Director') {
              window.location.href = '/directordashboard';
            } else {
              alert('Invalid credentials.');
            }
          } else {
            alert('You do not have access to this system.');
            setName('');
            setPassword('');
          }
        } else {
          alert('Invalid credentials.');
        }
      } catch (error) {
        alert(error.message);
      }
    }
  };

  return (
    <div className="page">
      <img src={bannerImage} alt="profile" className="bannerImage" />
      <div className='top'>
      <h1>SAL</h1>
      </div>
     
      <div className="login">
        <label htmlFor="name">Employee ID</label>
        <input type="text" name="name" id="name" value={name} onChange={(e) => setName(e.target.value)} />
        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <div className="center">
          <input type="button" name="submit" id="submit" value="Login" onClick={handleSubmit} />
        </div>
      </div>
    </div>
  );
}
