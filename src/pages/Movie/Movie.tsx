import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import styles from "./Movie.module.css";
import Header from "components/Header/Header";
import { ThemeContext } from "../../providers/ThemeContextProvider";
import { ToastContainer, toast } from "react-toastify";

interface MovieData {
  id: string;
  title: string;
  posterUrl: string;
  genres: string[];
  description: string;
  releaseDate: string;
  rating: number;
  runtime: number;
  country: string;
  production: string;
  actors: string;
  director: string;
  writers: string;
  boxOffice: string;
}

const Movie: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<MovieData | null>(null);
  const [color] = useContext(ThemeContext);

  const like = () => toast.info("movie added to 'Favorites' page");

  const handleSearch = (query: string) => {
    console.log(query);
  };

  useEffect(() => {
    const fetchMovie = async () => {
      if (!id) {
        console.error("Error fetching movie: id is undefined");
        return;
      }

      try {
        const response = await fetch(
          `http://www.omdbapi.com/?apikey=f82e4e65&i=${id}`
        );
        const data = await response.json();
        const {
          Title: title,
          Poster: posterUrl,
          Genre: genres,
          Plot: description,
          Released: releaseDate,
          imdbRating: rating,
          Runtime: runtime,
          Country: country,
          Production: production,
          Actors: actors,
          Director: director,
          Writer: writers,
          BoxOffice: boxOffice,
        } = data;
        setMovie({
          id: id,
          title,
          posterUrl,
          genres: genres ? genres.split(", ") : [],
          description,
          releaseDate,
          rating: parseFloat(rating),
          runtime: parseInt(runtime, 10),
          country,
          production,
          actors,
          director,
          writers,
          boxOffice,
        });
      } catch (error) {
        console.error("Error fetching movie:", error);
      }
    };

    fetchMovie();
  }, [id]);

  // console.log(movie);

  const handleAction = (action: "share" | "like") => {
    if (movie) {
      const listKey = action === "share" ? "sharedMovies" : "favoriteMovies";
      const list = JSON.parse(localStorage.getItem(listKey) || "[]");
      const movieWithYear = {
        ...movie,
        year: movie.releaseDate.split("-")[0],
      };
      localStorage.setItem(listKey, JSON.stringify([...list, movieWithYear]));
    }
  };

  if (!movie) {
    return <div className={styles.loading}>Loading...</div>;
  }

  return (
    <div
      className={styles.page}
      style={{
        background: color === "dark" ? "#1a1a1a" : "#f0f0f0",
        color: color === "dark" ? "#fff" : "#1a1a1a",
      }}
    >
      <Header onSearch={handleSearch} />
      <div className={styles.movie}>
        <div className={styles.left}>
          <img
            src={movie.posterUrl}
            alt={movie.title}
            className={styles.poster}
          />
        </div>
        <div className={styles.right}>
          <p className={styles.genres}>Genres: {movie.genres.join(", ")}</p>
          <h2 className={styles.title}>{movie.title}</h2>

          <div className={styles.cardDetailsBox}>
            <p className={styles.detailsTitle}>Description</p>
            <p className={styles.detailsDescription}>{movie.description}</p>
          </div>
          <div className={styles.cardDetailsBox}>
            <p className={styles.detailsTitle}>Release Date</p>
            <p className={styles.detailsDescription}>{movie.releaseDate}</p>
          </div>
          <div className={styles.ratingBox}>
            <div className={styles.rating}>{movie.rating}</div>
            <div className={styles.imdbBox}>
              <p className={styles.imdbRating}>IMDb</p>
              <p className={styles.imdbRating}>{movie.rating}</p>
            </div>
            <div className={styles.imdbBox}>
              <p className={styles.imdbRating}>{movie.runtime} min</p>
            </div>
          </div>
          <div className={styles.cardDetailsBox}>
            <p className={styles.detailsTitle}>Box Office</p>
            <p className={styles.detailsDescription}>{movie.boxOffice}</p>
          </div>
          <div className={styles.cardDetailsBox}>
            <p className={styles.detailsTitle}>Country</p>
            <p className={styles.detailsDescription}>{movie.country}</p>
          </div>
          <div className={styles.cardDetailsBox}>
            <p className={styles.detailsTitle}>Production</p>
            <p className={styles.detailsDescription}>{movie.production}</p>
          </div>
          <div className={styles.cardDetailsBox}>
            <p className={styles.detailsTitle}>Actors</p>
            <p className={styles.detailsDescription}>{movie.actors}</p>
          </div>
          <div className={styles.cardDetailsBox}>
            <p className={styles.detailsTitle}>Director</p>
            <p className={styles.detailsDescription}>{movie.director}</p>
          </div>
          <div className={styles.cardDetailsBox}>
            <p className={styles.detailsTitle}>Writers</p>
            <p className={styles.detailsDescription}>{movie.writers}</p>
          </div>
          <div className={styles.buttons}>
            <button
              className={styles.Button}
              onClick={() => {
                like();
              }}
            >
              Поделиться
            </button>
            <button
              className={styles.Button}
              onClick={() => {
                handleAction("like");
                like();
              }}
            >
              Нравится
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Movie;
