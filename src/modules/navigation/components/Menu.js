import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {NavLink} from "react-router-dom";

import classes from "./Menu.module.css";
import {isButtonShow, setIsAddButtonClick, setIsButtonShow} from "../../../reducers/transactions/transactions-slice";
import {selectFilteredCategories} from "../../../reducers/categories/categories-slice";
import {selectFilteredAccounts} from "../../../reducers/accounts/accounts-slice";

import transactions from "../../../assets/img/transactions.png";
import statistics from "../../../assets/img/statistics.png";
import settings from "../../../assets/img/settings.png";
import AddButton from "../../common/components/AddButton/AddButton";
import {ADD_BUTTON_TYPES} from "../../common/components/AddButton/AddButtonTypes";

function Menu() {
  const showAddButton = useSelector(isButtonShow);
  const getCategories = useSelector(selectFilteredCategories);
  const getAccounts = useSelector(selectFilteredAccounts);
  const categories = [...getCategories];
  const accounts = [...getAccounts];

  const dispatch = useDispatch();

  //TODO: rename isEmpty
  const isEmpty = categories.length === 0 || accounts.length === 0;

  const isActiveLink = ({isActive}) => (isActive ? `${classes.active}` : "");

  const onAddButtonClick = () => {
    dispatch(setIsAddButtonClick());
    dispatch(setIsButtonShow());
  };

  return (
    <>
    <nav className={classes.menu}>
      <div className={classes.wrapper}>
        {showAddButton
          ?
            <AddButton
              cssClass={ADD_BUTTON_TYPES.PLUS}
              onClick={onAddButtonClick}
              isDisabled={isEmpty}
            />
          : null}

        <NavLink
          to={"/"}
          className={isActiveLink}
        >
          <img src={transactions} width="30"/>
        </NavLink>

        <NavLink
          to={"/statistics"}
          className={isActiveLink}
        >
          <img src={statistics}  width="30"/>
        </NavLink>

        <NavLink
          to={"/settings"}
          className={isActiveLink}
        >
          <img src={settings} width="30"/>
        </NavLink>

      </div>
    </nav>
    </>
  );
}

export default Menu;
