import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';

import {
  // loadTransactions,
  selectFilteredTransactions,
  selectAllTransactionsState,
  showButton,
  loadTransactions
} from '../../reducers/transactions/transactions-slice'

import Search from '../../components/Search/Search';
import Balance from '../../components/Balance/Balance';
import TransactionsListContainer from '../../components/Transactions/List/ListContainer';
// import { transactions } from '../../services/mocks/mocks';

// import { addDoc, collection, onSnapshot, updateDoc, doc, deleteDoc, query, where, getDocs, serverTimestamp, orderBy } from "@firebase/firestore";
// import db from "../../services/firebase";

export const TransactionsContext = React.createContext();

function Transactions() {
  const allTransactions = useSelector(selectAllTransactionsState);
  const filteredTransactions = useSelector(selectFilteredTransactions);
  const dispatch = useDispatch();

  //
  // let [loadedTransactions, setLoadedTransactions] = useState([{sum: "Loading..."}]);
  // let [loadedCategories, setCategories] = useState([{sum: "Loading..."}]);
  // const [transactions, setTransactions] = useState([{sum: "Loading..."}]);
  // const [categories, setCategories] = useState([{sum: "Loading..."}]);
  // const [newTransactions, setNewTransactions] = useState([{sum: "Loading..."}]);
  // console.log(`🚀 ~ file: Transactions.js ~ line 32 ~ Transactions ~ newTransactions`, newTransactions);
  // console.log(`🚀 ~ file: Transactions.js ~ line 31 ~ Transactions ~ categories`, categories);
  // console.log(`🚀 ~ file: App.js ~ line 18 ~ App ~ transactions`, transactions);

  // useEffect(() => {
    // const collectionRef = collection(db, "transactions");
    // const categoriesRef = collection(db, "categories");
    // const q = query(collectionRef, orderBy("timestamp", "desc"));

    // const unSub = onSnapshot(q, (snapshot) => {
    //   setTransactions(snapshot.docs.map((doc) => ({...doc.data(), id: doc.id})));
    // })

    // const categories = onSnapshot(categoriesRef, (snapshot) => {
    //   setCategories(snapshot.docs.map((doc) => ({...doc.data(), id: doc.id})));
    // })

    // const q1 = query(collectionRef, where("categoryId", "==", "5CYunawkGh4ooEy5yis6"));
    // // const snapshot = await getDocs(q1);

    // const categories1 = onSnapshot(q1, (snapshot) => {
    //   setNewTransactions(snapshot.docs.map((doc) => ({...doc.data(), id: doc.id, category: {id: "5CYunawkGh4ooEy5yis6", title: "Salary"}})));
    // })

  //   let transactions = []
  //   let categories = {}
  //   const unSub = onSnapshot(collection(db, 'categories'), async (results) => {
  //     results.forEach((doc) => {
  //       categories = {...doc.data(), id: doc.id};
  //       return categories;
  //     });
  //     onSnapshot(collection(db, 'transactions'), orderBy('timestamp', 'desc'), async (docSnaps) => {
  //       docSnaps.forEach((doc) => {
  //         transactions[doc.id] = {...doc.data(), id: doc.id};
  //         const category = categories.id === doc.data().categoryId ? categories : null
  //         transactions[doc.id].category = category;
  //         return transactions;
  //       });
  //       return setLoadedTransactions(transactions);
  //     });
  //   })

  //   return [unSub];
  // }, []);

  // const handleNew = async () => {
  //   const sum = +prompt('Enter a sum');
  //   const categoryId = +prompt('Enter a category id');

  //   const collectionRef = collection(db, "transactions");
  //   const payload = { sum, expense: true, categoryId, timestamp: serverTimestamp()};
  //   await addDoc(collectionRef, payload);
  // }

  // const handleEdit = async (id) => {
  //   const sum = +prompt('Enter a sum');
  //   const categoryId = +prompt('Enter a category id');

  //   const docRef = doc(db, "transactions", id);
  //   const payload = { sum, expense: true, categoryId, timestamp: serverTimestamp()};

  //   updateDoc(docRef, payload);
  // }

  // const handleDelete = async (id) => {
  //   const docRef = doc(db, "transactions", id);

  //   deleteDoc(docRef);
  // }

  // const handleQueryDelete = async () => {
  //   const userInputSum = +prompt('Enter a userInputName');

  //   const collectionRef = collection(db, "transactions");
  //   const q = query(collectionRef, where("sum", "==", userInputSum));
  //   const snapshot = await getDocs(q);

  //   const results = snapshot.docs.map((doc) => ({...doc.data(), id: doc.id}));

  //   results.forEach(async (result) => {
  //     const docRef = doc(db, "transactions", result.id);
  //     await deleteDoc(docRef);
  //   })
  // }
  //

  useEffect(() => {
    dispatch(showButton());
    dispatch(loadTransactions());
    return () => {
      dispatch(showButton());
    };
    // eslint-disable-next-line
  }, []);

  return (
    <>
      {/* <ul style={{zIndex: 1000}}>
        <button onClick={handleNew}>
          New
        </button>
        <button onClick={handleQueryDelete}>
          Multiplay delete
        </button>
          {transactions.map((transaction) => (
            <li key={transaction.id}>
              <button onClick={() => handleEdit(transaction.id)}>
                Edit
              </button>
              <button onClick={() => handleDelete(transaction.id)}>
                Delete
              </button>
              <p>{transaction.sum}</p>
              <p>{transaction.categoryId}</p>
            </li>
          ))}
      </ul> */}
      <Balance transactions={allTransactions} />
      <Search />
      <TransactionsContext.Provider value={filteredTransactions}>
        <TransactionsListContainer />
      </TransactionsContext.Provider>
    </>
  );
}

export default Transactions;
