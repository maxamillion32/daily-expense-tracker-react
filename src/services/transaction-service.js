import {addDoc, setDoc, collection, updateDoc, doc, deleteDoc, getDocs, query, where} from "@firebase/firestore";
import db from "./firebase/firebase-service";

const transactionsRef = collection(db, "transactions");
const categoriesRef = collection(db, "categories");
const accountsRef = collection(db, "accounts");

export const getAll = async (userId) => {
  let transactions = [];
  if (userId) {
    const transactionsQuery = query(transactionsRef, where("userId", "==", userId));
    const categoriesQuery = query(categoriesRef, where("userId", "==", userId));
    const accountsQuery = query(accountsRef, where("userId", "==", userId));
    const snapshotTransactions = await getDocs(transactionsQuery);
    const snapshotCategories = await getDocs(categoriesQuery);
    const snapshotAccounts = await getDocs(accountsQuery);

    const categories = snapshotCategories.docs.map((doc) => ({...doc.data(), id: doc.id}));
    const accounts = snapshotAccounts.docs.map((doc) => ({...doc.data(), id: doc.id}));

    transactions = snapshotTransactions.docs.map((doc) => {
      transactions = {id: doc.id, ...doc.data()};
      transactions.category = categories.find((category) => category.id === transactions.categoryId);
      transactions.account = accounts.find((account) => account.id === transactions.accountId);
      return transactions;
    });
  }
  return transactions;
};

