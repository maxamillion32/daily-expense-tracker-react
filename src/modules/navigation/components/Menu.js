import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {NavLink} from "react-router-dom";
import {CSSTransition} from "react-transition-group";

import classes from "./Menu.module.css";
import Form from "../../transactions/components/CreateForm/Form";
import {resetState, isButtonShow, isButtonClick, clickButton} from "../../../reducers/transactions/transactions-slice";
import {selectAllCategoriesState} from "../../../reducers/categories/categories-slice";
import {selectAllAccountsState} from "../../../reducers/accounts/accounts-slice";

import transactions from "../../../static/img/transactions.png";
import statistics from "../../../static/img/statistics.png";
import settings from "../../../static/img/settings.png";

function Menu() {
  const getCategories = useSelector(selectAllCategoriesState);
  const getAccounts = useSelector(selectAllAccountsState);
  const categories = [...getCategories];
  const accounts = [...getAccounts];
  const dispatch = useDispatch();
  const clickAddButton = useSelector(isButtonClick);
  const showAddButton = useSelector(isButtonShow);

  const classesAddBtn = [
    classes.menuAddBtn,
    "fa",
    clickAddButton ? "fa-times" : "fa-plus",
  ].join(" ");

  const onClickAddButton = () => {
    dispatch(clickButton());

    if (clickAddButton) {
      dispatch(resetState());
    }
  };

  const isActiveLink = ({isActive}) => (isActive ? `${classes.active}` : "");
  const nodeRef = React.useRef(null);

  return (
    <>
      <Form
        categories={categories}
        accounts={accounts}
        onClickAddBtn={clickAddButton}
      />

      <nav className={classes.menu}>
        <div className={classes.wrapper}>
          {showAddButton && <CSSTransition
              in={clickAddButton}
              timeout={300}
              classNames={{
                enterActive: `${classes.addBtnEnterActive}`,
                enterDone: `${classes.addBtnEnterDone}`,
              }}
              nodeRef={nodeRef}
            >
            <i
              className={classesAddBtn}
              onClick={onClickAddButton}
              ref={nodeRef}
            />
          </CSSTransition>}

          <NavLink
              to={"/"}
              className={isActiveLink}
          >
            {/* Transactions */}
            <img src={transactions} width="30"/>
          </NavLink>

          <NavLink
              to={"/statistics"}
              className={isActiveLink}
          >
            {/* Statistics */}
            <img src={statistics}  width="30"/>
          </NavLink>

          <NavLink
              to={"/settings"}
              className={isActiveLink}
          >
            {/* Settings */}
            <img src={settings} width="30"/>
          </NavLink>
        </div>
      </nav>
    </>
  );
}

export default Menu;
