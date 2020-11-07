import { createAsyncThunk, createSlice, SerializedError } from '@reduxjs/toolkit';
import axios from 'axios';
import { GamePlayerResult, GameResult } from 'typings/common';

import API_URL from 'config/api';

// State shape
export interface GameResultsState {
  allGameResults: GameResult[];
  error?: SerializedError;
  isFetching: boolean;
}

const sliceName = 'gameResults';

export const initialState: GameResultsState = {
  allGameResults: [],
  isFetching: false,
};

// Async actions
// CRUDQ
export const createGameResult = createAsyncThunk<
  GameResult,
  { date: string; player1: GamePlayerResult; player2: GamePlayerResult }
>(`${sliceName}/createGameResult`, async ({ date, player1, player2 }) => {
  const { data: newlyCreatedGameResult } = await axios.post<GameResult>(`${API_URL}/games`, {
    date,
    player1,
    player2,
  });

  return newlyCreatedGameResult;
});

export const readAllGameResults = createAsyncThunk<GameResult[], number | undefined>(
  `${sliceName}/readAllGameResults`,
  async (limit) => {
    const { data } = await axios.get<GameResult[]>(`${API_URL}/games`, {
      params: {
        _sort: 'date',
        ...(limit !== undefined && {
          _limit: limit,
        }),
      },
    });

    // This is where we'd sanitize/map the 'raw' API data into types localised to the webapp, for
    // decoupling. For now however, we're just hoovering up the API response straight into state.
    return data;
  },
);

// State slice
const stateSlice = createSlice({
  name: sliceName,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // createGameResult
    builder.addCase(createGameResult.pending, (state) => ({
      ...state,
      isFetching: true,
    }));
    builder.addCase(createGameResult.fulfilled, (state, { payload }) => ({
      ...state,
      allGameResults: [...state.allGameResults, payload],
      isFetching: false,
    }));
    builder.addCase(createGameResult.rejected, (state) => ({
      ...state,
      isFetching: false,
    }));

    // readAllGameResults
    builder.addCase(readAllGameResults.pending, () => ({
      ...initialState,
      isFetching: true,
    }));
    builder.addCase(readAllGameResults.rejected, (state, { error }) => ({
      ...state,
      error,
      isFetching: false,
    }));
    builder.addCase(readAllGameResults.fulfilled, (state, { payload }) => ({
      ...state,
      isFetching: false,
      allGameResults: payload,
    }));
  },
});

export default stateSlice.reducer;
