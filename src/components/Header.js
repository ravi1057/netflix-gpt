import React, { useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { LOGO, SUPPORTED_LANGUAGES } from "../utils/constants";
import { toggleGptSearchView } from "../utils/gptSlice";
import { changeLanguage } from "../utils/configSlice";

/**
 * Header component for the application.
 *
 * Responsibilities:
 * - Displays the application logo.
 * - Manages user authentication state changes:
 *   - If a user is logged in, it navigates to the browse page and adds user info to Redux.
 *   - If a user is logged out, it navigates to the login page and removes user info from Redux.
 * - Provides a "Sign Out" button if a user is logged in.
 * - Provides a button to toggle the GPT Search view.
 * - If GPT Search view is active, displays a language selection dropdown.
 *
 * This component does not accept any direct props.
 * It interacts heavily with Redux for user state (`store.user`), GPT search visibility (`store.gpt.showGptSearch`),
 * and dispatches actions for adding/removing user, toggling GPT search view, and changing language.
 * It also uses `react-router-dom` for navigation and Firebase `onAuthStateChanged` for auth persistence.
 */
const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);
  console.log(showGptSearch, "===>showGptSearch");
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        navigate("/error");
      });
  };
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL,
          })
        );
        navigate("/browse");
      } else {
        dispatch(removeUser());
        navigate("");
      }
    });
    //Unsubscribe when component unmounts
    return () => unsubscribe();
  }, []);

  const handleGptSearchClick = () => {
    dispatch(toggleGptSearchView());
  };

  const handleLanguageChange = (e) => {
    dispatch(changeLanguage(e.target.value));
  };
  return (
    <div className="absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-30 flex justify-between">
      <img className="w-36" src={LOGO} alt="logo" />
      {user && (
        <div className="flex p-2">
          {showGptSearch && (
            <select
              className="p-2 m-2 bg-gray-900 text-white"
              onChange={handleLanguageChange}
            >
              {SUPPORTED_LANGUAGES?.map((lang) => (
                <option key={lang?.identifier} value={lang?.identifier}>
                  {lang?.name}
                </option>
              ))}
            </select>
          )}

          <button
            className="py-2 px-4 mx-4 my-2 bg-purple-700 text-white rounded-lg"
            onClick={handleGptSearchClick}
          >
            {showGptSearch ? "Home Page" : "Gpt Search"}
          </button>
          <img className="w-12 h-12" alt="usericon" src={user?.photoURL} />
          <button onClick={handleSignOut} className="font-bold text-white">
            (Sign Out)
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
