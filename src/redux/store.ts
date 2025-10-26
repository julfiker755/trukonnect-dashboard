import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { baseApi } from './api/baseApi';

export const makeStore = () =>
  configureStore({
    reducer: {
      [baseApi.reducerPath]: baseApi.reducer,
    },
    devTools: false,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(baseApi.middleware),
  });

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];

setupListeners(makeStore().dispatch);
