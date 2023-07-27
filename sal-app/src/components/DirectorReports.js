import './css/DirectorDashboard.css';
import myImage from './img/bhoomilogo.jpg';
import profileImage from './img/user_icon.png';
import {Link} from 'react-router-dom';
import { getUsername, handleArea1, getAllProperties } from './LocalStorageUtils';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { logout } from './logout';
import homeImage from './img/homepage.png';
import jsPDF from "jspdf";
import "jspdf-autotable";
import ProjectDropdown from './ProjectDropdown';




export function DirectorReports() {
  const handleButtonClick = (e) => {
    if (e.target.nodeName !== 'BUTTON') {
      return;
    }
    e.target.style.background = '#808080';
  };

  // const [username,setUsername] = useState('');
  const username2 = getUsername();
  // setUsername(username2)
  const [id2, setId2] = useState(null);
  const [properties, setProperties] = useState([]);
  const [month, setMonth] = useState([]);
  const [year, setYear] = useState([]);
  const [projectname, setProjectName] = useState([]);

  

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

      

  }, []); // Empty dependencies array means the effect only runs once (on mount)
  


  function gotoDashboard (){
    handleArea1(username2)
}


const setDate = () =>{
  const url_customers = 'http://localhost/backend/generatepdf.php';

  let fData = new FormData();
  fData.append('month', month);
  fData.append('year', year);

  axios.post(url_customers, fData)
  .then(response => {
    const customers = response.data;
    setProperties (customers);
    alert('Date set to '+year+' / '+month)
    // Do further processing with the username here
  })
  .catch(error => {
    alert(error.message)
  });
}

const exportPDF = () => {
  let q = 0;
  let Grandtotal = 0;
  let totsales = 0;
  const unit = "pt";
  const size = "A4";
  const orientation = "portrait";
  const doc = new jsPDF(orientation, unit, size);

  doc.setFontSize(15);

  const title = "Monthly Sales Report";
  const headers = [["PropertyID","Type", "Project Name", "Location","Sales"]];

  // Format the data array here
  const formattedData = properties.map(elt => [
    elt.PropertyID,
    elt.PropertyType,
    elt.ProjectName,
    elt.Location,
    new Intl.NumberFormat('en-US').format(elt.FinalValue) // Format the FinalValue to include commas
  ]);

  // Set options for the autoTable
  const options = {
    startY: 80,
    head: headers,
    body: formattedData, // Use the formatted data
    styles: {
      columnStyles: {
        4: { halign: 'right' } // Align the data in the 4th (Sales) column to the right
      },
      textColor: "black",
      fontSize: 12
    },
    margin: { top: 40 },
    addPageContent: function (data) {
      // Format the "Total Revenue" with comma separators
      const totalNumberText = "Total Revenue: LKR";
      const totalValue = new Intl.NumberFormat('en-US').format(Grandtotal);
      doc.text(totalNumberText, 60, 300);
      doc.text(totalValue, 60 + 120, 300);
    }
  };

  properties.forEach(data => {
    Grandtotal = Grandtotal + parseInt(data.FinalValue);
    totsales = totsales + 1;
  });

  doc.text(title, 250, 40);
  doc.text(year+' / '+month, 60, 65);
  doc.autoTable(options);

  const totalSalesText = "Total Sales:";
  doc.text(totalSalesText, 60, 300 + 40);
  doc.text(String(totsales), 60 + 120, 300 + 40);
  doc.save("Sales Report.pdf");
};


const setReportData = () =>{
  const url_customers = 'http://localhost/backend/generatepdfNEW.php';

  let fData = new FormData();
  fData.append('month', month);
  fData.append('year', year);
  fData.append('projectname', projectname);

  

  axios.post(url_customers, fData)
  .then(response => {
    const customers = response.data;
    setProperties (customers);
    alert('Date set to '+year+' / '+month)
    // Do further processing with the username here
  })
  .catch(error => {
    alert(error.message)
  });
}


