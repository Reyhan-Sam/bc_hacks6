// Code to exchange the authorization code for access and refresh tokens
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");
    const codeVerifier = localStorage.getItem("pkce_code_verifier");

    if (code && codeVerifier) {
      const data = new URLSearchParams({
        client_id: import.meta.env.VITE_FITBIT_CLIENT_ID,
        grant_type: "authorization_code",
        redirect_uri: import.meta.env.VITE_FITBIT_REDIRECT_URI,
        code,
        code_verifier: codeVerifier,
      });

      axios.post("https://api.fitbit.com/oauth2/token", data, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        }
      })
      .then(response => {
        const { access_token } = response.data;
        localStorage.setItem("fitbit_access_token", access_token);
        navigate("/debug");  // ✅ Redirect to the debug page
      })
      .catch(error => {
        console.error("Error exchanging code for token:", error);
      });
    }
  }, [navigate]);

  return <h2>Authenticating...</h2>;
}

export default AuthCallback;
