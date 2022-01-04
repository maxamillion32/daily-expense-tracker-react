import React from 'react';
import classes from './Popup.module.css';
import {usePopup} from './PopupContext';
import CloseButton from '../../components/UI/CloseButton/CloseButton';
import {CSSTransition} from 'react-transition-group';

function Popup({children}) {
  const popup = usePopup();
  const {toggle} = usePopup();

  const nodeRef = React.useRef(null);

  // // if (!popup.visible) return null;

  return (
    <CSSTransition
      in={popup.visible}
      timeout={300}
      classNames={{
        enterActive: `${classes.EnterActive}`,
        exitActive: `${classes.ExitActive}`,
      }}
      unmountOnExit
      nodeRef={nodeRef}
    >
      <section className={classes.Container} ref={nodeRef}>
        <div className={classes.CloseBtn}>
          <CloseButton onClick={toggle}/>
        </div>
        {children}
      </section>
    </CSSTransition>
  )
}

export default Popup;
