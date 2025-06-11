// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// IMPORTANT: Firebase configuration keys, especially apiKey, should ideally be
// stored in environment variables similar to REACT_APP_TMDB_KEY to avoid exposing them
// directly in the source code. This is a security concern.
const firebaseConfig = {
  apiKey: "AIzaSyDL7tEhatDLea-yxtklovwkrfgr0kynYFc", // FIXME: Hardcoded API key
  authDomain: "netflixgpt-a2963.firebaseapp.com",
  projectId: "netflixgpt-a2963",
  storageBucket: "netflixgpt-a2963.appspot.com",
  messagingSenderId: "676623356201",
  appId: "1:676623356201:web:f5e45489d70a8e4439e738",
  measurementId: "G-N8NZ07ETC9"
};

/**
 * Initializes and configures the Firebase application instance.
 *
 * This setup includes initializing the core Firebase app with the provided
 * configuration and setting up Firebase Analytics.
 *
 * The Firebase configuration (`firebaseConfig`) contains settings like API key,
 * auth domain, project ID, etc., which are essential for connecting to the
 * correct Firebase project.
 *
 * Note: It is highly recommended to move sensitive parts of `firebaseConfig`
 * (like `apiKey`) to environment variables for better security.
 */
// Initialize Firebase
const app = initializeApp(firebaseConfig);

/**
 * Firebase Analytics instance.
 * Initialized using the main Firebase app instance. It can be used to log events.
 */
const analytics = getAnalytics(app); // analytics can be exported if needed elsewhere

/**
 * Firebase Authentication service instance.
 * Exported to be used throughout the application for user authentication tasks
 * like sign-up, sign-in, sign-out, and observing auth state changes.
 */
export const auth = getAuth(app); // Pass app to getAuth for versions v9+