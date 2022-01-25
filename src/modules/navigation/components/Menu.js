import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {NavLink} from "react-router-dom";
import {CSSTransition} from "react-transition-group";

import classes from "./Menu.module.css";
import CreateForm from "../../transactions/components/CreateForm/Form";
import {resetState, isButtonShow, isButtonClick, clickButton} from "../../../reducers/transactions/transactions-slice";
import {selectAllCategoriesState} from "../../../reducers/categories/categories-slice";
import {selectAllAccountsState} from "../../../reducers/accounts/accounts-slice";

import transactions from "../../../assets/img/transactions.png";
import statistics from "../../../assets/img/statistics.png";
import settings from "../../../assets/img/settings.png";
import AddButton from "./AddButton/AddButton";

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
      <CreateForm
        categories={categories}
        accounts={accounts}
        onClickAddBtn={clickAddButton}
      />

      <nav className={classes.menu}>
        <div className={classes.wrapper}>

          {showAddButton
            ? <CSSTransition
                in={clickAddButton}
                timeout={300}
                classNames={{
                  enterActive: `${classes.addBtnEnterActive}`,
                  enterDone: `${classes.addBtnEnterDone}`,
                }}
                nodeRef={nodeRef}
              >
                <AddButton
                  cssClass={classesAddBtn}
                  onClick={onClickAddButton}
                  nodeRef={nodeRef}
                  isEmpty={isEmpty}
                />
              </CSSTransition>
            : null}

          <NavLink
            to={"expence-tracker-react-redux/build/"}
            className={isActiveLink}
          >
            <img src={transactions} width="30"/>
          </NavLink>

          <NavLink
            to={"expence-tracker-react-redux/build/statistics"}
            className={isActiveLink}
          >
            <img src={statistics}  width="30"/>
          </NavLink>

          <NavLink
            to={"expence-tracker-react-redux/build/settings"}
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
