import React from "react";
import Input from "../../../../common/components/Input/Input";

export const DateOfBalance = ({isBalanceChange, onChange, accountState, date}) => (
  <>
    {isBalanceChange && accountState.showInBalance
      ? <Input
          type="date"
          name="date"
          value={date}
          onChange={onChange}
        />
      : null}
  </>
);
