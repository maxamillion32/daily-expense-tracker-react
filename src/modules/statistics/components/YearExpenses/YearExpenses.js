import React from "react";
import {useDispatch} from "react-redux";

import {updateMonth, updateYear} from "../../../../reducers/transactions/transactions-slice";
import {setIsLoading} from "../../../../reducers/budget/budget-slice";

import classes from "./YearExpenses.module.css";
import Indicator from "./Indicator/Indicator";
import ArrowButton from "../../../common/components/ArrowButton/ArrowButton";
import {getMaxAmountPerYear, formatMonth, formatYear} from "../../../common/utils/utils";
import {MONTH_EXPENSES} from "./constant";

function WidgetsYearExpenses({currentYear, currentMonth, transactions}) {
  const dispatch = useDispatch();

  const maxMonthExpensePerYear = getMaxAmountPerYear(currentYear, "expenses", transactions);
  const maxMonthIncomePerYear = getMaxAmountPerYear(currentYear, "income", transactions);

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
    dispatch(setIsLoading(true));
  };

  const handleClick = ({target}) => {
    const id = target.id;
    let year = +currentYear;

    id === "left" ? --year : ++year;

    dispatch(updateYear(String(year)));
    dispatch(setIsLoading(true));
  };


  return (
    <>
      <section className={classes.YearExpenses}>
        <ArrowButton direction={"left"} onClick={handleClick} style={{top: -55}} />

        <h4>{currentYear}</h4>
        <div className={classes.Wrapper}>
          {MONTH_EXPENSES.map((month) => (
            <div
              className={classes.ListWrapper}
              key={month}
              onClick={monthHandler}
              id={month}
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

        <ArrowButton direction={"right"} onClick={handleClick} style={{top: -55}} />
      </section>
    </>
  );
}

export default WidgetsYearExpenses;
