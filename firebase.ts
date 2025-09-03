import { initializeApp } from "firebase/app";
import { getFirestore, enableIndexedDbPersistence } from "firebase/firestore";
import { getStorage } from "firebase/storage";
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

// Initialize Firestore
const db = getFirestore(app);

// Initialize Storage
const storage = getStorage(app);

// Enable offline persistence to improve resilience against network issues.
// This allows the app to work with cached data when offline and syncs
// changes when the connection is restored.
enableIndexedDbPersistence(db)
  .catch((err) => {
    if (err.code == 'failed-precondition') {
      // This can happen if multiple tabs are open.
      console.warn('Firestore persistence failed: Multiple tabs open, persistence can only be enabled in one tab at a time.');
    } else if (err.code == 'unimplemented') {
      // The current browser does not support all of the features required to enable persistence.
      console.warn('Firestore persistence not available in this browser.');
    }
  });


// Conditionally initialize Analytics only if it's supported in the environment.
isSupported().then((supported) => {
  if (supported) {
    getAnalytics(app);
  }
});

export { db, storage };