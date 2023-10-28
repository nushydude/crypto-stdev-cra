import styled from 'styled-components';

export const PageWrapper = styled.div`
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 10px;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  padding-top: 50px;

  @media (max-width: 640px) {
    padding-top: 74px;
  }
`;
