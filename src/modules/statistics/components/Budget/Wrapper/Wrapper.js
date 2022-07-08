import React from "react";
import classes from "../Budget.module.css";

const BudgetContentWrapper = ({children}) => (
  <div className={classes.Content}>
    {children}
  </div>
);

export default BudgetContentWrapper;
