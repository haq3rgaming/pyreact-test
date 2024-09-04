import React from 'react';

import { useEffect } from 'react';
import {useNavigate} from "react-router-dom"

function Logout() {
  const navigate = useNavigate()
  useEffect(() => {
    fetch('/logout', {
      method: 'POST',
      credentials: 'include',
    }).then(() => {
      navigate("/login")
    });
  }, [navigate]);

  return <div>Logging out...</div>;
}   

export default Logout;