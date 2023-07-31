import './css/DashboardStyle.css';
import profileImage from './img/user_icon.png';
import { Link } from 'react-router-dom';
import { getUsername, handleArea1, getAllProperties } from './LocalStorageUtils';
import homeImage from './img/homepage.png';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { logout } from './logout';

export function AccViewPersonalProjectPage() {
  const handleButtonClick = (e) => {
    if (e.target.nodeName !== 'BUTTON') {
      return;
    }
    e.target.style.background = '#808080';
  };

  const username2 = getUsername();
  const [id2, setId2] = useState(null);
  const [customers, setCustomers] = useState([]);
  const [properties, setProperties] = useState([]);
  const [wordEntered, setWordEntered] = useState("");

  const [NIC, setNIC] = useState('');
  const [FirstName, setFirstName] = useState('');
  const [LastName, setLastName] = useState('');
  const [OtherNames, setOtherNames] = useState('');

  const [ProjectName, setProjectName] = useState('');
  const [PropertyType, setPropertyType] = useState('');
  const [Location, setLocation] = useState('');
  const [Address, setAddress] = useState('');
  const [LotNo, setLotNo] = useState('');
  const [BedRooms, setBedRooms] = useState('');

  const [PlanNo, setPlanNo] = useState('');
  const [Size, setSize] = useState('');
  const [UnitPrice, setUnitPrice] = useState('');

  const [TotalPrice, setTotalPrice] = useState('');
  const [Discount, setDiscount] = useState('');
  const [StampFee, setStampFee] = useState('');
  const [LegalFee, setLegalFee] = useState('');
  const [OtherCharges, setOtherCharges] = useState('');
  const [FinalValue, setFinalValue] = useState('');

  const [Status, setStatus] = useState('');
  const [CustomerID, setCustomerID] = useState('');
  const [PropertyID, setPropertyID] = useState('');

  const [approval,setApproval] = useState('');


  

  useEffect(() => {
    setNIC(localStorage.getItem('NIC'));
    setFirstName(localStorage.getItem('FirstName'));
    setLastName(localStorage.getItem('LastName'));
    setOtherNames(localStorage.getItem('OtherNames'));

    setProjectName(localStorage.getItem('ProjectName'));
    setPropertyType(localStorage.getItem('PropertyType'));
    setLocation(localStorage.getItem('Location'));
    setAddress(localStorage.getItem('Address'));
    setLotNo(localStorage.getItem('LotNo'));
    setBedRooms(localStorage.getItem('BedRooms'));
    setPlanNo(localStorage.getItem('PlanNo'));
    setSize(localStorage.getItem('Size'));
    setUnitPrice(localStorage.getItem('UnitPrice'));

    setTotalPrice(localStorage.getItem('TotalPrice'));
    setDiscount(localStorage.getItem('Discount'));
    setStampFee(localStorage.getItem('StampFee'));
    setLegalFee(localStorage.getItem('LegalFee'));
    setOtherCharges(localStorage.getItem('OtherCharges'));
    setFinalValue(localStorage.getItem('FinalValue'));

    setStatus(localStorage.getItem('ProjPageStatus'));
    setCustomerID(localStorage.getItem('CustomerID'));
    setPropertyID(localStorage.getItem('PropertyID'));

    

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
      .catch((error) => alert(error.message));

    getAllProperties()
      .then((propertiesData) => {
        setProperties(propertiesData);
      })
      .catch((error) => {
        alert(error.message);
      });

    getData();
  }, []);

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

  const setApprovalStatus = () => {
    let formData = new FormData();
    formData.append('CustomerID', CustomerID);
    formData.append('PropertyID', PropertyID);
    formData.append('ProjPageStatus', approval);



    axios.post('http://localhost/backend/accountantsetapproval.php', formData)
  .then((response) => {
    // Handle the response from the server if needed
    console.log(response.data);
    if (response.data === 'Status updated successfully') {
      alert('Project set to '+ approval);
      window.location.href = '/pendingapprovals';
    } else {
      alert('Failed to send');
    }
  })
  .catch((error) => {
    // Handle error if the request fails
    console.log(error.message);
    
  });
  }

  const handleFilter = (event) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);
    axios
      .get("http://localhost/backend/customerpage.php")
      .then((response) => {
        const newFilter = customers.filter((response) => {
          return response.NIC.toLowerCase().includes(searchWord.toLowerCase());
        });

        if (searchWord === "") {
          getData();
        } else {
          setCustomers(newFilter);
        }
      })
      .catch((error) => console.log(error));
  };

  function gotoDashboard() {
    handleArea1(username2);
  }

  return (
    <div class="container">
      <div class="area1">
        <button class="area1button" onClick={gotoDashboard} >
          <img src={homeImage} alt="logo" class='homeimage' />
          <h1 class='area1text'>SAL</h1>
        </button>
      </div>

      <div class="area2">
        <input type='text' value={id2} readOnly />
        <a href="/userprofile">
          <img src={profileImage} alt="profile" className="profile" />
        </a>
      </div>

      <div class="area3">
        <div id="wrapper" >
        <table>
          <tr><td>
          <Link to={`/dashvisualsforaccountant`}>
          <button class="tablebutton">Dashboard</button>
            </Link>            </td></tr>
            <tr><td>
            <Link to={`/pendingapprovals`}>
            <button class="tablebutton">Pending Approvals</button>
            </Link>
              
            </td></tr>
            <tr><td>
            <Link to={`/accountantapprovals`}>
              <button class="tablebutton">All Approvals</button>
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
            <h2> Customer </h2>
            <h3>NIC: {NIC}</h3>
            <h3>First Name: {FirstName}</h3>
            <h3>Last Name: {LastName}</h3>
            <h3>Other Names: {OtherNames}</h3>
            <hr />

            <h2> Property </h2>
            <h3>Project Name: {ProjectName}</h3>
            <h3>Property Type: {PropertyType}</h3>
            <h3>Location: {Location}</h3>
            <h3>Address: {Address}</h3>
            {PropertyType.toLowerCase() === 'land' ? ( <h3>Lot No: {LotNo}</h3> ) : ( <h3>No. of Bedrooms: {BedRooms}</h3> )}
            <h3>Plan No: {PlanNo}</h3>
            {PropertyType.toLowerCase() === 'land' ? ( <h3>Size: {Size} P</h3> ) : ( <h3>Size: {Size} Sq ft.</h3> )} {/* if house then sq ft, if land then perch */}
            <h3>Unit Price: LKR {UnitPrice}</h3>
            <hr />

            <h2> Payment </h2>
            <h3>Total Price: LKR {TotalPrice}</h3>
            <h3>Discount: {Discount} %</h3>
            <h3>Stamp Fee: LKR {StampFee}</h3>
            <h3>Legal Fee: LKR {LegalFee}</h3>
            <h3>Other Charges: LKR {OtherCharges}</h3>
            <h3 className="final-value">Final Value: LKR {FinalValue}</h3>
            <hr />

            <select name="approvalstatus" id="approvalstatus" onChange={(e) => setApproval(e.target.value)}>
                                <option value="blank">   </option>
                                <option value="Approved">Approved</option>
                                <option value="Hold">Hold</option>
                                <option value="Reject">Reject</option>
            </select>
            <button id="save" class="proceed" onClick={()=>setApprovalStatus()}>Save</button>


            <hr />
          </div>
          {/* <button class='sendButton'> Send to Accountant</button> */}
        </div>
      </div>
    </div>
  );
}
