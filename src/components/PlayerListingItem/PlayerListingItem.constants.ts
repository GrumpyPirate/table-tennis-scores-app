import styleConfig from 'config/styles';
import { rem } from 'polished';
import styled from 'styled-components';

const Column = styled.div`
  padding: ${rem(8)};
`;

export const Avatar = styled(Column)`
  flex: 0 0 ${rem(48)};
  margin: 0 ${rem(8)} 0 0;
  padding-right: 0;

  img,
  svg {
    display: block;
    width: ${rem(48)};
    height: ${rem(48)};
  }

  svg {
    opacity: 0.2;
  }
`;

export const Name = styled.h3`
  font-size: ${rem(16)};
  margin: 0 0 ${rem(4)};
  font-weight: bolder;
`;

export const ScoreLabel = styled.span`
  display: block;
  font-size: ${rem(12)};
  text-transform: uppercase;
`;

export const Score = styled(Column)`
  position: relative;
  margin: 0;
  text-align: center;
  font-size: ${rem(24)};
  flex: 0 0 ${rem(72)};
  display: flex;
  flex-direction: column;
  justify-content: center;
  line-height: 1;
  background-color: ${styleConfig.palette.successGreen};
  color: #fff;
`;

export const Stats = styled(Column)`
  flex-grow: 1;
  display: flex;
  align-items: stretch;
  padding-right: 0;
`;

export const Info = styled.div`
  flex: 1 1 auto;
`;

export const Wins = styled.span`
  color: ${styleConfig.palette.successGreen};
`;

export const Losses = styled.span`
  color: ${styleConfig.palette.greyDark};
`;

export const GameTotals = styled.h5`
  margin: 0;
`;
