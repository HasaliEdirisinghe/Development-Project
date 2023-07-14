import React, { useState, useEffect } from 'react';
import './css/DashboardStyle.css';
import './css/addcustomer.css';
import { logout } from './logout';
import axios from 'axios';
import myImage from './img/customerprofile.png';

export function EditCustomer() {
  const [customerData, setCustomerData] = useState({
    nic: '',
    fname: '',
    lname: '',
    othernames: '',
    address: '',
    phone: ''
  });

  const handleButtonClick = (e) => {
    if (e.target.nodeName !== 'BUTTON') {
      return;
    }
    e.target.style.background = '#808080';
  };

  useEffect(() => {
    // Fetch the customer data based on the customer ID (retrieve the ID from localStorage or URL params)
    const customerId = localStorage.getItem('customerId'); // Assuming you store the customer ID in localStorage
    // const customerId = useParams().id; // If you're using React Router, retrieve the ID from URL params

    // Fetch the customer data using the customer ID
    axios.get(`http://localhost/backend/getcustomer.php?id=${customerId}`)
      .then(response => {
        const customer = response.data;
        setCustomerData({
          nic: customer.NIC,
          fname: customer.FirstName,
          lname: customer.LastName,
          othernames: customer.OtherNames,
          address: customer.Address,
          phone: customer.PhoneNumber
        });
      })
      .catch(error => {
        alert(error.message);
      });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Send the updated customer data to the database

    const { nic, fname, lname, othernames, address, phone } = customerData;
    const customerId = localStorage.getItem('customerId'); // Assuming you store the customer ID in localStorage

    const formData = new FormData();
    formData.append('nic', nic);
    formData.append('fname', fname);
    formData.append('lname', lname);
    formData.append('othernames', othernames);
    formData.append('address', address);
    formData.append('phone', phone);
    formData.append('id', customerId);

    // Send a POST request with the form data
    axios.post(`http://localhost/backend/editcustomer.php`, formData)
      .then(response => {
        if (response.data === 'Customer Updated') {
          alert('Customer updated successfully');
          // Reset the customer data
          setCustomerData({
            nic: '',
            fname: '',
            lname: '',
            othernames: '',
            address: '',
            phone: ''
          });
        } else {
          alert('Invalid');
        }
      })
      .catch(error => alert(error.message)); // Display an error message if the request fails
  };

  const handleCancelClick = (event) => {
    event.preventDefault();
    // Reset the customer data
    setCustomerData({
      nic: '',
      fname: '',
      lname: '',
      othernames: '',
      address: '',
      phone: ''
    });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    // Update the corresponding field in the customerData state
    setCustomerData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  return (
    <div className="container">
      <div className="area1">
        <h1 className="area1text">SAL</h1>
      </div>

      <div className="area2"></div>

      <div className="area3">
        <div id="wrapper" onClick={handleButtonClick}>
          <table>
            <tr>
              <td>
                <button className="tablebutton">Customer</button>
              </td>
            </tr>
            <tr>
              <td>
                <button className="tablebutton">Property</button>
              </td>
            </tr>
            <tr>
              <td>
                <button className="tablebutton">Project Page</button>
              </td>
            </tr>
            <tr>
              <td>
                <button className="tablebutton">Approvals</button>
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
                    onChange={handleChange}
                    value={customerData.nic}
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
                    onChange={handleChange}
                    value={customerData.fname}
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
                    onChange={handleChange}
                    value={customerData.lname}
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
                    onChange={handleChange}
                    value={customerData.othernames}
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
                    onChange={handleChange}
                    value={customerData.address}
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
                    onChange={handleChange}
                    value={customerData.phone}
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
