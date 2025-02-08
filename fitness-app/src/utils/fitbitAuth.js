// Code for generating the Fitbit authorization URL
import { generateCodeVerifier, generateCodeChallenge } from './pkce';

const CLIENT_ID = import.meta.env.VITE_FITBIT_CLIENT_ID;
const REDIRECT_URI = import.meta.env.VITE_FITBIT_REDIRECT_URI;
const SCOPES = 'activity heartrate sleep profile';

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
