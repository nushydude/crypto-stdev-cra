import { z } from 'zod';
import * as Sentry from '@sentry/react';
import { config } from '../config';

// Define the Zod schema for the response
const responseSchema = z.array(z.string());

const fetchUserWatchPairs = async (
  fetchFn: (url: RequestInfo | URL, options: RequestInit) => Promise<Response>,
): Promise<Array<string>> => {
  try {
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

    // Validate the response
    const parsedResponse = responseSchema.parse(watchPairs);

    return parsedResponse;
  } catch (error) {
    if (error instanceof z.ZodError) {
      Sentry.captureException(error);
    } else {
      Sentry.captureException(error);
    }
    return [];
  }
};

export default fetchUserWatchPairs;
