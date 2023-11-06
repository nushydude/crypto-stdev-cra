import { useContext } from 'react';
import { AppSettingsContext } from '../context/appSettings';
import { FeatureEnum } from '../types/features';

export const useFeature = (feature: FeatureEnum) => {
  const { settings } = useContext(AppSettingsContext);

  return settings?.features[feature];
};
