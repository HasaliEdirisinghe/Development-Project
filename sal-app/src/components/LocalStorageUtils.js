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
  }else {
    alert('Invalid credentials.');
  }
};


export const handleArea1 = async (username) => {

  const designationUrl = 'http://localhost/backend/getdesignation.php';
  const formData = new FormData();
  formData.append('name', username);

  const designationResponse = await axios.post(designationUrl, formData);
  const designation = designationResponse.data;

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
  }else {
    alert('Invalid credentials.');
  }
};

export const getAllProperties = async () => {
  try {
    const url_properties = 'http://localhost/backend/getdetailsforprojectpage.php';
    const response = await axios.post(url_properties);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

const ConfirmationModal = ({ message, onConfirm, onCancel }) => {
  return (
    <div className="confirmation-modal">
      <p>{message}</p>
      <button onClick={onConfirm}>Send</button>
      <button onClick={onCancel}>Cancel</button>
    </div>
  );
};

