import {nanoid} from "nanoid";

const MAX_ID_LENGTH = 6;

const titles = [
  "Salary",
  "Rent",
  "Groceries",
  "Parking fees",
  "Clothing & shoes",
  "Family",
  "Coffee",
  "Health"
];

const icons = [
    "fa-shopping-cart",
    "fa-id-card",
    "fa-coffee",
    "fa-bath",
    "fa-subway",
    "fa-home",
    "fa-shopping-bag",
    "fa-briefcase",
    "fa-hand-holding-usd",
    "fa-cut",
    "fa-gifts",
    "fa-utensils",
    "fa-asterisk",
    "fa-baby-carriage",
    "fa-basketball-ball",
    "fa-beer",
    "fa-cat",
    "fa-envelope",
    "fa-faucet",
    "fa-film",
    "fa-gas-pump",
    "fa-graduation-cap",
    "fa-hamburger",
    "fa-hotel",
    "fa-plane",
    "fa-socks",
    "fa-theater-masks",
    "fa-tv",
    "fa-umbrella-beach",
    "fa-wrench",
  ];

const userId = "64PX99A3tQNHepIlUmorFUXKOhl2";

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getRandomDate = () => {
  const startPoint = new Date().getTime();
  const endPoint = startPoint - new Date(360 * (24 * 3600 * 1000)).getTime();
  const date = new Date(endPoint + Math.random() * (startPoint - endPoint));

  return date.toISOString().slice(0, -14);
};

const getId = (items) => {
  return items.map((item) => item.id);
};

const generateAccounts = (count) => (Array(count).fill({}).map((i) => ({
    id: nanoid(MAX_ID_LENGTH),
    balance: getRandomInt(1, 500),
    startBalance: getRandomInt(1, 500),
    title: getRandomDate(),
    userId,
  }))
);

const generateCategories = (count) => (Array(count).fill({}).map(() => ({
    id: nanoid(MAX_ID_LENGTH),
    icon: icons[getRandomInt(0, icons.length - 1)],
    incomes: Boolean(Math.round(Math.random())),
    title: titles[getRandomInt(0, titles.length - 1)],
    userId,
    hidden: false
  }))
);

export const accounts = generateAccounts(2);
export const categories = generateCategories(2);

const accountsIds = getId(accounts);
const categoriesIds = getId(categories);

const generateTransactions = (count, accounts, categories) => (Array(count).fill({}).map(() => ({
    accountId: accountsIds[getRandomInt(0, accounts.length - 1)],
    categoryId: categoriesIds[getRandomInt(0, categories.length - 1)],
    date: getRandomDate(),
    expense: Boolean(Math.round(Math.random())),
    sum: getRandomInt(1, 500),
    userId,
  }))
);

export const transactions = generateTransactions(5, accounts, categories);
