import { fetchKlineDataForForMultipleConfigs } from './fetchKlineDataForForMultipleConfigs';
import { fetchKLineData } from './fetchKLineData';
import { Interval } from '../types/interval';

// Mocking the fetchKLineData function
jest.mock('./fetchKLineData');

describe('fetchKlineDataForForMultipleConfigs', () => {
  // Reset the mocks before each test
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch Kline data for multiple configurations', async () => {
    const mockConfigs = [
      { symbol: 'BTCUSDT', interval: '1h' as Interval, limit: 100 },
      { symbol: 'ETHUSDT', interval: '1d' as Interval, limit: 50 },
    ];

    // Setting up the mocked responses for the fetchKLineData function
    (fetchKLineData as jest.Mock)
      .mockResolvedValueOnce({
        klineData: 'someDataForBTC',
        avgPrice: { price: '50000' },
      })
      .mockResolvedValueOnce({
        klineData: 'someDataForETH',
        avgPrice: { price: '2000' },
      });

    const result = await fetchKlineDataForForMultipleConfigs(mockConfigs);

    expect(result).toEqual([
      {
        symbol: 'BTCUSDT',
        interval: '1h',
        limit: 100,
        klineData: 'someDataForBTC',
        avgPrice: 50000,
      },
      {
        symbol: 'ETHUSDT',
        interval: '1d',
        limit: 50,
        klineData: 'someDataForETH',
        avgPrice: 2000,
      },
    ]);

    // Ensure fetchKLineData was called with the correct parameters
    expect(fetchKLineData).toHaveBeenCalledWith('BTCUSDT', '1h', 100);
    expect(fetchKLineData).toHaveBeenCalledWith('ETHUSDT', '1d', 50);
  });

  it('should handle exceptions gracefully', async () => {
    const mockConfigs = [
      { symbol: 'BTCUSDT', interval: '1h' as Interval, limit: 100 },
    ];

    // Setting up the mocked rejection for the fetchKLineData function
    (fetchKLineData as jest.Mock).mockRejectedValue(
      new Error('Failed fetching data'),
    );

    // Use an asynchronous assertion to check for the rejection
    await expect(
      fetchKlineDataForForMultipleConfigs(mockConfigs),
    ).rejects.toThrow('Failed fetching data');
  });
});
