// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics"; // Analytics can be optional for this step
import { getAuth } from "firebase/auth";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  addDoc,
  serverTimestamp,
  doc,
  updateDoc,
  deleteDoc
} from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDL7tEhatDLea-yxtklovwkrfgr0kynYFc",
  authDomain: "netflixgpt-a2963.firebaseapp.com",
  projectId: "netflixgpt-a2963",
  storageBucket: "netflixgpt-a2963.appspot.com",
  messagingSenderId: "676623356201",
  appId: "1:676623356201:web:f5e45489d70a8e4439e738",
  measurementId: "G-N8NZ07ETC9" 
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app); // Analytics can be optional

export const auth = getAuth();
export const db = getFirestore(app); // Initialize Firestore

// Function to get profiles for a user
export const getProfilesForUser = async (userId) => {
  if (!userId) {
    console.error("User ID is required to fetch profiles.");
    return [];
  }
  try {
    const profilesRef = collection(db, "profiles");
    const q = query(profilesRef, where("userId", "==", userId));
    const querySnapshot = await getDocs(q);
    const profiles = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return profiles;
  } catch (error) {
    console.error("Error fetching profiles: ", error);
    throw error; // Re-throw to be caught by caller
  }
};

// Function to update an existing profile
export const updateProfile = async (profileId, profileData) => {
  if (!profileId || !profileData || !profileData.name) {
    console.error("Profile ID and name are required for update.");
    throw new Error("Profile ID and name are required for update.");
  }
  try {
    const profileRef = doc(db, "profiles", profileId);
    await updateDoc(profileRef, {
      ...profileData, // Spread the new data (e.g., name, avatar)
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    console.error("Error updating profile: ", error);
    throw error;
  }
};

// Function to delete a profile
export const deleteProfile = async (profileId) => {
  if (!profileId) {
    console.error("Profile ID is required for deletion.");
    throw new Error("Profile ID is required for deletion.");
  }
  try {
    const profileRef = doc(db, "profiles", profileId);
    await deleteDoc(profileRef);
  } catch (error) {
    console.error("Error deleting profile: ", error);
    throw error;
  }
};

// Function to add a new profile
export const addProfile = async (userId, profileData) => {
  if (!userId || !profileData || !profileData.name) {
    console.error("User ID and profile name are required.");
    throw new Error("User ID and profile name are required.");
  }
  try {
    const profilesRef = collection(db, "profiles");
    const newProfileDocRef = await addDoc(profilesRef, {
      userId: userId,
      name: profileData.name,
      avatar: profileData.avatar || null, // Default avatar if not provided
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    return { id: newProfileDocRef.id, userId, ...profileData }; // Return with ID
  } catch (error) {
    console.error("Error adding profile: ", error);
    throw error; // Re-throw to be caught by caller
  }
};