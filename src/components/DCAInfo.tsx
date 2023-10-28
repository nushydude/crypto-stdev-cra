import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  p {
    margin-bottom: 8px;
  }
`;

interface Props {
  targetPrice: number;
  avgPrice: number;
  shouldDCA: boolean;
}

export const DCAInfo = ({ targetPrice, avgPrice, shouldDCA }: Props) => {
  const dip = ((avgPrice - targetPrice) / targetPrice) * 100;

  return (
    <Container data-testid="dca-info">
      <p>Target price = {targetPrice.toFixed(4)}</p>
      <p>Spot price = {avgPrice.toFixed(4)}</p>
      <p>
        {dip > 0 ? 'Rise' : 'Dip'} from target price ={' '}
        {Math.abs(dip).toFixed(2)}%
      </p>
      <p>
        <strong>
          Buy the dip? {shouldDCA ? 'Yes, DCA now.' : 'No, try again later.'}
        </strong>
      </p>
    </Container>
  );
};
