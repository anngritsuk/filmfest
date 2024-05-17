import React, { useEffect, useState, useContext } from "react";
// import { Navigate } from "react-router-dom";
// import useAuth from "hooks/use-auth";
// import { removeUser } from "../../redux/store/slices/userSlice";
import { useAppDispatch } from "hooks/redux-hooks";
import Header from "components/Header/Header";
import MovieList from "../../components/MovieList/MovieList";
import styles from "./HomePage.module.css";
import { ThemeContext } from "../../providers/ThemeContextProvider";
import { NContext } from "providers/NContextProvider";
import { fetchMovies } from "../../redux/store/slices/movies";

interface Movie {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
  Rating: number;
}

interface HomeProps {
  movies: Movie[];
}

const HomePage: React.FC<HomeProps> = ({ movies }) => {
  const dispatch = useAppDispatch();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchResults, setSearchResults] = useState<Movie[]>(movies);
  const [color] = useContext(ThemeContext);

  const [N, setN] = useContext(NContext);

  useEffect(() => {
    if (!searchQuery) {
      setSearchResults(movies);
    } else {
      const filteredMovies = movies.filter((movie) =>
        movie.Title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchResults(filteredMovies);
    }
  }, [searchQuery, movies]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <div
      style={{
        background: color === "dark" ? "#1a1a1a" : "#888",
        color: color === "dark" ? "#f0f0f0" : "#1a1a1a",
      }}
    >
      <Header onSearch={handleSearch} />
      <div className={styles.home}>
        <section>
          <MovieList movies={searchResults} />
          {searchResults.length > 9 && (
            <button
              className={styles.homebuttom}
              onClick={() => {
                setN((prev) => prev + 1);
                dispatch<any>(fetchMovies(N));
              }}
            >
              Show more
            </button>
          )}
        </section>
      </div>
    </div>
  );
};

export default HomePage;
