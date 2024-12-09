// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAOrScNP4p_I7jjiBrBGQ7cpta0VEvjJ2w",
  authDomain: "reactchat-7091b.firebaseapp.com",
  projectId: "reactchat-7091b",
  storageBucket: "reactchat-7091b.firebasestorage.app",
  messagingSenderId: "249162328082",
  appId: "1:249162328082:web:1b9f74c266d8f9504310cb",
  measurementId: "G-CPYCJ12PKM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export{db, };