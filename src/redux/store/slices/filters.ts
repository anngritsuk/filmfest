// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';

// export interface Movie {
//   Title: string;
//   Year: string;
//   imdbID: string;
//   Type: string;
//   Poster: string;
//   Genre: string;
//   Country: string;
// }

// export interface FetchMoviesResult {
//   movies: Movie[];
//   genres: string[];
//   countries: string[];
// }

// export interface FilterState {
//   sortBy: 'year' | 'rating';
//   movieName: string;
//   genre: string[];
//   year: { from: number; to: number };
//   rating: { from: number; to: number };
//   country: string[];
// }

// export const initialFilterState: FilterState = {
//   sortBy: 'year',
//   movieName: '',
//   genre: [],
//   year: { from: 1900, to: new Date().getFullYear() },
//   rating: { from: 0, to: 10 },
//   country: [],
// };
import { createSlice } from '@reduxjs/toolkit';

const filtersSlice = createSlice({
  name: 'filters',
  initialState: {
    sortBy: '',
    yearFrom: '',
    yearTo: '',
    ratingFrom: '',
    ratingTo: '',
  },
  reducers: {
    setFilters: (state, action) => {
      return action.payload;
    },
  },
});

export const { setFilters } = filtersSlice.actions;
export default filtersSlice.reducer;