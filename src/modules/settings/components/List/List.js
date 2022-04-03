import React from "react";
import classes from "./List.module.css";
import {getAccountStartBalance, getCurrentAccountBalance, getAccountTotalBalance} from "../utils";
import SettingsListItem from "./Item/Item";

function SettingsList({
  items,
  header,
  accounts,
  onClickItem,
  transactions,
  setItem,
  setPrevItem,
  showPopup,
  setShowPopup,
  userId,
  state
}) {
  const onClickCreateButton = async () => {
    setItem({...state, header, userId});
    setPrevItem({...state, header, userId});
    setShowPopup(!showPopup);
  };

  return (
    <>
      <section className={classes.Wrapper}>
        <div className={classes.Content}>
          <p className={classes.Header}>{header}</p>
          <button
            className={classes.Button}
            onClick={onClickCreateButton}
          >Create</button>
        </div>

          {items.map((item) => {
              const startBalance = getAccountStartBalance(items, item.title);
              const currentBalance = getCurrentAccountBalance(transactions, item.title);
              const balance = getAccountTotalBalance(startBalance, currentBalance);
              return (
                <SettingsListItem
                  onClickItem={onClickItem}
                  id={item.id}
                  title={item.title}
                  incomes={+item.incomes ? +item.incomes : ""}
                  header={header}
                  balance={balance}
                  icon={item.icon}
                  userId={item.userId}
                  date={state.date}
                  setItem={setItem}
                  setPrevItem={setPrevItem}
                  accounts={accounts}
                  showPopup={showPopup}
                  setShowPopup={setShowPopup}
                  key={item.id}
                />
              );
            })
          }
      </section>
    </>
  );
}

export default SettingsList;
