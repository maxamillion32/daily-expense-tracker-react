import React from "react";
import classes from "./Popup.module.css";

import CloseButton from "../CloseButton/CloseButton";
import WithCSSTransition from "../../hoc/WithCSSTransition/WithCSSTransition";
import {useLockBodyScroll} from "../../hooks/useLockBodyScroll/useLockBodyScroll";


function Popup({children, showPopup, setShowPopup}) {
  const nodeRefPopup = React.useRef(null);

  useLockBodyScroll(showPopup);

  return (
    <WithCSSTransition
      inProp={showPopup}
      animationType={"backInUp"}
      timeout={200}
      nodeRef={nodeRefPopup}
    >
      <section className={classes.Container} ref={nodeRefPopup}>
        <div className={classes.CloseBtn}>
          <CloseButton onClick={setShowPopup}/>
        </div>
        {children}
      </section>
    </WithCSSTransition>
  );
}

export default Popup;
