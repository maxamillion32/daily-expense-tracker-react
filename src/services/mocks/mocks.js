const category = [
  {id: 1, title: `Salary`},
  {id: 2, title: `Rent`},
  {id: 3, title: `Groceries`},
  {id: 4, title: `Transportation & parking fees`},
  {id: 5, title: `Clothing & shoes`},
  {id: 6, title: `Family`},
  {id: 7, title: `Coffee`},
  {id: 8, title: `Health`},
];

const account = [
  {id: 1, title: `Cash`, balance: 2000, startBalance: 0, archive: false},
  {id: 2, title: `Postbank`, balance: 55000, startBalance: 0, archive: false},
  {id: 3, title: `N26`, balance: 550000, startBalance: 0, archive: false},
];

const transactions = [
  {
    id: 1,
    sum: 70,
    date: `2021-11-02`,
    outcome: true,
    account: {id: 1, title: `N26`},
    category: {id: 1, title: `Health`},
  },
  {
    id: 2,
    sum: 11.50,
    date: `2021-11-02`,
    outcome: true,
    account: {id: 1, title: `Cash`},
    category: {id: 1, title: `Coffee`},
  },
  {
    id: 3,
    sum: 350,
    date: `2021-11-02`,
    outcome: true,
    account: {id: 1, title: `Postbank`},
    category: {id: 1, title: `Clothing & shoes`},
  },
  {
    id: 4,
    sum: 120,
    date: `2021-11-01`,
    outcome: true,
    account: {id: 1, title: `N26`},
    category: {id: 1, title: `Groceries`},
  },
  {
    id: 5,
    sum: 3500,
    date: `2021-11-01`,
    outcome: false,
    account: {id: 1, title: `N26`},
    category: {id: 1, title: `Salary`},
  },
  {
    id: 5,
    sum: 47.3,
    date: `2021-11-03`,
    outcome: true,
    account: {id: 1, title: `N26`},
    category: {id: 1, title: `Family`},
  },
];

module.exports = {
  category,
  account,
  transactions,
};
