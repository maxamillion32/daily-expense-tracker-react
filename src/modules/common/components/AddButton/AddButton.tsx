import React from "react";

interface AddButtonProps {
  cssClass: string,
  onClick: () => void,
  nodeRef: string,
  isEmpty: boolean
}

function AddButton({cssClass, onClick, nodeRef, isEmpty}: AddButtonProps) {
  return (
    <button
      className={cssClass}
      onClick={onClick}
      ref={nodeRef}
      disabled={isEmpty}
    />
  );
}

export default AddButton;
