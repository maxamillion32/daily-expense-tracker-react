import React from "react";
import Input from "../../../../common/components/Input/Input";
import {isExists} from "../utils-popup";

export const ChangeBalance = (
  {
    isBalanceChange, prevItemState, accountState,
    transactions, onClickBalanceCheck,
    balanceDifference, date, classes
  }) => (
  <>
    {isBalanceChange
      ? <div className={classes.Type}>
          <Input
            type="checkbox"
            checked={accountState.showInBalance}
            name="date"
            value={date}
            onChange={onClickBalanceCheck}
            disabled={isExists(transactions, "category", prevItemState.title)}
            label={
              balanceDifference > 0
                ? <>Add <b>{Math.abs(balanceDifference)}€</b> difference as an income transaction?</>
                : <>Add <b>{Math.abs(balanceDifference)}€</b> difference as an expense transaction?</>
            }
          />
        </div>
      : null}
  </>
);