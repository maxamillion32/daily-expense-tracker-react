import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {NavLink} from "react-router-dom";

import {TransitionGroup, CSSTransition} from "react-transition-group";

import classes from "./Menu.module.css";
import {isButtonShow, setIsAddButtonClick, isAddButtonClick, setIsButtonShow, setIsTransactionTypeClick,
setTransactionType} from "../../../reducers/transactions/transactions-slice";
import {selectFilteredCategories} from "../../../reducers/categories/categories-slice";
import {selectFilteredAccounts} from "../../../reducers/accounts/accounts-slice";

import transactions from "../../../assets/img/transactions.png";
import statistics from "../../../assets/img/statistics.png";
import settings from "../../../assets/img/settings.png";
import AddButton from "../../common/components/AddButton/AddButton";
import {ADD_BUTTON_TYPES} from "../../common/components/AddButton/AddButtonTypes";

const OptionsButton = ({type, onClick, typeClass, title}) => (
  <div className={`${classes.btnWrapper} ${typeClass}`}>
    <p className={classes.btnTitle}>{title}</p>
    <button
      className={`${classes.menuAddBtn} fa ${type}`}
      onClick={onClick}
    />
  </div>
);

const OptionsButtonBackground = ({children, onClick, nodeRef, ...props}) => (
  <CSSTransition
    {...props}
    classNames={{
      enterDone: `${classes.EnterDone}`,
      enterActive: `${classes.EnterActive}`,
      exitActive: `${classes.ExitActive}`,
    }}
    timeout={150}
    unmountOnExit
    nodeRef={nodeRef}
  >
    <div className={classes.btnBackground} onClick={onClick} ref={nodeRef}>
      {children}
    </div>
  </CSSTransition>
);

const NavContainer = ({children}) => (
  <nav className={classes.menu}>
    <div className={classes.wrapper}>
      {children}
    </div>
  </nav>
);

const NavButton = ({to, className, src}) => (
  <NavLink
    to={to}
    className={className}
  >
    <img src={src} width="30"/>
  </NavLink>
);

function Menu() {
  const showAddButton = useSelector(isButtonShow);
  const getCategories = useSelector(selectFilteredCategories);
  const getAccounts = useSelector(selectFilteredAccounts);
  const categories = [...getCategories];
  const accounts = [...getAccounts];
  const getIsAddButtonClick = useSelector(isAddButtonClick);

  const dispatch = useDispatch();

  const isEmpty = categories.length === 0 || accounts.length === 0;

  const isActiveLink = ({isActive}) => (isActive ? `${classes.active}` : "");

  useEffect(() => {
    if (getIsAddButtonClick) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [getIsAddButtonClick]);

  const onAddButtonClick = () => {
    dispatch(setIsAddButtonClick(true));
    dispatch(setIsButtonShow(false));
  };

  const onIncomeButtonClick = (event) => {
    event.stopPropagation();
    dispatch(setIsAddButtonClick(false));
    dispatch(setIsTransactionTypeClick());
    dispatch(setTransactionType(false));
  };

  const onExpenseButtonClick = (event) => {
    event.stopPropagation();
    dispatch(setIsAddButtonClick(false));
    dispatch(setIsTransactionTypeClick());
    dispatch(setTransactionType(true));
  };

  const onBackgroundClick = () => {
    dispatch(setIsAddButtonClick(false));
    dispatch(setIsButtonShow(true));
  };

  const nodeRef = React.useRef(null);

  return (
    <>
      <TransitionGroup>
        {getIsAddButtonClick
          ?
            <OptionsButtonBackground
              in={getIsAddButtonClick}
              onClick={onBackgroundClick}
              nodeRef={nodeRef}
            >
              <OptionsButton
                onClick={onIncomeButtonClick}
                typeClass={classes.menuAddPlusBtn}
                type={"fa-plus"}
                title={"Income"}
              />
              <OptionsButton
                onClick={onExpenseButtonClick}
                typeClass={classes.menuAddMinusBtn}
                type={"fa-minus"}
                title={"Expense"}
              />
            </OptionsButtonBackground>
          : null}
      </TransitionGroup>

      <NavContainer>
        {showAddButton
          ? <AddButton
              cssClass={ADD_BUTTON_TYPES.PLUS}
              onClick={onAddButtonClick}
              isDisabled={isEmpty}
            />
          : null}

        <NavButton
          to={"/"}
          className={isActiveLink}
          src={transactions}
        />

        <NavButton
          to={"/statistics"}
          className={isActiveLink}
          src={statistics}
        />

        <NavButton
          to={"/settings"}
          className={isActiveLink}
          src={settings}
        />

      </NavContainer>
    </>
  );
}

export default Menu;
