import './css/DashboardStyle.css';
import './css/customer.css';
import { logout } from './logout';
import profileImage from './img/user_icon.png';
import { getUsername, handleArea1 } from './LocalStorageUtils';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import homeImage from './img/homepage.png';
// import 'bootstrap/dist/css/bootstrap.min.css';




export function CustomerPage() {
    const handleButtonClick = async () => {
        window.location.href = '/addcustomer';
    }

    const username2 = getUsername();

  // setUsername(username2)
  const [id2, setId2] = useState(null);
    const [customers, setCustomers] = useState([]);
    const [wordEntered, setWordEntered] = useState("");
    
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
function getAllCustomers(){
  const url_customers = 'http://localhost/backend/customerpage.php';
      axios.post(url_customers)
      .then(response => {
        const customers = response.data;
        setCustomers (customers);
        // Do further processing with the username here
      })
      .catch(error => {
        alert(error.message)
      });
}
    getusername()
    getAllCustomers()
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

  let {CustomerID, NIC,FirstName,LastName,OtherNames, PermanentAddress, PhoneNumber} = med;
  
  localStorage.setItem('customerId',CustomerID);
  localStorage.setItem('NIC', NIC);
  localStorage.setItem('FirstName', FirstName);
  localStorage.setItem('LastName', LastName);
  localStorage.setItem('OtherNames', OtherNames);
  localStorage.setItem('PermanentAddress', PermanentAddress);
  localStorage.setItem('PhoneNumber', PhoneNumber);

  }

  const handleFilter = (event) => {
    const searchWord = event.target.value;
    console.log(searchWord);
    setWordEntered(searchWord);
    axios.get("http://localhost/backend/customerpage.php") 
    .then(response => {
        console.log(response)
        const newFilter = customers.filter((response) => {
            return response.NIC.toLowerCase().includes(searchWord.toLowerCase());
        });
  
        if (searchWord === "") {
            console.log("EMPLTY");
            getData();
        } else {
          setCustomers(newFilter);
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
        </button>
      </div>

      <div class="area2">
      <input type='text' value={id2} readOnly/>
        <a href="/userprofile">
          <img src={profileImage} alt="profile" className="profile" />
        </a>
 
      </div>

      <div class="area3">
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

      <div class="area4">
      <div>
  <a href='/addcustomer'>
  <button type='button'>Add New Customer</button>

  </a>


<br/><br/><br/>
  
    <input type="search" 
    placeholder="Search" 
    name="Searchquery" 
    value={wordEntered}
    onChange={handleFilter}
    >
    </input>
  

<br /><br/><br/>
      <table class="table table-striped" border={1}>
            <thead>
              <th> </th>
                <th>NIC</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Phone Number</th>
                <th>Actions</th>
            </thead>    
              <tbody>
                {customers.map((customer) => {
                  return (
                    <tr>
                      <td>
                      <Link to={`/editcustomer`}>
                          <button id="view" style={{ marginLeft: '.5rem' }} class="btn btn-warning" onClick={()=>setData(customer)}>Edit</button>
                        </Link>
                      </td>
                      <td>{customer.NIC}</td>
                      <td>{customer.FirstName}</td>
                      <td>{customer.LastName}</td>
                      <td>{customer.PhoneNumber}</td>
                      <td>
                        <Link to={`/property`}>
                          <button id="view" style={{ marginLeft: '.5rem' }} class="btn btn-warning" onClick={()=>setData(customer)}>Assign Property</button>
                        </Link>
                        <Link to={`/ownedproperties`}>
                          <button id="view" style={{ marginLeft: '.5rem' }} class="btn btn-warning" onClick={()=>setData(customer)}>Owned Properties</button>
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

