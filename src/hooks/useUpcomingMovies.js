import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUpcomingMoviesStart,
  fetchUpcomingMoviesSuccess,
  fetchUpcomingMoviesFailure
} from "../utils/moviesSlice";
import { API_OPTIONS } from "../utils/constants";

/**
 * Custom hook to fetch "Upcoming" movies from the TMDB API.
 *
 * This hook handles the asynchronous fetching of movie data for upcoming movies,
 * then dispatches actions to update the Redux store with the fetched movies,
 * as well as their loading and error states within the `upcomingMovies` category
 * in the `moviesSlice`.
 *
 * It checks if "Upcoming" movies data already exists in the Redux store
 * (via `store.movies.upcomingMovies.data`) to prevent redundant API calls.
 *
 * This hook does not take any parameters and does not return any values.
 * Its primary side effects are dispatching actions to the Redux store.
 *
 * Side effects:
 * - Dispatches `fetchUpcomingMoviesStart` action before fetching.
 * - Dispatches `fetchUpcomingMoviesSuccess` action with movie data on success.
 * - Dispatches `fetchUpcomingMoviesFailure` action with an error message on failure.
 */
const useUpcomingMovies = () => {
  const dispatch = useDispatch();
  const upcomingMoviesData = useSelector(store => store.movies.upcomingMovies.data);

  useEffect(() => {
    if (upcomingMoviesData) return; // Prevent re-fetch if data already exists

    const getUpcomingMovies = async () => {
      dispatch(fetchUpcomingMoviesStart());
      try {
        const data = await fetch(
          "https://api.themoviedb.org/3/movie/upcoming?page=1",
          API_OPTIONS
        );
        if (!data.ok) {
          throw new Error(`HTTP error! status: ${data.status} for upcoming movies`);
        }
        const json = await data.json();
        dispatch(fetchUpcomingMoviesSuccess(json.results));
      } catch (e) {
        dispatch(fetchUpcomingMoviesFailure(e.message || "Failed to fetch upcoming movies."));
      }
    };

    getUpcomingMovies();
  }, [dispatch, upcomingMoviesData]);
};

export default useUpcomingMovies;
