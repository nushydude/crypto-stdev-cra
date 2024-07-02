import { fetchWithToken } from './fetchWithToken';

describe('fetchWithToken', () => {
  const mockUrl = 'https://api.example.com/data';
  const mockOptions = { method: 'GET' };

  let mockFetch: jest.Mock;
  let mockRefreshAccessToken: jest.Mock;
  let mockSetAccessToken: jest.Mock;

  beforeEach(() => {
    mockFetch = jest.fn();
    global.fetch = mockFetch;

    mockRefreshAccessToken = jest.fn();
    mockSetAccessToken = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should make a request with the access token', async () => {
    mockFetch.mockResolvedValueOnce({ status: 200 } as Response);

    const response = await fetchWithToken({
      url: mockUrl,
      options: mockOptions,
      accessToken: 'initial-token',
      refreshAccessToken: mockRefreshAccessToken,
    });

    expect(mockFetch).toHaveBeenCalledWith(mockUrl, {
      ...mockOptions,
      headers: { Authorization: 'Bearer initial-token' },
    });
    expect(response.status).toBe(200);
  });

  it('should refresh the access token and retry the request if the first request is unauthorized', async () => {
    mockFetch
      .mockResolvedValueOnce({ status: 401 } as Response)
      .mockResolvedValueOnce({ status: 200 } as Response);
    mockRefreshAccessToken.mockResolvedValueOnce('new-token');

    const response = await fetchWithToken({
      url: mockUrl,
      options: mockOptions,
      accessToken: 'initial-token',
      refreshAccessToken: mockRefreshAccessToken,
      setAccessToken: mockSetAccessToken,
    });

    expect(mockFetch).toHaveBeenCalledTimes(2);
    expect(mockFetch).toHaveBeenNthCalledWith(1, mockUrl, {
      ...mockOptions,
      headers: { Authorization: 'Bearer initial-token' },
    });
    expect(mockFetch).toHaveBeenNthCalledWith(2, mockUrl, {
      ...mockOptions,
      headers: { Authorization: 'Bearer new-token' },
    });
    expect(mockRefreshAccessToken).toHaveBeenCalled();
    expect(mockSetAccessToken).toHaveBeenCalledWith('new-token');
    expect(response.status).toBe(200);
  });

  it('should throw an error if the refresh token process fails', async () => {
    mockFetch.mockResolvedValueOnce({ status: 401 } as Response);
    mockRefreshAccessToken.mockRejectedValueOnce(
      new Error('Refresh token failed'),
    );

    await expect(
      fetchWithToken({
        url: mockUrl,
        options: mockOptions,
        accessToken: 'initial-token',
        refreshAccessToken: mockRefreshAccessToken,
      }),
    ).rejects.toThrow('Refresh token failed');

    expect(mockFetch).toHaveBeenCalledTimes(1);
    expect(mockRefreshAccessToken).toHaveBeenCalled();
  });

  it('should use default options if none are provided', async () => {
    mockFetch.mockResolvedValueOnce({ status: 200 } as Response);

    const response = await fetchWithToken({
      url: mockUrl,
      accessToken: 'initial-token',
      refreshAccessToken: mockRefreshAccessToken,
    });

    expect(mockFetch).toHaveBeenCalledWith(mockUrl, {
      headers: { Authorization: 'Bearer initial-token' },
    });
    expect(response.status).toBe(200);
  });
});
