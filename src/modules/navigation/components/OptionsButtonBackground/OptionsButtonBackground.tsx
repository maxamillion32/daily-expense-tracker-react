import React, {FC} from "react";
import {useDispatch, useSelector} from "react-redux";
import {
  selectIsAddButtonClick,
  setIsAddButtonClick,
  setIsButtonShow
} from "../../../../reducers/navigation/navigation-slice";
import {useLockBodyScroll} from "../../../common/hooks/useLockBodyScroll/useLockBodyScroll";
import WithCSSTransition from "../../../common/hoc/WithCSSTransition/WithCSSTransition";
import classes from "../Menu.module.css";

const OptionsButtonBackground: FC = ({children}) => {
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

export default OptionsButtonBackground;
