import React from "react";
import { useSelector } from "react-redux";
import VideoTitle from "./VideoTitle";
import VideoBackground from "./VideoBackground";

/**
 * MainContainer component for displaying the primary movie showcase.
 *
 * Responsibilities:
 * - Selects the `nowPlayingMovies` state (including `data`, `isLoading`, `error`) from the Redux store.
 * - Handles conditional rendering based on loading and error states:
 *   - Displays a loading message if `isLoading` is true.
 *   - Displays an error message if `error` is present.
 *   - Displays a "No movies available" message if data is empty or null (and not loading/error).
 * - If movies are available, it takes the first movie from the `nowPlayingMovies.data` array
 *   to be featured as the "main movie".
 * - Renders the `VideoTitle` component with the main movie's title and overview.
 * - Renders the `VideoBackground` component with the main movie's ID to fetch and display its trailer.
 *
 * This component does not accept any direct props.
 */
const MainContainer = () => {
  const { data: movies, isLoading, error } = useSelector((store) => store.movies.nowPlayingMovies);

  if (isLoading) {
    return <p>Loading main movie...</p>;
  }

  if (error) {
    return <p>Error loading main movie: {error}</p>;
  }

  if (!movies || movies.length === 0) {
    return <p>No movies available to display in MainContainer.</p>;
  }

  const mainMovie = movies[0];
  const { original_title, overview, id } = mainMovie;

  return (
    <div className="pt-[30%] bg-black md:pt-0">
      <VideoTitle title={original_title} overview={overview} />
      <VideoBackground movieId={id} />
    </div>
  );
};

export default MainContainer;
