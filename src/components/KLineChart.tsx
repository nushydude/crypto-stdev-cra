import { Line } from 'react-chartjs-2';
import { format } from 'date-fns';

type Props = {
  variant?: 'summary' | 'detailed';
  data: Array<{
    openTime: string;
    openPrice: number;
    volume: number;
  }>;
};

export const KLineChart = ({ data, variant = 'detailed' }: Props) => {
  const labels = data.map((d) => format(new Date(d.openTime), 'MMM d kk:mm'));
  const priceSet = data.map((d) => d.openPrice);

  return (
    <Line
      data-testid="kline-chart"
      data={{
        labels,
        datasets: [
          {
            // @ts-expect-error
            id: 1,
            label: 'Price',
            data: priceSet,
          },
        ],
      }}
      options={{
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
        },
        elements: {
          point: {
            radius: variant === 'detailed' ? 4 : 0,
          },
        },
        scales: {
          x: {
            display: variant === 'detailed',
            ticks: {
              display: variant === 'detailed',
            },
            grid: {
              display: variant === 'detailed',
            },
          },
          y: {
            display: variant === 'detailed',
            ticks: {
              display: variant === 'detailed',
              // beginAtZero: true,
            },
            grid: {
              display: variant === 'detailed',
            },
          },
        },
      }}
    />
  );
};
