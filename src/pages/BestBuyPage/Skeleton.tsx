import { Column, DCAInfoContainer } from './BestBuyPage.styles';
import { AspectRatioBox, Bar, SkeletonRow, ThickBar } from './Skeleton.styles';

type Props = {
  rows?: number;
};

export const Skeleton = ({ rows = 5 }: Props) => {
  return (
    <div>
      {new Array(rows).fill(0).map((dataItem, index) => (
        <SkeletonRow key={index}>
          <ThickBar />
          <DCAInfoContainer>
            <Column>
              <Bar />
              <Bar />
              <Bar />
              <Bar />
            </Column>
            <Column>
              <AspectRatioBox aspectRatio={50} />
            </Column>
          </DCAInfoContainer>
        </SkeletonRow>
      ))}
    </div>
  );
};
