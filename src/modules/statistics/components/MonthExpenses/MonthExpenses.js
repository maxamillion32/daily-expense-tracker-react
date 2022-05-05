import React from "react";
import WidgetsMonthExpensesItem from "./Items/Item";
import {formatMonth, formatYear} from "../../../common/utils/utils";
import {Statistics} from "./Statistics";
import {TRANSACTION_TYPE} from "./utils/constants";

function WidgetsMonthExpenses({currentYear, currentMonth, transactions, budget, userId, allCategories}) {
  const monthTransactions = transactions
    .filter((transaction) => formatYear(transaction.date) === currentYear)
    .filter((transaction) => formatMonth(transaction.date) === currentMonth);

  const expenses = new Statistics(transactions, TRANSACTION_TYPE.EXPENSES, budget, monthTransactions, currentMonth, currentYear, userId, allCategories);
  const incomes = new Statistics(transactions, TRANSACTION_TYPE.INCOMES, budget, monthTransactions, currentMonth, currentYear, userId, allCategories);

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
