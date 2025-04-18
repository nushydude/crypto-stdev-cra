import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { fetchWithToken } from './fetchWithToken';

describe('fetchWithToken', () => {
  const mockUrl = 'https://api.example.com/data';
  const mockOptions = { method: 'GET' };

  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn());
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('should make a request with the access token', async () => {
    const mockFetch = global.fetch as ReturnType<typeof vi.fn>;
    mockFetch.mockResolvedValueOnce({ status: 200 } as Response);

    const response = await fetchWithToken({
      url: mockUrl,
      options: mockOptions,
      accessToken: 'initial-token',
      refreshAccessToken: vi.fn().mockResolvedValueOnce('token'),
    });

    expect(mockFetch).toHaveBeenCalledWith(mockUrl, {
      ...mockOptions,
      headers: { Authorization: 'Bearer initial-token' },
    });
    expect(response.status).toBe(200);
  });

  it('should refresh the access token and retry the request if the first request is unauthorized', async () => {
    const mockFetch = global.fetch as ReturnType<typeof vi.fn>;
    const mockRefreshAccessToken = vi.fn().mockResolvedValueOnce('new-token');
    const mockSetAccessToken = vi.fn();

    mockFetch
      .mockResolvedValueOnce({ status: 401 } as Response)
      .mockResolvedValueOnce({ status: 200 } as Response);

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
    const mockFetch = global.fetch as ReturnType<typeof vi.fn>;
    const mockRefreshAccessToken = vi.fn().mockRejectedValueOnce(
      new Error('Refresh token failed'),
    );

    mockFetch.mockResolvedValueOnce({ status: 401 } as Response);

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
    const mockFetch = global.fetch as ReturnType<typeof vi.fn>;
    mockFetch.mockResolvedValueOnce({ status: 200 } as Response);

    const response = await fetchWithToken({
      url: mockUrl,
      accessToken: 'initial-token',
      refreshAccessToken: vi.fn().mockResolvedValueOnce('token'),
    });

    expect(mockFetch).toHaveBeenCalledWith(mockUrl, {
      headers: { Authorization: 'Bearer initial-token' },
    });
    expect(response.status).toBe(200);
  });
});
