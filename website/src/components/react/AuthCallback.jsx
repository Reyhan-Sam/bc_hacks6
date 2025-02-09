import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function AuthCallback() {
  const navigate = useNavigate();
  const [code, setCode] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Extract auth code from URL
      const searchParams = new URLSearchParams(window.location.search);
      const authCode = searchParams.get("code");

      if (authCode) {
        setCode(authCode);
      }
    }
  }, []);

  useEffect(() => {
    if (!code) return; // Wait until the code is set

    const codeVerifier = localStorage.getItem("pkce_code_verifier");
    if (codeVerifier) {
      const data = new URLSearchParams({
        client_id: "23Q74W",
        grant_type: "http://localhost:4321/auth/callback",
        redirect_uri: import.meta.env.VITE_FITBIT_REDIRECT_URI,
        code,
        code_verifier: codeVerifier,
      });

      axios
        .post("https://api.fitbit.com/oauth2/token", data, {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        })
        .then((response) => {
          localStorage.setItem(
            "fitbit_access_token",
            response.data.access_token
          );
          navigate("/debug");
        })
        .catch((error) => {
          console.error("Error exchanging code for token:", error);
        });
    }
  }, [code, navigate]);

  return <h2>Authenticating...</h2>;
}

export default AuthCallback;
