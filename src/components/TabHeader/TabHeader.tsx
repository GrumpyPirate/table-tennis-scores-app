import { rem } from 'polished';
import React, { FunctionComponent } from 'react';
import styled from 'styled-components';

import LoadingSpinner from 'components/LoadingSpinner/LoadingSpinner';
import styleConfig from 'config/styles';

import { Title, TitleText } from './TabHeader.constants';
import { TabHeaderProps } from './TabHeader.types';

const TabHeader: FunctionComponent<TabHeaderProps> = ({
  title,
  showSpinner = false,
  children,
  className,
}) => (
  <header className={className}>
    <Title>
      <TitleText>{title}</TitleText>
      <LoadingSpinner show={showSpinner} />
    </Title>
    {children}
  </header>
);

export default styled(TabHeader)`
  margin-bottom: ${rem(32)};

  @media ${styleConfig.mediaQueries.largeMobile} {
    text-align: left;
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
  }
`;
