import React from "react";
import styled from "styled-components";

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

export const DCAInfo: React.FC<Props> = ({
  targetPrice,
  avgPrice,
  shouldDCA,
}) => {
  const dip = ((avgPrice - targetPrice) / targetPrice) * 100;

  return (
    <Container data-testid="dca-info">
      <p>Target price = USD {targetPrice.toFixed(2)}</p>
      <p>Spot price = USD {avgPrice.toFixed(2)}</p>
      <p>
        {dip > 0 ? "Rise" : "Dip"} from target price ={" "}
        {Math.abs(dip).toFixed(2)}%
      </p>
      <p>
        <strong>
          Buy the dip? {shouldDCA ? "Yes, DCA now." : "No, try again later."}
        </strong>
      </p>
    </Container>
  );
};
