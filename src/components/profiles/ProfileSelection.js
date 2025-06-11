import React, { useEffect, useState } from 'react'; // Import useEffect, useState
import ProfileAvatar from './ProfileAvatar';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'; // Import useSelector
import { setSelectedProfile, setProfiles } from '../../utils/profileSlice'; // Import setProfiles
import { getProfilesForUser } from '../../utils/firebase'; // Import getProfilesForUser

const ProfileSelection = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(store => store.user); // Get user from Redux
  const profilesFromStore = useSelector(store => store.profile.profiles); // Get profiles from Redux

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user && user.uid) {
      setLoading(true);
      setError(null);
      getProfilesForUser(user.uid)
        .then(fetchedProfiles => {
          dispatch(setProfiles(fetchedProfiles));
          setLoading(false);
        })
        .catch(err => {
          console.error("Failed to fetch profiles:", err);
          setError("Failed to load profiles. Please try again.");
          setLoading(false);
        });
    } else {
      // No user, clear profiles from store if necessary or handle as logged out
      dispatch(setProfiles([]));
    }
  }, [user, dispatch]);

  const handleProfileSelect = (profile) => {
    console.log('Selected profile:', profile);
    dispatch(setSelectedProfile(profile));
    navigate('/browse');
  };

  const handleManageProfilesClick = () => {
    navigate('/profiles/manage');
  };

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen bg-black text-white text-2xl">Loading profiles...</div>;
  }

  if (error) {
    return <div className="flex flex-col justify-center items-center min-h-screen bg-black text-white text-2xl">
        <p>{error}</p>
        <button onClick={() => navigate(0)} className="mt-4 p-2 bg-red-600 rounded">Retry</button>
      </div>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
      <h1 className="text-5xl mb-12">Who's watching?</h1>
      <div className="flex flex-wrap justify-center">
        {profilesFromStore && profilesFromStore.length > 0 ? (
          profilesFromStore.map(profile => (
            <div key={profile.id} className="m-4 text-center cursor-pointer" onClick={() => handleProfileSelect(profile)}>
              <ProfileAvatar name={profile.name} avatar={profile.avatar} />
              <p className="mt-2 text-gray-400 hover:text-white">{profile.name}</p>
            </div>
          ))
        ) : (
          !loading && <p className="text-xl">No profiles found. Please add one.</p> // Show only if not loading and no profiles
        )}
      </div>
      <button
        className="mt-12 bg-transparent border border-gray-500 text-gray-500 px-6 py-2 rounded hover:border-white hover:text-white"
        onClick={handleManageProfilesClick}
      >
        Manage Profiles
      </button>
    </div>
  );
};
export default ProfileSelection;
