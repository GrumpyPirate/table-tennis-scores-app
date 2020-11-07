import { createAsyncThunk, createSlice, SerializedError } from '@reduxjs/toolkit';
import axios from 'axios';
import { nanoid } from 'nanoid';
import { Player } from 'typings/common';

import API_URL from 'config/api';

// State shape
export interface PlayersState {
  allPlayers: Player[];
  error?: SerializedError;
  createPlayerError?: SerializedError;
  isFetching: boolean;
}

const sliceName = 'players';

export const initialState: PlayersState = {
  allPlayers: [],
  isFetching: false,
};

// Async actions
// CRUDQ
export const createPlayer = createAsyncThunk<Player, string>(
  `${sliceName}/createPlayer`,
  async (name) => {
    const avatar = `https://avatars.dicebear.com/api/human/${nanoid()}.svg`;

    const { data: newlyCreatedPlayer } = await axios.post<Player>(`${API_URL}/players`, {
      avatar,
      name,
    });

    return newlyCreatedPlayer;
  },
);

export const readAllPlayers = createAsyncThunk(`${sliceName}/readAllPlayers`, async () => {
  const { data } = await axios.get<Player[]>(`${API_URL}/players`);

  // This is where we'd sanitize/map the 'raw' API data into types localised to the webapp, for
  // decoupling. For now however, we're just hoovering up the API response straight into state.
  return data;
});

// State slice
const stateSlice = createSlice({
  name: sliceName,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // createPlayer
    builder.addCase(createPlayer.pending, (state) => ({
      ...state,
      isFetching: true,
    }));
    builder.addCase(createPlayer.fulfilled, (state, { payload }) => ({
      ...state,
      allPlayers: [...state.allPlayers, payload],
      isFetching: false,
    }));
    builder.addCase(createPlayer.rejected, (state, { error }) => ({
      ...state,
      createPlayerError: error,
      isFetching: false,
    }));

    // readAllPlayers
    builder.addCase(readAllPlayers.pending, () => ({
      ...initialState,
      isFetching: true,
    }));
    builder.addCase(readAllPlayers.rejected, (state, { error }) => ({
      ...state,
      error,
      isFetching: false,
    }));
    builder.addCase(readAllPlayers.fulfilled, (state, { payload }) => ({
      ...state,
      isFetching: false,
      allPlayers: payload,
    }));
  },
});

export default stateSlice.reducer;
