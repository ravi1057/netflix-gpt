import React from "react";
import MovieCard from "./MovieCard";

/**
 * MovieList component for displaying a scrollable horizontal list of movies.
 *
 * Responsibilities:
 * - Renders a title for the movie list.
 * - Renders a horizontally scrollable container.
 * - Maps over the `movies` array and renders a `MovieCard` for each movie.
 *   - Passes `movie.id` as key and `movie.backdrop_path` (as `backdrop_Path`) to `MovieCard`.
 *
 * @param {object} props - Component props.
 * @param {string} props.title - The title to be displayed above the movie list.
 * @param {Array<object>} props.movies - An array of movie objects. Each object is expected to have
 *                                     at least `id` and `backdrop_path`.
 * @returns {JSX.Element} The MovieList component.
 */
const MovieList = ({ title, movies }) => {
  return (
    <div className="px-6">
       <h1 className="text-3xl py-4 text-white">{title}</h1>
      <div className="flex overflow-x-scroll">
        <div className="flex">
          {movies?.map((movie) => (
            <MovieCard key={movie.id} backdrop_Path={movie.backdrop_path} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieList;
