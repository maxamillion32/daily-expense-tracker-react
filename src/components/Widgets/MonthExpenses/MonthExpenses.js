import React from 'react';
import WidgetsMonthExpensesItem from './Items/Item'
import {formatMonth} from '../../../utils/utils'
import {Statistics} from './Statistics';

function WidgetsMonthExpenses({currentMonth, transactions}) {
  const monthTransactions = transactions
    .filter((transaction) => formatMonth(transaction.date) === currentMonth);

  const getCategories = (transactions, type) => {
    return [...new Set(transactions
    .filter((transaction) => (type === 'expenses' ? transaction.expense : !transaction.expense)
      ? transaction.sum !== 0
      : transaction = null)
    .map(transaction => transaction.category.title))];
  }

  // for test
  const budget = {
    incomes: 2000,
    expenses: 2000
  }

  const TRANSACTION_TYPE = {
    EXPENSES: 'expenses',
    INCOMES: 'incomes',
  }

  const expenses = new Statistics(transactions, TRANSACTION_TYPE.EXPENSES, budget.expenses, currentMonth);
  const incomes = new Statistics(transactions, TRANSACTION_TYPE.INCOMES, budget.incomes, currentMonth);

  return (
    <>
      <WidgetsMonthExpensesItem
        categories={getCategories(monthTransactions, 'expenses')}

        categoryPercent={expenses.percentCategory}
        excessCategoryPercent={expenses.excessCategoryPercent}
        percentCategoryOfTotal={expenses.percentCategoryOfTotal}
        totalCategoryPercent={expenses.totalCategoryPercent}

        excessPercent={expenses.excessPercent()}
        percentOfTotal={expenses.percentOfTotal()}
        totalPercent={expenses.totalPercent()}
        transactionsSum={expenses.sum()}

        monthTransactions={monthTransactions}
        transactions={transactions}

        type={TRANSACTION_TYPE.EXPENSES}
        title={"Expenses"}
      />

      <WidgetsMonthExpensesItem
        categories={getCategories(monthTransactions, 'incomes')}

        categoryPercent={incomes.percentCategory}
        excessCategoryPercent={incomes.excessCategoryPercent}
        percentCategoryOfTotal={incomes.percentCategoryOfTotal}
        totalCategoryPercent={incomes.totalCategoryPercent}

        excessPercent={incomes.excessPercent()}
        percentOfTotal={incomes.percentOfTotal()}
        totalPercent={incomes.totalPercent()}
        transactionsSum={incomes.sum()}

        monthTransactions={monthTransactions}
        transactions={transactions}

        type={TRANSACTION_TYPE.INCOMES}
        title={"Incomes"}
      />
    </>
  )
}

export default WidgetsMonthExpenses;
