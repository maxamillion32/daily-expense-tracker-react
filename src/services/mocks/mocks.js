const category = [
  {id: 1, title: `Supermarket`},
  {id: 2, title: `Clothes`},
  {id: 3, title: `Salary`},
  {id: 4, title: `Family`},
  {id: 5, title: `Cafe`},
  {id: 6, title: `Health`},
  {id: 7, title: `Car`},
];

const account = [
  {id: 1, title: `Postbank`, balance: 55000, startBalance: 0, archive: false},
  {id: 2, title: `Cash`, balance: 2000, startBalance: 0, archive: false},
  {id: 3, title: `N26`, balance: 550000, startBalance: 0, archive: false},
];

const transactions = [
  {
    id: 1,
    sum: 120,
    date: `2021-09-09`,
    outcome: true,
    account: {id: 1, title: `N26`},
    category: {id: 1, title: `Supermarket`},
  },
  {
    id: 2,
    sum: 35,
    date: `2021-09-04`,
    outcome: true,
    account: {id: 1, title: `Cash`},
    category: {id: 1, title: `Cafe`},
  },
  {
    id: 3,
    sum: 3500,
    date: `2021-09-01`,
    outcome: false,
    account: {id: 1, title: `N26`},
    category: {id: 1, title: `Salary`},
  },
];

module.exports = {
  category,
  account,
  transactions,
};
