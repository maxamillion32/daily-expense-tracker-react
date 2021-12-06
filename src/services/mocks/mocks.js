import {nanoid} from 'nanoid';

export const categories = [
  {id: 1, title: `Salary`},
  {id: 2, title: `Rent`},
  {id: 3, title: `Groceries`},
  {id: 4, title: `Transportation & parking fees`},
  {id: 5, title: `Clothing & shoes`},
  {id: 6, title: `Family`},
  {id: 7, title: `Coffee`},
  {id: 8, title: `Health`},
];

export const accounts = [
  {id: 1, title: `Cash`, balance: 2000, startBalance: 0, archive: false},
  {id: 2, title: `Postbank`, balance: 55000, startBalance: 0, archive: false},
  {id: 3, title: `N26`, balance: 550000, startBalance: 0, archive: false},
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

const MAX_ID_LENGTH = 6;

const generateTransactions = (count, accounts, categories) => (Array(count).fill({}).map(() => ({
    id: nanoid(MAX_ID_LENGTH),
    sum: getRandomInt(1, 500),
    date: getRandomDate(),
    outcome: Boolean(Math.round(Math.random())),
    account: getRandomSubarray(accounts),
    category: getRandomSubarray(categories),
  }))
);

export const transactions = generateTransactions(20, accounts, categories);
