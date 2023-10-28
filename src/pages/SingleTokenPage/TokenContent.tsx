import BeatLoader from 'react-spinners/BeatLoader';
import { FETCH_STATUS } from '../../consts/FetchStatus';
import { FetchStatus } from '../../types/fetchStatus';
import { DCAInfoWithChart } from './DCAInfoWithChart';
import { LoadingWrapper } from './TokenContent.styles';

type Props = {
  status: FetchStatus;
  klineData: Array<{
    openTime: string;
    openPrice: number;
    volume: number;
  }>;
  targetPrice: number;
  avgPrice: number;
  shouldDCA: boolean;
};

export const TokenContent = ({
  status,
  klineData,
  targetPrice,
  avgPrice,
  shouldDCA,
}: Props) => {
  switch (status) {
    case FETCH_STATUS.success:
      return (
        <DCAInfoWithChart
          targetPrice={targetPrice}
          avgPrice={avgPrice}
          shouldDCA={shouldDCA}
          klineData={klineData}
        />
      );
    case FETCH_STATUS.fetching:
      return (
        <LoadingWrapper data-testid="loading-animation">
          <BeatLoader />
        </LoadingWrapper>
      );
    case FETCH_STATUS.idle:
      return <p>Click submit to fetch latest kline data.</p>;
    case FETCH_STATUS.error:
      return <p>An error occurred while fetching kline data.</p>;
    default:
      return null;
  }
};
