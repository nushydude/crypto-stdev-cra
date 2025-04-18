import { describe, it, expect, beforeEach, vi } from 'vitest';
import { fetchSymbols } from './fetchSymbols';
import { appConfig } from '../config';
import { DEFAULT_SYMBOLS } from '../consts/DefaultSymbols';

describe('fetchSymbols', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('should return symbols when the fetch is successful', async () => {
    const mockSymbols = ['BTC', 'ETH', 'ADA'];
    vi.spyOn(global, 'fetch').mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ symbols: mockSymbols }),
    } as Response);

    const result = await fetchSymbols();

    expect(global.fetch).toHaveBeenCalledWith(
      `${appConfig.API_URI}/api/symbols`,
    );
    expect(result).toEqual(mockSymbols);
  });

  it('should return default symbols when the fetch fails', async () => {
    const mockError = new Error('Network error');
    vi.spyOn(global, 'fetch').mockRejectedValue(mockError);

    const result = await fetchSymbols();

    expect(global.fetch).toHaveBeenCalledWith(
      `${appConfig.API_URI}/api/symbols`,
    );
    expect(result).toEqual(DEFAULT_SYMBOLS);
  });

});
