import React, { useEffect, useRef } from 'react';
import classes from './Item.module.css';

function WidgetsBudgetItem({title, value, onChange, id, onEditClick}) {
  // function usePrevious(value) {
  //   const ref = useRef();
  //   useEffect(() => {
  //     ref.current = value;
  //   });
  //   return ref.current;
  // }
  // const prevAmount = usePrevious(value);
  const isHeader = title === "Expenses" || title === "Incomes"
  return (
    <div className={classes.Block}>
      <p className={isHeader ? classes.Title : classes.SubTitle}>{title}</p>
      {isHeader ? <p className={classes.Description}>Plan</p> : ''}
      <input
        className={classes.Input}
        type="number"
        step="0.01"
        id={id}
        name={title}
        placeholder={"0.00"}
        value={value}
        onChange={onChange}
      />
      {/* <button
          className={classes.Button}
          type="submit"
          onClick={onEditClick}
          // disabled={!prevAmount}
        >
          Edit
        </button> */}
    </div>
  )
}

export default WidgetsBudgetItem;
