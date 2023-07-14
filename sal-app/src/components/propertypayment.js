import './css/DashboardStyle.css';
import './css/addcustomer.css';
import axios from 'axios';
import myImage from './img/customerprofile.png';
import { logout } from './logout';
import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import { useParams } from 'react-router-dom';



export function PropertyPayment() {
  const handleButtonClick = (e) => {
    if (e.target.nodeName !== 'BUTTON') {
      return;
    }
    e.target.style.background = '#808080';
  };


    // State variables to hold the username and password
    const { customerId } = useParams();
    const myVariable = customerId;

    const [PropertyType,setPropertyType] = useState('');
    const [Location,setLocation] = useState('');
    const [District,setDistrict] = useState('');
    const [Address,setAddress] = useState('');
    const [LotNo,setLotNo] = useState('');
    const [PlanNo,setPlanNo] = useState('');
    const [Size,setSize] = useState('');
    const [UnitPrice,setUnitPrice] = useState('');
    const [TotalPrice,setTotalPrice] = useState('');
    const [CusID,setCusID] = useState('');
    const [Discount,setDiscount] = useState('');
    const [OtherCharges,setOtherCharges] = useState('');
    const [PropID,setPropID] = useState('');


    useEffect(() => {
        setPropertyType(localStorage.getItem('PropertyType'));
        setLocation(localStorage.getItem('Location'));
        setAddress(localStorage.getItem('Address'));
        setLotNo(localStorage.getItem('LotNo'));
        setPlanNo(localStorage.getItem('PlanNo'));
        setSize(localStorage.getItem('Size'));
        setUnitPrice(localStorage.getItem('UnitPrice'));
        setTotalPrice(localStorage.getItem('TotalPrice'));
        setDistrict(localStorage.getItem('District'));
        setPropID(localStorage.getItem('PropId'));

        
        

    })
  
    const handleSubmit = async (event) => {
      event.preventDefault();
  

      
        // Send the customer data to the database

        let fData = new FormData();
        fData.append('CusID', CusID);
        fData.append('PropID', PropID);
        fData.append('Discount', Discount);
        fData.append('OtherCharges', OtherCharges);
        fData.append('total_price', TotalPrice);
alert(myVariable);
        
      axios.post(`http://localhost/backend/propertypayment.php`, fData)
        .then(response => {
          if (response.data === 'Property Assigned') {
            alert('Property Assigned Successfully');
            // Reset the textboxes to their initial values
            window.location.href = '/customer';

          } else {
            alert('Invalid');
          }
        })
        .catch(error => alert(error.message)); // Display an error message if the request fails
      }


    const handleCancelClick = (event) => {
      event.preventDefault();
     };


  return (
    <div class="container">
      <div class="area1">
        <h1 class='area1text'>SAL</h1>
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
            <h2>{PropertyType}</h2>
            <h3>{Location}</h3>
            <h3>{District}</h3>
            <h3>{Size}</h3>
            <h3>{UnitPrice}</h3>
            <h3>{TotalPrice}</h3>

            <form onSubmit={handleSubmit}>
                <table>
                    <tr>
                        <td class='label'>Discount</td>
                        <td class='label1'>:</td>
                        <td class='textbox'><input type='text' name='empid'  onChange={(e) => setDiscount(e.target.value)} value={Discount}/></td>
                    </tr>
                    <tr>
                        <td class='label'>OtherCharges</td>
                        <td class='label1'>:</td>
                        <td class='textbox'><input type='text' name='nic'  onChange={(e) => setOtherCharges(e.target.value)} value={OtherCharges}/></td>
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