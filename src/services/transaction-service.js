import {addDoc, collection, updateDoc, doc, deleteDoc, getDocs, query, where} from "@firebase/firestore";
import db from "./firebase/firebase-service";
import {getCollectionData} from "./firebase/firebase-utils";

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
  await addDoc(transactionsRef, data);
};

export const deleteId = async ({id, transferId}) => {
  let docRef = doc(transactionsRef, id);
  if (transferId) {
    const transactionsQuery = query(transactionsRef, where("transferId", "==", transferId));
    const snapshotTransactions = await getDocs(transactionsQuery);

    const transactions = snapshotTransactions.docs.map((doc) => ({...doc.data(), id: doc.id}));
    for (const item of transactions) {
      await deleteDoc(doc(db, "transactions", item.id));
    }
  } else {
    await deleteDoc(docRef);
  }
};

export const update = async (data) => {
  const {id, sum, expense, date, categoryId, accountId, accountFrom, accountTo, transferId, accountIdFrom, accountIdTo} = data;
  const docRef = doc(transactionsRef, id);
  let payload = {sum, expense, date, categoryId, accountId};

  if (transferId) {
    const transactionsQuery = query(transactionsRef, where("transferId", "==", transferId));
    const snapshotTransactions = await getDocs(transactionsQuery);

    const transactions = snapshotTransactions.docs.map((doc) => ({...doc.data(), id: doc.id}));

    for (const item of transactions) {
      if (item.expense === true) {
        payload = {
          sum, date, categoryId,
          accountId: accountIdFrom
        };
        await updateDoc(doc(transactionsRef, item.id), payload);
      }
      if (item.expense === false) {
        payload = {
          sum, date, categoryId,
          accountId: accountIdTo
        };
        await updateDoc(doc(transactionsRef, item.id), payload);
      }
      if (item.expense === null) {
        payload = {
          sum, date, categoryId, accountFrom, accountTo,
          accountId: accountIdTo
        };
        await updateDoc(doc(transactionsRef, item.id), payload);
      }
    }
  } else {
    await updateDoc(docRef, payload);
  }
};
