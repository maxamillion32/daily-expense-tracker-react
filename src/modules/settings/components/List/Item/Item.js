import React from "react";
import classes from "../List.module.css";
import {getAccountStartBalance} from "../../utils";

function SettingsListItem({id, title, incomes, header, balance, icon, userId, date, setItem, setPrevItem, accounts, showPopup, setShowPopup}) {
  const onClickItem = async () => {
    if (header === "Accounts") {
      const startBalance = getAccountStartBalance(accounts, title);

      setItem({id, title, userId, incomes: !!+incomes.toString(), header, startBalance, balance, date});
      setPrevItem({id, title, userId, incomes: !!+incomes.toString(), header, startBalance, balance});
      setShowPopup(!showPopup);
    } else {
      const startBalance = "";
      const balance = "";

      setItem({id, title, userId, incomes: !!+incomes.toString(), header, startBalance, balance, icon});
      setPrevItem({id, title, userId, incomes: !!+incomes.toString(), header, startBalance, balance, icon});
      setShowPopup(!showPopup);
    }
  };
  return (
    <div
      className={classes.Item}
      onClick={onClickItem}
    >
      <p>{title}</p>
      {header === "Accounts" && <p>balance: <b>{balance}€</b></p>}
    </div>
  );
}

export default SettingsListItem;
