import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAqlB8ljjms3mTNiVNaC5qGstjvNBBibPM",
  authDomain: "fir-react-8c561.firebaseapp.com",
  projectId: "fir-react-8c561",
  storageBucket: "fir-react-8c561.appspot.com",
  messagingSenderId: "204711660296",
  appId: "1:204711660296:web:ef683a93e6fd2b2ce2babd",
  measurementId: "G-CSQ93LW8JY",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();

export { app,auth }