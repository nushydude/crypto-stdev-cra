import { useEffect, useState } from 'react';
import { DEFAULT_SYMBOLS } from '../consts/DefaultSymbols';
import { fetchSymbols } from '../utils/fetchSymbols';

export const useSymbols = () => {
  const [symbols, setSymbols] = useState<Array<string>>(DEFAULT_SYMBOLS);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(
    () => {
      fetchSymbols()
        .then(setSymbols)
        .finally(() => setIsLoading(false));
    },
    // just need this to run on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  return { isLoading, symbols };
};
