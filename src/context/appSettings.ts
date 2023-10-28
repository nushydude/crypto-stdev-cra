import React from 'react';
import { FeatureEnum } from '../types/features';

export type AppSettingsContextType = {
  features: Record<FeatureEnum, boolean>;
};

export const AppSettingsContext =
  React.createContext<AppSettingsContextType | null>(null);
