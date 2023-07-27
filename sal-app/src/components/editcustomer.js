import React, { useEffect, useState } from 'react';
import './css/DashboardStyle.css';
import './css/addcustomer.css';
import { logout } from './logout';
import axios from 'axios';
import myImage from './img/customerprofile.png';
import { Link } from 'react-router-dom';
import { getUsername, handleArea1 } from './LocalStorageUtils';
import homeImage from './img/homepage.png';
import profileImage from './img/user_icon.png';


export function EditCustomer() {
  const [CusID, setCusID] = useState('');
  const [CusNIC, setCusNIC] = useState('');
  const [CusFirstName, setCusFirstName] = useState('');
  const [CusLastName, setCusLastName] = useState('');
  const [CusOtherNames, setCusOtherNames] = useState('');
  const [CusPermanentAddress, setCusPermanentAddress] = useState('');
  const [CusPhoneNumber, setCusPhoneNumber] = useState('');

  const username2 = getUsername();

  const [id2, setId2] = useState(null);

  useEffect(() => {
    // Fetch the customer data based on the customer ID (retrieve the ID from localStorage or URL params)
    const customerId = localStorage.getItem('customerId');
    const NIC = localStorage.getItem('NIC');
    const FirstName = localStorage.getItem('FirstName');
    const LastName = localStorage.getItem('LastName');
    const OtherNames = localStorage.getItem('OtherNames');
    const PermanentAddress = localStorage.getItem('PermanentAddress');
    const PhoneNumber = localStorage.getItem('PhoneNumber');
    
    setCusID(customerId);
    setCusNIC(NIC);
    setCusFirstName(FirstName);
    setCusLastName(LastName);
    setCusOtherNames(OtherNames);
    setCusPermanentAddress(PermanentAddress);
    setCusPhoneNumber(PhoneNumber);

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

  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Send the updated customer data to the database

    const formData = new FormData();
    formData.append('nic', CusNIC);
    formData.append('fname', CusFirstName);
    formData.append('lname', CusLastName);
    formData.append('othernames', CusOtherNames);
    formData.append('address', CusPermanentAddress);
    formData.append('phone', CusPhoneNumber);
    formData.append('id', CusID);

    // Send a POST request with the form data
    axios
      .post(`http://localhost/backend/editcustomer.php`, formData)
      .then((response) => {
        if (response.data === 'Customer Updated') {
          alert('Customer updated successfully');
          window.location.href = '/customer';
        } else {
          alert('Invalid');
        }
      })
      .catch((error) => alert(error.message));
  };

  const handleCancelClick = (event) => {
    event.preventDefault();
    // Reset the customer data
    setCusNIC('');
    setCusFirstName('');
    setCusLastName('');
    setCusOtherNames('');
    setCusPermanentAddress('');
    setCusPhoneNumber('');
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

      <div className="area2">
      <input type='text' value={id2} readOnly/>
        <a href="/userprofile">
          <img src={profileImage} alt="profile" className="profile" />
        </a>
      </div>

      <div className="area3">
        <div id="wrapper">
        <table>
            <tr><td>
            <Link to={`/customer`}>
            <button class="tablebutton">Customer</button>
                        </Link>
            </td></tr>
            <tr><td>
            <Link to={`/viewproperty`}>
            <button class="tablebutton">Property</button>
                        </Link>
              
            </td></tr>
            <tr><td>
            <Link to={`/viewprojectpage`}>
            <button class="tablebutton">Project Page</button>
                        </Link>
            </td></tr>
            <tr><td>
            <Link to={`/salesofficerapprovals`}>
            <button class="tablebutton">Approvals</button>
                        </Link>
            </td></tr>
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
                <td colSpan="3" align="center" className="customerimage">
                  <img src={myImage} alt="customer" />
                </td>
              </tr>
              <tr>
                <td className="label">NIC</td>
                <td className="label1">:</td>
                <td className="textbox">
                  <input
                    type="text"
                    name="nic"
                    value={CusNIC} pattern="^\d{9}[VX]$|^\d{12}$"
                    onChange={(e) => setCusNIC(e.target.value)} required
                  />
                </td>
              </tr>
              <tr>
                <td className="label">First Name</td>
                <td className="label1">:</td>
                <td className="textbox">
                  <input
                    type="text"
                    name="fname"
                    value={CusFirstName}
                    onChange={(e) => setCusFirstName(e.target.value)}
                  />
                </td>
              </tr>
              <tr>
                <td className="label">Last Name</td>
                <td className="label1">:</td>
                <td className="textbox">
                  <input
                    type="text"
                    name="lname"
                    value={CusLastName}
                    onChange={(e) => setCusLastName(e.target.value)}
                  />
                </td>
              </tr>
              <tr>
                <td className="label">Other Names</td>
                <td className="label1">:</td>
                <td className="textbox">
                  <input
                    type="text"
                    name="othernames"
                    value={CusOtherNames}
                    onChange={(e) => setCusOtherNames(e.target.value)}
                  />
                </td>
              </tr>
              <tr>
                <td className="label">Permanent Address</td>
                <td className="label1">:</td>
                <td className="textbox">
                  <input
                    type="text"
                    name="address"
                    value={CusPermanentAddress}
                    onChange={(e) => setCusPermanentAddress(e.target.value)}
                  />
                </td>
              </tr>
              <tr>
                <td className="label">Phone Number</td>
                <td className="label1">:</td>
                <td className="textbox">
                  <input
                    type="text"
                    name="phone"
                    value={CusPhoneNumber}
                    onChange={(e) => setCusPhoneNumber(e.target.value)}
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
