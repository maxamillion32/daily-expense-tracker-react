import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {setUserId} from "../reducers/user/user-slice";

import {initializeApp} from "firebase/app";
import {getFirestore} from "firebase/firestore";
import {setDoc, doc} from "firebase/firestore";
import {getAuth, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut} from "firebase/auth";

// Firebase configuration
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
const db = getFirestore(app);
const auth = getAuth();

export function singUp(email, password) {
  createUserWithEmailAndPassword(auth, email, password)
  .then(async(userCredential) => {
      const userId = userCredential.user.uid;
      const usersRef = doc(db, "users", userId);
      await setDoc(usersRef, {userId});
    });
}

export function login(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}

export function logout() {
  return signOut(auth);
}

//Custom Hook
export function useAuth() {
  const [currentUser, setCurrentUser] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        const userId = user.uid;
        dispatch(setUserId(userId));
      } else {
        dispatch(setUserId(null));
      }
        setCurrentUser(user);
      });
    return unsub;
// eslint-disable-next-line
  }, [])

  return currentUser;
}

export default db;
