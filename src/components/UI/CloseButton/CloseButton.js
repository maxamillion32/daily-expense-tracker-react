import React from 'react';
import classes from './CloseButton.module.css';

const CloseButton = ({onClick}) => {
  return (
    <span className={classes.CloseBtn} onClick={onClick}/>
  )
}

export default CloseButton;
