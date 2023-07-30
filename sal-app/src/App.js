import React from 'react';
import { Routes, Route } from 'react-router-dom';

//component
import { LoginPage } from './components/loginpage.js';
import { AdminEnterEmployee } from './components/adminenteremployee.js';
import { DashboardPage } from './components/DashboardPage.js';
import { CustomerPage } from './components/customer.js';
import { AddCustomer } from './components/addcustomer.js';
import { AddPaymentDetails } from './components/addPaymentDetails.js';
import { AddProperty } from './components/addProperty.js';
import { AddUser } from './components/addUser.js';
import { UserProfile } from './components/userProfile.js';
import { PropertyPage } from './components/property.js';
import { OwnedProperties } from './components/ownedProperies.js';
import { SalesOfficerDashboardPage } from './components/SalesOfficerDashboard.js';
import { SalesManagerDashboardPage } from './components/SalesManagerDashboard.js';
import { AccountantDashboardPage } from './components/AccountantDashboard.js';
import { ChiefAccountantDashboardPage } from './components/ChiefAccountantDashboard.js';
import { LegalOfficerDashboardPage } from './components/LegalOfficerDashboard.js';
import { EditCustomer } from './components/editcustomer.js';
import { ViewProperty } from './components/viewproperty.js';
import { ViewProjectPage } from './components/viewprojectpage.js';
import { SalesOfficerApprovals } from './components/salesOfficerApprovals.js';
import { ViewCustomer } from './components/viewCustomer.js';
import { PropertyPayment } from './components/propertypayment.js';
import { DashVisuals } from './components/dashVisuals.js';
import { PersonalProjectPage } from './components/personalprojectpage.js';
import { SalesManagerViewProperty } from './components/SMviewpropery.js';
import { EditProperty } from './components/editproperty.js';
import { SalesManagerViewProjectPage } from './components/SMviewprojectpage.js';
import { SalesManagerViewPersonalProjectPage } from './components/SMpersonalprojectpage.js';
import { SalesManagerApprovals } from './components/SMapprovals.js';
import { SMviewOwnedProperties } from './components/SMviewOwnedProperies.js';
import { DashVisualsForAccountant } from './components/dashVisualsForAccountant.js';
import { PendingApprovals } from './components/AccPendingApprovals.js';
import { AccViewPersonalProjectPage } from './components/AccViewPersonalProjPage.js';
import { AccountantApprovals } from './components/AccApprovals.js';
import { DirectorDashboard } from './components/DirectorDashboard.js';
import { AdminDashboard } from './components/AdminDashboard.js';
import { Users } from './components/users.js';
import { EditUser } from './components/edituser.js';
import { DecativateRemoveUsers } from './components/deactivateORremoverUser.js';
import { ChangeUserStatus } from './components/ChangeUserStatus.js';
import { ApprovedProjPages } from './components/ApprovedProjPage.js';
import { LegalViewPersonalProjectPage } from './components/LegalViewPersonalProjPage.js';
import { LegalViewDeedStatus } from './components/LegalViewDeedStatus.js';
import { DirectorViewDashVisuals } from './components/DirectorViewDashVisuals.js';
import { DirectorReports } from './components/DirectorReports.js';
import {LegalSignings} from './components/LegalSignings.js';
import {DeedCompletion} from './components/LegalDeedComplete.js';


import ProjectDropdown from './components/ProjectDropdown';





function App() {
  return (
      <Routes>
        <Route path="/login" element={<LoginPage />} /> 
        <Route path="/Admin" element={<AdminEnterEmployee />} /> 
        <Route path="/dashboard" element={<DashboardPage/>} />
        <Route path="/customer" element={<CustomerPage/>} />
        <Route path="/addcustomer" element={<AddCustomer/>} />
        <Route path="/addpaymentdetails" element={<AddPaymentDetails/>} />
        <Route path="/addProperty" element={<AddProperty/>} />
        <Route path="/adduser" element={<AddUser />} /> 
        <Route path="/userprofile" element={<UserProfile />} /> 
        <Route path="/property" element={<PropertyPage />} /> 
        <Route path="/ownedproperties" element={<OwnedProperties />} /> 
        <Route path="/salesofficerdashboard" element={<SalesOfficerDashboardPage />} /> 
        <Route path="/salesmanagerdashboard" element={<SalesManagerDashboardPage />} /> 
        <Route path="/accountantdashboard" element={<AccountantDashboardPage />} /> 
        <Route path="/chiefaccountantdashboard" element={<ChiefAccountantDashboardPage />} /> 
        <Route path="/legalofficerdashboard" element={<LegalOfficerDashboardPage />} />
        <Route path="/editcustomer" element={<EditCustomer />} /> 
        <Route path="/viewproperty" element={<ViewProperty />} /> 
        <Route path="/viewprojectpage" element={<ViewProjectPage />} /> 
        <Route path="/salesofficerapprovals" element={<SalesOfficerApprovals />} /> 
        <Route path="/viewcustomer" element={<ViewCustomer />} /> 
        <Route path="/propertypayment/:customerId" element={<PropertyPayment />} />
        <Route path="/dashvisuals" element={<DashVisuals />} /> 
        <Route path="/personalprojectpage" element={<PersonalProjectPage />} /> 
        <Route path="/salesmanagerviewproperty" element={<SalesManagerViewProperty />} /> 
        <Route path="/editproperty" element={<EditProperty />} /> 
        <Route path="/salesmanagerviewprojectpage" element={<SalesManagerViewProjectPage />} /> 
        <Route path="/salesmanagerpersonalprojectpage" element={<SalesManagerViewPersonalProjectPage />} /> 
        <Route path="/salesmanagerapprovals" element={<SalesManagerApprovals />} /> 
        <Route path="/salesmanagerviewownedproperties" element={<SMviewOwnedProperties />} /> 
        <Route path="/dashvisualsforaccountant" element={<DashVisualsForAccountant />} /> 
        <Route path="/pendingapprovals" element={<PendingApprovals />} /> 
        <Route path="/personalprojpageforaccountant" element={<AccViewPersonalProjectPage />} /> 
        <Route path="/accountantapprovals" element={<AccountantApprovals />} /> 
        <Route path="/directordashboard" element={<DirectorDashboard />} /> 
        <Route path="/admindashboard" element={<AdminDashboard />} /> 
        <Route path="/users" element={<Users />} /> 
        <Route path="/edituser" element={<EditUser />} /> 
        <Route path="/deactivateremove" element={<DecativateRemoveUsers />} /> 
        <Route path="/changeuserstatus" element={<ChangeUserStatus />} /> 
        <Route path="/approvedprojpages" element={<ApprovedProjPages />} /> 
        <Route path="/personalprojpageforlegal" element={<LegalViewPersonalProjectPage />} /> 
        <Route path="/deedstatus" element={<LegalViewDeedStatus />} /> 
        <Route path="/directorDashVisuals" element={<DirectorViewDashVisuals />} /> 
        <Route path="/reports" element={<DirectorReports />} /> 
        <Route path="/ProjectDropdown" element={<ProjectDropdown />} /> 
        <Route path="/signings" element={<LegalSignings />} /> 
        <Route path="/deedcompletion" element={<DeedCompletion />} /> 
        
      </Routes>
  );
}
export default App;