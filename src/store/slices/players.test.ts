import { rest } from 'msw';
import { Player } from 'typings/common';

import API_URL from 'config/api';
import { initialRootState } from 'store';
import server from 'testing/api';
import playerFixture from 'testing/fixtures/player';
import createMockStore from 'testing/utils';

import reducer, { createPlayer, initialState, PlayersState, readAllPlayers } from './players';

describe('Store.Slices', () => {
  describe('Players', () => {
    const mockPlayers: Player[] = [
      { ...playerFixture, id: 'player-1' },
      { ...playerFixture, id: 'player-2' },
      { ...playerFixture, id: 'player-3' },
    ];

    describe('Async Actions', () => {
      describe('createPlayer', () => {
        describe('readAllPlayers', () => {
          // A demonstration of testing a thunk outcome action (i.e. pending/fulfilled/rejected) directly:
          test('should handle "pending" outcomes', () => {
            const testState: PlayersState = {
              ...initialState,
              isFetching: false,
            };
            const action = readAllPlayers.pending('some-request-id');
            const expectedState = expect.objectContaining<PlayersState>({
              ...testState,
              isFetching: true,
            });
            const newState = reducer(testState, action);

            expect(newState).toEqual(expectedState);
          });

          // But it's arguably wiser (IMO) to test the whole thunk, and its effect on the store. Doing it this way gives us coverage on
          // both the thunk and the extraReducers at the same time - less time spent writing tests...!
          test('should handle "rejected" outcomes', async () => {
            // Mock our API to return a 500
            server.use(rest.get(`${API_URL}/players`, (req, res, ctx) => res(ctx.status(500))));

            const testInitialState: PlayersState = {
              ...initialState,
              isFetching: true,
            };

            const testStore = createMockStore({
              ...initialRootState,
              players: testInitialState,
            });

            await testStore.dispatch(readAllPlayers());

            expect(testStore.getState()).toEqual(
              expect.objectContaining({
                players: expect.objectContaining({
                  isFetching: false,
                  error: expect.objectContaining({
                    message: expect.any(String),
                  }),
                }),
              }),
            );
          });

          test('should handle "fulfilled" outcomes', async () => {
            server.use(
              rest.get(`${API_URL}/players`, (req, res, ctx) =>
                res(ctx.status(200), ctx.json(mockPlayers)),
              ),
            );

            const testInitialState: PlayersState = {
              ...initialState,
              isFetching: true,
            };

            const testStore = createMockStore({
              ...initialRootState,
              players: testInitialState,
            });

            await testStore.dispatch(readAllPlayers());

            expect(testStore.getState()).toEqual(
              expect.objectContaining({
                players: expect.objectContaining({
                  isFetching: false,
                  allPlayers: mockPlayers,
                }),
              }),
            );
          });
        });

        describe('createPlayer', () => {
          test('should handle "fulfilled" outcomes', async () => {
            server.use(
              rest.post<Pick<Player, 'name' | 'avatar'>>(`${API_URL}/players`, (req, res, ctx) =>
                res(
                  ctx.status(200),
                  ctx.json<Player>({ ...playerFixture, name: req.body.name }),
                ),
              ),
            );

            const testPlayerName = 'Dave Gorman';
            const testInitialState: PlayersState = {
              ...initialState,
              isFetching: true,
              allPlayers: mockPlayers,
            };

            const testStore = createMockStore({
              ...initialRootState,
              players: testInitialState,
            });

            await testStore.dispatch(createPlayer(testPlayerName));

            expect(testStore.getState()).toEqual(
              expect.objectContaining({
                players: expect.objectContaining({
                  isFetching: false,
                  allPlayers: [
                    ...mockPlayers,
                    // Dave should have been added to the client-side array, avoiding the need to re-fetch all players again
                    expect.objectContaining({
                      name: testPlayerName,
                    }),
                  ],
                }),
              }),
            );
          });
        });
      });
    });
  });
});
