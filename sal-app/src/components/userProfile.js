import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import profileImage from './img/user_icon.png';
import { logout } from './logout';


export function UserProfile() {
  const [id2, setId2] = useState(null);
  const [empid, setEmployeeID] = useState('');
  const [nic, setNIC] = useState('');
  const [name, setName] = useState('');
  const [designation, setDesignation] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = 'http://localhost/backend/userprofile.php';
        const id = localStorage.getItem('username');

        let fData = new FormData();
        fData.append('id', id);

        const response = await axios.post(url, fData);
        const data = response.data;
        if (Object.keys(data).length > 0) {
          setEmployeeID(data.EmployeeID);
          setNIC(data.NIC);
          setName(data.EmployeeName);
          setDesignation(data.Designation);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    // Send the user data to the database
    let fData = new FormData();
    fData.append('empid', empid);
    fData.append('password', password);

    // Send a POST request with the form data
    axios
      .post(`http://localhost/backend/updatepassword.php`, fData)
      .then((response) => {
        if (response.data === 'Password updated successfully') {
          alert('Password updated successfully');
          window.location.href = '/dashboard';
        } else {
          alert('Invalid');
        }
      })
      .catch((error) => alert(error.message));
  };

  const [showInput, setShowInput] = useState(false);

  const handleChangePassword = () => {
    setShowInput(true);
  };

  return (
    <div className="container">
      <div className="area1">
        <h1 className="area1text">SAL</h1>
      </div>

      <div className="area2">
        <a href="/userprofile">
          <img src={profileImage} alt="profile" className="profile" />
        </a>
      </div>

      <div className="area3">
        <div id="wrapper">
          <table>
            <tbody>
              <tr>
                <td>
                  <Link to="/addcustomer">
                    <button className="tablebutton">Customer</button>
                  </Link>
                </td>
              </tr>
              <tr>
                <td>
                  <button className="tablebutton">Property</button>
                </td>
              </tr>
              <tr>
                <td>
                  <button className="tablebutton">Project Page</button>
                </td>
              </tr>
              <tr>
                <td>
                  <button className="tablebutton">Approvals</button>
                </td>
              </tr>
              <tr>
                <td>
                <button className="tablebutton" type="button" onClick={logout}>Logout</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="area4">
        <form onSubmit={handleSubmit}>
          <table>
            <tbody>
              <tr>
                <td className="label">Employee ID</td>
                <td className="label1">:</td>
                <td className="textbox">
                  <input
                    type="text"
                    name="empid"
                    value={empid}
                    readOnly
                    onChange={(e) => setEmployeeID(e.target.value)}
                  />
                </td>
              </tr>
              <tr>
                <td className="label">NIC</td>
                <td className="label1">:</td>
                <td className="textbox">
                  <input
                    type="text"
                    name="nic"
                    value={nic}
                    readOnly
                    onChange={(e) => setNIC(e.target.value)}
                  />
                </td>
              </tr>
              <tr>
                <td className="label">Employee Name</td>
                <td className="label1">:</td>
                <td className="textbox">
                  <input
                    type="text"
                    name="name"
                    value={name}
                    readOnly
                    onChange={(e) => setName(e.target.value)}
                  />
                </td>
              </tr>
              <tr>
                <td className="label">Designation</td>
                <td className="label1">:</td>
                <td className="textbox">
                  <input
                    type="text"
                    name="designation"
                    value={designation}
                    readOnly
                    onChange={(e) => setDesignation(e.target.value)}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <button type="button" onClick={handleChangePassword}>
                    Change Password
                  </button>
                  {showInput && (
                    <div>
                      <input
                        type="password"
                        placeholder="New Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <input
                        type="password"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                    </div>
                  )}
                </td>
              </tr>
            </tbody>
          </table>
          <a href="/dashboard">
            <button type="button" className="cancelbutton">
              Back
            </button>
          </a>
          <input type="submit" className="submitbutton" value='Submit'/>
        </form>
      </div>
    </div>
  );
}
