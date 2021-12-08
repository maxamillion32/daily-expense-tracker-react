import React from 'react';
import classes from './Item.module.css';

function WidgetsMonthExpensesItem({categories, abovePercent, totalPercent, averagePercent, transactionPercent, transactionsSum, title, balance}) {
  return (
    <section className={classes.MonthExpenses}>
      <div style={{
          width: '100%',
          display: 'flex'
        }}>
        <div
          className={`${title === 'Incomes' ? classes.TotalBg2 : classes.TotalBg1}`}
          style={{width: `${abovePercent}%`}}
        ></div>
        <div
          className={classes.TotalExpense}
          style={{width: `${totalPercent}%`}}
        ></div>
        <div
          className={classes.TotalBg}
          style={{width: `${100 - totalPercent}%`}}
        ></div>
      </div>
      <h4 className={classes.TotalTitle}>{title}</h4>
      <div className={classes.TotalSumWrapper}>
        <h4 className={classes.TotalSumAverage}>{averagePercent}</h4>
        <h4 className={classes.TotalSum}>
          {title === 'Incomes' ? '+' : '-'}
          {transactionsSum}€
        </h4>
      </div>
      <ul className={classes.List}>
        {categories.map((category) => (
            <li className={classes.Wrapper} key={category}>
              <div className={classes.TotalBg}></div>
              <div
                className={classes.Expense}
                style={{width: `${transactionPercent(balance(category, title), transactionsSum)}%`}}>
              </div>
              <p className={classes.Category}>
                {`${transactionPercent(balance(category, title), transactionsSum)}% ${category}`}
              </p>
              <div className={classes.AverageWrapper}>
                <p className={classes.TotalSumAverage}>0€ up to average</p>
                <p className={classes.Balance}>
                  {title === 'Incomes' ? '+' : '-'}
                  {balance(category, title)}€
                </p>
              </div>
            </li>
          ))
        }
      </ul>
    </section>
  )
}

export default WidgetsMonthExpensesItem;
