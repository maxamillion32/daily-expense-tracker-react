import React, {memo} from "react";
import Input from "../../../../common/components/Input/Input";

function DateOfBalance({isBalanceChange, onChange, accountState, date}) {
  return (
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
}

export default memo(DateOfBalance);
