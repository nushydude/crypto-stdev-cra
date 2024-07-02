import { MdSettings, MdInfo, MdClose } from 'react-icons/md';
import { useDeepCompareEffect } from 'react-use';
import { DCAInfo } from '../../components/DCAInfo';
import { useBinanceKLine } from '../../hooks/useBinanceKline';
import { FETCH_STATUS } from '../../consts/FetchStatus';
import { KLineChart } from '../../components/KLineChart';
import { Skeleton } from './Skeleton';
import { getKLineConfigs } from './getKLineConfigs';
import { getTransformedKLineDataSortedByDipMemoized } from './getTransformedKLineDataSortedByDip';
import { useEffect, useMemo, useState } from 'react';
import { BestBuyItem } from './BestBuyItem';
import WatchPairsDropdown from '../../containers/WatchPairsDropdown';
import useWatchPairs from '../../hooks/useWatchPairs';
import { Interval } from '../../types/interval';
import Modal from '../../components/Modal';
import BestByOptionsModalContent from './BestByOptionsModalContent';

const LOCAL_STORAGE_KEY = 'BEST_BUY_PAGE-OPTIONS';

interface Props {
  // Best Buy and Best DCA are separated by a multiplier.
  sdMultiplier?: number;
}

const BestBuyPage = ({ sdMultiplier = 1 }: Props) => {
  const { watchPairs, updateWatchPairs } = useWatchPairs();
  const [showOptionsModal, setShowOptionsModal] = useState<boolean>(false);
  const [options, setOptions] = useState<{
    interval: Interval;
    limit: number;
    showCharts: boolean;
  }>(() => {
    const options = localStorage.getItem(LOCAL_STORAGE_KEY);
    return options
      ? JSON.parse(options)
      : {
          interval: '4h',
          limit: 100,
          showCharts: true,
        };
  });
  const [showInfoPanel, setShowInfoPanel] = useState<boolean>(false);

  const updateOptionsAndCloseModal = (options: {
    interval: Interval;
    limit: number;
    showCharts: boolean;
  }) => {
    setOptions(options);
    setShowOptionsModal(false);
  };

  // Persist the options to the LocalStorage.
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(options));
  }, [options]);

  const klineFetchConfigs = useMemo(
    () =>
      getKLineConfigs(watchPairs, {
        interval: options.interval,
        limit: options.limit,
      }),
    [watchPairs, options.interval, options.limit],
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
    <>
      <div>
        <div className="flex sm:block sm:mt-2 mb-2 relative">
          <div className="mb-2 sm:mb-0 grow">
            <WatchPairsDropdown
              watchPairs={watchPairs}
              updateWatchPairs={updateWatchPairs}
            />
          </div>
          <div className="flex sm:absolute ml-2 relative right-0 top-0 ">
            <MdInfo
              size={40}
              className="cursor-pointer text-gray-500 hover:text-gray-700"
              onClick={() => setShowInfoPanel((v) => !v)}
            />

            <MdSettings
              className="ml-2 cursor-pointer text-gray-500 hover:text-gray-700"
              size={40}
              onClick={() => setShowOptionsModal(true)}
            />
          </div>
        </div>

        {/* Info panel */}
        <div className="mb-4 bg-blue-100 border border-blue-200 rounded-md relative">
          <div className="container mx-auto px-4 py-2">
            <p className="font-bold">Current Parameters</p>
            <p>
              interval: {options.interval}, number of price points:
              {options.limit}
            </p>
          </div>
        </div>

        {showInfoPanel && (
          <div className="mb-4 bg-blue-100 border border-blue-200 rounded-md relative">
            <MdClose
              className="absolute right-2 top-2 cursor-pointer"
              onClick={() => setShowInfoPanel(false)}
            />

            <div className="container mx-auto px-4 py-2">
              <p>
                Our Dollar Cost Averaging (DCA) recommendation algorithm works
                by analyzing the price fluctuations of a cryptocurrency over a
                given period.
              </p>

              <p className="mt-2">
                First, it calculates the average opening price (mean) and the
                standard deviation, a measure of price volatility. We then
                establish a target price, which is set below the average price,
                adjusted by{' '}
                {sdMultiplier === 1 ? 'a factor' : `${sdMultiplier} factors`} of
                standard deviation to account for volatility. If the current
                average price is less than this target price, it indicates that
                the currency is trading at a 'dip,' and it might be a good
                opportunity to invest using DCA.
              </p>

              <p className="mt-2">
                The system prioritizes opportunities based on the size of the
                dip, with the biggest dips listed first, to help you make the
                most informed investment decisions.
              </p>
            </div>
          </div>
        )}

        {fetchStatus === FETCH_STATUS.fetching &&
          sortedByLargestDip.length === 0 && (
            <Skeleton
              rows={klineFetchConfigs.length}
              showChartSection={options.showCharts}
            />
          )}

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {sortedByLargestDip.map((dataItem, index) => (
            <BestBuyItem
              key={dataItem.symbol}
              best={bestDCAIndex === index}
              dca={dataItem.shouldDCA}
            >
              <h2 className="mb-2 font-bold text-lg">{dataItem.symbol}</h2>
              <div className="flex justify-between flex-col">
                <DCAInfo {...dataItem} />
                {options.showCharts && (
                  <div className="sm:w-100">
                    <KLineChart data={dataItem.klineData} variant="summary" />
                  </div>
                )}
              </div>
            </BestBuyItem>
          ))}
        </div>
      </div>

      {showOptionsModal && (
        <Modal onClose={() => setShowOptionsModal(false)}>
          <BestByOptionsModalContent
            setOptions={updateOptionsAndCloseModal}
            options={options}
          />
        </Modal>
      )}
    </>
  );
};

export default BestBuyPage;
