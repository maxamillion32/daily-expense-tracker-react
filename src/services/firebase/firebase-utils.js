import {
  doc, addDoc, deleteDoc,
  query, where, getDocs
} from "firebase/firestore";

const getDocData = (doc) => {
  return {id: doc.id, ...doc.data()};
};

export const getCollectionData = async (itemRef, userId) => {
  const itemQuery = query(itemRef, where("userId", "==", userId));
  const collection = await getDocs(itemQuery);

  return await collection.docs.map(getDocData);
};

export const deleteDocByCollection = (items, collection, db) => {
  return items.forEach(async(item) => {
    await deleteDoc(doc(db, collection, item.id));
  });
};

export const createBalanceCategory = async (categoriesRef, userId) => {
  const balanceForIncomes = {
    userId,
    title: "Balance",
    incomes: true,
    icon: "fa-asterisk",
    hidden: true
  };

  const balanceForExpenses = {
    userId,
    title: "Balance",
    incomes: false,
    icon: "fa-asterisk",
    hidden: true
  };

  await addDoc(categoriesRef, balanceForIncomes);
  await addDoc(categoriesRef, balanceForExpenses);
};

export const clearDB = async (userId, db, transactionsRef, categoriesRef, accountsRef) => {
  const categories = await getCollectionData(categoriesRef, userId);
  const accounts = await getCollectionData(accountsRef, userId);
  const transactions = await getCollectionData(transactionsRef, userId);

  deleteDocByCollection(categories, "categories", db);
  deleteDocByCollection(accounts, "accounts", db);
  deleteDocByCollection(transactions, "transactions", db);
  await deleteDoc(doc(db, "budgets", userId));
};
