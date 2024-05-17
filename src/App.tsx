import { Routes, Route } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import Trends from "./pages/Trends/Trends";
import Settings from "./pages/Settings/Settings";
import Favourites from "./pages/Favourites/Favourites";
import Movie from "./pages/Movie/Movie";
import React, { useContext, useEffect } from "react";
import ThemeContextProvider from "./providers/ThemeContextProvider";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovies } from "./redux/store/slices/movies";
import { RootState } from "redux/store";
import { NContext } from "providers/NContextProvider";
import UserAuthProvider from "providers/userAuthContext";
// import Filters from "redux/store/slices/filters";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const dispatch = useDispatch();
  const films = useSelector((state: RootState) => state.movies);

  let [N] = useContext(NContext);

  useEffect(() => {
    if (films.length === 0) {
      dispatch<any>(fetchMovies(N));
    }
    console.log(1);
  }, [N, films, dispatch]);

  return (
    <div className="App">
      <UserAuthProvider>
        <ThemeContextProvider>
          <Routes>
            <Route path="/" element={<HomePage movies={films} />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route
              path="/trends"
              element={
                <Trends
                  movies={films}
                  sharedMovies={films.map((film) => ({
                    id: film.imdbID,
                    title: film.Title,
                    posterUrl: film.Poster,
                    year: film.Year,
                    genres: [],
                    rating: film.Rating,
                  }))}
                />
              }
            />

            <Route
              path="/favourites"
              element={<Favourites favoriteMovies={[]} />}
            />
            <Route path="/settings" element={<Settings />} />
            <Route path="/movie/:id" element={<Movie />} />
          </Routes>
          <ToastContainer
            position="bottom-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            pauseOnHover
            theme="light"
          />
        </ThemeContextProvider>
      </UserAuthProvider>
    </div>
  );
}

export default App;
