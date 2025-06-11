import React from "react";
import { IMG_CDN_URL } from "../utils/constants";

/**
 * MovieCard component for displaying a single movie's image.
 *
 * Currently displays the movie's backdrop image.
 * It constructs the full image URL using the `IMG_CDN_URL` constant
 * and the provided `backdrop_Path`.
 *
 * @param {object} props - Component props.
 * @param {string} props.backdrop_Path - The path to the movie's backdrop image (from TMDB).
 *                                     Should be a valid TMDB image path.
 * @returns {JSX.Element|null} The MovieCard component, or null if `backdrop_Path` is not provided (though current implementation doesn't explicitly return null).
 */
const MovieCard = ({ backdrop_Path }) => {
  if(!backdrop_Path) return null; // Added guard clause for missing path
  return (
    <div className="w-48 pr-4">
      <img alt="Movie Card" src={IMG_CDN_URL + backdrop_Path} />
    </div>
  );
};

export default MovieCard;
