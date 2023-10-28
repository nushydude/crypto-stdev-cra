import styled from 'styled-components';

export const Row = styled.div<{ best?: boolean; dca?: boolean }>`
  border-radius: 5px;
  margin-bottom: 10px;
  background: ${(props) => {
    if (props.dca && props.best) {
      return '#A0F0A0';
    } else if (props.dca && !props.best) {
      return '#FFF3AD';
    }

    return '#FFD1DC';
  }};
  padding: 10px;
  border-width: 1px;
  border-style: solid;
  border-color: ${(props) => {
    if (props.dca && props.best) {
      return '#90EE90';
    } else if (props.dca && !props.best) {
      return '#FFEB9C';
    }

    return '#FFC0CB';
  }};
`;

export const DCAInfoContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  @media (max-width: 690px) {
    flex-direction: column;
  }
`;

export const Column = styled.div`
  width: 50%;

  @media (max-width: 690px) {
    width: 100%;
  }
`;
