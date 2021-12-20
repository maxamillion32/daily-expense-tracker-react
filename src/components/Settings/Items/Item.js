import React from 'react';
import classes from './Item.module.css';

function SettingsItem({id, onChange, onClickSubmitButton, value, submitTitle, onClickButton, placeholder, onClickDeleteButton}) {
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
      <div className={classes.ButtonWrapper}>
        <button
          className={classes.Button}
          id={id}
          type="submit"
          onClick={onClickButton}
          disabled={!value}
        >
          {submitTitle}
        </button>
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
  )
}

export default SettingsItem;
