import React from "react";
import classes from "./Indicator.module.css";

function WidgetsYearExpensesIndicator({month, type, transactions}) {
  let cls = [];
  type === "expenses" ? cls.push(classes.Expenses) : cls.push(classes.Incomes);

  return (
    <div
      className={cls.join(" ")}
      id={month}
      style={{height: `${transactions}%`}}
    ></div>
  );
}

export default WidgetsYearExpensesIndicator;
