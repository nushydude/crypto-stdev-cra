import { isTokenExpiringSoon } from './isTokenExpiringSoon';

interface FetchWithTokenParams {
  url: string;
  options: RequestInit;
  accessToken?: string | null;
  refreshAccessToken: () => Promise<string>;
  setAccessToken?: (accessToken: string) => void;
}

export const fetchWithToken = async ({
  url,
  options,
  accessToken,
  refreshAccessToken,
  setAccessToken,
}: FetchWithTokenParams) => {
  let newAccessToken = accessToken;

  // Check if there is no accessToken or if is expiring soon.
  // If it is, refresh the access token and set the new token.
  if (!accessToken || (accessToken && isTokenExpiringSoon(accessToken))) {
    newAccessToken = await refreshAccessToken();
  }

  const headers = {
    ...options.headers,
    // Add the Authorization header to the request
    ...(accessToken ? { Authorization: `Bearer ${newAccessToken}` } : {}),
  };

  const response = await fetch(url, { ...options, headers });

  if (response.status === 401) {
    // If the response is 401 Unauthorized, refresh the access token and try again.
    newAccessToken = await refreshAccessToken();

    if (setAccessToken) {
      setAccessToken(newAccessToken);
    }

    const headers = {
      ...options.headers,
      ...(accessToken ? { Authorization: `Bearer ${newAccessToken}` } : {}),
    };

    return fetch(url, { ...options, headers });
  }

  return response;
};
