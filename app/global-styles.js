import { injectGlobal } from 'styled-components';

/* eslint no-unused-expressions: 0 */
injectGlobal`
  html {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
  }

  body {
    width: 100%;
    height: 100%;
    padding: 0;
    background-color: #fafafa;
  }

  body {
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }

  #app {
    min-height: 100%;
    min-width: 100%;
  }

  body.fontLoaded {
    font-family: 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }

  p,
  label {
    font-family: Georgia, Times, 'Times New Roman', serif;
    line-height: 1.5em;
  }
`;
