import React from "react";
import GptSearchBar from "./GptSearchBar";
import GptMovieSuggestions from "./GptMovieSuggestions";
import { BG_URL } from "../utils/constants";

/**
 * GptSearch component, providing the main UI for the GPT-based movie search feature.
 *
 * Responsibilities:
 * - Renders a background image (same as the login page background).
 * - Renders the `GptSearchBar` component, which allows users to input search queries.
 * - Renders the `GptMovieSuggestions` component, which displays movie suggestions
 *   based on the GPT search results.
 *
 * This component does not accept any direct props.
 * It likely relies on Redux state (managed by `gptSlice`) for search queries,
 * movie suggestions, and loading/error states related to the GPT search functionality,
 * although it doesn't directly select or dispatch actions here. Its child components do.
 */
const GptSearch = () => {
  return (
    <div>
      <div className="absolute -z-10">
        <img
          src={BG_URL}
          alt="logo"
        />
      </div>
      <GptSearchBar />
      <GptMovieSuggestions />
    </div>
  );
};

export default GptSearch;
