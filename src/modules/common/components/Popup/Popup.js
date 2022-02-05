import React, {useEffect} from "react";
import classes from "./Popup.module.css";
import CloseButton from "../CloseButton/CloseButton";
import {CSSTransition} from "react-transition-group";

function Popup({children, showPopup, setShowPopup}) {
  const nodeRef = React.useRef(null);

  useEffect(() => {
    if (showPopup) {
      document.body.style.overflow = "hidden";
      document.querySelector("html").style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
      document.querySelector("html").style.overflow = "unset";
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
