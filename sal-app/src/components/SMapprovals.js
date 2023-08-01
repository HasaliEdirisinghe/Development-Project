import './css/DashboardStyle.css';
import profileImage from './img/user_icon.png';
import {Link} from 'react-router-dom';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { logout } from './logout';
import { getUsername, handleArea1,getAllProperties } from './LocalStorageUtils';
import homeImage from './img/homepage.png';


export function SalesManagerApprovals() {
  const handleButtonClick = (e) => {
    if (e.target.nodeName !== 'BUTTON') {
      return;
    }
    // e.target.style.background = '#808080';
  };
 
  // const [username,setUsername] = useState('');
  const username2 = getUsername();
  // setUsername(username2)
  const [id2, setId2] = useState(null);
  const [wordEntered, setWordEntered] = useState("");
  const [properties, setProperties] = useState([]);
  const [customers, setCustomers] = useState([]);




  useEffect(() => {
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

      getAllProperties()
      .then((propertiesData) => {
        setProperties(propertiesData);
      })
      .catch((error) => {
        alert(error.message);
      });

  }, []); // Empty dependencies array means the effect only runs once (on mount)

  const getData = () => {
    axios
        .get("http://localhost/backend/salesofficerapprovals.php")
        .then((res) => {
          setCustomers(res.data);
        })
        .catch((err) => {
          alert(err.message);
        });
  }

  const handleFilter = (event) => {
    const searchWord = event.target.value;
    console.log(searchWord);
    setWordEntered(searchWord);
    axios.get("http://localhost/backend/salesofficerapprovals.php") //new php?
    .then(response => {
        console.log(response)
        const newFilter = properties.filter((response) => {
          //search using customer NIC, project name or location
            return response.NIC.toLowerCase().includes(searchWord.toLowerCase()) ||response.ProjectName.toLowerCase().includes(searchWord.toLowerCase()) || response.Location.toLowerCase().includes(searchWord.toLowerCase()); 
        });
  
        if (searchWord === "") {
            console.log("EMPLTY");
            getData();
        } else {
          setProperties(newFilter);
        }
    })
    .catch(error => console.log(error));
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
        </button>      </div>

      <div class="area2">
        <input type='text' value={id2} readOnly/>
        <a href="/userprofile">
          <img src={profileImage} alt="profile" className="profile" />
        </a>
            
      </div>

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
        <h2>Approval Status</h2>
        <br></br>

    <div class="section">
    <input type="search" 
    placeholder="Search NIC" 
    name="Searchquery" 
    value={wordEntered}
    onChange={handleFilter}
    >
    </input>

    <br/><br/><br/>
    <table class="showtable">
            <thead>
                <th>NIC</th>
                <th>Name</th>
                {/* <th>First Name</th>
                <th>Last Name</th> */}
                <th>Prop. ID</th>
                <th>Project Name</th>
                <th>Property Type</th>
                <th>Location</th>
                <th>LotNo</th>
                <th>BR</th>
                <th>Size</th>
                <th>Unit Price</th>
                <th>Total Price</th>
                <th>Final Value</th>    
                <th>ProjectPage Status</th> 
                <th>Deed Status</th>    
            </thead>    
              <tbody>
                {properties.map((property) => {
                  return (
                    <tr>
                      <td>{property.NIC}</td>
                      <td>{property.FirstName} {property.LastName}</td>
                      {/* <td>{property.LastName}</td> */}
                      <td>{property.PropertyID}</td>
                      <td>{property.ProjectName}</td>
                      <td>{property.PropertyType}</td>
                      <td>{property.Location}</td>
                      <td>{property.LotNo}</td>
                      <td>{property.BedRooms}</td>
                      <td align='right'>
                        {property.PropertyType.toLowerCase() === 'land' ? property.Size + ' P' : property.HouseArea + ' sqft'} {/* if house then sq ft, if land then perch */}
                      </td>
                      <td align='right'>{property.UnitPrice}</td>
                      <td align='right'>{property.TotalPrice}</td>
                      <td align='right'>{property.FinalValue}</td>
                      <td>{property.ProjPageStatus}</td>
                      <td>{property.DeedStatus}</td> 
           
                    </tr>
                  );
                })}
              </tbody>
            </table>
      
    </div>
  </div>
</div>
  </div>

  );
}

