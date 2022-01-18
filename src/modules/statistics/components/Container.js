import React, {useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";

import {
  selectUserId
} from "../../../reducers/user/user-slice";
import {
  currentMonth, currentYear
} from "../../../reducers/transactions/transactions-slice";
import {
  loadTransactions,
  selectAllTransactionsState
} from "../../../reducers/transactions/transactions-slice";
import {
  selectAllBudgetState, loadBudgets, selectUpdatedBudgetState, isLoading
} from "../../../reducers/budget/budget-slice";
import {
  selectAllCategoriesState
} from "../../../reducers/categories/categories-slice";

import classes from "./Container.module.css";
import MonthBalance from "./MonthBalance/MonthBalance";
import MonthExpenses from "./MonthExpenses/MonthExpenses";
import YearExpenses from "./YearExpenses/YearExpenses";
import Budget from "./Budget/Budget";
import Loader from "../../common/components/Loader/Loader";

function StatisticsContainer() {
  const allTransactions = useSelector(selectAllTransactionsState);
  const allCategories = useSelector(selectAllCategoriesState);
  const month = useSelector(currentMonth);
  const year = useSelector(currentYear);
  const budget = useSelector(selectAllBudgetState);
  const updatedBudget = useSelector(selectUpdatedBudgetState);
  const userId = useSelector(selectUserId);
  const newBudget = budget && Object.keys(budget).length !== 0 && budget;
  const newUpdatedBudget = updatedBudget && Object.keys(updatedBudget).length !== 0 && updatedBudget;
  const loading = useSelector(isLoading);
  const dispatch = useDispatch();

  const isLoader = loading && userId;

  useEffect(() => {
    dispatch(loadBudgets(userId));
    // dispatch(loadTransactions(userId));
    // eslint-disable-next-line
  }, [userId]);

  return (
    <section className={classes.Container}>
      {isLoader ? <Loader /> : null}
      {!isLoader
        ? <>
            <MonthBalance
              currentYear={year}
              currentMonth={month}
              transactions={allTransactions}
            />
            <YearExpenses
              currentYear={year}
              currentMonth={month}
              transactions={allTransactions}
            />
            <MonthExpenses
              currentYear={year}
              currentMonth={month}
              transactions={allTransactions}
              budget={newBudget}
              userId={userId}
              allCategories={allCategories}
            />
            <Budget
              currentYear={year}
              currentMonth={month}
              budget={newBudget}
              updatedBudget={newUpdatedBudget}
              userId={userId}
            />
          </>
        : null}
    </section>
  );
}

export default StatisticsContainer;
