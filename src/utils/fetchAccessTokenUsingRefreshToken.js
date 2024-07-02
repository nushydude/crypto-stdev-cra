import { appConfig } from '../config';

export const fetchAccessTokenUsingRefreshToken = async (
  refreshToken: string,
): Promise<string> => {
  if (!refreshToken) {
    throw new Error('No refresh token available');
  }

  const response = await fetch(`${appConfig.API_URI}/api/auth/refresh`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ refreshToken }),
  });

  const data = await response.json();

  if (!data.accessToken) {
    throw new Error('Could not generate access token using refresh token');
  }

  return data.accessToken;
};
