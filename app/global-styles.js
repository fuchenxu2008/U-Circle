import { injectGlobal } from 'styled-components';

/* eslint no-unused-expressions: 0 */
injectGlobal`
  html {
    width: 100%;
    margin: 0;
    padding: 0;
  }

  body {
    width: 100%;
    padding: 0;
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
