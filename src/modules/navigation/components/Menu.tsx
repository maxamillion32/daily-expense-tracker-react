import React from "react";
import {useDispatch, useSelector} from "react-redux";

import classes from "./Menu.module.css";
import {setIsExpense, setIsTransfer} from "../../../reducers/transactions/transactions-slice";
import {
  selectIsButtonShow, setIsAddButtonClick,
  setIsTransactionTypeClick
} from "../../../reducers/navigation/navigation-slice";

import transactions from "../../../assets/img/transactions.png";
import statistics from "../../../assets/img/statistics.png";
import settings from "../../../assets/img/settings.png";

import AddButton from "../../common/components/AddButton/AddButton";
import WithCSSTransition from "../../common/hoc/WithCSSTransition/WithCSSTransition";
import NavContainer from "./NavContainer/NavContainer";
import NavButton from "./NavButton/NavButton";
import OptionsButtonBackground from "./OptionsButtonBackground/OptionsButtonBackground";
import OptionsButton from "./OptionsButton/OptionsButton";

function Menu() {
  const isButtonShow = useSelector(selectIsButtonShow);
  const dispatch = useDispatch();

  //TODO: fix that
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const isActiveLink= ({isActive}) => (isActive ? `${classes.active}` : "");

  const nodeRefAddBtn = React.useRef(null);

  const onIncomeButtonClick = (event: MouseEvent) => {
    event.stopPropagation();
    dispatch(setIsAddButtonClick(false));
    dispatch(setIsTransactionTypeClick());
    dispatch(setIsExpense(false));
  };

  const onExpenseButtonClick = (event: MouseEvent) => {
    event.stopPropagation();
    dispatch(setIsAddButtonClick(false));
    dispatch(setIsTransactionTypeClick());
    dispatch(setIsExpense(true));
  };

  const onTransferButtonClick = (event: MouseEvent) => {
    event.stopPropagation();
    dispatch(setIsAddButtonClick(false));
    dispatch(setIsTransactionTypeClick());
    dispatch(setIsTransfer(true));
  };

  return (
    <>
      <OptionsButtonBackground>
        <OptionsButton
          //TODO: fix that
          //eslint-disable-next-line @typescript-eslint/ban-ts-comment
          //@ts-ignore
          onClick={onTransferButtonClick}
          typeClass={classes.menuAddTransferBtn}
          type={"fa-exchange"}
          title={"Transfer"}
        />

        <OptionsButton
          //TODO: fix that
          //eslint-disable-next-line @typescript-eslint/ban-ts-comment
          //@ts-ignore
          onClick={onIncomeButtonClick}
          typeClass={classes.menuAddPlusBtn}
          type={"fa-plus"}
          title={"Income"}
        />
        <OptionsButton
          //TODO: fix that
          //eslint-disable-next-line @typescript-eslint/ban-ts-comment
          //@ts-ignore
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
          <AddButton nodeRef={undefined} />
        </WithCSSTransition>

        <NavButton
          to={"/"}
          //TODO: fix that
          //eslint-disable-next-line @typescript-eslint/ban-ts-comment
          //@ts-ignore
          className={isActiveLink}
          src={transactions}
        />

        <NavButton
          to={"/statistics"}
          //TODO: fix that
          //eslint-disable-next-line @typescript-eslint/ban-ts-comment
          //@ts-ignore
          className={isActiveLink}
          src={statistics}
        />

        <NavButton
          to={"/settings"}
          //TODO: fix that
          //eslint-disable-next-line @typescript-eslint/ban-ts-comment
          //@ts-ignore
          className={isActiveLink}
          src={settings}
        />

      </NavContainer>
    </>
  );
}

export default Menu;
