// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD65zbgh5yq_b8tms3Z1wunUQaHZ9FXB7E",
  authDomain: "gscma-4a1d7.firebaseapp.com",
  projectId: "gscma-4a1d7",
  storageBucket: "gscma-4a1d7.firebasestorage.app",
  messagingSenderId: "356742334928",
  appId: "1:356742334928:web:e30d36551a2b6377cb11d5",
  measurementId: "G-KL2TCXWS87"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export default app;