import { configureStore } from '@reduxjs/toolkit';

import { initialRootState, rootReducer, RootState } from '../store';

const createMockStore = (customState: Partial<RootState> = {}) =>
  configureStore({
    reducer: rootReducer,
    preloadedState: {
      ...initialRootState,
      ...customState,
    },
  });

export default createMockStore;
