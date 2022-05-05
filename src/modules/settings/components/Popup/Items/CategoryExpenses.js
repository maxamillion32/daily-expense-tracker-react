import React from "react";
import {isExists, isExpense, getCurrentCategorySum, getCategoryTotalSum} from "../utils/utils";

export const CategoryExpenses = ({transactions, prevItemState, filteredTransactions, classes}) => (
  <>
    {isExists(transactions, "category", prevItemState.title)
      ? <div className={classes.WrapperText}>
          <p className={classes.Text}>
            {isExpense(transactions, prevItemState.title) ? "Expenses" : "Incomes"} in this Month - <b>{getCurrentCategorySum(filteredTransactions, prevItemState.title)}€</b>
          </p>
          <p className={classes.Text}>
            {isExpense(transactions, prevItemState.title) ? "Expenses" : "Incomes"} for all time - <b>{getCategoryTotalSum(transactions, prevItemState.title)}€</b>
          </p>
        </div>
      : null}
  </>
);
