import styled from 'styled-components';

const Container = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: #000;
  color: #fff;
  padding: 10px;
  box-shadow: 0 6px 10px 5px rgba(0, 0, 0, 0.5);
  z-index: 100;
  height: 80px;
`;

export const BottomMounteredNavBar = () => {
  return <Container>BottomMounteredNavBar</Container>;
};
