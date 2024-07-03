import React, { ChangeEvent } from 'react';
import { useFetchSymbols } from '../hooks/useFetchSymbols';

type Props = {
  selectedValue: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

export const TokensSelector = ({ selectedValue, onChange }: Props) => {
  const { symbols } = useFetchSymbols();

  return (
    <>
      <label htmlFor="symbol" className="sr-only">
        Symbol
      </label>
      <input
        data-testid="input-symbol"
        id="symbol"
        list="symbols"
        value={selectedValue}
        onChange={onChange}
        required
        className="w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
      />
      <datalist id="symbols">
        {symbols.map((symbol, index) => (
          <option key={index} value={symbol} />
        ))}
      </datalist>
    </>
  );
};
