import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {setUserId} from "../reducers/user/user-slice";

import {initializeApp} from "firebase/app";
import {getFirestore} from "firebase/firestore";
import {setDoc, doc} from "firebase/firestore";
import {getAuth, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut} from "firebase/auth";

const API_KEY = process.env.REACT_APP_API_KEY;
const APP_ID = process.env.REACT_APP_ID;
const MESSAGING_SENDER_ID = process.env.REACT_APP_MESSAGING_SENDER_ID;
const AUTH_DOMAIN = process.env.REACT_APP_AUTH_DOMAIN;
const PROJECT_ID = process.env.REACT_APP_PROJECT_ID;
const STORAGE_BUCKET = process.env.REACT_APP_STORAGE_BUCKET;

const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: AUTH_DOMAIN,
  projectId: PROJECT_ID,
  storageBucket: STORAGE_BUCKET,
  messagingSenderId: MESSAGING_SENDER_ID,
  appId: APP_ID
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();

export async function singUp(email, password) {
  await createUserWithEmailAndPassword(auth, email, password)
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

export function useAuth() {
  const [currentUser, setCurrentUser] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const userId = user.uid;
        dispatch(setUserId(userId));
      } else {
        dispatch(setUserId(null));
      }
        setCurrentUser(user);
    });
  }, []);

  return currentUser;
}

export default db;
