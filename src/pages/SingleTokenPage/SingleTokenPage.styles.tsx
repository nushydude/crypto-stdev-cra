import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  padding-top: 20px;

  @media (max-width: 640px) {
    flex-direction: column;
    padding-left: 10px;
    padding-right: 10px;
  }
`;

export const FormContainer = styled.div`
  width: 300px;
  flex-shrink: 0;
  margin-top: 0;
  margin-right: 20px;

  @media (max-width: 640px) {
    width: 100%;
    margin-top: 20px;
    margin-right: 0;
  }
`;

export const DataContainer = styled.div`
  /* min-width: 0 is required, otherwise when the window shrinks, the data container does not shrink */
  min-width: 0;
  flex: 1;
  padding: 10px;
  border: 1px solid #c0e0e0;
  background: azure;
`;

export const Heading = styled.h1`
  margin-bottom: 16px;
`;
