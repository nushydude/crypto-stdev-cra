import React from 'react';

type Props = {
  selectedPairs: string[];
  onPairClick: (pair: string) => void;
  removePair: (pair: string) => void;
};

// Show a pill shaped button for each selected pair with a gap of 4px between each pair,
// and a close button to remove the pair.
const HistoricalSelectedPairs = ({
  selectedPairs,
  onPairClick,
  removePair,
}: Props) => {
  return (
    <div className="grid grid-cols-3 md:grid-cols-2 gap-4">
      {selectedPairs.map((pair) => (
        <div
          key={pair}
          className="bg-gray-200 rounded-full px-4 py-1 text-xs cursor-pointer flex justify-between items-center"
          onClick={() => onPairClick(pair)}
        >
          <span className="flex-grow text-left">{pair}</span>
          <button
            onClick={(event) => {
              event.stopPropagation(); // Prevent onPairClick from being triggered
              removePair(pair);
            }}
            className="text-gray-600 hover:text-red-500"
            aria-label={`Remove ${pair}`}
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  );
};

export default HistoricalSelectedPairs;
