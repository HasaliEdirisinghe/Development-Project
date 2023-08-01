import './css/DashboardStyle.css';
import profileImage from './img/user_icon.png';
import {Link} from 'react-router-dom';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { logout } from './logout';
import { getUsername, handleArea1, getAllProperties, ConfirmationModal } from './LocalStorageUtils';
import homeImage from './img/homepage.png';


export function LegalViewDeedStatus() {
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
  const [wordForProject, setWordForProject] = useState("");
  const [ppStatusEntered, setppStatusEntered] = useState("");
  const [deedStatusEntered, setDeedStatusEntered] = useState("");
  const [properties, setProperties] = useState([]);
  const [customers, setCustomers] = useState([]);

  const [CustomerID, setCustomerID] = useState('');
  const [PropertyID, setPropertyID] = useState('');
  const [DStatus,setDeed] = useState('');





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

      axios
        .get("http://localhost/backend/viewdeedstatus.php")
        .then((res) => {
          setProperties(res.data);
        })
        .catch((err) => {
          alert(err.message);
        });

  }, []); // Empty dependencies array means the effect only runs once (on mount)

  const getData = () => {
    axios
        .get("http://localhost/backend/viewdeedstatus.php")
        .then((res) => {
          setCustomers(res.data);
        })
        .catch((err) => {
          alert(err.message);
        });
  }
const setData = (med) => {

    let {CustomerID, NIC,FirstName,LastName,OtherNames, 
        PropertyID, ProjectName, PropertyType, Location, Address, LotNo, PlanNo, BedRooms, Size, HouseArea, UnitPrice, TotalPrice, 
        Discount, OtherCharges, FinalValue, ProjPageStatus, DeedStatus} = med;
    
    localStorage.setItem('NIC', NIC);
    localStorage.setItem('FirstName', FirstName);
    localStorage.setItem('LastName', LastName);
    localStorage.setItem('OtherNames', OtherNames);
    localStorage.setItem('ProjectName', ProjectName);
    localStorage.setItem('PropertyType', PropertyType);
    localStorage.setItem('Location', Location);
    localStorage.setItem('Address', Address);
    localStorage.setItem('LotNo', LotNo);
    localStorage.setItem('BedRooms', BedRooms);
    localStorage.setItem('PlanNo', PlanNo);
    localStorage.setItem('Size', Size);
    localStorage.setItem('HouseArea', HouseArea);
    localStorage.setItem('UnitPrice', UnitPrice);
    localStorage.setItem('TotalPrice', TotalPrice);
    localStorage.setItem('Discount', Discount);
    localStorage.setItem('OtherCharges', OtherCharges);
    localStorage.setItem('FinalValue', FinalValue);
    localStorage.setItem('ProjPageStatus', ProjPageStatus);
    localStorage.setItem('CustomerID', CustomerID);
    localStorage.setItem('PropertyID', PropertyID);
    localStorage.setItem('DeedStatus', DeedStatus);

    }

  const setDeedStatus = (cid, pid, email) => {
    let formData = new FormData();
    formData.append('CustomerID', cid);
    formData.append('PropertyID', pid);
    formData.append('DeedStatus', DStatus);
    formData.append('email', email);

    if (DStatus === "Waiting to Sign") {
      // Prompt the user for confirmation to send an email
      const confirmed = window.confirm("Selecting this option will send an email to the cutomer. Are you sure you want to send the email?");
      if (confirmed) {
        axios.post('http://localhost/backend/setdeedstatus.php', formData)
        .then((response) => {
          // Handle the response from the server if needed
          console.log(response.data);
          if (response.data === 'Status updated successfully') {
            alert('Deed is '+ DStatus);
            window.location.href = '/deedstatus';
          } else {
            alert('Failed to set');
          }
        })
        .catch((error) => {
          // Handle error if the request fails
          console.log(error.message);
          
        });
        
      } else {
        return;
      }

    }      
    axios.post('http://localhost/backend/setdeedstatus.php', formData)
    .then((response) => {
      // Handle the response from the server if needed
      console.log(response.data);
      if (response.data === 'Status updated successfully') {
        alert('Deed is '+ DStatus);
        window.location.href = '/deedstatus';
      } else {
        alert('Failed to set');
      }
    })
    .catch((error) => {
      // Handle error if the request fails
      console.log(error.message);
      
    });


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
  
  const handleDeedStatus = (event) => {
    const searchWord = event.target.value;
    console.log(searchWord);
    setDeedStatusEntered(searchWord);
    axios.get("http://localhost/backend/getdetailsforprojectpage.php") //new php?
    .then(response => {
        console.log(response)
        const newFilter = properties.filter((response) => {
            return response.DeedStatus.toLowerCase().includes(searchWord.toLowerCase()); 
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

  const handleDeedStatusChange = (e, property) => {
    const selectedStatus = e.target.value;
    if (selectedStatus === "Completed") {
      setData(property);
      // Redirect to the new page when "Completed" is selected
      window.location.href = "/deedcompletion";
    } else {
      // Set the Deed Status when other options are selected
      setDeed(selectedStatus);
    }
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
        <div>

    <div class="section">
      <input type="search" placeholder="Search NIC" name="Searchquery" value={wordEntered} onChange={handleFilter} className="search-nic-input"/>

        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

      <input type="search" placeholder="Search Project, Location or Property Type" name="Searchquery" value={wordForProject} onChange={handleProjectFilter} className="search-project-input"/>

        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

      <select name="Searchquery" placeholder="Search Deed Status" id="deedStatus" onChange={handleDeedStatus} value={deedStatusEntered}>
          <option value=""> Search Deed Status  </option>
          <option value="Pending">Completed</option>
          <option value="Approved">Drafting</option>
          <option value="Hold">Finalizing</option>
          <option value="Waiting">Waiting to Sign</option>
      </select>


        <br/><br/><br/>
    <table class="showtable">
            <thead>
                <th>NIC</th>
                <th>Customer Name</th>
                {/* <th>Last Name</th> */}
                {/* <th>PropertyID</th> */}
                <th>Project Name</th>
                <th>Property Type</th>
                <th>Location</th>
                <th>Lot No</th>
                <th>BR</th>
                <th>Size</th>
                <th>Unit Price</th>
                <th>Total Price</th>
                <th>Final Value</th>   
                <th>Deed Status</th> 
                <th>Change Status</th> 
            </thead>    
              <tbody>
                {properties.map((property) => {
                    const isCompleted = property.DeedStatus === "Completed";

                  return (
                    <tr>
                      <td>{property.NIC}</td>
                      <td>{property.FirstName} {property.LastName}</td>
                      {/* <td>{property.LastName}</td> */}
                      {/* <td>{property.PropertyID}</td> */}
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
                      <td>{property.DeedStatus}</td>
                      <td>  <select name="approvalstatus" id="approvalstatus" onChange={(e) => handleDeedStatusChange(e, property)}
                              disabled={isCompleted} > 
                                <option value=" ">   </option>
                                <option value="Drafting">Drafting</option>
                                <option value="Finalizing">Finalizing</option>
                                <option value="Waiting to Sign">Waiting to Sign</option>
                                <option value="Completed">Completed</option>
            </select>
            <button id="save" class="proceed" onClick={()=>setDeedStatus(property.CustomerID, property.PropertyID, property.email)} disabled={isCompleted}>Save</button>
            </td>
           
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

