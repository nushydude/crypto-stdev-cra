import { DEFAULT_SYMBOLS } from '../consts/DefaultSymbols';
import { fetchSymbols } from '../utils/fetchSymbols';
import { useQuery } from '@tanstack/react-query';

export const useFetchSymbols = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['symbols'],
    queryFn: fetchSymbols,
    staleTime: 1000 * 60 * 60,
  });

  const symbols = (data || DEFAULT_SYMBOLS).sort((a, b) => a.localeCompare(b));

  return { isLoading, symbols };
};
