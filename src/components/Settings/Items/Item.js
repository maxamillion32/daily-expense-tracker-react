import React from 'react';
import classes from './Item.module.css';

function SettingsItem({id, onChange, onClickSubmitButton, value, submitTitle, onClickButton}) {
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
      />
      <div className={classes.ButtonWrapper}>
        <button
          className={classes.Button}
          id={id}
          type="submit"
          onClick={onClickButton}
        >
          {submitTitle}
        </button>
        {/* {onClickDeleteBtn && <button
          className={classes.Button}
          type="button"
          onClick={onClickDeleteBtn}
        >
          Delete
        </button>} */}
      </div>
    </form>
  )
}

export default SettingsItem;
