import WatchPairsDropdownComponent from '../components/WatchPairsDropdown';
import { useFetchSymbols } from '../hooks/useFetchSymbols';

interface Props {
  watchPairs: string[];
  updateWatchPairs: (newWatchPairs: string[]) => void;
}

const WatchPairsDropdown = ({ watchPairs, updateWatchPairs }: Props) => {
  const { symbols } = useFetchSymbols();

  const onCheckChanged = (symbol: string, checked: boolean) => {
    const newWatchPairs = checked
      ? [...watchPairs, symbol]
      : watchPairs.filter((s: string) => s !== symbol);
    updateWatchPairs(newWatchPairs);
  };

  return (
    <WatchPairsDropdownComponent
      items={symbols}
      selectedItems={watchPairs}
      onItemCheckChanged={onCheckChanged}
    />
  );
};

export default WatchPairsDropdown;
