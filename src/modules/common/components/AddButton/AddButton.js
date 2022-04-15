import React from "react";
import classes from "./AddButton.module.css";

// interface AddButtonProps {
//   cssClass: string,
//   onClick: () => void,
//   isDisabled: boolean,
//   nodeRef: ""
// }

function AddButton({cssClass, onClick, isDisabled, nodeRef}) {
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
      ref={nodeRef}
    />
  );
}

export default AddButton;
