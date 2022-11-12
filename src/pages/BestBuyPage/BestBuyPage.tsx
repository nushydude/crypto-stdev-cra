import React from "react";
import styled from "styled-components";
import { useLocalStorage } from "react-use";
import BeatLoader from "react-spinners/BeatLoader";
import { DCAInfo } from "../../components/DCAInfo";
import { useBinanceKLine } from "../../hooks/useBinanceKline";
import { Interval } from "../../types/interval";
import { calculateMean } from "../../utils/calculateMean";
import { calculateStandardDeviation } from "../../utils/calculateStandardDeviation";
import { FETCH_STATUS } from "../../consts/FetchStatus";
import { DEFAULT_SYMBOLS } from "../../consts/DefaultSymbols";
import { DEFAULT_SETTINGS } from "../../consts/DefaultSettings";

const defaultInterval: Interval = "4h";
const defaultLimit = 100;

const Row = styled.div<{ best: boolean; dca: boolean }>`
  margin-bottom: 10px;
  background: ${(props) => {
    if (props.dca && props.best) {
      return "lightgreen";
    } else if (props.dca && !props.best) {
      return "#FFEB9C";
    }

    return "pink";
  }};
  padding: 10px;
`;

const LoadingWrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
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

export const BestBuyPage: React.FC<Props> = ({ sdMultiplier = 1 }) => {
  const [settings] = useLocalStorage(
    "settings",
    JSON.stringify(DEFAULT_SETTINGS)
  );

  const { data, fetchStatus } = useBinanceKLine(
    getSymbols(settings).map((symbol) => ({
      symbol,
      interval: defaultInterval,
      limit: defaultLimit,
    }))
  );

  const sortedByLargestDip = data
    .map(({ symbol, klineData, avgPrice }) => {
      const prices = klineData.map((d) => d.openPrice);
      const standardDeviation = calculateStandardDeviation(prices);
      const mean = calculateMean(prices);
      const targetPrice = mean - sdMultiplier * standardDeviation;
      const shouldDCA = avgPrice < targetPrice;
      const dip = ((avgPrice - targetPrice) / targetPrice) * 100;

      return { symbol, shouldDCA, targetPrice, avgPrice, dip };
    })
    // sort by highest to lowest (i.e. highest *negative* value first)
    .sort((a, b) => a.dip - b.dip);

  const bestDCAIndex = sortedByLargestDip.findIndex(
    ({ shouldDCA }) => shouldDCA
  );

  if (fetchStatus === FETCH_STATUS.fetching) {
    return (
      <LoadingWrapper>
        <BeatLoader />
      </LoadingWrapper>
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
          <DCAInfo {...dataItem} />
        </Row>
      ))}
    </div>
  );
};
