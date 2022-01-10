import React from "react";
import classes from "./Item.module.css";

const getAccountStartBalance = (accounts, title) => {
  const currentAccount = accounts
  .find((account) => account.title === title);

  return currentAccount.startBalance;
};

const getAccountTotalBalance = (startBalance, balance) => {
  return (balance + +startBalance).toFixed(2);
};

const getCurrentAccountBalance = (transactions, title) => {
  const incomes = transactions
  .filter((transaction) => transaction.expense === false)
  .filter((transaction) => transaction.account.title === title)
  .map((transaction) => transaction.sum)
  .reduce((a, b) => a + b, 0);

  const expenses = transactions
  .filter((transaction) => transaction.expense === true)
  .filter((transaction) => transaction.account.title === title)
  .map((transaction) => transaction.sum)
  .reduce((a, b) => a + b, 0);

  return incomes - expenses;
};

function SettingsItem({
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
              const balance = getAccountTotalBalance(startBalance, getCurrentAccountBalance(transactions, item.title));
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

export default SettingsItem;
