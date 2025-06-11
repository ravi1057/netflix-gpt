import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice"
import moviesReducer from "./moviesSlice"
import gptReducer from "./gptSlice"
import configReducer from "./configSlice"
import profileReducer from "./profileSlice"; // Import profileReducer

const appStore=configureStore({
    reducer:{
        user :userReducer,
        movies:moviesReducer,
        gpt:gptReducer,
        config:configReducer,
        profile: profileReducer, // Add profileReducer
    }
})

export default appStore;    