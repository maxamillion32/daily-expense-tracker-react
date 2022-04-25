import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {setUserId} from "../reducers/user/user-slice";

import {initializeApp} from "firebase/app";
import {getFirestore, setDoc, doc, addDoc, collection, query, where, getDocs, deleteDoc} from "firebase/firestore";
import {getAuth, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, deleteUser} from "firebase/auth";

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
    const categoriesRef = collection(db, "categories");

    const balanceIncomes = {
      userId,
      title: "Balance",
      incomes: true,
      icon: "fa-asterisk",
      hidden: true
    };
    const balanceExpenses = {
      userId,
      title: "Balance",
      incomes: false,
      icon: "fa-asterisk",
      hidden: true
    };

    await setDoc(usersRef, {userId});
    await addDoc(categoriesRef, balanceIncomes);
    await addDoc(categoriesRef, balanceExpenses);
  });
}

export function login(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}

export function logout() {
  return signOut(auth);
}

export async function deleteUserByID(userId) {
  const user = auth.currentUser;

  const transactionsRef = collection(db, "transactions");
  const categoriesRef = collection(db, "categories");
  const accountsRef = collection(db, "accounts");

  const transactionsQuery = query(transactionsRef, where("userId", "==", userId));
  const categoriesQuery = query(categoriesRef, where("userId", "==", userId));
  const accountsQuery = query(accountsRef, where("userId", "==", userId));
  const snapshotTransactions = await getDocs(transactionsQuery);
  const snapshotCategories = await getDocs(categoriesQuery);
  const snapshotAccounts = await getDocs(accountsQuery);

  const categories = snapshotCategories.docs.map((doc) => ({...doc.data(), id: doc.id}));
  const accounts = snapshotAccounts.docs.map((doc) => ({...doc.data(), id: doc.id}));
  const transactions = snapshotTransactions.docs.map((doc) => ({...doc.data(), id: doc.id}));

  await categories.forEach(async(category) => {
    await deleteDoc(doc(db, "categories", category.id));
  });

  await accounts.forEach(async(account) => {
    await deleteDoc(doc(db, "accounts", account.id));
  });

  await transactions.forEach(async(transaction) => {
    await deleteDoc(doc(db, "transactions", transaction.id));
  });

  await deleteDoc(doc(db, "users", userId));
  await deleteDoc(doc(db, "budgets", userId));

  await deleteUser(user)
    .then(() => {
      alert("Successfully deleted user!");
    })
    .catch((error) => {
      console.log("Error deleting user:", error);
    });
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
