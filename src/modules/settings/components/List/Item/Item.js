import React from "react";
import classes from "../List.module.css";
import {getAccountStartBalance} from "../../utils/utils";
import {deleteUserByID} from "../../../../../services/firebase/firebase-service";

function SettingsListItem(
  {
    setItemState,
    setPrevItemState, accounts,
    showPopup, setShowPopup,
    itemData
  }) {
  const {id, title, userId, incomes, header, icon, balance, date} = itemData;

  const isEmpty = itemData.title;

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

      if (confirm) {
        deleteUserByID(userId);
        return;
      }
    }
  };

  return (
    <>
        {!isEmpty
        ? <p className={classes.Message}>
            Create your first {
              header === "Accounts" ? "account"
                  : header === "Categories" ? "category"
                : null
              }
          </p>
        : <>
            <div className={classes.Item} onClick={onClickItem}>
              <p>{title}</p>
              {header === "Accounts" ? <p>balance: <b>{balance}€</b></p> : null}
            </div>
          </>
        }
    </>
  );
}

export default SettingsListItem;
