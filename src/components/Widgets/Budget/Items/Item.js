import React from 'react';
import classes from './Item.module.css';

function WidgetsBudgetItem({title, value, onChange, id}) {
  const isHeader = title === "Expenses" || title === "Incomes"
  return (
    <div className={classes.Block}>
      <p className={isHeader ? classes.Title : classes.SubTitle}>{title}</p>
      {isHeader ? <p className={classes.Description}>Plan</p> : ''}
      <input
        className={classes.Input}
        type="number"
        id={id}
        name={title}
        placeholder={"0.00"}
        value={value}
        onChange={onChange}
      />
    </div>
  )
}

export default WidgetsBudgetItem;
