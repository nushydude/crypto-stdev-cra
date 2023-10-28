import React, { ChangeEventHandler } from 'react';
import { useSymbols } from '../hooks/useSymbols';

type Props = {
  selectedValue: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
};

export const TokensSelector = ({ selectedValue, onChange }: Props) => {
  const { symbols } = useSymbols();

  return (
    <>
      <input
        data-testid="input-symbol"
        id="symbol"
        list="symbols"
        value={selectedValue}
        onChange={onChange}
        required
        className="w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
      />
      <datalist id="symbols">
        {symbols.map((symbol, index) => (
          <option
            key={index}
            value={symbol}
            className="w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        ))}
      </datalist>
    </>
  );
};
