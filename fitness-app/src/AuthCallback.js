// Code to exchange the authorization code for access and refresh tokens
import React, { useEffect } from 'react';
import axios from 'axios';

function AuthCallback() {
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    const codeVerifier = localStorage.getItem('pkce_code_verifier');

    if (code && codeVerifier) {
      const data = new URLSearchParams({
        client_id: import.meta.env.VITE_FITBIT_CLIENT_ID,
        grant_type: 'authorization_code',
        redirect_uri: import.meta.env.VITE_FITBIT_REDIRECT_URI,
        code,
        code_verifier: codeVerifier,
      });

      axios.post('https://api.fitbit.com/oauth2/token', data, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        auth: {
          username: import.meta.env.VITE_FITBIT_CLIENT_ID,
          password: '', // Client secret is not used in PKCE flow
        },
      })
      .then(response => {
        const { access_token, refresh_token } = response.data;
        // Store tokens securely
        localStorage.setItem('fitbit_access_token', access_token);
        localStorage.setItem('fitbit_refresh_token', refresh_token);
        // Redirect to your main app page
        window.location.href = '/';
      })
      .catch(error => {
        console.error('Error exchanging code for tokens:', error);
      });
    }
  }, []);

  return <div>Authorizing...</div>;
}

export default AuthCallback;
