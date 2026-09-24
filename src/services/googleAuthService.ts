// ===================================================
// ARGI JEWELS - GOOGLE AUTHENTICATION SERVICE
// Handles Google Identity Services & OAuth 2.0 Web Flow
// ===================================================

const STORAGE_KEY_CLIENT_ID = 'argi_google_client_id_v1';

export interface GoogleUserData {
  sub: string;
  name: string;
  email: string;
  picture?: string;
  given_name?: string;
  family_name?: string;
  email_verified?: boolean;
}

export function getGoogleClientId(): string {
  const stored = localStorage.getItem(STORAGE_KEY_CLIENT_ID);
  if (stored && stored.trim()) return stored.trim();
  const envVal = (import.meta as any).env?.VITE_GOOGLE_CLIENT_ID;
  if (envVal && envVal.trim()) return envVal.trim();
  return '';
}

export function saveGoogleClientId(clientId: string): void {
  localStorage.setItem(STORAGE_KEY_CLIENT_ID, clientId.trim());
}

/**
 * Safely decodes a base64url-encoded JWT string from Google Identity Services
 */
export function decodeGoogleJwt(token: string): GoogleUserData | null {
  try {
    const base64Url = token.split('.')[1];
    if (!base64Url) return null;
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      window
        .atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload) as GoogleUserData;
  } catch (err) {
    console.error('Error decoding Google JWT:', err);
    return null;
  }
}

/**
 * Launches the official Google OAuth 2.0 popup window directly to accounts.google.com
 */
export function openGoogleOAuthPopup(
  clientId: string,
  onSuccess: (data: GoogleUserData) => void,
  onError: (err: string) => void
): Window | null {
  const width = 520;
  const height = 640;
  const left = window.screenX + (window.outerWidth - width) / 2;
  const top = window.screenY + (window.outerHeight - height) / 2;

  const redirectUri = window.location.origin;
  const nonce = Math.random().toString(36).substring(2);
  const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${encodeURIComponent(
    clientId
  )}&redirect_uri=${encodeURIComponent(
    redirectUri
  )}&response_type=token%20id_token&scope=${encodeURIComponent(
    'openid email profile'
  )}&prompt=select_account&nonce=${nonce}`;

  const popup = window.open(
    authUrl,
    'GoogleSignInPopup',
    `width=${width},height=${height},left=${left},top=${top},status=no,toolbar=no,menubar=no,location=yes,resizable=yes`
  );

  if (!popup) {
    onError('Popup blocked. Please allow popups for localhost to sign in with Google.');
    return null;
  }

  // Poll for callback hash in popup URL
  const pollInterval = setInterval(() => {
    try {
      if (popup.closed) {
        clearInterval(pollInterval);
        return;
      }

      if (popup.location.href.includes(redirectUri)) {
        const hash = popup.location.hash;
        if (hash) {
          const params = new URLSearchParams(hash.substring(1));
          const idToken = params.get('id_token');
          const accessToken = params.get('access_token');

          if (idToken) {
            const decoded = decodeGoogleJwt(idToken);
            if (decoded) {
              clearInterval(pollInterval);
              popup.close();
              onSuccess(decoded);
              return;
            }
          }

          if (accessToken) {
            // Fetch user info using access token
            fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
              headers: { Authorization: `Bearer ${accessToken}` }
            })
              .then((res) => res.json())
              .then((userInfo) => {
                clearInterval(pollInterval);
                popup.close();
                onSuccess(userInfo);
              })
              .catch(() => {
                clearInterval(pollInterval);
                popup.close();
              });
            return;
          }
        }
      }
    } catch {
      // Cross-origin restriction while on accounts.google.com — expected until redirect back
    }
  }, 500);

  return popup;
}
