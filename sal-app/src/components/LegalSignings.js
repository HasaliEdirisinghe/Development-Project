import './css/DashboardStyle.css';
import myImage from './img/bhoomilogo.jpg';
import profileImage from './img/user_icon.png';
import {Link} from 'react-router-dom';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { logout } from './logout';
import { getUsername, handleArea1 } from './LocalStorageUtils';
import homeImage from './img/homepage.png';

export function LegalSignings() {
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
  const [legal, setLegal] = useState([]);
  const [wordEntered, setWordEntered] = useState("");
  const [clientEntered, setClientEntered] = useState("");
  const [signedDate, setSignedDate] = useState("");
  const [employeeEntered, setEmployeeEntered] = useState("");





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
            .post("http://localhost/backend/signings.php")
            .then((res) => {
                setLegal(res.data);
            })
            .catch((err) => {
              alert(err.message);
              });

  }, []); // Empty dependencies array means the effect only runs once (on mount)

  

  function gotoDashboard (){
    handleArea1(username2)
}

const getData = () => {
  axios
      .get("http://localhost/backend/signings.php")
      .then((res) => {
          setLegal(res.data);
      })
      .catch((err) => {
        alert(err.message);
        });
  }


const setData = (med) => {

  let {PropertyID, ProjectName, LotNo, FirstName, LastName, FinalValue, SignedDate, Lawyer, Director} = med;
  
  localStorage.setItem('PropertyID',PropertyID);
  localStorage.setItem('ProjectName',ProjectName);
  localStorage.setItem('LotNo',LotNo);
  localStorage.setItem('FirstName',FirstName);
  localStorage.setItem('LastName',LastName);
  localStorage.setItem('FinalValue',FinalValue);
  localStorage.setItem('SignedDate', SignedDate);
  localStorage.setItem('Lawyer', Lawyer);
  localStorage.setItem('Director', Director);
  }

const handleFilter = (event) => {
  const searchWord = event.target.value;
  console.log(searchWord);
  setWordEntered(searchWord);
  axios.get("http://localhost/backend/signings.php") 
  .then(response => {
      console.log(response)
      const newFilter = legal.filter((response) => {
          //can search from client, project, Name and designation
          return response.ProjectName.toLowerCase().includes(searchWord.toLowerCase());
      });

      if (searchWord === "") {
          console.log("EMPLTY");
          getData();
      } else {
          setLegal(newFilter);
      }
  })
  .catch(error => console.log(error));
};

const handleClientFilter = (event) => {
  const searchWord = event.target.value;
  console.log(searchWord);
  setClientEntered(searchWord);
  axios.get("http://localhost/backend/signings.php") 
  .then(response => {
      console.log(response)
      const newFilter = legal.filter((response) => {
          //can search from client, project, Name and designation
          return response.FirstName.toLowerCase().includes(searchWord.toLowerCase()) || 
                 response.LastName.toLowerCase().includes(searchWord.toLowerCase()) ;
      });

      if (searchWord === "") {
          console.log("EMPLTY");
          getData();
      } else {
          setLegal(newFilter);
      }
  })
  .catch(error => console.log(error));
};

const handleDateFilter = (event) => {
  const searchWord = event.target.value;
  console.log(searchWord);
  setSignedDate(searchWord);
  axios.get("http://localhost/backend/signings.php") 
  .then(response => {
      console.log(response)
      const newFilter = legal.filter((response) => {
          //can search from client, project, Name and designation
          return response.SignedDate.toLowerCase().includes(searchWord.toLowerCase());
      });

      if (searchWord === "") {
          console.log("EMPLTY");
          getData();
      } else {
          setLegal(newFilter);
      }
  })
  .catch(error => console.log(error));
};

const handleLDFilter = (event) => {
  const searchWord = event.target.value;
  console.log(searchWord);
  setEmployeeEntered(searchWord);
  axios.get("http://localhost/backend/signings.php") 
  .then(response => {
      console.log(response)
      const newFilter = legal.filter((response) => {
          //can search from client, project, Name and designation
          return response.Lawyer.toLowerCase().includes(searchWord.toLowerCase())|| 
                 response.Director.toLowerCase().includes(searchWord.toLowerCase()) ;
      });

      if (searchWord === "") {
          console.log("EMPLTY");
          getData();
      } else {
          setLegal(newFilter);
      }
  })
  .catch(error => console.log(error));
};



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
        <div>
        <input type="search" placeholder="Search Project" name="Searchquery" value={wordEntered} onChange={handleFilter} className="search-nic-input"/>
            
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

        <input type="search" placeholder="Search Client" name="Searchquery" value={clientEntered} onChange={handleClientFilter} className="search-type"/>
        
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

        <label>Search Signed Date</label>
        <input type="date" placeholder="Search Signed Date" name="Searchquery" value={signedDate} onChange={handleDateFilter} />
            
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

        <input type="search" placeholder="Search Lawyer, Director" name="Searchquery" value={employeeEntered} onChange={handleLDFilter} className="search-type"/>
        
 
<br /><br/><br/>
      <table class="showtable" border={1}>
            <thead>
                <th>Project</th>
                <th>Lot No.</th>
                <th>Client</th>
                <th>Deed Value</th>
                <th>Signed Date</th>
                <th>Lawyer</th>
                <th>Director </th>
                
            </thead>    
              <tbody>
                {legal.map((l_table) => {
                  return (
                    <tr>

                      <td>{l_table.ProjectName}</td>
                      <td>{l_table.LotNo}</td>
                      <td>{l_table.FirstName} {l_table.LastName}</td>   {/* fname + lname */}
                      <td align='right'>{l_table.FinalValue}</td>
                      <td>{l_table.SignedDate}</td>
                      <td>{l_table.Lawyer}</td>
                      <td>{l_table.Director}</td>  
                     
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

