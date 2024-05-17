import React, { useState, useEffect, useContext } from "react";
import MovieCard, {
  MovieCardProps,
} from "../../components/MovieCard/MovieCard";
import Header from "components/Header/Header";
import { ThemeContext } from "../../providers/ThemeContextProvider";
import styles from "../../components/MovieList/MovieList.module.css";

interface Movie {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
  Rating: number;
}

interface TrendsProps {
  sharedMovies: MovieCardProps[];
  movies: Movie[];
}

const handleSearch = (query: string) => {
  console.log(query);
};

const Trends: React.FC<TrendsProps> = ({ movies }) => {
  const [, setSharedMovies] = useState<MovieCardProps[]>([]);
  const [color] = useContext(ThemeContext);

  useEffect(() => {
    const sharedMoviesFromLocalStorage = JSON.parse(
      localStorage.getItem("sharedMovies") || "[]"
    );

    const uniqueMovies = Array.from(
      new Set(
        sharedMoviesFromLocalStorage.map((movie: MovieCardProps) => movie.id)
      )
    ).map((id) =>
      sharedMoviesFromLocalStorage.find(
        (movie: MovieCardProps) => movie.id === id
      )
    );
    setSharedMovies(uniqueMovies);
  }, []);

  return (
    <div
      className={styles.pages}
      style={{
        background: color === "dark" ? "#1a1a1a" : "#888",
        color: color === "dark" ? "#fff" : "#1a1a1a",
      }}
    >
      <Header onSearch={handleSearch} />
      <h2 className={styles.title}>Popular films</h2>
      <div className={styles.movieList}>
        {/* {sharedMovies.length > 0 ? (
          sharedMovies.map((sharedMovie: MovieCardProps, index) => (
            <MovieCard
              key={index}
              id={sharedMovie.id}
              title={sharedMovie.title}
              posterUrl={sharedMovie.posterUrl}
              year={sharedMovie.year || ""}
              rating={sharedMovie.rating}
              // genres={sharedMovie.genres}
            />
          ))
        ) : (
          <p>Нет фильмов для публикации</p>
        )} */}

        {[...movies]
          .sort((a, b) => b.Rating - a.Rating)
          .map((movie) => (
            <MovieCard
              key={movie.imdbID}
              id={movie.imdbID}
              title={movie.Title}
              posterUrl={movie.Poster}
              year={movie.Year}
              rating={movie.Rating}
            />
          ))}
      </div>
    </div>
  );
};

export default Trends;
