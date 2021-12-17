import React from 'react';
import classes from '../Settings.module.css';
import SettingsItem from '../Items/Item';

function SettingsBlock({onClickSubmitButton, onClickCreateButton, value, onChange, onClickDeleteButton, items, title}) {
  return (
    <section className={classes.Wrapper}>
      <div className={classes.Content}>
        <p className={classes.Header}>{title}</p>
        <SettingsItem
          onClickSubmitButton={onClickSubmitButton}
          onClickButton={onClickCreateButton}
          value={value}
          submitTitle={"Create"}
          onChange={onChange}
        />

        {items.map((category) => (
          <SettingsItem
            onClickSubmitButton={onClickSubmitButton}
            value={category.title}
            submitTitle={"Delete"}
            onClickButton={onClickDeleteButton}
            onChange={onChange}
            id={category.id}
            key={category.id}
          />
          ))
        }
      </div>
    </section>
  )
}

export default SettingsBlock;
