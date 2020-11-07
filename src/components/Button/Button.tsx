import { darken, rem } from 'polished';
import React, { ButtonHTMLAttributes } from 'react';
import { FunctionComponent } from 'react';
import styled from 'styled-components';
import { PropsWithClassName } from 'typings/common';

import styleConfig from 'config/styles';

const Button: FunctionComponent<PropsWithClassName<ButtonHTMLAttributes<HTMLButtonElement>>> = ({
  children,
  ...rest
}) => <button {...rest}>{children}</button>;

export default styled(Button)`
  ${styleConfig.mixins.buttonReset}
  background-color: ${darken(0.15, styleConfig.palette.paddleRed)};
  color: #fff;
  text-transform: uppercase;
  font-weight: bolder;
  padding: ${rem(8)} ${rem(16)};
  border-radius: ${rem(8)};
  transition-property: background-color;
  transition-duration: 0.1s;

  &:hover,
  &:focus {
    background-color: ${styleConfig.palette.paddleRed};
    transition-duration: 0s;
  }
`;
