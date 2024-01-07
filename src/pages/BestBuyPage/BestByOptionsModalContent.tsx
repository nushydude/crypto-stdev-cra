import { useState } from 'react';
import { Interval } from '../../types/interval';

type Props = {
  setOptions: (options: {
    interval: Interval;
    limit: number;
    showCharts: boolean;
  }) => void;
  options: { interval: Interval; limit: number; showCharts: boolean };
};

const BestByOptionsModalContent = ({ setOptions, options }: Props) => {
  const [interval, setInterval] = useState<Interval>(options.interval);
  const [limit, setLimit] = useState<number>(options.limit);
  const [showCharts, setShowCharts] = useState<boolean>(options.showCharts);

  return (
    <div className="w-100">
      <div className="mb-2 md:mb-4">
        <label htmlFor="interval" className="mb-1 block">
          Override Interval (default 4h)
        </label>
        <div className="relative">
          <select
            data-testid="input-interval"
            className="appearance-none w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            value={interval}
            onChange={(e) => setInterval(e.target.value as Interval)}
          >
            <option value="15m">15 minutes</option>
            <option value="1h">1 hour</option>
            <option value="4h">4 hours</option>
            <option value="1d">1 day</option>
            <option value="1w">1 week</option>
            <option value="1m">1 month</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-blue-500">
            ▼
          </div>
        </div>
      </div>

      <div className="mb-2 md:mb-4">
        <label htmlFor="limit" className="mb-1 block">
          Override Number of Price Points (default 100)
        </label>
        <input
          data-testid="input-limit"
          id="limit"
          type="number"
          className="w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          onChange={(e) => {
            const nextLimit = parseInt(e.target.value);
            if (Number.isNaN(nextLimit)) {
              setLimit(1);
            } else {
              setLimit(nextLimit);
            }
          }}
          value={limit}
        />
      </div>

      <div className="mb-2 md:mb-4">
        <label htmlFor="limit" className="mb-1 block">
          Display the mini charts
        </label>
        <input
          data-testid="input-toggle-mini-charts-visibility"
          id="input-toggle-mini-charts-visibility"
          type="checkbox"
          className="w-full px-3 py-2 bg-white rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          onChange={(e) => setShowCharts(e.target.checked)}
          checked={showCharts}
        />
        {/* {errors.limit && (
            <p className="text-red-400 text-sm">This field is required</p>
          )} */}
      </div>

      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-md"
        onClick={() => {
          setOptions({ interval, limit, showCharts });
        }}
      >
        Apply
      </button>
    </div>
  );
};

export default BestByOptionsModalContent;
