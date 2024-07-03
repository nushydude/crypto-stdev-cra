import { ChangeEvent } from 'react';
import { useFetchSymbols } from '../hooks/useFetchSymbols';
import SearchableDropdown from './SearchableDropdown';

type Props = {
  selectedValue: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  noResultsFoundText: string;
};

const TokensSelector = ({
  selectedValue,
  onChange,
  noResultsFoundText,
}: Props) => {
  const { symbols } = useFetchSymbols();

  return (
    <SearchableDropdown
      values={symbols}
      selectedValue={selectedValue}
      onChange={onChange}
      noResultsFoundText={noResultsFoundText}
    />
  );
};

export default TokensSelector;
