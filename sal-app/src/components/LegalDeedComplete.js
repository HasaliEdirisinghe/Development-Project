import './css/DashboardStyle.css';
import myImage from './img/bhoomilogo.jpg';
import profileImage from './img/user_icon.png';
import {Link} from 'react-router-dom';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { logout } from './logout';
import { getUsername, handleArea1 } from './LocalStorageUtils';
import homeImage from './img/homepage.png';

export function DeedCompletion() {
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

  const [deed_no, setDeedNo] = useState('');
  const [deed_date, setDeedDate] = useState(null);
  const [Lawyer, setLawyer] = useState('');
  const [Director, setDirector] = useState('');

  const [PropertyID, setPropertyID] = useState('');
  const [CustomerID, setCustomerID] = useState('');

  const [employeeNames, setEmployeeNames] = useState([]);



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

      setPropertyID(localStorage.getItem('PropertyID'));
      setCustomerID(localStorage.getItem('CustomerID'));

      // Make a GET request to the backend API to fetch employee names
      fetch('http://localhost/backend/getLawyerDirector.php')
      .then((response) => response.json())
      .then((data) => {
        // Update the state with the array of employee names
        setEmployeeNames(data);
    })
    .catch((error) => console.error('Error fetching employees:', error));


  }, []); // Empty dependencies array means the effect only runs once (on mount)

  const handleDeedComplete = async (event) => {
    // alert(PropertyID);
    event.preventDefault();
      if(deed_no.length === 0){
        alert("Deed Number is required!");
      }
      else if(deed_date.length === 'null'){
        alert("Deed date is required!");
      }
      else if(Lawyer.length === 0){
        alert("Lawyer Name is required!");
      }
      else if(Director.length === 0){
        alert("Director Name is required!");
      }
      else{

      
        // Send the customer data to the database

        let fData = new FormData();
        fData.append('CustomerID', CustomerID);
        fData.append('propertyID', PropertyID);
        fData.append('deed_no', deed_no);
        fData.append('deed_date', deed_date);
        fData.append('Lawyer', Lawyer);
        fData.append('Director', Director);

      // Send a POST request with the form data
      axios.post(`http://localhost/backend/enterdeeds.php`, fData)
        .then(response => {
          if (response.data === 'Status updated successfully') {
            alert('Deed Completed!');
            // Reset the textboxes to their initial values

            window.location.href = '/signings';

 
          } else {
            alert('Invalid');
          }
        })
        .catch(error => alert(error.message)); // Display an error message if the request fails
      }
  }

  const handleCancelClick = (event) => {
    event.preventDefault();
    setDeedNo('');
    setDeedDate(null);
    setLawyer('');
    setDirector('');

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
        <div id="wrapper" onClick={handleButtonClick}>
          <table>
            <tr><td>
            <Link to={`/approvedprojpages`}>
            <button class="tablebutton">Project Page</button>
              </Link>  
            </td></tr>
            <tr><td>
            <Link to={`/deedstatus`}>
            <button class="tablebutton">Deed Status</button>
              </Link> 
            </td></tr>
            <tr><td>
            <Link to={`/signings`}>
            <button class="tablebutton">Signings</button>
              </Link>  
            </td></tr>
            <tr><td>
            <button className="tablebutton" type="button" onClick={logout}>Logout</button>  
            </td></tr>
          </table>
        </div>
      
      </div>

      <div class="area4">
      {/* <h1>/deedcompletion</h1>   */}
      <form onSubmit={handleDeedComplete}>
                <table>
                    <tr>
                        <td class='label'>Deed No</td>
                        <td class='label1'>:</td>
                        <td class='textbox'><input type='text' name='deedno'  onChange={(e) => setDeedNo(e.target.value)} value={deed_no}/></td>
                    </tr>
                    <tr>
                        <td class='label'>Signed Date</td>
                        <td class='label1'>:</td>
                        <td class='date'>
                            <input type='date' name='projectname'  onChange={(e) =>Date.parse(setDeedDate(e.target.value))} value={deed_date}/>
                            
                        </td>
                    </tr>
                    <tr>
                        <td class='label'>Lawyer</td>
                        <td class='label1'>:</td>
                        <td class='dropdown'><input type='text' name='lawyer'  onChange={(e) => setLawyer(e.target.value)} value={Lawyer}/></td>
                    </tr>
                    {/* <tr>
                        <td class='label'>Lawyer</td>
                        <td class='label1'>:</td>
                        <td class='dropdown'>
                          <select>
                            {employeeNames.map((name, index) => (<option key={index} value={name}>{name}</option>))}
                          </select>
                        </td>
                    </tr> */}
                    <tr>
                        <td class='label'>Director</td>
                        <td class='label1'>:</td>
                        <td class='textbox'>
                        <input type='text' name='location'  onChange={(e) => setDirector(e.target.value)} value={Director}/>
                        </td>
                    </tr>
                    
                </table>
                <button class="cancelbutton" onClick={handleCancelClick}>Reset</button>
                <input type='submit' class='submitbutton' value='Submit'/> 

            </form>

    </div>
  </div>

  );
}

