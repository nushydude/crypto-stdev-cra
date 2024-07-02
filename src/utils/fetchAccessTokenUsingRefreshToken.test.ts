import { fetchAccessTokenUsingRefreshToken } from './fetchAccessTokenUsingRefreshToken';

jest.mock('../config', () => ({
  appConfig: {
    API_URI: 'https://example.com',
  },
}));

describe('fetchAccessTokenUsingRefreshToken', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should throw an error if no refresh token is provided', async () => {
    await expect(fetchAccessTokenUsingRefreshToken('')).rejects.toThrow(
      'No refresh token available',
    );
  });

  it('should return the access token if the request is successful', async () => {
    const mockAccessToken = 'new-access-token';
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue({ accessToken: mockAccessToken }),
    } as any);

    const result = await fetchAccessTokenUsingRefreshToken(
      'valid-refresh-token',
    );

    expect(result).toBe(mockAccessToken);
  });

  it('should throw an error if the access token is not returned', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue({}),
    } as any);

    await expect(
      fetchAccessTokenUsingRefreshToken('valid-refresh-token'),
    ).rejects.toThrow('Could not generate access token using refresh token');
  });

  it('should throw an error if the fetch call fails', async () => {
    global.fetch = jest.fn().mockRejectedValue(new Error('Network error'));

    await expect(
      fetchAccessTokenUsingRefreshToken('valid-refresh-token'),
    ).rejects.toThrow('Network error');
  });
});
