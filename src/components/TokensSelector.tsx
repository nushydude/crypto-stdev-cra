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
      />
      <datalist id="symbols">
        {symbols.map((symbol, index) => (
          <option key={index} value={symbol} />
        ))}
      </datalist>
    </>
  );
};
