import React from 'react';
import Indicator from '../Indicator/Indicator';
import classes from './Item.module.css';
import {getBalance} from '../utils';

function WidgetsMonthExpensesItem(
    {
      categories, excessPercent,
      excessCategoryPercent, totalPercent,
      totalCategoryPercent, percentOfTotal,
      percentCategoryOfTotal, categoryPercent,
      transactionsSum, type, title,
      monthTransactions, transactions,
      currentDayStep
    }
  ) {
  return (
    <section className={classes.MonthExpensesItem}>
      <div className={classes.DayIndicatorWrapper}>
        <div className={classes.DayIndicator} style={{left: `${currentDayStep}%`}}></div>
      </div>
      <Indicator
        excessPercent={excessPercent}
        percentOfTotal={percentOfTotal}
        totalPercent={totalPercent}
        transactionsSum={transactionsSum}
        type={type}
        title={title}
      />

      <ul className={classes.List}>
        {categories.map((category) => (
            <li className={classes.Wrapper} key={category}>
              <Indicator
                excessPercent={excessCategoryPercent(category, type, transactions, monthTransactions)}
                percentOfTotal={percentCategoryOfTotal(category, type, transactions, monthTransactions)}
                totalPercent={totalCategoryPercent(category, type, transactions, monthTransactions)}
                transactionsSum={getBalance(category, type, monthTransactions)}
                type={type}
                title={`${categoryPercent(getBalance(category, type, monthTransactions), transactionsSum)}%
                  ${category}`}
              />
            </li>
          ))
        }
      </ul>
    </section>
  )
}

export default WidgetsMonthExpensesItem;
