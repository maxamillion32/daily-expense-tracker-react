import React, {useEffect} from "react";
import {useSelector} from "react-redux";
import classes from "./Popup.module.css";
import CloseButton from "../CloseButton/CloseButton";
import {isAddButtonClick} from "../../../../reducers/transactions/transactions-slice";
import {CSSTransition} from "react-transition-group";

interface PopupProps {
  children: React.ReactNode
  showPopup: boolean,
  setShowPopup: () => void,
}

function Popup({children, setShowPopup}: PopupProps) {
  const nodeRef = React.useRef(null);
  const showPopup = useSelector(isAddButtonClick);

  useEffect(() => {
    const htmlTag = document.querySelector("html");

    if (showPopup) {
      document.body.style.overflow = "hidden";

      if (htmlTag !== null) {
        htmlTag.style.overflow = "hidden";
      }
    } else {
      document.body.style.overflow = "unset";

      if (htmlTag !== null) {
        htmlTag.style.overflow = "unset";
      }
    }
  }, [showPopup]);

  return (
    <CSSTransition
      in={showPopup}
      timeout={250}
      classNames={{
        enterDone: `${classes.EnterDone}`,
        enterActive: `${classes.EnterActive}`,
        exitActive: `${classes.ExitActive}`,
      }}
      unmountOnExit
      nodeRef={nodeRef}
    >
      <section className={classes.Container} ref={nodeRef}>
        <div className={classes.CloseBtn}>
          <CloseButton onClick={setShowPopup}/>
        </div>
        {children}
      </section>
    </CSSTransition>
  );
}

export default Popup;
