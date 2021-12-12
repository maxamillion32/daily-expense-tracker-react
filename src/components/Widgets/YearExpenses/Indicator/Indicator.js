import React from 'react';
import classes from './Indicator.module.css';

function WidgetsYearExpensesIndicator({month, getPercent, type}) {
  let cls = [];

  type === "expenses" ? cls.push(classes.Expenses) : cls.push(classes.Incomes);

  return (
    <div
      className={cls.join(' ')}
      id={month}
      style={{height: `${getPercent(month, type)}%`}}
    ></div>
  )
}

export default WidgetsYearExpensesIndicator;
