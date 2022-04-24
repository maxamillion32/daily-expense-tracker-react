import React from "react";
import classes from "../List.module.css";
import {getAccountStartBalance} from "../../utils";

function SettingsListItem(
  {
    setItemState,
    setPrevItemState, accounts,
    showPopup, setShowPopup,
    itemData
  }) {
  const {id, title, userId, incomes, header, icon, balance, date} = itemData;

  const onClickItem = async () => {
    if (header === "Accounts") {
      const startBalance = getAccountStartBalance(accounts, title);
      const accountData = {id, title, userId, header, startBalance, balance, date};

      setItemState(accountData);
      setPrevItemState(accountData);
      setShowPopup(!showPopup);
    }

    if (header === "Categories") {
      const categoryData = {id, title, userId, incomes: !!+incomes.toString(), header, icon};

      setItemState(categoryData);
      setPrevItemState(categoryData);
      setShowPopup(!showPopup);
    }

    if (header === "User account") {
      const confirm = window.confirm("Are you sure?");
      const userData = {userId};

      if (confirm) {
        alert("Your user account is deleted!");
        return;
      }
    }
  };

  return (
    <div className={classes.Item} onClick={onClickItem}>
      <p>{title}</p>
      {header === "Accounts" ? <p>balance: <b>{balance}€</b></p> : null}
    </div>
  );
}

export default SettingsListItem;
