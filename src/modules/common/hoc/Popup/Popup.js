import React, {useEffect} from "react";
import classes from "./Popup.module.css";
// import {usePopup} from "./PopupContext";
import CloseButton from "../../components/CloseButton/CloseButton";
import {CSSTransition} from "react-transition-group";

function Popup({children, toggle, setToggle}) {
  const nodeRef = React.useRef(null);

  useEffect(() => {
    if (toggle) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [toggle]);

  return (
    <CSSTransition
      in={toggle}
      timeout={300}
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
          <CloseButton onClick={setToggle}/>
        </div>
        {children}
      </section>
    </CSSTransition>
  );
}

export default Popup;
