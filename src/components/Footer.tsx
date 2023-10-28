import { useFeature } from '../hooks/useFeature';
import { FeatureEnum } from '../types/features';
import { BottomMounteredNavBar } from './BottomMounteredNavBar';

export const Footer = () => {
  const bottomMountedNav = useFeature(FeatureEnum.BOTTOM_MOUNTED_NAV_ON_MOBILE);

  return (
    <div>
      {bottomMountedNav && (
        <div className="md:hidden">
          <BottomMounteredNavBar />
        </div>
      )}
    </div>
  );
};
