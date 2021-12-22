import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import WidgetsMonthBalance from '../../components/Widgets/MonthBalance/MonthBalance';
import WidgetsMonthExpenses from '../../components/Widgets/MonthExpenses/MonthExpenses';
import WidgetsYearExpenses from '../../components/Widgets/YearExpenses/YearExpenses';
import WidgetsBudget from '../../components/Widgets/Budget/Budget'
import classes from './Statistics.module.css';
import {currentMonth} from '../../reducers/transactions/transactions-slice';
import {
  loadTransactions,
  selectAllTransactionsState
} from '../../reducers/transactions/transactions-slice';
import {selectBudgetState, loadBudgets} from '../../reducers/budget/budget-slice';

function Statistics() {
  const allTransactions = useSelector(selectAllTransactionsState);
  const month = useSelector(currentMonth);
  const budget = useSelector(selectBudgetState);
  // console.log(`🚀 ~ file: Statistics.js ~ line 19 ~ Statistics ~ budget`, budget);
  const dispatch = useDispatch();
  const userId = 'userId';
  const newBudget = budget && budget.find((item) => item[userId])
  // console.log(`🚀 ~ file: Statistics.js ~ line 23 ~ Statistics ~ newBudget`, {...newBudget});

  useEffect(() => {
    dispatch(loadBudgets());
    dispatch(loadTransactions());
    // eslint-disable-next-line
  }, [dispatch]);

  return (
    <section className={classes.Statistics}>
      <WidgetsMonthBalance currentMonth={month} transactions={allTransactions} />
      <WidgetsYearExpenses currentMonth={month} transactions={allTransactions} />
      <WidgetsMonthExpenses currentMonth={month} transactions={allTransactions} budget={newBudget}/>
      <WidgetsBudget currentMonth={month} budget={newBudget} />
    </section>
  )
}

export default Statistics;
