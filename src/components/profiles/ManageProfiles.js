import React, { useState, useEffect, useCallback } from 'react';
import ProfileAvatar from './ProfileAvatar';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  getProfilesForUser,
  addProfile as fbAddProfile,
  updateProfile as fbUpdateProfile,
  deleteProfile as fbDeleteProfile
} from '../../utils/firebase';
import { setProfiles } from '../../utils/profileSlice';

const ManageProfiles = () => {
  const [profileName, setProfileName] = useState('');
  const [editingProfileId, setEditingProfileId] = useState(null); // To store ID of profile being edited

  const user = useSelector(store => store.user);
  const profilesFromStore = useSelector(store => store.profile.profiles);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false); // For fetching profiles
  const [error, setError] = useState(null); // For fetching profiles errors
  const [isSubmitting, setIsSubmitting] = useState(false); // For add/update operations
  const [formError, setFormError] = useState(null); // For add/update form errors
  const [isDeleting, setIsDeleting] = useState(null); // To track which profile is being deleted (by ID)


  const fetchUserProfiles = useCallback(async () => {
    if (user && user.uid) {
      setLoading(true);
      setError(null);
      try {
        const fetchedProfiles = await getProfilesForUser(user.uid);
        dispatch(setProfiles(fetchedProfiles));
      } catch (err) {
        console.error("Failed to fetch profiles:", err);
        setError("Failed to load profiles. Please try again.");
      } finally {
        setLoading(false);
      }
    } else {
      dispatch(setProfiles([]));
    }
  }, [user, dispatch]);

  useEffect(() => {
    fetchUserProfiles();
  }, [fetchUserProfiles]);

  const handleSaveProfile = async () => {
    if (!user || !user.uid) {
      setFormError("You must be logged in.");
      return;
    }
    if (profileName.trim() === '') {
      setFormError("Profile name cannot be empty.");
      return;
    }
    setIsSubmitting(true);
    setFormError(null);
    try {
      if (editingProfileId) {
        // Update existing profile
        await fbUpdateProfile(editingProfileId, { name: profileName /*, avatar: existingAvatar */ });
      } else {
        // Add new profile
        await fbAddProfile(user.uid, { name: profileName, avatar: null });
      }
      setProfileName('');
      setEditingProfileId(null);
      await fetchUserProfiles(); // Re-fetch profiles
    } catch (err) {
      console.error("Failed to save profile:", err);
      setFormError(`Failed to ${editingProfileId ? 'update' : 'add'} profile. Please try again.`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditProfile = (profile) => {
    setEditingProfileId(profile.id);
    setProfileName(profile.name);
    setFormError(null); // Clear previous form errors
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll to top to see the form
  };

  const handleCancelEdit = () => {
    setEditingProfileId(null);
    setProfileName('');
    setFormError(null);
  };

  const handleDeleteProfile = async (profileIdToDelete) => {
    if (!window.confirm("Are you sure you want to delete this profile? This action cannot be undone.")) {
      return;
    }
    setIsDeleting(profileIdToDelete); // Show loading state for this specific profile
    try {
      await fbDeleteProfile(profileIdToDelete);
      // If current profile being edited is the one deleted, reset form
      if (editingProfileId === profileIdToDelete) {
          handleCancelEdit();
      }
      await fetchUserProfiles(); // Re-fetch profiles
    } catch (err) {
      console.error("Failed to delete profile:", err);
      // Potentially show a more general error message or specific to the profile
      alert("Failed to delete profile. Please try again.");
    } finally {
      setIsDeleting(null);
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen bg-black text-white text-2xl">Loading profiles...</div>;
  }

  if (error) {
    return <div className="flex flex-col justify-center items-center min-h-screen bg-black text-white text-2xl">
        <p>{error}</p>
        <button onClick={fetchUserProfiles} className="mt-4 p-2 bg-red-600 rounded">Retry</button>
      </div>;
  }

  return (
    <div className="flex flex-col items-center pt-20 pb-12 min-h-screen bg-black text-white">
      <h1 className="text-4xl mb-8">{editingProfileId ? "Edit Profile" : "Add a New Profile"}</h1>

      <div className="mb-8 p-4 border border-gray-700 rounded-md w-full max-w-md">
        <input
          type="text"
          value={profileName}
          onChange={(e) => setProfileName(e.target.value)}
          placeholder="Profile Name"
          className="p-3 w-full bg-gray-700 text-white rounded-md mb-3"
          disabled={isSubmitting}
        />
        <div className="flex gap-2">
          <button onClick={handleSaveProfile} className="bg-red-600 p-3 rounded-md w-full hover:bg-red-700" disabled={isSubmitting}>
            {isSubmitting ? (editingProfileId ? "Saving..." : "Adding...") : (editingProfileId ? "Save Changes" : "Add Profile")}
          </button>
          {editingProfileId && (
            <button onClick={handleCancelEdit} className="bg-gray-600 p-3 rounded-md w-full hover:bg-gray-700" disabled={isSubmitting}>
              Cancel Edit
            </button>
          )}
        </div>
        {formError && <p className="text-red-500 mt-3">{formError}</p>}
      </div>

      <h2 className="text-3xl mb-6 mt-8">Existing Profiles:</h2>
      <div className="flex flex-wrap justify-center gap-4 w-full max-w-4xl">
        {profilesFromStore && profilesFromStore.length > 0 ? (
          profilesFromStore.map(profile => (
            <div key={profile.id} className="m-2 p-3 border border-gray-600 rounded-md text-center w-40 flex flex-col justify-between">
              <ProfileAvatar name={profile.name} avatar={profile.avatar} />
              <p className="mt-2 mb-3 truncate" title={profile.name}>{profile.name}</p>
              <div className="flex flex-col gap-2 mt-auto">
                <button
                  onClick={() => handleEditProfile(profile)}
                  className="text-sm bg-blue-600 hover:bg-blue-700 text-white py-1 px-2 rounded-md w-full"
                  disabled={isDeleting === profile.id || isSubmitting}
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteProfile(profile.id)}
                  className="text-sm bg-red-700 hover:bg-red-800 text-white py-1 px-2 rounded-md w-full"
                  disabled={isDeleting === profile.id || isSubmitting}
                >
                  {isDeleting === profile.id ? "Deleting..." : "Delete"}
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-400">No profiles created yet. Add one above!</p>
        )}
      </div>
      <button className="mt-12 bg-gray-500 p-3 rounded-md hover:bg-gray-600 text-lg px-8" onClick={() => navigate("/profiles/select")}>
        Done
      </button>
    </div>
  );
};
export default ManageProfiles;
