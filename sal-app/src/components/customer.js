import React, { useState } from 'react';
import './css/DashboardStyle.css';
import './css/customer.css';

export function CustomerPage() {
    const handleButtonClick = async () => {
        window.location.href = '/addcustomer';
    }

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
      {/* <img src={myImage} alt="logo" />     */}
        <table>
            <tr><td><button class="area4button" onClick={() => handleButtonClick('add')}>Add Customer</button></td></tr>
            <tr><td><button class="area4button" onClick={() => handleButtonClick('edit')}>Edit Customer</button></td></tr>
        </table>

        {/* Render the appropriate page based on the current state */}
        {/* {currentPage === 'add' && <AddCustomer />} */}
        {/* {currentPage === 'edit' && <EditCustomer />} */}
    </div>
  </div>

  );
}

