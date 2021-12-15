import React from 'react';
import {useSelector} from 'react-redux';
import WidgetsMonthBalance from '../../components/Widgets/MonthBalance/MonthBalance';
import WidgetsMonthExpenses from '../../components/Widgets/MonthExpenses/MonthExpenses';
import WidgetsYearExpenses from '../../components/Widgets/YearExpenses/YearExpenses';
import WidgetsBudget from '../../components/Widgets/Budget/Budget'
import classes from './Statistics.module.css';
import {currentMonth} from '../../reducers/transactions/transactions-slice';
import {
  // loadTransactions,
  selectAllTransactionsState
} from '../../reducers/transactions/transactions-slice'

function Statistics() {
  const allTransactions = useSelector(selectAllTransactionsState);
  const month = useSelector(currentMonth);
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(loadTransactions());
  //   // eslint-disable-next-line
  // }, []);

  return (
    <section className={classes.Statistics}>
      <WidgetsMonthBalance currentMonth={month} transactions={allTransactions} />
      <WidgetsYearExpenses currentMonth={month} transactions={allTransactions} />
      <WidgetsMonthExpenses currentMonth={month} transactions={allTransactions} />
      <WidgetsBudget currentMonth={month} />
    </section>
  )
}

export default Statistics;
