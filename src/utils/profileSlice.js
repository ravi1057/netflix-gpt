import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentProfile: null, // Stores the selected profile object
  profiles: [], // Stores all profiles for the logged-in user
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setSelectedProfile: (state, action) => {
      state.currentProfile = action.payload;
    },
    setProfiles: (state, action) => {
      state.profiles = action.payload;
    },
    clearSelectedProfile: (state) => {
      state.currentProfile = null;
    },
    // Potentially add reducers for addProfile, removeProfile, updateProfile later
  },
});

export const { setSelectedProfile, setProfiles, clearSelectedProfile } = profileSlice.actions;

export default profileSlice.reducer;
