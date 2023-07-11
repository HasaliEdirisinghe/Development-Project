import React from 'react';
import './css/DashboardStyle.css';
import './css/addcustomer.css';
import { useState } from 'react';

export function AddCustomer() {
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
  
    const handleSubmit = async () => {
        // Check if the form is valid
        if (!nic || !fname || !lname || !address || !phone) {
          alert('Please fill in all the fields.');
          return;
        }
    
        // Create a JSON object with the customer data
        const customer = {
          nic: nic,
          fname: fname,
          lname: lname,
          othernames: othernames,
          address: address,
          phone: phone,
        };
    
        // Send the customer data to the database
        const url = 'http://localhost/backend/addcustomer.php';
        const response = await fetch(url, {
          method: 'POST',
          body: JSON.stringify(customer),
        });
    
        // Check the response status code
        if (response.status === 200) {
          alert('Customer added successfully.');
        } else {
          alert('Error adding customer.');
        }
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
            <form action="addcustomer.php" method="post">
                <table border={1}>
                    <tr>
                        <td colspan="3" align='center'>image</td>
                    </tr>
                    <tr>
                        <td class='label'>NIC</td>
                        <td class='label1'>:</td>
                        <td class='textbox'><input type='text' name='nic'/></td>
                    </tr>
                    <tr>
                        <td class='label'>First Name</td>
                        <td class='label1'>:</td>
                        <td class='textbox'><input type='text' name='fname'/></td>
                    </tr>
                    <tr>
                        <td class='label'>Last Name</td>
                        <td class='label1'>:</td>
                        <td class='textbox'><input type='text' name='lname'/></td>
                    </tr>
                    <tr>
                        <td class='label'>Other Names</td>
                        <td class='label1'>:</td>
                        <td class='textbox'><input type='text' name='other'/></td>
                    </tr>
                    <tr>
                        <td class='label'>Permanent Address</td>
                        <td class='label1'>:</td>
                        <td class='textbox'><input type='text' name='address'/></td>
                    </tr>
                    <tr>
                        <td class='label'>Phone Number</td>
                        <td class='label1'>:</td>
                        <td class='textbox'><input type='text' name='phone'/></td>
                    </tr>
                </table>
                <input type='submit' onClick={handleSubmit}/>

            </form>
                
        

        </div>
    </div>
  </div>

  );
}

