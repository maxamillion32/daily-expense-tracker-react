import React from 'react';
import classes from './PopupContext.module.css';
import {usePopup} from './PopupContext';
import CloseButton from '../../components/UI/CloseButton/CloseButton';

function Popup() {
  const popup = usePopup();
  const {toggle} = usePopup()

  if (!popup.visible) return null;

  return (
      <div className={classes.Container}>
        <section className={classes.Main}>
          <CloseButton onClick={toggle}/>
        </section>
      </div>
  )
}

export default Popup;
