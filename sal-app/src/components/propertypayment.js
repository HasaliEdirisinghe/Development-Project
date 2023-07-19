import './css/DashboardStyle.css';
import './css/addcustomer.css';
import axios from 'axios';
import { logout } from './logout';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import homeImage from './img/homepage.png';
import { getUsername, handleArea1 } from './LocalStorageUtils';

export function PropertyPayment() {
  const handleButtonClick = (e) => {
    if (e.target.nodeName !== 'BUTTON') {
      return;
    }
    e.target.style.background = '#808080';
  };
  
  const username2 = getUsername();

  const { customerId } = useParams();
  const myVariable = customerId;

  const [FirstName, setFirstName] = useState('');
const [LastName, setLastName] = useState('');


  const [PropertyType, setPropertyType] = useState('');
  const [Location, setLocation] = useState('');
  const [District, setDistrict] = useState('');
  const [Address, setAddress] = useState('');
  const [LotNo, setLotNo] = useState('');
  const [PlanNo, setPlanNo] = useState('');
  const [Size, setSize] = useState('');
  const [UnitPrice, setUnitPrice] = useState('');
  const [TotalPrice, setTotalPrice] = useState('');
  const [CusID, setCusID] = useState('');
  const [Discount, setDiscount] = useState('');
  const [OtherCharges, setOtherCharges] = useState('');
  const [PropID, setPropID] = useState('');
  const [CustomerDetails, setCustomerData] = useState([]);

  // const [CustomerLName, setCustomerLName] = useState('');
  

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
    setCusID(localStorage.getItem('CusId'));


    // const getCustomer = () => {
    //   const fData = new FormData();
    //   fData.append('id', CusID);
    //   axios
    //     .post(`http://localhost/backend/getcustomer.php`, fData)
    //     .then((response) => {
    //       if (response.data !== 'No customer found') {
    //         // Update the state with customer data
    //         const customerData = response.data;
    //         setCustomerData([customerData]);      
    //         setFirstName(customerData.FirstName);
    //         setLastName(customerData.LastName);      
    //       } else {
    //         alert('No customer found');
    //       }
    //     })
    //     .catch((error) => alert(error.message));
    // };
    const getCustomer = () => {
      const fData = new FormData();
      fData.append('id', CusID);
      axios
        .post(`http://localhost/backend/getcustomer.php`, fData)
        .then((response) => {
          if (response.data !== 'No customer found') {
            // Update the state with customer data
            const customerData = response.data;
            setCustomerData([customerData]); // Set customer data as an array
            setFirstName(customerData.FirstName);
            setLastName(customerData.LastName);
          } else {
            alert('No customer found');
          }
        })
        .catch((error) => alert(error.message));
    };
    
    

    getCustomer();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const fData = new FormData();
    fData.append('CusID', myVariable);
    fData.append('PropID', PropID);
    fData.append('Discount', Discount);
    fData.append('OtherCharges', OtherCharges);
    fData.append('total_price', TotalPrice);

    axios
      .post(`http://localhost/backend/propertypayment.php`, fData)
      .then((response) => {
        if (response.data === 'Property Assigned') {
          alert('Property Assigned Successfully');
          window.location.href = '/customer';
        } else {
          alert('Invalid');
        }
      })
      .catch((error) => alert(error.message));
  };

  const handleCancelClick = (event) => {
    event.preventDefault();
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
            <tr>
              <td>
                <Link to={`/customer`}>
                  <button className="tablebutton">Customer</button>
                </Link>
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
          <h2>Property Type: {PropertyType}</h2>
          <h3>Location: {Location}</h3>
          <h3>District: {District}</h3>
          <h3>Size: {Size}</h3>
          <h3>Unit Price: {UnitPrice}</h3>
          <h3>TotalPrice: {TotalPrice}</h3>
          {/* <h3>Customer Name: {FirstName} {LastName}</h3>  */}
          {/* {CustomerDetails.map((customer) => (
  <h3 key={customer.CustomerID}>
    Customer Name: {customer.FirstName} {customer.LastName}
  </h3> ))}*/}

         

          <form onSubmit={handleSubmit}>
            <table>
              <tr>
                <td className="label">Discount</td>
                <td className="label1">:</td>
                <td className="textbox">
                  <input
                    type="text"
                    name="empid"
                    onChange={(e) => setDiscount(e.target.value)}
                    value={Discount}
                  />
                </td>
              </tr>
              <tr>
                <td className="label">OtherCharges</td>
                <td className="label1">:</td>
                <td className="textbox">
                  <input
                    type="text"
                    name="nic"
                    onChange={(e) => setOtherCharges(e.target.value)}
                    value={OtherCharges}
                  />
                </td>
              </tr>
            </table>
            <button className="cancelbutton" onClick={handleCancelClick}>
              Cancel
            </button>
            <input type="submit" className="submitbutton" value='Submit'/>
          </form>
        </div>
      </div>
    </div>
  );
}
