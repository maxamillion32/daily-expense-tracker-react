import React from "react";
import classes from "./AddButton.module.css";

interface AddButtonProps {
  cssClass: string,
  onClick: () => void,
  isDisabled: boolean
}

function AddButton({cssClass, onClick, isDisabled}: AddButtonProps) {
const classesAddBtn = [
  classes.menuAddBtn,
  "fa",
  cssClass
].join(" ");

  return (
    <button
      className={classesAddBtn}
      onClick={onClick}
      disabled={isDisabled}
    />
  );
}

export default AddButton;
