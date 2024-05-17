import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface Movie {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
  Genre: string[];
  Country: string
  Rating: number;
  
}

export const fetchMovies = createAsyncThunk<Movie[], number>(
  'movies/fetchMovies',
  async (N): Promise<Movie[]> => {
    try {
      const pages = [];
      const words = ['sun', 'moon', 'star', 'crime', "silence", 'day', 'family', "woman", "people", "fast", "trip", "game", "witch"];
      for (let word of words) {
        for (let i = 1; i <= N; i++) {
          const response = await axios.get('http://www.omdbapi.com/', {
            params: {
              apikey: 'f82e4e65',
              s: word,
              page: i
            }
          });
          pages.push(response.data.Search);
        }
      }
      let movies = pages.flat();

      const uniqueMovies = Array.from(new Set(movies.map(movie => movie.imdbID)))
        .map(id => movies.find(movie => movie.imdbID === id));

        const promises = uniqueMovies.map(async (movie) => {
          const response = await axios.get('http://www.omdbapi.com/', {
            params: {
              apikey: 'f82e4e65',
              i: movie.imdbID
            }
          });
          movie.Rating = parseFloat(response.data.imdbRating);
          return movie;
        });
  
        const moviesWithRatings = await Promise.all(promises);
        

      const shuffle = (array: any[]) => {
        var currentIndex = array.length, temporaryValue, randomIndex;

        while (0 !== currentIndex) {
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex -= 1;
          temporaryValue = array[currentIndex];
          array[currentIndex] = array[randomIndex];
          array[randomIndex] = temporaryValue;
        }

        return array;
      }

      // const shuffledMovies = shuffle(uniqueMovies);

      return shuffle(moviesWithRatings).slice(0, 4 + 5 * N) as Movie[];
    } catch (error) {
      throw error;
    }
  }
);



const moviesSlice = createSlice({
  name: 'movies',
  initialState: [] as Movie[],
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchMovies.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export default moviesSlice.reducer;
