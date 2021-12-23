import {addDoc, collection, updateDoc, doc, deleteDoc, getDocs} from "@firebase/firestore";
import db from "./firebase";
import {getAuth, onAuthStateChanged} from 'firebase/auth';

const auth = getAuth();
// let userId = '';
// console.log(`🚀 ~ file: transaction.service.js ~ line 7 ~ userId`, auth.currentUser);
// onAuthStateChanged(auth, (user) => {
//   if (user) {
//     userId = user.uid;
//   }
//   return userId
// })

const transactionsRef = collection(db, "transactions");
const categoriesRef = collection(db, "categories");
const accountsRef = collection(db, "accounts");

export const getAll = async () => {
  const snapshotTransactions = await getDocs(transactionsRef);
  const snapshotCategories = await getDocs(categoriesRef);
  const snapshotAccounts = await getDocs(accountsRef);

  let transactions = {};
  const categories = snapshotCategories.docs.map((doc) => ({...doc.data(), id: doc.id}));
  const accounts = snapshotAccounts.docs.map((doc) => ({...doc.data(), id: doc.id}));

  transactions = snapshotTransactions.docs.map((doc) => {
    transactions = {id: doc.id, ...doc.data()}
    transactions.category = categories.find((category) => category.id === transactions.categoryId);
    transactions.account = accounts.find((account) => account.id === transactions.accountId);
    return transactions;
  });
  return transactions;
}

// export const getAll = async () => {
//   const snapshotTransactions = await getDocs(transactionsRef);
//   const snapshotCategories = await getDocs(categoriesRef);
//   const snapshotAccounts = await getDocs(accountsRef);

//   let transactions = {};
//   const categories = snapshotCategories.docs.map((doc) => ({...doc.data(), id: doc.id}));
//   const accounts = snapshotAccounts.docs.map((doc) => ({...doc.data(), id: doc.id}));

//   transactions = snapshotTransactions.docs.map((doc) => {
//     transactions = {id: doc.id, ...doc.data()}
//     transactions.category = categories.find((category) => category.id === transactions.categoryId);
//     transactions.account = accounts.find((account) => account.id === transactions.accountId);
//     return transactions;
//   });
//   return transactions;
// }

export const create = async (data) => {
  const {sum, expense, date, categoryId, accountId, userId} = data;
  const payload = {sum, expense, date, categoryId, accountId, userId};
  await addDoc(transactionsRef, payload);
}

export const deleteId = async (id) => {
    const docRef = doc(transactionsRef, id);
    await deleteDoc(docRef);
}

export const update = async (id, title) => {
  const docRef = doc(transactionsRef, id);
  const payload = {title};

  updateDoc(docRef, payload);
}
