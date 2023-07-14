import axios from 'axios';

export const setUsername = (username) => {
  localStorage.setItem('username', username);
};

export const getUsername = () => {
  return localStorage.getItem('username');
};

export const handleBackButton = (designation) => {
  // Redirect the user based on the designation
  if (designation === 'Admin') {
    window.location.href = '/dashboard';
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
  } else {
    alert('Invalid credentials.');
  }
};