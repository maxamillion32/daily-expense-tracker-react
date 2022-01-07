import React from "react";
import classes from "./Item.module.css";

function SettingsItem({id, onChange, onClickSubmitButton, value, submitTitle, onClickButton, placeholder, onClickDeleteButton, transactionType, onChangeType, title}) {
  // const htmlFor = `${"checkbox"}-${Math.random()}`;
  return (
    <form
      className={classes.ItemWrapper}
      onSubmit={onClickSubmitButton}
    >
      <input
        className={classes.Input}
        type="text"
        name={value}
        value={value}
        id={id}
        onChange={onChange}
        placeholder={placeholder}
      />
      {
        value && title !== "Accounts" &&
        <>
          <div className={classes.Type}>
            <input
            type="checkbox"
            name="transactionType"
            // placeholder={props.placeholder}
            id={id}
            // id={htmlFor}
            // value
            // onChange={props.onChange}
            checked={transactionType}
            onChange={onChangeType}
            />
            <label
              // htmlFor={htmlFor}
            >Incomes</label>
          </div>
        </>
      }
      <div className={classes.ButtonWrapper}>
        {submitTitle && <button
          className={classes.Button}
          id={id}
          type="submit"
          onClick={onClickButton}
          disabled={!value}
        >
          {submitTitle}
        </button>}
        {onClickDeleteButton && <button
          id={id}
          className={classes.Button}
          type="button"
          onClick={onClickDeleteButton}
        >
          Delete
        </button>}
      </div>
    </form>
  );
}

export default SettingsItem;
