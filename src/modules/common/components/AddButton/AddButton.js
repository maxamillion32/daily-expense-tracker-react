import React from "react";
import {useDispatch, useSelector} from "react-redux";
import classes from "./AddButton.module.css";

import {
  setIsAddButtonClick,
  setIsButtonShow
} from "../../../../reducers/navigation/navigation-slice";
import {selectFilteredCategories} from "../../../../reducers/categories/categories-slice";
import {selectFilteredAccounts} from "../../../../reducers/accounts/accounts-slice";

import {ADD_BUTTON_TYPES} from "../../../common/components/AddButton/AddButtonTypes";

// interface AddButtonProps {
//   cssClass: string,
//   onClick: () => void,
//   isDisabled: boolean,
//   nodeRef: ""
// }

function AddButton({nodeRef}) {
  const getCategories = useSelector(selectFilteredCategories);
  const getAccounts = useSelector(selectFilteredAccounts);
  const categories = [...getCategories];
  const accounts = [...getAccounts];
  const dispatch = useDispatch();

  const isEmpty = categories.length === 0 || accounts.length === 0;

  const classesAddBtn = [
    classes.menuAddBtn,
    "fa",
    ADD_BUTTON_TYPES.PLUS
  ].join(" ");

  const onAddButtonClick = () => {
    dispatch(setIsAddButtonClick(true));
    dispatch(setIsButtonShow(false));
  };

  return (
    <button
      className={classesAddBtn}
      onClick={onAddButtonClick}
      disabled={isEmpty}
      ref={nodeRef}
    />
  );
}

export default AddButton;
