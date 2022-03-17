import React, {useContext} from "react";
import {useDispatch, useSelector} from "react-redux";
import {NavLink} from "react-router-dom";

import classes from "./Menu.module.css";
import {isButtonShow, isAddButtonClick, setIsAddButtonClick, setIsButtonShow} from "../../../reducers/transactions/transactions-slice";

import transactions from "../../../assets/img/transactions.png";
import statistics from "../../../assets/img/statistics.png";
import settings from "../../../assets/img/settings.png";
import AddButton from "../../common/components/AddButton/AddButton";
import {AppContext} from "../../../Context";

function Menu() {
  const {categories, accounts} = useContext(AppContext);
  const getIsAddButtonClick = useSelector(isAddButtonClick);
  const showAddButton = useSelector(isButtonShow);
  const dispatch = useDispatch();

  const isEmpty = categories.length === 0 || accounts.length === 0;

  const classesAddBtn = [
    classes.menuAddBtn,
    "fa",
    getIsAddButtonClick ? "fa-times" : "fa-plus",
  ].join(" ");
  const isActiveLink = ({isActive}) => (isActive ? `${classes.active}` : "");

  const nodeRef = React.useRef(null);

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
              cssClass={classesAddBtn}
              onClick={onAddButtonClick}
              nodeRef={nodeRef}
              isEmpty={isEmpty}
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
