import { fetchSymbols } from './fetchSymbols';
import { config } from '../config';
import { DEFAULT_SYMBOLS } from '../consts/DefaultSymbols';

describe('fetchSymbols', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should return symbols when the fetch is successful', async () => {
    const mockSymbols = ['BTC', 'ETH', 'ADA'];
    // @ts-expect-error - we aren't mocking the whole fetch API
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: () => Promise.resolve({ symbols: mockSymbols }),
    });

    const result = await fetchSymbols();

    // should call the correct endpoint
    expect(global.fetch).toHaveBeenCalledWith(`${config.API_URI}/api/symbols`);

    // should equal the mock symbols
    expect(result).toEqual(mockSymbols);
  });

  it('should return default symbols when the fetch fails', async () => {
    const mockError = new Error('Network error');
    jest.spyOn(global, 'fetch').mockRejectedValue(mockError);

    const result = await fetchSymbols();

    // should call the correct endpoint
    expect(global.fetch).toHaveBeenCalledWith(`${config.API_URI}/api/symbols`);

    // should equal the default symbols
    expect(result).toEqual(DEFAULT_SYMBOLS);
  });
});
