import {addDoc, collection, updateDoc, doc, deleteDoc, getDocs, query, where} from "@firebase/firestore";
import db from "./firebase.service";

const transactionsRef = collection(db, "transactions");
const categoriesRef = collection(db, "categories");
const accountsRef = collection(db, "accounts");

export const getAll = async (userId) => {
  let transactions = [];
  if (userId) {
    const transactionsQuery = query(transactionsRef, where("userId", "==", userId));
    const categoriesQuery = query(categoriesRef, where("userId", "==", userId));
    const accountsQuery = query(accountsRef, where("userId", "==", userId));
    const snapshotTransactions = await getDocs(transactionsQuery);
    const snapshotCategories = await getDocs(categoriesQuery);
    const snapshotAccounts = await getDocs(accountsQuery);

    const categories = snapshotCategories.docs.map((doc) => ({...doc.data(), id: doc.id}));
    const accounts = snapshotAccounts.docs.map((doc) => ({...doc.data(), id: doc.id}));

    transactions = snapshotTransactions.docs.map((doc) => {
      transactions = {id: doc.id, ...doc.data()};
      transactions.category = categories.find((category) => category.id === transactions.categoryId);
      transactions.account = accounts.find((account) => account.id === transactions.accountId);
      return transactions;
    });
  }
  return transactions;
};

export const create = async (data) => {
  const {sum, expense, date, categoryId, accountId, showInBalance, userId} = data;
  const payload = {sum, expense, date, categoryId, accountId, showInBalance, userId};
  await addDoc(transactionsRef, payload);
};

export const deleteId = async (id) => {
    const docRef = doc(transactionsRef, id);
    await deleteDoc(docRef);
};

export const update = async (data) => {
  const {id, sum, expense, date, categoryId, accountId} = data;
  const docRef = doc(transactionsRef, id);
  const payload = {sum, expense, date, categoryId, accountId};

  updateDoc(docRef, payload);
};
