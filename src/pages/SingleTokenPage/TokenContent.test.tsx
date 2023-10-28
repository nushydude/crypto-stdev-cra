import { screen, render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { FETCH_STATUS } from '../../consts/FetchStatus';
import { TokenContent } from './TokenContent';

jest.mock('../../components/KLineChart', () => ({
  KLineChart: () => <div data-testid="kline-chart" />,
}));

describe('TokenContent', () => {
  const testProps = {
    klineData: [{ openTime: '2023-01-01', openPrice: 123, volume: 456 }],
    targetPrice: 100,
    avgPrice: 110,
    shouldDCA: true,
  };

  it('renders DCAInfo and KLineChart on success status', () => {
    render(<TokenContent status={FETCH_STATUS.success} {...testProps} />);

    expect(screen.getByTestId('dca-info')).toBeInTheDocument();
    expect(screen.getByTestId('kline-chart')).toBeInTheDocument();
  });

  it('renders BeatLoader on fetching status', () => {
    render(<TokenContent status={FETCH_STATUS.fetching} {...testProps} />);
    expect(screen.getByTestId('loading-animation')).toBeInTheDocument();
  });

  it('renders idle message on idle status', () => {
    render(<TokenContent status={FETCH_STATUS.idle} {...testProps} />);
    expect(
      screen.getByText('Click submit to fetch latest kline data.'),
    ).toBeInTheDocument();
  });

  it('renders error message on error status', () => {
    render(<TokenContent status={FETCH_STATUS.error} {...testProps} />);
    expect(
      screen.getByText('An error occurred while fetching kline data.'),
    ).toBeInTheDocument();
  });

  it('renders nothing on unknown status', () => {
    const { container } = render(
      <TokenContent status="unknown-status" {...testProps} />,
    );
    expect(container).toBeEmptyDOMElement();
  });
});
