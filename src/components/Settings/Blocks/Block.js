import React from 'react';
import classes from '../Settings.module.css';
import SettingsItem from '../Items/Item';

function SettingsBlock({
  onClickSubmitButton, onClickCreateButton,
  value, onChange, onClickDeleteButton,
  items, title, placeholder, onClickEditButton,
  onChangeType
}) {
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
          onChangeType={onChangeType}
          placeholder={placeholder}
          transactionType={null}
          title={title}
        />

        {items.sort((a, b) => b.title.toLowerCase() > a.title.toLowerCase() ? -1 : 1).map((category) => (
          <SettingsItem
            onClickSubmitButton={onClickSubmitButton}
            value={category.title}
            // submitTitle={"Edit"}
            onClickButton={onClickEditButton}
            onChange={onChange}
            onChangeType={onChangeType}
            id={category.id}
            key={category.id}
            onClickDeleteButton={onClickDeleteButton}
            transactionType={category.incomes}
            title={title}
          />
          ))
        }
      </div>
    </section>
  )
}

export default SettingsBlock;
