import { rem } from 'polished';
import styled, { css } from 'styled-components';

import styleConfig from 'config/styles';

// Config
export const tabs = {
  PLAYERS: {
    id: 'PLAYERS',
    label: 'Players',
  },
  GAMES: {
    id: 'GAMES',
    label: 'Games',
  },
};

// Components
export const TabList = styled.ul`
  ${styleConfig.mixins.listReset}
  display: flex;
  margin: 0 auto ${rem(32)};
  border-radius: ${rem(24)};
  background-color: #fff;
  overflow: hidden;
  box-shadow: ${styleConfig.shadows.card};
  max-width: ${rem(480)};
`;

export const TabButton = styled.button<{ isActive: boolean }>`
  ${styleConfig.mixins.buttonReset}
  display: block;
  width: 100%;
  padding: ${rem(8)} ${rem(12)};
  font-weight: bolder;
  background-color: #fff;

  @media ${styleConfig.mediaQueries.largeMobile} {
    display: inline-block;
  }

  ${({ isActive }) =>
    isActive &&
    css`
      background-color: ${styleConfig.palette.greyDark};
      color: #fff;
      border-radius: ${rem(24)};
    `}
`;

export const Tab = styled.li`
  flex: 1 1 50%;

  &::before {
    content: normal;
  }

  &:first-of-type {
    ${TabButton} {
      border-top-left-radius: ${rem(24)};
      border-bottom-left-radius: ${rem(24)};
    }
  }

  &:last-of-type {
    ${TabButton} {
      border-top-right-radius: ${rem(24)};
      border-bottom-right-radius: ${rem(24)};
    }
  }
`;
