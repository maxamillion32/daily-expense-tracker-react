import React, {memo, useMemo} from "react";
import Input from "../../../../common/components/Input/Input";
import {isExists} from "../utils/utils";

function CategoryType({transactions, prevItemState, incomes, onChange, classes}) {
  return (
    <div className={classes.Type}>
      {useMemo(() => isExists(transactions, "category", prevItemState.title), [prevItemState.title])
        ? <p className={classes.Label}>This category is already used in transactions and this setting cannot be
          changed.</p>
        : <p className={classes.Label}>Select <b>incomes</b> if the category is taken into income transactions</p>}
      <Input
        type="checkbox"
        name="type-of-category"
        label={"Incomes"}
        placeholder="0.00"
        checked={+incomes || false}
        onChange={onChange}
        isDisabled={useMemo(() => isExists(transactions, "category", prevItemState.title), [prevItemState.title])}
        errorMessage={""}
        shouldValidate={false}
        touched={false}
        valid={true}
        value={""}
      />
    </div>
  );
}

export default memo(CategoryType);
