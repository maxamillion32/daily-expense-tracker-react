import React from 'react';
import WidgetsMonthExpensesItem from './Items/Item'
import {formatMonth} from '../../../utils/utils'
import {
  getSum, getBalance,
  getPercentPerMonth,
  getTotalPercentPerMonth,
  MOTH_COUNT
} from './utils';

function WidgetsMonthExpenses({currentMonth, transactions}) {
  const transactionsPerMonth = transactions
    .filter((transaction) => formatMonth(transaction.date) === currentMonth);

  const getCategories = (transactions, type) => {
    return [...new Set(transactions
    .filter((transaction) => (type === 'expenses' ? transaction.expense : !transaction.expense)
      ? transaction.sum !== 0
      : transaction = null)
    .map(transaction => transaction.category.title))];
  }

  const averageExpense = (getPercentPerMonth(getSum(transactions, 'expenses')));
  const averageIncome = (getPercentPerMonth(getSum(transactions, 'incomes')));

  const getTransactionPercent = (balance, sum) => {
    let percent = getTotalPercentPerMonth(balance, sum);
    let expensesPercent = percent >= 100 ? 100 : percent;

    return expensesPercent === 0 ? 0 : expensesPercent;
  }

  const getTotalPercent = (balance) => {
    const percent = getTotalPercentPerMonth(balance, getSum(transactions, 'expenses'));
    let expensesPercent = percent >= 100
      ? 100
      : percent;

    return expensesPercent === 0 ? 1 : expensesPercent;
  }

  const getTotalPercentPerCategory = (category, type) => {
    const balancePerCategory = getBalance(category, type, transactions);
    const balance = getBalance(category, type, transactionsPerMonth);
    const percent = getTotalPercentPerMonth(balance, balancePerCategory);
    let expensesPercent = percent >= 100
      ? 100
      : percent;

    return expensesPercent === 0 ? 0 : expensesPercent;
  }

  const getAbovePercent = (balance, sum) => {
    const percent = getTotalPercentPerMonth(balance, sum);
    const expensesPercent = percent > 100 ? percent - 100 : 0;

    return expensesPercent;
  }

  const getAbovePercentPerCategory = (category, type) => {
    const balancePerCategory = getBalance(category, type, transactions);
    const balance = getBalance(category, type, transactionsPerMonth);
    const percent = getTotalPercentPerMonth(balance, balancePerCategory);
    const expensesPercent = percent > 100 ? percent - 100 : 0;

    return expensesPercent;
  }

  const getAveragePercent = (expense, sum) => {
    const averageValue =  (expense - sum).toFixed(2);

    return averageValue >= 0
      ? `${averageValue}€ below typical`
      : `${Math.abs(averageValue)}€ above typical`;
  }

  const getAveragePercentPerCategory = (category, type) => {
    const balancePerCategory = getBalance(category, type, transactions);
    const transactionsSumPerCategory = getBalance(category, type, transactionsPerMonth)

    const averageValue = ((balancePerCategory / MOTH_COUNT) - transactionsSumPerCategory).toFixed(2);

    return averageValue >= 0
      ? `${averageValue}€ below typical`
      : `${Math.abs(averageValue)}€ above typical`;
  }

  return (
    <>
      <WidgetsMonthExpensesItem
        categories={getCategories(transactionsPerMonth, 'expenses')}
        abovePercent={getAbovePercent(getSum(transactionsPerMonth, 'expenses'), getSum(transactions, 'expenses'))}
        abovePercentPerCategory={getAbovePercentPerCategory}
        totalPercent={getTotalPercent(getSum(transactionsPerMonth, 'expenses'), getSum(transactions, 'expenses'))}
        totalPercentPerCategory={getTotalPercentPerCategory}
        averagePercent={getAveragePercent(averageExpense, getSum(transactionsPerMonth, 'expenses'))}
        averagePercentPerCategory={getAveragePercentPerCategory}
        transactionPercent={getTransactionPercent}
        transactionsSum={getSum(transactionsPerMonth, 'expenses')}
        type={"expenses"}
        title={"Expenses"}
        balance={getBalance}
        transactionsPerMonth={transactionsPerMonth}
      />

      <WidgetsMonthExpensesItem
        categories={getCategories(transactionsPerMonth, 'incomes')}
        abovePercent={getAbovePercent(getSum(transactionsPerMonth, 'incomes'), getSum(transactions, 'incomes'))}
        abovePercentPerCategory={getAbovePercentPerCategory}
        totalPercent={getTotalPercent(getSum(transactionsPerMonth, 'incomes'), getSum(transactions, 'incomes'))}
        totalPercentPerCategory={getTotalPercentPerCategory}
        averagePercent={getAveragePercent(averageIncome, getSum(transactionsPerMonth, 'incomes'))}
        averagePercentPerCategory={getAveragePercentPerCategory}
        transactionPercent={getTransactionPercent}
        transactionsSum={getSum(transactionsPerMonth, 'incomes')}
        type={"incomes"}
        title={"Incomes"}
        balance={getBalance}
        transactionsPerMonth={transactionsPerMonth}
      />
    </>
  )
}

export default WidgetsMonthExpenses;
