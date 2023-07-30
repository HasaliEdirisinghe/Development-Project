import './css/DashboardStyle.css';
import './css/customer.css';
import { logout } from './logout';
import profileImage from './img/user_icon.png';
import { getUsername, handleArea1 } from './LocalStorageUtils';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import homeImage from './img/homepage.png';
import { Users } from './users';




export function DecativateRemoveUsers() {
    const handleButtonClick = async () => {
        window.location.href = '/adduser';
    }

    const username2 = getUsername();

  // setUsername(username2)
  const [id2, setId2] = useState(null);
    const [users, setUsers] = useState([]);
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
function getAllUsers(){
  const url_users = 'http://localhost/backend/users.php';
      axios.post(url_users)
      .then(response => {
        const users = response.data;
        setUsers (users);
        // Do further processing with the username here
      })
      .catch(error => {
        alert(error.message)
      });
}
    getusername()
    getAllUsers()
  }, []); // Empty dependencies array means the effect only runs once (on mount)

  const getData = () => {
    axios
        .get("http://localhost/backend/users.php")
        .then((res) => {
            setUsers(res.data);
        })
        .catch((err) => {
          alert(err.message);
        });
  }
const setData = (med) => {

  let {EmployeeID, NIC, EmployeeName, Designation, Status} = med;
  
  localStorage.setItem('EmployeeID',EmployeeID);
  localStorage.setItem('NIC', NIC);
  localStorage.setItem('EmployeeName', EmployeeName);
  localStorage.setItem('Designation', Designation);
  localStorage.setItem('Status', Status);

  
  }

  const handleFilter = (event) => {
    const searchWord = event.target.value;
    console.log(searchWord);
    setWordEntered(searchWord);
    axios.get("http://localhost/backend/users.php") 
    .then(response => {
        console.log(response)
        const newFilter = users.filter((response) => {
            //can search from NIC, ID, Name and designation
            return response.NIC.toLowerCase().includes(searchWord.toLowerCase()) || 
                   response.EmployeeID.toLowerCase().includes(searchWord.toLowerCase()) || 
                   response.EmployeeName.toLowerCase().includes(searchWord.toLowerCase()) || 
                   response.Designation.toLowerCase().includes(searchWord.toLowerCase()) ||
                   response.Status.toLowerCase().includes(searchWord.toLowerCase());        });
  
        if (searchWord === "") {
            console.log("EMPLTY");
            getData();
        } else {
            setUsers(newFilter);
        }
    })
    .catch(error => console.log(error));
  };

  const deleteUser = (EmployeeID) => {
    const url = `http://localhost/backend/deleteuser.php`;

    const formData = new FormData();
    formData.append('EmployeeID', EmployeeID);

    // Send a DELETE request to the backend with the property ID
    axios
      .post(url, formData)
      .then((response) => {
        if (response.data === 'Employee Deleted') {
          alert('Employee deleted successfully'); //need to show which property is deleted
          // Refresh the property list after deleting
          
        } else {
          alert('Cannot delete an active user!');
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
            <Link to={`/users`}>
            <button class="tablebutton">Users</button>
                        </Link>
              
            </td></tr>
            <tr><td>
            <Link to={`/deactivateremove`}>
            <button class="tablebutton">Change User Status</button>
                        </Link>
            </td></tr>
            {/* <tr><td>
              <button class="tablebutton">User Permissions</button>
            </td></tr> */}
            <tr><td>
            <button className="tablebutton" type="button" onClick={logout}>Logout</button>  
            </td></tr>


          </table>
        </div>
      
      </div>

      <div class="area4">
      <div>
 <br/>
  
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
                <th>Employee ID</th>
                <th>NIC</th>
                <th>Employee Name</th>
                <th>Designation</th>
                <th>Status</th>
                <th> </th>

            </thead>    
              <tbody>
                {users.map((user) => {
                  return (
                    <tr>

                      <td>{user.EmployeeID}</td>
                      <td>{user.NIC}</td>
                      <td>{user.EmployeeName}</td>
                      <td>{user.Designation}</td>
                      <td>{user.Status}</td>
                      <td>
                      <Link to={`/changeuserstatus`}>
                          <button id="view" style={{ marginLeft: '.5rem' }} class="btn btn-warning" onClick={()=>setData(user)}>Change Status</button>
                        </Link>
                      </td>
                      <td>
                      {/* Add a confirmation prompt */}
                      <button
                        id="view"
                        style={{ marginLeft: '.5rem' }}
                        className="btn btn-warning"
                        onClick={() => {
                          if (window.confirm('Are you sure you want to Remove user ' + user.EmployeeID + ' ?')) {
                            deleteUser(user.EmployeeID);
                          }
                        }}
                      >
                        Remove User
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

