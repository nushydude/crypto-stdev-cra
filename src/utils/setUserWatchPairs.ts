import { z } from 'zod';
import { appConfig } from '../config';

// Define the Zod schema for the input
const watchPairsSchema = z.array(z.string());

// Define the Zod schema for the response
const responseSchema = z.object({
  watchPairs: z.array(z.string()),
});

const setUserWatchPairs = async (
  fetchFn: (url: RequestInfo | URL, options: RequestInit) => Promise<Response>,
  watchPairs: string[],
): Promise<Array<string>> => {
  // Validate the input
  watchPairsSchema.parse(watchPairs);

  const response = await fetchFn(`${appConfig.API_URI}/api/watch_pairs`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ watchPairs }),
  });

  const updatedWatchPairs = await response.json();

  // Validate the response
  const parsedResponse = responseSchema.parse(updatedWatchPairs);

  return parsedResponse.watchPairs;
};

export default setUserWatchPairs;
