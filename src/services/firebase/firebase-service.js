import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {setUserId} from "../../reducers/user/user-slice";

import {initializeApp} from "firebase/app";
import {
  getFirestore, setDoc, doc, addDoc,
  collection, query, where, getDocs,
  deleteDoc
} from "firebase/firestore";
import {
  getAuth, createUserWithEmailAndPassword,
  onAuthStateChanged, signInWithEmailAndPassword,
  signOut, deleteUser
} from "firebase/auth";

import {categoriesForFirebase, accountsForFirebase, transactionsForFirebase} from "../mocks/mocks";
import {setIsDemoAccount} from "../../reducers/user/user-slice";

import {firebaseConfig, DEMO_ACCOUNT_LOGIN} from "./firebase-config";
import {getCollectionData, deleteDocByCollection} from "./firebase-utils";

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

  const categories = getCollectionData(snapshotCategories);
  const accounts = getCollectionData(snapshotAccounts);
  const transactions = getCollectionData(snapshotTransactions);

  deleteDocByCollection(categories, "categories", deleteDoc, doc, db);
  deleteDocByCollection(accounts, "accounts", deleteDoc, doc, db);
  deleteDocByCollection(transactions, "transactions", deleteDoc, doc, db);

  await deleteDoc(doc(db, "users", userId));
  await deleteDoc(doc(db, "budgets", userId));

  await deleteUser(user)
    .then(() => {
      alert("Successfully deleted user!");
    })
    .catch((error) => {
      alert("Error deleting user:", error);
    });
}

export async function deleteDemoAccount(userId) {
  const transactionsRef = collection(db, "transactions");
  const categoriesRef = collection(db, "categories");
  const accountsRef = collection(db, "accounts");

  const transactionsQuery = query(transactionsRef, where("userId", "==", userId));
  const categoriesQuery = query(categoriesRef, where("userId", "==", userId));
  const accountsQuery = query(accountsRef, where("userId", "==", userId));
  const snapshotTransactions = await getDocs(transactionsQuery);
  const snapshotCategories = await getDocs(categoriesQuery);
  const snapshotAccounts = await getDocs(accountsQuery);

  const categories = getCollectionData(snapshotCategories);
  const accounts = getCollectionData(snapshotAccounts);
  const transactions = getCollectionData(snapshotTransactions);

  deleteDocByCollection(categories, "categories",deleteDoc, doc, db);
  deleteDocByCollection(accounts, "accounts", deleteDoc, doc, db);
  deleteDocByCollection(transactions, "transactions", deleteDoc, doc, db);

  await deleteDoc(doc(db, "budgets", userId));
}

export async function fillDemoAccount(userId) {
  const accountsRef = collection(db, "accounts");
  const categoriesRef = collection(db, "categories");
  const transactionsRef = collection(db, "transactions");

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

  await addDoc(categoriesRef, balanceIncomes);
  await addDoc(categoriesRef, balanceExpenses);

  await accountsForFirebase.forEach(async (account) => {
    const {id, balance, startBalance, title, userId} = account;
    const payload = {balance, startBalance, title, userId};
    await setDoc(doc(accountsRef, id), payload);
  });

  await categoriesForFirebase.forEach(async (category) => {
    const {id, icon, incomes, title, userId, hidden} = category;
    const payload = {icon, incomes, title, userId, hidden};
    await setDoc(doc(categoriesRef, id), payload);
  });

  await transactionsForFirebase.forEach(async (category) => {
    const payload = {...category};
    await addDoc(transactionsRef, payload);
  });

  await addDoc(categoriesRef, balanceIncomes);
  await addDoc(categoriesRef, balanceExpenses);
}

export function useAuth() {
  const [currentUser, setCurrentUser] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const userId = user.uid;
        const userEmail = user.email;

        if (userEmail === DEMO_ACCOUNT_LOGIN) {
          dispatch(setIsDemoAccount(true));
        }

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
