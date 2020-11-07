import { rem } from 'polished';
import styled from 'styled-components';

import LoadingSpinner from 'components/LoadingSpinner/LoadingSpinner';
import styleConfig from 'config/styles';

export const Title = styled.div`
  display: flex;
  align-items: center;

  @media ${styleConfig.mediaQueries.largeMobile} {
    flex-grow: 1;
  }

  ${LoadingSpinner} {
    margin-left: ${rem(8)};
  }
`;

export const TitleText = styled.h1`
  margin: 0 0 ${rem(16)};
  line-height: 1;

  @media ${styleConfig.mediaQueries.largeMobile} {
    margin-bottom: 0;
  }
`;
