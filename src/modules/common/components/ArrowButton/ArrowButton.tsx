import React from "react";
import classes from "./ArrowButton.module.css";

interface ArrowButtonProps {
  direction: string,
  onClick: () => void,
  style: React.CSSProperties,
}

function ArrowButton({direction, onClick, style}: ArrowButtonProps) {
  return (
    <button
      id={direction}
      className={direction === "left" ? classes.LeftBtn : classes.RightBtn}
      onClick={onClick}
      style={style}
    ></button>
  );
}

export default ArrowButton;
