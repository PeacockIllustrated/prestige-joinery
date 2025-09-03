import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics, isSupported } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyByTkpDyBIxBQdjn5wHomEZYxuMl_gnZTc",
  authDomain: "prestige-joinery.firebaseapp.com",
  projectId: "prestige-joinery",
  storageBucket: "prestige-joinery.firebasestorage.app",
  messagingSenderId: "286451323548",
  appId: "1:286451323548:web:04c3876b7c4df9907bd359",
  measurementId: "G-RL9R49GJGN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Firestore instance
export const db = getFirestore(app);

// Conditionally initialize Analytics only if it's supported in the environment.
isSupported().then((supported) => {
  if (supported) {
    getAnalytics(app);
  }
});
