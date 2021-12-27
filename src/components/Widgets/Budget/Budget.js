import React, { useState } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {selectAllCategoriesState} from '../../../reducers/categories/categories-slice';
import classes from './Budget.module.css';
import WidgetsBudgetItem from './Items/Item';
import {
  // selectBudgetState, updateBudget,
  postBudget, loadBudgets,
  updateBudget
  // selectAllBudgetState
} from '../../../reducers/budget/budget-slice';
import {loadTransactions} from '../../../reducers/transactions/transactions-slice';

function WidgetsBudget({currentMonth, budget, userId, updatedBudget, prevBudget}) {
  // console.log(`🚀 ~ file: Budget.js ~ line 14 ~ WidgetsBudget ~ userId`, userId);

  const dispatch = useDispatch();
  const categories = useSelector(selectAllCategoriesState);

  const [inputValue, setInputValue] = useState('');


  if (!updatedBudget) {
    return (<p></p>)
  }

  const onInputChange = ({target}) => {
    const type = target.id;
    const name = target.name;
    const nameUpperCase = type[0].toUpperCase() + type.slice(1);
    const value = target.value;
    const month = currentMonth;

    setInputValue({type, name, nameUpperCase, value, month, userId});
    dispatch(updateBudget({type, name, nameUpperCase, value, month, userId, budget}));
  }

  const onEditClick = () => {
    dispatch(postBudget(inputValue));
    dispatch(loadBudgets(userId));
    dispatch(loadTransactions());// ??? update edit button
  }

  return (
    <section className={classes.BudgetWrapper}>
      <div className={classes.HeaderWrapper}>
        <p className={classes.Header}>Budget</p>
        <button
            className={classes.Button}
            type="submit"
            onClick={onEditClick}
            disabled={prevBudget}
          >
            Edit
          </button>
      </div>

      <div className={classes.Content}>
        <WidgetsBudgetItem
          title={"Expenses"}
          id={"expenses"}
          value={updatedBudget[currentMonth]["expenses"]["Expenses"] || ''}
          onChange={onInputChange}
          onEditClick={onEditClick}
          // prevAmount={usePrevious(value)}
        />

        {categories
          .filter((category) => !category.incomes)
          .sort((a, b) => updatedBudget[currentMonth]["expenses"][b.title] - updatedBudget[currentMonth]["expenses"][a.title])
          .map((category) => (
            <WidgetsBudgetItem
              key={category.id}
              title={category.title}
              id={"expenses"}
              value={updatedBudget[currentMonth]["expenses"][category.title] || ''}
              onChange={onInputChange}
              onEditClick={onEditClick}
            />
          ))
        }
      </div>

      <div className={classes.Content}>
        <WidgetsBudgetItem
          title={"Incomes"}
          id={"incomes"}
          value={updatedBudget[currentMonth]["incomes"]["Incomes"]  || ''}
          onChange={onInputChange}
          onClick={onEditClick}
        />

        {categories
          .filter((category) => category.incomes)
          .sort((a, b) => updatedBudget[currentMonth]["incomes"][b.title] - updatedBudget[currentMonth]["incomes"][a.title])
          .map((category) => (
            <WidgetsBudgetItem
              key={category.id}
              title={category.title}
              id={"incomes"}
              value={updatedBudget[currentMonth]["incomes"][category.title]  || ''}
              onChange={onInputChange}
              onClick={onEditClick}
            />
          ))
        }
      </div>
    </section>
  )
}

export default WidgetsBudget;
