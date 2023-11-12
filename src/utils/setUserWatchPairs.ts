import { config } from '../config';
import { fetchWithToken } from './fetchWithToken';

const setUserWatchPairs = async (
  accessToken: string,
  refreshAccessToken: () => Promise<string>,
  setAccessToken: (accessToken: string) => void,
  watchPairs: string[],
) => {
  const response = await fetchWithToken({
    url: `${config.API_URI}/api/watch_pairs`,
    options: {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ watchPairs }),
    },
    accessToken,
    refreshAccessToken,
    setAccessToken,
  });

  const updatedWatchPairs = await response.json();

  return updatedWatchPairs;
};

export default setUserWatchPairs;
