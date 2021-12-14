import React from 'react';
import Indicator from '../Indicator/Indicator';
import classes from './Item.module.css';
import {getBalance} from '../utils';
import {formatMonth} from '../../../../utils/utils';

function WidgetsMonthExpensesItem(
    {
      categories, excessPercent,
      excessCategoryPercent, totalPercent,
      totalCategoryPercent, balanceOfCurrent,
      balanceCategoryOfCurrent, categoryPercent,
      transactionsSum, type, title,
      monthTransactions,
      month
    }
  ) {

  const daysAmount = new Date(new Date().getFullYear(), new Date().getMonth(), 0).getDate();
  const currentDay = new Date().getDate();
  const currentMonth = formatMonth(new Date());
  const currentDayStep = (currentDay / daysAmount * 100).toFixed(2);
  const isShow = month === currentMonth;

  return (
    <section className={classes.MonthExpensesItem}>
      {
        isShow &&
          <div className={classes.DayIndicatorWrapper}>
            <div className={classes.DayIndicator} style={{left: `${currentDayStep}%`}}>
              <p className={
                `${classes.DayIndicatorDate} ${currentDay > 15 ? classes.Left : classes.Right}`
                }>Today is  {currentMonth} {currentDay}th</p>
            </div>
          </div>
      }
      <Indicator
        excessPercent={excessPercent}
        balanceOfCurrent={balanceOfCurrent}
        totalPercent={totalPercent}
        transactionsSum={transactionsSum}
        type={type}
        title={title}
      />

      <ul className={classes.List}>
        {categories.map((category) => (
            <li className={classes.Wrapper} key={category}>
              <Indicator
                excessPercent={excessCategoryPercent(category, type)}
                balanceOfCurrent={balanceCategoryOfCurrent(category, type)}
                totalPercent={totalCategoryPercent(category, type)}
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