const generateReport = () => {
  const unit = "pt"; //fixed
  const size = "A4"; //fixed
  const orientation = "portrait"; //fixed 

  const doc = new jsPDF(orientation, unit, size); //fixed

  doc.setFontSize(15); //fixed

  const title = "Project Sales Report";
  const headers = [["Project Name", "Location", "LotNo", "Sales"]]; // initialize the topics

  const url_customers = 'http://localhost/backend/generatepdfNEW.php';

  let fData = new FormData();
  fData.append('month', month);
  fData.append('year', year);
  fData.append('projectname', projectname);

  axios.post(url_customers, fData)
    .then(response => {
      const properties = response.data;
      let Grandtotal = 0;
      let totsales = 0;

      const data = properties.map(elt => [elt.ProjectName, elt.Location, elt.LotNo, elt.FinalValue]); // in here display each property or sales details

      properties.forEach(data => {
        Grandtotal = Grandtotal + parseInt(data.FinalValue);
        totsales = totsales + 1;
      });

      let content = {
        startY: 80,
        head: headers,
        body: data
      };

      doc.text(title, 250, 40); //250 = x value, 40 = y value
      doc.text(year + ' / ' + month, 60, 65);
      doc.autoTable(content);
      doc.setTextColor("black")

      const totalNumberText = "Total Revenue :";
      doc.text(totalNumberText, 60, 300);
      doc.text(String(Grandtotal), 60 + 120, 300);

      doc.text("Total Sales : ", 60, 300 + 40);
      doc.text(String(totsales), 60 + 120, 300 + 40);
      doc.save("Sales Report.pdf");
    })
    .catch(error => {
      alert(error.message)
    });
}


  return (
    <div class="container">
      <div class="area1">
      <button class="area1button" onClick={gotoDashboard} >
          <img src={homeImage} alt="logo" class='homeimage'/>    
          <h1 class='area1text'>SAL</h1> 
        </button>
        {/* <h1 class='area1text'>SAL</h1> */}
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
          </table>
        </div>
      
      </div>

      <div class="area4">
      {/* <img src={myImage} alt="logo" class='logo'/>     */}
      <div>
        <h2>Monthly Sales Report</h2>
        <h3>Select Month</h3>
        <select name="month" id="month" onChange={(e) => setMonth(e.target.value)} value={month}>
          <option value="blank">   </option>
          <option value="01">January</option>
          <option value="02">February</option>
          <option value="03">March</option>
          <option value="04">April</option>
          <option value="05">May</option>
          <option value="06">June</option>
          <option value="07">July</option>
          <option value="08">August</option>
          <option value="09">September</option>
          <option value="10">October</option>
          <option value="11">November</option>
          <option value="12">December</option>
        </select>
      <h3>Enter Year</h3>
      <input type='text' name='year'  onChange={(e) => setYear(e.target.value)} value={year}/>

      <br/><br/>
      <button id="report"  class="btn btn-dark" onClick={()=>setDate()}>Set Date</button><br/><br/>

      <br/><br/>

      <button id="report"  class="btn btn-dark" onClick={()=>exportPDF()}>Generate Report +</button><br/><br/>
    </div>
    <div class = 'vl'></div>


    <div>
      <h2>Project Sales Report</h2>
      <h3>Select Project</h3>
        <select name="project" id="project" onChange={(e) => setProjectName(e.target.value)} value={month}>
          {/* have to get project list from db */}
          <ProjectDropdown value={projectname} onChange={(e) => setProjectName(e.value)} />
          </select>
        <h3>Select Month</h3>
        <select name="month" id="month" onChange={(e) => setMonth(e.target.value)} value={month}>
          <option value="blank">   </option>
          <option value="01">January</option>
          <option value="02">February</option>
          <option value="03">March</option>
          <option value="04">April</option>
          <option value="05">May</option>
          <option value="06">June</option>
          <option value="07">July</option>
          <option value="08">August</option>
          <option value="09">September</option>
          <option value="10">October</option>
          <option value="11">November</option>
          <option value="12">December</option>
        </select>

      <h3>Enter Year</h3>
        <input type='text' name='year'  onChange={(e) => setYear(e.target.value)} value={year}/>
      <br/><br/>
      
      <button id="report2"  class="btn btn-dark" onClick={()=>setReportData()}>Check Data</button><br/><br/>
      <br/><br/>
      <button id="report2"  class="btn btn-dark" onClick={()=>generateReport()}>Generate Report</button><br/><br/>
    </div>

  </div>
</div>

  );
}