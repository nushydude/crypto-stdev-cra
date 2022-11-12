import React from "react";
import { Line } from "react-chartjs-2";
import { format } from "date-fns";

type Props = {
  data: Array<{
    openTime: string;
    openPrice: number;
    volume: number;
  }>;
  mean: number;
};

export const KLineChart: React.FC<Props> = ({ data }) => {
  const labels = data.map((d) => format(new Date(d.openTime), "MMM d kk:mm"));
  const priceSet = data.map((d) => d.openPrice);
  // const volumeSet = data.map((d) => d.volume);

  return (
    <Line
      data-testid="kline-chart"
      data={{
        labels,
        datasets: [
          {
            // @ts-expect-error
            id: 1,
            label: "Price",
            data: priceSet,
          },
          // {
          //   // @ts-expect-error
          //   id: 2,
          //   label: "Volume",
          //   data: volumeSet,
          // },
        ],
      }}
    />
  );
};
