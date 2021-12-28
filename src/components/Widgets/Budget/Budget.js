import React, {useEffect, useRef} from 'react';
import {useSelector, useDispatch} from 'react-redux';

import {loadTransactions} from '../../../reducers/transactions/transactions-slice';
import {selectAllCategoriesState} from '../../../reducers/categories/categories-slice';
import {postBudget, loadBudgets, updateBudget} from '../../../reducers/budget/budget-slice';

import classes from './Budget.module.css';
import WidgetsBudgetItem from './Items/Item';

function WidgetsBudget({currentMonth, budget, userId, updatedBudget}) {
  const dispatch = useDispatch();
  const categories = useSelector(selectAllCategoriesState);

  const usePrevious = (value) => {
    const ref = useRef();
    useEffect(() => {
      ref.current = value;
    });
    return ref.current;
  }

  const prevBudget = JSON.stringify(usePrevious(budget)) === JSON.stringify(updatedBudget);

  if (!updatedBudget) {
    return (<p></p>)
  }

  const onInputChange = ({target}) => {
    const type = target.id;
    const name = target.name;
    const value = target.value;
    const month = currentMonth;

    dispatch(updateBudget({type, name, value, month, userId}));
  }

  const onEditClick = () => {
    dispatch(postBudget({updatedBudget, userId}));
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
