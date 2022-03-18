import {addDoc, collection, setDoc, doc, deleteDoc, getDocs} from "@firebase/firestore";
import db from "./firebase.service";

const budgetRef = collection(db, "budgets");

export const getAll = async (userId) => {
  let results = [];
  if (userId) {
    const snapshot = await getDocs(budgetRef, userId);
    results = snapshot.docs.filter((doc) => doc.id === userId)
      .map((doc) => (doc.data()))
      .find((doc) => doc);
  }
  return results;
};

export const create = async (payload) => {
  // const {sum, expense, date, categoryId, accountId} = data;
  // const payload = {sum, expense, date, categoryId, accountId};
  await addDoc(budgetRef, payload);
};

export const deleteId = async (id) => {
    const docRef = doc(budgetRef, id);
    await deleteDoc(docRef);
};

export const update = async (id, budget) => {
  const docRef = doc(db, "budgets", id);
  const payload = {...budget};

  setDoc(docRef, payload, {merge:true});
};
