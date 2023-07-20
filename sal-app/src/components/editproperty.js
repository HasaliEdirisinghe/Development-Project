import React, { useState, useEffect } from 'react';
import './css/DashboardStyle.css';
import './css/addcustomer.css';
import { logout } from './logout';
import axios from 'axios';
import myImage from './img/property.png';
import { Link } from 'react-router-dom';
import { getUsername, handleArea1 } from './LocalStorageUtils';
import homeImage from './img/homepage.png';

export function EditProperty() {
  const [PropertyType, setPropertyType] = useState('');
  const [ProjectName, setProjectName] = useState('');
  const [Location, setLocation] = useState('');
  const [District, setDistrict] = useState('');
  const [Address, setAddress] = useState('');
  const [LotNo, setLotNo] = useState('');
  const [PlanNo, setPlanNo] = useState('');
  const [Size, setSize] = useState('');
  const [Price, setPrice] = useState('');
  const [PropertyID, setPropertyID] = useState('');

  const username2 = getUsername();

  useEffect(() => {
    const propertytype = localStorage.getItem('propertytype');
    const projectname = localStorage.getItem('projectname');
    const location = localStorage.getItem('location');
    const district = localStorage.getItem('district');
    const address = localStorage.getItem('address');
    const lot_no = localStorage.getItem('lot_no');
    const plan_no = localStorage.getItem('plan_no');
    const size = localStorage.getItem('size');
    const price = localStorage.getItem('price');

    setPropertyType(propertytype);
    setProjectName(projectname);
    setLocation(location);
    setDistrict(district);
    setAddress(address);
    setLotNo(lot_no);
    setPlanNo(plan_no);
    setSize(size);
    setPrice(price);
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Send the updated property data to the database

    const formData = new FormData();
    formData.append('propertytype', PropertyType);
    formData.append('projectname', ProjectName);
    formData.append('location', Location);
    formData.append('district', District);
    formData.append('address', Address);
    formData.append('lot_no', LotNo);
    formData.append('plan_no', PlanNo);
    formData.append('size', Size);
    formData.append('price', Price);
    formData.append('id', PropertyID);

    // Send a POST request with the form data
    axios
      .post(`http://localhost/backend/editproperty.php`, formData)
      .then((response) => {
        if (response.data === 'Property Updated') {
          alert('Property updated successfully');
          window.location.href = '/salesmanagerviewproperty';
        } else {
          alert('Invalid');
        }
      })
      .catch((error) => alert(error.message));
  };

  const handleCancelClick = (event) => {
    event.preventDefault();
    // Reset the property data
    setProjectName('');
    setLocation('');
    setDistrict('');
    setAddress('');
    setLotNo('');
    setPlanNo('');
    setSize('');
    setPrice('');
  };

  function gotoDashboard() {
    handleArea1(username2);
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

      <div className="area4">
  <div>
    <form onSubmit={handleSubmit}>
      <table>
        <tr>
          <td colspan="3" align="center" className="propertyimage">
            <img src={myImage} alt="property" />
          </td>
        </tr>
        <tr>
          <td className="label">Project Name</td>
          <td className="label1">:</td>
          <td className="textbox">
            <input
              type="text"
              name="projectname"
              value={ProjectName}
              onChange={(e) => setProjectName(e.target.value)}
              required
            />
          </td>
        </tr>
        <tr>
          <td className="label">Property Type</td>
          <td className="label1">:</td>
          <td className="textbox">
            <input
              type="text"
              name="property_type"
              value={PropertyType}
              onChange={(e) => setPropertyType(e.target.value)}
            />
          </td>
        </tr>
        <tr>
          <td className="label">Location</td>
          <td className="label1">:</td>
          <td className="dropdown">
            <input
              type="text"
              name="location"
              value={Location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </td>
        </tr>
        <tr>
          <td className="label">District</td>
          <td className="label1">:</td>
          <td className="textbox">
                            <select name="district" id="district" onChange={(e) => setDistrict(e.target.value)} value={District}>
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
                        <td class='textbox'><input type='text' name='property_address' onChange={(e) => setAddress(e.target.value)} value={Address}/></td>
                    </tr>
                    <tr>
                        <td class='label'>Lot No / BR</td>
                        <td class='label1'>:</td>
                        <td class='textbox'><input type='text' name='lotNo'  onChange={(e) => setLotNo(e.target.value)} value={LotNo}/></td>
                    </tr>
                    <tr>
                        <td class='label'>Plan No</td>
                        <td class='label1'>:</td>
                        <td class='textbox'><input type='text' name='planNo'  onChange={(e) => setPlanNo(e.target.value)} value={PlanNo} /></td>
                    </tr>
                    <tr>
                        <td class='label'>Size (Perch)</td>
                        <td class='label1'>:</td>
                        <td class='textbox'><input type='number' name='size'  onChange={(e) => setSize(e.target.value)} step="0.01" value={Size}/></td>
                    </tr>
                    <tr>
                        <td class='label'>Unit Price (LKR)</td>
                        <td class='label1'>:</td>
                        <td class='textbox'><input type='number' name='price'  onChange={(e) => setPrice(e.target.value) } step="0.01" value={Price}/></td>
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


