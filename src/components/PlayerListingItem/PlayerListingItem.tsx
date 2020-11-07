import { rem } from 'polished';
import React, { FunctionComponent, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import { ReactComponent as UserIcon } from 'assets/icons/user.svg';
import { selectAllPlayerScores } from 'store/selectors/scores';

import {
  Avatar,
  GameTotals,
  Info,
  Losses,
  Name,
  Score,
  ScoreLabel,
  Stats,
  Wins,
} from './PlayerListingItem.constants';
import { PlayerListingItemProps } from './PlayerListingItem.types';
import styleConfig from 'config/styles';

const PlayerListingItem: FunctionComponent<PlayerListingItemProps> = ({ className, player }) => {
  const allPlayerResults = useSelector(selectAllPlayerScores);

  const [isAvatarUnavailable, setIsAvatarUnavailable] = useState(false);

  const { wins, losses, score } = useMemo<{
    wins: number;
    losses: number;
    score: number;
  }>(() => {
    const { losses = 0, wins = 0, score = 0 } =
      allPlayerResults.find(({ id }) => id === player.id) || {};

    return { wins, losses, score };
  }, [allPlayerResults, player.id]);

  return (
    <div className={className}>
      <Avatar as="figure">
        {isAvatarUnavailable ? (
          <UserIcon />
        ) : (
          <img
            src={player.avatar}
            alt=""
            onError={() => {
              setIsAvatarUnavailable(true);
            }}
          />
        )}
      </Avatar>
      <Stats>
        <Info>
          <Name>{player.name}</Name>
          <GameTotals>
            <Wins>{wins} wins</Wins> / <Losses>{losses} losses</Losses>
          </GameTotals>
        </Info>
      </Stats>
      <Score as="h4">
        <ScoreLabel>Score</ScoreLabel>
        {score}
      </Score>
    </div>
  );
};

export default styled(PlayerListingItem)`
  display: flex;
  align-items: stretch;
  background-color: #fff;
  text-align: left;
  border-radius: ${rem(4)};
  box-shadow: ${styleConfig.shadows.card};
  margin-bottom: ${rem(16)};
`;
