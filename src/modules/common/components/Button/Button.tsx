import React from "react";
import classes from "./Button.module.css";

interface ButtonProps {
  type: string,
  onClick: () => void,
  disabled: boolean,
  children: React.ReactNode
}

function Button ({type, onClick, disabled, children}: ButtonProps) {
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
