import { Text } from './DCAInfo.styles';

interface Props {
  targetPrice: number;
  avgPrice: number;
  shouldDCA: boolean;
}

export const DCAInfo = ({ targetPrice, avgPrice, shouldDCA }: Props) => {
  const dip = ((avgPrice - targetPrice) / targetPrice) * 100;

  return (
    <div data-testid="dca-info">
      <Text>Target price = {targetPrice.toFixed(4)}</Text>
      <Text>Spot price = {avgPrice.toFixed(4)}</Text>
      <Text>
        {dip > 0 ? 'Rise' : 'Dip'} from target price ={' '}
        {Math.abs(dip).toFixed(2)}%
      </Text>
      <Text>
        <strong>
          Buy the dip? {shouldDCA ? 'Yes, DCA now.' : 'No, try again later.'}
        </strong>
      </Text>
    </div>
  );
};
