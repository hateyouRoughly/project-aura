// src/lib/firebase.ts
import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// TODO: Replace with your Firebase project's configuration
const firebaseConfig = {
  apiKey: "AIzaSyCDfIphpNdBBn8uJGb9LpGHNUPsohpwxMs",
  authDomain: "development-24793.firebaseapp.com",
  databaseURL: "https://development-24793-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "development-24793",
  storageBucket: "development-24793.firebasestorage.app",
  messagingSenderId: "825110033154",
  appId: "1:825110033154:web:9b443d3d6e69b2d46c481b",
  measurementId: "G-4JW6Y8QPRH"
};

// Initialize Firebase
let app;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0];
}

const auth = getAuth(app);

export { auth };
