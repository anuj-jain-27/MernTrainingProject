
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { login } from '../../actions/auth';
function Home() {
  localStorage.removeItem("broadband")
  localStorage.removeItem("mobileplan") 
  return (
      <div >
        Home
        
      </div>
    );
  }
  
  export default Home;