import React, {useState, useMemo} from "react";
import {useSelector, useDispatch} from "react-redux";

import {
  updateMonth, updateYear, selectCurrentMonth,
  selectCurrentYear, selectFilteredTransactions
} from "../../../../reducers/transactions/transactions-slice";

import classes from "./YearExpenses.module.css";
import Indicator from "./Indicator/Indicator";
import ArrowButton from "../../../common/components/ArrowButton/ArrowButton";
import Loader from "../../../common/components/Loader/Loader";

import {getMaxAmountPerYear} from "../../../common/utils/utils";
import {MONTH_EXPENSES} from "./constant";

function WidgetsYearExpenses() {
  const getTransactions = useSelector(selectFilteredTransactions);
  const currentMonth = useSelector(selectCurrentMonth);
  const currentYear = useSelector(selectCurrentYear);
  const dispatch = useDispatch();

  const [transactions, setTransactions] = useState(getTransactions);

  const maxMonthExpensePerYear = useMemo(() => getMaxAmountPerYear(currentYear, "expenses", transactions), [currentYear, transactions]);
  const maxMonthIncomePerYear = useMemo(() => getMaxAmountPerYear(currentYear, "income", transactions), [currentYear, transactions]);

  const maxMonthTransaction = Math.max(maxMonthExpensePerYear, maxMonthIncomePerYear);

  const isLoader = maxMonthTransaction === 0;

  const monthHandler = ({target}) => {
    dispatch(updateMonth(target.id));
  };

  const handleClick = ({target}) => {
    const id = target.id;
    let year = +currentYear;

    id === "left" ? --year : ++year;

    dispatch(updateYear(String(year)));
  };


  return (
    <>
      <section className={classes.YearExpenses}>
        {isLoader ? <Loader /> : null}

        <ArrowButton direction={"left"} onClick={handleClick} style={{top: -55}} />

        <h4>{currentYear}</h4>
        <div className={classes.Wrapper}>
          {MONTH_EXPENSES.map((month) => (
            <div
              className={`${classes.ListWrapper} ${month === currentMonth ? classes.Active : ""}`}
              key={month}
              onClick={monthHandler}
              id={month}
            >
              <div
                className={classes.List}
                id={month}
              >
                <Indicator
                  year={currentYear}
                  month={month}
                  transactions={transactions}
                  type={"incomes"}
                  maxMonthTransaction={maxMonthTransaction}
                />

                <Indicator
                  year={currentYear}
                  month={month}
                  transactions={transactions}
                  type={"expenses"}
                  maxMonthTransaction={maxMonthTransaction}
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
