import React from "react";
import classes from "./List.module.css";
import {getAccountStartBalance, getCurrentAccountBalance, getAccountTotalBalance} from "../utils";
import SettingsListItem from "./Item/Item";
import Button from "../../../common/components/Button/Button";

function SettingsList({
  userId, items, header,
  accounts, transactions,
  onClickItem, showPopup,
  state, setItemState,
  setPrevItemState, setShowPopup,
}) {
  const onClickCreateButton = async () => {
    setItemState({...state, header, userId});
    setPrevItemState({...state, header, userId});
    setShowPopup(!showPopup);
  };

  return (
    <>
      <section className={classes.Wrapper}>
        <div className={classes.Content}>
          <p className={classes.Header}>{header}</p>
          <Button title={"Create"} onClick={onClickCreateButton} />
        </div>

          {items.map((item) => {
              const startBalance = getAccountStartBalance(items, item.title);
              const currentBalance = getCurrentAccountBalance(transactions, item.title);
              const balance = getAccountTotalBalance(startBalance, currentBalance);

              const itemData = {
                id: item.id,
                title: item.title,
                incomes: +item.incomes ? +item.incomes : "",
                header: header,
                balance: balance,
                icon: item.icon,
                userId: item.userId,
                date: state.date
              };

              return (
                <SettingsListItem
                  itemData={itemData}

                  onClickItem={onClickItem}
                  setItemState={setItemState}
                  setPrevItemState={setPrevItemState}
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
