import {addDoc, collection, updateDoc, doc, deleteDoc, getDocs, query, where} from "@firebase/firestore";
import db from "./firebase/firebase-service";
import {IAccount} from "../models/models";

const accountsRef = collection(db, "accounts");

export const getAll = async (userId: string) => {
  //TODO: fix that
  let results: {id: string;}[] = [];
  if (userId) {
    const q = query(accountsRef, where("userId", "==", userId));
    const snapshot = await getDocs(q);
    results = snapshot.docs.map((doc) => ({...doc.data(), id: doc.id}));
  }
  return results;
};

export const create = async (account: IAccount) => {
  const payload = {...account};
  await addDoc(accountsRef, payload);
};

export const deleteId = async (id: string) => {
    const docRef = doc(accountsRef, id);
    await deleteDoc(docRef);
};

export const update = async (id: string, title: string, userId: string, startBalance: number, balance: number) => {
  const docRef = doc(accountsRef, id);
  const payload = {title, userId, startBalance, balance};

  await updateDoc(docRef, payload);
};
