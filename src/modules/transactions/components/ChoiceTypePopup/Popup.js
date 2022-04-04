import React from "react";
import classes from "./Popup.module.css";
import AddButton from "../../../common/components/AddButton/AddButton";
import {ADD_BUTTON_TYPES} from "../../../common/components/AddButton/AddButtonTypes";

function TransactionsChoiceTypePopup() {

  return (
    <AddButton
      cssClass={ADD_BUTTON_TYPES.MINUS}
      // onClick={onAddButtonClick}
      // nodeRef={nodeRef}
      // isEmpty={isEmpty}
    />
  );
}

export default TransactionsChoiceTypePopup;
