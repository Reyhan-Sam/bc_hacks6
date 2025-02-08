import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import React from 'react'
import { getAuthorizationUrl } from './utils/fitbitAuth';

function App() {
  const handleLogin = () => {
    const authUrl = getAuthorizationUrl();
    console.log("Redirecting to:", authUrl);  // Debugging: Check if URL is correct
    window.location.href = authUrl;
  };

  return (
    <div>
      <h1>Fitness App</h1>
      <button onClick={handleLogin}>Connect with Fitbit</button>
    </div>
  );
}

export default App;