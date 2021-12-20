// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA-jcEb53c4muML3hfX3HA7WYvqCSwBNNY",
  authDomain: "expense-tracker-4e13a.firebaseapp.com",
  projectId: "expense-tracker-4e13a",
  storageBucket: "expense-tracker-4e13a.appspot.com",
  messagingSenderId: "65016479636",
  appId: "1:65016479636:web:8b455fad8e8c1b1c791981"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default getFirestore();
