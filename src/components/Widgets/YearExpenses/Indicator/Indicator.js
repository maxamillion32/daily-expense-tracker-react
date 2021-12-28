import React from 'react';
import classes from './Indicator.module.css';

function WidgetsYearExpensesIndicator({year, month, getPercent, type}) {
  let cls = [];

  type === "expenses" ? cls.push(classes.Expenses) : cls.push(classes.Incomes);

  return (
    <div
      className={cls.join(' ')}
      id={month}
      style={{height: `${getPercent(year, month, type)}%`}}
    ></div>
  )
}

export default WidgetsYearExpensesIndicator;
