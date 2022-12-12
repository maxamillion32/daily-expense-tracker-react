import React from "react";

import classes from "./Container.module.css";
import Loader from "../../common/components/Loader/Loader";
import {useSelector} from "react-redux";
import {selectIsLoading} from "../../../reducers/transactions/transactions-slice";

import MonthBalance from "./MonthBalance/MonthBalance";
import MonthExpenses from "./MonthExpenses/MonthExpenses";
import YearExpenses from "./YearExpenses/YearExpenses";
import Budget from "./Budget/Budget";

function StatisticsContainer() {
  const isLoading = useSelector(selectIsLoading);

  return (
    <section className={classes.Container}>
      {isLoading ? <Loader /> :
        <>
          <MonthBalance/>
          <YearExpenses/>
          <MonthExpenses/>
          <Budget/>
        </>
      }
    </section>
  );
}

export default StatisticsContainer;
