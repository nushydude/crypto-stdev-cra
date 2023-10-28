import { useFeature } from '../hooks/useFeature';
import { FeatureEnum } from '../types/features';
import styled from 'styled-components';
import { BottomMounteredNavBar } from './BottomMounteredNavBar';

const MobileOnlyWrapper = styled.div`
  @media (min-width: 690px) {
    display: none;
  }
`;

export const Footer = () => {
  const bottomMountedNav = useFeature(FeatureEnum.BOTTOM_MOUNTED_NAV_ON_MOBILE);

  return (
    <div>
      {bottomMountedNav && (
        <MobileOnlyWrapper>
          <BottomMounteredNavBar />
        </MobileOnlyWrapper>
      )}
    </div>
  );
};
