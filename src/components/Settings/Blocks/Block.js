import React from 'react';
import classes from './Block.module.css';

function SettingsBlock({
  items, header, onClickItem, onClickToggle
}) {
  return (
    <section className={classes.Wrapper}>
      <div className={classes.Content}>
        <p className={classes.Header}>{header}</p>
        <button
          className={classes.Button}
          onClick={onClickToggle}
          dataheader={header}
        >Create</button>
      </div>

        {items.sort((a, b) => b.title.toLowerCase() > a.title.toLowerCase() ? -1 : 1).map((category) => (
          <p
            className={classes.Item}
            onClick={onClickItem}
            dataid={category.id}
            datavalue={category.title}
            datatype={+category.incomes ? +category.incomes : ''}
            dataheader={header}
            key={category.id}
          >
            {category.title}
          </p>
          ))
        }
    </section>
  )
}

export default SettingsBlock;
