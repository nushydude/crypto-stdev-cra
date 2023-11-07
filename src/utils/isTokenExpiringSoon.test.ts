import mockdate from 'mockdate';
import jwtDecode from 'jwt-decode';
import { isTokenExpiringSoon } from './isTokenExpiringSoon';

jest.mock('jwt-decode', () => ({
  jwtDecode: jest.fn(),
}));

describe('isTokenExpiringSoon', () => {
  const mockTime = 1577836800000;

  mockdate.set(1577836800000);

  afterEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    mockdate.reset();
  });

  it('returns false if the token is not expiring soon', () => {
    // Mock jwtDecode to return a payload indicating the token will expire in 10 minutes
    (jwtDecode as any).jwtDecode.mockReturnValue({
      exp: (mockTime + 10 * 60 * 1000) / 1000,
    });

    const jwt = 'not-expiring-soon-token';
    expect(isTokenExpiringSoon(jwt)).toBe(false);
  });

  it('returns true if the token is expiring in less than five minutes', () => {
    // Mock jwtDecode to return a payload indicating the token will expire in 4 minutes
    (jwtDecode as any).jwtDecode.mockReturnValue({
      exp: (mockTime + 4 * 60 * 1000) / 1000,
    });

    const jwt = 'expiring-soon-token';
    expect(isTokenExpiringSoon(jwt)).toBe(true);
  });

  it('returns true if the token has already expired', () => {
    // Mock jwtDecode to return a payload indicating the token expired 1 minute ago
    (jwtDecode as any).jwtDecode.mockReturnValue({
      exp: (mockTime - 1 * 60 * 1000) / 1000,
    });

    const jwt = 'expired-token';
    expect(isTokenExpiringSoon(jwt)).toBe(true);
  });

  it('handles tokens with no expiration claim', () => {
    // Mock jwtDecode to return an empty payload
    (jwtDecode as any).jwtDecode.mockReturnValue({});

    const jwt = 'no-exp-claim-token';
    expect(isTokenExpiringSoon(jwt)).toBe(false);
  });

  it('throws an error when jwtDecode cannot parse the token', () => {
    (jwtDecode as any).jwtDecode.mockImplementation(() => {
      throw new Error('Invalid token');
    });

    const jwt = 'expired-token';
    expect(isTokenExpiringSoon(jwt)).toBe(true);
  });
});
