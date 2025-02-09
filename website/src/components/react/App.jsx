import React from "react";
import pkg from 'react-router-dom';
const {BrowserRouter, Routes, Route} = pkg;
const {useNavigate} = pkg;

// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DebugPage from "./DebugPage";
import AuthCallback from "./AuthCallback";
import { getAuthorizationUrl } from "./fitbitAuth";  

function Home() {
  const handleLogin = () => {
    window.location.href = getAuthorizationUrl();  
  };

  return (
    <div style={{ textAlign: "center", marginTop: "20vh" }}>
      <h1>Fitness App</h1>
      <button 
        onClick={handleLogin} 
        style={{ padding: "10px 20px", fontSize: "16px", cursor: "pointer" }}
      >
        Connect with Fitbit
      </button>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth/callback" element={<AuthCallback/>} />
        <Route path="/debug" element={<DebugPage />} />
      </Routes>
    </BrowserRouter>
  );
}

function LogoutButton() {
  const handleLogout = () => {
    localStorage.removeItem("fitbit_access_token");
    alert("Fitbit token cleared. Please reconnect.");
    window.location.reload(); // Refresh to force re-login
  };

  return (
    <button 
      onClick={handleLogout} 
      style={{ padding: "10px 20px", margin: "10px", cursor: "pointer" }}
    >
      Logout from Fitbit
    </button>
  );
}

export default App;
