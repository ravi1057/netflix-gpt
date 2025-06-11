import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchTopRatedMoviesStart,
  fetchTopRatedMoviesSuccess,
  fetchTopRatedMoviesFailure
} from "../utils/moviesSlice";
import { API_OPTIONS } from "../utils/constants";

/**
 * Custom hook to fetch "Top Rated" movies from the TMDB API.
 *
 * This hook handles the asynchronous fetching of movie data for top-rated movies,
 * then dispatches actions to update the Redux store with the fetched movies,
 * as well as their loading and error states within the `topRatedMovies` category
 * in the `moviesSlice`.
 *
 * It checks if "Top Rated" movies data already exists in the Redux store
 * (via `store.movies.topRatedMovies.data`) to prevent redundant API calls.
 *
 * This hook does not take any parameters and does not return any values.
 * Its primary side effects are dispatching actions to the Redux store.
 *
 * Side effects:
 * - Dispatches `fetchTopRatedMoviesStart` action before fetching.
 * - Dispatches `fetchTopRatedMoviesSuccess` action with movie data on success.
 * - Dispatches `fetchTopRatedMoviesFailure` action with an error message on failure.
 */
const useTopRatedMovies = () => {
  const dispatch = useDispatch();
  const topRatedMoviesData = useSelector(store => store.movies.topRatedMovies.data);

  useEffect(() => {
    if (topRatedMoviesData) return; // Prevent re-fetch if data already exists

    const getTopRatedMovies = async () => {
      dispatch(fetchTopRatedMoviesStart());
      try {
        const data = await fetch(
          "https://api.themoviedb.org/3/movie/top_rated?page=1",
          API_OPTIONS
        );
        if (!data.ok) {
          throw new Error(`HTTP error! status: ${data.status} for top rated movies`);
        }
        const json = await data.json();
        dispatch(fetchTopRatedMoviesSuccess(json.results));
      } catch (e) {
        dispatch(fetchTopRatedMoviesFailure(e.message || "Failed to fetch top rated movies."));
      }
    };

    getTopRatedMovies();
  }, [dispatch, topRatedMoviesData]);
};

export default useTopRatedMovies;
