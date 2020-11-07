import React, { FunctionComponent, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Button from 'components/Button/Button';
import PlayerListingItem from 'components/PlayerListingItem/PlayerListingItem';
import TabHeader from 'components/TabHeader/TabHeader';
import { AppDispatch, RootState } from 'store';
import { createPlayer } from 'store/slices/players';

import { CreatePlayer, PlayersList } from './PlayersView.constants';

const PlayersView: FunctionComponent = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { allPlayers, isFetching } = useSelector((state: RootState) => ({
    allPlayers: state.players.allPlayers,
    isFetching: state.players.isFetching,
    error: state.players.error,
  }));

  const onCreatePlayerClick = useCallback(() => {
    const playerName = window.prompt('Enter player name:');

    if (playerName) {
      dispatch(createPlayer(playerName));
    }
  }, [dispatch]);

  return (
    <>
      <TabHeader title="Current Players" showSpinner={isFetching}>
        <CreatePlayer>
          <Button type="button" onClick={onCreatePlayerClick} disabled={isFetching}>
            Create Player
          </Button>
        </CreatePlayer>
      </TabHeader>
      <PlayersList>
        {allPlayers.map((player) => (
          <li key={player.id}>
            <PlayerListingItem player={player} />
          </li>
        ))}
      </PlayersList>
    </>
  );
};

export default PlayersView;
