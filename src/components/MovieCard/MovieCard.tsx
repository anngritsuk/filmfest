import React from "react";
import styles from "./MovieCard.module.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "../../providers/ThemeContextProvider";


export interface MovieCardProps {
  id: string;
  title: string;
  posterUrl: string;
  year: string;
  rating: number;
}

const MovieCard: React.FC<MovieCardProps> = ({
  id,
  title,
  posterUrl,
  year,
  rating,
}) => {
  const [colorTheme] = useContext(ThemeContext);

  return (
    <Link to={`/movie/${id}`} className={styles.card}>
      <div className={`movieCard movieCard-${colorTheme}`}>
        <img src={posterUrl} alt={title} className={styles.poster} />
        <div className={styles.info}>
          <h2 className={`title-${colorTheme}`}>{title}</h2>
          <div className={styles.text}>
            <p>Year: {year ? year.split("-")[0] : "N/A"}</p>
            <p>Rating: {rating}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;
