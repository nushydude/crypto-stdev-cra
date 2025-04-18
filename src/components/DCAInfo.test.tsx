import { describe, it, expect } from 'vitest';
import { screen, render } from '@testing-library/react';
import { DCAInfo } from './DCAInfo';

describe('DCAInfo component', () => {
  it('should render target price, spot price, dip, and shouldDCA when shouldDCA is true', () => {
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
      screen.getByText(`Target price = ${targetPrice.toFixed(6)}`),
    ).toBeInTheDocument();
    expect(
      screen.getByText(`Spot price = ${avgPrice.toFixed(6)}`),
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
      screen.getByText('Buy the dip? Yes, DCA now.'),
    ).toBeInTheDocument();
  });

  it('should render target price, spot price, dip, and shouldDCA when shouldDCA is false', () => {
    const targetPrice = 100;
    const avgPrice = 110;
    const shouldDCA = false;
    render(
      <DCAInfo
        targetPrice={targetPrice}
        avgPrice={avgPrice}
        shouldDCA={shouldDCA}
      />,
    );

    expect(screen.getByTestId('dca-info')).toBeInTheDocument();
    expect(
      screen.getByText(`Target price = ${targetPrice.toFixed(6)}`),
    ).toBeInTheDocument();
    expect(
      screen.getByText(`Spot price = ${avgPrice.toFixed(6)}`),
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
      screen.getByText('Buy the dip? No, try again later.'),
    ).toBeInTheDocument();
  });

  it('should handle zero values correctly', () => {
    const targetPrice = 0;
    const avgPrice = 0;
    const shouldDCA = false;
    render(
      <DCAInfo
        targetPrice={targetPrice}
        avgPrice={avgPrice}
        shouldDCA={shouldDCA}
      />,
    );

    expect(screen.getByTestId('dca-info')).toBeInTheDocument();
    expect(
      screen.getByText(`Target price = ${targetPrice.toFixed(6)}`),
    ).toBeInTheDocument();
    expect(
      screen.getByText(`Spot price = ${avgPrice.toFixed(6)}`),
    ).toBeInTheDocument();

    // When both prices are 0, dip should be 0%
    expect(
      screen.getByText('Dip from target price = 0.00%'),
    ).toBeInTheDocument();
  });
});
