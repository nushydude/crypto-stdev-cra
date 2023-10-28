import getDisplayData from './getDisplayData';

describe('getDisplayData', () => {
  it('should correctly calculate display data', () => {
    const inputData = [
      {
        klineData: [
          { openTime: '2021-01-01', openPrice: 90, volume: 10 },
          { openTime: '2021-01-02', openPrice: 110, volume: 15 },
        ],
        avgPrice: 95,
      },
    ];
    const result = getDisplayData(inputData);
    expect(result).toEqual({
      klineData: inputData[0].klineData,
      avgPrice: 95,
      shouldDCA: false,
      targetPrice: 90,
    });
  });

  it('should handle empty inputData', () => {
    const result = getDisplayData([]);
    expect(result).toEqual({
      klineData: [],
      avgPrice: 0,
      shouldDCA: false,
      targetPrice: NaN,
    });
  });

  //   it('should memoize results', () => {
  //     const inputData = [
  //       {
  //         klineData: [
  //           { openTime: '2021-01-01', openPrice: 90, volume: 10 },
  //           { openTime: '2021-01-02', openPrice: 110, volume: 15 },
  //         ],
  //         avgPrice: 95,
  //       },
  //     ];

  //     getDisplayData(inputData); // First call
  //     getDisplayData(inputData); // Second call with same data

  //     // The mock functions should only be called once because the result is memoized
  //     expect(calculateMeanSpy).toHaveBeenCalledTimes(1);
  //     expect(calculateStandardDeviationSpy).toHaveBeenCalledTimes(1);
  //   });
});
