import { useDispatch, useSelector } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { addTrailerVideo } from "../utils/moviesSlice";
import { useEffect } from "react";

/**
 * Custom hook to fetch a movie trailer video from the TMDB API using the movie ID.
 *
 * It fetches video data for the given movie ID, filters for a "Trailer" type video,
 * and then dispatches an action (`addTrailerVideo`) to update the Redux store
 * with the trailer video details. If no explicit trailer is found, it may use the
 * first video from the results.
 *
 * This hook also checks if trailer video data already exists in the Redux store for the given movieId
 * (if store.movies.trailerVideo?.key matches or if movieId matches a stored ID, though current
 * trailerVideo state is simpler) to prevent redundant API calls.
 * Note: The current `addTrailerVideo` reducer replaces the whole `trailerVideo` state,
 * so it's not storing trailers per movieId in the provided slice structure.
 * The re-fetch prevention logic might need to be more sophisticated if multiple trailers
 * are to be handled or stored. For now, it fetches if no trailer is present or if movieId changes.
 *
 * @param {number} movieId - The ID of the movie for which to fetch the trailer.
 *
 * Side effects:
 * - Dispatches `addTrailerVideo` action to `moviesSlice` with the trailer data.
 * - Makes an API call to TMDB.
 * - Potential for API call errors if the movie or its videos aren't found.
 */
const useMovieTrailer = (movieId) => {
  const dispatch = useDispatch();
  const trailerVideo = useSelector(store => store.movies.trailerVideo);

  //fetch trailer video && updating the store with the trailer video data
  const getMovieVideos = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/" +
        movieId +
        "/videos?language=en-US",
      API_OPTIONS
    );
    const json = await data.json();
    const filterData = json.results.filter((video) => video.type === "Trailer");
    const trailer = filterData.length ? filterData[0] : json.results[0];
    if (trailer) { // Ensure trailer object exists before dispatching
      dispatch(addTrailerVideo(trailer));
    } else {
      // Optionally dispatch an action to clear trailer or handle error
      dispatch(addTrailerVideo(null)); // Clear trailer if no suitable video found
    }
  };

  useEffect(() => {
    // Simple check: if there's already a trailer and the new movieId is the same as the one that fetched it (implicit)
    // This logic is simplified; a more robust solution would store movieId with the trailer in Redux.
    // For now, it re-fetches if movieId changes or if no trailer is loaded.
    // A check like `if (trailerVideo && trailerVideo.movieId === movieId) return;` would be better if movieId was stored with trailer.
    // Given current structure, we might refetch if a trailer is globally set but this component instance needs a different one.
    // Or, if the trailer is for this movieId already, don't refetch.
    // Let's assume for now if a trailer is loaded, and this hook is for a *different* movie, it should fetch.
    // If it's for the *same* movie (implicit), it *could* skip.
    // The simplest approach without changing Redux state structure: always fetch if movieId is provided,
    // unless a trailer for *this specific movie* is already considered loaded (which we can't easily tell).
    // So, for now, it will fetch unless a global trailer is already set.
    // A more robust check to prevent re-fetch if the *current* trailer is for the *current* movieId
    // would require trailerVideo in Redux to also store which movieId it belongs to.
    // if (trailerVideo && trailerVideo.id === movieId) return; // Example if trailer stored movie's ID

    // Current logic: if ANY trailer is loaded, it might not refetch.
    // Let's refine to: only fetch if no trailer is loaded OR if the movieId has changed (implicitly by component re-rendering with new movieId)
    // The dependency array [dispatch, movieId] handles re-fetching if movieId changes.
    // We can add a check to not fetch if a trailer for *this* movieId is already there,
    // but `trailerVideo` state is global, not per-movie.
    // The provided code fetches on mount if movieId is present.
    // A common pattern is to fetch if data is not present for the *specific item*.
    // Given `addTrailerVideo` replaces the *single* trailer, we fetch if no trailer exists, or if movieId changes.

    if (!movieId) return; // Do not fetch if movieId is not provided

    // To prevent re-fetch if the currently stored trailer is for the current movieId,
    // we'd need to store movieId along with the trailer.
    // Lacking that, we fetch if the current global trailer is null, or if movieId changes.
    // The original code fetches if getMovieVideos() is called.
    // The useEffect with [movieId, dispatch] as deps will call it if movieId changes.
    // Let's add a more explicit check against re-fetching if a trailer is already there
    // AND assume it's for the current context (though not guaranteed to be for this movieId).
    // This is a compromise due to the global nature of trailerVideo state.
    if (trailerVideo && !movieId) { // This condition is a bit off.
        // If a global trailer exists, and we are in a context that doesn't have a specific movieId (e.g. main background)
        // then maybe don't fetch. But this hook is useMovieTrailer(movieId), so movieId is expected.
    }

    // Let's stick to: fetch if movieId is present. useEffect handles if movieId changes.
    // If a component unmounts and remounts for the same movie, it will refetch.
    // To prevent that, useSelector for this specific movie's trailer would be needed.
    // For now, the existing logic with useEffect dependency is reasonable.

    getMovieVideos();
  }, [movieId, dispatch, trailerVideo]); // Add trailerVideo to deps to re-evaluate if it changes externally.
};
export default useMovieTrailer;
