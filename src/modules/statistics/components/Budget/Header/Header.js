import React from "react";
import classes from "../Budget.module.css";

const BudgetHeader = ({onClick, isDisabled}) => (
  <div className={classes.HeaderWrapper}>
    <p className={classes.Header}>Budget</p>
    <button
      className={classes.Button}
      type="submit"
      onClick={onClick}
      disabled={isDisabled}
    >
      Update
    </button>
  </div>
);

export default BudgetHeader;
