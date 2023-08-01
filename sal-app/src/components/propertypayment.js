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
  const [BedRooms, setBedRooms] = useState('');
  const [PlanNo, setPlanNo] = useState('');
  const [Size, setSize] = useState('');
  const [HouseArea, setHouseArea] = useState('');
  const [UnitPrice, setUnitPrice] = useState('');
  const [TotalPrice, setTotalPrice] = useState('');

  const [Discount, setDiscount] = useState('');
  const [OtherCharges, setOtherCharges] = useState('');
  const [StampDuty, setStampDuty] = useState('');
  const [LegalFee, setLegalFee] = useState(0);
  const [FinalValue, setFinalValue] = useState(0);

  const [CusID, setCusID] = useState('');

  const [PropID, setPropID] = useState('');
  const [CustomerDetails, setCustomerData] = useState([]);

  // const [CustomerLName, setCustomerLName] = useState('');
  

  useEffect(() => {
    setPropertyType(localStorage.getItem('PropertyType'));
    setLocation(localStorage.getItem('Location'));
    setAddress(localStorage.getItem('Address'));
    setLotNo(localStorage.getItem('LotNo'));
    setBedRooms(localStorage.getItem('BedRooms'));
    setPlanNo(localStorage.getItem('PlanNo'));
    setSize(localStorage.getItem('Size'));
    setHouseArea(localStorage.getItem('HouseArea'));
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
    calculateValues();
  }, [TotalPrice, Discount, OtherCharges]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const fData = new FormData();
    fData.append('CusID', myVariable);
    fData.append('PropID', PropID);
    fData.append('Discount', Discount);
    // fData.append('StampDuty', StampDuty);
    // fData.append('LegalFee', LegalFee);
    fData.append('OtherCharges', OtherCharges);
    fData.append('total_price', TotalPrice);
    fData.append('final_value', FinalValue);


    axios
  .post(`http://localhost/backend/propertypayment.php`, fData)
  .then((response) => {
    console.log(response.data); // Add this line to check the actual response
    if (response.data.message === 'Property Assigned') {
      alert('Property Assigned Successfully');
      window.location.href = '/viewprojectpage';
    } else {
      alert(response.data);
    }
  })
  .catch((error) => alert(error.message));

  };

  const handleCancelClick = (event) => {
    event.preventDefault();
    window.location.href = '/customer';
  };

  const handleDiscountChange = (e) => {
    const value = e.target.value;
    if (value === '') {
      setDiscount(value);
    } else {
      const discountValue = parseFloat(value);
      if (discountValue >= 0 && discountValue <= 20) {
        setDiscount(value);
      } else {
        // Value is not within the range, display an error message or take any other appropriate action.
        alert('Discount must be between 0 and 20');
        // reset the value to an empty string.
        setDiscount('');
      }
    }
  };

  const handleOtherChargesChange = (e) => {
    const value = e.target.value;
    if (value === '') {
      setOtherCharges(value);
    } else {
      const otherChargesValue = parseFloat(value.replace(/,/g, '')); // Remove commas from OtherCharges and convert to a float
      const maxOtherCharges = 100000; // Set the maximum allowed value for Other Charges
  
      if (otherChargesValue > maxOtherCharges) {
        // The Other Charges value exceeds the maximum allowed value, show an alert
        alert('Other Charges cannot exceed LKR 100,000');
        // reset the value to an empty string.
        setOtherCharges('');
      } else {
        setOtherCharges(value);
      }
    }
  };


  const calculateValues = () => {
    const totalValue = parseFloat(TotalPrice.replace(/,/g, '')); // Remove commas from TotalPrice and convert to a float
  
    // Calculate stamp duty
    const stampDutyRate = totalValue < 100000 ? 0.03 : 0.04;
    const stampDuty = totalValue * stampDutyRate;
  
    // Calculate legal fee
    const legalFeeRate = totalValue > 100000000 ? 0.015 : 0.01;
    const legalFee = totalValue * legalFeeRate;

    // Calculate discount amount
    const discountAmount = (totalValue * parseFloat(Discount)) / 100;
  
    // Calculate final value
    const FinalValue = totalValue - discountAmount + stampDuty + legalFee + parseFloat(OtherCharges);
  
    setStampDuty(stampDuty);
    setLegalFee(legalFee);
    setFinalValue(FinalValue);
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
          <h2>Property Type: {PropertyType}</h2>
          <h3>Location: {Location}</h3>
          <h3>District: {District}</h3>
          {PropertyType.toLowerCase() === 'land' ? ( <h3>Lot No: {LotNo}</h3> ) : ( <h3>No. of Bedrooms: {BedRooms}</h3> )}
          {PropertyType.toLowerCase() === 'land' ? ( <h3>Size: {Size} P</h3> ) : ( <h3>Size: {HouseArea} Sq ft.</h3> )} {/* if house then sq ft, if land then perch */}
          <h3>Unit Price: LKR {UnitPrice}</h3>
          <h3>Total Price: LKR {TotalPrice}</h3>
          <h3>Stamp Duty: {new Intl.NumberFormat('en-US').format(StampDuty)}</h3> 
          <p>
            &nbsp;&nbsp;&nbsp;&nbsp;*stamp fee {'\u2192'} 3% upto LKR 100,000; 4% if greater
          </p>
          <h3>Legal Fee: {new Intl.NumberFormat('en-US').format(LegalFee)}</h3>
          <p>
            &nbsp;&nbsp;&nbsp;&nbsp;*legal fee {'\u2192'} 1% upto 100,000,000; 1.5% greater
          </p>

          {/* <h3>Customer Name: {FirstName} {LastName}</h3>  */}
          {/* {CustomerDetails.map((customer) => (
  <h3 key={customer.CustomerID}>
    Customer Name: {customer.FirstName} {customer.LastName}
  </h3> ))}*/}

         

          <form onSubmit={handleSubmit}>
            <table>
              <tr>
              <td className="label">Discount %</td>
              <td className="label1">:</td>
              <td className="pp_textbox">
                <input
                  type="number"
                  name="discount" required
                  onChange={handleDiscountChange}
                  value={Discount}
                  onBlur={handleDiscountChange} // Add onBlur event to check the value when the user leaves the input field.
                  style={{ width: "50px" }}
                />
                </td>
              </tr>
              <tr>
                <td className="label">Other Charges</td>
                <td className="label1">:</td>
                <td className="pp_textbox">
                <input
                  type="number"
                  name="othercharges" required
                  onChange={handleOtherChargesChange}
                  onBlur={handleOtherChargesChange}
                  value={OtherCharges}
                  style={{ width: "100px" }}
                  />
                </td>
              </tr>
            </table>
            <button className="cancelbutton" onClick={handleCancelClick}>
              Cancel
            </button>
            <input type="submit" className="submitbutton" value='Assign'/>
          </form>

          <h3>Final Value: {new Intl.NumberFormat('en-US').format(FinalValue)}</h3>

        </div>
      </div>
    </div>
  );
}
