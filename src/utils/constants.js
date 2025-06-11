/**
 * URL for the Netflix logo image.
 */
export const LOGO =
  "https://cdn.cookielaw.org/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png";

/**
 * Configuration object for making API calls to The Movie Database (TMDB).
 * It specifies the HTTP method (`GET`) and headers, including `accept` type
 * and `Authorization` using a Bearer token from the environment variable
 * `REACT_APP_TMDB_KEY`.
 */
export const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: "Bearer " + process.env.REACT_APP_TMDB_KEY,
  },
};

/**
 * Base URL for accessing TMDB movie poster images.
 * Posters are typically appended with a specific image path and displayed at 500px width.
 * Example: `${IMG_CDN_URL}/your_movie_poster_path.jpg`
 */
export const IMG_CDN_URL = "https://image.tmdb.org/t/p/w500";

/**
 * URL for the background image used on the login/signup page.
 */
export const BG_URL =
  "https://assets.nflxext.com/ffe/siteui/vlv3/893a42ad-6a39-43c2-bbc1-a951ec64ed6d/1d86e0ac-428c-4dfa-9810-5251dbf446f8/IN-en-20231002-popsignuptwoweeks-perspective_alpha_website_large.jpg";

/**
 * Array of supported languages for the application's multilingual feature.
 * Each object in the array contains:
 * - `identifier`: A short code for the language (e.g., "en", "hindi").
 * - `name`: The display name of the language (e.g., "English", "Hindi").
 */
export const SUPPORTED_LANGUAGES = [
  { identifier: "en", name: "English" },
  { identifier: "hindi", name: "Hindi" },
  { identifier: "telugu", name: "Telugu"}
];
