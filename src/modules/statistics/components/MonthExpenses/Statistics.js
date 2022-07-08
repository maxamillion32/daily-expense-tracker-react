import {
  getCategoryBalance,
  getMonthAverageSum,
  getMonthCountPerCategory,
  getMonthSum,
  getMonthTotalPercent
} from "./utils/utils";
import {TRANSACTION_TYPE} from "./utils/constants";

export class Statistics {
  constructor(transactions, type, budget, monthTransactions, currentMonth, currentYear, userId, allCategories) {
    this.transactions = transactions;
    this.allCategories = allCategories;
    this.type = type;
    this.budget = budget;
    this.monthTransactions = monthTransactions;
    this.currentMonth = currentMonth;
    this.currentYear = currentYear;
    this.category = this.type[0].toUpperCase() + this.type.slice(1);
    this.userId = userId;
    this.isBudget = this.budget && this.budget[currentYear] && this.budget[currentYear][currentMonth];

    this.excessCategoryPercent = this.excessCategoryPercent.bind(this);
    this.balanceCurrentCategory = this.balanceCurrentCategory.bind(this);
    this.totalCategoryPercent = this.totalCategoryPercent.bind(this);
    this.averageSum = this.averageSum.bind(this);
  }

  _getExcessPercent(balance, sum) {
    const percent = getMonthTotalPercent(balance, sum, this.transactions);
    return percent > 100 ? percent - 100 : 0;
  }

  _getExcessBudgetPercent(balance, sum) {
    const percent = balance / sum * 100;
    return percent > 100 ? percent - 100 : 0;
  }

  _getTotalPercent(balance, sum) {
    const percent = getMonthTotalPercent(balance, sum, this.transactions);
    let expensesPercent = percent >= 100
      ? 100
      : percent;

    return expensesPercent === 0 ? 1 : expensesPercent;
  }

  _categoryId(category, type) {
    const isIncomes = type === "incomes";

    return this.allCategories
      .filter((item) => item.incomes === isIncomes)
      .filter((item) => item.title === category)
      .map((item) => item.id).join();
  }

  categories(type) {
    const uniqueCategory = [...new Set(this.monthTransactions
      .filter((transaction) => (
        type === TRANSACTION_TYPE.EXPENSES
          ? transaction.expense
          : transaction.expense === null ? null : !transaction.expense
      )
        ? transaction.sum !== 0
        : transaction = null)
      .map(transaction => transaction.category.title))];

    return uniqueCategory
      .map((category) => this.monthTransactions
        .map((transaction) => transaction.category.title === category
          ? (type === "expenses" ? transaction.expense : !transaction.expense)
            ? transaction = {[category]: +transaction.sum}
            : transaction = null
          : null)
        .filter((item) => item ? item : null)
        .reduce((acc, sum) => {
          return {
            [category]: acc[category] + sum[category]
          };
        }))
      .sort((a, b) => Object.values(b) - Object.values(a))
      .map((item) => Object.keys(item)).flat();
  }

  sum() {
    return getMonthSum(this.monthTransactions, this.type);
  }

  averageSum() {
    return !this.isBudget
    ? (getMonthAverageSum(getMonthSum(this.transactions, this.type), this.transactions))
    : this.budget[this.currentYear][this.currentMonth][this.type][this.category];
  }

  excessPercent() {
    return this.isBudget && this.budget[this.currentYear][this.currentMonth][this.type][this.category]
    ? this._getExcessBudgetPercent(getMonthSum(this.monthTransactions, this.type), this.averageSum())
    : this._getExcessPercent(getMonthSum(this.monthTransactions, this.type), getMonthSum(this.transactions, this.type));
  }

  currentBalance() {
    const averageValue =  (this.averageSum() - getMonthSum(this.monthTransactions, this.type)).toFixed(2);

    if (!this.isBudget) {
      return averageValue > 0
      ? `${averageValue}€ below typical`
      : isNaN(averageValue) ? ""
      : averageValue === "0.00" ? "equal to typical"
      : `${Math.abs(averageValue)}€ above typical`;
    }

    return averageValue > 0
      ? `${averageValue}€ below budget`
      : isNaN(averageValue) ? ""
      : averageValue === "0.00" ? "equal to budget"
      : `${Math.abs(averageValue)}€ above budget`;
  }

  totalPercent() {
    return this.isBudget && this.budget[this.currentYear][this.currentMonth][this.type][this.category]
    ? (((getMonthSum(this.monthTransactions, this.type) / this.averageSum()) * 100) >= 100
      ? 100
      : (getMonthSum(this.monthTransactions, this.type) / this.averageSum()) * 100)
    : this._getTotalPercent(getMonthSum(this.monthTransactions, this.type), getMonthSum(this.transactions, this.type));
  }

  percentCategory(balance, sum) {
    let percent = (balance / sum * 100).toFixed(2);
    return percent > 99.9 ? 100 : percent;
  }

  excessCategoryPercent(category, type) {
    const balancePerCategory = getCategoryBalance(category, type, this.transactions);
    const balance = getCategoryBalance(category, type, this.monthTransactions);

    const budget = this.isBudget && this.budget[this.currentYear][this.currentMonth][this.type][this._categoryId(category, type)];

    const percent = budget
      ? balance / budget * 100
      : getMonthTotalPercent(balance, balancePerCategory, this.transactions, category);
    return percent > 100 ? percent - 100 : 0;
  }

  balanceCurrentCategory(category, type) {
    const balancePerCategory = getCategoryBalance(category, type, this.transactions);
    const transactionsSumPerCategory = getCategoryBalance(category, type, this.monthTransactions);
    const monthCount = getMonthCountPerCategory(this.transactions, category);

    const budget = this.isBudget && this.budget[this.currentYear][this.currentMonth][this.type][this._categoryId(category, type)];

    const averageValue = budget
    ? (budget - transactionsSumPerCategory).toFixed(2)
    : ((balancePerCategory / monthCount) - transactionsSumPerCategory).toFixed(2);

    return averageValue > 0
      ? `${averageValue}€ below ${budget ? "budget" : "typical"}`
      : averageValue === "0.00" ? (budget ? "equal to budget" : "equal to typical")
      : `${Math.abs(averageValue)}€ above ${budget ? "budget" : "typical"}`;
  }

  totalCategoryPercent(category, type) {
    const balancePerCategory = getCategoryBalance(category, type, this.transactions);
    const balance = getCategoryBalance(category, type, this.monthTransactions);

    const budget = this.isBudget && this.budget[this.currentYear][this.currentMonth][this.type][this._categoryId(category, type)];

    const percent = budget
      ? balance / budget * 100
      : getMonthTotalPercent(balance, balancePerCategory, this.transactions, category);
    let expensesPercent = percent >= 100
    ? 100
    : percent;

    return expensesPercent === 0 ? 0 : expensesPercent;
  }
}
