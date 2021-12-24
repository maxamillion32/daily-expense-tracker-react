import {addDoc, collection, updateDoc, doc, deleteDoc, getDocs} from "@firebase/firestore";
import db from "./firebase";

const accountsRef = collection(db, "accounts");

export const getAll = async () => {
  const snapshot = await getDocs(accountsRef);
  const results = snapshot.docs.map((doc) => ({...doc.data(), id: doc.id}));
  return results;
}

export const create = async (account) => {
  const payload = {...account};
  await addDoc(accountsRef, payload);
}

export const deleteId = async (id) => {
    const docRef = doc(accountsRef, id);
    await deleteDoc(docRef);
}

export const update = async (id, title, userId) => {
  const docRef = doc(accountsRef, id);
  const payload = {title, userId};

  updateDoc(docRef, payload);
}
