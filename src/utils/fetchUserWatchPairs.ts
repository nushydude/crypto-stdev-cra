import { config } from '../config';

const fetchUserWatchPairs = async (
  fetchFn: (url: RequestInfo | URL, options: RequestInit) => Promise<Response>,
) => {
  const response = await fetchFn(
    `${config.API_URI}/api/watch_pairs`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );

  const watchPairs = await response.json();

  return watchPairs as Array<string>;
};

export default fetchUserWatchPairs;
