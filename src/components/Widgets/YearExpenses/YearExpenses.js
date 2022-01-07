import React from "react";
import {useDispatch} from "react-redux";
import {updateMonth, updateYear} from "../../../reducers/transactions/transactions-slice";

import {formatMonth, formatYear} from "../../../utils/utils";
import classes from "./YearExpenses.module.css";
import {MONTH_EXPENSES} from "./constant";

import Indicator from "./Indicator/Indicator";

function WidgetsYearExpenses({currentYear, currentMonth, transactions}) {
  const dispatch = useDispatch();

  const getMaxAmountPerYear = (year, type) => {
    const months = [...new Set(transactions
      .filter((transaction) => formatYear(transaction.date) === year)
      .map((transaction) => formatMonth(transaction.date)))];

    const amount = Math.max(...months
      .map((month) => transactions
      .map((transaction) => formatMonth(transaction.date) === month
        ? (type === "expenses" ? transaction.expense : !transaction.expense)
          ? transaction = +transaction.sum
          : transaction = null
        : null)
      .reduce((acc, sum) => acc + sum, 0)));

    return amount;
  };

  const maxMonthExpensePerYear = getMaxAmountPerYear(currentYear, "expenses");
  const maxMonthIncomePerYear = getMaxAmountPerYear(currentYear, "income");

  const maxMonthTransaction = Math.max(maxMonthExpensePerYear, maxMonthIncomePerYear);

  const getPercent = (year, month, type) => {
    const incomes = transactions
    .filter((transaction) => formatYear(transaction.date) === year)
    .filter((transaction) => formatMonth(transaction.date) === month)
    .map((transaction) => (type === "expenses" ? transaction.expense : !transaction.expense)
    ? transaction = +transaction.sum
    : transaction = null)
    .reduce((acc, sum) => acc + sum, 0);

    const percent = (incomes / maxMonthTransaction * 100);
    let incomesPercent = percent >= 100 ? percent : percent;

    return incomesPercent;
  };

  const monthHandler = ({target}) => {
    dispatch(updateMonth(target.id));
  };

  const handleClick = ({target}) => {
    const id = target.id;
    let year = +currentYear;

    id === "prev" ? --year : ++year;

    dispatch(updateYear(String(year)));
  };


  return (
    <>
      <section className={classes.YearExpenses}>
        <button
          id={"prev"}
          className={classes.LeftBtn}
          onClick={handleClick}
        ></button>

        <h4>{currentYear}</h4>
        <div className={classes.Wrapper}>
          {MONTH_EXPENSES.map((month) => (
            <div
              className={classes.ListWrapper}
              key={month}
              onClick={monthHandler}
            >
              <div
                className={`${classes.List} ${month === currentMonth ? classes.Active : ""}`}
                id={month}
              >
                <Indicator
                  year={currentYear}
                  month={month}
                  getPercent={getPercent}
                  type={"incomes"}
                />

                <Indicator
                  year={currentYear}
                  month={month}
                  getPercent={getPercent}
                  type={"expenses"}
                />
              </div>
              <p id={month}>{month.slice(0, 3)}</p>
            </div>
            ))
          }
        </div>

        <button
          id={"next"}
          className={classes.RightBtn}
          onClick={handleClick}
        ></button>
      </section>
    </>
  );
}

export default WidgetsYearExpenses;
