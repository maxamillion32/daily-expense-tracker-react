import React from "react";
import classes from "./List.module.css";
import {getAccountStartBalance, getCurrentAccountBalance, getAccountTotalBalance} from "../utils/utils";
import SettingsListItem from "./Item/Item";
import Button from "../../../common/components/Button/Button";

const Header = ({classes, header, onClick, showButton=true}) => (
  <div className={classes}>
    <h4>{header}</h4>
    {showButton ? <Button title={"Create"} onClick={onClick} /> : null }
  </div>
);

function SettingsList({
  userId, items, header,
  accounts, transactions,
  showPopup, state, setItemState,
  setPrevItemState, setShowPopup,
  showCreateButton
}) {
  const isEmpty = items.length === 0;

  const onClickCreateButton = async () => {
    setItemState({...state, header, userId});
    setPrevItemState({...state, header, userId});
    setShowPopup(!showPopup);
  };

  return (
    <>
      <section className={classes.Wrapper}>
        <Header
          classes={classes.Header}
          header={header}
          onClick={onClickCreateButton}
          showButton={showCreateButton}
        />

        {isEmpty
          ? <SettingsListItem
              itemData={{header}}
              key={header}
            />
          : null
        }

          {items.map((item) => {
              let startBalance = "";
              let currentBalance = "";
              let balance = "";
              let itemData = {};

              if (header === "Accounts") {
                startBalance = getAccountStartBalance(items, item.title);
                currentBalance = getCurrentAccountBalance(transactions, item.title);
                balance = getAccountTotalBalance(startBalance, currentBalance);
              }

              if (header === "Accounts" || header === "Categories") {
                itemData = {
                  id: item.id,
                  title: item.title,
                  incomes: +item.incomes ? +item.incomes : "",
                  header,
                  balance,
                  icon: item.icon,
                  userId: item.userId,
                  date: state.date
                };
              }

              if (header === "User account") {
                itemData = {
                  title: item.title,
                  userId,
                  header
                };
              }

              return (
                <SettingsListItem
                  itemData={itemData}

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
