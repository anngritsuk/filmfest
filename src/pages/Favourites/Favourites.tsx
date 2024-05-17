import React, { useState, useEffect, useContext } from "react";
import MovieCard, {
  MovieCardProps,
} from "../../components/MovieCard/MovieCard";
import Header from "components/Header/Header";
import { ThemeContext } from "../../providers/ThemeContextProvider";
import styles from "../../components/MovieList/MovieList.module.css";

interface FavoritesProps {
  favoriteMovies: MovieCardProps[];
}

const handleSearch = (query: string) => {
  console.log(query);
};

const Favorites: React.FC<FavoritesProps> = () => {
  const [favoriteMovies, setFavoriteMovies] = useState<MovieCardProps[]>([]);
  const [color] = useContext(ThemeContext);

  useEffect(() => {
    const favoriteMoviesFromLocalStorage = JSON.parse(
      localStorage.getItem("favoriteMovies") || "[]"
    );
    setFavoriteMovies(favoriteMoviesFromLocalStorage);
  }, []);

  return (
    <div
      style={{
        background: color === "dark" ? "#1a1a1a" : "#888",
        color: color === "dark" ? "#fff" : "#1a1a1a",
      }}
    >
      <Header onSearch={handleSearch} />
      <h2 className={styles.title}>Favorite movies</h2>
      <div className={styles.movieList}>
        {favoriteMovies.length > 0 ? (
          favoriteMovies.map((favoriteMovie: MovieCardProps) => (
            <MovieCard
              key={favoriteMovie.id}
              id={favoriteMovie.id}
              title={favoriteMovie.title}
              posterUrl={favoriteMovie.posterUrl}
              rating={favoriteMovie.rating}
              year={favoriteMovie.year || ""}
              // genres={favoriteMovie.genres}
            />
          ))
        ) : (
          <p>You haven't added any movies yet</p>
        )}
      </div>
    </div>
  );
};

export default Favorites;
