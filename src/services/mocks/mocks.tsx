import {nanoid} from "nanoid";
import {getRandomInt, getRandomDate} from "./utils";
import {
  MAX_ID_LENGTH, RANGE, SALARY_RANGE,
  accounts, categories
} from "./mocks-config";
import {DEMO_USER_ID} from "../firebase/firebase-config";
import {IAccount, ICategory} from "../../models/models";

export const accountsForFirebase: IAccount[] = [
  {
    id: nanoid(MAX_ID_LENGTH),
    balance: getRandomInt(RANGE.MIN, RANGE.MAX),
    startBalance: getRandomInt(SALARY_RANGE.MIN, SALARY_RANGE.MAX),
    title: accounts[0],
    userId: DEMO_USER_ID,
  },
  {
    id: nanoid(MAX_ID_LENGTH),
    balance: getRandomInt(RANGE.MIN, RANGE.MAX),
    startBalance: getRandomInt(SALARY_RANGE.MIN, SALARY_RANGE.MAX),
    title: accounts[1],
    userId: DEMO_USER_ID,
  },
];

export const categoriesForFirebase: ICategory[] = [
  {
    id: nanoid(MAX_ID_LENGTH),
    icon: categories[0].icon,
    incomes: categories[0].incomes,
    title: categories[0].title,
    userId: DEMO_USER_ID,
    hidden: false
  },
  {
    id: nanoid(MAX_ID_LENGTH),
    icon: categories[1].icon,
    incomes: categories[1].incomes,
    title: categories[1].title,
    userId: DEMO_USER_ID,
    hidden: false
  },
  {
    id: nanoid(MAX_ID_LENGTH),
    icon: categories[2].icon,
    incomes: categories[2].incomes,
    title: categories[2].title,
    userId: DEMO_USER_ID,
    hidden: false
  },
  {
    id: nanoid(MAX_ID_LENGTH),
    icon: categories[3].icon,
    incomes: categories[3].incomes,
    title: categories[3].title,
    userId: DEMO_USER_ID,
    hidden: false
  },
  {
    id: nanoid(MAX_ID_LENGTH),
    icon: categories[4].icon,
    incomes: categories[4].incomes,
    title: categories[4].title,
    userId: DEMO_USER_ID,
    hidden: false
  },
  {
    id: nanoid(MAX_ID_LENGTH),
    icon: categories[5].icon,
    incomes: categories[5].incomes,
    title: categories[5].title,
    userId: DEMO_USER_ID,
    hidden: false
  },
  {
    id: nanoid(MAX_ID_LENGTH),
    icon: categories[6].icon,
    incomes: categories[6].incomes,
    title: categories[6].title,
    userId: DEMO_USER_ID,
    hidden: false
  },
  {
    id: nanoid(MAX_ID_LENGTH),
    icon: categories[7].icon,
    incomes: categories[7].incomes,
    title: categories[7].title,
    userId: DEMO_USER_ID,
    hidden: false
  },
];

const generateTransactions = (count: number, accountsForFirebase: IAccount[], categoriesForFirebase: ICategory[]) => (
  Array(count).fill({}).map(() => {
    const categoryRandomIndex = getRandomInt(0, categoriesForFirebase.length - 1);
    const accountsRandomIndex = getRandomInt(0, accountsForFirebase.length - 1);
    return {
      accountId: accountsForFirebase[accountsRandomIndex].id,
      categoryId: categoriesForFirebase[categoryRandomIndex].id,
      date: getRandomDate(),
      expense: !categoriesForFirebase[categoryRandomIndex].incomes,
      sum: categoriesForFirebase[categoryRandomIndex].incomes
        ? getRandomInt(SALARY_RANGE.MIN, SALARY_RANGE.MAX)
        : getRandomInt(RANGE.MIN, RANGE.MAX),
      userId: DEMO_USER_ID,
      showInBalance: true
    };
  })
);

export const transactionsForFirebase = generateTransactions(150, accountsForFirebase, categoriesForFirebase);
