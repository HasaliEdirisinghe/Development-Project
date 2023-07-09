import React from 'react';
import { Routes, Route } from 'react-router-dom';

//component
import { LoginPage } from './components/loginpage.js';
import { AdminEnterEmployee } from './components/adminenteremployee.js';
import { DashboardPage } from './components/DashboardPage.js';


function App() {
  return (
      <Routes>
        <Route path="/login" element={<LoginPage />} /> 
        <Route path="/Admin" element={<AdminEnterEmployee />} /> 
        <Route path="/dashboard" element={<DashboardPage/>} />
      </Routes>
  );
}
export default App;