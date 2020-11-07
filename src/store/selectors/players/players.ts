import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'store';

const selectPlayersSortedByName = createSelector(
  (state: RootState) => state.players.allPlayers,
  (allPlayers) =>
    [...allPlayers].sort((playerA, playerB) => playerA.name.localeCompare(playerB.name)),
);

export default selectPlayersSortedByName;
