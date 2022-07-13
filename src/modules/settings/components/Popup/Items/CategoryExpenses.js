import React, {memo, useMemo} from "react";
import {isExists, isExpense, getCurrentCategorySum, getCategoryTotalSum} from "../utils/utils";

function CategoryExpenses({transactions, prevItemState, filteredTransactions, classes}) {
  return (
    <>
      {useMemo(() => isExists(transactions, "category", prevItemState.title), [prevItemState.title])
        ? <div className={classes.WrapperText}>
          <p className={classes.Text}>
            {useMemo(() => isExpense(transactions, prevItemState.title), [prevItemState.title]) ? "Expenses" : "Incomes"} in this Month
            - <b>{useMemo(() => getCurrentCategorySum(filteredTransactions, prevItemState.title), [prevItemState.title])}€</b>
          </p>
          <p className={classes.Text}>
            {useMemo(() => isExpense(transactions, prevItemState.title), [prevItemState.title]) ? "Expenses" : "Incomes"} for all time
            - <b>{useMemo(() => getCategoryTotalSum(transactions, prevItemState.title), [prevItemState.title])}€</b>
          </p>
        </div>
        : null}
    </>
  );
}

export default memo(CategoryExpenses);
