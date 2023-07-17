import React from 'react';
import './css/DashboardStyle.css';
import './css/addcustomer.css';
import { useState } from 'react';
import axios from 'axios';
import myImage from './img/customerprofile.png';
import { logout } from './logout';
import {Link} from 'react-router-dom';
import homeImage from './img/homepage.png';
import { getUsername, handleArea1 } from './LocalStorageUtils';



export function AddCustomer() {
  const handleButtonClick = (e) => {
    if (e.target.nodeName !== 'BUTTON') {
      return;
    }
    e.target.style.background = '#808080';
  };

  const username2 = getUsername();

    // State variables to hold the username and password
    const [nic,setNIC] = useState('');
    const [fname,setFname] = useState('');
    const [lname,setLname] = useState('');
    const [othernames,setOtherName] = useState('');
    const [address,setAddress] = useState('');
    const [phone,setPhone] = useState('');
  
    const handleSubmit = async (event) => {
      event.preventDefault();
      if(nic.length === 0){
        alert("NIC is required!");
      }
      else if(fname.length === 0){
        alert("First Name is required!");
      }
      else if(lname.length === 0){
        alert("Last Name is required!");
      }
      else if(address.length === 0){
        alert("Address is required!");
      }
      else if(phone.length === 0){
        alert("Phone is required!");
      }
      else{

      
        // Send the customer data to the database

        let fData = new FormData();
        fData.append('nic', nic);
        fData.append('fname', fname);
        fData.append('lname', lname);
        fData.append('othernames', othernames);
        fData.append('address', address);
        fData.append('phone', phone);
      // Send a POST request with the form data
      axios.post(`http://localhost/backend/addcustomer.php`, fData)
        .then(response => {
          if (response.data === 'Customer Added') {
            alert('Customer Added Successfully');
            // Reset the textboxes to their initial values
            setNIC('');
            setFname('');
            setLname('');
            setOtherName('');
            setAddress('');
            setPhone('');

          } else {
            alert('Invalid');
          }
        })
        .catch(error => alert(error.message)); // Display an error message if the request fails
      }
    }

    const handleCancelClick = (event) => {
      event.preventDefault();
      setNIC('');
              setFname('');
              setLname('');
              setOtherName('');
              setAddress('');
              setPhone('');
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
        </button>
      </div>

      <div class="area2"></div>

      <div class="area3">
        <div id="wrapper" >
          <table>
            <tr><td>
            <Link to={`/customer`}>
            <button class="tablebutton">Customer</button>
                        </Link>
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
                        <td colspan="3" align='center' class='customerimage'><img src={myImage} alt="customer"/>    </td>
                    </tr>
                    <tr>
                        <td class='label'>NIC</td>
                        <td class='label1'>:</td>
                        <td class='textbox'><input type='text' name='nic' pattern="^\d{9}[VX]$|^\d{12}$"   onChange={(e) => setNIC(e.target.value)} value={nic}/></td>
                        {/* <input type="text" pattern="^\d{9}[VX]$|^\d{12}$" title="Invalid input" required></input> */}
                    </tr>
                    <tr>
                        <td class='label'>First Name</td>
                        <td class='label1'>:</td>
                        <td class='textbox'><input type='text' name='fname'  onChange={(e) => setFname(e.target.value)} value={fname}/></td>
                    </tr>
                    <tr>
                        <td class='label'>Last Name</td>
                        <td class='label1'>:</td>
                        <td class='textbox'><input type='text' name='lname'  onChange={(e) => setLname(e.target.value)} value={lname}/></td>
                    </tr>
                    <tr>
                        <td class='label'>Other Names</td>
                        <td class='label1'>:</td>
                        <td class='textbox'><input type='text' name='other' onChange={(e) => setOtherName(e.target.value)} value={othernames}/></td>
                    </tr>
                    <tr>
                        <td class='label'>Permanent Address</td>
                        <td class='label1'>:</td>
                        <td class='textbox'><input type='text' name='address'  onChange={(e) => setAddress(e.target.value)} value={address}/></td>
                    </tr>
                    <tr>
                        <td class='label'>Phone Number</td>
                        <td class='label1'>:</td>
                        <td class='textbox'><input type='text' name='phone'  onChange={(e) => setPhone(e.target.value)} value={phone} /></td>
                    </tr>
                </table>
                <button class="cancelbutton" onClick={handleCancelClick}>Cancel</button>
                <input type='submit' class='submitbutton'value='Submit'/> 

            </form>
                
        

        </div>
    </div>
</div>

);
}