// const transactions = [
//     {
//         "userId": "F3fNhbY88QZ5Dow6Zd1xlC2gm5w2",
//         "sum": 25,
//         "date": "2022-02-09",
//         "expense": true,
//         "accountId": "CknNK0lyxWDYVd3AYko3",
//         "categoryId": "aTkFZTiOoJvpLaQvtoWf",
//         "id": "0SNl28MEBDGR9yQYxNVf"
//     },
//     {
//         "date": "2022-05-19",
//         "sum": 39.99,
//         "userId": "F3fNhbY88QZ5Dow6Zd1xlC2gm5w2",
//         "showInBalance": true,
//         "categoryId": "aTkFZTiOoJvpLaQvtoWf",
//         "accountId": "CknNK0lyxWDYVd3AYko3",
//         "expense": true,
//         "id": "0tuZ9zeZW1lb1Jq5wlVn"
//     },
//     {
//         "expense": true,
//         "accountId": "CknNK0lyxWDYVd3AYko3",
//         "userId": "F3fNhbY88QZ5Dow6Zd1xlC2gm5w2",
//         "sum": 0.7,
//         "categoryId": "ECzqAGdfGoyrWZPgbvW1",
//         "showInBalance": true,
//         "date": "2022-05-13",
//         "id": "113WJ8SC3c92kcDvq1jm"
//     },
//     {
//         "userId": "F3fNhbY88QZ5Dow6Zd1xlC2gm5w2",
//         "accountId": "CknNK0lyxWDYVd3AYko3",
//         "expense": true,
//         "date": "2022-06-08",
//         "categoryId": "ECzqAGdfGoyrWZPgbvW1",
//         "showInBalance": true,
//         "sum": 1.58,
//         "id": "13br8r6NJZhFSQPwmipJ"
//     },
//     {
//         "date": "2022-05-31",
//         "userId": "F3fNhbY88QZ5Dow6Zd1xlC2gm5w2",
//         "accountId": "CknNK0lyxWDYVd3AYko3",
//         "expense": true,
//         "showInBalance": true,
//         "sum": 24.25,
//         "categoryId": "JdSclhcjOMiEht0FJnVk",
//         "id": "14vqFehPIAWx6xNikYZS"
//     },
//     {
//         "categoryId": "H8wFykC5sU6jgrw1VF7H",
//         "userId": "F3fNhbY88QZ5Dow6Zd1xlC2gm5w2",
//         "showInBalance": true,
//         "accountId": "CknNK0lyxWDYVd3AYko3",
//         "date": "2022-04-09",
//         "sum": 0.5,
//         "expense": true,
//         "id": "1FtzpYBQPLnuJrc74VMV"
//     },
//     {
//         "sum": 16.06,
//         "date": "2022-06-02",
//         "accountId": "CknNK0lyxWDYVd3AYko3",
//         "categoryId": "sfu9XxfjI1bg8kMIpb4Z",
//         "showInBalance": true,
//         "userId": "F3fNhbY88QZ5Dow6Zd1xlC2gm5w2",
//         "expense": true,
//         "id": "1KMWlHfgRodNKdLjnyb7"
//     },
//     {
//         "expense": true,
//         "userId": "F3fNhbY88QZ5Dow6Zd1xlC2gm5w2",
//         "date": "2022-03-25",
//         "accountId": "CknNK0lyxWDYVd3AYko3",
//         "categoryId": "EvQv3el9EOjJWhCTkHe5",
//         "sum": 2.95,
//         "id": "1LN7SOwUTsHzkjxpHv27"
//     },
//     {
//         "accountId": "CknNK0lyxWDYVd3AYko3",
//         "date": "2022-02-21",
//         "expense": true,
//         "userId": "F3fNhbY88QZ5Dow6Zd1xlC2gm5w2",
//         "sum": 13.87,
//         "categoryId": "sfu9XxfjI1bg8kMIpb4Z",
//         "id": "1rWvpfFZWaj1iGclOuBo"
//     },
//     {
//         "userId": "F3fNhbY88QZ5Dow6Zd1xlC2gm5w2",
//         "expense": true,
//         "date": "2022-03-21",
//         "accountId": "CknNK0lyxWDYVd3AYko3",
//         "sum": 2.94,
//         "categoryId": "EvQv3el9EOjJWhCTkHe5",
//         "id": "1wwoLTsyAoc6438OzC8z"
//     },
//     {
//         "expense": true,
//         "date": "2022-02-01",
//         "sum": 27.5,
//         "accountId": "CknNK0lyxWDYVd3AYko3",
//         "categoryId": "nKOK7jOU01fGpd70etw9",
//         "userId": "F3fNhbY88QZ5Dow6Zd1xlC2gm5w2",
//         "id": "23yQVUHpo2UjDR8r6nQQ"
//     },
//     {
//         "date": "2022-02-21",
//         "sum": 32.98,
//         "accountId": "CknNK0lyxWDYVd3AYko3",
//         "userId": "F3fNhbY88QZ5Dow6Zd1xlC2gm5w2",
//         "categoryId": "aTkFZTiOoJvpLaQvtoWf",
//         "expense": true,
//         "id": "2VstlUsqX0VZBs91eWwp"
//     },
//     {
//         "expense": true,
//         "userId": "F3fNhbY88QZ5Dow6Zd1xlC2gm5w2",
//         "accountId": "vI7VZRiqCCxqJEhJvqXH",
//         "date": "2022-05-13",
//         "categoryId": "H8wFykC5sU6jgrw1VF7H",
//         "showInBalance": true,
//         "sum": 3.3,
//         "id": "2a185rBuuvFenn7tjKjq"
//     },
//     {
//         "expense": true,
//         "userId": "F3fNhbY88QZ5Dow6Zd1xlC2gm5w2",
//         "accountId": "CknNK0lyxWDYVd3AYko3",
//         "categoryId": "sfu9XxfjI1bg8kMIpb4Z",
//         "date": "2022-06-10",
//         "showInBalance": true,
//         "sum": 13.1,
//         "id": "2tpT8CNzrOWGGyzG2Siv"
//     },
//     {
//         "userId": "F3fNhbY88QZ5Dow6Zd1xlC2gm5w2",
//         "sum": 14.79,
//         "date": "2022-01-10",
//         "categoryId": "sfu9XxfjI1bg8kMIpb4Z",
//         "accountId": "CknNK0lyxWDYVd3AYko3",
//         "expense": true,
//         "id": "3BagtcmCcddftdi1R56O"
//     },
//     {
//         "date": "2022-01-04",
//         "expense": true,
//         "categoryId": "sfu9XxfjI1bg8kMIpb4Z",
//         "userId": "F3fNhbY88QZ5Dow6Zd1xlC2gm5w2",
//         "accountId": "CknNK0lyxWDYVd3AYko3",
//         "sum": 10.87,
//         "id": "3WuiInCK056XqS6dqGF9"
//     },
//     {
//         "userId": "F3fNhbY88QZ5Dow6Zd1xlC2gm5w2",
//         "sum": 16,
//         "date": "2022-05-09",
//         "expense": false,
//         "accountId": "vI7VZRiqCCxqJEhJvqXH",
//         "categoryId": "9oCIYOhZxiX4Gs3RYLJP",
//         "showInBalance": false,
//         "id": "4NI0YMqhU6II7ZtQatxY"
//     },
//     {
//         "accountId": "CknNK0lyxWDYVd3AYko3",
//         "showInBalance": false,
//         "date": "2022-05-09",
//         "categoryId": "9oCIYOhZxiX4Gs3RYLJP",
//         "userId": "F3fNhbY88QZ5Dow6Zd1xlC2gm5w2",
//         "sum": 15.99,
//         "expense": true,
//         "id": "4VO3eHeJMR07iS93lcRH"
//     },
//     {
//         "sum": 0.7,
//         "showInBalance": true,
//         "expense": true,
//         "accountId": "CknNK0lyxWDYVd3AYko3",
//         "userId": "F3fNhbY88QZ5Dow6Zd1xlC2gm5w2",
//         "categoryId": "ECzqAGdfGoyrWZPgbvW1",
//         "date": "2022-06-01",
//         "id": "4zhImS7XnJtHhaGBmmyM"
//     },
//     {
//         "categoryId": "8rS6pO164e3PZUbsd7JQ",
//         "expense": true,
//         "accountId": "CknNK0lyxWDYVd3AYko3",
//         "date": "2021-12-07",
//         "sum": 57,
//         "userId": "F3fNhbY88QZ5Dow6Zd1xlC2gm5w2",
//         "id": "5VncvlhJkq0j8xwbQz4r"
//     },
//     {
//         "sum": 0.7,
//         "categoryId": "ECzqAGdfGoyrWZPgbvW1",
//         "showInBalance": true,
//         "expense": true,
//         "userId": "F3fNhbY88QZ5Dow6Zd1xlC2gm5w2",
//         "date": "2022-05-17",
//         "accountId": "CknNK0lyxWDYVd3AYko3",
//         "id": "5l73KfQiZvtcjQM5FJbY"
//     },
//     {
//         "accountId": "CknNK0lyxWDYVd3AYko3",
//         "showInBalance": true,
//         "userId": "F3fNhbY88QZ5Dow6Zd1xlC2gm5w2",
//         "sum": 12.08,
//         "date": "2022-06-07",
//         "expense": true,
//         "categoryId": "sfu9XxfjI1bg8kMIpb4Z",
//         "id": "5nEsLmTANLvwSyxFWXPF"
//     },
//     {
//         "userId": "F3fNhbY88QZ5Dow6Zd1xlC2gm5w2",
//         "sum": 0.99,
//         "categoryId": "H8wFykC5sU6jgrw1VF7H",
//         "date": "2022-01-11",
//         "expense": true,
//         "accountId": "CknNK0lyxWDYVd3AYko3",
//         "id": "6U5EFRxfoyuZI1I0P9HG"
//     },
//     {
//         "userId": "F3fNhbY88QZ5Dow6Zd1xlC2gm5w2",
//         "date": "2022-04-10",
//         "expense": false,
//         "showInBalance": true,
//         "accountId": "vI7VZRiqCCxqJEhJvqXH",
//         "categoryId": "dfYxF6WORZwWX0TCXyRV",
//         "sum": 30,
//         "id": "6eyd1OrlqAlGh6Hjcqjp"
//     },
//     {
//         "date": "2022-01-18",
//         "accountId": "CknNK0lyxWDYVd3AYko3",
//         "sum": 12.4,
//         "categoryId": "EvQv3el9EOjJWhCTkHe5",
//         "expense": true,
//         "userId": "F3fNhbY88QZ5Dow6Zd1xlC2gm5w2",
//         "id": "6ouo0iv6zZNfqtAyelYP"
//     },
//     {
//         "sum": 5,
//         "userId": "F3fNhbY88QZ5Dow6Zd1xlC2gm5w2",
//         "accountId": "vI7VZRiqCCxqJEhJvqXH",
//         "date": "2022-03-29",
//         "categoryId": "H8wFykC5sU6jgrw1VF7H",
//         "showInBalance": true,
//         "expense": true,
//         "id": "79ANFhohYJKuOf7rDTRB"
//     },
//     {
//         "sum": 8.4,
//         "accountId": "CknNK0lyxWDYVd3AYko3",
//         "categoryId": "sfu9XxfjI1bg8kMIpb4Z",
//         "userId": "F3fNhbY88QZ5Dow6Zd1xlC2gm5w2",
//         "expense": true,
//         "date": "2022-02-24",
//         "id": "7XbxDbU3TbDCJxLyN7T8"
//     },
//     {
//         "userId": "F3fNhbY88QZ5Dow6Zd1xlC2gm5w2",
//         "expense": true,
//         "date": "2022-04-26",
//         "showInBalance": true,
//         "categoryId": "ECzqAGdfGoyrWZPgbvW1",
//         "accountId": "CknNK0lyxWDYVd3AYko3",
//         "sum": 0.7,
//         "id": "8FHif98SLnDYDD3GaQac"
//     },
//     {
//         "showInBalance": true,
//         "categoryId": "ECzqAGdfGoyrWZPgbvW1",
//         "date": "2022-04-06",
//         "userId": "F3fNhbY88QZ5Dow6Zd1xlC2gm5w2",
//         "accountId": "CknNK0lyxWDYVd3AYko3",
//         "sum": 5.9,
//         "expense": true,
//         "id": "8LXEG1E70sUYexSdhjFu"
//     },
//     {
//         "accountId": "CknNK0lyxWDYVd3AYko3",
//         "categoryId": "sfu9XxfjI1bg8kMIpb4Z",
//         "expense": true,
//         "userId": "F3fNhbY88QZ5Dow6Zd1xlC2gm5w2",
//         "sum": 14.05,
//         "date": "2022-01-06",
//         "id": "8Ni8rZQ88igo1wpWZbEU"
//     },
//     {
//         "expense": true,
//         "sum": 4.99,
//         "userId": "F3fNhbY88QZ5Dow6Zd1xlC2gm5w2",
//         "accountId": "CknNK0lyxWDYVd3AYko3",
//         "date": "2022-02-13",
//         "categoryId": "8rS6pO164e3PZUbsd7JQ",
//         "id": "8vuUHzxU6hHTTT03kYft"
//     },
//     {
//         "expense": true,
//         "sum": 5.5,
//         "userId": "F3fNhbY88QZ5Dow6Zd1xlC2gm5w2",
//         "showInBalance": true,
//         "date": "2022-05-20",
//         "accountId": "vI7VZRiqCCxqJEhJvqXH",
//         "categoryId": "H8wFykC5sU6jgrw1VF7H",
//         "id": "8ycSGgq0xUpr9JGLyeXp"
//     },
//     {
//         "expense": true,
//         "sum": 9,
//         "showInBalance": true,
//         "date": "2022-06-01",
//         "categoryId": "nKOK7jOU01fGpd70etw9",
//         "userId": "F3fNhbY88QZ5Dow6Zd1xlC2gm5w2",
//         "accountId": "CknNK0lyxWDYVd3AYko3",
//         "id": "9RuXocYS3zdBodmqR81k"
//     },
//     {
//         "accountId": "CknNK0lyxWDYVd3AYko3",
//         "userId": "F3fNhbY88QZ5Dow6Zd1xlC2gm5w2",
//         "categoryId": "ECzqAGdfGoyrWZPgbvW1",
//         "date": "2022-06-07",
//         "sum": 1.38,
//         "showInBalance": true,
//         "expense": true,
//         "id": "9qnCwk8zvto7ysVDGbg4"
//     },
//     {
//         "sum": 0.7,
//         "expense": true,
//         "categoryId": "ECzqAGdfGoyrWZPgbvW1",
//         "userId": "F3fNhbY88QZ5Dow6Zd1xlC2gm5w2",
//         "showInBalance": true,
//         "date": "2022-05-19",
//         "accountId": "CknNK0lyxWDYVd3AYko3",
//         "id": "9tZnWONDG1jPAtwGNMRs"
//     },
//     {
//         "userId": "F3fNhbY88QZ5Dow6Zd1xlC2gm5w2",
//         "expense": true,
//         "accountId": "CknNK0lyxWDYVd3AYko3",
//         "showInBalance": true,
//         "sum": 4.99,
//         "date": "2022-05-16",
//         "categoryId": "ECzqAGdfGoyrWZPgbvW1",
//         "id": "9xX2SznHrFDmZLm05II5"
//     },
//     {
//         "categoryId": "8vfHBz0wyDFG0fq1iF8C",
//         "sum": 449,
//         "showInBalance": true,
//         "userId": "F3fNhbY88QZ5Dow6Zd1xlC2gm5w2",
//         "accountId": "CknNK0lyxWDYVd3AYko3",
//         "date": "2022-06-01",
//         "expense": false,
//         "id": "A2JdHyTS4cvCUpCeX8vR"
//     },
//     {
//         "categoryId": "H8wFykC5sU6jgrw1VF7H",
//         "userId": "F3fNhbY88QZ5Dow6Zd1xlC2gm5w2",
//         "accountId": "vI7VZRiqCCxqJEhJvqXH",
//         "sum": 5.5,
//         "expense": true,
//         "showInBalance": true,
//         "date": "2022-04-29",
//         "id": "AMKjHCdKfVfdpp0SgIL0"
//     },
//     {
//         "showInBalance": true,
//         "date": "2022-04-05",
//         "accountId": "CknNK0lyxWDYVd3AYko3",
//         "userId": "F3fNhbY88QZ5Dow6Zd1xlC2gm5w2",
//         "categoryId": "sfu9XxfjI1bg8kMIpb4Z",
//         "sum": 11.03,
//         "expense": true,
//         "id": "AbdlCsH9KVQi9UAUDHeG"
//     },
//     {
//         "sum": 2.95,
//         "userId": "F3fNhbY88QZ5Dow6Zd1xlC2gm5w2",
//         "date": "2022-04-25",
//         "categoryId": "EvQv3el9EOjJWhCTkHe5",
//         "accountId": "CknNK0lyxWDYVd3AYko3",
//         "showInBalance": true,
//         "expense": true,
//         "id": "Ak3VZ2TGZY2xj1s2VBLh"
//     },
//     {
//         "accountId": "CknNK0lyxWDYVd3AYko3",
//         "expense": true,
//         "sum": 9.63,
//         "categoryId": "sfu9XxfjI1bg8kMIpb4Z",
//         "date": "2022-03-28",
//         "userId": "F3fNhbY88QZ5Dow6Zd1xlC2gm5w2",
//         "id": "AvD49qk8SngzBrolPBzf"
//     },
//     {
//         "date": "2021-12-30",
//         "categoryId": "JdSclhcjOMiEht0FJnVk",
//         "expense": true,
//         "accountId": "CknNK0lyxWDYVd3AYko3",
//         "sum": 24.25,
//         "userId": "F3fNhbY88QZ5Dow6Zd1xlC2gm5w2",
//         "id": "AwhEC4qKL8RXFQildJsO"
//     },
//     {
//         "sum": 0.7,
//         "userId": "F3fNhbY88QZ5Dow6Zd1xlC2gm5w2",
//         "date": "2022-05-05",
//         "expense": true,
//         "categoryId": "ECzqAGdfGoyrWZPgbvW1",
//         "showInBalance": true,
//         "accountId": "CknNK0lyxWDYVd3AYko3",
//         "id": "B56SrheXAlcUlGrICvwA"
//     },
//     {
//         "sum": 0.7,
//         "accountId": "CknNK0lyxWDYVd3AYko3",
//         "expense": true,
//         "showInBalance": true,
//         "date": "2022-05-23",
//         "userId": "F3fNhbY88QZ5Dow6Zd1xlC2gm5w2",
//         "categoryId": "ECzqAGdfGoyrWZPgbvW1",
//         "id": "BGhziPcXhceFmVtvC4S3"
//     },
//     {
//         "showInBalance": true,
//         "categoryId": "ECzqAGdfGoyrWZPgbvW1",
//         "sum": 0.49,
//         "accountId": "CknNK0lyxWDYVd3AYko3",
//         "date": "2022-04-14",
//         "expense": true,
//         "userId": "F3fNhbY88QZ5Dow6Zd1xlC2gm5w2",
//         "id": "BKLPtTn8ioIcNgxXn15g"
//     },
//     {
//         "showInBalance": true,
//         "sum": 1.49,
//         "accountId": "CknNK0lyxWDYVd3AYko3",
//         "userId": "F3fNhbY88QZ5Dow6Zd1xlC2gm5w2",
//         "date": "2022-05-09",
//         "categoryId": "ECzqAGdfGoyrWZPgbvW1",
//         "expense": true,
//         "id": "BUJzmNCX2CVHfIxSE3gl"
//     },
//     {
//         "categoryId": "eynHxsAnWkZUCWmC0AIw",
//         "date": "2022-05-26",
//         "accountId": "CknNK0lyxWDYVd3AYko3",
//         "expense": true,
//         "sum": 1.3,
//         "showInBalance": true,
//         "userId": "F3fNhbY88QZ5Dow6Zd1xlC2gm5w2",
//         "id": "BhHBkI3m2G6NILgG7KMp"
//     },
//     {
//         "categoryId": "H8wFykC5sU6jgrw1VF7H",
//         "accountId": "CknNK0lyxWDYVd3AYko3",
//         "date": "2022-01-04",
//         "expense": true,
//         "sum": 18.59,
//         "userId": "F3fNhbY88QZ5Dow6Zd1xlC2gm5w2",
//         "id": "C5FuJLrte76cLzjtRD59"
//     },
//     {
//         "date": "2022-04-13",
//         "showInBalance": true,
//         "expense": true,
//         "sum": 0.69,
//         "userId": "F3fNhbY88QZ5Dow6Zd1xlC2gm5w2",
//         "accountId": "CknNK0lyxWDYVd3AYko3",
//         "categoryId": "ECzqAGdfGoyrWZPgbvW1",
//         "id": "CA4FT5V8r1T0iXu904Wo"
//     },
//     {
//         "userId": "F3fNhbY88QZ5Dow6Zd1xlC2gm5w2",
//         "categoryId": "aTkFZTiOoJvpLaQvtoWf",
//         "sum": 98,
//         "expense": true,
//         "accountId": "vI7VZRiqCCxqJEhJvqXH",
//         "date": "2021-12-06",
//         "id": "CIlGo7q3q8F35HeX2bh6"
//     },
//     {
//         "date": "2022-04-27",
//         "expense": true,
//         "sum": 0.7,
//         "categoryId": "ECzqAGdfGoyrWZPgbvW1",
//         "userId": "F3fNhbY88QZ5Dow6Zd1xlC2gm5w2",
//         "accountId": "CknNK0lyxWDYVd3AYko3",
//         "showInBalance": true,
//         "id": "CO7UK2twIfEzt4zjyiox"
//     },
//     {
//         "accountId": "vI7VZRiqCCxqJEhJvqXH",
//         "date": "2022-04-19",
//         "categoryId": "ECzqAGdfGoyrWZPgbvW1",
//         "showInBalance": true,
//         "sum": 3.2,
//         "userId": "F3fNhbY88QZ5Dow6Zd1xlC2gm5w2",
//         "expense": true,
//         "id": "CeFcB7RsccnHiowWITst"
//     },
//     {
//         "expense": true,
//         "categoryId": "ECzqAGdfGoyrWZPgbvW1",
//         "userId": "F3fNhbY88QZ5Dow6Zd1xlC2gm5w2",
//         "showInBalance": true,
//         "sum": 0.69,
//         "accountId": "CknNK0lyxWDYVd3AYko3",
//         "date": "2022-04-08",
//         "id": "DCeUmOhDMa0VfWudVq92"
//     },
//     {
//         "date": "2022-04-01",
//         "sum": 449,
//         "accountId": "CknNK0lyxWDYVd3AYko3",
//         "userId": "F3fNhbY88QZ5Dow6Zd1xlC2gm5w2",
//         "categoryId": "8vfHBz0wyDFG0fq1iF8C",
//         "expense": false,
//         "showInBalance": true,
//         "id": "DJBjZM69TPYpY5rv8q0V"
//     },
//     {
//         "categoryId": "sfu9XxfjI1bg8kMIpb4Z",
//         "userId": "F3fNhbY88QZ5Dow6Zd1xlC2gm5w2",
//         "sum": 10.66,
//         "date": "2022-04-07",
//         "showInBalance": true,
//         "expense": true,
//         "accountId": "CknNK0lyxWDYVd3AYko3",
//         "id": "DNT66ZTEkT6Yn1NteIJu"
//     },
//     {
//         "sum": 30,
//         "categoryId": "H8wFykC5sU6jgrw1VF7H",
//         "accountId": "vI7VZRiqCCxqJEhJvqXH",
//         "date": "2022-01-06",
//         "userId": "F3fNhbY88QZ5Dow6Zd1xlC2gm5w2",
//         "expense": true,
//         "id": "DPIHxgDGKhW4wefFK4jc"
//     },
//     {
//         "categoryId": "sfu9XxfjI1bg8kMIpb4Z",
//         "sum": 5.56,
//         "accountId": "CknNK0lyxWDYVd3AYko3",
//         "userId": "F3fNhbY88QZ5Dow6Zd1xlC2gm5w2",
//         "date": "2022-02-22",
//         "expense": true,
//         "id": "Dij2QeBRJXBj89Ko9hQ9"
//     },
//     {
//         "date": "2022-01-28",
//         "sum": 29,
//         "userId": "F3fNhbY88QZ5Dow6Zd1xlC2gm5w2",
//         "expense": true,
//         "categoryId": "JdSclhcjOMiEht0FJnVk",
//         "accountId": "CknNK0lyxWDYVd3AYko3",
//         "id": "E3ur0A0wZNsUobYS6yEn"
//     },
//     {
//         "date": "2022-05-12",
//         "showInBalance": true,
//         "sum": 1.78,
//         "userId": "F3fNhbY88QZ5Dow6Zd1xlC2gm5w2",
//         "categoryId": "ECzqAGdfGoyrWZPgbvW1",
//         "accountId": "CknNK0lyxWDYVd3AYko3",
//         "expense": true,
//         "id": "EKA79NTT69PEiVVQkLWu"
//     },
//     {
//         "categoryId": "sfu9XxfjI1bg8kMIpb4Z",
//         "date": "2022-02-17",
//         "accountId": "CknNK0lyxWDYVd3AYko3",
//         "userId": "F3fNhbY88QZ5Dow6Zd1xlC2gm5w2",
//         "sum": 12.9,
//         "expense": true,
//         "id": "EkiWMLJYJ39eQeQ8H3jL"
//     },
//     {
//         "date": "2022-03-01",
//         "sum": 27.5,
//         "categoryId": "nKOK7jOU01fGpd70etw9",
//         "userId": "F3fNhbY88QZ5Dow6Zd1xlC2gm5w2",
//         "expense": true,
//         "accountId": "CknNK0lyxWDYVd3AYko3",
//         "id": "En9eYs7lGI8TruiLs9aj"
//     },
//     {
//         "categoryId": "ECzqAGdfGoyrWZPgbvW1",
//         "userId": "F3fNhbY88QZ5Dow6Zd1xlC2gm5w2",
//         "showInBalance": true,
//         "expense": true,
//         "accountId": "CknNK0lyxWDYVd3AYko3",
//         "sum": 0.7,
//         "date": "2022-04-22",
//         "id": "EnaSEvsmBFfbjESi5Fn1"
//     },
//     {
//         "showInBalance": true,
//         "expense": true,
//         "categoryId": "KzGwUDZLr3RQO04z8fDB",
//         "sum": 20,
//         "userId": "F3fNhbY88QZ5Dow6Zd1xlC2gm5w2",
//         "date": "2022-04-29",
//         "accountId": "vI7VZRiqCCxqJEhJvqXH",
//         "id": "Eziu0iYYzYCj11e4TRBL"
//     },
//     {
//         "sum": 0.7,
//         "date": "2022-05-11",
//         "categoryId": "ECzqAGdfGoyrWZPgbvW1",
//         "showInBalance": true,
//         "expense": true,
//         "accountId": "CknNK0lyxWDYVd3AYko3",
//         "userId": "F3fNhbY88QZ5Dow6Zd1xlC2gm5w2",
//         "id": "FQubE673ggKlnDiz3em4"
//     },
//     {
//         "userId": "F3fNhbY88QZ5Dow6Zd1xlC2gm5w2",
//         "date": "2022-04-11",
//         "expense": true,
//         "accountId": "CknNK0lyxWDYVd3AYko3",
//         "sum": 10.5,
//         "categoryId": "sfu9XxfjI1bg8kMIpb4Z",
//         "showInBalance": true,
//         "id": "FXC9YNMZ41Pn0V6IvkPd"
//     },
//     {
//         "categoryId": "EvQv3el9EOjJWhCTkHe5",
//         "accountId": "CknNK0lyxWDYVd3AYko3",
//         "expense": true,
//         "userId": "F3fNhbY88QZ5Dow6Zd1xlC2gm5w2",
//         "sum": 1.55,
//         "date": "2022-02-03",
//         "id": "FkujjBPFZs0xLXWPlutI"
//     },
//     {
//         "sum": 17.53,
//         "userId": "F3fNhbY88QZ5Dow6Zd1xlC2gm5w2",
//         "expense": true,
//         "showInBalance": true,
//         "date": "2022-05-11",
//         "accountId": "CknNK0lyxWDYVd3AYko3",
//         "categoryId": "sfu9XxfjI1bg8kMIpb4Z",
//         "id": "FwJAMeTfrtOZZRahTmAU"
//     },
//     {
//         "date": "2022-05-24",
//         "accountId": "CknNK0lyxWDYVd3AYko3",
//         "categoryId": "ECzqAGdfGoyrWZPgbvW1",
//         "userId": "F3fNhbY88QZ5Dow6Zd1xlC2gm5w2",
//         "showInBalance": true,
//         "sum": 0.7,
//         "expense": true,
//         "id": "FwJlkxm8vJ5kQYjrlxB1"
//     },
//     {
//         "accountId": "CknNK0lyxWDYVd3AYko3",
//         "sum": 25,
//         "categoryId": "aTkFZTiOoJvpLaQvtoWf",
//         "date": "2022-03-09",
//         "userId": "F3fNhbY88QZ5Dow6Zd1xlC2gm5w2",
//         "expense": true,
//         "id": "G6NzjqdGPG5dHMASnElr"
//     },
//     {
//         "expense": true,
//         "accountId": "CknNK0lyxWDYVd3AYko3",
//         "categoryId": "sfu9XxfjI1bg8kMIpb4Z",
//         "date": "2022-02-11",
//         "userId": "F3fNhbY88QZ5Dow6Zd1xlC2gm5w2",
//         "sum": 12.57,
//         "id": "GPT8matd0zgTsS5Knfnd"
//     },
//     {
//         "userId": "F3fNhbY88QZ5Dow6Zd1xlC2gm5w2",
//         "expense": true,
//         "showInBalance": true,
//         "categoryId": "aTkFZTiOoJvpLaQvtoWf",
//         "sum": 25,
//         "accountId": "CknNK0lyxWDYVd3AYko3",
//         "date": "2022-04-11",
//         "id": "GSQq71V7hL7Z1zNeUt6k"
//     },
//     {
//         "showInBalance": true,
//         "sum": 3.5,
//         "categoryId": "EvQv3el9EOjJWhCTkHe5",
//         "expense": true,
//         "date": "2022-04-13",
//         "userId": "F3fNhbY88QZ5Dow6Zd1xlC2gm5w2",
//         "accountId": "CknNK0lyxWDYVd3AYko3",
//         "id": "Ge3YQQAws1bDd4AY1xIR"
//     },
//     {
//         "userId": "F3fNhbY88QZ5Dow6Zd1xlC2gm5w2",
//         "expense": true,
//         "accountId": "CknNK0lyxWDYVd3AYko3",
//         "date": "2022-01-28",
//         "sum": 24.25,
//         "categoryId": "JdSclhcjOMiEht0FJnVk",
//         "id": "H2yxRnXxK3ciwQXvg5XJ"
//     },
//     {
//         "showInBalance": true,
//         "categoryId": "sfu9XxfjI1bg8kMIpb4Z",
//         "sum": 6.66,
//         "userId": "F3fNhbY88QZ5Dow6Zd1xlC2gm5w2",
//         "date": "2022-04-13",
//         "accountId": "CknNK0lyxWDYVd3AYko3",
//         "expense": true,
//         "id": "HB5S7D14bWUswKbceoOO"
//     },
//     {
//         "categoryId": "sfu9XxfjI1bg8kMIpb4Z",
//         "date": "2022-05-16",
//         "sum": 11.93,
//         "expense": true,
//         "userId": "F3fNhbY88QZ5Dow6Zd1xlC2gm5w2",
//         "showInBalance": true,
//         "accountId": "CknNK0lyxWDYVd3AYko3",
//         "id": "HES4FeM4WidNjIqDah4o"
//     },
//     {
//         "accountId": "vI7VZRiqCCxqJEhJvqXH",
//         "sum": 30,
//         "expense": false,
//         "categoryId": "dfYxF6WORZwWX0TCXyRV",
//         "userId": "F3fNhbY88QZ5Dow6Zd1xlC2gm5w2",
//         "date": "2021-12-01",
//         "id": "HKHTyFvDmeT1fGDXIK5s"
//     },
//     {
//         "sum": 17.18,
//         "userId": "F3fNhbY88QZ5Dow6Zd1xlC2gm5w2",
//         "date": "2022-03-10",
//         "accountId": "CknNK0lyxWDYVd3AYko3",
//         "categoryId": "sfu9XxfjI1bg8kMIpb4Z",
//         "expense": true,
//         "id": "Hls7QP93ZQJSyu9oqurK"
//     },
//     {
//         "accountId": "vI7VZRiqCCxqJEhJvqXH",
//         "userId": "F3fNhbY88QZ5Dow6Zd1xlC2gm5w2",
//         "categoryId": "ECzqAGdfGoyrWZPgbvW1",
//         "expense": true,
//         "sum": 3.1,
//         "date": "2022-05-23",
//         "showInBalance": true,
//         "id": "Hp1Jpq0nm1Hu6exXBvNQ"
//     },
//     {
//         "sum": 29,
//         "showInBalance": true,
//         "userId": "F3fNhbY88QZ5Dow6Zd1xlC2gm5w2",
//         "expense": true,
//         "accountId": "CknNK0lyxWDYVd3AYko3",
//         "categoryId": "JdSclhcjOMiEht0FJnVk",
//         "date": "2022-04-29",
//         "id": "Hs4qV9alU01S0O7vfDYA"
//     },
//     {
//         "expense": true,
//         "date": "2022-05-19",
//         "userId": "F3fNhbY88QZ5Dow6Zd1xlC2gm5w2",
//         "sum": 13.99,
//         "showInBalance": true,
//         "categoryId": "sfu9XxfjI1bg8kMIpb4Z",
//         "accountId": "CknNK0lyxWDYVd3AYko3",
//         "id": "I727PcYNg8cUO7ke36BI"
//     },
//     {
//         "userId": "F3fNhbY88QZ5Dow6Zd1xlC2gm5w2",
//         "categoryId": "sfu9XxfjI1bg8kMIpb4Z",
//         "sum": 12.22,
//         "accountId": "CknNK0lyxWDYVd3AYko3",
//         "date": "2022-03-21",
//         "expense": true,
//         "id": "I9ySlTBracd9VzAOdHZs"
//     },
//     {
//         "sum": 4.99,
//         "expense": true,
//         "userId": "F3fNhbY88QZ5Dow6Zd1xlC2gm5w2",
//         "accountId": "CknNK0lyxWDYVd3AYko3",
//         "showInBalance": true,
//         "date": "2022-06-10",
//         "categoryId": "ECzqAGdfGoyrWZPgbvW1",
//         "id": "IZLCBn4pwkm28bw0y81i"
//     },
//     {
//         "accountId": "CknNK0lyxWDYVd3AYko3",
//         "expense": true,
//         "date": "2022-01-10",
//         "sum": 25,
//         "categoryId": "aTkFZTiOoJvpLaQvtoWf",
//         "userId": "F3fNhbY88QZ5Dow6Zd1xlC2gm5w2",
//         "id": "In98bOtthLmqZ09JqeHl"
//     },
//     {
//         "categoryId": "EvQv3el9EOjJWhCTkHe5",
//         "sum": 4.68,
//         "userId": "F3fNhbY88QZ5Dow6Zd1xlC2gm5w2",
//         "date": "2022-02-28",
//         "expense": true,
//         "accountId": "CknNK0lyxWDYVd3AYko3",
//         "id": "JBA319MdEdcesFIn8cKf"
//     },
//     {
//         "sum": 19.43,
//         "userId": "F3fNhbY88QZ5Dow6Zd1xlC2gm5w2",
//         "expense": true,
//         "categoryId": "H8wFykC5sU6jgrw1VF7H",
//         "date": "2022-01-15",
//         "accountId": "CknNK0lyxWDYVd3AYko3",
//         "id": "JCS9JZyBBOJ3v4LTAxY6"
//     },
//     {
//         "sum": 12.3,
//         "date": "2022-02-07",
//         "expense": true,
//         "categoryId": "sfu9XxfjI1bg8kMIpb4Z",
//         "userId": "F3fNhbY88QZ5Dow6Zd1xlC2gm5w2",
//         "accountId": "CknNK0lyxWDYVd3AYko3",
//         "id": "JS052Wp82V360hN31gpw"
//     },
//     {
//         "expense": true,
//         "categoryId": "sfu9XxfjI1bg8kMIpb4Z",
//         "accountId": "CknNK0lyxWDYVd3AYko3",
//         "sum": 12.88,
//         "date": "2022-01-12",
//         "userId": "F3fNhbY88QZ5Dow6Zd1xlC2gm5w2",
//         "id": "JamgEKtc0pu2gCLirghT"
//     },
//     {
//         "userId": "F3fNhbY88QZ5Dow6Zd1xlC2gm5w2",
//         "showInBalance": true,
//         "expense": true,
//         "accountId": "CknNK0lyxWDYVd3AYko3",
//         "categoryId": "ECzqAGdfGoyrWZPgbvW1",
//         "date": "2022-05-16",
//         "sum": 0.7,
//         "id": "JbqK7N01856efENQGLLL"
//     },
//     {
//         "date": "2022-02-03",
//         "accountId": "CknNK0lyxWDYVd3AYko3",
//         "userId": "F3fNhbY88QZ5Dow6Zd1xlC2gm5w2",
//         "sum": 8.85,
//         "categoryId": "sfu9XxfjI1bg8kMIpb4Z",
//         "expense": true,
//         "id": "KNV3m3mopwG5dMm0zfQw"
//     },
//     {
//         "date": "2022-03-14",
//         "accountId": "CknNK0lyxWDYVd3AYko3",
//         "userId": "F3fNhbY88QZ5Dow6Zd1xlC2gm5w2",
//         "categoryId": "sfu9XxfjI1bg8kMIpb4Z",
//         "sum": 13.3,
//         "expense": true,
//         "id": "LFPOhQqjTctlWPm07QMQ"
//     },
//     {
//         "date": "2022-05-19",
//         "sum": 32.98,
//         "userId": "F3fNhbY88QZ5Dow6Zd1xlC2gm5w2",
//         "expense": true,
//         "categoryId": "aTkFZTiOoJvpLaQvtoWf",
//         "accountId": "CknNK0lyxWDYVd3AYko3",
//         "showInBalance": true,
//         "id": "LLGfriU1fTbGwMmDjsvs"
//     },
//     {
//         "showInBalance": true,
//         "categoryId": "ECzqAGdfGoyrWZPgbvW1",
//         "date": "2022-05-27",
//         "sum": 4.99,
//         "accountId": "CknNK0lyxWDYVd3AYko3",
//         "expense": true,
//         "userId": "F3fNhbY88QZ5Dow6Zd1xlC2gm5w2",
//         "id": "LdU9arEEj31PQRuLWADK"
//     },
//     {
//         "accountId": "vI7VZRiqCCxqJEhJvqXH",
//         "userId": "F3fNhbY88QZ5Dow6Zd1xlC2gm5w2",
//         "date": "2022-02-02",
//         "sum": 20,
//         "categoryId": "KzGwUDZLr3RQO04z8fDB",
//         "expense": true,
//         "id": "LsRCtmpXUUu5BScTajSF"
//     },
//     {
//         "showInBalance": true,
//         "date": "2022-05-06",
//         "expense": true,
//         "categoryId": "ECzqAGdfGoyrWZPgbvW1",
//         "accountId": "CknNK0lyxWDYVd3AYko3",
//         "sum": 0.74,
//         "userId": "F3fNhbY88QZ5Dow6Zd1xlC2gm5w2",
//         "id": "LwdOGui7Hpv7ZpmP616I"
//     },
//     {
//         "accountId": "CknNK0lyxWDYVd3AYko3",
//         "sum": 39.99,
//         "showInBalance": true,
//         "expense": true,
//         "categoryId": "aTkFZTiOoJvpLaQvtoWf",
//         "date": "2022-04-22",
//         "userId": "F3fNhbY88QZ5Dow6Zd1xlC2gm5w2",
//         "id": "ME8zhtEhvPyRSjGW9Yyi"
//     },
//     {
//         "date": "2021-12-28",
//         "userId": "F3fNhbY88QZ5Dow6Zd1xlC2gm5w2",
//         "accountId": "CknNK0lyxWDYVd3AYko3",
//         "expense": true,
//         "categoryId": "i6KpRfIY0SQc4sDhoPAp",
//         "sum": 20,
//         "id": "MNs08F0Jv2C0AFaIikTS"
//     },
//     {
//         "userId": "F3fNhbY88QZ5Dow6Zd1xlC2gm5w2",
//         "expense": true,
//         "categoryId": "H8wFykC5sU6jgrw1VF7H",
//         "accountId": "CknNK0lyxWDYVd3AYko3",
//         "date": "2022-03-18",
//         "sum": 12.65,
//         "id": "MTFE5HT0yhriFTjzrRFz"
//     },
//     {
//         "expense": true,
//         "userId": "F3fNhbY88QZ5Dow6Zd1xlC2gm5w2",
//         "date": "2022-06-01",
//         "categoryId": "RdSQfEpq4HSjtoOzrdkl",
//         "showInBalance": true,
//         "accountId": "CknNK0lyxWDYVd3AYko3",
//         "sum": 4,
//         "id": "Mqwi1yuHsWaWrXrlRqkH"
//     },
//     {
//         "accountId": "vI7VZRiqCCxqJEhJvqXH",
//         "date": "2022-02-02",
//         "expense": true,
//         "categoryId": "8rS6pO164e3PZUbsd7JQ",
//         "sum": 30,
//         "userId": "F3fNhbY88QZ5Dow6Zd1xlC2gm5w2",
//         "id": "MzmdHjhqkFUwxYNbHlLg"
//     },
//     {
//         "date": "2022-06-03",
//         "expense": true,
//         "accountId": "CknNK0lyxWDYVd3AYko3",
//         "categoryId": "ECzqAGdfGoyrWZPgbvW1",
//         "userId": "F3fNhbY88QZ5Dow6Zd1xlC2gm5w2",
//         "showInBalance": true,
//         "sum": 0.7,
//         "id": "N2rrX6ImBn1TusU9xHwB"
//     },
//     {
//         "userId": "F3fNhbY88QZ5Dow6Zd1xlC2gm5w2",
//         "accountId": "vI7VZRiqCCxqJEhJvqXH",
//         "date": "2022-06-05",
//         "sum": 2,
//         "categoryId": "eynHxsAnWkZUCWmC0AIw",
//         "expense": true,
//         "showInBalance": true,
//         "id": "NHouMddTLkdEvhjt8u8x"
//     },
//     {
//         "sum": 29.98,
//         "date": "2022-02-16",
//         "userId": "F3fNhbY88QZ5Dow6Zd1xlC2gm5w2",
//         "accountId": "CknNK0lyxWDYVd3AYko3",
//         "categoryId": "8rS6pO164e3PZUbsd7JQ",
//         "expense": true,
//         "id": "NLr6EEk746tqrGCF1KtU"
//     },
//     {
//         "showInBalance": true,
//         "categoryId": "JdSclhcjOMiEht0FJnVk",
//         "accountId": "CknNK0lyxWDYVd3AYko3",
//         "userId": "F3fNhbY88QZ5Dow6Zd1xlC2gm5w2",
//         "sum": 24.25,
//         "date": "2022-04-29",
//         "expense": true,
//         "id": "Nd9W0WhBGDMCKLfwIHZn"
//     },
//     {
//         "showInBalance": true,
//         "date": "2022-05-20",
//         "accountId": "CknNK0lyxWDYVd3AYko3",
//         "expense": true,
//         "categoryId": "ECzqAGdfGoyrWZPgbvW1",
//         "userId": "F3fNhbY88QZ5Dow6Zd1xlC2gm5w2",
//         "sum": 0.7,
//         "id": "NwbSrxsTLtsWQLyvCYwy"
//     },
//     {
//         "showInBalance": true,
//         "accountId": "CknNK0lyxWDYVd3AYko3",
//         "expense": true,
//         "categoryId": "sfu9XxfjI1bg8kMIpb4Z",
//         "userId": "F3fNhbY88QZ5Dow6Zd1xlC2gm5w2",
//         "date": "2022-04-04",
//         "sum": 9.25,
//         "id": "NyjEUSfdUZ8Y3ZV1XI5K"
//     },
//     {
//         "userId": "F3fNhbY88QZ5Dow6Zd1xlC2gm5w2",
//         "accountId": "CknNK0lyxWDYVd3AYko3",
//         "date": "2022-05-19",
//         "sum": 0.85,
//         "showInBalance": true,
//         "expense": true,
//         "categoryId": "Sh2UZDzQPRa5BDMu4SQL",
//         "id": "P6AAnB9W7uPHjKDNSNlM"
//     },
//     {
//         "sum": 2.8,
//         "expense": true,
//         "accountId": "CknNK0lyxWDYVd3AYko3",
//         "date": "2021-12-29",
//         "categoryId": "EvQv3el9EOjJWhCTkHe5",
//         "userId": "F3fNhbY88QZ5Dow6Zd1xlC2gm5w2",
//         "id": "PRMTDaSVt7FD89nurxjC"
//     },
//     {
//         "expense": true,
//         "categoryId": "H8wFykC5sU6jgrw1VF7H",
//         "showInBalance": true,
//         "userId": "F3fNhbY88QZ5Dow6Zd1xlC2gm5w2",
//         "date": "2022-06-03",
//         "sum": 5.5,
//         "accountId": "vI7VZRiqCCxqJEhJvqXH",
//         "id": "Pzp2kVkyOttLRVvuCVVk"
//     },
//     {
//         "accountId": "CknNK0lyxWDYVd3AYko3",
//         "categoryId": "sfu9XxfjI1bg8kMIpb4Z",
//         "showInBalance": true,
//         "date": "2022-04-13",
//         "expense": true,
//         "userId": "F3fNhbY88QZ5Dow6Zd1xlC2gm5w2",
//         "sum": 1.44,
//         "id": "Q0dnTxgwXMRldgiX0WXJ"
//     },
//     {
//         "categoryId": "nKOK7jOU01fGpd70etw9",
//         "showInBalance": true,
//         "sum": 27.5,
//         "date": "2022-04-01",
//         "userId": "F3fNhbY88QZ5Dow6Zd1xlC2gm5w2",
//         "expense": true,
//         "accountId": "CknNK0lyxWDYVd3AYko3",
//         "id": "QA6L1n3B9t8VknfpQcyB"
//     },
//     {
//         "userId": "F3fNhbY88QZ5Dow6Zd1xlC2gm5w2",
//         "date": "2022-02-01",
//         "categoryId": "8vfHBz0wyDFG0fq1iF8C",
//         "sum": 405.8,
//         "expense": false,
//         "accountId": "CknNK0lyxWDYVd3AYko3",
//         "id": "QDB9uUe3yGkvcaqqn9q8"
//     },
//     {
//         "categoryId": "EvQv3el9EOjJWhCTkHe5",
//         "expense": true,
//         "sum": 0.99,
//         "userId": "F3fNhbY88QZ5Dow6Zd1xlC2gm5w2",
//         "date": "2022-01-20",
//         "accountId": "CknNK0lyxWDYVd3AYko3",
//         "id": "QEzxfVIaZeUDATdm8MAp"
//     },
//     {
//         "expense": true,
//         "sum": 9.2,
//         "userId": "F3fNhbY88QZ5Dow6Zd1xlC2gm5w2",
//         "categoryId": "sfu9XxfjI1bg8kMIpb4Z",
//         "accountId": "CknNK0lyxWDYVd3AYko3",
//         "date": "2022-03-04",
//         "id": "QSvdRzq2oX3e9dnkmLu8"
//     },
//     {
//         "expense": true,
//         "sum": 3,
//         "userId": "F3fNhbY88QZ5Dow6Zd1xlC2gm5w2",
//         "date": "2022-04-14",
//         "accountId": "vI7VZRiqCCxqJEhJvqXH",
//         "showInBalance": true,
//         "categoryId": "ECzqAGdfGoyrWZPgbvW1",
//         "id": "R6E8JA7Fiu3WXOGcdJUa"
//     },
//     {
//         "date": "2022-05-21",
//         "accountId": "vI7VZRiqCCxqJEhJvqXH",
//         "expense": true,
//         "showInBalance": true,
//         "categoryId": "H8wFykC5sU6jgrw1VF7H",
//         "sum": 2.2,
//         "userId": "F3fNhbY88QZ5Dow6Zd1xlC2gm5w2",
//         "id": "RDFfnNmsTUTjhCLrY2o7"
//     },
//     {
//         "sum": 5.5,
//         "date": "2022-04-27",
//         "categoryId": "H8wFykC5sU6jgrw1VF7H",
//         "userId": "F3fNhbY88QZ5Dow6Zd1xlC2gm5w2",
//         "showInBalance": true,
//         "accountId": "vI7VZRiqCCxqJEhJvqXH",
//         "expense": true,
//         "id": "Rws5LLS0n7mWvjp1teZH"
//     },
//     {
//         "userId": "F3fNhbY88QZ5Dow6Zd1xlC2gm5w2",
//         "sum": 29,
//         "date": "2021-12-30",
//         "accountId": "CknNK0lyxWDYVd3AYko3",
//         "categoryId": "JdSclhcjOMiEht0FJnVk",
//         "expense": true,
//         "id": "SHjUtthvJauPdXGnmhGd"
//     },
//     {
//         "sum": 28,
//         "date": "2022-02-18",
//         "accountId": "CknNK0lyxWDYVd3AYko3",
//         "userId": "F3fNhbY88QZ5Dow6Zd1xlC2gm5w2",
//         "categoryId": "JdSclhcjOMiEht0FJnVk",
//         "expense": true,
//         "id": "SlchLi9ceyLyrjIOoMAf"
//     },
//     {
//         "expense": true,
//         "sum": 66.07,
//         "date": "2022-01-24",
//         "userId": "F3fNhbY88QZ5Dow6Zd1xlC2gm5w2",
//         "categoryId": "8rS6pO164e3PZUbsd7JQ",
//         "accountId": "CknNK0lyxWDYVd3AYko3",
//         "id": "TAHuhRigC3fASkLqzePK"
//     },
//     {
//         "categoryId": "JdSclhcjOMiEht0FJnVk",
//         "date": "2022-03-07",
//         "expense": true,
//         "accountId": "CknNK0lyxWDYVd3AYko3",
//         "userId": "F3fNhbY88QZ5Dow6Zd1xlC2gm5w2",
//         "sum": 149.5,
//         "id": "TB8mh7LlY18J15IThqbL"
//     },
//     {
//         "accountId": "vI7VZRiqCCxqJEhJvqXH",
//         "sum": 3.3,
//         "date": "2022-05-26",
//         "expense": true,
//         "userId": "F3fNhbY88QZ5Dow6Zd1xlC2gm5w2",
//         "categoryId": "eynHxsAnWkZUCWmC0AIw",
//         "showInBalance": true,
//         "id": "TEoOeJa5vW8shTbNCUiP"
//     },
//     {
//         "categoryId": "sfu9XxfjI1bg8kMIpb4Z",
//         "accountId": "vI7VZRiqCCxqJEhJvqXH",
//         "expense": true,
//         "date": "2022-02-12",
//         "sum": 7,
//         "userId": "F3fNhbY88QZ5Dow6Zd1xlC2gm5w2",
//         "id": "TmzjOWhxxJRpMT1d9zkf"
//     },
//     {
//         "accountId": "CknNK0lyxWDYVd3AYko3",
//         "userId": "F3fNhbY88QZ5Dow6Zd1xlC2gm5w2",
//         "sum": 4.97,
//         "expense": true,
//         "categoryId": "8rS6pO164e3PZUbsd7JQ",
//         "date": "2022-02-04",
//         "id": "TwGd8A2NEDyEtrUNWSpO"
//     },
//     {
//         "sum": 20,
//         "date": "2022-01-07",
//         "expense": true,
//         "userId": "F3fNhbY88QZ5Dow6Zd1xlC2gm5w2",
//         "accountId": "vI7VZRiqCCxqJEhJvqXH",
//         "categoryId": "KzGwUDZLr3RQO04z8fDB",
//         "id": "UFo2HcCrOfCU5r0oguos"
//     },
//     {
//         "date": "2022-05-25",
//         "expense": true,
//         "accountId": "vI7VZRiqCCxqJEhJvqXH",
//         "userId": "F3fNhbY88QZ5Dow6Zd1xlC2gm5w2",
//         "showInBalance": true,
//         "categoryId": "ECzqAGdfGoyrWZPgbvW1",
//         "sum": 0.7,
//         "id": "UJJpPmvsG305Sc3G71Q7"
//     },
//     {
//         "sum": 24.25,
//         "userId": "F3fNhbY88QZ5Dow6Zd1xlC2gm5w2",
//         "date": "2022-03-28",
//         "accountId": "CknNK0lyxWDYVd3AYko3",
//         "expense": true,
//         "categoryId": "JdSclhcjOMiEht0FJnVk",
//         "id": "UMiWQTp0lEjpI4dF2x13"
//     },
//     {
//         "showInBalance": true,
//         "accountId": "CknNK0lyxWDYVd3AYko3",
//         "sum": 0.7,
//         "categoryId": "ECzqAGdfGoyrWZPgbvW1",
//         "date": "2022-04-21",
//         "expense": true,
//         "userId": "F3fNhbY88QZ5Dow6Zd1xlC2gm5w2",
//         "id": "UTK1J6svwaM0R6KHbE0y"
//     },
//     {
//         "userId": "F3fNhbY88QZ5Dow6Zd1xlC2gm5w2",
//         "date": "2022-03-25",
//         "categoryId": "sfu9XxfjI1bg8kMIpb4Z",
//         "expense": true,
//         "accountId": "CknNK0lyxWDYVd3AYko3",
//         "sum": 13.73,
//         "id": "UTrOCpCFwYOPVY3hDDz7"
//     },
//     {
//         "expense": true,
//         "sum": 11.5,
//         "userId": "F3fNhbY88QZ5Dow6Zd1xlC2gm5w2",
//         "categoryId": "JdSclhcjOMiEht0FJnVk",
//         "date": "2022-01-10",
//         "accountId": "CknNK0lyxWDYVd3AYko3",
//         "id": "UUB3iqJjeMRmtmXW4laj"
//     },
//     {
//         "expense": true,
//         "sum": 17.83,
//         "date": "2022-04-19",
//         "accountId": "CknNK0lyxWDYVd3AYko3",
//         "showInBalance": true,
//         "userId": "F3fNhbY88QZ5Dow6Zd1xlC2gm5w2",
//         "categoryId": "sfu9XxfjI1bg8kMIpb4Z",
//         "id": "VL39Gb8rI8brNo3eCBFz"
//     },
//     {
//         "categoryId": "sfu9XxfjI1bg8kMIpb4Z",
//         "accountId": "CknNK0lyxWDYVd3AYko3",
//         "sum": 13.7,
//         "showInBalance": true,
//         "expense": true,
//         "date": "2022-05-05",
//         "userId": "F3fNhbY88QZ5Dow6Zd1xlC2gm5w2",
//         "id": "VORJLLosC9O1FU16MQFZ"
//     },
//     {
//         "expense": true,
//         "date": "2022-05-23",
//         "userId": "F3fNhbY88QZ5Dow6Zd1xlC2gm5w2",
//         "categoryId": "sfu9XxfjI1bg8kMIpb4Z",
//         "accountId": "CknNK0lyxWDYVd3AYko3",
//         "sum": 18.54,
//         "showInBalance": true,
//         "id": "VVZG0xYMk8bbXX1ro9Rs"
//     },
//     {
//         "accountId": "CknNK0lyxWDYVd3AYko3",
//         "expense": true,
//         "sum": 29,
//         "date": "2022-05-31",
//         "categoryId": "JdSclhcjOMiEht0FJnVk",
//         "userId": "F3fNhbY88QZ5Dow6Zd1xlC2gm5w2",
//         "showInBalance": true,
//         "id": "Vftu08VubrG8I5M3DINd"
//     },
//     {
//         "expense": true,
//         "sum": 32.98,
//         "accountId": "CknNK0lyxWDYVd3AYko3",
//         "categoryId": "aTkFZTiOoJvpLaQvtoWf",
//         "userId": "F3fNhbY88QZ5Dow6Zd1xlC2gm5w2",
//         "date": "2022-01-19",
//         "id": "ViU0qCkVcX78V8pEXcI0"
//     },
//     {
//         "categoryId": "nKOK7jOU01fGpd70etw9",
//         "expense": true,
//         "accountId": "CknNK0lyxWDYVd3AYko3",
//         "showInBalance": true,
//         "userId": "F3fNhbY88QZ5Dow6Zd1xlC2gm5w2",
//         "sum": 27.5,
//         "date": "2022-05-01",
//         "id": "WhGePUBfgYEi31wkN0lL"
//     },
//     {
//         "sum": 1.98,
//         "categoryId": "EvQv3el9EOjJWhCTkHe5",
//         "accountId": "CknNK0lyxWDYVd3AYko3",
//         "date": "2022-02-21",
//         "userId": "F3fNhbY88QZ5Dow6Zd1xlC2gm5w2",
//         "expense": true,
//         "id": "WksD5jP9aU23nzPGzNST"
//     },
//     {
//         "sum": 20,
//         "expense": true,
//         "date": "2022-05-30",
//         "userId": "F3fNhbY88QZ5Dow6Zd1xlC2gm5w2",
//         "showInBalance": true,
//         "categoryId": "KzGwUDZLr3RQO04z8fDB",
//         "accountId": "CknNK0lyxWDYVd3AYko3",
//         "id": "WmUhI5zbbeQq5krNOJxE"
//     },
//     {
//         "date": "2022-01-31",
//         "accountId": "CknNK0lyxWDYVd3AYko3",
//         "sum": 13.56,
//         "categoryId": "sfu9XxfjI1bg8kMIpb4Z",
//         "expense": true,
//         "userId": "F3fNhbY88QZ5Dow6Zd1xlC2gm5w2",
//         "id": "WrWShEPKRyZqgRVJB9Sk"
//     },
//     {
//         "sum": 12.96,
//         "userId": "F3fNhbY88QZ5Dow6Zd1xlC2gm5w2",
//         "expense": true,
//         "categoryId": "sfu9XxfjI1bg8kMIpb4Z",
//         "date": "2022-02-14",
//         "accountId": "CknNK0lyxWDYVd3AYko3",
//         "id": "X3VfeRTzcIEZF78VwSga"
//     },
//     {
//         "categoryId": "ECzqAGdfGoyrWZPgbvW1",
//         "userId": "F3fNhbY88QZ5Dow6Zd1xlC2gm5w2",
//         "date": "2022-04-20",
//         "showInBalance": true,
//         "sum": 0.49,
//         "expense": true,
//         "accountId": "CknNK0lyxWDYVd3AYko3",
//         "id": "X40B5sYuTPf1TgzxOTnR"
//     },
//     {
//         "expense": true,
//         "accountId": "CknNK0lyxWDYVd3AYko3",
//         "categoryId": "eynHxsAnWkZUCWmC0AIw",
//         "userId": "F3fNhbY88QZ5Dow6Zd1xlC2gm5w2",
//         "sum": 10.9,
//         "showInBalance": true,
//         "date": "2022-05-26",
//         "id": "XNrSGQHXDlWXpRnB9UNh"
//     },
//     {
//         "userId": "F3fNhbY88QZ5Dow6Zd1xlC2gm5w2",
//         "showInBalance": true,
//         "date": "2022-04-06",
//         "accountId": "CknNK0lyxWDYVd3AYko3",
//         "categoryId": "H8wFykC5sU6jgrw1VF7H",
//         "expense": true,
//         "sum": 0.5,
//         "id": "YBgWIm3V7bARBt6DY9cQ"
//     },
//     {
//         "accountId": "CknNK0lyxWDYVd3AYko3",
//         "sum": 29,
//         "categoryId": "JdSclhcjOMiEht0FJnVk",
//         "expense": true,
//         "userId": "F3fNhbY88QZ5Dow6Zd1xlC2gm5w2",
//         "date": "2022-02-28",
//         "id": "ZMY6yTZ58P8SyzW7gdhO"
//     },
//     {
//         "expense": true,
//         "accountId": "vI7VZRiqCCxqJEhJvqXH",
//         "categoryId": "KzGwUDZLr3RQO04z8fDB",
//         "date": "2021-12-03",
//         "userId": "F3fNhbY88QZ5Dow6Zd1xlC2gm5w2",
//         "sum": 20,
//         "id": "ZNWGFtex5FXmfIF2QUiB"
//     },
//     {
//         "showInBalance": true,
//         "categoryId": "sfu9XxfjI1bg8kMIpb4Z",
//         "date": "2022-04-22",
//         "sum": 1.49,
//         "expense": true,
//         "userId": "F3fNhbY88QZ5Dow6Zd1xlC2gm5w2",
//         "accountId": "CknNK0lyxWDYVd3AYko3",
//         "id": "aBlfGtsoexD87eaZdF25"
//     },
//     {
//         "expense": true,
//         "sum": 0.6,
//         "date": "2022-05-30",
//         "showInBalance": true,
//         "categoryId": "ECzqAGdfGoyrWZPgbvW1",
//         "accountId": "vI7VZRiqCCxqJEhJvqXH",
//         "userId": "F3fNhbY88QZ5Dow6Zd1xlC2gm5w2",
//         "id": "aHUvvjr9EcDZDSI4mfGi"
//     },
//     {
//         "showInBalance": true,
//         "expense": true,
//         "date": "2022-05-09",
//         "sum": 25,
//         "categoryId": "aTkFZTiOoJvpLaQvtoWf",
//         "accountId": "CknNK0lyxWDYVd3AYko3",
//         "userId": "F3fNhbY88QZ5Dow6Zd1xlC2gm5w2",
//         "id": "aHpWgeTKgHltOKi5Jpoj"
//     },
//     {
//         "expense": true,
//         "userId": "F3fNhbY88QZ5Dow6Zd1xlC2gm5w2",
//         "sum": 1.38,
//         "date": "2022-04-11",
//         "accountId": "CknNK0lyxWDYVd3AYko3",
//         "showInBalance": true,
//         "categoryId": "ECzqAGdfGoyrWZPgbvW1",
//         "id": "aSQG00qDAToQFRkgLnzX"
//     },
//     {
//         "expense": true,
//         "categoryId": "sfu9XxfjI1bg8kMIpb4Z",
//         "sum": 9.45,
//         "userId": "F3fNhbY88QZ5Dow6Zd1xlC2gm5w2",
//         "showInBalance": true,
//         "accountId": "CknNK0lyxWDYVd3AYko3",
//         "date": "2022-05-02",
//         "id": "aURKQUXioA38z2pA7ZmS"
//     },
//     {
//         "sum": 405.8,
//         "userId": "F3fNhbY88QZ5Dow6Zd1xlC2gm5w2",
//         "expense": false,
//         "date": "2022-01-01",
//         "accountId": "CknNK0lyxWDYVd3AYko3",
//         "categoryId": "8vfHBz0wyDFG0fq1iF8C",
//         "id": "agN84grAsXSHz4gR8DxE"
//     },
//     {
//         "accountId": "CknNK0lyxWDYVd3AYko3",
//         "date": "2022-02-05",
//         "userId": "F3fNhbY88QZ5Dow6Zd1xlC2gm5w2",
//         "expense": true,
//         "categoryId": "sfu9XxfjI1bg8kMIpb4Z",
//         "sum": 12.24,
//         "id": "b7l39El7oCJVjjREjpu6"
//     },
//     {
//         "sum": 1.85,
//         "date": "2021-12-28",
//         "accountId": "CknNK0lyxWDYVd3AYko3",
//         "expense": true,
//         "userId": "F3fNhbY88QZ5Dow6Zd1xlC2gm5w2",
//         "categoryId": "H8wFykC5sU6jgrw1VF7H",
//         "id": "bY8U0rjX3UfPmGcVs7qc"
//     },
//     {
//         "sum": 0.7,
//         "date": "2022-05-09",
//         "categoryId": "ECzqAGdfGoyrWZPgbvW1",
//         "showInBalance": true,
//         "userId": "F3fNhbY88QZ5Dow6Zd1xlC2gm5w2",
//         "accountId": "CknNK0lyxWDYVd3AYko3",
//         "expense": true,
//         "id": "ba9HE6rxLZeVDWQeQTdi"
//     },
//     {
//         "date": "2022-04-06",
//         "categoryId": "ECzqAGdfGoyrWZPgbvW1",
//         "userId": "F3fNhbY88QZ5Dow6Zd1xlC2gm5w2",
//         "showInBalance": true,
//         "expense": true,
//         "accountId": "CknNK0lyxWDYVd3AYko3",
//         "sum": 1.38,
//         "id": "cFUKP0ZEvqNk4rc3AErL"
//     },
//     {
//         "date": "2022-06-10",
//         "categoryId": "ECzqAGdfGoyrWZPgbvW1",
//         "sum": 1.39,
//         "accountId": "CknNK0lyxWDYVd3AYko3",
//         "showInBalance": true,
//         "expense": true,
//         "userId": "F3fNhbY88QZ5Dow6Zd1xlC2gm5w2",
//         "id": "cHnhFij2zS87sboOZg5i"
//     },
//     {
//         "date": "2022-05-30",
//         "userId": "F3fNhbY88QZ5Dow6Zd1xlC2gm5w2",
//         "categoryId": "sfu9XxfjI1bg8kMIpb4Z",
//         "showInBalance": true,
//         "accountId": "CknNK0lyxWDYVd3AYko3",
//         "sum": 13.26,
//         "expense": true,
//         "id": "cqFHz5IoTPpg1OUT9Klu"
//     },
//     {
//         "expense": true,
//         "userId": "F3fNhbY88QZ5Dow6Zd1xlC2gm5w2",
//         "showInBalance": true,
//         "date": "2022-06-10",
//         "categoryId": "8rS6pO164e3PZUbsd7JQ",
//         "sum": 67.46,
//         "accountId": "CknNK0lyxWDYVd3AYko3",
//         "id": "d2s8K7uEINzzBuVqPjol"
//     },
//     {
//         "userId": "F3fNhbY88QZ5Dow6Zd1xlC2gm5w2",
//         "showInBalance": true,
//         "categoryId": "ECzqAGdfGoyrWZPgbvW1",
//         "expense": true,
//         "date": "2022-06-02",
//         "accountId": "CknNK0lyxWDYVd3AYko3",
//         "sum": 0.7,
//         "id": "dAB81ie0Ttbu95qMuVhG"
//     },
//     {
//         "date": "2022-05-02",
//         "showInBalance": true,
//         "expense": true,
//         "userId": "F3fNhbY88QZ5Dow6Zd1xlC2gm5w2",
//         "categoryId": "ECzqAGdfGoyrWZPgbvW1",
//         "sum": 0.7,
//         "accountId": "CknNK0lyxWDYVd3AYko3",
//         "id": "dZOz9LHfwugeRDvyiBQn"
//     },
//     {
//         "categoryId": "8rS6pO164e3PZUbsd7JQ",
//         "userId": "F3fNhbY88QZ5Dow6Zd1xlC2gm5w2",
//         "date": "2022-01-08",
//         "sum": 10.99,
//         "expense": true,
//         "accountId": "CknNK0lyxWDYVd3AYko3",
//         "id": "e9vGaLxPvEbYunG5LGey"
//     },
//     {
//         "expense": true,
//         "sum": 12.42,
//         "userId": "F3fNhbY88QZ5Dow6Zd1xlC2gm5w2",
//         "accountId": "CknNK0lyxWDYVd3AYko3",
//         "date": "2021-12-29",
//         "categoryId": "sfu9XxfjI1bg8kMIpb4Z",
//         "id": "eBpQdJ7aAmgEhuCSCzej"
//     },
//     {
//         "accountId": "CknNK0lyxWDYVd3AYko3",
//         "expense": true,
//         "sum": 9.26,
//         "showInBalance": true,
//         "userId": "F3fNhbY88QZ5Dow6Zd1xlC2gm5w2",
//         "categoryId": "sfu9XxfjI1bg8kMIpb4Z",
//         "date": "2022-04-14",
//         "id": "eEcusUzp7bTp4VKbO5ck"
//     },
//     {
//         "showInBalance": true,
//         "sum": 4.24,
//         "userId": "F3fNhbY88QZ5Dow6Zd1xlC2gm5w2",
//         "accountId": "CknNK0lyxWDYVd3AYko3",
//         "date": "2022-05-30",
//         "categoryId": "EvQv3el9EOjJWhCTkHe5",
//         "expense": true,
//         "id": "eblVPAKz8DZizDn8X14f"
//     },
//     {
//         "date": "2022-01-01",
//         "accountId": "CknNK0lyxWDYVd3AYko3",
//         "categoryId": "nKOK7jOU01fGpd70etw9",
//         "userId": "F3fNhbY88QZ5Dow6Zd1xlC2gm5w2",
//         "expense": true,
//         "sum": 27.5,
//         "id": "erMRZDqOqdZke4NvGWCc"
//     },
//     {
//         "sum": 420.09,
//         "categoryId": "8vfHBz0wyDFG0fq1iF8C",
//         "userId": "F3fNhbY88QZ5Dow6Zd1xlC2gm5w2",
//         "expense": false,
//         "accountId": "CknNK0lyxWDYVd3AYko3",
//         "date": "2022-03-01",
//         "id": "esKc4zRdju8f8J2apYLx"
//     },
//     {
//         "userId": "F3fNhbY88QZ5Dow6Zd1xlC2gm5w2",
//         "sum": 106,
//         "date": "2021-12-02",
//         "accountId": "vI7VZRiqCCxqJEhJvqXH",
//         "expense": true,
//         "categoryId": "sfu9XxfjI1bg8kMIpb4Z",
//         "id": "fJ0axNIzSkq7gP0O4SER"
//     },
//     {
//         "userId": "F3fNhbY88QZ5Dow6Zd1xlC2gm5w2",
//         "accountId": "CknNK0lyxWDYVd3AYko3",
//         "expense": true,
//         "categoryId": "JdSclhcjOMiEht0FJnVk",
//         "date": "2022-03-21",
//         "sum": 27,
//         "id": "fKoVcjIV2Ms811Cytj9m"
//     },
//     {
//         "accountId": "CknNK0lyxWDYVd3AYko3",
//         "sum": 1.49,
//         "userId": "F3fNhbY88QZ5Dow6Zd1xlC2gm5w2",
//         "expense": true,
//         "categoryId": "ECzqAGdfGoyrWZPgbvW1",
//         "showInBalance": true,
//         "date": "2022-05-05",
//         "id": "fbuN45OlHfuW2ACxssRR"
//     },
//     {
//         "expense": true,
//         "sum": 12.46,
//         "date": "2022-04-28",
//         "userId": "F3fNhbY88QZ5Dow6Zd1xlC2gm5w2",
//         "categoryId": "sfu9XxfjI1bg8kMIpb4Z",
//         "accountId": "CknNK0lyxWDYVd3AYko3",
//         "showInBalance": true,
//         "id": "fz4YYXXaG7dwXKF6zop8"
//     },
//     {
//         "accountId": "CknNK0lyxWDYVd3AYko3",
//         "expense": true,
//         "date": "2022-01-07",
//         "userId": "F3fNhbY88QZ5Dow6Zd1xlC2gm5w2",
//         "sum": 0.99,
//         "categoryId": "EvQv3el9EOjJWhCTkHe5",
//         "id": "gQdPgEcf7ZXwMddUUiWy"
//     },
//     {
//         "accountId": "CknNK0lyxWDYVd3AYko3",
//         "userId": "F3fNhbY88QZ5Dow6Zd1xlC2gm5w2",
//         "sum": 24.25,
//         "expense": true,
//         "date": "2022-02-28",
//         "categoryId": "JdSclhcjOMiEht0FJnVk",
//         "id": "gT5kolOwPjlFX4Ik22IF"
//     },
//     {
//         "categoryId": "8vfHBz0wyDFG0fq1iF8C",
//         "userId": "F3fNhbY88QZ5Dow6Zd1xlC2gm5w2",
//         "date": "2022-05-01",
//         "expense": false,
//         "accountId": "CknNK0lyxWDYVd3AYko3",
//         "showInBalance": true,
//         "sum": 449,
//         "id": "gchiTIDvegtDx8cYFzWY"
//     },
//     {
//         "categoryId": "H8wFykC5sU6jgrw1VF7H",
//         "sum": 30,
//         "date": "2021-12-06",
//         "expense": true,
//         "userId": "F3fNhbY88QZ5Dow6Zd1xlC2gm5w2",
//         "accountId": "vI7VZRiqCCxqJEhJvqXH",
//         "id": "gclM1dnPtqg8klAaN6J7"
//     },
//     {
//         "date": "2022-02-09",
//         "categoryId": "sfu9XxfjI1bg8kMIpb4Z",
//         "accountId": "CknNK0lyxWDYVd3AYko3",
//         "sum": 12.77,
//         "userId": "F3fNhbY88QZ5Dow6Zd1xlC2gm5w2",
//         "expense": true,
//         "id": "gpDSh91pPmDpcrzCbPTC"
//     },
//     {
//         "categoryId": "sfu9XxfjI1bg8kMIpb4Z",
//         "sum": 11,
//         "date": "2022-05-03",
//         "userId": "F3fNhbY88QZ5Dow6Zd1xlC2gm5w2",
//         "expense": true,
//         "accountId": "CknNK0lyxWDYVd3AYko3",
//         "showInBalance": true,
//         "id": "hKVUmmBEqAGmBrqYpsDq"
//     },
//     {
//         "sum": 4.99,
//         "expense": true,
//         "userId": "F3fNhbY88QZ5Dow6Zd1xlC2gm5w2",
//         "categoryId": "8rS6pO164e3PZUbsd7JQ",
//         "date": "2022-02-14",
//         "accountId": "CknNK0lyxWDYVd3AYko3",
//         "id": "hLLFFmNUhom488V87U3k"
//     },
//     {
//         "expense": true,
//         "accountId": "CknNK0lyxWDYVd3AYko3",
//         "categoryId": "EvQv3el9EOjJWhCTkHe5",
//         "userId": "F3fNhbY88QZ5Dow6Zd1xlC2gm5w2",
//         "sum": 2.89,
//         "showInBalance": true,
//         "date": "2022-05-19",
//         "id": "hMCNZCLJ17ohrZYJh7is"
//     },
//     {
//         "accountId": "CknNK0lyxWDYVd3AYko3",
//         "expense": true,
//         "categoryId": "sfu9XxfjI1bg8kMIpb4Z",
//         "sum": 11.01,
//         "date": "2022-01-20",
//         "userId": "F3fNhbY88QZ5Dow6Zd1xlC2gm5w2",
//         "id": "hgxHVpV8y6uppsmYA3MF"
//     },
//     {
//         "expense": true,
//         "userId": "F3fNhbY88QZ5Dow6Zd1xlC2gm5w2",
//         "accountId": "CknNK0lyxWDYVd3AYko3",
//         "date": "2021-12-31",
//         "sum": 10,
//         "categoryId": "H8wFykC5sU6jgrw1VF7H",
//         "id": "i7HM3xnpyV203xp1YM2x"
//     },
//     {
//         "categoryId": "ECzqAGdfGoyrWZPgbvW1",
//         "expense": true,
//         "userId": "F3fNhbY88QZ5Dow6Zd1xlC2gm5w2",
//         "sum": 2.89,
//         "accountId": "CknNK0lyxWDYVd3AYko3",
//         "date": "2022-04-29",
//         "showInBalance": true,
//         "id": "iPruSAP2TnSbMhVEAT6W"
//     },
//     {
//         "expense": true,
//         "date": "2022-03-28",
//         "sum": 0.99,
//         "categoryId": "EvQv3el9EOjJWhCTkHe5",
//         "accountId": "CknNK0lyxWDYVd3AYko3",
//         "userId": "F3fNhbY88QZ5Dow6Zd1xlC2gm5w2",
//         "id": "idfCZjRT4qgEoH3AjOqK"
//     },
//     {
//         "categoryId": "JdSclhcjOMiEht0FJnVk",
//         "accountId": "CknNK0lyxWDYVd3AYko3",
//         "userId": "F3fNhbY88QZ5Dow6Zd1xlC2gm5w2",
//         "date": "2022-05-19",
//         "showInBalance": true,
//         "expense": true,
//         "sum": 27,
//         "id": "iswkIhMh1AXAMon7JDbu"
//     },
//     {
//         "categoryId": "dfYxF6WORZwWX0TCXyRV",
//         "expense": false,
//         "sum": 30,
//         "date": "2022-01-01",
//         "userId": "F3fNhbY88QZ5Dow6Zd1xlC2gm5w2",
//         "accountId": "vI7VZRiqCCxqJEhJvqXH",
//         "id": "j9ll14s1Tdgv49zkEsml"
//     },
//     {
//         "categoryId": "aTkFZTiOoJvpLaQvtoWf",
//         "expense": true,
//         "sum": 32.98,
//         "date": "2022-03-21",
//         "userId": "F3fNhbY88QZ5Dow6Zd1xlC2gm5w2",
//         "accountId": "CknNK0lyxWDYVd3AYko3",
//         "id": "jZWBfxpmKCigUlgcyUPv"
//     },
//     {
//         "sum": 3,
//         "userId": "F3fNhbY88QZ5Dow6Zd1xlC2gm5w2",
//         "accountId": "vI7VZRiqCCxqJEhJvqXH",
//         "categoryId": "H8wFykC5sU6jgrw1VF7H",
//         "expense": true,
//         "date": "2022-02-06",
//         "id": "kLeDpAQcoRxmDworK1Ns"
//     },
//     {
//         "categoryId": "EvQv3el9EOjJWhCTkHe5",
//         "sum": 5.8,
//         "showInBalance": true,
//         "expense": true,
//         "userId": "F3fNhbY88QZ5Dow6Zd1xlC2gm5w2",
//         "accountId": "CknNK0lyxWDYVd3AYko3",
//         "date": "2022-04-07",
//         "id": "lFMje7rjo6MpcjaUpC3v"
//     },
//     {
//         "categoryId": "EvQv3el9EOjJWhCTkHe5",
//         "sum": 10.8,
//         "expense": true,
//         "accountId": "CknNK0lyxWDYVd3AYko3",
//         "date": "2022-06-07",
//         "showInBalance": true,
//         "userId": "F3fNhbY88QZ5Dow6Zd1xlC2gm5w2",
//         "id": "lPpII11S9lEGzhoVN45Q"
//     },
//     {
//         "categoryId": "dfYxF6WORZwWX0TCXyRV",
//         "sum": 30,
//         "expense": false,
//         "userId": "F3fNhbY88QZ5Dow6Zd1xlC2gm5w2",
//         "date": "2022-05-18",
//         "showInBalance": true,
//         "accountId": "vI7VZRiqCCxqJEhJvqXH",
//         "id": "ld8oKGSyfpCdfCkBc5zk"
//     },
//     {
//         "date": "2022-05-18",
//         "showInBalance": true,
//         "accountId": "CknNK0lyxWDYVd3AYko3",
//         "sum": 0.7,
//         "expense": true,
//         "userId": "F3fNhbY88QZ5Dow6Zd1xlC2gm5w2",
//         "categoryId": "ECzqAGdfGoyrWZPgbvW1",
//         "id": "mFatDe9kOVnwB2YByUJG"
//     },
//     {
//         "expense": true,
//         "sum": 2,
//         "date": "2022-01-04",
//         "categoryId": "8rS6pO164e3PZUbsd7JQ",
//         "userId": "F3fNhbY88QZ5Dow6Zd1xlC2gm5w2",
//         "accountId": "CknNK0lyxWDYVd3AYko3",
//         "id": "meDdxYCEvmroOYccYltO"
//     },
//     {
//         "userId": "F3fNhbY88QZ5Dow6Zd1xlC2gm5w2",
//         "expense": true,
//         "accountId": "CknNK0lyxWDYVd3AYko3",
//         "date": "2022-04-20",
//         "showInBalance": true,
//         "categoryId": "aTkFZTiOoJvpLaQvtoWf",
//         "sum": 32.98,
//         "id": "n3xUyw5RccB2zVCHpwJF"
//     },
//     {
//         "categoryId": "KzGwUDZLr3RQO04z8fDB",
//         "sum": 20,
//         "accountId": "vI7VZRiqCCxqJEhJvqXH",
//         "expense": true,
//         "userId": "F3fNhbY88QZ5Dow6Zd1xlC2gm5w2",
//         "date": "2022-03-02",
//         "id": "nQrpBv2IUdzYZEmWx5yV"
//     },
//     {
//         "sum": 12.13,
//         "accountId": "CknNK0lyxWDYVd3AYko3",
//         "date": "2022-03-07",
//         "userId": "F3fNhbY88QZ5Dow6Zd1xlC2gm5w2",
//         "categoryId": "sfu9XxfjI1bg8kMIpb4Z",
//         "expense": true,
//         "id": "oTQCnm14DiYGB0pU4pZC"
//     },
//     {
//         "categoryId": "sfu9XxfjI1bg8kMIpb4Z",
//         "date": "2022-02-01",
//         "accountId": "CknNK0lyxWDYVd3AYko3",
//         "userId": "F3fNhbY88QZ5Dow6Zd1xlC2gm5w2",
//         "sum": 10.14,
//         "expense": true,
//         "id": "oZN36aaOxh2hqZjSOn3k"
//     },
//     {
//         "showInBalance": true,
//         "categoryId": "ECzqAGdfGoyrWZPgbvW1",
//         "date": "2022-04-19",
//         "expense": true,
//         "userId": "F3fNhbY88QZ5Dow6Zd1xlC2gm5w2",
//         "sum": 1.98,
//         "accountId": "CknNK0lyxWDYVd3AYko3",
//         "id": "ofoy5uefEuhYiG8Lw1lu"
//     },
//     {
//         "date": "2022-03-02",
//         "sum": 14.48,
//         "accountId": "CknNK0lyxWDYVd3AYko3",
//         "expense": true,
//         "userId": "F3fNhbY88QZ5Dow6Zd1xlC2gm5w2",
//         "categoryId": "sfu9XxfjI1bg8kMIpb4Z",
//         "id": "oq5e8xxXVk4XRGQGASwN"
//     },
//     {
//         "sum": 0.7,
//         "accountId": "CknNK0lyxWDYVd3AYko3",
//         "userId": "F3fNhbY88QZ5Dow6Zd1xlC2gm5w2",
//         "date": "2022-04-29",
//         "expense": true,
//         "showInBalance": true,
//         "categoryId": "ECzqAGdfGoyrWZPgbvW1",
//         "id": "pTsO0XSHHkHiWQQjl48r"
//     },
//     {
//         "categoryId": "ECzqAGdfGoyrWZPgbvW1",
//         "sum": 0.7,
//         "accountId": "CknNK0lyxWDYVd3AYko3",
//         "expense": true,
//         "date": "2022-05-06",
//         "showInBalance": true,
//         "userId": "F3fNhbY88QZ5Dow6Zd1xlC2gm5w2",
//         "id": "pW5jpzfUF4Ko2FbWFkYJ"
//     },
//     {
//         "expense": true,
//         "accountId": "CknNK0lyxWDYVd3AYko3",
//         "sum": 0.49,
//         "categoryId": "ECzqAGdfGoyrWZPgbvW1",
//         "showInBalance": true,
//         "userId": "F3fNhbY88QZ5Dow6Zd1xlC2gm5w2",
//         "date": "2022-04-07",
//         "id": "pojosbGXteBMRChRucMX"
//     },
//     {
//         "accountId": "CknNK0lyxWDYVd3AYko3",
//         "expense": true,
//         "userId": "F3fNhbY88QZ5Dow6Zd1xlC2gm5w2",
//         "date": "2022-02-07",
//         "categoryId": "JdSclhcjOMiEht0FJnVk",
//         "sum": 11.5,
//         "id": "pv5iP7o2GJDBFCl5qvMl"
//     },
//     {
//         "sum": 29,
//         "userId": "F3fNhbY88QZ5Dow6Zd1xlC2gm5w2",
//         "categoryId": "JdSclhcjOMiEht0FJnVk",
//         "date": "2022-03-28",
//         "expense": true,
//         "accountId": "CknNK0lyxWDYVd3AYko3",
//         "id": "pxHbkw55PuJiDqwGXdrp"
//     },
//     {
//         "date": "2022-05-09",
//         "showInBalance": true,
//         "categoryId": "sfu9XxfjI1bg8kMIpb4Z",
//         "sum": 11.1,
//         "accountId": "CknNK0lyxWDYVd3AYko3",
//         "expense": true,
//         "userId": "F3fNhbY88QZ5Dow6Zd1xlC2gm5w2",
//         "id": "qKdrGhkGhz8AknENaLZ6"
//     },
//     {
//         "date": "2022-04-21",
//         "categoryId": "JdSclhcjOMiEht0FJnVk",
//         "sum": 27,
//         "userId": "F3fNhbY88QZ5Dow6Zd1xlC2gm5w2",
//         "expense": true,
//         "showInBalance": true,
//         "accountId": "CknNK0lyxWDYVd3AYko3",
//         "id": "qegGVSQtzJI8hE8oAXKB"
//     },
//     {
//         "userId": "F3fNhbY88QZ5Dow6Zd1xlC2gm5w2",
//         "accountId": "vI7VZRiqCCxqJEhJvqXH",
//         "sum": 30,
//         "date": "2022-03-08",
//         "expense": false,
//         "categoryId": "dfYxF6WORZwWX0TCXyRV",
//         "id": "rYAjoRUEcRE3nA50Qw92"
//     },
//     {
//         "categoryId": "JdSclhcjOMiEht0FJnVk",
//         "accountId": "vI7VZRiqCCxqJEhJvqXH",
//         "date": "2021-12-04",
//         "sum": 11.5,
//         "userId": "F3fNhbY88QZ5Dow6Zd1xlC2gm5w2",
//         "expense": true,
//         "id": "sDpunkO0kJqMNFWwwIQl"
//     },
//     {
//         "date": "2022-05-31",
//         "sum": 0.7,
//         "categoryId": "ECzqAGdfGoyrWZPgbvW1",
//         "showInBalance": true,
//         "expense": true,
//         "userId": "F3fNhbY88QZ5Dow6Zd1xlC2gm5w2",
//         "accountId": "vI7VZRiqCCxqJEhJvqXH",
//         "id": "sdULkX1g67GuXBudGxuK"
//     },
//     {
//         "sum": 13.93,
//         "date": "2022-04-01",
//         "accountId": "CknNK0lyxWDYVd3AYko3",
//         "categoryId": "sfu9XxfjI1bg8kMIpb4Z",
//         "expense": true,
//         "userId": "F3fNhbY88QZ5Dow6Zd1xlC2gm5w2",
//         "id": "szL6FZzPKx0vmDvLnWlr"
//     },
//     {
//         "categoryId": "aTkFZTiOoJvpLaQvtoWf",
//         "expense": true,
//         "accountId": "CknNK0lyxWDYVd3AYko3",
//         "sum": 39.99,
//         "date": "2022-02-18",
//         "userId": "F3fNhbY88QZ5Dow6Zd1xlC2gm5w2",
//         "id": "t3R4ENG5EufPLlo3w2wo"
//     },
//     {
//         "expense": true,
//         "sum": 2.98,
//         "userId": "F3fNhbY88QZ5Dow6Zd1xlC2gm5w2",
//         "categoryId": "EvQv3el9EOjJWhCTkHe5",
//         "accountId": "vI7VZRiqCCxqJEhJvqXH",
//         "date": "2021-12-05",
//         "id": "t3cGUGynL9GpsQ89b39h"
//     },
//     {
//         "categoryId": "H8wFykC5sU6jgrw1VF7H",
//         "date": "2022-02-06",
//         "sum": 0.5,
//         "userId": "F3fNhbY88QZ5Dow6Zd1xlC2gm5w2",
//         "expense": true,
//         "accountId": "CknNK0lyxWDYVd3AYko3",
//         "id": "tYKLVdpE4TY1EwyAQJEd"
//     },
//     {
//         "sum": 3.8,
//         "accountId": "vI7VZRiqCCxqJEhJvqXH",
//         "categoryId": "ECzqAGdfGoyrWZPgbvW1",
//         "userId": "F3fNhbY88QZ5Dow6Zd1xlC2gm5w2",
//         "date": "2022-04-20",
//         "expense": true,
//         "showInBalance": true,
//         "id": "u0SHMpnkADYpubx8p9i9"
//     },
//     {
//         "showInBalance": true,
//         "expense": true,
//         "sum": 25,
//         "categoryId": "aTkFZTiOoJvpLaQvtoWf",
//         "userId": "F3fNhbY88QZ5Dow6Zd1xlC2gm5w2",
//         "accountId": "CknNK0lyxWDYVd3AYko3",
//         "date": "2022-06-09",
//         "id": "uPaBCvt33ff0QivuYFek"
//     },
//     {
//         "date": "2022-03-11",
//         "expense": true,
//         "userId": "F3fNhbY88QZ5Dow6Zd1xlC2gm5w2",
//         "sum": 7.9,
//         "accountId": "CknNK0lyxWDYVd3AYko3",
//         "categoryId": "ECzqAGdfGoyrWZPgbvW1",
//         "id": "uQMh0KlAcaHelngnVKSy"
//     },
//     {
//         "expense": true,
//         "sum": 14.12,
//         "userId": "F3fNhbY88QZ5Dow6Zd1xlC2gm5w2",
//         "date": "2022-03-17",
//         "categoryId": "sfu9XxfjI1bg8kMIpb4Z",
//         "accountId": "CknNK0lyxWDYVd3AYko3",
//         "id": "uQl2psjCiPMpnJmzcP8F"
//     },
//     {
//         "date": "2022-03-18",
//         "userId": "F3fNhbY88QZ5Dow6Zd1xlC2gm5w2",
//         "sum": 39.99,
//         "accountId": "CknNK0lyxWDYVd3AYko3",
//         "categoryId": "aTkFZTiOoJvpLaQvtoWf",
//         "expense": true,
//         "id": "uklqHFzBP7Sqve0hbg2n"
//     },
//     {
//         "categoryId": "RdSQfEpq4HSjtoOzrdkl",
//         "sum": 4,
//         "date": "2022-05-10",
//         "expense": true,
//         "userId": "F3fNhbY88QZ5Dow6Zd1xlC2gm5w2",
//         "showInBalance": true,
//         "accountId": "CknNK0lyxWDYVd3AYko3",
//         "id": "utkbedvLH4M73dfCFwWT"
//     },
//     {
//         "sum": 15.21,
//         "userId": "F3fNhbY88QZ5Dow6Zd1xlC2gm5w2",
//         "date": "2022-01-24",
//         "accountId": "CknNK0lyxWDYVd3AYko3",
//         "categoryId": "sfu9XxfjI1bg8kMIpb4Z",
//         "expense": true,
//         "id": "uy20mdImm81AQhcsKWwG"
//     },
//     {
//         "showInBalance": false,
//         "userId": "F3fNhbY88QZ5Dow6Zd1xlC2gm5w2",
//         "sum": 1.01,
//         "date": "2022-03-25",
//         "accountId": "vI7VZRiqCCxqJEhJvqXH",
//         "categoryId": "9oCIYOhZxiX4Gs3RYLJP",
//         "expense": true,
//         "id": "v5vR6sayidQWdj8BLrgT"
//     },
//     {
//         "userId": "F3fNhbY88QZ5Dow6Zd1xlC2gm5w2",
//         "sum": 59.5,
//         "date": "2022-05-15",
//         "categoryId": "8rS6pO164e3PZUbsd7JQ",
//         "showInBalance": true,
//         "accountId": "CknNK0lyxWDYVd3AYko3",
//         "expense": true,
//         "id": "v6vmbbQfuaj4Vry29AUv"
//     },
//     {
//         "expense": true,
//         "date": "2022-01-14",
//         "categoryId": "sfu9XxfjI1bg8kMIpb4Z",
//         "sum": 10.23,
//         "userId": "F3fNhbY88QZ5Dow6Zd1xlC2gm5w2",
//         "accountId": "CknNK0lyxWDYVd3AYko3",
//         "id": "vPP8cieieTh0H5MPOCss"
//     },
//     {
//         "showInBalance": true,
//         "date": "2022-04-28",
//         "userId": "F3fNhbY88QZ5Dow6Zd1xlC2gm5w2",
//         "categoryId": "ECzqAGdfGoyrWZPgbvW1",
//         "sum": 0.7,
//         "accountId": "CknNK0lyxWDYVd3AYko3",
//         "expense": true,
//         "id": "vt8hcJBdvCBL3VdaWFxR"
//     },
//     {
//         "date": "2022-04-25",
//         "showInBalance": true,
//         "sum": 11.37,
//         "userId": "F3fNhbY88QZ5Dow6Zd1xlC2gm5w2",
//         "accountId": "CknNK0lyxWDYVd3AYko3",
//         "expense": true,
//         "categoryId": "sfu9XxfjI1bg8kMIpb4Z",
//         "id": "wJR1bM9yGK1hFMBSh3cw"
//     },
//     {
//         "expense": true,
//         "sum": 19.99,
//         "accountId": "CknNK0lyxWDYVd3AYko3",
//         "userId": "F3fNhbY88QZ5Dow6Zd1xlC2gm5w2",
//         "date": "2022-02-07",
//         "categoryId": "8rS6pO164e3PZUbsd7JQ",
//         "id": "wl1YU7bZkK0nr6N0dzaz"
//     },
//     {
//         "sum": 0.69,
//         "showInBalance": true,
//         "expense": true,
//         "categoryId": "ECzqAGdfGoyrWZPgbvW1",
//         "date": "2022-06-09",
//         "userId": "F3fNhbY88QZ5Dow6Zd1xlC2gm5w2",
//         "accountId": "CknNK0lyxWDYVd3AYko3",
//         "id": "wrSIPOtWC1yuIcWu6kNc"
//     },
//     {
//         "accountId": "CknNK0lyxWDYVd3AYko3",
//         "sum": 1.99,
//         "showInBalance": true,
//         "categoryId": "sfu9XxfjI1bg8kMIpb4Z",
//         "userId": "F3fNhbY88QZ5Dow6Zd1xlC2gm5w2",
//         "expense": true,
//         "date": "2022-05-13",
//         "id": "x3abb7hkDqIljkC0GZQs"
//     },
//     {
//         "accountId": "CknNK0lyxWDYVd3AYko3",
//         "expense": false,
//         "sum": 403,
//         "categoryId": "8vfHBz0wyDFG0fq1iF8C",
//         "date": "2021-12-01",
//         "userId": "F3fNhbY88QZ5Dow6Zd1xlC2gm5w2",
//         "id": "x7lHWdWQwErxdRgaEGlc"
//     },
//     {
//         "accountId": "CknNK0lyxWDYVd3AYko3",
//         "expense": true,
//         "showInBalance": true,
//         "date": "2022-06-08",
//         "categoryId": "ECzqAGdfGoyrWZPgbvW1",
//         "sum": 2.5,
//         "userId": "F3fNhbY88QZ5Dow6Zd1xlC2gm5w2",
//         "id": "xR6rm6sUKBp6V8xJlIJy"
//     },
//     {
//         "accountId": "CknNK0lyxWDYVd3AYko3",
//         "sum": 39.99,
//         "date": "2022-01-20",
//         "expense": true,
//         "categoryId": "aTkFZTiOoJvpLaQvtoWf",
//         "userId": "F3fNhbY88QZ5Dow6Zd1xlC2gm5w2",
//         "id": "xaZwcRpIRZH7JM1uGCtN"
//     },
//     {
//         "userId": "F3fNhbY88QZ5Dow6Zd1xlC2gm5w2",
//         "date": "2021-12-31",
//         "categoryId": "H8wFykC5sU6jgrw1VF7H",
//         "sum": 9.9,
//         "expense": true,
//         "accountId": "CknNK0lyxWDYVd3AYko3",
//         "id": "xlaPv8AqB6mGtlSrUSSJ"
//     },
//     {
//         "expense": true,
//         "accountId": "vI7VZRiqCCxqJEhJvqXH",
//         "userId": "F3fNhbY88QZ5Dow6Zd1xlC2gm5w2",
//         "categoryId": "ECzqAGdfGoyrWZPgbvW1",
//         "showInBalance": true,
//         "sum": 1.8,
//         "date": "2022-05-06",
//         "id": "xuxqJOerHz5khGfh7S1U"
//     },
//     {
//         "categoryId": "ECzqAGdfGoyrWZPgbvW1",
//         "sum": 0.98,
//         "showInBalance": true,
//         "expense": true,
//         "date": "2022-04-25",
//         "userId": "F3fNhbY88QZ5Dow6Zd1xlC2gm5w2",
//         "accountId": "CknNK0lyxWDYVd3AYko3",
//         "id": "y1Ao3EKMqjwMe5Wj4MRi"
//     },
//     {
//         "accountId": "vI7VZRiqCCxqJEhJvqXH",
//         "date": "2022-03-15",
//         "sum": 5,
//         "expense": true,
//         "userId": "F3fNhbY88QZ5Dow6Zd1xlC2gm5w2",
//         "categoryId": "H8wFykC5sU6jgrw1VF7H",
//         "id": "yN9XuTcaQuSHMwGfTu1Z"
//     },
//     {
//         "sum": 0.7,
//         "accountId": "CknNK0lyxWDYVd3AYko3",
//         "showInBalance": true,
//         "categoryId": "ECzqAGdfGoyrWZPgbvW1",
//         "userId": "F3fNhbY88QZ5Dow6Zd1xlC2gm5w2",
//         "expense": true,
//         "date": "2022-05-10",
//         "id": "yth6DRTDy2Cylo40VFRH"
//     },
//     {
//         "showInBalance": true,
//         "categoryId": "sfu9XxfjI1bg8kMIpb4Z",
//         "expense": true,
//         "userId": "F3fNhbY88QZ5Dow6Zd1xlC2gm5w2",
//         "sum": 9.23,
//         "accountId": "CknNK0lyxWDYVd3AYko3",
//         "date": "2022-05-27",
//         "id": "yu9Zpty4S0raNqYpeXBV"
//     },
//     {
//         "showInBalance": true,
//         "categoryId": "ECzqAGdfGoyrWZPgbvW1",
//         "accountId": "CknNK0lyxWDYVd3AYko3",
//         "date": "2022-04-12",
//         "userId": "F3fNhbY88QZ5Dow6Zd1xlC2gm5w2",
//         "expense": true,
//         "sum": 0.84,
//         "id": "ywg8k6BgBe5vw6bpbKIk"
//     },
//     {
//         "date": "2022-02-01",
//         "expense": false,
//         "sum": 30,
//         "userId": "F3fNhbY88QZ5Dow6Zd1xlC2gm5w2",
//         "categoryId": "dfYxF6WORZwWX0TCXyRV",
//         "accountId": "vI7VZRiqCCxqJEhJvqXH",
//         "id": "ywySPGU04ntF8tiYQGug"
//     },
//     {
//         "expense": true,
//         "categoryId": "sfu9XxfjI1bg8kMIpb4Z",
//         "userId": "F3fNhbY88QZ5Dow6Zd1xlC2gm5w2",
//         "date": "2022-01-26",
//         "sum": 15.01,
//         "accountId": "CknNK0lyxWDYVd3AYko3",
//         "id": "yzw8FqNaKkVONJiUQvCc"
//     },
//     {
//         "accountId": "CknNK0lyxWDYVd3AYko3",
//         "sum": 0.7,
//         "categoryId": "ECzqAGdfGoyrWZPgbvW1",
//         "userId": "F3fNhbY88QZ5Dow6Zd1xlC2gm5w2",
//         "showInBalance": true,
//         "expense": true,
//         "date": "2022-06-09",
//         "id": "z6IQ9wVceUFlebczPCrC"
//     },
//     {
//         "userId": "F3fNhbY88QZ5Dow6Zd1xlC2gm5w2",
//         "accountId": "CknNK0lyxWDYVd3AYko3",
//         "expense": true,
//         "sum": 3.18,
//         "date": "2022-01-07",
//         "categoryId": "sfu9XxfjI1bg8kMIpb4Z",
//         "id": "zHicBA7uJgji0F9I8nAu"
//     },
//     {
//         "categoryId": "H8wFykC5sU6jgrw1VF7H",
//         "sum": 16.9,
//         "accountId": "CknNK0lyxWDYVd3AYko3",
//         "expense": true,
//         "date": "2021-12-24",
//         "userId": "F3fNhbY88QZ5Dow6Zd1xlC2gm5w2",
//         "id": "zJtbmKoX4QsftMMWM0dU"
//     },
//     {
//         "expense": true,
//         "accountId": "vI7VZRiqCCxqJEhJvqXH",
//         "categoryId": "sfu9XxfjI1bg8kMIpb4Z",
//         "date": "2022-04-20",
//         "showInBalance": true,
//         "userId": "F3fNhbY88QZ5Dow6Zd1xlC2gm5w2",
//         "sum": 5,
//         "id": "zTYBEckrN9SQJepcgFq4"
//     },
//     {
//         "userId": "F3fNhbY88QZ5Dow6Zd1xlC2gm5w2",
//         "accountId": "CknNK0lyxWDYVd3AYko3",
//         "date": "2022-03-23",
//         "expense": true,
//         "sum": 13.17,
//         "categoryId": "sfu9XxfjI1bg8kMIpb4Z",
//         "id": "zYODMdkYFBsBWNicqoqx"
//     },
//     {
//         "sum": 27.5,
//         "accountId": "CknNK0lyxWDYVd3AYko3",
//         "expense": true,
//         "userId": "F3fNhbY88QZ5Dow6Zd1xlC2gm5w2",
//         "categoryId": "nKOK7jOU01fGpd70etw9",
//         "date": "2021-12-01",
//         "id": "zYjFuV3GCt6cosST1gNc"
//     },
//     {
//         "categoryId": "sfu9XxfjI1bg8kMIpb4Z",
//         "accountId": "CknNK0lyxWDYVd3AYko3",
//         "userId": "F3fNhbY88QZ5Dow6Zd1xlC2gm5w2",
//         "date": "2022-01-18",
//         "sum": 14.49,
//         "expense": true,
//         "id": "zYlOYFNWq3p2QHfepnKf"
//     },
//     {
//         "date": "2022-02-28",
//         "sum": 8.49,
//         "userId": "F3fNhbY88QZ5Dow6Zd1xlC2gm5w2",
//         "categoryId": "sfu9XxfjI1bg8kMIpb4Z",
//         "accountId": "CknNK0lyxWDYVd3AYko3",
//         "expense": true,
//         "id": "zb1o5In54G6ppMLIseHV"
//     }
// ];

// export const copyTransactions = async () => {
//   transactions.forEach(async(transaction) => {
//     const payload = {...transaction};
//     await setDoc(doc(transactionsRef, transaction.id), payload);
//   });
// };

export const create = async (data) => {
  const {sum, expense, date, categoryId, accountId, showInBalance, userId} = data;
  const payload = {sum, expense, date, categoryId, accountId, showInBalance, userId};
  await addDoc(transactionsRef, payload);
};

export const deleteId = async (id) => {
    const docRef = doc(transactionsRef, id);
    await deleteDoc(docRef);
};

export const update = async (data) => {
  const {id, sum, expense, date, categoryId, accountId} = data;
  const docRef = doc(transactionsRef, id);
  const payload = {sum, expense, date, categoryId, accountId};

  updateDoc(docRef, payload);
};
