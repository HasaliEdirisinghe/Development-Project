import './css/DashboardStyle.css';
import profileImage from './img/user_icon.png';
import {Link} from 'react-router-dom';
import { getUsername, handleArea1, getAllProperties } from './LocalStorageUtils';
import homeImage from './img/homepage.png';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { logout } from './logout';


export function ViewProjectPage() {
  const handleButtonClick = (e) => {
    if (e.target.nodeName !== 'BUTTON') {
      return;
    }
    e.target.style.background = '#808080';
  };


  // const [username,setUsername] = useState('');
  const username2 = getUsername();
  // setUsername(username2)
  const [id2, setId2] = useState(null);
  const [customers, setCustomers] = useState([]);
  const [properties, setProperties] = useState([]);
  const [wordEntered, setWordEntered] = useState("");
  const [wordForProject, setWordForProject] = useState("");


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
        .get("http://localhost/backend/customerpage.php")
        .then((res) => {
          setCustomers(res.data);
        })
        .catch((err) => {
          alert(err.message);
        });
  }

const setData = (med) => {

  let {CustomerID, NIC,FirstName,LastName,OtherNames, PropertyID, ProjectName, PropertyType, Location, Address, LotNo, Bedrooms, PlanNo, Size, UnitPrice, TotalPrice, Discount, OtherCharges, FinalValue, ProjPageStatus} = med;
  
  localStorage.setItem('NIC', NIC);
  localStorage.setItem('FirstName', FirstName);
  localStorage.setItem('LastName', LastName);
  localStorage.setItem('OtherNames', OtherNames);
  localStorage.setItem('ProjectName', ProjectName);
  localStorage.setItem('PropertyType', PropertyType);
  localStorage.setItem('Location', Location);
  localStorage.setItem('Address', Address);
  localStorage.setItem('LotNo', LotNo);
  localStorage.setItem('PlanNo', PlanNo);
  localStorage.setItem('Bedrooms', Bedrooms);
  localStorage.setItem('Size', Size);
  localStorage.setItem('UnitPrice', UnitPrice);
  localStorage.setItem('TotalPrice', TotalPrice);
  localStorage.setItem('Discount', Discount);
  localStorage.setItem('OtherCharges', OtherCharges);
  localStorage.setItem('FinalValue', FinalValue);
  localStorage.setItem('ProjPageStatus', ProjPageStatus);
  localStorage.setItem('CustomerID', CustomerID);
  localStorage.setItem('PropertyID', PropertyID);



  

  }

  const handleFilter = (event) => {
    const searchWord = event.target.value;
    console.log(searchWord);
    setWordEntered(searchWord);
    axios.get("http://localhost/backend/getdetailsforprojectpage.php") //new php?
    .then(response => {
        console.log(response)
        const newFilter = properties.filter((response) => {
          //search using customer NIC
            return response.NIC.toLowerCase().includes(searchWord.toLowerCase()); 
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

  const handleProjectFilter = (event) => {
    const searchWord = event.target.value;
    console.log(searchWord);
    setWordForProject(searchWord);
    axios.get("http://localhost/backend/getdetailsforprojectpage.php") //new php?
    .then(response => {
        console.log(response)
        const newFilter = properties.filter((response) => {
          //search using customer PropertyType, project name or location
            return response.PropertyType.toLowerCase().includes(searchWord.toLowerCase()) ||
                   response.ProjectName.toLowerCase().includes(searchWord.toLowerCase()) || 
                   response.Location.toLowerCase().includes(searchWord.toLowerCase()); 
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
        <div id="wrapper" >
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
                        </Link>            </td></tr>
            <tr><td>
            <button className="tablebutton" type="button" onClick={logout}>Logout</button>  
            </td></tr>
          </table>
        </div>
      
      </div>

      <div class="area4">
  <div>
    <div class="section">
    <input type="search" placeholder="Search NIC" name="Searchquery" value={wordEntered} onChange={handleFilter} className="search-nic-input"/>

    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    
    <input type="search" placeholder="Search Project, Location or Property Type" name="Searchquery" value={wordForProject} onChange={handleProjectFilter} className="search-project-input"/>


    <br/><br/><br/>
    <table class="showtable">
            <thead>
                <th>NIC</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Other Names</th>
                <th>Project Name</th>
                <th>Property Type</th>
                <th>Location</th>
                {/* <th>Address</th> */}
                <th>LotNo</th>
                <th>BR</th>
                <th>Size</th>
                <th>Unit Price</th>
                <th>Total Price</th>
                <th>Final Value</th>
                <th>Actions</th>
            </thead>    
              <tbody>
                {properties.map((property) => {
                  return (
                    <tr>
                      <td>{property.NIC}</td>
                      <td>{property.FirstName}</td>
                      <td>{property.LastName}</td>
                      <td>{property.OtherNames}</td>
                      <td>{property.ProjectName}</td>
                      <td>{property.PropertyType}</td>
                      <td>{property.Location}</td>
                      {/* <td>{property.Address}</td> */}
                      <td>{property.LotNo}</td>
                      <td>{property.BedRooms}</td>
                      <td align='right'>
                        {property.PropertyType.toLowerCase() === 'land' ? property.Size + ' P' : property.HouseArea + ' sqft'} {/* if house then sq ft, if land then perch */}
                      </td>
                      <td align='right'>{property.UnitPrice}</td>
                      <td align='right'>{property.TotalPrice}</td>
                      <td align='right'>{property.FinalValue}</td>
                      <td> <Link to={`/personalprojectpage`}>
                          <button id="view" style={{ marginLeft: '.5rem' }} class="btn btn-warning" onClick={()=>setData(property)}>View More</button>
                        </Link></td>

                      
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

