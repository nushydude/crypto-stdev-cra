import { DCAInfo } from '../../components/DCAInfo';
import { useBinanceKLine } from '../../hooks/useBinanceKline';
import { FETCH_STATUS } from '../../consts/FetchStatus';
import { KLineChart } from '../../components/KLineChart';
import { Skeleton } from './Skeleton';
import { getKLineConfigs } from './getKLineConfigs';
import { getTransformedKLineDataSortedByDipMemoized } from './getTransformedKLineDataSortedByDip';
import { useMemo } from 'react';
import { BestBuyItem } from './BestBuyItem';
import WatchPairsDropdown from '../../containers/WatchPairsDropdown';
import useDeepCompareEffect from 'use-deep-compare-effect';
import useWatchPairs from '../../hooks/useWatchPairs';

interface Props {
  // Best Buy and Best DCA are separated by a multiplier.
  sdMultiplier?: number;
}

const BestBuyPage = ({ sdMultiplier = 1 }: Props) => {
  const { watchPairs, updateWatchPairs } = useWatchPairs();

  const klineFetchConfigs = useMemo(
    () => getKLineConfigs(watchPairs),
    [watchPairs],
  );

  const { data, fetchStatus, refetch } = useBinanceKLine(klineFetchConfigs);

  useDeepCompareEffect(() => {
    refetch(klineFetchConfigs);
  }, [klineFetchConfigs, refetch]);

  const sortedByLargestDip = getTransformedKLineDataSortedByDipMemoized(
    data,
    sdMultiplier,
  );

  // Since we have sorted by dip, the first item is potentially the bestDCA item.
  const bestDCAIndex = sortedByLargestDip[0]?.shouldDCA ? 0 : -1;

  return (
    <div>
      <WatchPairsDropdown
        watchPairs={watchPairs}
        updateWatchPairs={updateWatchPairs}
      />

      {fetchStatus === FETCH_STATUS.fetching &&
        sortedByLargestDip.length === 0 && (
          <Skeleton rows={klineFetchConfigs.length} />
        )}

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
