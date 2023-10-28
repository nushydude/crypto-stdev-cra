interface Props {
  targetPrice: number;
  avgPrice: number;
  shouldDCA: boolean;
}

export const DCAInfo = ({ targetPrice, avgPrice, shouldDCA }: Props) => {
  const dip = ((avgPrice - targetPrice) / targetPrice) * 100;

  return (
    <div data-testid="dca-info">
      <p className="mb-1">Target price = {targetPrice.toFixed(4)}</p>
      <p className="mb-1">Spot price = {avgPrice.toFixed(4)}</p>
      <p className="mb-1">
        {dip > 0 ? 'Rise' : 'Dip'} from target price ={' '}
        {Math.abs(dip).toFixed(2)}%
      </p>
      <p className="mb-1">
        <strong>
          Buy the dip? {shouldDCA ? 'Yes, DCA now.' : 'No, try again later.'}
        </strong>
      </p>
    </div>
  );
};
