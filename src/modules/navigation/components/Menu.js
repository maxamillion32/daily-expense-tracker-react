import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {NavLink} from "react-router-dom";

import classes from "./Menu.module.css";
import {setTransactionType} from "../../../reducers/transactions/transactions-slice";
import {
  selectIsButtonShow, setIsAddButtonClick, selectIsAddButtonClick,
  setIsButtonShow, setIsTransactionTypeClick
} from "../../../reducers/navigation/navigation-slice";
import {selectFilteredCategories} from "../../../reducers/categories/categories-slice";
import {selectFilteredAccounts} from "../../../reducers/accounts/accounts-slice";

import transactions from "../../../assets/img/transactions.png";
import statistics from "../../../assets/img/statistics.png";
import settings from "../../../assets/img/settings.png";
import AddButton from "../../common/components/AddButton/AddButton";
import WithCSSTransition from "../../common/hoc/WithCSSTransition/WithCSSTransition";

import {ADD_BUTTON_TYPES} from "../../common/components/AddButton/AddButtonTypes";
import {useLockBodyScroll} from "../../common/hooks/useLockBodyScroll/useLockBodyScroll";


const OptionsButton = ({type, onClick, typeClass, title}) => (
  <div className={`${classes.btnWrapper} ${typeClass}`}>
    <p className={classes.btnTitle}>{title}</p>
    <button
      className={`${classes.menuAddBtn} fa ${type}`}
      onClick={onClick}
    />
  </div>
);

const OptionsButtonBackground = ({children, onClick, inProp}) => {
  const nodeRefOptionsBtn = React.useRef(null);

  useLockBodyScroll(inProp);

  return (
    <WithCSSTransition
        inProp={inProp}
        animationType={"fade"}
        timeout={200}
        nodeRef={nodeRefOptionsBtn}
    >
      <div className={classes.btnBackground} onClick={onClick} ref={nodeRefOptionsBtn}>
        {children}
      </div>
    </WithCSSTransition>
  );
};

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
  const getCategories = useSelector(selectFilteredCategories);
  const getAccounts = useSelector(selectFilteredAccounts);
  const categories = [...getCategories];
  const accounts = [...getAccounts];
  const isButtonShow = useSelector(selectIsButtonShow);
  const isAddButtonClick = useSelector(selectIsAddButtonClick);

  const dispatch = useDispatch();

  const isEmpty = categories.length === 0 || accounts.length === 0;

  const isActiveLink = ({isActive}) => (isActive ? `${classes.active}` : "");

  const nodeRefAddBtn = React.useRef(null);



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

  return (
    <>
      <OptionsButtonBackground
        inProp={isAddButtonClick}
        onClick={onBackgroundClick}
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

      <NavContainer>
        <WithCSSTransition
          inProp={isButtonShow}
          animationType={"fade"}
          timeout={200}
          nodeRef={nodeRefAddBtn}
        >
          <AddButton
            cssClass={ADD_BUTTON_TYPES.PLUS}
            onClick={onAddButtonClick}
            isDisabled={isEmpty}
          />
        </WithCSSTransition>

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
