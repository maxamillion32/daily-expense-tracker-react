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

import classes from "./Statistics.module.css";
import WidgetsMonthBalance from "./Widgets/MonthBalance/MonthBalance";
import WidgetsMonthExpenses from "./Widgets/MonthExpenses/MonthExpenses";
import WidgetsYearExpenses from "./Widgets/YearExpenses/YearExpenses";
import WidgetsBudget from "./Widgets/Budget/Budget";
import Loader from "../../../modules/common/components/Loader/Loader";

function Statistics() {
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
    dispatch(loadTransactions());
    // eslint-disable-next-line
  }, [userId]);

  return (
    <section className={classes.Statistics}>
      {isLoader ? <Loader /> : null}
      {!isLoader
        ? <>
            <WidgetsMonthBalance
              currentYear={year}
              currentMonth={month}
              transactions={allTransactions}
            />
            <WidgetsYearExpenses
              currentYear={year}
              currentMonth={month}
              transactions={allTransactions}
            />
            <WidgetsMonthExpenses
              currentYear={year}
              currentMonth={month}
              transactions={allTransactions}
              budget={newBudget}
              userId={userId}
              allCategories={allCategories}
            />
            <WidgetsBudget
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

export default Statistics;
