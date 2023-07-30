import React, { useEffect, useState } from 'react';
import './css/DashboardStyle.css';
import './css/addcustomer.css';
import axios from 'axios';
import myImage from './img/user.png';
import { logout } from './logout';
import { getUsername, handleArea1 } from './LocalStorageUtils';
import homeImage from './img/homepage.png';
import { Link } from 'react-router-dom';
import profileImage from './img/user_icon.png';




export function AddUser() {
  const handleButtonClick = (e) => {
    if (e.target.nodeName !== 'BUTTON') {
      return;
    }
    e.target.style.background = '#808080';
  };
  const username2 = getUsername();

    // State variables to hold the username and password
    const [empid,setEmployeeID] = useState('');
    const [nic,setNIC] = useState('');
    const [name,setName] = useState('');
    const [designation,setDesignation] = useState('');
    const [temp_pwd,setTempPassword] = useState('');

    const [id2, setId2] = useState(null);

    useEffect(() => {
      const url = 'http://localhost/backend/getemployeename.php';
      const id = localStorage.getItem('username');
      let fData = new FormData();
      fData.append('id', id);
  
      axios.post(url, fData)
        .then(response => {
          const username = response.data; // Retrieve the username from the response
          setId2(username);
          // Do further processing with the username here
        })
        .catch(error => alert(error.message));
    }, []); // Empty dependencies array means the effect only runs once (on mount)
  
  
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
            window.location.href = '/users';


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

    
  function gotoDashboard (){
    handleArea1(username2)
}


  return (
    <div class="container">
      <div class="area1">
      <button class="area1button" onClick={gotoDashboard} >
          <img src={homeImage} alt="logo" class='homeimage'/>    
          <h1 class='area1text'>SAL</h1> 
        </button>      </div>

      <div class="area2">
      <input type='text' value={id2} readOnly/>
        <a href="/userprofile">
          <img src={profileImage} alt="profile" className="profile" />
        </a>
      </div>

      <div class="area3">
        <div id="wrapper" onClick={handleButtonClick}>
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

      <div class="area4">
        <div>
            <form onSubmit={handleSubmit}>
                <table>
                    <tr>
                        <td colspan="3" align='center' class='customerimage'><img src={myImage} alt="user"/>    </td>
                    </tr>
                    <tr>
                        <td class='label'>Employee ID</td>
                        <td class='label1'>:</td>
                        <td class='textbox'><input type='text' name='empid'  onChange={(e) => setEmployeeID(e.target.value)} value={empid}/></td>
                    </tr>
                    <tr>
                        <td class='label'>NIC</td>
                        <td class='label1'>:</td>
                        <td class='textbox'><input type='text' name='nic' pattern="^\d{9}[VX]$|^\d{12}$" onChange={(e) => setNIC(e.target.value)} value={nic}/></td>
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
                                <option value="Sales Officer">Sales Officer</option>
                                <option value="Sales Manager">Sales Manager</option>
                                <option value="Accountant">Accountant</option>
                                {/* <option value="ChiefAccountant">Chief Accountant</option> */}
                                {/* <option value="LegalClerk">Legal Clerk</option> */}
                                {/* <option value="Lawyer">Lawyer</option> */}
                                <option value="Legal Officer">Legal Officer</option>
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
                <input type='submit' class='submitbutton' value='Submit'/> 

            </form>
                
        

        </div>
    </div>
</div>

);
}