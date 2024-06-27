import { z } from 'zod';
import setUserWatchPairs from './setUserWatchPairs';

jest.mock('../config', () => ({
  config: {
    API_URI: 'https://example.com',
  },
}));

describe('setUserWatchPairs', () => {
  const mockFetch = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should validate input and call fetch with correct parameters', async () => {
    mockFetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue({
        watchPairs: ['BTC-USD', 'ETH-USD'],
      }),
    });

    const watchPairs = ['BTC-USD', 'ETH-USD'];
    const result = await setUserWatchPairs(mockFetch, watchPairs);

    expect(mockFetch).toHaveBeenCalledWith(
      'https://example.com/api/watch_pairs',
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ watchPairs }),
      }
    );
    expect(result).toEqual(['BTC-USD', 'ETH-USD']);
  });

  it('should throw an error if input is invalid', async () => {
    const watchPairs = [123, 'ETH-USD']; // Invalid input

    await expect(setUserWatchPairs(mockFetch, watchPairs as any)).rejects.toThrow(z.ZodError);
  });

  it('should throw an error if response is invalid', async () => {
    mockFetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue({
        watchPairs: 'invalid-response',
      }),
    });

    const watchPairs = ['BTC-USD', 'ETH-USD'];

    await expect(setUserWatchPairs(mockFetch, watchPairs)).rejects.toThrow(z.ZodError);
  });

  it('should throw an error if fetch fails', async () => {
    mockFetch.mockRejectedValue(new Error('Network error'));

    const watchPairs = ['BTC-USD', 'ETH-USD'];

    await expect(setUserWatchPairs(mockFetch, watchPairs)).rejects.toThrow('Network error');
  });
});
