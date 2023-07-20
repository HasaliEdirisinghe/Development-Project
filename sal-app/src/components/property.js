import './css/DashboardStyle.css';
import './css/customer.css';
import { logout } from './logout';
import profileImage from './img/user_icon.png';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getUsername, handleArea1 } from './LocalStorageUtils';
import homeImage from './img/homepage.png';


export function PropertyPage() {
  const handleButtonClick = async () => {
    window.location.href = '/addcustomer';
  };
  const username2 = getUsername();

  const [id2, setId2] = useState(null);
  const [properties, setProperties] = useState([]);
  const [wordEntered, setWordEntered] = useState('');
  const [customerId, SetID] = useState('');

  useEffect(() => {
    function getUserData() {
      SetID(localStorage.getItem('customerId'));
    }

    function getUsername() {
      const url = 'http://localhost/backend/getemployeename.php';
      const id = localStorage.getItem('username');
      let fData = new FormData();
      fData.append('id', id);

      axios
        .post(url, fData)
        .then((response) => {
          const username = response.data;
          setId2(username);
        })
        .catch((error) => {
          alert(error.message);
        });
    }

    function getAllProperties() {
      const url_properties = 'http://localhost/backend/propertypage.php';
      axios
        .post(url_properties)
        .then((response) => {
          const properties = response.data;
          setProperties(properties);
        })
        .catch((error) => {
          alert(error.message);
        });
    }

    getUsername();
    getAllProperties();
    getUserData();
  }, []);

  const getData = () => {
    axios
      .get('http://localhost/backend/propertypage.php')
      .then((res) => {
        setProperties(res.data);
      })
      .catch((err) => {
        alert(err.message);
      });
  };
  const setData = (med) => {

    let {PropertyID,
      PropertyType,
      Location,
      District,
      Address,
      LotNo,
      PlanNo,
      Size,
      UnitPrice,
      TotalPrice,} = med;
    
      localStorage.setItem('PropId', PropertyID);
      localStorage.setItem('PropertyType', PropertyType);
      localStorage.setItem('Location', Location);
      localStorage.setItem('District', District);
      localStorage.setItem('Address', Address);
      localStorage.setItem('LotNo', LotNo);
      localStorage.setItem('PlanNo', PlanNo);
      localStorage.setItem('Size', Size);
      localStorage.setItem('UnitPrice', UnitPrice);
      localStorage.setItem('TotalPrice', TotalPrice);

  }

  // function assignProperty(p) {
  //   const {
  //     PropertyID,
  //     PropertyType,
  //     Location,
  //     District,
  //     Address,
  //     LotNo,
  //     PlanNo,
  //     Size,
  //     UnitPrice,
  //     TotalPrice,
  //   } = p;
  //   localStorage.setItem('PropId', PropertyID);
  //   localStorage.setItem('PropertyType', PropertyType);
  //   localStorage.setItem('Location', Location);
  //   localStorage.setItem('District', District);
  //   localStorage.setItem('Address', Address);
  //   localStorage.setItem('LotNo', LotNo);
  //   localStorage.setItem('PlanNo', PlanNo);
  //   localStorage.setItem('Size', Size);
  //   localStorage.setItem('UnitPrice', UnitPrice);
  //   localStorage.setItem('TotalPrice', TotalPrice);
  //   localStorage.setItem('CusId', customerId);
  // }

  const handleFilter = (event) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);
    axios
      .get('http://localhost/backend/propertypage.php')
      .then((response) => {
        const newFilter = properties.filter((response) => {
          return response.Location.toLowerCase().includes(searchWord.toLowerCase()) || response.ProjectName.toLowerCase().includes(searchWord.toLowerCase());
        });

        if (searchWord === '') {
          getData();
        } else {
          setProperties(newFilter);
        }
      })
      .catch((error) => console.log(error));
  };

  function gotoDashboard (){
    handleArea1(username2)
}

  return (
    <div className="container">
      <div className="area1">
      <button class="area1button" onClick={gotoDashboard} >
          <img src={homeImage} alt="logo" class='homeimage'/>    
          <h1 class='area1text'>SAL</h1> 
        </button>
      </div>

      <div className="area2">
        <input type="text" value={id2} readOnly />
        <a href="/userprofile">
          <img src={profileImage} alt="profile" className="profile" />
        </a>
      </div>

      <div className="area3">
        <div id="wrapper">
          <table>
            <tr>
              <td>
              <Link to={`/customer`}>
                  {/* Link to Customer page */}
                  <button class="tablebutton">Customer</button>
                </Link>              </td>
            </tr>
            <tr>
              <td>
              <Link to={`/viewproperty`}>
                  {/* Link to Property page */}
                  <button class="tablebutton">Property</button>
                </Link>
              </td>
            </tr>
            <tr>
              <td>
              <Link to={`/viewprojectpage`}>
                  {/* Link to Project Page */}
                  <button class="tablebutton">Project Page</button>
                </Link>
              </td>
            </tr>
            <tr>
              <td>
              <Link to={`/salesofficerapprovals`}>
                  {/* Link to Approvals page */}
                  <button class="tablebutton">Approvals</button>
                </Link>
              </td>
            </tr>
            <tr>
              <td>
              <button className="tablebutton" type="button" onClick={logout}>
                  {/* Logout button */}
                  Logout
                </button>
              </td>
            </tr>
          </table>
        </div>
      </div>

      <div className="area4">
        <div>
          <input
            type="search"
            placeholder="Search"
            name="Searchquery"
            value={wordEntered}
            onChange={handleFilter}
          />
 
          <br />
          <br />
          <table className="table table-striped">
  <thead>
    <tr>
      <th>ID</th>
      <th>Type</th>
      <th>Project Name</th>
      <th>Location</th>
      <th>District</th>
      <th>Address</th>
      <th>Lot No</th>
      <th>Plan No</th>
      <th>Size</th>
      <th>Unit Price</th>
      <th>Total Price</th>
      <th>Assign</th>
    </tr>
  </thead>
  <tbody>
    {properties.map((property) => {
      return (
        <tr key={property.PropertyID}>
          <td>{property.PropertyID}</td>
          <td>{property.PropertyType}</td>
          <td>{property.ProjectName}</td>
          <td>{property.Location}</td>
          <td>{property.District}</td>
          <td>{property.Address}</td>
          <td>{property.LotNo}</td>
          <td>{property.PlanNo}</td>
          <td>{property.Size}</td>
          <td>{property.UnitPrice}</td>
          <td>{property.TotalPrice}</td>
          <td>
            <Link to={`/propertypayment/${customerId}`}>
              <button
                id="view"
                style={{ marginLeft: '.5rem' }}
                className="btn btn-warning"
                onClick={() => setData(property)}
              >
                Assign
              </button>
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