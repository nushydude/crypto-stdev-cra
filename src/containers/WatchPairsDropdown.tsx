import { useContext } from 'react';
import WatchPairsDropdownComponent from '../components/WatchPairsDropdown';
import { useSymbols } from '../hooks/useSymbols';
import { AppSettingsContext } from '../context/appSettings';

const WatchPairsDropdown = () => {
  const { symbols } = useSymbols();
  const { settings, updateSettings } = useContext(AppSettingsContext);

  const onCheckChanged = (symbol: string, checked: boolean) => {
    const newSettings = {
      ...settings,
      bestBuySymbols: checked
        ? [...settings.bestBuySymbols, symbol]
        : settings.bestBuySymbols.filter((s: string) => s !== symbol),
    };

    updateSettings(newSettings);
  };

  return (
    <WatchPairsDropdownComponent
      items={symbols}
      selectedItems={settings.bestBuySymbols}
      onItemCheckChanged={onCheckChanged}
    />
  );
};

export default WatchPairsDropdown;
