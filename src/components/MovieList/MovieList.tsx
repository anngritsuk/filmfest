import React from "react";
import styles from "./MovieList.module.css";
import MovieCard from "../MovieCard/MovieCard";
import { useSelector } from "react-redux";
import { RootState } from "redux/store";
import FILTERS_AND_SORTS from "utils/sortsAndFilters";


interface Movie {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
  Rating: number;
}

interface MovieListProps {
  movies?: Movie[];
}

const MovieList: React.FC<MovieListProps> = ({ movies = [] }) => {
  const filters = useSelector((state: RootState) => state.filters);

  const filteredMovies = FILTERS_AND_SORTS.applyFiltersAndSorts(
    [...movies],
    [
      (arr: Movie[]) =>
        FILTERS_AND_SORTS.filterByRaiting(
          filters.ratingFrom,
          filters.ratingTo,
          arr
        ),
      (arr: Movie[]) =>
        FILTERS_AND_SORTS.filterByYear(filters.yearFrom, filters.yearTo, arr),
      (arr: Movie[]) => FILTERS_AND_SORTS.sortBy(filters.sortBy, arr),
    ]
  );

  return (
    <div className={styles.movieList}>
      {movies.length === 0 ? (
        <div className={styles.loading}>Loading...</div>
      ) : (
        filteredMovies.map((movie) => (
          <MovieCard
            key={movie.imdbID}
            id={movie.imdbID}
            title={movie.Title}
            posterUrl={movie.Poster}
            year={movie.Year}
            rating={movie.Rating}
          />
        ))
      )}
    </div>
  );
};

export default MovieList;
