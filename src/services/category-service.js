import {addDoc, collection, setDoc, doc, deleteDoc, getDocs, query, where} from "@firebase/firestore";
import db from "./firebase/firebase-service";

const categoriesRef = collection(db, "categories");

export const getAll = async (userId) => {
  let results = [];
  if (userId) {
    const q = query(categoriesRef, where("userId", "==", userId));
    const snapshot = await getDocs(q);
    results = snapshot.docs.map((doc) => ({...doc.data(), id: doc.id}));
  }
  return results;
};

// const categories = [
//     {
//         "incomes": false,
//         "title": "Shops",
//         "userId": "F3fNhbY88QZ5Dow6Zd1xlC2gm5w2",
//         "id": "8rS6pO164e3PZUbsd7JQ",
//         "icon": "fa-shopping-bag"
//     },
//     {
//         "id": "8vfHBz0wyDFG0fq1iF8C",
//         "incomes": true,
//         "userId": "F3fNhbY88QZ5Dow6Zd1xlC2gm5w2",
//         "icon": "fa-briefcase",
//         "title": "Salary"
//     },
//     {
//         "hidden": true,
//         "title": "Balance",
//         "icon": "fa-asterisk",
//         "incomes": true,
//         "userId": "F3fNhbY88QZ5Dow6Zd1xlC2gm5w2",
//         "id": "9oCIYOhZxiX4Gs3RYLJP"
//     },
//     {
//         "icon": "fa-graduation-cap",
//         "incomes": false,
//         "title": "Umschulung",
//         "userId": "F3fNhbY88QZ5Dow6Zd1xlC2gm5w2",
//         "id": "ECzqAGdfGoyrWZPgbvW1"
//     },
//     {
//         "userId": "F3fNhbY88QZ5Dow6Zd1xlC2gm5w2",
//         "icon": "fa-home",
//         "header": "Categories",
//         "title": "Household",
//         "id": "EvQv3el9EOjJWhCTkHe5",
//         "incomes": false
//     },
//     {
//         "id": "H8wFykC5sU6jgrw1VF7H",
//         "incomes": false,
//         "userId": "F3fNhbY88QZ5Dow6Zd1xlC2gm5w2",
//         "title": "Cafe",
//         "icon": "fa-coffee"
//     },
//     {
//         "id": "JdSclhcjOMiEht0FJnVk",
//         "title": "Credit",
//         "userId": "F3fNhbY88QZ5Dow6Zd1xlC2gm5w2",
//         "icon": "fa-hand-holding-usd",
//         "incomes": false
//     },
//     {
//         "id": "KzGwUDZLr3RQO04z8fDB",
//         "title": "Barbershop",
//         "icon": "fa-cut",
//         "userId": "F3fNhbY88QZ5Dow6Zd1xlC2gm5w2",
//         "incomes": false
//     },
//     {
//         "incomes": false,
//         "title": "OnlineBox",
//         "icon": "fa-graduation-cap",
//         "hidden": false,
//         "userId": "F3fNhbY88QZ5Dow6Zd1xlC2gm5w2",
//         "id": "RdSQfEpq4HSjtoOzrdkl"
//     },
//     {
//         "icon": "fa-envelope",
//         "userId": "F3fNhbY88QZ5Dow6Zd1xlC2gm5w2",
//         "hidden": false,
//         "id": "Sh2UZDzQPRa5BDMu4SQL",
//         "incomes": false,
//         "title": "Post"
//     },
//     {
//         "incomes": false,
//         "userId": "F3fNhbY88QZ5Dow6Zd1xlC2gm5w2",
//         "id": "aTkFZTiOoJvpLaQvtoWf",
//         "title": "Invoices/Apartment",
//         "icon": "fa-bath"
//     },
//     {
//         "id": "dfYxF6WORZwWX0TCXyRV",
//         "incomes": true,
//         "icon": "fa-asterisk",
//         "title": "Other",
//         "userId": "F3fNhbY88QZ5Dow6Zd1xlC2gm5w2"
//     },
//     {
//         "title": "Nina",
//         "userId": "F3fNhbY88QZ5Dow6Zd1xlC2gm5w2",
//         "icon": "fa-cat",
//         "hidden": false,
//         "incomes": false,
//         "id": "eynHxsAnWkZUCWmC0AIw"
//     },
//     {
//         "userId": "F3fNhbY88QZ5Dow6Zd1xlC2gm5w2",
//         "startBalance": "",
//         "header": "Categories",
//         "incomes": false,
//         "id": "i6KpRfIY0SQc4sDhoPAp",
//         "balance": "",
//         "icon": "fa-gifts",
//         "title": "Gifts"
//     },
//     {
//         "id": "nKOK7jOU01fGpd70etw9",
//         "incomes": false,
//         "title": "Public transport",
//         "userId": "F3fNhbY88QZ5Dow6Zd1xlC2gm5w2",
//         "icon": "fa-subway"
//     },
//     {
//         "userId": "F3fNhbY88QZ5Dow6Zd1xlC2gm5w2",
//         "startBalance": "",
//         "title": "Supermarket",
//         "id": "sfu9XxfjI1bg8kMIpb4Z",
//         "header": "Categories",
//         "icon": "fa-shopping-cart",
//         "balance": "",
//         "incomes": false
//     },
//     {
//         "incomes": false,
//         "id": "yNw8Q21h5OhXNs0JiyzD",
//         "icon": "fa-asterisk",
//         "title": "Balance",
//         "userId": "F3fNhbY88QZ5Dow6Zd1xlC2gm5w2",
//         "hidden": true
//     }
// ];

// export const copyCategories = async () => {
//   categories.forEach(async(category) => {
//     const payload = {...category};
//     await setDoc(doc(categoriesRef, category.id), payload);
//   });
// };

export const create = async (category) => {
  const payload = {...category};
  await addDoc(categoriesRef, payload);
};

export const deleteId = async (id) => {
  const docRef = doc(categoriesRef, id);
  await deleteDoc(docRef);
};

export const update = async (id, data) => {
  // const id = data.id
  const docRef = doc(db, "categories", id);
  const payload = {...data};

  setDoc(docRef, payload, {merge:true});
};
