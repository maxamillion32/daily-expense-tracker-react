import React from "react";
import classes from "./Item.module.css";

function WidgetsBudgetItem({title, value, onChange, id, dataType}) {
  const isHeader = title === "Expenses" || title === "Incomes";
  return (
    <div className={classes.Block}>
      <p className={isHeader ? classes.Title : classes.SubTitle}>{title}</p>
      {isHeader ? <p className={classes.Description}>Plan</p> : ""}
      <input
        className={isHeader ? classes.InputDisabled : classes.Input }
        type="number"
        // step="0.01"
        id={id}
        name={title}
        placeholder={"0.00"}
        value={value}
        onChange={onChange}
        // disabled={isHeader}
        data-type={dataType}
      />
    </div>
  );
}

export default WidgetsBudgetItem;
