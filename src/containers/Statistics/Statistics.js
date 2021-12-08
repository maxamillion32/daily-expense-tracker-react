import React from 'react';
import {useSelector} from 'react-redux';
import MonthBalance from '../../components/Widgets/MonthBalance/MonthBalance';
import MonthExpenses from '../../components/Widgets/MonthExpenses/MonthExpenses';
import YearExpenses from '../../components/Widgets/YearExpenses/YearExpenses';
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
      <MonthBalance currentMonth={month} transactions={allTransactions} />
      <YearExpenses currentMonth={month} transactions={allTransactions} />
      <MonthExpenses currentMonth={month} transactions={allTransactions} />
    </section>
  )
}

export default Statistics;
