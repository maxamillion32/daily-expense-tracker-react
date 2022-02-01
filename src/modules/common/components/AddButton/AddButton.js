import React from "react";

function AddButton({cssClass, onClick, nodeRef, isEmpty}) {
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
