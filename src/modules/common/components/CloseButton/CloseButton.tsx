import React from "react";
import classes from "./CloseButton.module.css";

interface CloseButtonProps {
  onClick: () => void
}

function CloseButton ({onClick}: CloseButtonProps) {
  return (
    <span className={classes.CloseBtn} onClick={onClick}/>
  );
}

export default CloseButton;
