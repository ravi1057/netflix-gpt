import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice"
import moviesReducer from "./moviesSlice"
import gptReducer from "./gptSlice"
import configReducer from "./configSlice"

/**
 * Configures and exports the main Redux store for the application.
 *
 * The store combines multiple reducers to manage different parts of the application state:
 * - `user`: Manages user authentication and profile information (from `userSlice`).
 * - `movies`: Manages movie data, including lists of movies, trailer videos, and their loading/error states (from `moviesSlice`).
 * - `gpt`: Manages state related to GPT-based search functionality (from `gptSlice`).
 * - `config`: Manages application configuration, such as language preferences (from `configSlice`).
 */
const appStore=configureStore({
    reducer:{
        user :userReducer,
        movies:moviesReducer,
        gpt:gptReducer,
        config:configReducer
    }
})

export default appStore;    