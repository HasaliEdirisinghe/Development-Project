import React from 'react';
import './css/DashboardStyle.css';
import './css/addcustomer.css';
import { useState } from 'react';
import axios from 'axios';
import myImage from './img/money.png';

export function AddPaymentDetails() {
  const handleButtonClick = (e) => {
    if (e.target.nodeName !== 'BUTTON') {
      return;
    }
    e.target.style.background = '#808080';
  };
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
              <button class="tablebutton">Customer</button>
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
              <button class="tablebutton">Logout</button>
            </td></tr>
          </table>
        </div>
      
      </div>

      <div class="area4">
        <div>
            <table>
                <tr><td><button class="area4button">Add Customer</button></td></tr>
                <tr><td><button class="area4button">Edit Customer</button></td></tr>
            </table>
            <form onSubmit={handleSubmit}>
                <table>
                    <tr>
                        <td colspan="3" align='center' class='customerimage'><img src={myImage} alt="customer"/>    </td>
                    </tr>
                    <tr>
                        <td class='label'>Price per Unit</td>
                        <td class='label1'>:</td>
                        <td class='textbox'><input type='text' name='ppu'  onChange={(e) => setNIC(e.target.value)} /></td>
                    </tr>
                    <tr>
                        <td class='label'>Basic Property Value</td>
                        <td class='label1'>:</td>
                        <td class='textbox'><input type='text' name='basic'  onChange={(e) => setFname(e.target.value)} /></td>
                    </tr>
                    <tr>
                        <td class='label'>Discount</td>
                        <td class='label1'>:</td>
                        <td class='textbox'><input type='text' name='discount'  onChange={(e) => setLname(e.target.value)} /></td>
                    </tr>
                    <tr>
                        <td class='label'>Other Charges</td>
                        <td class='label1'>:</td>
                        <td class='textbox'><input type='text' name='othercharges' onChange={(e) => setOtherName(e.target.value)}/></td>
                    </tr>
                    <tr>
                        <td class='label'>Final Value</td>
                        <td class='label1'>:</td>
                        <td class='textbox'><input type='text' name='finalvalue'  onChange={(e) => setAddress(e.target.value)} /></td>
                    </tr>
                    <tr>
                        <td class='label'>Phone Number</td>
                        <td class='label1'>:</td>
                        <td class='textbox'><input type='text' name='phone'  onChange={(e) => setPhone(e.target.value)} /></td>
                    </tr>
                </table>
                <button class="cancelbutton">Cancel</button>
                <input type='submit' class='submitbutton' /> 

            </form>
                
        

        </div>
    </div>
</div>

);
}