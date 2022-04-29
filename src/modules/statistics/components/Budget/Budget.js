import React from "react";
import {useSelector, useDispatch} from "react-redux";

// import {loadTransactions} from "../../../../reducers/transactions/transactions-slice";
import {selectFilteredCategories} from "../../../../reducers/categories/categories-slice";
import {postBudget, loadBudgets, updateBudget} from "../../../../reducers/budget/budget-slice";
import {isEqual} from "../../../common/utils/utils";

import classes from "./Budget.module.css";
import WidgetsBudgetItem from "./Items/Item";

const BudgetContentWrapper = ({children}) => (
  <div className={classes.Content}>
    {children}
  </div>
);

const BudgetHeader = ({onClick, isDisabled}) => (
  <div className={classes.HeaderWrapper}>
    <p className={classes.Header}>Budget</p>
    <button
        className={classes.Button}
        type="submit"
        onClick={onClick}
        disabled={isDisabled}
      >
        Update
      </button>
  </div>
);

function WidgetsBudget({currentYear, currentMonth, budget, userId, updatedBudget}) {
  const dispatch = useDispatch();
  const categories = useSelector(selectFilteredCategories);

  const prevBudget = isEqual(budget, updatedBudget);

  const onInputChange = ({target}) => {
    const id = target.id;
    const type = target.getAttribute("data-type");
    const name = target.name;
    const value = target.value;
    const month = currentMonth;
    const year = currentYear;

    dispatch(updateBudget({id, type, name, value, year, month, userId, updatedBudget, categories}));
  };

  const onEditClick = () => {
    dispatch(postBudget({updatedBudget, userId}));
    dispatch(loadBudgets(userId));
    // dispatch(loadTransactions(userId));
  };

  const isBudget = (updatedBudget || "") && (updatedBudget[currentYear] || "") && (updatedBudget[currentYear][currentMonth] || "");

  return (
    <section className={classes.BudgetWrapper}>
      <BudgetHeader
        onClick={onEditClick}
        isDisabled={prevBudget}
      />

      <BudgetContentWrapper>
        <WidgetsBudgetItem
          title={"Expenses"}
          dataType={"expenses"}
          value={isBudget && (updatedBudget[currentYear][currentMonth]["expenses"]["Expenses"] || "")}
          onChange={onInputChange}
        />

        {categories
          .filter((category) => !category.incomes)
          .map((category) => isBudget && updatedBudget[currentYear][currentMonth]["expenses"][category.id]
            ? {...category, sum: updatedBudget[currentYear][currentMonth]["expenses"][category.id]}
            : {...category, sum: 0})
          .sort((a, b) => b.sum - a.sum)
          .map((category) => (
            <WidgetsBudgetItem
              key={category.id}
              title={category.title}
              dataType={"expenses"}
              id={category.id}
              value={isBudget && (updatedBudget[currentYear][currentMonth]["expenses"][category.id] || "")}
              onChange={onInputChange}
            />
          ))
        }
      </BudgetContentWrapper>

      <BudgetContentWrapper>
        <WidgetsBudgetItem
          title={"Incomes"}
          dataType={"incomes"}
          value={isBudget && (updatedBudget[currentYear][currentMonth]["incomes"]["Incomes"]  || "")}
          onChange={onInputChange}
        />

        {categories
          .filter((category) => category.incomes)
          .map((category) => isBudget && updatedBudget[currentYear][currentMonth]["incomes"][category.id]
            ? {...category, sum: updatedBudget[currentYear][currentMonth]["incomes"][category.id]}
            : {...category, sum: 0})
          .sort((a, b) => b.sum - a.sum)
          .map((category) => (
            <WidgetsBudgetItem
              key={category.id}
              title={category.title}
              id={category.id}
              dataType={"incomes"}
              value={isBudget && (updatedBudget[currentYear][currentMonth]["incomes"][category.id]  || "")}
              onChange={onInputChange}
            />
          ))
        }
      </BudgetContentWrapper>
    </section>
  );
}

export default WidgetsBudget;
