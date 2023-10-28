import styled, { keyframes } from 'styled-components';
import { Row } from './BestBuyPage.styles';

export const SkeletonRow = styled(Row)`
  background: #efefef;
  border-color: #e0e0e0;
`;

export const skeletonLoading = keyframes`
  0% {
    background-color: hsl(200, 20%, 80%);
  }
  100% {
    background-color: hsl(200, 20%, 95%);
  }
`;

export const Bar = styled.div`
  height: 18px;
  animation: ${skeletonLoading} 1s linear infinite alternate;
  margin-bottom: 8px;
  width: 50%;
`;

export const ThickBar = styled(Bar)`
  height: 37px;
`;

export const AspectRatioBox = styled.div<{ aspectRatio: number }>`
  width: 100%;
  padding-top: ${(props) => props.aspectRatio}%;
  animation: ${skeletonLoading} 1s linear infinite alternate;
`;
