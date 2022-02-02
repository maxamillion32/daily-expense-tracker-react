import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {NavLink} from "react-router-dom";
import {CSSTransition} from "react-transition-group";

import classes from "./Menu.module.css";
import {resetState, isButtonShow, isButtonClick, clickButton, showButton} from "../../../reducers/transactions/transactions-slice";
import {selectAllCategoriesState} from "../../../reducers/categories/categories-slice";
import {selectAllAccountsState} from "../../../reducers/accounts/accounts-slice";

import transactions from "../../../assets/img/transactions.png";
import statistics from "../../../assets/img/statistics.png";
import settings from "../../../assets/img/settings.png";
import AddButton from "../../common/components/AddButton/AddButton";
import CreateForm from "../../common/components/CreateForm/Form";
import Popup from "../../common/hoc/Popup/Popup";

function Menu() {
  const getCategories = useSelector(selectAllCategoriesState);
  const getAccounts = useSelector(selectAllAccountsState);
  const categories = [...getCategories];
  const accounts = [...getAccounts];
  const clickAddButton = useSelector(isButtonClick);
  const showAddButton = useSelector(isButtonShow);
  const dispatch = useDispatch();

  const isEmpty = categories.length === 0 || accounts.length === 0;

  const classesAddBtn = [
    classes.menuAddBtn,
    "fa",
    clickAddButton ? "fa-times" : "fa-plus",
  ].join(" ");
  const isActiveLink = ({isActive}) => (isActive ? `${classes.active}` : "");

  const nodeRef = React.useRef(null);

  // const [toggle, setToggle] = useState(false);

  // const toggleClick = () => {
  //     setToggle(!toggle);
  // };

  const onClickAddButton = () => {
    dispatch(clickButton());
    dispatch(showButton());

    if (clickAddButton) {
      dispatch(resetState());
    }
  };

  return (
    <>
    <nav className={classes.menu}>
      {/* <CreateForm
        categories={categories}
        accounts={accounts}
        onClickAddBtn={clickAddButton}
      /> */}

      <div className={classes.wrapper}>
        {showAddButton
          ?
            <AddButton
              cssClass={classesAddBtn}
              onClick={onClickAddButton}
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
