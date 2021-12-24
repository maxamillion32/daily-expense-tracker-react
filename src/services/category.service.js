import {
  addDoc, collection,
  // updateDoc,
  setDoc, doc, deleteDoc, getDocs
} from "@firebase/firestore";
import db from "./firebase";

const categoriesRef = collection(db, "categories");

export const getAll = async () => {
  const snapshot = await getDocs(categoriesRef);
  const results = snapshot.docs.map((doc) => ({...doc.data(), id: doc.id}));
  return results;
}

export const create = async (category) => {
  const payload = {...category};
  await addDoc(categoriesRef, payload);
}

export const deleteId = async (id) => {
    const docRef = doc(categoriesRef, id);
    await deleteDoc(docRef);
}

export const update = async (id, title, userId) => {
  const docRef = doc(db, "categories", id);
  const payload = {title, userId};
  console.log(`🚀 ~ file: category.service.js ~ line 29 ~ update ~ payload`, payload);

  setDoc(docRef, payload);
}
