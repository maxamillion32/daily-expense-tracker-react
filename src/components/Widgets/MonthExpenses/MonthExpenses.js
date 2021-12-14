import React from 'react';
import WidgetsMonthExpensesItem from './Items/Item'
import {formatMonth} from '../../../utils/utils'
import {Statistics} from './Statistics';
import {TRANSACTION_TYPE} from './const';

function WidgetsMonthExpenses({currentMonth, transactions}) {
  // for test
  const budget = {
    incomes: 2000,
    expenses: 2000
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
        month={currentMonth}
      />

      <WidgetsMonthExpensesItem
        categories={incomes.categories(TRANSACTION_TYPE.INCOMES)}

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
        month={currentMonth}
      />
    </>
  )
}

export default WidgetsMonthExpenses;
