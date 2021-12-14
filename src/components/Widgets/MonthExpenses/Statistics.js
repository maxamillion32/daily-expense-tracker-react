import {
  getMonthAverageSum,
  getSum,
  getTotalPercentPerMonth,
  getBalance,
  MOTH_COUNT
} from "./utils";
import {TRANSACTION_TYPE} from './const';

export class Statistics {
  constructor(transactions, type, budget, monthTransactions) {
    this.transactions = transactions;
    this.type = type;
    this.budget = budget;
    this.monthTransactions = monthTransactions;
  }

  _getExcessPercent = (balance, sum) => {
    const percent = getTotalPercentPerMonth(balance, sum);
    const expensesPercent = percent > 100 ? percent - 100 : 0;

    return expensesPercent;
  }

  _getExcessBudgetPercent = (balance, sum) => {
    const percent = balance / sum * 100;
    const expensesPercent = percent > 100 ? percent - 100 : 0;

    return expensesPercent;
  }

  _getTotalPercent(balance, sum) {
    const percent = getTotalPercentPerMonth(balance, sum);
    let expensesPercent = percent >= 100
      ? 100
      : percent;

    return expensesPercent === 0 ? 1 : expensesPercent;
  }

  categories(type) {
    return [...new Set(this.monthTransactions
    .filter((transaction) => (type === TRANSACTION_TYPE.EXPENSES ? transaction.expense : !transaction.expense)
      ? transaction.sum !== 0
      : transaction = null)
    .map(transaction => transaction.category.title))];
  }

  sum() {
    return getSum(this.monthTransactions, this.type);
  }

  averageSum() {
    return !this.budget
    ? (getMonthAverageSum(getSum(this.transactions, this.type)))
    : this.budget;
  }

  excessPercent() {
    return this.budget
    ? this._getExcessBudgetPercent(getSum(this.monthTransactions, this.type), this.averageSum())
    : this._getExcessPercent(getSum(this.monthTransactions, this.type), getSum(this.transactions, this.type));
  }

  balanceOfCurrent() {
    const averageValue =  (this.averageSum() - getSum(this.monthTransactions, this.type)).toFixed(2);

    return averageValue >= 0
      ? `${averageValue}€ below ${this.budget ? "budget" : "typical"}`
      : `${Math.abs(averageValue)}€ above ${this.budget ? "budget" : "typical"}`;
  }

  totalPercent() {
    return this.budget
    ? (((getSum(this.monthTransactions, this.type) / this.averageSum()) * 100) >= 100
      ? 100
      : (getSum(this.monthTransactions, this.type) / this.averageSum()) * 100)
    : this._getTotalPercent(getSum(this.monthTransactions, this.type), getSum(this.transactions, this.type));
  }

  percentCategory(balance, sum) {
    let percent = (balance / sum * 100).toFixed(2);
    const expensesPercent = percent > 99.9 ? 100 : percent;

    return expensesPercent;
  }

  excessCategoryPercent(category, type, transactions, monthTransactions) {
    const balancePerCategory = getBalance(category, type, transactions);
    const balance = getBalance(category, type, monthTransactions);
    const percent = getTotalPercentPerMonth(balance, balancePerCategory);
    const expensesPercent = percent > 100 ? percent - 100 : 0;

    return expensesPercent;
  }

  balanceCategoryOfCurrent(category, type, transactions, monthTransactions) {
    const balancePerCategory = getBalance(category, type, transactions);
    const transactionsSumPerCategory = getBalance(category, type, monthTransactions)

    const averageValue = ((balancePerCategory / MOTH_COUNT) - transactionsSumPerCategory).toFixed(2);

    return averageValue >= 0
      ? `${averageValue}€ below typical`
      : `${Math.abs(averageValue)}€ above typical`;
  }

  totalCategoryPercent(category, type, transactions, monthTransactions) {
    const balancePerCategory = getBalance(category, type, transactions);
    const balance = getBalance(category, type, monthTransactions);
    const percent = getTotalPercentPerMonth(balance, balancePerCategory);
    let expensesPercent = percent >= 100
      ? 100
      : percent;

    return expensesPercent === 0 ? 0 : expensesPercent;
  }
}
