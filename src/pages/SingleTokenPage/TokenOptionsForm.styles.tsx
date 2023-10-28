import styled from 'styled-components';

export const Form = styled.form`
  display: grid;
  grid-gap: 8px;
  grid-template-columns: 1fr;
  margin-bottom: 20px;

  p {
    margin: 0;
  }

  label {
    display: block;
    margin-bottom: 4px;
  }

  input,
  select {
    width: 100%;
    padding: 10px;
  }

  button {
    padding: 10px;
    width: 100%;
  }
`;

export const FormGroup = styled.div`
  margin-bottom: 10px;
`;
