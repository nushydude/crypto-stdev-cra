import React from 'react';
import styled, { keyframes } from 'styled-components';
import { useLocalStorage } from 'react-use';
import { DCAInfo } from '../../components/DCAInfo';
import { useBinanceKLine } from '../../hooks/useBinanceKline';
import { Interval } from '../../types/interval';
import { calculateMean } from '../../utils/calculateMean';
import { calculateStandardDeviation } from '../../utils/calculateStandardDeviation';
import { FETCH_STATUS } from '../../consts/FetchStatus';
import { DEFAULT_SYMBOLS } from '../../consts/DefaultSymbols';
import { DEFAULT_SETTINGS } from '../../consts/DefaultSettings';
import { KLineChart } from '../../components/KLineChart';

const defaultInterval: Interval = '4h';
const defaultLimit = 100;

const Row = styled.div<{ best?: boolean; dca?: boolean }>`
  margin-bottom: 10px;
  background: ${(props) => {
    if (props.dca && props.best) {
      return 'lightgreen';
    } else if (props.dca && !props.best) {
      return '#FFEB9C';
    }

    return 'pink';
  }};
  padding: 10px;
`;

const SkeletonRow = styled(Row)`
  background: #efefef;
`;

const DCAInfoContainer = styled.div`
  display: flex;
  flex-direction: row;

  @media (max-width: 690px) {
    flex-direction: column;
  }
`;

const skeletonLoading = keyframes`
  0% {
    background-color: hsl(200, 20%, 80%);
  }
  100% {
    background-color: hsl(200, 20%, 95%);
  }
`;

const Bar = styled.div`
  height: 18px;
  animation: ${skeletonLoading} 1s linear infinite alternate;
  margin-bottom: 8px;
  width: 50%;
`;

const ThickBar = styled(Bar)`
  height: 37px;
`;

const AspectRatioBox = styled.div<{ aspectRatio: number }>`
  width: 100%;
  padding-top: ${(props) => props.aspectRatio}%;
  animation: ${skeletonLoading} 1s linear infinite alternate;
`;

const Column = styled.div`
  width: 50%;

  @media (max-width: 690px) {
    width: 100%;
  }
`;

interface Props {
  sdMultiplier?: number;
}

const getSymbols = (settings: any) => {
  try {
    const symbols = JSON.parse(settings)?.bestBuySymbols;

    return Array.isArray(symbols) && symbols.length > 0
      ? symbols
      : DEFAULT_SYMBOLS;
  } catch (error) {
    return DEFAULT_SYMBOLS;
  }
};

export const BestBuyPage = ({ sdMultiplier = 1 }: Props) => {
  const [settings] = useLocalStorage(
    'settings',
    JSON.stringify(DEFAULT_SETTINGS),
  );

  const { data, fetchStatus } = useBinanceKLine(
    getSymbols(settings).map((symbol) => ({
      symbol,
      interval: defaultInterval,
      limit: defaultLimit,
    })),
  );

  const sortedByLargestDip = data
    .map(({ symbol, klineData, avgPrice }) => {
      const prices = klineData.map((d) => d.openPrice);
      const standardDeviation = calculateStandardDeviation(prices);
      const mean = calculateMean(prices);
      const targetPrice = mean - sdMultiplier * standardDeviation;
      const shouldDCA = avgPrice < targetPrice;
      const dip = ((avgPrice - targetPrice) / targetPrice) * 100;

      return { symbol, shouldDCA, targetPrice, avgPrice, dip, klineData };
    })
    // sort by highest to lowest (i.e. highest *negative* value first)
    .sort((a, b) => a.dip - b.dip);

  const bestDCAIndex = sortedByLargestDip.findIndex(
    ({ shouldDCA }) => shouldDCA,
  );

  if (fetchStatus === FETCH_STATUS.fetching) {
    return (
      <div>
        {new Array(5).fill(0).map((dataItem, index) => (
          <SkeletonRow key={index}>
            <ThickBar />
            <DCAInfoContainer>
              <Column>
                <Bar />
                <Bar />
                <Bar />
                <Bar />
              </Column>
              <Column>
                <AspectRatioBox aspectRatio={50} />
              </Column>
            </DCAInfoContainer>
          </SkeletonRow>
        ))}
      </div>
    );
  }

  return (
    <div>
      {sortedByLargestDip.map((dataItem, index) => (
        <Row
          key={dataItem.symbol}
          best={bestDCAIndex === index}
          dca={dataItem.shouldDCA}
        >
          <h1>{dataItem.symbol}</h1>
          <DCAInfoContainer>
            <Column>
              <DCAInfo {...dataItem} />
            </Column>
            <Column>
              <KLineChart data={dataItem.klineData} />
            </Column>
          </DCAInfoContainer>
        </Row>
      ))}
    </div>
  );
};
