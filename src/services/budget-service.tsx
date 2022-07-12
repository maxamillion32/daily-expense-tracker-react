import {addDoc, collection, setDoc, doc, deleteDoc, getDocs} from "@firebase/firestore";
import db from "./firebase/firebase-service";
import {IBudget} from "../models/models";

const budgetRef = collection(db, "budgets");

export const getAll = async (userId: string) => {
  let results;
  if (userId) {
    const snapshot = await getDocs(budgetRef);
    results = snapshot.docs.filter((doc) => doc.id === userId)
      .map((doc) => (doc.data()))
      .find((doc) => doc);
  }
  return results;
};

export const create = async (payload: IBudget) => {
  await addDoc(budgetRef, payload);
};

export const deleteId = async (id: string) => {
    const docRef = doc(budgetRef, id);
    await deleteDoc(docRef);
};

export const update = async (id: string, budget: IBudget) => {
  const docRef = doc(db, "budgets", id);
  const payload = {...budget};

  await setDoc(docRef, payload, {merge: true});
};
