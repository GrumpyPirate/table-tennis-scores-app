import { Player } from 'typings/common';

import { initialRootState, RootState } from 'store';
import playerFixture from 'testing/fixtures/player';

import selectPlayersSortedByName from './players';

describe('Store.Selectors', () => {
  describe('Players', () => {
    describe('selectPlayersSortedByName', () => {
      test('should sort the current list of all players by their names', () => {
        const mockPlayers: Player[] = [
          { ...playerFixture, name: 'Craig Durgan' }, // 3
          { ...playerFixture, name: 'Blaise Wunsch' }, // 2
          { ...playerFixture, name: 'Alisa Ruecker' }, // 1
          { ...playerFixture, name: 'Doretta Quigley' }, // 4
        ];
        const mockState: RootState = {
          ...initialRootState,
          players: {
            ...initialRootState.players,
            allPlayers: mockPlayers,
          },
        };

        const expectedSelection: Player[] = [
          mockPlayers[2],
          mockPlayers[1],
          mockPlayers[0],
          mockPlayers[3],
        ];

        expect(selectPlayersSortedByName(mockState)).toEqual(expectedSelection);
      });
    });
  });
});
