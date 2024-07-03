import fetchUserWatchPairs from './fetchUserWatchPairs'; // Adjust the import path as necessary
import * as Sentry from '@sentry/react';
import { z } from 'zod';

jest.mock('../config', () => ({
  appConfig: {
    API_URI: 'https://example.com',
  },
}));

jest.mock('@sentry/react', () => ({
  captureException: jest.fn(),
}));

describe('fetchUserWatchPairs', () => {
  const mockFetch = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should call fetch with correct parameters and return watch pairs', async () => {
    mockFetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(['BTC-USD', 'ETH-USD']),
    });

    const result = await fetchUserWatchPairs(mockFetch);

    expect(mockFetch).toHaveBeenCalledWith(
      'https://example.com/api/watch_pairs',
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    expect(result).toEqual(['BTC-USD', 'ETH-USD']);
  });

  it('should return an empty array and log a validation error to Sentry if response is invalid', async () => {
    mockFetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue({ invalid: 'response' }), // Invalid response
    });

    const result = await fetchUserWatchPairs(mockFetch);

    expect(Sentry.captureException).toHaveBeenCalled();
    expect(result).toEqual([]);
  });

  it('should return an empty array and log a fetch error to Sentry if fetch fails', async () => {
    mockFetch.mockRejectedValue(new Error('Network error'));

    const result = await fetchUserWatchPairs(mockFetch);

    expect(Sentry.captureException).toHaveBeenCalledWith(
      new Error('Network error'),
    );
    expect(result).toEqual([]);
  });

  it('should return an empty array if the response is empty', async () => {
    mockFetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue([]),
    });

    const result = await fetchUserWatchPairs(mockFetch);

    expect(mockFetch).toHaveBeenCalledWith(
      'https://example.com/api/watch_pairs',
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    expect(result).toEqual([]);
  });
});
