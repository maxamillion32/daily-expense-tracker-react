import React from "react";
import classes from "./List.module.css";
import {getAccountStartBalance, getCurrentAccountBalance, getAccountTotalBalance} from "../utils";

import Popup from "../../../common/components/Popup/Popup";
import SettingsPopup from "../Popup/Popup";
import SettingsListItem from "./Item/Item";

function SettingsList({
  items,
  header,
  onClickItem,
  onClickToggle,
  transactions,
  itemState,
  setItem,
  prevItem,
  showPopup,
  setShowPopup
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
                  <SettingsListItem
                    onClickItem={onClickItem}
                    id={item.id}
                    title={item.title}
                    incomes={+item.incomes ? +item.incomes : ""}
                    header={header}
                    balance={balance}
                    icon={item.icon}
                    key={item.id}
                  />
                );
              }
            )
          }
      </section>

      <Popup
        showPopup={showPopup}
        setShowPopup={setShowPopup}
      >
        <SettingsPopup
          itemState={itemState}
          prevItem={prevItem}
          setItem={setItem}
          transactions={transactions}
          setShowPopup={setShowPopup}
        />
      </Popup>
    </>
  );
}

export default SettingsList;
