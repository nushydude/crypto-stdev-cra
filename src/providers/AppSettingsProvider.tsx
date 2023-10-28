import React from 'react';
import {
  AppSettingsContext,
  AppSettingsContextType,
} from '../context/appSettings';
import { FeatureEnum } from '../types/features';
import { getCookieValue } from '../utils/getCookieValue';

const INITIAL_STATE: AppSettingsContextType = {
  features: {
    [FeatureEnum.BOTTOM_MOUNTED_NAV_ON_MOBILE]: false,
  },
};

type Props = {
  children: React.ReactNode;
};

function hydrateInitialStateWithFeaturesFromCookies() {
  const initialState = { ...INITIAL_STATE };

  for (const feature in initialState.features) {
    const cookieValue = getCookieValue(`FT_${feature}`);

    if (cookieValue !== null) {
      initialState.features[feature as FeatureEnum] = cookieValue === 'true';
    }
  }

  console.log('initialState', initialState);

  return initialState;
}

// These settings are not user configurable, so we should not to persist them to localStorage.
export const AppSettingsProvider = ({ children }: Props) => {
  return (
    <AppSettingsContext.Provider
      value={hydrateInitialStateWithFeaturesFromCookies()}
    >
      {children}
    </AppSettingsContext.Provider>
  );
};
