import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import moviesReducer from "./slices/movies";
import filtersReducer from './slices/filters';

export const store = configureStore({
  reducer: {
    user: userReducer,
    movies: moviesReducer,
    filters: filtersReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
