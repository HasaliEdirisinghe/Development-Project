import React from 'react';
import './css/DashboardStyle.css';
import './css/addcustomer.css';
import { useState } from 'react';
import axios from 'axios';
import myImage from './img/user.png';
import { logout } from './logout';


export function AddUser() {
  const handleButtonClick = (e) => {
    if (e.target.nodeName !== 'BUTTON') {
      return;
    }
    e.target.style.background = '#808080';
  };
    // State variables to hold the username and password
    const [empid,setEmployeeID] = useState('');
    const [nic,setNIC] = useState('');
    const [name,setName] = useState('');
    const [designation,setDesignation] = useState('');
    const [temp_pwd,setTempPassword] = useState('');
  
    const handleSubmit = async (event) => {
      event.preventDefault();
      if(empid.length === 0){
        alert("Employee ID is required!");
      }
      else if(nic.length === 0){
        alert("NIC is required!");
      }
      else if(name.length === 0){
        alert("Employee Name is required!");
      }
      else if(designation.length === 0){
        alert("Designation is required!");
      }
      else if(temp_pwd.length === 0){
        alert("Add a Temporary Password");
      }
      else{

      
        // Send the customer data to the database

        let fData = new FormData();
        fData.append('empid', empid);
        fData.append('nic', nic);
        fData.append('name', name);
        fData.append('designation', designation);
        fData.append('temp_pwd', temp_pwd);

      // Send a POST request with the form data
      axios.post(`http://localhost/backend/adduser.php`, fData)
        .then(response => {
          if (response.data === 'User Added') {
            alert('User Added Successfully');
            // Reset the textboxes to their initial values
            setEmployeeID('');
            setNIC('');
            setName('');
            setDesignation('');
            setTempPassword('');


          } else {
            alert('Invalid');
          }
        })
        .catch(error => alert(error.message)); // Display an error message if the request fails
      }
    }
    const handleCancelClick = (event) => {
      event.preventDefault();
      setEmployeeID('');
      setNIC('');
      setName('');
      setDesignation('');
      setTempPassword('');
    };


  return (
    <div class="container">
      <div class="area1">
        <h1 class='area1text'>SAL</h1>
      </div>

      <div class="area2"></div>

      <div class="area3">
        <div id="wrapper" onClick={handleButtonClick}>
          <table>
            <tr><td>
              <button class="tablebutton">Admin Panel</button>
            </td></tr>
            <tr><td>
              <button class="tablebutton">Property</button>
            </td></tr>
            <tr><td>
              <button class="tablebutton">Project Page</button>
            </td></tr>
            <tr><td>
              <button class="tablebutton">Approvals</button>
            </td></tr>
            <tr><td>
            <button className="tablebutton" type="button" onClick={logout}>Logout</button>            </td></tr>
          </table>
        </div>
      
      </div>

      <div class="area4">
        <div>
            <table>
                <tr><td><button class="area4button">Add User</button></td></tr>
                <tr><td><button class="area4button">Edit User</button></td></tr>
            </table>
            <form onSubmit={handleSubmit}>
                <table>
                    <tr>
                        <td colspan="3" align='center' class='customerimage'><img src={myImage} alt="customer"/>    </td>
                    </tr>
                    <tr>
                        <td class='label'>Employee ID</td>
                        <td class='label1'>:</td>
                        <td class='textbox'><input type='text' name='empid'  onChange={(e) => setEmployeeID(e.target.value)} value={empid}/></td>
                    </tr>
                    <tr>
                        <td class='label'>NIC</td>
                        <td class='label1'>:</td>
                        <td class='textbox'><input type='text' name='nic'  onChange={(e) => setNIC(e.target.value)} value={nic}/></td>
                    </tr>
                    <tr>
                        <td class='label'>Employee Name</td>
                        <td class='label1'>:</td>
                        <td class='textbox'><input type='text' name='name'  onChange={(e) => setName(e.target.value)} value={name}/></td>
                    </tr>
                    <tr>
                        <td class='label'>Designation</td>
                        <td class='label1'>:</td>
                        <td class='textbox'>
                            <select name="designation" id="designation" onChange={(e) => setDesignation(e.target.value)} value={designation}>
                                <option value="blank"> </option>
                                <option value="Admin">Admin</option>
                                <option value="SalesOfficer">Sales Officer</option>
                                <option value="SalesManager">Sales Manager</option>
                                <option value="Accountant">Accountant</option>
                                <option value="ChiefAccountant">Chief Accountant</option>
                                <option value="LegalClerk">LegalClerk</option>
                                <option value="Lawyer">Lawyer</option>
                                <option value="Director">Director</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td class='label'>Temporary Password</td>
                        <td class='label1'>:</td>
                        <td class='textbox'><input type='text' name='temp_pwd'  onChange={(e) => setTempPassword(e.target.value)} value={temp_pwd} /></td>
                    </tr>
                </table>
                <button class="cancelbutton" onClick={handleCancelClick}>Cancel</button>
                <input type='submit' class='submitbutton' /> 

            </form>
                
        

        </div>
    </div>
</div>

);
}