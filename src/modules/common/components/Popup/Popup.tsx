import React, {useEffect} from "react";
import classes from "./Popup.module.css";

import CloseButton from "../CloseButton/CloseButton";
import WithCSSTransition from "../../hoc/WithCSSTransition/WithCSSTransition";

interface PopupProps {
  children: React.ReactNode
  showPopup: boolean,
  setShowPopup: () => void,
}

function Popup({children, showPopup, setShowPopup}: PopupProps) {
  const nodeRefPopup = React.useRef(null);

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
