import {nanoid} from "nanoid";

const MAX_ID_LENGTH = 6;

export const categories = [
  {id: nanoid(MAX_ID_LENGTH), title: "Salary"},
  {id: nanoid(MAX_ID_LENGTH), title: "Rent"},
  {id: nanoid(MAX_ID_LENGTH), title: "Groceries"},
  {id: nanoid(MAX_ID_LENGTH), title: "Parking fees"},
  {id: nanoid(MAX_ID_LENGTH), title: "Clothing & shoes"},
  {id: nanoid(MAX_ID_LENGTH), title: "Family"},
  {id: nanoid(MAX_ID_LENGTH), title: "Coffee"},
  {id: nanoid(MAX_ID_LENGTH), title: "Health"},
];

export const accounts = [
  {id: nanoid(MAX_ID_LENGTH), title: "Cash", balance: 2000, startBalance: 0, archive: false},
  {id: nanoid(MAX_ID_LENGTH), title: "Postbank", balance: 55000, startBalance: 0, archive: false},
  {id: nanoid(MAX_ID_LENGTH), title: "N26", balance: 550000, startBalance: 0, archive: false},
];

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getRandomSubarray = (items) => {
  items = items.slice();
  let count = 1;
  const result = [];
  while (count--) {
    result.push(
        ...items.splice(
            getRandomInt(0, items.length - 1), 1)
    );
  }
  return result[0];
};

const getRandomDate = () => {
  const startPoint = new Date().getTime();
  const endPoint = startPoint - new Date(360 * (24 * 3600 * 1000)).getTime();
  const date = new Date(endPoint + Math.random() * (startPoint - endPoint));

  return date.toISOString().slice(0, -14);
};

const generateTransactions = (count, accounts, categories) => (Array(count).fill({}).map(() => ({
    id: nanoid(MAX_ID_LENGTH),
    sum: getRandomInt(1, 500),
    date: getRandomDate(),
    expense: Boolean(Math.round(Math.random())),
    account: getRandomSubarray(accounts),
    category: getRandomSubarray(categories),
  }))
);

export const transactions = generateTransactions(100, accounts, categories);
