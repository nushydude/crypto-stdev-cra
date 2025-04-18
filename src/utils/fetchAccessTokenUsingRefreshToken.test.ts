import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { fetchAccessTokenUsingRefreshToken } from './fetchAccessTokenUsingRefreshToken';

vi.mock('../config', () => ({
  appConfig: {
    API_URI: 'https://example.com',
  },
}));

describe('fetchAccessTokenUsingRefreshToken', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn());
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('should throw an error if no refresh token is provided', async () => {
    await expect(fetchAccessTokenUsingRefreshToken(null)).rejects.toThrow(
      'No refresh token available',
    );
  });

  it('should return the access token if the request is successful', async () => {
    const mockAccessToken = 'new-access-token';
    const mockFetch = global.fetch as ReturnType<typeof vi.fn>;
    mockFetch.mockResolvedValue({
      ok: true,
      status: 200,
      json: vi.fn().mockResolvedValue({ accessToken: mockAccessToken }),
    } as unknown as Response);

    const result = await fetchAccessTokenUsingRefreshToken('valid-refresh-token');

    expect(mockFetch).toHaveBeenCalledWith('https://example.com/api/auth/refresh', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refreshToken: 'valid-refresh-token' }),
    });
    expect(result).toBe(mockAccessToken);
  });

  it('should throw an error if the access token is not returned', async () => {
    const mockFetch = global.fetch as ReturnType<typeof vi.fn>;
    mockFetch.mockResolvedValue({
      ok: true,
      status: 200,
      json: vi.fn().mockResolvedValue({}),
    } as unknown as Response);

    await expect(
      fetchAccessTokenUsingRefreshToken('valid-refresh-token'),
    ).rejects.toThrow('Could not generate access token using refresh token');
  });

  it('should throw an error if the fetch call fails', async () => {
    const mockFetch = global.fetch as ReturnType<typeof vi.fn>;
    mockFetch.mockRejectedValue(new Error('Network error'));

    await expect(
      fetchAccessTokenUsingRefreshToken('valid-refresh-token'),
    ).rejects.toThrow('Network error');
  });

  it('should throw an error if the response is not ok', async () => {
    const mockFetch = global.fetch as ReturnType<typeof vi.fn>;
    mockFetch.mockResolvedValue({
      ok: false,
      status: 401,
      json: vi.fn().mockResolvedValue({}),
    } as unknown as Response);

    await expect(
      fetchAccessTokenUsingRefreshToken('valid-refresh-token'),
    ).rejects.toThrow('Could not generate access token using refresh token');
  });
});
