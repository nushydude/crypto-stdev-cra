import { getDefaultTokenOptions } from './getDefaultTokenOptions';

describe('getDefaultTokenOptions', () => {
  it('should return default values when no query params are provided', () => {
    const result = getDefaultTokenOptions({});

    expect(result).toEqual({
      symbol: 'BTCUSDT',
      interval: '4h',
      limit: 100,
    });
  });

  it('should return values from query params when provided', () => {
    const result = getDefaultTokenOptions({
      symbol: 'ETHUSDT',
      interval: '1h',
      limit: '50',
    });

    expect(result).toEqual({
      symbol: 'ETHUSDT',
      interval: '1h',
      limit: 50,
    });
  });

  it('should use default symbol when query values does not include it', () => {
    const result = getDefaultTokenOptions({
      interval: '1h',
      limit: '50',
    });

    expect(result).toEqual({
      symbol: 'BTCUSDT',
      interval: '1h',
      limit: 50,
    });
  });

  it('should use default interval when query values does not include it', () => {
    const result = getDefaultTokenOptions({
      symbol: 'ETHUSDT',
      limit: '50',
    });

    expect(result).toEqual({
      symbol: 'ETHUSDT',
      interval: '4h',
      limit: 50,
    });
  });

  it('should use default limit when query values does not include it', () => {
    const result = getDefaultTokenOptions({
      symbol: 'ETHUSDT',
      interval: '4h',
    });

    expect(result).toEqual({
      symbol: 'ETHUSDT',
      interval: '4h',
      limit: 100,
    });
  });
});
