import React, {memo} from "react";
import Input from "../../../../common/components/Input/Input";

function StartBalance({accountState, prevItemState, onChange, classes}) {
  return (
    <div className={classes.Type}>
      <p className={classes.Label}>Start balance</p>

      <Input
        type="number"
        name="start-balance"
        value={accountState.startBalance === 0 ? "" : accountState.startBalance}
        onChange={onChange}
        placeholder="0.00"
        isDisabled={prevItemState.startBalance || prevItemState.title}
      />
    </div>
  );
}

export default memo(StartBalance);
