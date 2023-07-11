import React from 'react';
import './css/DashboardStyle.css';
import myImage from './img/bhoomilogo.jpg';

export function DashboardPage() {
  const handleButtonClick = (e) => {
    if (e.target.nodeName !== 'BUTTON') {
      return;
    }
    e.target.style.background = '#808080';
  };


  return (
    <div class="container">
      <div class="area1">
        <h1 class='area1text'>SAL</h1>
      </div>

      <div class="area2"></div>

      <div class="area3">
        <div id="wrapper" onClick={handleButtonClick}>
          <table>
            <tr><td>
              <button class="tablebutton">Customer</button>
            </td></tr>
            <tr><td>
              <button class="tablebutton">Property</button>
            </td></tr>
            <tr><td>
              <button class="tablebutton">Project Page</button>
            </td></tr>
            <tr><td>
              <button class="tablebutton">Approvals</button>
            </td></tr>
            <tr><td>
              <button class="tablebutton">Logout</button>
            </td></tr>
          </table>
        </div>
      
      </div>

      <div class="area4">
      <img src={myImage} alt="Image description" />    
    </div>
  </div>

  );
}

