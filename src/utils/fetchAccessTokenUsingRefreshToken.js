import { config } from '../config';

export const fetchAccessTokenUsingRefreshToken = async (refreshToken) => {
  if (!refreshToken) {
    throw new Error('No refresh token available');
  }

  return fetch(`${config.API_URI}/api/auth/refresh`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ refreshToken }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.accessToken) {
        return data.accessToken;
      } else {
        throw new Error('No access token available');
      }
    });
};
