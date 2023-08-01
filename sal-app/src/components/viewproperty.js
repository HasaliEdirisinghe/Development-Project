import './css/DashboardStyle.css';
import './css/customer.css';
import { logout } from './logout';
import profileImage from './img/user_icon.png';
import { getUsername, handleArea1, getAllProperties } from './LocalStorageUtils';
import homeImage from './img/homepage.png';import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
// import 'bootstrap/dist/css/bootstrap.min.css';




export function ViewProperty() {
    const handleButtonClick = async () => {
        window.location.href = '/addcustomer';
    }
    const username2 = getUsername();

  // setUsername(username2)
  const [id2, setId2] = useState(null);
    const [properties, setProperties] = useState([]);
    const [wordEntered, setWordEntered] = useState("");
    const [typeEntered, setTypeEntered] = useState(""); 
    const [lotEntered, setLotEntered] = useState(""); 

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

  let {id,NIC,FirstName,LastName,PhoneNumber} = med;
  
  localStorage.setItem('id',id);
  localStorage.setItem('NIC', NIC);
  localStorage.setItem('FirstName', FirstName);
  localStorage.setItem('LastName', LastName);
  localStorage.setItem('PhoneNumber', PhoneNumber);

  }

  const handleFilter = (event) => {
    const searchWord = event.target.value;
    console.log(searchWord);
    setWordEntered(searchWord);
    axios.get("http://localhost/backend/viewallproperties.php")
    .then(response => {
        console.log(response)
        const newFilter = properties.filter((response) => {
            return response.Location.toLowerCase().includes(searchWord.toLowerCase()) || //search from location
                   response.ProjectName.toLowerCase().includes(searchWord.toLowerCase()) || //search from Project name
                   response.District.toLowerCase().includes(searchWord.toLowerCase()) ; //search from District
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

  const PropertyTypeFilter = (event) => {
    const searchWord = event.target.value;
    console.log(searchWord);
    setTypeEntered(searchWord);
    axios.get("http://localhost/backend/viewallproperties.php")
    .then(response => {
        console.log(response)
        const newFilter = properties.filter((response) => {
            return response.PropertyType.toLowerCase().includes(searchWord.toLowerCase());
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

  const handleLotBRFilter = (event) => {
    const searchWord = event.target.value;
    console.log(searchWord);
    setLotEntered(searchWord);
    axios.get("http://localhost/backend/viewallproperties.php")
    .then(response => {
        console.log(response)
        const newFilter = properties.filter((response) => {
            return response.LotNo.toLowerCase().includes(searchWord.toLowerCase()) || //search from LotNo
                   response.Bedrooms.toLowerCase().includes(searchWord.toLowerCase()) ; //search from BR
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
              <button class="tablebutton">Property</button>
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

      <div class="area4">

<div>
  

<input type="search" placeholder=" Search Property Type" name="Searchquery" value={typeEntered} onChange={PropertyTypeFilter} class="search-type" />
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
<input type="search" placeholder="Search Project, Location, District" name="Searchquery" value={wordEntered} onChange={handleFilter} class="search-bar" />
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
<input type="search" placeholder="Search LotNo/BR" name="Searchquery" value={lotEntered} onChange={handleLotBRFilter} class="search-type" />


<br/><br/>
      <table class="showtable">
            <thead>
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

            </thead>    
              <tbody>
                {properties.map((property) => {
                  return (
                    <tr>
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

