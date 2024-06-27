import styled from 'styled-components';

const GaugeContainer = styled.div`
  position: relative;
  width: 300px;
  height: 150px;
`;

const GaugeBackground = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background: linear-gradient(to right, red, yellow, green);
  border-radius: 150px 150px 0 0;
  overflow: hidden;
`;

const GaugeNeedle = styled.div<{ angle: number }>`
  position: absolute;
  width: 4px;
  height: 50%;
  background: #666;
  left: 50%;
  bottom: 0;
  transform-origin: bottom center;
  transform: rotate(${(props) => props.angle}deg);
`;

const GaugeValue = styled.div`
  position: absolute;
  width: 50px;
  height: 50px;
  background: #d4af37;
  color: #fff;
  font-size: 1.5em;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  left: 50%;
  bottom: -25px;
  transform: translateX(-50%);
`;

const calculateAngle = (value: number) => {
  // Map value (0-100) to angle (-90deg to 90deg)
  return (value - 50) * 1.8;
};

type Props = {
  value: number;
};

const FearAndGreedGauge = ({ value }: Props) => {
  const angle = calculateAngle(value);

  return (
    <GaugeContainer>
      <GaugeBackground />
      <GaugeNeedle angle={angle} />
      <GaugeValue>{value}</GaugeValue>
    </GaugeContainer>
  );
};

export default FearAndGreedGauge;
