import {addDoc, collection, setDoc, doc, deleteDoc, getDocs} from "@firebase/firestore";
import db from "./firebase";

const budgetRef = collection(db, "budgets");

export const getAll = async () => {
  const snapshot = await getDocs(budgetRef);
  const results = snapshot.docs.map((doc) => ({[doc.id]: {...doc.data()}}));
  return results;
}

export const create = async (data) => {
  const {sum, expense, date, categoryId, accountId} = data;
  const payload = {sum, expense, date, categoryId, accountId};
  await addDoc(budgetRef, payload);
}

export const deleteId = async (id) => {
    const docRef = doc(budgetRef, id);
    await deleteDoc(docRef);
}

export const update = async (id, budget) => {
  const docRef = doc(db, "budgets", id);
  const payload = {...budget};

  setDoc(docRef, payload, {merge:true});
}
