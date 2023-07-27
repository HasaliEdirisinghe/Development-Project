import './css/DashboardStyle.css';
import profileImage from './img/user_icon.png';
import { Link } from 'react-router-dom';
import { getUsername, handleArea1 } from './LocalStorageUtils';
import homeImage from './img/homepage.png';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { logout } from './logout';
import { PowerBIEmbed } from 'powerbi-client-react';
import { models } from 'powerbi-client';
import { PieChart, Pie, BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Legend, Tooltip, Cell } from 'recharts';


export function DirectorViewDashVisuals() {
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
  const [properties, setProperties] = useState([]);

  const barColors = ['#2146FF', '#FF2146', '#BF19A9', '#DA21FF', '#361180']; // Add more colors if needed
  const pieColors = ['#2146FF', '#FF2146', '#BF19A9', '#DA21FF', '#361180']; // Add more colors if needed
  const lineColors = ['#403AFB'];

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

    getAllProperties();

  }, []); // Empty dependencies array means the effect only runs once (on mount)

  const preparePieChartData = () => {
    // Calculate the count for each district
    const districtCounts = properties.reduce((accumulator, property) => {
      const district = property.District;
      accumulator[district] = (accumulator[district] || 0) + 1;
      return accumulator;
    }, {});

    // Convert the aggregated data into an array of objects with 'name' and 'value' properties
    const pieChartData = Object.keys(districtCounts).map((district) => {
      return {
        name: district,
        value: districtCounts[district],
      };
    });

    return pieChartData;
  };

  const prepareBarChartData = () => {
    // Calculate the count for each district
    const districtCounts = properties.reduce((accumulator, property) => {
      const district = property.District;
      accumulator[district] = (accumulator[district] || 0) + 1;
      return accumulator;
    }, {});

    // Convert the aggregated data into an array of objects with 'name' and 'value' properties
    const barChartData = Object.keys(districtCounts).map((district) => {
      return {
        name: district,
        count: districtCounts[district],
      };
    });

    return barChartData;
  };

  const prepareLineChartData = (property) => {  
    
    const monthlySales = {};
    
    properties.forEach((property) => {
      const date = property.SoldDate;
      const sales = property.FinalValue;
      const month = new Date(date).getMonth() + 1; // Get the month (1-12) from the SoldDate
  
      // If the month key exists, add the sales value to the existing total; otherwise, create a new key
      if (monthlySales[month]) {
        monthlySales[month] += sales;
      } else {
        monthlySales[month] = sales;
      }
    });
  

// Your line chart data
const lineChartData = Object.keys(monthlySales).map((month) => {
  return {
    name: getMonthName(month), // Implement a function to get month name from the month number (1-12)
    value: monthlySales[month],
  };
});

return lineChartData;
};

// Helper function to get month name from month number (1-12)
const getMonthName = (month) => {
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ];
  return monthNames[month - 1];
};


  function gotoDashboard() {
    handleArea1(username2);
  }

  // Transform data for the PieChart and BarChart
  const pieChartData = preparePieChartData();
  const barChartData = prepareBarChartData();
  const lineChartData = prepareLineChartData(properties);


  return (
    <div className="container">
      <div className="area1">
        <button className="area1button" onClick={gotoDashboard}>
          <img src={homeImage} alt="logo" className='homeimage' />
          <h1 className='area1text'>SAL</h1>
        </button>
      </div>

      <div className="area2">
        <input type='text' value={id2} readOnly />
        <a href="/userprofile">
          <img src={profileImage} alt="profile" className="profile" />
        </a>
      </div>

      <div className="area3">
        <div id="wrapper" onClick={handleButtonClick}>
        <table>
            <tr><td>
            <Link to={`/directorDashVisuals`}>
            <button class="tablebutton">Dasboard</button>
                        </Link>
              
            </td></tr>
            <tr><td>
            <Link to={`/reports`}>
            <button class="tablebutton">Reports</button>
                        </Link>
            </td></tr>

            <tr><td>
            <button className="tablebutton" type="button" onClick={logout}>Logout</button>  
            </td></tr>
          </table>        </div>
      </div>

      <div className="area4">
        {/* <div>
        <h2>Property District Distribution</h2>
        <br/>
        <div className="pie-chart">
          <h3>Pie Chart</h3>
          <PieChart width={400} height={250}>
            <Pie
              data={pieChartData}
              dataKey="value"
              cx="50%"
              cy="50%"
              outerRadius={60}
              label
              >
                {pieChartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} />
                ))}
              </Pie>
            <Tooltip />
          </PieChart>
        </div>
        <div className="bar-chart">
          <h3>Bar Chart</h3>
          <BarChart width={400} height={250} data={barChartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="count">
              {barChartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={barColors[index % barColors.length]} />
              ))}
            </Bar>
          </BarChart>
        </div>
        </div>
        <div class="vl"></div> */}
        <div>
        {/* <h2>Dashboard Visuals</h2> */}
        <iframe title="SALvisuals" width="1200" height="541.25" src="https://app.powerbi.com/reportEmbed?reportId=d7641b42-3383-4a0f-8d54-1f043503c7cf&autoAuth=true&embeddedDemo=true" frameborder="0" allowFullScreen="true"></iframe>

        </div>
      </div>
    </div>
  );
}
