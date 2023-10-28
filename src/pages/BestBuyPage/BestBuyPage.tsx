import { useLocalStorage } from 'react-use';
import { DCAInfo } from '../../components/DCAInfo';
import { useBinanceKLine } from '../../hooks/useBinanceKline';
import { FETCH_STATUS } from '../../consts/FetchStatus';
import { DEFAULT_SETTINGS } from '../../consts/DefaultSettings';
import { KLineChart } from '../../components/KLineChart';
import { Skeleton } from './Skeleton';
import { Column, DCAInfoContainer, Row } from './BestBuyPage.styles';
import { getKLineConfigs } from './getKLineConfigs';
import { getTransformedKLineDataSortedByDipMemoized } from './getTransformedKLineDataSortedByDip';
import { useMemo } from 'react';

interface Props {
  // Best Buy and Best DCA are separated by a multiplier.
  sdMultiplier?: number;
}

export const BestBuyPage = ({ sdMultiplier = 1 }: Props) => {
  const [settings] = useLocalStorage(
    'settings',
    JSON.stringify(DEFAULT_SETTINGS),
  );

  const klineFetchConfigs = useMemo(
    () => getKLineConfigs(settings),
    [settings],
  );

  const { data, fetchStatus } = useBinanceKLine(klineFetchConfigs);

  if (fetchStatus === FETCH_STATUS.fetching) {
    return <Skeleton rows={5} />;
  }

  const sortedByLargestDip = getTransformedKLineDataSortedByDipMemoized(
    data,
    sdMultiplier,
  );

  // Since we have sorted by dip, the first item is potentially the bestDCA item.
  const bestDCAIndex = sortedByLargestDip[0]?.shouldDCA ? 0 : -1;

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
