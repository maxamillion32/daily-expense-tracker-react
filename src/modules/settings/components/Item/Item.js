import React from "react";
import classes from "./Item.module.css";
import {getAccountStartBalance, getCurrentAccountBalance, getAccountTotalBalance} from "../utils";

function SettingsContainerItem({
  items,
  header,
  onClickItem,
  onClickToggle,
  transactions
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

          {items.sort((a, b) => b.title.toLowerCase() > a.title.toLowerCase() ? -1 : 1).map((item) => {
              const startBalance = getAccountStartBalance(items, item.title);
              const currentBalance = getCurrentAccountBalance(transactions, item.title);
              const balance = getAccountTotalBalance(startBalance, currentBalance);
                return (
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
                  {header === "Accounts" && <p>balance: <b>{balance}€</b></p>}
                </div>
                );
              }
            )
          }
      </section>
    </>
  );
}

export default SettingsContainerItem;
