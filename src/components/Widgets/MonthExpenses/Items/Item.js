import React from 'react';
import Indicator from '../Indicator/Indicator';
import classes from './Item.module.css';

function WidgetsMonthExpensesItem({categories, abovePercent, aboveCategoryPercent, totalPercent, totalCategoryPercent, averagePercent, averageCategoryPercent, categoryPercent, transactionsSum, type, title, balance, transactionsPerMonth}) {
  return (
    <section className={classes.MonthExpensesItem}>
      <Indicator
        abovePercent={abovePercent}
        averagePercent={averagePercent}
        totalPercent={totalPercent}
        transactionsSum={transactionsSum}
        type={type}
        title={title}
      />

      <ul className={classes.List}>
        {categories.map((category) => (
            <li className={classes.Wrapper} key={category}>
              <Indicator
                abovePercent={aboveCategoryPercent(category, type)}
                averagePercent={averageCategoryPercent(category, type)}
                totalPercent={totalCategoryPercent(category, type)}
                transactionsSum={balance(category, type, transactionsPerMonth)}
                type={type}
                title={`${categoryPercent(balance(category, type, transactionsPerMonth), transactionsSum)}%
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
