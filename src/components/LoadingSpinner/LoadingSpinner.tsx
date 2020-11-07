import React from 'react';
import { FunctionComponent } from 'react';
import styled, { css, keyframes } from 'styled-components';

import { ReactComponent as SpinnerGraphic } from 'assets/icons/loader.svg';

import { LoadingSpinnerProps } from './LoadingSpinner.types';

const spin = keyframes`
  from {
    transform: rotateZ(0turn);
  }

  to {
    transform: rotateZ(1turn);
  }
`;

const LoadingSpinner: FunctionComponent<LoadingSpinnerProps> = ({ className }) => (
  <figure className={className}>
    <SpinnerGraphic />
  </figure>
);

export default styled(LoadingSpinner)`
  margin: 0;
  color: inherit;
  position: relative;
  top: ${0 + 1 / 16}em;
  transition-property: opacity, visibility;
  transition-duration: 0.2s;

  svg {
    display: block;
    width: 1em;
    height: 1em;
    animation: ${spin} 2s linear infinite;
  }

  ${({ show }) =>
    !show &&
    css`
      opacity: 0;
      visibility: hidden;
      transition-delay: 0.2s;
    `}
`;
