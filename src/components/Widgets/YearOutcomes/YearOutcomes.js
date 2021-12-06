import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import classes from './YearOutcomes.module.css';
import {formatMonthShort} from '../../../utils/utils'

import {
  loadTransactions,
  selectAllTransactionsState
} from '../../../reducers/transactions/transactions-slice'

function YearOutcomes() {
  const allTransactions = useSelector(selectAllTransactionsState);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadTransactions());
    // eslint-disable-next-line
  }, []);

  // const currentMonth = 'November';
  // // const currentMonth = formatMonth(new Date());
  // const filteredTransactions = allTransactions
  //   .filter((transaction) => formatMonth(transaction.date) === currentMonth);
  // const categoriesForOutcomes = [...new Set(filteredTransactions
  //   .filter((transaction) => transaction.outcome ? transaction.sum !== 0 : transaction = null)
  //   .map(transaction => transaction.category.title))];
  // const categoriesForIncomes = [...new Set(filteredTransactions
  //   .filter((transaction) => !transaction.outcome ? transaction.sum !== 0 : transaction = null)
  //   .map(transaction => transaction.category.title))];

  // const sumOutcomes = filteredTransactions.map((transaction) => {
  //     return transaction.outcome ? transaction = +transaction.sum : transaction = null;
  //   }).reduce((acc, sum) => acc + sum, 0);

  // const sumIncomes = filteredTransactions.map((item) => {
  //   return !item.outcome ? item = +item.sum : item = null;
  // }).reduce((acc, sum) => acc + sum, 0);

  // const getOutcomes = (category) => {
  //   const outcome = filteredTransactions
  //     .filter((transaction) => transaction.category.title === category)
  //     .map((transaction) => transaction.outcome ? transaction = +transaction.sum : transaction = null)
  //     .reduce((acc, sum) => acc + sum, 0);

  //     return outcome;
  // }

  // const getIncomes = (category) => {
  //   const outcome = filteredTransactions
  //     .filter((transaction) => transaction.category.title === category)
  //     .map((transaction) => !transaction.outcome ? transaction = +transaction.sum : transaction = null)
  //     .reduce((acc, sum) => acc + sum, 0);

  //     return outcome;
  // }

  const currentMonth = 'Nov';
  // const currentMonth = formatMonthShort(new Date());

  const monthOutcomes = [
    'Jan', 'Feb', 'Mar',
    'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep',
    'Oct', 'Nov', 'Dec'
  ]

  return (
    <>
      <section className={classes.YearOutcomes}>
        <div className={classes.Wrapper}>
          {monthOutcomes.map((month) => (
            <div className={`${classes.List} ${month === currentMonth ? classes.Active : ''}`} key={month}>
              <div></div>
              <p>{month}</p>
            </div>
            ))
          }
        </div>
      </section>
    </>
  )
}

export default YearOutcomes;
