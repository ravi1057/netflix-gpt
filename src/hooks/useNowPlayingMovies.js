import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchNowPlayingMoviesStart,
  fetchNowPlayingMoviesSuccess,
  fetchNowPlayingMoviesFailure
} from "../utils/moviesSlice";
import { API_OPTIONS } from "../utils/constants";

/**
 * Custom hook to fetch "Now Playing" movies from the TMDB API.
 *
 * This hook handles the asynchronous fetching of movie data,
 * then dispatches actions to update the Redux store with the fetched movies,
 * as well as their loading and error states within the `nowPlayingMovies` category
 * in the `moviesSlice`.
 *
 * It checks if "Now Playing" movies data already exists in the Redux store
 * (via `store.movies.nowPlayingMovies.data`) to prevent redundant API calls.
 *
 * This hook does not take any parameters and does not return any values.
 * Its primary side effects are dispatching actions to the Redux store.
 *
 * Side effects:
 * - Dispatches `fetchNowPlayingMoviesStart` action before fetching.
 * - Dispatches `fetchNowPlayingMoviesSuccess` action with movie data on success.
 * - Dispatches `fetchNowPlayingMoviesFailure` action with an error message on failure.
 */
const useNowPlayingMovies = () => {
  const dispatch = useDispatch();
  const nowPlayingMoviesData = useSelector(store => store.movies.nowPlayingMovies.data);

  useEffect(() => {
    if (nowPlayingMoviesData) return; // Prevent re-fetch if data already exists

    const getNowPlayingMovies = async () => {
      dispatch(fetchNowPlayingMoviesStart());
      try {
        const data = await fetch(
          "https://api.themoviedb.org/3/movie/now_playing?page=1",
          API_OPTIONS
        );
        if (!data.ok) {
          throw new Error(`HTTP error! status: ${data.status} for now playing movies`);
        }
        const json = await data.json();
        dispatch(fetchNowPlayingMoviesSuccess(json.results));
      } catch (e) {
        dispatch(fetchNowPlayingMoviesFailure(e.message || "Failed to fetch now playing movies."));
      }
    };

    getNowPlayingMovies();
  }, [dispatch, nowPlayingMoviesData]);
};

export default useNowPlayingMovies;
