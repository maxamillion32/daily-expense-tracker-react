import React from "react";
import {useSelector, useDispatch} from "react-redux";

import {
  updateMonth,
  updateYear,
  selectCurrentMonth,
  selectCurrentYear,
  selectYearExpenses
} from "../../../../reducers/transactions/transactions-slice";

import classes from "./YearExpenses.module.css";
import Indicator from "./Indicator/Indicator";
import ArrowButton from "../../../common/components/ArrowButton/ArrowButton";

function WidgetsYearExpenses() {
  const currentMonth = useSelector(selectCurrentMonth);
  const currentYear = useSelector(selectCurrentYear);
  const getSelectYearExpenses = useSelector(selectYearExpenses);

  const dispatch = useDispatch();

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
    <section className={classes.YearExpenses}>
      <ArrowButton direction={"left"} onClick={handleClick} style={{top: -55}} />

      <h4>{currentYear}</h4>
      <div className={classes.Wrapper}>
        {getSelectYearExpenses.map((yearExpense) => {
          const {month, expenses, incomes} = yearExpense;
          return (
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
                  month={month}
                  transactions={expenses}
                  type={"expenses"}
                />

                <Indicator
                  month={month}
                  transactions={incomes}
                  type={"incomes"}
                />
              </div>
              <p id={month}>{month.slice(0, 3)}</p>
            </div>
          );
        })
        }
      </div>

      <ArrowButton direction={"right"} onClick={handleClick} style={{top: -55}} />
    </section>
  );
}

export default WidgetsYearExpenses;
