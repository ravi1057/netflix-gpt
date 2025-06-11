import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPopularMoviesStart,
  fetchPopularMoviesSuccess,
  fetchPopularMoviesFailure
} from "../utils/moviesSlice";
import { API_OPTIONS } from "../utils/constants";

/**
 * Custom hook to fetch "Popular" movies from the TMDB API.
 *
 * This hook handles the asynchronous fetching of movie data for popular movies,
 * then dispatches actions to update the Redux store with the fetched movies,
 * as well as their loading and error states within the `popularMovies` category
 * in the `moviesSlice`.
 *
 * It checks if "Popular" movies data already exists in the Redux store
 * (via `store.movies.popularMovies.data`) to prevent redundant API calls.
 *
 * This hook does not take any parameters and does not return any values.
 * Its primary side effects are dispatching actions to the Redux store.
 *
 * Side effects:
 * - Dispatches `fetchPopularMoviesStart` action before fetching.
 * - Dispatches `fetchPopularMoviesSuccess` action with movie data on success.
 * - Dispatches `fetchPopularMoviesFailure` action with an error message on failure.
 */
const usePopularMovies = () => {
  const dispatch = useDispatch();
  const popularMoviesData = useSelector(store => store.movies.popularMovies.data);

  useEffect(() => {
    if (popularMoviesData) return; // Prevent re-fetch if data already exists

    const getPopularMovies = async () => {
      dispatch(fetchPopularMoviesStart());
      try {
        const data = await fetch(
          "https://api.themoviedb.org/3/movie/popular?page=1",
          API_OPTIONS
        );
        if (!data.ok) {
          throw new Error(`HTTP error! status: ${data.status} for popular movies`);
        }
        const json = await data.json();
        dispatch(fetchPopularMoviesSuccess(json.results));
      } catch (e) {
        dispatch(fetchPopularMoviesFailure(e.message || "Failed to fetch popular movies."));
      }
    };

    getPopularMovies();
  }, [dispatch, popularMoviesData]);
};

export default usePopularMovies;
