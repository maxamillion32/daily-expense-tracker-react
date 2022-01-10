import React from "react";
import classes from "./Item.module.css";

function SettingsItem({
  items,
  header,
  onClickItem,
  onClickToggle
}) {
  return (
    <>
      <section className={classes.Wrapper}>
        <div className={classes.Content}>
          <p className={classes.Header}>{header}</p>
          <button
            className={classes.Button}
            onClick={onClickToggle}
            dataheader={header}
          >Create</button>
        </div>

          {items.sort((a, b) => b.title.toLowerCase() > a.title.toLowerCase() ? -1 : 1).map((item) => (
            <div
              className={classes.Item}
              onClick={onClickItem}
              dataid={item.id}
              datavalue={item.title}
              datatype={+item.incomes ? +item.incomes : ""}
              dataheader={header}
              key={item.id}
            >
              <p>{item.title}</p>
              {header === "Accounts" && <p>balance: <b>{item.balance}€</b></p>}
            </div>
            ))
          }
      </section>
    </>
  );
}

export default SettingsItem;
