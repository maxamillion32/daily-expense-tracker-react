import React, {memo} from "react";
import classes from "../MonthBalance.module.css";

const BalanceItem = ({sum, title}) => (
  <li className={classes.Wrapper}>
    <p>{title}:</p>
    <p className={classes.Balance}>{title === "incomes" ? "+" : "-"}{sum} €</p>
  </li>
);


export default memo(BalanceItem);
