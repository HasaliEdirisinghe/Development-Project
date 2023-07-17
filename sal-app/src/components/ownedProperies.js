import './css/DashboardStyle.css';
import './css/customer.css';
import { logout } from './logout';
import profileImage from './img/user_icon.png';
import { getUsername, handleArea1 } from './LocalStorageUtils';
import homeImage from './img/homepage.png';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

// import 'bootstrap/dist/css/bootstrap.min.css';


export function OwnedProperties() {
    const handleButtonClick = async () => {
        window.location.href = '/addcustomer';
    }
    const username2 = getUsername();

  // setUsername(username2)
  const [id2, setId2] = useState(null);
    const [properties, setProperties] = useState([]);
    const [wordEntered, setWordEntered] = useState("");
    const [id, setID] = useState([]);
    const [NIC, setNIC] = useState("");
    const [FirstName, setFName] = useState("");
    const [LastName, setLName] = useState("");
    const [PhoneNumber, setPhone] = useState("");


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
  const url_properties = 'http://localhost/backend/ownedproperties.php';
  let fData = new FormData();
    fData.append('cusid', id);
      axios.post(url_properties, fData)
      .then(response => {
        const properties = response.data;
        setProperties (properties);
        // Do further processing with the username here
      })
      .catch(error => {
        alert(error.message)
      });
}

function getUserData(){

        setID(localStorage.getItem('id'));
        setNIC(localStorage.getItem('NIC'));
        setFName(localStorage.getItem('FirstName'));
        setLName(localStorage.getItem('LastName'));
        setPhone(localStorage.getItem('PhoneNumber'));

}
getusername();
getAllProperties();
getUserData();
  }, []); // Empty dependencies array means the effect only runs once (on mount)

  const getData = () => {
    axios
        .get("http://localhost/backend/ownedproperties.php")
        .then((res) => {
          setProperties(res.data);
        })
        .catch((err) => {
          alert(err.message);
        });
  }
const setData = (med) => {

  let {_id,NIC,FirstName,LastName,PhoneNumber} = med;
  
  localStorage.setItem('id',_id);
  localStorage.setItem('NIC', NIC);
  localStorage.setItem('FirstName', FirstName);
  localStorage.setItem('LastName', LastName);
  localStorage.setItem('PhoneNumber', PhoneNumber);

  }

  const handleFilter = (event) => {
    const searchWord = event.target.value;
    console.log(searchWord);
    setWordEntered(searchWord);
    axios.get("http://localhost/backend/ownedproperties.php")
    .then(response => {
        console.log(response)
        const newFilter = properties.filter((response) => {
            return response.Location.toLowerCase().includes(searchWord.toLowerCase());
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
    <input type="search" 
    placeholder="Search" 
    name="Searchquery" 
    value={wordEntered}
    onChange={handleFilter}
    >
    </input>
    <br/>
    <h2>{FirstName}{' '} {LastName}</h2>
    <h3>{NIC}</h3>



<br/><br/>
      <table class="table table-striped" border={1}>
            <thead>
                <th>Property Type</th>
                <th>Location</th>
                <th>District</th>
                <th>Address</th>
                <th>Lot No</th>
                <th>Plan No</th>
                <th>Size</th>
                <th>Unit Price</th>
                <th>Total Price</th>
                <th>Action</th>
            </thead>    
              <tbody>
                {properties.map((property) => {
                  return (
                    <tr>
                      <td>{property.PropertyType}</td>
                      <td>{property.Location}</td>
                      <td>{property.District}</td>
                      <td>{property.Address}</td>
                      <td>{property.LotNo}</td>
                      <td>{property.PlanNo}</td>
                      <td>{property.Size}</td>
                      <td>{property.UnitPrice}</td>
                      <td>{property.TotalPrice}</td>
                      <td>
                        <Link to={`/Inventory/medbatches/update/whole`}>
                          <button id="view" style={{ marginLeft: '.5rem' }} class="btn btn-warning" onClick={()=>setData(property)}>See Data</button>
                        </Link>
                         
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

