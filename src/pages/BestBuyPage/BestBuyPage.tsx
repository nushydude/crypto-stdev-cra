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
import { Skeleton } from './Skeleton';
import { Column, DCAInfoContainer, Row } from './BestBuyPage.styles';

const defaultInterval: Interval = '4h';
const defaultLimit = 100;

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
      const shouldDCA: boolean = avgPrice < targetPrice;
      const dip = ((avgPrice - targetPrice) / targetPrice) * 100;

      return { symbol, shouldDCA, targetPrice, avgPrice, dip, klineData };
    })
    // sort by highest to lowest (i.e. highest *negative* value first)
    .sort((a, b) => a.dip - b.dip);

  const bestDCAIndex = sortedByLargestDip.findIndex(
    ({ shouldDCA }) => shouldDCA,
  );

  if (fetchStatus === FETCH_STATUS.fetching) {
    return <Skeleton rows={5} />;
  }

  return (
    <div>
      {sortedByLargestDip.map((dataItem, index) => (
        <Row
          key={dataItem.symbol}
          best={bestDCAIndex === index}
          dca={dataItem.shouldDCA}
        >
          <h2>{dataItem.symbol}</h2>
          <DCAInfoContainer>
            <Column>
              <DCAInfo {...dataItem} />
            </Column>
            <Column>
              <KLineChart data={dataItem.klineData} variant="summary" />
            </Column>
          </DCAInfoContainer>
        </Row>
      ))}
    </div>
  );
};
