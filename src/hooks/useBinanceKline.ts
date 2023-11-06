import { useCallback, useEffect, useState } from 'react';
import { FETCH_STATUS } from '../consts/FetchStatus';
import { FetchStatus } from '../types/fetchStatus';
import { Interval } from '../types/interval';
import { fetchKlineDataForForMultipleConfigs } from '../utils/fetchKlineDataForForMultipleConfigs';

export type Config = {
  symbol: string;
  interval: Interval;
  limit: number;
};

export type KLineDataItem = {
  openTime: string;
  openPrice: number;
  volume: number;
};

export type Data = Config & {
  klineData: Array<KLineDataItem>;
  avgPrice: number;
};

export const useBinanceKLine = (
  configs: Array<Config>,
  fetchOnMount: boolean = true,
) => {
  const [fetchStatus, setFetchStatus] = useState<FetchStatus>(
    FETCH_STATUS.idle,
  );
  const [data, setData] = useState<Array<Data>>([]);

  const fetchKLineDataForAllConfigs = async (configs: Array<Config>) => {
    setFetchStatus(FETCH_STATUS.fetching);

    try {
      const klineData = await fetchKlineDataForForMultipleConfigs(configs);

      setData(klineData);
      setFetchStatus(FETCH_STATUS.success);
    } catch (error) {
      setFetchStatus(FETCH_STATUS.error);
    }
  };

  const refetch = useCallback(
    (configs: Array<Config>) => fetchKLineDataForAllConfigs(configs),
    [],
  );

  useEffect(
    () => {
      if (fetchOnMount) {
        fetchKLineDataForAllConfigs(configs);
      }
    },
    // just need this to run on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  return { data, fetchStatus, refetch };
};
