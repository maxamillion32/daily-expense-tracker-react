import React from "react";
import Input from "../../../../common/components/Input/Input";
import {isExists} from "../utils-popup";

export const CategoryType = ({transactions, prevItemState, incomes, onChange, classes}) => (
  <div className={classes.Type}>
    {isExists(transactions, "category", prevItemState.title)
      ? <p className={classes.Label}>This category is already used in transactions and this setting cannot be changed.</p>
      : <p className={classes.Label}>Select <b>incomes</b> if the category is taken into income transactions</p>}
    <Input
      type="checkbox"
      name="type-of-category"
      label={"Incomes"}
      placeholder="0.00"
      checked={+incomes || false}
      onChange={onChange}
      isDisabled={isExists(transactions, "category", prevItemState.title)}
    />
  </div>
);
