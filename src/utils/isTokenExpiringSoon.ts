import { jwtDecode, JwtPayload } from 'jwt-decode';
import { z } from 'zod';
import * as Sentry from '@sentry/react';

// Define the Zod schema for the JWT payload
const jwtPayloadSchema = z.object({
  exp: z.number().optional(), // 'exp' is optional since it may not always be present
});

export const isTokenExpiringSoon = (
  jwt: string,
  threshold = 5 * 60 * 1000 /* 5 minutes */,
): boolean => {
  try {
    const decodedPayload = jwtDecode<JwtPayload>(jwt);

    // Validate the decoded payload
    const parsedPayload = jwtPayloadSchema.parse(decodedPayload);

    const exp = parsedPayload?.exp;

    if (exp === undefined) {
      return false;
    }

    return Date.now() >= exp * 1000 - threshold;
  } catch (e) {
    Sentry.captureException(e);
  }

  return true;
};
