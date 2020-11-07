import { rem } from 'polished';
import styled from 'styled-components';

import styleConfig from 'config/styles';

const Container = styled.div`
  width: 100%;
  padding-right: ${rem(styleConfig.grid.gutterWidths.mobile / 2)};
  padding-left: ${rem(styleConfig.grid.gutterWidths.mobile / 2)};

  @media ${styleConfig.mediaQueries.tablet} {
    padding-right: ${rem(styleConfig.grid.gutterWidths.tablet / 2)};
    padding-left: ${rem(styleConfig.grid.gutterWidths.tablet / 2)};
  }
`;

export default Container;
