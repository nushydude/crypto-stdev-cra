import { useEffect, useState } from 'react';
import * as z from 'zod';
import { Line } from 'react-chartjs-2';
import { format } from 'date-fns';

const FearAndGreedIndexPage = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<
    Array<{
      value: number;
      value_classification: string;
      timestamp: number;
      time_until_update?: number;
    }>
  >([]);

  useEffect(() => {
    fetch('https://api.alternative.me/fng/?limit=30')
      .then((response) => response.json())
      .then((payload) => {
        // Schema with preprocessing for type conversion
        const schema = z.object({
          name: z.string(),
          data: z.array(
            z.object({
              value: z.preprocess(
                (val) => parseFloat(val as string),
                z.number(),
              ),
              value_classification: z.string(),
              timestamp: z.preprocess(
                (val) => parseInt(val as string),
                z.number(),
              ),
              time_until_update: z.preprocess(
                (val) => (val ? parseInt(val as string) : undefined),
                z.number().optional(),
              ),
            }),
          ),
        });

        const parsedPayload = schema.parse(payload);

        const reversed = parsedPayload.data.slice().reverse();

        setData(reversed);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Failed to fetch data:', error);
        setError(error.message);
        setLoading(false);
      });
  }, []);

  let content = null;

  if (error) {
    content = <div>Error: {error}</div>;
  }

  if (loading) {
    content = <div>Loading...</div>;
  }

  if (!loading && !error) {
    content = (
      <div>
        <Line
          data={{
            labels: data.map((d) =>
              format(new Date(d.timestamp * 1000), 'MMM d'),
            ),
            datasets: [
              {
                label: 'Fear and Greed Index',
                data: data.map((d) => d.value),
                borderColor: 'rgba(75, 192, 192, 1)',
                fill: false,
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
            scales: {
              x: {
                display: true,
                ticks: {
                  display: true,
                },
                grid: {
                  display: true,
                },
              },
              y: {
                display: true,
                ticks: {
                  display: true,
                },
                grid: {
                  display: true,
                },
                min: 0, // Set the minimum y value
                max: 100, // Set the maximum y value
              },
            },
          }}
        />
      </div>
    );
  }


  return (
    <div>
      <img
        src="https://alternative.me/crypto/fear-and-greed-index.png"
        alt="Fear and Greed Index"
      />
      {/* <FearAndGreedGauge value={latest.value} /> */}

      {content}
    </div>
  );
};

export default FearAndGreedIndexPage;
