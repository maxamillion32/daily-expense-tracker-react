import React from 'react';
import Indicator from '../Indicator/Indicator';
import classes from './Item.module.css';

function WidgetsMonthExpensesItem({categories, abovePercent, abovePercentPerCategory, totalPercent, totalPercentPerCategory, averagePercent, averagePercentPerCategory, transactionPercent, transactionsSum, type, title, balance, transactionsPerMonth}) {
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
                abovePercent={abovePercentPerCategory(category, type)}
                averagePercent={averagePercentPerCategory(category, type)}
                totalPercent={totalPercentPerCategory(category, type)}
                transactionsSum={balance(category, type, transactionsPerMonth)}
                type={type}
                title={`${transactionPercent(balance(category, type, transactionsPerMonth), transactionsSum)}%
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
