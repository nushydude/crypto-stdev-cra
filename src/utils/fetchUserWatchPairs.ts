import { config } from '../config';
import { fetchWithToken } from './fetchWithToken';

const fetchUserWatchPairs = async (
  accessToken: string,
  refreshAccessToken: () => Promise<string>,
) => {
  const response = await fetchWithToken({
    url: `${config.API_URI}/api/watch_pairs`,
    options: {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    },
    accessToken,
    refreshAccessToken,
  });

  const watchPairs = await response.json();

  return watchPairs as Array<string>;
};

export default fetchUserWatchPairs;
