import WatchPairsDropdownComponent from '../components/WatchPairsDropdown';
import { useSymbols } from '../hooks/useSymbols';

interface Props {
  watchPairs: string[];
  updateWatchPairs: (newWatchPairs: string[]) => void;
}

const WatchPairsDropdown = ({ watchPairs, updateWatchPairs }: Props) => {
  const { symbols } = useSymbols();

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
