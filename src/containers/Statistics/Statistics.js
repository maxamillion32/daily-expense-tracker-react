import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import WidgetsMonthBalance from '../../components/Widgets/MonthBalance/MonthBalance';
import WidgetsMonthExpenses from '../../components/Widgets/MonthExpenses/MonthExpenses';
import WidgetsYearExpenses from '../../components/Widgets/YearExpenses/YearExpenses';
import WidgetsBudget from '../../components/Widgets/Budget/Budget';
import {selectUserId} from '../../reducers/user/user-slice';
import classes from './Statistics.module.css';
import {currentMonth} from '../../reducers/transactions/transactions-slice';
import {
  loadTransactions,
  selectAllTransactionsState
} from '../../reducers/transactions/transactions-slice';
import {selectAllBudgetState, loadBudgets} from '../../reducers/budget/budget-slice';

function Statistics() {
  const allTransactions = useSelector(selectAllTransactionsState);
  const year = "< 2021 >";
  const month = useSelector(currentMonth);
  const budget = useSelector(selectAllBudgetState);
  // console.log(`🚀 ~ file: Statistics.js ~ line 19 ~ Statistics ~ budget`, budget);
  const dispatch = useDispatch();
  const userId = useSelector(selectUserId);
  const newBudget = budget && budget;
  // console.log(`🚀 ~ file: Statistics.js ~ line 23 ~ Statistics ~ newBudget`, {...newBudget});

  useEffect(() => {
    dispatch(loadBudgets());
    dispatch(loadTransactions());
    // eslint-disable-next-line
  }, [dispatch]);

  return (
    <section className={classes.Statistics}>
      <WidgetsMonthBalance currentYear={year} currentMonth={month} transactions={allTransactions} />
      <WidgetsYearExpenses currentMonth={month} transactions={allTransactions} />
      <WidgetsMonthExpenses currentMonth={month} transactions={allTransactions} budget={newBudget} userId={userId} />
      <WidgetsBudget currentMonth={month} budget={newBudget} userId={userId} />
    </section>
  )
}

export default Statistics;
