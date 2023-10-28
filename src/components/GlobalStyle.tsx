import { createGlobalStyle } from 'styled-components';
import 'react-toastify/dist/ReactToastify.css';

export const GlobalStyle = createGlobalStyle`
  body, html {
    height: 100%;
  }

  * { 
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Roboto', sans-serif;
  }
`;
