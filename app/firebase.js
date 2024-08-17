import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics, isSupported } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBeTBWYgnutpyWwB8SOQxMoVWD_R_PZze4",
    authDomain: "ai-flashcards-c61f4.firebaseapp.com",
    projectId: "ai-flashcards-c61f4",
    storageBucket: "ai-flashcards-c61f4.appspot.com",
    messagingSenderId: "56586224816",
    appId: "1:56586224816:web:48396d6e0173b862d86775",
    measurementId: "G-L60TSWVEM9"
  };

// Initialize Firebase, but only if it hasn't been initialized already
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Initialize Firebase Authentication
const auth = getAuth(app);

// Initialize Firebase Analytics if supported
if (typeof window !== "undefined" && isSupported()) {
  getAnalytics(app);
}

export { app, auth };
