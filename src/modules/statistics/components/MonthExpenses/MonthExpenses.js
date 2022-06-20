import React, {useState, useMemo, useCallback} from "react";
import {useSelector} from "react-redux";

import {
  selectCurrentMonth,
  selectCurrentYear, selectFilteredTransactions
} from "../../../../reducers/transactions/transactions-slice";
import {selectUserId} from "../../../../reducers/user/user-slice";
import {selectAllBudgetState} from "../../../../reducers/budget/budget-slice";
import {selectFilteredCategories} from "../../../../reducers/categories/categories-slice";

import WidgetsMonthExpensesItem from "./Items/Item";
import {Statistics} from "./Statistics";

import {formatMonth, formatYear} from "../../../common/utils/utils";
import {TRANSACTION_TYPE} from "./utils/constants";

function WidgetsMonthExpenses() {
  const getTransactions = useSelector(selectFilteredTransactions);
  const allCategories = useSelector(selectFilteredCategories);
  const budget = useSelector(selectAllBudgetState);
  const currentMonth = useSelector(selectCurrentMonth);
  const currentYear = useSelector(selectCurrentYear);
  const userId = useSelector(selectUserId);

  const [transactions, setTransactions] = useState(getTransactions);

  const monthTransactions = useMemo(() => {
    return transactions
    .filter((transaction) => formatYear(transaction.date) === currentYear)
    .filter((transaction) => formatMonth(transaction.date) === currentMonth);
  }, [transactions, currentYear, currentMonth]);

  const expenses = useCallback(new Statistics(transactions, TRANSACTION_TYPE.EXPENSES, budget, monthTransactions, currentMonth, currentYear, userId, allCategories), [monthTransactions, currentYear, currentMonth]);
  const incomes = useCallback(new Statistics(transactions, TRANSACTION_TYPE.INCOMES, budget, monthTransactions, currentMonth, currentYear, userId, allCategories), [monthTransactions, currentYear, currentMonth]);

  return (
    <>
      <WidgetsMonthExpensesItem
        categories={expenses.categories(TRANSACTION_TYPE.EXPENSES)}

        categoryPercent={expenses.percentCategory}
        excessCategoryPercent={expenses.excessCategoryPercent}
        balanceCurrentCategory={expenses.balanceCurrentCategory}
        totalCategoryPercent={expenses.totalCategoryPercent}

        excessPercent={expenses.excessPercent()}
        currentBalance={expenses.currentBalance()}
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
        balanceCurrentCategory={incomes.balanceCurrentCategory}
        totalCategoryPercent={incomes.totalCategoryPercent}

        excessPercent={incomes.excessPercent()}
        currentBalance={incomes.currentBalance()}
        totalPercent={incomes.totalPercent()}
        transactionsSum={incomes.sum()}

        monthTransactions={monthTransactions}

        type={TRANSACTION_TYPE.INCOMES}
        title={"Incomes"}
        month={currentMonth}
      />
    </>
  );
}

export default WidgetsMonthExpenses;
