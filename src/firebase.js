// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAf5tf1_obFXh4ebNWOLcMZMDj8f-BfMxI",
  authDomain: "react-todo-d0ffe.firebaseapp.com",
  projectId: "react-todo-d0ffe",
  storageBucket: "react-todo-d0ffe.appspot.com",
  messagingSenderId: "812427406626",
  appId: "1:812427406626:web:4699f6ee717a07451e097b",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
