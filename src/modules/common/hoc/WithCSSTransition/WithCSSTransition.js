import React from "react";
import {CSSTransition} from "react-transition-group";

import classes from "./WithCSSTransition.module.css";

function WithCSSTransition({children, timeout, nodeRef, ...rest}) {
  return (
    <CSSTransition
      {...rest}
      classNames={{
        enter: `${classes.enter}`,
        enterActive: `${classes.enterActive}`,
        exit: `${classes.exit}`,
        exitActive: `${classes.exitActive}`,
        exitDone: `${classes.exitDone}`,
      }}
      timeout={timeout}
      nodeRef={nodeRef}
    >
      {children}
    </CSSTransition>
  );
}

export default WithCSSTransition;
