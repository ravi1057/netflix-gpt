import React from "react";
import Header from "./Header";
import useNowPlayingMovies from "../hooks/useNowPlayingMovies";
import MainContainer from "./MainContainer";
import SecondaryContainer from "./SecondaryContainer";
import usePopularMovies from "../hooks/usePopularMovies";
import useTopRatedMovies from "../hooks/useTopRatedMovies";
import useUpcomingMovies from "../hooks/useUpcomingMovies";
import GptSearch from "./GptSearch";
import { useSelector } from "react-redux";

/**
 * Browse component, serving as the main view after a user logs in.
 *
 * Responsibilities:
 * - Renders the `Header` component.
 * - Conditionally renders either the `GptSearch` view or the standard movie browsing view
 *   (`MainContainer` and `SecondaryContainer`) based on the `showGptSearch` state from Redux.
 * - Invokes custom hooks (`useNowPlayingMovies`, `usePopularMovies`, `useTopRatedMovies`, `useUpcomingMovies`)
 *   to trigger fetching of movie data. These hooks typically update the Redux store.
 *
 * This component does not accept any direct props.
 * It selects `showGptSearch` state from the `gptSlice` in Redux.
 */
const Browse = () => {
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);
  useNowPlayingMovies();
  usePopularMovies();
  useTopRatedMovies();
  useUpcomingMovies();
  return (
    <div>
      <Header />

      {showGptSearch ? (
        <GptSearch />
      ) : (
        <>
          <MainContainer />
          <SecondaryContainer />
        </>
      )}

      {/* 
          MainContainer
            -VideoBackground
            -VideoTitle
          SecondaryContainer
            -MovieList*n
            -cards*n
      
      */}
    </div>
  );
};

export default Browse;
