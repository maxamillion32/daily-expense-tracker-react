import React, {memo} from "react";
import classes from "./Button.module.css";

interface ButtonProps {
  title: string,
  onClick: () => void,
  disabled: boolean,
}

function Button ({title, onClick, disabled}: ButtonProps) {
  const cls = [
    classes.Button,
  ].join(" ");
  return (
    <button
      onClick={onClick}
      className={cls}
      disabled={disabled}
    >
      {title}
    </button>
  );
}

export default memo(Button);
