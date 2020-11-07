import { rem } from 'polished';
import styled, { createGlobalStyle } from 'styled-components';

import styleConfig from 'config/styles';

export const GlobalStyles = createGlobalStyle`
  body {
    ${styleConfig.mixins.textAntialiasing}
    font-family: 'Raleway', sans-serif;
    background-color: ${styleConfig.palette.greyGhost};
  }
`;

export const Page = styled.main`
  padding: ${rem(32)} 0 ${rem(96)};
`;

export const Content = styled.div`
  max-width: ${rem(960)};
  margin: 0 auto;
  text-align: center;
`;

export const AppTitle = styled.h1`
  text-transform: uppercase;
`;
