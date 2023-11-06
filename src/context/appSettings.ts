import React from 'react';
import { FeatureEnum } from '../types/features';

export type AppSettings = {
  features: Record<FeatureEnum, boolean>;
  bestBuySymbols: string[];
};

export type AppSettingsContextType = {
  settings: AppSettings;
  updateSettings: (settings: Partial<AppSettings>) => void;
};

export const AppSettingsContext = React.createContext<AppSettingsContextType>({
  settings: {
    features: {
      [FeatureEnum.BOTTOM_MOUNTED_NAV_ON_MOBILE]: false,
    },
    bestBuySymbols: [],
  },
  updateSettings: () => {},
});
