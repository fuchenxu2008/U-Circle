import { injectGlobal } from 'styled-components';

/* eslint no-unused-expressions: 0 */
injectGlobal`
  html, body {
    height: 100%;
    width: 100%;
    padding: 0;
  }

  html {
    margin: 0;
  }

  body {
    background-color: white;
    color: rgb(40, 40, 40);
  }

  body {
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }

  p {
    margin: 0;
  }

  body.fontLoaded {
    font-family: 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }

`;
