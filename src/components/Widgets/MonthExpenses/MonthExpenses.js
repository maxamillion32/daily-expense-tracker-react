import React from 'react';
import WidgetsMonthExpensesItem from './Items/Item'
import {formatMonth} from '../../../utils/utils'

function WidgetsMonthExpenses({currentMonth, transactions}) {
  const filteredTransactions = transactions
    .filter((transaction) => formatMonth(transaction.date) === currentMonth);

  const getCategories = (transactions, type) => {
    return [...new Set(transactions
    .filter((transaction) => (type === 'expenses' ? transaction.expense : !transaction.expense)
      ? transaction.sum !== 0
      : transaction = null)
    .map(transaction => transaction.category.title))];
  }

  const getSum = (transactions, type) => {
      return transactions
        .map((transaction) => (type === 'expenses' ? transaction.expense : !transaction.expense)
        ? transaction = +transaction.sum
        : transaction = null)
        .reduce((acc, sum) => acc + sum, 0).toFixed(2);
  }

  const averageExpense = (getSum(transactions, 'expenses') / 12).toFixed(2);
  const averageIncome = (getSum(transactions, 'incomes') / 12).toFixed(2);

  const getTransactionPercent = (balance, sum) => {
    let percent = (balance / sum * 100);
    percent = percent.toFixed(2);
    let expensesPercent = percent >= 100 ? 100 : percent;

    return expensesPercent === 0 ? 0 : expensesPercent;
  }

  const getTotalPercent = (balance) => {
    const percent = (balance / (getSum(transactions, 'expenses') / 12) * 100).toFixed(2);
    let expensesPercent = percent >= 100
      ? 100
      : percent;

    return expensesPercent === 0 ? 1 : expensesPercent;
  }


  const getTotalPercentPerCategory = (category, type) => {
    const balancePerCategory = getBalance(category, type, transactions);
    const balance = getBalance(category, type);
    const percent = (balance / (balancePerCategory / 12) * 100).toFixed(2);
    let expensesPercent = percent >= 100
      ? 100
      : percent;

    return expensesPercent === 0 ? 0 : expensesPercent;
  }

  const getAbovePercent = (balance, sum) => {
    const percent = (balance / (sum / 12) * 100).toFixed(2);
    let expensesPercent = 0;

    if (percent > 100) {
      return expensesPercent = percent - 100;
    }

    return expensesPercent;
  }

  const getAbovePercentPerCategory = (category, type) => {
    const balancePerCategory = getBalance(category, type, transactions);
    const balance = getBalance(category, type);
    const percent = (balance / (balancePerCategory / 12) * 100).toFixed(2);
    let expensesPercent = 0;

    if (percent > 100) {
      expensesPercent = percent - 100
      return expensesPercent ;
    }

    return expensesPercent;
  }

  const getAveragePercent = (expense, sum) => {
    const averageValue =  (expense - sum).toFixed(2);

    return averageValue >= 0
      ? `${averageValue}€ up to average`
      : `${Math.abs(averageValue)}€ above to average`;
  }

  const getAveragePercentPerCategory = (category, type) => {
    const balancePerCategory = getBalance(category, type, transactions);
    const transactionsSumPerCategory = getBalance(category, type)

    const averageValue = ((balancePerCategory / 12) - transactionsSumPerCategory).toFixed(2);

    return averageValue >= 0
      ? `${averageValue}€ up to average`
      : `${averageValue}€ above to average`;
  }

  const getBalance = (category, type, items = filteredTransactions) => {
    const balance = items
      .filter((transaction) => transaction.category.title === category)
      .map((transaction) => (type === 'incomes' ? !transaction.expense : transaction.expense) ? transaction = +transaction.sum : transaction = null)
      .reduce((acc, sum) => acc + sum, 0);

      return balance.toFixed(2);
  }

  return (
    <>
      <WidgetsMonthExpensesItem
        categories={getCategories(filteredTransactions, 'expenses')}
        abovePercent={getAbovePercent(getSum(filteredTransactions, 'expenses'), getSum(transactions, 'expenses'))}
        abovePercentPerCategory={getAbovePercentPerCategory}
        totalPercent={getTotalPercent(getSum(filteredTransactions, 'expenses'), getSum(transactions, 'expenses'))}
        totalPercentPerCategory={getTotalPercentPerCategory}
        averagePercent={getAveragePercent(averageExpense, getSum(filteredTransactions, 'expenses'))}
        averagePercentPerCategory={getAveragePercentPerCategory}
        transactionPercent={getTransactionPercent}
        transactionsSum={getSum(filteredTransactions, 'expenses')}
        type={"expenses"}
        title={"Expenses"}
        balance={getBalance}
      />

      <WidgetsMonthExpensesItem
        categories={getCategories(filteredTransactions, 'incomes')}
        abovePercent={getAbovePercent(getSum(filteredTransactions, 'incomes'), getSum(transactions, 'incomes'))}
        abovePercentPerCategory={getAbovePercentPerCategory}
        totalPercent={getTotalPercent(getSum(filteredTransactions, 'incomes'), getSum(transactions, 'incomes'))}
        totalPercentPerCategory={getTotalPercentPerCategory}
        averagePercent={getAveragePercent(averageIncome, getSum(filteredTransactions, 'incomes'))}
        averagePercentPerCategory={getAveragePercentPerCategory}
        transactionPercent={getTransactionPercent}
        transactionsSum={getSum(filteredTransactions, 'incomes')}
        type={"incomes"}
        title={"Incomes"}
        balance={getBalance}
      />
    </>
  )
}

export default WidgetsMonthExpenses;
