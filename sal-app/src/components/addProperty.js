import React from 'react';
import './css/DashboardStyle.css';
import './css/addproperty.css';
import { useState } from 'react';
import axios from 'axios';
import myImage from './img/property.png';
import { logout } from './logout';
import { getUsername, handleArea1 } from './LocalStorageUtils';
import homeImage from './img/homepage.png';
import {Link} from 'react-router-dom';



export function AddProperty() {
  const handleButtonClick = (e) => {
    if (e.target.nodeName !== 'BUTTON') {
      return;
    }
    // e.target.style.background = '#808080';
  };

  const username2 = getUsername();
    // State variables to hold the username and password
    const [propertytype,setPropertyType] = useState('');
    const [projectname,setProjectName] = useState('');
    const [location,setLocation] = useState('');
    const [district,setDistrict] = useState('');
    const [address,setAddress] = useState('');
    const [lot_no,setLotNo] = useState('');
    const [plan_no,setPlanNo] = useState('');
    const [size,setSize] = useState('');
    const [price,setPrice] = useState('');
    
    
    const handleSubmit = async (event) => {
      event.preventDefault();
      if(projectname.length === 0){
        alert("Project Name is required!");
      }
      else if (location.length === 0){
        alert("Location is required!");
      }
      else if(address.length === 0){
        alert("Property Address is required!");
      }
      else if(size.length === 0){
        alert("Size is required!");
      }
      else if(price.length === 0){
        alert("Price is required!");
      }
      else{

      
        // Send the customer data to the database

        let fData = new FormData();
        fData.append('projectname', projectname);
        fData.append('propertytype', propertytype);
        fData.append('location', location);
        fData.append('district', district);
        fData.append('address', address);
        fData.append('lot_no', lot_no);
        fData.append('plan_no', plan_no);
        fData.append('size', size);
        fData.append('price', price);

      // Send a POST request with the form data
      axios.post(`http://localhost/backend/addproperty.php`, fData)
        .then(response => {
          if (response.data === 'Property Added') {
            alert('Property Added Successfully');
            // Reset the textboxes to their initial values
            setProjectName('');
            setLocation('');
            setDistrict('');
            setAddress('');
            setLotNo('');
            setPlanNo('');
            setSize('');
            setPrice('');
            window.location.href = '/salesmanagerviewproperty';

        } else {
            alert('Invalid');
          }
        })
        .catch(error => alert(error.message)); // Display an error message if the request fails
      }
    } 
    const handleCancelClick = (event) => {
      event.preventDefault();
      setProjectName('');
      setLocation('');
            setDistrict('');
            setAddress('');
            setLotNo('');
            setPlanNo('');
            setSize('');
            setPrice('');
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
        <div id="wrapper" onClick={handleButtonClick}>
        <table>
          <tr><td>
          <Link to={`/dashvisuals`}>
          <button class="tablebutton">Dashboard</button>
            </Link>
            </td></tr>
            <tr><td>
            <Link to={`/viewcustomer`}>
            <button class="tablebutton">Customer</button>
            </Link>
              
            </td></tr>
            <tr><td>
            <Link to={`/salesmanagerviewproperty`}>
            <button class="tablebutton">Property</button>            </Link>
            </td></tr>
            <tr><td>
            <Link to={`/salesmanagerviewprojectpage`}>
              <button class="tablebutton">Project Page</button>
              </Link>
            </td></tr>
            <tr><td>
            <Link to={`/salesmanagerapprovals`}>
              <button class="tablebutton">Approvals</button>
              </Link>
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
                        <td colspan="3" align='center' class='propertyimage'><img src={myImage} alt="property"/>    </td>
                    </tr>
                    <tr>
                        <td class='label'>Project Name</td>
                        <td class='label1'>:</td>
                        <td class='textbox'><input type='text' name='projectname'  onChange={(e) => setProjectName(e.target.value)} value={projectname}/></td>
                    </tr>
                    <tr>
                        <td class='label'>Property Type</td>
                        <td class='label1'>:</td>
                        <td class='radioButton'>
                            <input type="radio" id="house" name="property_type" value="House" onChange={(e) => setPropertyType(e.target.value)} />
                            <label for="html">House</label>
                            <input type="radio" id="land" name="property_type" value="Land" onChange={(e) => setPropertyType(e.target.value)}/>
                            <label for="css">Land</label>
                        </td>
                    </tr>
                    <tr>
                        <td class='label'>Location</td>
                        <td class='label1'>:</td>
                        <td class='dropdown'><input type='text' name='location'  onChange={(e) => setLocation(e.target.value)} value={location}/></td>
                    </tr>
                    <tr>
                        <td class='label'>District</td>
                        <td class='label1'>:</td>
                        <td class='textbox'>
                            <select name="district" id="district" onChange={(e) => setDistrict(e.target.value)} value={district}>
                                <option value="blank">   </option>
                                <option value="Ampara">Ampara</option>
                                <option value="Anuradhapura">Anuradhapura</option>
                                <option value="Badulla">Badulla</option>
                                <option value="Batticaloa">Batticaloa</option>
                                <option value="Colombo">Colombo</option>
                                <option value="Galle">Galle</option>
                                <option value="Gampaha">Gampaha</option>
                                <option value="Hambantota">Hambantota</option>
                                <option value="Jaffna">Jaffna</option>
                                <option value="Kalutara">Kalutara</option>
                                <option value="Kandy">Kandy</option>
                                <option value="Kegalle">Kegalle</option>
                                <option value="Kilinochchi">Kilinochchi</option>
                                <option value="Kurunegala">Kurunegala</option>
                                <option value="Mannar">Mannar</option>
                                <option value="Matale">Matale</option>
                                <option value="Matara">Matara</option>
                                <option value="Monaragala">Monaragala</option>
                                <option value="Mullaitivu">Mullaitivu</option>
                                <option value="Nuwara Eliya">Nuwara Eliya</option>
                                <option value="Polonnaruwa">Polonnaruwa</option>
                                <option value="Puttalam">Puttalam</option>
                                <option value="Ratnapura">Ratnapura</option>
                                <option value="Trincomalee">Trincomalee</option>
                                <option value="Vavuniya">Vavuniya</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td class='label'>Address</td>
                        <td class='label1'>:</td>
                        <td class='textbox'><input type='text' name='property_address' onChange={(e) => setAddress(e.target.value)} value={address}/></td>
                    </tr>
                    <tr>
                        <td class='label'>Lot No / BR</td>
                        <td class='label1'>:</td>
                        <td class='textbox'><input type='text' name='lotNo'  onChange={(e) => setLotNo(e.target.value)} value={lot_no}/></td>
                    </tr>
                    <tr>
                        <td class='label'>Plan No</td>
                        <td class='label1'>:</td>
                        <td class='textbox'><input type='text' name='planNo'  onChange={(e) => setPlanNo(e.target.value)} value={plan_no} /></td>
                    </tr>
                    <tr>
                        <td class='label'>Size (Perch)</td>
                        <td class='label1'>:</td>
                        <td class='textbox'><input type='number' name='size'  onChange={(e) => setSize(e.target.value)} step="0.01" value={size}/></td>
                    </tr>
                    <tr>
                        <td class='label'>Unit Price (LKR)</td>
                        <td class='label1'>:</td>
                        <td class='textbox'><input type='number' name='price'  onChange={(e) => setPrice(e.target.value) } step="0.01" value={price}/></td>
                    </tr>
                </table>
                <button class="cancelbutton" onClick={handleCancelClick}>Reset</button>
                <input type='submit' class='submitbutton' value='Submit'/> 

            </form>
                
        

        </div>
    </div>
</div>

);
}