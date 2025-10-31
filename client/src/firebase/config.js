// src/firebase/config.js
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyATcCu58h_Z_re0ttchUOrmZ9OOO6QTKEc",
  authDomain: "ninja-turtles-7ffbf.firebaseapp.com",
  projectId: "ninja-turtles-7ffbf",
  storageBucket: "ninja-turtles-7ffbf.firebasestorage.app",
  messagingSenderId: "537367313105",
  appId: "1:537367313105:web:051f9eccf5be7e063ca3f0",
  measurementId: "G-FFFQNNK8GP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export { app, analytics };
