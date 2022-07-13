import React, {memo} from "react";
import classes from "./Indicator.module.css";

function WidgetsMonthExpensesIndicator({
  excessPercent,
  currentBalance,
  totalPercent,
  transactionsSum,
  type,
  title
  }) {
  return (
    <>
      <div className={classes.IndicatorWrapper}>

        {/* Indicator */}
        <div
          className={classes.TotalExpenses}
          style={{width: `${totalPercent}%`}}
        ></div>
        <div
          className={classes.IndicatorTotal}
          style={{width: `${100 - totalPercent}%`}}
        ></div>
        <div
          className={
              `${
                type === "incomes"
                  ? classes.IndicatorIncomes
                  : classes.IndicatorExpenses
              }`
            }
          style={{width: `${excessPercent}%`}}
        ></div>

        {/* Contents */}
        <p className={
            title === "Incomes" || title === "Expenses"
              ? classes.TotalTitle
              : classes.CategoryTitle
          }>
          {title}
        </p>
        <div className={classes.TotalSumWrapper}>
          <p className={classes.TotalSumAverage}>{currentBalance}</p>
          <p className={
              title === "Incomes" || title === "Expenses"
              ? classes.TotalSum
              : classes.Balance
            }>
            {type === "incomes" ? "+" : "-"}
            {transactionsSum}€
          </p>
        </div>

      </div>
    </>
  );
}

export default memo(WidgetsMonthExpensesIndicator);
