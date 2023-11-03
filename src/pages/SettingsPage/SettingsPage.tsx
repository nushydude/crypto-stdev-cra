import { useState } from 'react';
import CurrentSettings from './CurrentSettings';
import SettingsJsonUri from './SettingJsonUri';

const Settingspage = () => {
  // This is a hack.
  // Whenever the settings are updated, SettingsJsonUri calls onUpdate prop.
  // which increments value. Setting it on key of CurrentSettings make it
  // to remount, making it reload the settings.
  const [value, forceRefreshCurrentSettings] = useState<number>(0);

  const incrementKeyValueToForceUpdate = () => {
    forceRefreshCurrentSettings((oldValue) => oldValue + 1);
  };

  return (
    <>
      <div className="mb-2 py-4 border-solid border-b-2 border-gray-300">
        <SettingsJsonUri onUpdate={incrementKeyValueToForceUpdate} />
      </div>
      <div className="mb-2 py-4">
        <CurrentSettings key={value} />
      </div>
    </>
  );
};

export default Settingspage;
