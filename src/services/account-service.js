import {addDoc, setDoc, collection, updateDoc, doc, deleteDoc, getDocs, query, where} from "@firebase/firestore";
import db from "./firebase/firebase-service";

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

const accounts = [
    {
        "id": "CknNK0lyxWDYVd3AYko3",
        "title": "N26",
        "balance": "639.66",
        "startBalance": "152.66",
        "userId": "F3fNhbY88QZ5Dow6Zd1xlC2gm5w2"
    },
    {
        "startBalance": "450.38",
        "title": "Cash",
        "id": "vI7VZRiqCCxqJEhJvqXH",
        "balance": "159.09",
        "userId": "F3fNhbY88QZ5Dow6Zd1xlC2gm5w2"
    }
];

export const copyAccounts = async () => {
  accounts.forEach(async(account) => {
    const payload = {...account};
    await setDoc(doc(accountsRef, account.id), payload);
  });
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
