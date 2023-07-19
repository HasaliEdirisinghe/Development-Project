import './css/DashboardStyle.css';
import myImage from './img/bhoomilogo.jpg';
import profileImage from './img/user_icon.png';
import { Link } from 'react-router-dom';
import { getUsername, handleArea1 } from './LocalStorageUtils';
import homeImage from './img/homepage.png';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { logout } from './logout';

export function SalesOfficerDashboardPage() {
  // Function to handle button click events
  const handleButtonClick = (e) => {
    if (e.target.nodeName !== 'BUTTON') {
      return;
    }
    // e.target.style.background = '#808080';
  };

  const username2 = getUsername();
  const [id2, setId2] = useState(null);

  useEffect(() => {
    // Fetch employee name from the backend
    const url = 'http://localhost/backend/getemployeename.php';
    const id = localStorage.getItem('username');
    let fData = new FormData();
    fData.append('id', id);

    axios
      .post(url, fData)
      .then((response) => {
        const username = response.data; // Retrieve the username from the response
        setId2(username);
        // Do further processing with the username here
      })
      .catch((error) => alert(error.message));


      
  }, []); // Empty dependencies array means the effect only runs once (on mount)

  function gotoDashboard (){
    handleArea1(username2)
}

  return (
    <div class="container">
      <div class="area1">
        <button class="area1button" onClick={gotoDashboard} >
          <img src={homeImage} alt="logo" class='homeimage'/>    
          <h1 class='area1text'>SAL</h1> 
        </button>
      </div>

      <div class="area2">
        <input type="text" value={id2} readOnly />
        <a href="/userprofile">
          <img src={profileImage} alt="profile" className="profile" />
        </a>
      </div>

      <div class="area3">
        <div id="wrapper" onClick={handleButtonClick}>
          <table>
            <tr>
              <td>
                <Link to={`/customer`}>
                  {/* Link to Customer page */}
                  <button class="tablebutton">Customer</button>
                </Link>
              </td>
            </tr>
            <tr>
              <td>
                <Link to={`/viewproperty`}>
                  {/* Link to Property page */}
                  <button class="tablebutton">Property</button>
                </Link>
              </td>
            </tr>
            <tr>
              <td>
                <Link to={`/viewprojectpage`}>
                  {/* Link to Project Page */}
                  <button class="tablebutton">Project Page</button>
                </Link>
              </td>
            </tr>
            <tr>
              <td>
                <Link to={`/salesofficerapprovals`}>
                  {/* Link to Approvals page */}
                  <button class="tablebutton">Approvals</button>
                </Link>
              </td>
            </tr>
            <tr>
              <td>
                <button className="tablebutton" type="button" onClick={logout}>
                  {/* Logout button */}
                  Logout
                </button>
              </td>
            </tr>
          </table>
        </div>
      </div>

      <div class="area4">
        {/* Company logo */}
        <img src={myImage} alt="logo" class="logo" />
      </div>
    </div>
  );
}
