import React, { useState, useEffect } from 'react';
import './css/DashboardStyle.css';
import './css/addcustomer.css';
import { logout } from './logout';
import axios from 'axios';
import myImage from './img/customerprofile.png';
import { Link } from 'react-router-dom';
import { getUsername, handleArea1 } from './LocalStorageUtils';
import homeImage from './img/homepage.png';

export function EditUser() {
  const [EmployeeID, setEmployeeID] = useState('');
  const [NIC, setEmpNIC] = useState('');
  const [EmployeeName, setEmployeeName] = useState('');
  const [Designation, setDesignation] = useState('');

  const username2 = getUsername();


  useEffect(() => {
    // Fetch the customer data based on the customer ID (retrieve the ID from localStorage or URL params)
    const EmployeeID = localStorage.getItem('EmployeeID');
    const NIC = localStorage.getItem('NIC');
    const EmployeeName = localStorage.getItem('EmployeeName');
    const Designation = localStorage.getItem('Designation');

    
    setEmployeeID(EmployeeID);
    setEmpNIC(NIC);
    setEmployeeName(EmployeeName);
    setDesignation(Designation);

  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Send the updated customer data to the database

    const formData = new FormData();
    formData.append('EmpID', EmployeeID);
    formData.append('NIC', NIC);
    formData.append('EmpName', EmployeeName);
    formData.append('Designation', Designation);

    // Send a POST request with the form data
    axios
      .post(`http://localhost/backend/edituser.php`, formData)
      .then((response) => {
        if (response.data === 'User Updated') {
          alert('User updated successfully');
          window.location.href = '/users';
        } else {
          alert('Invalid');
        }
      })
      .catch((error) => alert(error.message));
  };

  const handleCancelClick = (event) => {
    event.preventDefault();
    // Reset the customer data
    setEmployeeID('');
    setEmpNIC('');
    setEmployeeName('');
    setDesignation('');
  };

  function gotoDashboard (){
    handleArea1(username2)
}


  return (
    <div className="container">
      <div className="area1">
      <button class="area1button" onClick={gotoDashboard} >
          <img src={homeImage} alt="logo" class='homeimage'/>    
          <h1 class='area1text'>SAL</h1> 
        </button>
      </div>

      <div className="area2"></div>

      <div className="area3">
        <div id="wrapper">
        <table>
            <tr><td>
            <Link to={`/users`}>
            <button class="tablebutton">Users</button>
                        </Link>
              
            </td></tr>
            <tr><td>
            <Link to={`/deactivateremove`}>
            <button class="tablebutton">Change User Status</button>
                        </Link>
            </td></tr>
            {/* <tr><td>
              <button class="tablebutton">User Permissions</button>
            </td></tr> */}
            <tr><td>
            <button className="tablebutton" type="button" onClick={logout}>Logout</button>  
            </td></tr>


          </table>
        </div>
      </div>

      <div className="area4">
        <div>
          <form onSubmit={handleSubmit}>
            <table>
              <tr>
                <td colspan="3" align='center' class='customerimage'><img src={myImage} alt="user"/></td>
              </tr>
              <tr>
                <td className="label">Employee ID</td>
                <td className="label1">:</td>
                <td className="textbox">
                  <input
                    type="text"
                    name="nic"
                    value={EmployeeID} 
                    onChange={(e) => setEmployeeID(e.target.value)} readOnly
                  />
                </td>
              </tr>
              <tr>
                <td className="label">NIC</td>
                <td className="label1">:</td>
                <td className="textbox">
                  <input
                    type="text"
                    name="fname"
                    value={NIC} pattern="^\d{9}[VX]$|^\d{12}$"
                    onChange={(e) => setEmpNIC(e.target.value)}
                  />
                </td>
              </tr>
              <tr>
                <td className="label">Employee Name</td>
                <td className="label1">:</td>
                <td className="textbox">
                  <input
                    type="text"
                    name="lname"
                    value={EmployeeName}
                    onChange={(e) => setEmployeeName(e.target.value)}
                  />
                </td>
              </tr>
              <tr>
                <td className="label">Designation</td>
                <td className="label1">:</td>
                <td className="textbox">
                  <input
                    type="text"
                    name="othernames"
                    value={Designation}
                    onChange={(e) => setDesignation(e.target.value)}
                  />
                </td>
              </tr>
              
            
            </table>
            <button className="cancelbutton" onClick={handleCancelClick}>
              Cancel
            </button>
            <input type="submit" className="submitbutton" value="Update" />
          </form>
        </div>
      </div>
    </div>
  );
}
