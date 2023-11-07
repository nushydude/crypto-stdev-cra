import { jwtDecode, JwtPayload } from 'jwt-decode';

export const isTokenExpiringSoon = (
  jwt: string,
  threshold = 5 * 60 * 1000 /* 5 minutes */,
) => {
  try {
    const exp = (jwtDecode(jwt) as JwtPayload)?.exp;

    if (exp === undefined) {
      return false;
    }

    return Date.now() >= exp * 1000 - threshold;
  } catch (e) {
    return true;
  }
};
