import React, { useEffect, useState } from "react";
import axios from "axios";

function DebugPage() {
  const [userData, setUserData] = useState(null);
  const accessToken = localStorage.getItem("fitbit_access_token");

  useEffect(() => {
    if (!accessToken) return;

    // Fetch user profile data from Fitbit API
    axios.get("https://api.fitbit.com/1/user/-/profile.json", {
      headers: { Authorization: `Bearer ${accessToken}` }
    })
    .then(response => {
      setUserData(response.data.user);
    })
    .catch(error => {
      console.error("Error fetching user data:", error);
    });

  }, [accessToken]);

  return (
    <div>
      <h1>Fitbit User Data</h1>
      {userData ? (
        <pre>{JSON.stringify(userData, null, 2)}</pre>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
}

export default DebugPage;
