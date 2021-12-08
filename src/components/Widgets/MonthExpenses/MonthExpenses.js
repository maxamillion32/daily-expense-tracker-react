import React from 'react';
import Item from './Items/Item'
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
        .reduce((acc, sum) => acc + sum, 0);
  }

  const averageExpense = Math.round(((getSum(transactions, 'expenses') * 100 / 12 / 100)));
  const averageIncome = Math.round(((getSum(transactions, 'incomes') * 100 / 12 / 100)));

  const getTransactionPercent = (balance, sum) => {
    let percent = (balance / sum * 100);
    percent = Math.round(percent);
    let expensesPercent = percent >= 100 ? 100 : percent;

    return expensesPercent === 0 ? 1 : expensesPercent;
  }

  const getTotalPercent = (balance, sum) => {
    const percent = (balance / (getSum(transactions, 'expenses') / 12) * 100);
    let expensesPercent = percent >= 100
      ? 100
      : percent;

    return expensesPercent === 0 ? 1 : expensesPercent;
  }

  const getAbovePercent = (balance, sum) => {
    const percent = (balance / (sum / 12) * 100);
    let expensesPercent = 0;

    if (percent > 100) {
      return expensesPercent = percent - 100;
    }

    return expensesPercent;
  }

  const getAveragePercent = (expense, sum) => {
    const averageValue = expense - sum;

    return averageValue >= 0
      ? `${averageValue}€ up to average`
      : `${Math.abs(averageValue)}€ above to average`;
  }

  const getBalance = (category, title) => {
    const balance = filteredTransactions
      .filter((transaction) => transaction.category.title === category)
      .map((transaction) => (title === 'Incomes' ? !transaction.expense : transaction.expense) ? transaction = +transaction.sum : transaction = null)
      .reduce((acc, sum) => acc + sum, 0);

      return balance;
  }

  return (
    <>
      <Item
        categories={getCategories(filteredTransactions, 'expenses')}
        abovePercent={getAbovePercent(getSum(filteredTransactions, 'expenses'), getSum(transactions, 'expenses'))}
        totalPercent={getTotalPercent(getSum(filteredTransactions, 'expenses'), getSum(transactions, 'expenses'))}
        averagePercent={getAveragePercent(averageExpense, getSum(filteredTransactions, 'expenses'))}
        transactionPercent={getTransactionPercent}
        transactionsSum={getSum(filteredTransactions, 'expenses')}
        title={"Expenses"}
        balance={getBalance}
      />

      <Item
        categories={getCategories(filteredTransactions, 'incomes')}
        abovePercent={getAbovePercent(getSum(filteredTransactions, 'incomes'), getSum(transactions, 'incomes'))}
        totalPercent={getTotalPercent(getSum(filteredTransactions, 'incomes'), getSum(transactions, 'incomes'))}
        averagePercent={getAveragePercent(averageIncome, getSum(filteredTransactions, 'incomes'))}
        transactionPercent={getTransactionPercent}
        transactionsSum={getSum(filteredTransactions, 'incomes')}
        title={"Incomes"}
        balance={getBalance}
      />
    </>
  )
}

export default WidgetsMonthExpenses;
