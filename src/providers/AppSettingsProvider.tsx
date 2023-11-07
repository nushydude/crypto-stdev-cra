import React, { useCallback, useState } from 'react';
import { AppSettingsContext, AppSettings } from '../context/appSettings';
import { FeatureEnum } from '../types/features';
import { getCookieValue } from '../utils/getCookieValue';
import { useLocalStorage } from 'react-use';
import { DEFAULT_SETTINGS } from '../consts/DefaultSettings';
import { deepMergeSerializableObjects } from '../utils/deepMergeSerializableObjects';

const DEFAULT_APP_SETTINGS = {
  ...DEFAULT_SETTINGS,
  features: {
    [FeatureEnum.BOTTOM_MOUNTED_NAV_ON_MOBILE]: false,
  },
};

type Props = {
  children: React.ReactNode;
};

function hydrateInitialStateWithFeaturesFromCookies(
  initialSettings: AppSettings,
) {
  const nextSettings = { ...initialSettings };

  for (const feature in nextSettings.features) {
    const cookieValue = getCookieValue(`FT_${feature}`);

    if (cookieValue !== null) {
      nextSettings.features[feature as FeatureEnum] = cookieValue === 'true';
    }
  }

  return nextSettings;
}

function getInitialSettings(storedSettings: any) {
  const storedSettingsObj = storedSettings
    ? JSON.parse(storedSettings)
    : DEFAULT_SETTINGS;

  return deepMergeSerializableObjects(
    DEFAULT_APP_SETTINGS,
    storedSettingsObj,
  ) as AppSettings;
}

// These settings are not user configurable, so we should not to persist them to localStorage.
export const AppSettingsProvider = ({ children }: Props) => {
  const [storedSettings, storeSettings] = useLocalStorage(
    'settings',
    JSON.stringify(DEFAULT_SETTINGS),
  );

  const [setting, setSettings] = useState<AppSettings>(
    getInitialSettings(storedSettings),
  );

  const updateSettings = useCallback(
    (newSettings: any) => {
      const { features, ...rest } = newSettings;

      setSettings(newSettings);

      storeSettings(JSON.stringify(rest));
    },
    [storeSettings],
  );

  return (
    <AppSettingsContext.Provider
      value={{
        settings: hydrateInitialStateWithFeaturesFromCookies(setting),
        updateSettings,
      }}
    >
      {children}
    </AppSettingsContext.Provider>
  );
};
