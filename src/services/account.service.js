import {addDoc, collection, updateDoc, doc, deleteDoc, getDocs, query, where} from "@firebase/firestore";
import db from "./firebase.service";

const accountsRef = collection(db, "accounts");

export const getAll = async (userId) => {
  let results = [];
  if (userId) {
    const q = query(accountsRef, where("userId", "==", userId));
    const snapshot = await getDocs(q);
    results = snapshot.docs.map((doc) => ({...doc.data(), id: doc.id}));
  }
  return results;
};

export const create = async (account) => {
  const payload = {...account};
  await addDoc(accountsRef, payload);
};

export const deleteId = async (id) => {
    const docRef = doc(accountsRef, id);
    await deleteDoc(docRef);
};

export const update = async (id, title, userId, startBalance, balance) => {
  const docRef = doc(accountsRef, id);
  const payload = {title, userId, startBalance, balance};

  updateDoc(docRef, payload);
};
