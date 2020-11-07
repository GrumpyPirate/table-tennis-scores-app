import { rem, transparentize } from 'polished';
import { css } from 'styled-components';

const palette = {
  greyGhost: '#f6f7fa',
  greyLight: '#e7e7e7',
  greyMid: '#d9d9d9',
  grey: '#c8c8c8',
  greyDark: '#4a4a4a',
  paddleRed: '#ef2f2c',
  successGreen: '#159caa',
};

const grid = {
  columnCount: 12,
  gutterWidths: {
    mobile: 24,
    tablet: 30,
  },
};

const screenSizes = {
  largeMobileMin: 480,
  tabletMin: 768,
  desktopMin: 1200,
  largeDesktop: 1440,
  tvMin: 2560,
};

const mediaQueries = {
  // 'up'
  largeMobile: `(min-width: ${screenSizes.largeMobileMin / 16}em)`,
  tablet: `(min-width: ${screenSizes.tabletMin / 16}em)`,
  desktop: `(min-width: ${screenSizes.desktopMin / 16}em)`,
  largeDesktop: `(min-width: ${screenSizes.largeDesktop / 16}em)`,
  tv: `(min-width: ${screenSizes.tvMin / 16}em)`,
  // down
  largeMobileDown: `(max-width: ${(screenSizes.tabletMin - 1) / 16}em)`,
  tabletDown: `(max-width: ${(screenSizes.desktopMin - 1) / 16}em)`,
  desktopDown: `(max-width: ${(screenSizes.largeDesktop - 1) / 16}em)`,
  largeDesktopDown: `(max-width: ${(screenSizes.tvMin - 1) / 16}em)`,
  // Device-specific
  mobileOnly: `(max-width: ${(screenSizes.largeMobileMin - 1) / 16}em)`,
  largeMobileOnly: `(min-width: ${screenSizes.largeMobileMin / 16}em) and (max-width: ${
    (screenSizes.tabletMin - 1) / 16
  }em)`,
  tabletOnly: `(min-width: ${screenSizes.tabletMin / 16}em) and (max-width: ${
    (screenSizes.desktopMin - 1) / 16
  }em)`,
  desktopOnly: `(min-width: ${screenSizes.desktopMin / 16}em) and (max-width: ${
    (screenSizes.largeDesktop - 1) / 16
  }em)`,
  largeDesktopOnly: `(min-width: ${screenSizes.largeDesktop / 16}em) and (max-width: ${
    (screenSizes.tvMin - 1) / 16
  }em)`,
};

const mixins = {
  textAntialiasing: css`
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  `,
  buttonReset: css`
    border: 0;
    margin: 0;
    padding: 0;
    width: auto;
    overflow: visible;
    background: transparent;
    border-radius: 0;
    box-shadow: none;
    cursor: pointer;

    /* inherit font & color from ancestor */
    color: inherit;
    font: inherit;

    /* Normalize 'line-height'. Cannot be changed from 'normal' in Firefox 4+. */
    line-height: normal;

    /* Corrects inability to style clickable 'input' types in iOS */
    -webkit-appearance: none;

    /* Remove excess padding and border in Firefox 4+ */
    &::-moz-focus-inner {
      border: 0;
      padding: 0;
    }

    touch-action: manipulation;
  `,
  listReset: css`
    margin: 0;
    padding: 0;
    list-style: none;
  `,
};

const shadows = {
  card: `0 ${rem(1)} ${rem(2)} 0 ${transparentize(0.8, '#000')}`,
};

const styleConfig = {
  grid,
  mediaQueries,
  mixins,
  palette,
  screenSizes,
  shadows,
};

export default styleConfig;
