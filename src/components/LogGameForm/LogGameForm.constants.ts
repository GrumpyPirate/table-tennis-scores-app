import { rem } from 'polished';
import styled from 'styled-components';

import styleConfig from 'config/styles';

export const FormHeading = styled.h3`
  margin: 0 0 ${rem(24)};
`;

export const FieldRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: ${rem(12)};
`;

export const Field = styled.div`
  flex: 0 0 50%;
  margin-bottom: ${rem(12)};

  label {
    display: block;
    width: 100%;
    font-weight: bolder;
    font-size: ${rem(16)};
    margin: 0 0 ${rem(4)};
  }

  input,
  select {
    font-size: ${rem(16)};
    display: block;
    width: 100%;
    height: ${rem(32)};
    padding: ${rem(4)} ${rem(8)};
    border-radius: ${rem(2)};
    border: ${rem(2)} solid ${styleConfig.palette.greyLight};
    box-shadow: none;
  }
`;
