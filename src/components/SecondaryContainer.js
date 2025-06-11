import React from "react";
import MovieList from "./MovieList";
import { useSelector } from "react-redux";

/**
 * SecondaryContainer component for displaying various categories of movie lists.
 *
 * Responsibilities:
 * - Selects different categories of movies (nowPlayingMovies, popularMovies, topRatedMovies, upcomingMovies)
 *   from the Redux store. Each category includes `data`, `isLoading`, and `error` states.
 * - For each movie category:
 *   - Displays a loading message if `isLoading` is true for that category.
 *   - Displays an error message if `error` is present for that category.
 *   - Renders a `MovieList` component if data is available and not empty for that category.
 *   - Displays a "No movies available" message if data is empty (and not loading/error).
 * - It also includes a "Horror Movies" list which currently reuses the `nowPlayingMovies.data`.
 *
 * This component does not accept any direct props.
 * Note: Contains an unused helper function `renderMovieList`.
 */
const SecondaryContainer = () => {
  const nowPlayingMovies = useSelector((store) => store.movies.nowPlayingMovies);
  const popularMovies = useSelector((store) => store.movies.popularMovies);
  const topRatedMovies = useSelector((store) => store.movies.topRatedMovies);
  const upcomingMovies = useSelector((store) => store.movies.upcomingMovies);

  const renderMovieList = (category) => {
    if (!category) return null; // Should not happen if initial state is set up

    const { data, isLoading, error } = category;

    if (isLoading) {
      return <p>Loading movies...</p>;
    }
    if (error) {
      return <p>Error loading movies: {error}</p>;
    }
    if (!data || data.length === 0) {
      return <p>No movies available in this category.</p>;
    }
    // Title for MovieList can be dynamic based on which category it is,
    // but for simplicity, we'll use the hardcoded ones for now as in original code
    // This part needs careful mapping if titles are to be dynamic based on category object key
    let title = "";
    if (category === nowPlayingMovies) title = "Now Playing";
    else if (category === popularMovies) title = "Popular Movies";
    else if (category === topRatedMovies) title = "Top Rated Movies";
    else if (category === upcomingMovies) title = "Upcoming Movies";
    // The "Horror Movies" list used nowPlayingMovies data, we can keep it or change it.
    // For now, let's assume it's intentional to show nowPlayingMovies again under "Horror Movies"
    // or it's a placeholder. We'll render it based on nowPlayingMovies state.
    else if (category === nowPlayingMovies && arguments[1] === "Horror Movies") {
        title = "Horror Movies";
    }


    return <MovieList title={title} movies={data} />;
  };

  return (
    <div className="bg-black">
      <div className="py-4 md:-mt-30 md:pl-12 relative z-20">
        {/* Render Now Playing Movies */}
        {nowPlayingMovies && (
          <div>
            {nowPlayingMovies.isLoading && <p>Loading Now Playing movies...</p>}
            {nowPlayingMovies.error && <p>Error loading Now Playing movies: {nowPlayingMovies.error}</p>}
            {nowPlayingMovies.data && nowPlayingMovies.data.length > 0 && (
              <MovieList title={"Now Playing"} movies={nowPlayingMovies.data} />
            )}
            {nowPlayingMovies.data && nowPlayingMovies.data.length === 0 && !nowPlayingMovies.isLoading && !nowPlayingMovies.error && (
              <p>No Now Playing movies available.</p>
            )}
          </div>
        )}

        {/* Render Popular Movies */}
        {popularMovies && (
          <div>
            {popularMovies.isLoading && <p>Loading Popular movies...</p>}
            {popularMovies.error && <p>Error loading Popular movies: {popularMovies.error}</p>}
            {popularMovies.data && popularMovies.data.length > 0 && (
              <MovieList title={"Popular Movies"} movies={popularMovies.data} />
            )}
            {popularMovies.data && popularMovies.data.length === 0 && !popularMovies.isLoading && !popularMovies.error && (
              <p>No Popular movies available.</p>
            )}
          </div>
        )}

        {/* Render Top Rated Movies */}
        {topRatedMovies && (
          <div>
            {topRatedMovies.isLoading && <p>Loading Top Rated movies...</p>}
            {topRatedMovies.error && <p>Error loading Top Rated movies: {topRatedMovies.error}</p>}
            {topRatedMovies.data && topRatedMovies.data.length > 0 && (
              <MovieList title={"Top Rated Movies"} movies={topRatedMovies.data} />
            )}
            {topRatedMovies.data && topRatedMovies.data.length === 0 && !topRatedMovies.isLoading && !topRatedMovies.error && (
              <p>No Top Rated movies available.</p>
            )}
          </div>
        )}

        {/* Render Upcoming Movies */}
        {upcomingMovies && (
          <div>
            {upcomingMovies.isLoading && <p>Loading Upcoming movies...</p>}
            {upcomingMovies.error && <p>Error loading Upcoming movies: {upcomingMovies.error}</p>}
            {upcomingMovies.data && upcomingMovies.data.length > 0 && (
              <MovieList title={"Upcoming Movies"} movies={upcomingMovies.data} />
            )}
            {upcomingMovies.data && upcomingMovies.data.length === 0 && !upcomingMovies.isLoading && !upcomingMovies.error && (
              <p>No Upcoming movies available.</p>
            )}
          </div>
        )}

        {/* Render Horror Movies (using nowPlayingMovies data as per original logic) */}
        {nowPlayingMovies && (
          <div>
            {/* Assuming we don't want to show separate loading/error for this reused list if main nowPlaying is already handled */}
            {nowPlayingMovies.data && nowPlayingMovies.data.length > 0 && (
              <MovieList title={"Horror Movies"} movies={nowPlayingMovies.data} />
            )}
            {/* No separate "No Horror Movies" message if it's just reusing nowPlaying,
                or it could be handled if this were a distinct category */}
          </div>
        )}
      </div>
    </div>
  );
};

export default SecondaryContainer;
