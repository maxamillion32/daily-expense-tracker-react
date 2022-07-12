import {addDoc, collection, setDoc, doc, deleteDoc, getDocs, query, where} from "@firebase/firestore";
import db from "./firebase/firebase-service";
import {ICategory} from "../models/models";

const categoriesRef = collection(db, "categories");

export const getAll = async (userId: string) => {
  //TODO: fix that
  let results: { id: string; }[] = [];
  if (userId) {
    const q = query(categoriesRef, where("userId", "==", userId));
    const snapshot = await getDocs(q);
    results = snapshot.docs.map((doc) => ({...doc.data(), id: doc.id}));
  }
  return results;
};

export const create = async (category: ICategory) => {
  const payload = {...category};
  await addDoc(categoriesRef, payload);
};

export const deleteId = async (id: string) => {
  const docRef = doc(categoriesRef, id);
  await deleteDoc(docRef);
};

export const update = async (id: string, data: ICategory) => {
  const docRef = doc(db, "categories", id);
  const payload = {...data};

  await setDoc(docRef, payload, {merge: true});
};
