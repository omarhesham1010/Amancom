import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: 'Segoe UI', 'Roboto', 'Arial', sans-serif;
    background: #f7f7f7;
    color: #222;
    min-height: 100vh;
  }
  *, *:before, *:after {
    box-sizing: border-box;
  }
`;

export default GlobalStyle; 