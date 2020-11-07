import { position, rem } from 'polished';
import styled from 'styled-components';

import Button from 'components/Button/Button';
import styleConfig from 'config/styles';

// Values
export const maxGamesToDisplay = 20;

// Components
export const ScoresVis = styled.section`
  margin-bottom: ${rem(32)};
`;

export const AspectRatio = styled.div`
  position: relative;
  height: 0;
  padding-bottom: 56.25%;
`;

export const GraphWrapper = styled.div`
  ${position('absolute', 0, 0, 0, 0)}
  background-color: #fff;
  box-shadow: ${styleConfig.shadows.card};
  border-radius: ${rem(4)};
  overflow: hidden;
`;

export const CreateGameResult = styled.section`
  text-align: left;

  @media ${styleConfig.mediaQueries.mobileOnly} {
    ${Button} {
      display: block;
      width: 100%;
    }
  }
`;
