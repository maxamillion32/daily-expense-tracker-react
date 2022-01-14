import React from "react";
import classes from "../List.module.css";

function SettingsListItem({onClickItem, id, title, incomes, header, balance}) {
  return (
    <div
      className={classes.Item}
      onClick={onClickItem}
      dataid={id}
      datavalue={title}
      datatype={incomes}
      dataheader={header}
    >
      <p>{title}</p>
      {header === "Accounts" && <p>balance: <b>{balance}€</b></p>}
    </div>
  );
}

export default SettingsListItem;
