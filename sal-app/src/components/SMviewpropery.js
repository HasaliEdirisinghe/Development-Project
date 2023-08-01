import './css/DashboardStyle.css';
import './css/customer.css';
import { logout } from './logout';
import profileImage from './img/user_icon.png';
import { getUsername, handleArea1, getAllProperties } from './LocalStorageUtils';
import homeImage from './img/homepage.png';import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
// import 'bootstrap/dist/css/bootstrap.min.css';




export function SalesManagerViewProperty() {
    const handleButtonClick = async () => {
        window.location.href = '/addcustomer';
    }
    const username2 = getUsername();

  // setUsername(username2)
  const [id2, setId2] = useState(null);
    const [properties, setProperties] = useState([]);
    const [wordEntered, setWordEntered] = useState("");
    const [newWordEntered, setNewWordEntered] = useState("");

    
  useEffect(() => {
    
    function getusername(){
  
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
      .catch(error => {
        alert(error.message)
      });
 
    }
function getAllProperties(){
  const url_properties = 'http://localhost/backend/viewallproperties.php';
      axios.post(url_properties)
      .then(response => {
        const properties = response.data;
        setProperties (properties);
        // Do further processing with the username here
      })
      .catch(error => {
        alert(error.message)
      });
} 
    getusername()
    getAllProperties()
  }, []); // Empty dependencies array means the effect only runs once (on mount)

  const getData = () => {
    axios
        .get("http://localhost/backend/viewallproperties.php")
        .then((res) => {
          setProperties(res.data);
        })
        .catch((err) => {
          alert(err.message);
        });
  }
const setData = (med) => {

  let {PropertyID, ProjectName, PropertyType, Location,District, Address, LotNo, BedRooms, PlanNo, Size, UnitPrice} = med;
  
  localStorage.setItem('PropertyID',PropertyID);
  localStorage.setItem('ProjectName', ProjectName);
  localStorage.setItem('PropertyType', PropertyType);
  localStorage.setItem('Location', Location);
  localStorage.setItem('District', District);
  localStorage.setItem('Address', Address);
  localStorage.setItem('LotNo', LotNo);
  localStorage.setItem('PlanNo', PlanNo);
  localStorage.setItem('Size', Size);
  localStorage.setItem('UnitPrice', UnitPrice);
  localStorage.setItem('Bedrooms', BedRooms);


  }

  const handleFilter = (event) => {
    const searchWord = event.target.value;
    console.log(searchWord);
    setWordEntered(searchWord);
    axios.get("http://localhost/backend/viewallproperties.php")
    .then(response => {
        console.log(response)
        const newFilter = properties.filter((response) => {
            //search from location & project name
            return response.Location.toLowerCase().includes(searchWord.toLowerCase()) || 
                   response.ProjectName.toLowerCase().includes(searchWord.toLowerCase()) ||
                   response.District.toLowerCase().includes(searchWord.toLowerCase()) ||
                   response.PropertyType.toLowerCase().includes(searchWord.toLowerCase()); 
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

  const filterDistrict = (event) => {
    const searchWord = event.target.value;
    console.log(searchWord);
    setNewWordEntered(searchWord);
    axios.get("http://localhost/backend/viewallproperties.php")
    .then(response => {
        console.log(response)
        const newFilter = properties.filter((response) => {
            //search from district
            return response.District.toLowerCase().includes(searchWord.toLowerCase()); 
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
  


// Step 1: Add a function to delete a property
const deleteProperty = (propertyId) => {
    const url = `http://localhost/backend/deleteproperty.php`;

    const formData = new FormData();
    formData.append('PropertyID', propertyId);

    // Send a DELETE request to the backend with the property ID
    axios
      .post(url, formData)
      .then((response) => {
        if (response.data === 'Property Deleted') {
          alert('Property deleted successfully'); //need to show which property is deleted
          // Refresh the property list after deleting
          getAllProperties();
        } else {
          alert('Property already assigned. Cannot delete!');
        }
      })
      .catch((error) => {
        alert(error.message);
      });
    }

  
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
  
<a href='/addproperty'>
  <button type='button'>Add New Property</button>
  </a> 

<br/><br/><br/>

<input type="search" placeholder="Search Property Type, Project, Location, District" name="Searchquery" value={wordEntered} onChange={handleFilter} className='search-bar' />

{/* <br/><br/><br/>
    <input type="search" 
    placeholder="Search" 
    name="Searchquery" 
    value={newWordEntered}
    onChange={filterDistrict}
    >
    </input> */}



<br/><br/>
      <table class="showtable">
            <thead>
                <th> </th>
                {/* <th>Id</th> */}
                <th>Type</th>
                <th>Project Name</th>
                <th>Location</th>
                <th>District</th>
                <th>Address</th>
                <th>LotNo</th>
                <th>BR</th>
                <th>PlanNo</th>
                <th>Size</th>
                <th>Unit Price</th>
                <th>Total Price</th>
                <th> </th>

            </thead>    
              <tbody>
                {properties.map((property) => {
                  return (
                    <tr>
                    <td>
                      <Link to={`/editproperty`}>
                          <button id="view" style={{ marginLeft: '.5rem' }} class="btn btn-warning" onClick={()=>setData(property)}>Edit</button>
                        </Link>
                      </td>
                      {/* <td>{property.PropertyID}</td> */}
                      <td>{property.PropertyType}</td>
                      <td>{property.ProjectName}</td>
                      <td>{property.Location}</td>
                      <td>{property.District}</td>
                      <td>{property.Address}</td>
                      <td>{property.LotNo}</td>
                      <td>{property.BedRooms}</td>
                      <td>{property.PlanNo}</td>
                      <td align='right'>
                        {property.PropertyType.toLowerCase() === 'land' ? property.Size + ' P' : property.HouseArea + ' sqft'} {/* if house then sq ft, if land then perch */}
                      </td>
                      <td align='right'>{property.UnitPrice}</td>
                      <td align='right'>{property.TotalPrice}</td>
                      <td>
                      {/* Add a confirmation prompt */}
                      <button
                        id="view"
                        style={{ marginLeft: '.5rem' }}
                        className="btn btn-warning"
                        onClick={() => {
                          if (window.confirm('Are you sure you want to delete this property?')) {
                            deleteProperty(property.PropertyID);
                          }
                        }}
                      >
                        Delete
                      </button>
                    </td>

                    </tr>
                  );
                })}
              </tbody>
            </table>
     </div>
    </div>
  </div>

  );
}

