import React, { useEffect, useState } from "react";
import axios from "axios";

function LogoutButton() {
  const handleLogout = () => {
    localStorage.removeItem("fitbit_access_token");
    alert("Fitbit token cleared. Please reconnect.");
    window.location.href = "/";  // Redirect to home page
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

function DebugPage() {
  const [userData, setUserData] = useState(null);
  const [activityData, setActivityData] = useState(null);
  const [heartRate, setHeartRate] = useState(null);
  const [sleepData, setSleepData] = useState(null);
  const [weightData, setWeightData] = useState(null);

  const accessToken = localStorage.getItem("fitbit_access_token");


  useEffect(() => {
    if (!accessToken) return;

    // Fetch user profile data from Fitbit API
    axios.get("https://api.fitbit.com/1/user/-/profile.json", {
      headers: { Authorization: `Bearer ${accessToken}` }
    })
    .then(response => setUserData(response.data.user))
    .catch(error => console.error("Error fetching profile:", error));

    // Fetch activity data (steps, calories, etc.)
    axios.get("https://api.fitbit.com/1/user/-/activities.json", {
      headers: { Authorization: `Bearer ${accessToken}` },
    })
    .then(response => setActivityData(response.data))
    .catch(error => console.error("Error fetching activity data:", error));

    // Fetch heart rate data
    axios.get("https://api.fitbit.com/1/user/-/activities/heart/date/today/1d.json", {
      headers: { Authorization: `Bearer ${accessToken}` },
    })
    .then(response => setHeartRate(response.data))
    .catch(error => console.error("Error fetching heart rate:", error));

    // Fetch sleep data
    axios.get("https://api.fitbit.com/1.2/user/-/sleep/date/today.json", {
      headers: { Authorization: `Bearer ${accessToken}` },
    })
    .then(response => setSleepData(response.data))
    .catch(error => console.error("Error fetching sleep data:", error));

    // Fetch weight data
    axios.get("https://api.fitbit.com/1/user/-/body/log/weight/date/today.json", {
      headers: { Authorization: `Bearer ${accessToken}` },
    })
    .then(response => setWeightData(response.data))
    .catch(error => console.error("Error fetching weight data:", error));

  }, [accessToken]);

  return (
    <div>
      <h1>Fitbit User Data</h1>
      <LogoutButton /> 
      {userData && <pre>{JSON.stringify(userData, null, 2)}</pre>}
      
      <h2>Activity Data</h2>
      {activityData && <pre>{JSON.stringify(activityData, null, 2)}</pre>}

      <h2>Heart Rate Data</h2>
      {heartRate && <pre>{JSON.stringify(heartRate, null, 2)}</pre>}

      <h2>Sleep Data</h2>
      {sleepData && <pre>{JSON.stringify(sleepData, null, 2)}</pre>}

      <h2>Weight Data</h2>
      {weightData && <pre>{JSON.stringify(weightData, null, 2)}</pre>}
    </div>
  );
}


export default DebugPage;
