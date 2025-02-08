import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DebugPage from "./pages/DebugPage";
import AuthCallback from "./AuthCallback";
import { getAuthorizationUrl } from "./utils/fitbitAuth";  

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
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth/callback" element={<AuthCallback />} />
        <Route path="/debug" element={<DebugPage />} />
      </Routes>
    </Router>
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
