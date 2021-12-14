import React from 'react';
import WidgetsMonthExpensesItem from './Items/Item'
import {formatMonth} from '../../../utils/utils'
import {Statistics} from './Statistics';
import {TRANSACTION_TYPE} from './const';

function WidgetsMonthExpenses({currentMonth, transactions}) {
  // for test
  const budget = {
    incomes: {
      total: 2000,
      category: {
        Salary: 500,
        Rent: 500,
        Groceries: 500,
        'Parking fees': 500,
        'Clothing & shoes': 500,
        Family: 500,
        Coffee: 500,
        Health: 500,
      }
    },
    expenses: {
      total: 2000,
      category: {
        Salary: 300,
        Rent: 300,
        Groceries: 300,
        'Parking fees': 300,
        'Clothing & shoes': 300,
        Family: 300,
        Coffee: 300,
        Health: 300,
      }
    }
  }

  const monthTransactions = transactions
    .filter((transaction) => formatMonth(transaction.date) === currentMonth);

  const expenses = new Statistics(transactions, TRANSACTION_TYPE.EXPENSES, budget.expenses, monthTransactions);
  const incomes = new Statistics(transactions, TRANSACTION_TYPE.INCOMES, budget.incomes, monthTransactions);

  return (
    <>
      <WidgetsMonthExpensesItem
        categories={expenses.categories(TRANSACTION_TYPE.EXPENSES)}

        categoryPercent={expenses.percentCategory}
        excessCategoryPercent={expenses.excessCategoryPercent}
        balanceCategoryOfCurrent={expenses.balanceCategoryOfCurrent}
        totalCategoryPercent={expenses.totalCategoryPercent}

        excessPercent={expenses.excessPercent()}
        balanceOfCurrent={expenses.balanceOfCurrent()}
        totalPercent={expenses.totalPercent()}
        transactionsSum={expenses.sum()}

        monthTransactions={monthTransactions}

        type={TRANSACTION_TYPE.EXPENSES}
        title={"Expenses"}
        month={currentMonth}
      />

      <WidgetsMonthExpensesItem
        categories={incomes.categories(TRANSACTION_TYPE.INCOMES)}

        categoryPercent={incomes.percentCategory}
        excessCategoryPercent={incomes.excessCategoryPercent}
        balanceCategoryOfCurrent={incomes.balanceCategoryOfCurrent}
        totalCategoryPercent={incomes.totalCategoryPercent}

        excessPercent={incomes.excessPercent()}
        balanceOfCurrent={incomes.balanceOfCurrent()}
        totalPercent={incomes.totalPercent()}
        transactionsSum={incomes.sum()}

        monthTransactions={monthTransactions}

        type={TRANSACTION_TYPE.INCOMES}
        title={"Incomes"}
        month={currentMonth}
      />
    </>
  )
}

export default WidgetsMonthExpenses;
