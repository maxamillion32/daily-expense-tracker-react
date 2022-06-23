import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {NavLink} from "react-router-dom";

import classes from "./Menu.module.css";
import {setIsExpense, setIsTransfer} from "../../../reducers/transactions/transactions-slice";
import {
  selectIsButtonShow, setIsAddButtonClick, selectIsAddButtonClick,
  setIsButtonShow, setIsTransactionTypeClick
} from "../../../reducers/navigation/navigation-slice";

import transactions from "../../../assets/img/transactions.png";
import statistics from "../../../assets/img/statistics.png";
import settings from "../../../assets/img/settings.png";
import AddButton from "../../common/components/AddButton/AddButton";
import WithCSSTransition from "../../common/hoc/WithCSSTransition/WithCSSTransition";

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

const OptionsButtonBackground = ({children}) => {
  const isAddButtonClick = useSelector(selectIsAddButtonClick);
  const nodeRefOptionsBtn = React.useRef(null);
  const dispatch = useDispatch();

  const onBackgroundClick = () => {
    dispatch(setIsAddButtonClick(false));
    dispatch(setIsButtonShow(true));
  };

  useLockBodyScroll(isAddButtonClick);

  return (
    <WithCSSTransition
        inProp={isAddButtonClick}
        animationType={"fade"}
        timeout={200}
        nodeRef={nodeRefOptionsBtn}
    >
      <div className={classes.btnBackground} onClick={onBackgroundClick} ref={nodeRefOptionsBtn}>
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
    <img src={src} width="30" alt="menu button"/>
  </NavLink>
);

function Menu() {
  const isButtonShow = useSelector(selectIsButtonShow);
  const dispatch = useDispatch();

  const isActiveLink = ({isActive}) => (isActive ? `${classes.active}` : "");

  const nodeRefAddBtn = React.useRef(null);

  const onIncomeButtonClick = (event) => {
    event.stopPropagation();
    dispatch(setIsAddButtonClick(false));
    dispatch(setIsTransactionTypeClick());
    dispatch(setIsExpense(false));
  };

  const onExpenseButtonClick = (event) => {
    event.stopPropagation();
    dispatch(setIsAddButtonClick(false));
    dispatch(setIsTransactionTypeClick());
    dispatch(setIsExpense(true));
  };

  const onTransferButtonClick = (event) => {
    event.stopPropagation();
    dispatch(setIsAddButtonClick(false));
    dispatch(setIsTransactionTypeClick());
    dispatch(setIsTransfer(true));
  };

  return (
    <>
      <OptionsButtonBackground>
        <OptionsButton
          onClick={onTransferButtonClick}
          typeClass={classes.menuAddTransferBtn}
          type={"fa-exchange"}
          title={"Transfer"}
        />

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
          <AddButton />
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
