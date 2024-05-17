import styles from "./Filters.module.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "redux/store/index";
import { setFilters } from "../../redux/store/slices/filters";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

export default function Filters() {
  const [sortBy, setSortBy] = useState("");
  const [yearFrom, setYearFrom] = useState("");
  const [yearTo, setYearTo] = useState("");
  const [ratingFrom, setRatingFrom] = useState("");
  const [ratingTo, setRatingTo] = useState("");
  const [activeButton, setActiveButton] = useState<string | null>(null);

  const dispatch = useDispatch<AppDispatch>();
  const notify = () => toast.success("Filters applied");

  const handleSortChange = (value: string) => {
    setSortBy(value);
    setActiveButton(value);
  };
  const handleApplyFilters = () => {
    dispatch(setFilters({ sortBy, yearFrom, yearTo, ratingFrom, ratingTo }));
    handleSortChange("");
    setYearFrom("");
    setYearTo("");
    setRatingFrom("");
    setRatingTo("");
    console.log(1);
  };

  const handleClearFilters = () => {
    handleSortChange("");
    setYearFrom("");
    setYearTo("");
    setRatingFrom("");
    setRatingTo("");
    dispatch(setFilters({ sortBy, yearFrom, yearTo, ratingFrom, ratingTo }));
  };

  return (
    <div className={styles.filterContainer}>
      <div>
        <div className={styles.title}>Sort by</div>
        <div className={styles.buttons}>
          <button
            className={`${styles.buttonRating} ${
              activeButton === "raiting" ? styles.active : ""
            }`}
            onClick={() => handleSortChange("raiting")}
          >
            Rating
          </button>
          <button
            className={`${styles.buttonYear} ${
              activeButton === "year" ? styles.active : ""
            }`}
            onClick={() => handleSortChange("year")}
          >
            Year
          </button>
        </div>
      </div>
      <div className={styles.title}>Filters</div>

      <div>
        <div>Years</div>
        <div className={styles.section}>
          <div>
            <input
              type="text"
              placeholder="from"
              onChange={(e) => setYearFrom(e.target.value)}
              value={yearFrom}
              className={styles.inputSorts}
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="to"
              onChange={(e) => setYearTo(e.target.value)}
              value={yearTo}
              className={styles.inputSorts}
            />
          </div>
        </div>
      </div>
      <div>
        <div>Rating</div>
        <div className={styles.section}>
          <div>
            <input
              type="text"
              placeholder="from"
              onChange={(e) => setRatingFrom(e.target.value)}
              value={ratingFrom}
              className={styles.inputSorts}
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="to"
              onChange={(e) => setRatingTo(e.target.value)}
              value={ratingTo}
              className={styles.inputSorts}
            />
          </div>
        </div>
      </div>
      <div className={styles.btns}>
        <button
          className={styles.buttonFilters}
          onClick={() => handleClearFilters()}
        >
          Clear filter
        </button>
        <button
          className={styles.buttonFilters}
          onClick={() => {
            handleApplyFilters();
            notify();
          }}
        >
          Show results
        </button>
      </div>
    </div>
  );
}
