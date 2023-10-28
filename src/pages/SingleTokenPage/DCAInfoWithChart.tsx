import { DCAInfo } from '../../components/DCAInfo';
import { KLineChart } from '../../components/KLineChart';
import { Wrapper } from './DCAInfoWithChart.styles';

type Props = {
  targetPrice: number;
  avgPrice: number;
  shouldDCA: boolean;
  klineData: Array<{
    openTime: string;
    openPrice: number;
    volume: number;
  }>;
};

export const DCAInfoWithChart = ({
  targetPrice,
  avgPrice,
  shouldDCA,
  klineData,
}: Props) => {
  return (
    <Wrapper>
      <DCAInfo
        targetPrice={targetPrice}
        avgPrice={avgPrice}
        shouldDCA={shouldDCA}
      />
      <KLineChart data={klineData} />
    </Wrapper>
  );
};
