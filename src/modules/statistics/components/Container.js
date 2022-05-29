import React, {lazy, Suspense} from "react";

import classes from "./Container.module.css";
import Loader from "../../common/components/Loader/Loader";

// import MonthBalance from "./MonthBalance/MonthBalance";
// import MonthExpenses from "./MonthExpenses/MonthExpenses";
// import YearExpenses from "./YearExpenses/YearExpenses";
// import Budget from "./Budget/Budget";

function StatisticsContainer() {
  const MonthBalance = lazy(() => import("./MonthBalance/MonthBalance"));
  const YearExpenses = lazy(() => import("./YearExpenses/YearExpenses"));
  const MonthExpenses = lazy(() => import("./MonthExpenses/MonthExpenses"));
  const Budget = lazy(() => import("./Budget/Budget"));

  return (
    <section className={classes.Container}>
      <Suspense fallback={<Loader />} >
        <MonthBalance />
        <YearExpenses />
        <MonthExpenses />
        <Budget />
      </Suspense>
    </section>
  );
}

export default StatisticsContainer;
