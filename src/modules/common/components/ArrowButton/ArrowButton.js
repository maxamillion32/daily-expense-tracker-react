import React from "react";
import classes from "./ArrowButton.module.css";

function ArrowButton({direction, onClick, style}) {
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
