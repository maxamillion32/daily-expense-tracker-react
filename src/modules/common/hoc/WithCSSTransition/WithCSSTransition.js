import React from "react";
import {CSSTransition} from "react-transition-group";

import "./WithCSSTransition.css";

function WithCSSTransition({children, timeout, animationType, nodeRef, inProp, ...rest}) {
  return (
    <CSSTransition
      in={inProp}
      classNames={animationType}
      timeout={timeout}
      nodeRef={nodeRef}
      mountOnEnter
      unmountOnExit
      {...rest}
    >
      {children}
    </CSSTransition>
  );
}

export default WithCSSTransition;
