import { fetchKLineData } from './fetchKLineData';
import { appConfig } from '../config';

describe('fetchKLineData', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should return klineData and avgPrice when the fetch is successful', async () => {
    const mockData = { klineData: [], avgPrice: 0 };

    // @ts-expect-error - we aren't mocking the whole fetch API
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: () => Promise.resolve(mockData),
    });

    const symbol = 'BTCUSDT';
    const interval = '1h';
    const limit = 100;

    const result = await fetchKLineData(symbol, interval, limit);

    // should call the correct endpoint
    expect(global.fetch).toHaveBeenCalledWith(
      `${
        appConfig.API_URI
      }/api/binance_kline?symbol=${symbol.trim()}&interval=${interval}&limit=${limit}`,
    );

    // should equal the mock symbols
    expect(result).toEqual(mockData);
  });
});
