import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';

import gameResults, { initialState as initialGameResultsState } from './slices/gameResults';
import players, { initialState as initialPlayersState } from './slices/players';

/**
 * State slices have been set up using the 🦆 pattern. I.e. reducer as default export, everything else (actions, thunks) as named
 * exports.
 */
export const rootReducer = combineReducers({ players, gameResults });

// Extract the RootState type, so that we can use it across the app
export type RootState = ReturnType<typeof rootReducer>;

// Initial root state, exported so that we can reuse this elsewhere (e.g. tests)
export const initialRootState: RootState = {
  players: initialPlayersState,
  gameResults: initialGameResultsState,
};

const store = configureStore({
  reducer: rootReducer,
  preloadedState: initialRootState,
});

// Extract the configured store's Dispatch type, which gives us typings for the middleware as well
export type AppDispatch = typeof store.dispatch;

export default store;
