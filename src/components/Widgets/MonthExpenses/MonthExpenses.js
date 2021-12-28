import React from 'react';
// import {useSelector} from 'react-redux';
import WidgetsMonthExpensesItem from './Items/Item'
import {formatMonth} from '../../../utils/utils'
import {Statistics} from './Statistics';
import {TRANSACTION_TYPE} from './const';
// import {selectBudgetState} from '../../../reducers/budget/budget-slice';

function WidgetsMonthExpenses({currentYear, currentMonth, transactions, budget, userId}) {
  // const budget = useSelector(selectBudgetState);

  if (!budget) {
    return (<p></p>)
  }

  const monthTransactions = transactions
    .filter((transaction) => formatMonth(transaction.date) === currentMonth);

  const expenses = new Statistics(transactions, TRANSACTION_TYPE.EXPENSES, budget, monthTransactions, currentMonth, userId);
  const incomes = new Statistics(transactions, TRANSACTION_TYPE.INCOMES, budget, monthTransactions, currentMonth, userId);

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
