// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

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
const analytics = getAnalytics(app);

export const auth = getAuth();