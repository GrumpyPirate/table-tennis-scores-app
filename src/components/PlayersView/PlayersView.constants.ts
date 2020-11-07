import { rem } from 'polished';
import styled from 'styled-components';

import styleConfig from 'config/styles';
import Button from 'components/Button/Button';

export const CreatePlayer = styled.div`
  @media ${styleConfig.mediaQueries.mobileOnly} {
    ${Button} {
      display: block;
      width: 100%;
    }
  }
`;

export const PlayersList = styled.ul`
  ${styleConfig.mixins.listReset}

  @media ${styleConfig.mediaQueries.tablet} {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-column-gap: ${rem(16)};
  }
`;
