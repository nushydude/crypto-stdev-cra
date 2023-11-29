import { config } from '../config';

const setUserWatchPairs = async (
  fetchFn: (url: RequestInfo | URL, options: RequestInit) => Promise<Response>,
  watchPairs: string[],
): Promise<Array<string>> => {
  const response = await fetchFn(
    `${config.API_URI}/api/watch_pairs`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ watchPairs }),
    },
  );

  const updatedWatchPairs = await response.json();

  return updatedWatchPairs.watchPairs as Array<string>;
};

export default setUserWatchPairs;
