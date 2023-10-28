import React from 'react';
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

export const KLineChart: React.FC<Props> = ({ data, variant = 'detailed' }) => {
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
        maintainAspectRatio: variant === 'detailed',
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
            ticks: {
              display: variant === 'detailed',
            },
            grid: {
              drawBorder: false,
              display: variant === 'detailed',
            },
          },
          y: {
            ticks: {
              display: variant === 'detailed',
              // beginAtZero: true,
            },
            grid: {
              drawBorder: false,
              display: variant === 'detailed',
            },
          },
        },
      }}
    />
  );
};
