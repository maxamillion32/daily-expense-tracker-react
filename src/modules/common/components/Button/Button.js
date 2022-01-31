import React from "react";
import classes from "./Button.module.css";

function Button ({type, onClick, disabled, children}) {
  const cls = [
    classes.Button,
    classes[type]
  ].join(" ");
  return (
    <button
      onClick={onClick}
      className={cls}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export default Button;
