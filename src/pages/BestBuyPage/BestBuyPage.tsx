import { useLocalStorage } from 'react-use';
import { DCAInfo } from '../../components/DCAInfo';
import { useBinanceKLine } from '../../hooks/useBinanceKline';
import { FETCH_STATUS } from '../../consts/FetchStatus';
import { DEFAULT_SETTINGS } from '../../consts/DefaultSettings';
import { KLineChart } from '../../components/KLineChart';
import { Skeleton } from './Skeleton';
import { getKLineConfigs } from './getKLineConfigs';
import { getTransformedKLineDataSortedByDipMemoized } from './getTransformedKLineDataSortedByDip';
import { useMemo } from 'react';
import { BestBuyItem } from './BestBuyItem';

interface Props {
  // Best Buy and Best DCA are separated by a multiplier.
  sdMultiplier?: number;
}

const BestBuyPage = ({ sdMultiplier = 1 }: Props) => {
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
    return <Skeleton rows={klineFetchConfigs.length} />;
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
        <BestBuyItem
          key={dataItem.symbol}
          best={bestDCAIndex === index}
          dca={dataItem.shouldDCA}
        >
          <h2 className="mb-2 font-bold text-lg">{dataItem.symbol}</h2>
          <div className="flex justify-between flex-col sm:flex-row">
            <div className="sm:w-100 md:w-2/4">
              <DCAInfo {...dataItem} />
            </div>
            <div className="sm:w-100 md:w-2/4">
              <KLineChart data={dataItem.klineData} variant="summary" />
            </div>
          </div>
        </BestBuyItem>
      ))}
    </div>
  );
};

export default BestBuyPage;
