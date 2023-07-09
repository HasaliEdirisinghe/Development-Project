import './css/Style.css';
import { useState } from 'react';
import axios from 'axios';
import React from 'react';


export function AdminEnterEmployee() {
  const [name,setName] = useState('');
  const [password,setPassword] = useState('');

  const handleSubmit = () => {
    if(name.length === 0){
      alert("Please enter your username!");
    }
    else if(password.length === 0){
      alert("Please enter your password!");
    }

    else{
      // alert("All set")
       const url = 'http://localhost/backend/login.php';
       let fData = new FormData();
       fData.append('name', name);
       fData.append('password', password);
       axios.post(url, fData).then(response=> alert(response.data)).catch(error=> alert(error.message));
    }
  }

  return (
    <div>
        {/* <form action="/action_page.php" /> */}
        <h1>SIGN UP</h1>
        
        <div className="icon">
            <i class="fas fa-user-circle"></i>
        </div>

        <div className="formcontainer" />
        <div className="container">
            <label for="uname"><strong>Username</strong></label>
            <input type="text" placeholder="Enter Username" name="uname" required />
            <label for="mail"><strong>E-mail</strong></label>
            <input type="text" placeholder="Enter E-mail" name="mail" required />
            <label for="psw"><strong>Password</strong></label>
            <input type="password" placeholder="Enter Password" name="psw" required />
        </div>

        <button type="submit"><strong>SIGN UP</strong></button>

        <div className="container" style="background-color: #eee">
          <label style="padding-left: 15px">
              <input type="checkbox"  checked="checked" name="remember" /> Remember me
          </label>
          <span class="psw"><a href="#">Forgot password?</a></span>
        </div>
    
    </div>
    
  );
  
}

