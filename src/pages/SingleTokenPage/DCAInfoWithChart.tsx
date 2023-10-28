import { DCAInfo } from '../../components/DCAInfo';
import { KLineChart } from '../../components/KLineChart';

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
    <div className="w-full">
      <DCAInfo
        targetPrice={targetPrice}
        avgPrice={avgPrice}
        shouldDCA={shouldDCA}
      />
      <div className="h-80">
        <KLineChart data={klineData} variant="detailed" />
      </div>
    </div>
  );
};
