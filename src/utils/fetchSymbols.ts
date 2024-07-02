import { z } from 'zod';
import * as Sentry from '@sentry/react';
import { appConfig } from '../config';
import { DEFAULT_SYMBOLS } from '../consts/DefaultSymbols';

// Define the Zod schema for the response
const responseSchema = z.object({
  symbols: z.array(z.string()),
});

export const fetchSymbols = async (): Promise<Array<string>> => {
  try {
    const response = await fetch(`${appConfig.API_URI}/api/symbols`);
    const jsonResponse = await response.json();

    // Validate the response
    const parsedResponse = responseSchema.parse(jsonResponse);

    return parsedResponse.symbols;
  } catch (error) {
    Sentry.captureException(error);
    return DEFAULT_SYMBOLS;
  }
};
