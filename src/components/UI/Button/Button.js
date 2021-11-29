import React from 'react';
import classes from './Button.module.css';

const Button = (props) => {
  const cls = [
    classes.Button,
    classes[props.type]
  ].join(' ')
  return (
    <button
      onClick={props.onClick}
      className={cls}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  )
}

export default Button;
