import './css/DashboardStyle.css';
import profileImage from './img/user_icon.png';
import { Link } from 'react-router-dom';
import { getUsername, handleArea1, getAllProperties } from './LocalStorageUtils';
import homeImage from './img/homepage.png';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { logout } from './logout';

export function ChangeUserStatus() {
  const handleButtonClick = (e) => {
    if (e.target.nodeName !== 'BUTTON') {
      return;
    }
    e.target.style.background = '#808080';
  };

  const username2 = getUsername();
  const [id2, setId2] = useState(null);

  const [EmployeeID, setEmployeeID] = useState('');
  const [NIC, setNIC] = useState('');
  const [EmployeeName, setEmployeeName] = useState('');
  const [Designation, setDesignation] = useState('');
  const [UserStatus, setUserStatus] = useState('');

  useEffect(() => {
    setUserStatus(localStorage.getItem('Status'));
    setEmployeeID(localStorage.getItem('EmployeeID'));
    setNIC(localStorage.getItem('NIC'));
    setEmployeeName(localStorage.getItem('EmployeeName'));
    setDesignation(localStorage.getItem('Designation'));

    const url = 'http://localhost/backend/getemployeename.php';
    const id = localStorage.getItem('username');
    let fData = new FormData();
    fData.append('id', id);
    axios
      .post(url, fData)
      .then((response) => {
        const username = response.data;
        setId2(username);
      })
      .catch((error) => alert(error.message));
  }, [EmployeeID, UserStatus]);

  function chageStatus() {
    // Determine the new status based on the current UserStatus
    const newStatus = UserStatus.toLowerCase() === 'active' ? 'Deactivated' : 'Active';

    let formData = new FormData();
    formData.append('UserStatus', newStatus);
    formData.append('EmpID', EmployeeID);

    axios
      .post('http://localhost/backend/userstatus.php', formData)
      .then((response) => {
        // Handle the response from the server if needed
        console.log(response.data);
        if (response.data === 'Status Updated') {
          alert('User status changed to ' + newStatus);
          window.location.href = '/deactivateremove';
        } else {
          alert('Failed to change status');
        }
      })
      .catch((error) => {
        // Handle error if the request fails
        console.log(error.message);
      });
  }

  function gotoDashboard() {
    handleArea1(username2);
  }

  return (
    <div className="container">
      <div className="area1">
        <button className="area1button" onClick={gotoDashboard}>
          <img src={homeImage} alt="logo" className="homeimage" />
          <h1 className="area1text">SAL</h1>
        </button>
      </div>

      <div className="area2">
        <input type="text" value={id2} readOnly />
        <a href="/userprofile">
          <img src={profileImage} alt="profile" className="profile" />
        </a>
      </div>

      <div className="area3">
        <div id="wrapper">
          <table>
            <tr>
              <td>
                <Link to={`/users`}>
                  <button className="tablebutton">Users</button>
                </Link>
              </td>
            </tr>
            <tr>
              <td>
                <Link to={`/deactivateremove`}>
                  <button className="tablebutton">Change User Status</button>
                </Link>
              </td>
            </tr>
            <tr>
              <td>
                <button className="tablebutton">User Permissions</button>
              </td>
            </tr>
            <tr>
              <td>
                <button className="tablebutton" type="button" onClick={logout}>
                  Logout
                </button>
              </td>
            </tr>
          </table>
        </div>
      </div>

      <div className="area4">
        <div>
          <div className="section">
            <h2>Changing status of {EmployeeID}</h2>
            <h3>NIC: {NIC}</h3>
            <h3>Employee Name: {EmployeeName}</h3>
            <h3>Designation: {Designation}</h3>
            <hr />

            <h3>Status: {UserStatus}</h3>

            <button className="sendButton" onClick={chageStatus}>
              Change
            </button>

            <hr />
          </div>
        </div>
      </div>
    </div>
  );
}
