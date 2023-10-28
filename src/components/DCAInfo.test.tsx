import React from 'react';
import { screen, render } from '@testing-library/react';
import { DCAInfo } from './DCAInfo';

describe('DCAInfo component', () => {
  it('should render target price, spot price, dip, and shouldDCA', () => {
    const targetPrice = 100;
    const avgPrice = 90;
    const shouldDCA = true;
    render(
      <DCAInfo
        targetPrice={targetPrice}
        avgPrice={avgPrice}
        shouldDCA={shouldDCA}
      />,
    );

    expect(screen.getByTestId('dca-info')).toBeInTheDocument();
    expect(
      screen.getByText(`Target price = ${targetPrice.toFixed(4)}`),
    ).toBeInTheDocument();
    expect(
      screen.getByText(`Spot price = ${avgPrice.toFixed(4)}`),
    ).toBeInTheDocument();

    const dip = ((avgPrice - targetPrice) / targetPrice) * 100;

    expect(
      screen.getByText(
        `${dip > 0 ? 'Rise' : 'Dip'} from target price = ${Math.abs(
          dip,
        ).toFixed(2)}%`,
      ),
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        `Buy the dip? ${shouldDCA ? 'Yes, DCA now.' : 'No, try again later.'}`,
      ),
    ).toBeInTheDocument();
  });
});
