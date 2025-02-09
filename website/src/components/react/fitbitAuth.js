// Code for generating the Fitbit authorization URL
import { generateCodeVerifier, generateCodeChallenge } from '../pkce';

const CLIENT_ID = import.meta.env.VITE_FITBIT_CLIENT_ID;
const REDIRECT_URI = import.meta.env.VITE_FITBIT_REDIRECT_URI;
const SCOPES = 'activity heartrate weight profile';

export function getAuthorizationUrl() {
  const codeVerifier = generateCodeVerifier();
  const codeChallenge = generateCodeChallenge(codeVerifier);
  localStorage.setItem('pkce_code_verifier', codeVerifier);

  const params = new URLSearchParams({
    response_type: 'code',
    client_id: CLIENT_ID,
    redirect_uri: REDIRECT_URI,
    scope: SCOPES,
    code_challenge: codeChallenge,
    code_challenge_method: 'S256',
  });

  return `https://www.fitbit.com/oauth2/authorize?${params.toString()}`;
}

export function authorize(code) {
  if (!code) return; // Wait until the code is set

  const codeVerifier = localStorage.getItem("pkce_code_verifier");
  if (code && codeVerifier) {
    const data = new URLSearchParams({
      client_id: import.meta.env.VITE_FITBIT_CLIENT_ID,
      grant_type: "authorization_code",
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
        const { access_token } = response.data;
        localStorage.setItem("fitbit_access_token", access_token);
        navigate("/debug"); // ✅ Redirect to debug page
      })
      .catch((error) => {
        console.error("Error exchanging code for token:", error);
      });
  }
}