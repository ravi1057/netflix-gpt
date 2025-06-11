import { createSlice } from "@reduxjs/toolkit";

/**
 * Redux slice for managing movie-related state.
 *
 * This slice handles:
 * - Storing lists of movies (now playing, popular, top-rated, upcoming)
 *   along with their respective loading and error states.
 * - Storing the current movie trailer video.
 *
 * Initial state structure for each movie category (e.g., `nowPlayingMovies`):
 * ```
 * {
 *   data: null | Array<Object>, // Array of movie objects from TMDB
 *   isLoading: boolean,         // True if this category is currently being fetched
 *   error: null | string        // Error message if fetching failed
 * }
 * ```
 *
 * `trailerVideo` is stored directly as `null` or an object representing the trailer data from TMDB.
 */
const moviesSlice = createSlice({
  name: "movies",
  initialState: {
    nowPlayingMovies: {
      data: null,
      isLoading: false,
      error: null,
    },
    popularMovies: {
      data: null,
      isLoading: false,
      error: null,
    },
    topRatedMovies: {
      data: null,
      isLoading: false,
      error: null,
    },
    upcomingMovies: {
      data: null,
      isLoading: false,
      error: null,
    },
    trailerVideo: null,
  },
  reducers: {
    /**
     * Reducers for "Now Playing" movies.
     * `fetchNowPlayingMoviesStart`: Sets loading to true and clears previous errors for now playing movies.
     * `fetchNowPlayingMoviesSuccess`: Sets loading to false and stores fetched now playing movie data.
     * `fetchNowPlayingMoviesFailure`: Sets loading to false and stores the error message for now playing movies.
     */
    fetchNowPlayingMoviesStart: (state) => {
      state.nowPlayingMovies.isLoading = true;
      state.nowPlayingMovies.error = null;
    },
    fetchNowPlayingMoviesSuccess: (state, action) => {
      state.nowPlayingMovies.isLoading = false;
      state.nowPlayingMovies.data = action.payload;
    },
    fetchNowPlayingMoviesFailure: (state, action) => {
      state.nowPlayingMovies.isLoading = false;
      state.nowPlayingMovies.error = action.payload;
    },
    /**
     * Reducers for "Popular" movies.
     * `fetchPopularMoviesStart`: Sets loading to true and clears previous errors for popular movies.
     * `fetchPopularMoviesSuccess`: Sets loading to false and stores fetched popular movie data.
     * `fetchPopularMoviesFailure`: Sets loading to false and stores the error message for popular movies.
     */
    fetchPopularMoviesStart: (state) => {
      state.popularMovies.isLoading = true;
      state.popularMovies.error = null;
    },
    fetchPopularMoviesSuccess: (state, action) => {
      state.popularMovies.isLoading = false;
      state.popularMovies.data = action.payload;
    },
    fetchPopularMoviesFailure: (state, action) => {
      state.popularMovies.isLoading = false;
      state.popularMovies.error = action.payload;
    },
    /**
     * Reducers for "Top Rated" movies.
     * `fetchTopRatedMoviesStart`: Sets loading to true and clears previous errors for top rated movies.
     * `fetchTopRatedMoviesSuccess`: Sets loading to false and stores fetched top rated movie data.
     * `fetchTopRatedMoviesFailure`: Sets loading to false and stores the error message for top rated movies.
     */
    fetchTopRatedMoviesStart: (state) => {
      state.topRatedMovies.isLoading = true;
      state.topRatedMovies.error = null;
    },
    fetchTopRatedMoviesSuccess: (state, action) => {
      state.topRatedMovies.isLoading = false;
      state.topRatedMovies.data = action.payload;
    },
    fetchTopRatedMoviesFailure: (state, action) => {
      state.topRatedMovies.isLoading = false;
      state.topRatedMovies.error = action.payload;
    },
    /**
     * Reducers for "Upcoming" movies.
     * `fetchUpcomingMoviesStart`: Sets loading to true and clears previous errors for upcoming movies.
     * `fetchUpcomingMoviesSuccess`: Sets loading to false and stores fetched upcoming movie data.
     * `fetchUpcomingMoviesFailure`: Sets loading to false and stores the error message for upcoming movies.
     */
    fetchUpcomingMoviesStart: (state) => {
      state.upcomingMovies.isLoading = true;
      state.upcomingMovies.error = null;
    },
    fetchUpcomingMoviesSuccess: (state, action) => {
      state.upcomingMovies.isLoading = false;
      state.upcomingMovies.data = action.payload;
    },
    fetchUpcomingMoviesFailure: (state, action) => {
      state.upcomingMovies.isLoading = false;
      state.upcomingMovies.error = action.payload;
    },
    /**
     * Reducer for adding/updating the movie trailer video.
     * Stores the payload (trailer video object from TMDB, or null) in `state.trailerVideo`.
     * This replaces any existing trailer video.
     */
    addTrailerVideo: (state, action) => {
      state.trailerVideo = action.payload;
    },
  },
});

export const {
  fetchNowPlayingMoviesStart,
  fetchNowPlayingMoviesSuccess,
  fetchNowPlayingMoviesFailure,
  fetchPopularMoviesStart,
  fetchPopularMoviesSuccess,
  fetchPopularMoviesFailure,
  fetchTopRatedMoviesStart,
  fetchTopRatedMoviesSuccess,
  fetchTopRatedMoviesFailure,
  fetchUpcomingMoviesStart,
  fetchUpcomingMoviesSuccess,
  fetchUpcomingMoviesFailure,
  addTrailerVideo,
} = moviesSlice.actions;

export default moviesSlice.reducer;
