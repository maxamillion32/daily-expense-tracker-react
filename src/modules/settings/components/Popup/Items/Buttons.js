import React from "react";
import Button from "../../../../common/components/Button/Button";

export const Buttons = (
  {
    onClickCreateButton, onClickEditButton, onClickDeleteButton,
    prevItemState, isStateChange, isBalanceChange, title
  }) => (
  <>
    {prevItemState.id
      ? <>
          <Button
            title={"Update"}
            onClick={onClickEditButton}
            disabled={!isBalanceChange && !isStateChange  || !title}
          />

          <Button
            title={"Delete"}
            onClick={onClickDeleteButton}
            disabled={isStateChange}
          />
        </>

      : <Button
          title={"Create"}
          onClick={onClickCreateButton}
          disabled={!title}
        />
      }
  </>
);
