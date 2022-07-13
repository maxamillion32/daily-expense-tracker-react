import React, {memo} from "react";
import Input from "../../../../common/components/Input/Input";

function CurrentBalance({isBalanceChange, prevItemState, accountState, onChange, balance, classes}) {
  return (
    <>
      {prevItemState.startBalance || prevItemState.title
        ? <div className={classes.Type}>
          <p className={classes.Label}>Current balance</p>

          {isBalanceChange
            ? <p className={classes.Text}><b>{prevItemState.id ? balance : 0}€</b></p>
            : null}

          <Input
            type="number"
            name="current-balance"
            value={accountState.balance === 0 ? "" : accountState.balance}
            onChange={onChange}
            placeholder="0.00"
          />
        </div>
        : null}
    </>
  );
}

export default memo(CurrentBalance);
