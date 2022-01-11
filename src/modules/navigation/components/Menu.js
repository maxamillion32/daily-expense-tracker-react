import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {NavLink} from "react-router-dom";
import {CSSTransition} from "react-transition-group";

import classes from "./Menu.module.css";
import Form from "../../transactions/components/CreateForm/Form";
import {resetState, isButtonShow, isButtonClick, clickButton} from "../../../reducers/transactions/transactions-slice";

function Menu({categories, accounts, userId}) {
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
        userId={userId}
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
            Transactions
          </NavLink>

          <NavLink
              to={"/statistics"}
              className={isActiveLink}
          >
            Statistics
          </NavLink>

          <NavLink
              to={"/settings"}
              className={isActiveLink}
          >
            Settings
          </NavLink>
        </div>
      </nav>
    </>
  );
}

export default Menu;
