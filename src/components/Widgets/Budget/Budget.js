import React, {useEffect, useRef} from 'react';
import {useSelector, useDispatch} from 'react-redux';

import {loadTransactions} from '../../../reducers/transactions/transactions-slice';
import {selectAllCategoriesState} from '../../../reducers/categories/categories-slice';
import {postBudget, loadBudgets, updateBudget} from '../../../reducers/budget/budget-slice';

import classes from './Budget.module.css';
import WidgetsBudgetItem from './Items/Item';

function WidgetsBudget({currentYear, currentMonth, budget, userId, updatedBudget}) {
  const dispatch = useDispatch();
  const categories = useSelector(selectAllCategoriesState);


    useEffect(() => {
    }, [currentMonth, updatedBudget]);

  const usePrevious = (value) => {
    const ref = useRef();
    useEffect(() => {
      ref.current = value;
    });
    return ref.current;
  }

  const prevBudget = JSON.stringify(usePrevious(budget)) === JSON.stringify(updatedBudget);

  // if (!updatedBudget) {
  //   return (<p></p>)
  // }

  const onInputChange = ({target}) => {
    const type = target.id;
    const name = target.name;
    const value = target.value;
    const month = currentMonth;
    const year = currentYear;

    dispatch(updateBudget({type, name, value, year, month, userId, updatedBudget}));
  }

  const onEditClick = () => {
    dispatch(postBudget({updatedBudget, userId}));
    dispatch(loadBudgets(userId));
    dispatch(loadTransactions());// ??? update edit button
  }

  const isBudget = updatedBudget && (updatedBudget[currentYear] || '') && (updatedBudget[currentYear][currentMonth] || '');

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
          value={isBudget && (updatedBudget[currentYear][currentMonth]["expenses"]["Expenses"] || '')}
          onChange={onInputChange}
        />

        {categories
          .filter((category) => !category.incomes)
          .sort((a, b) => isBudget && updatedBudget[currentYear][currentMonth]["expenses"][b.title] - updatedBudget[currentYear][currentMonth]["expenses"][a.title])
          .map((category) => (
            <WidgetsBudgetItem
              key={category.id}
              title={category.title}
              id={"expenses"}
              value={isBudget && (updatedBudget[currentYear][currentMonth]["expenses"][category.title] || '')}
              onChange={onInputChange}
            />
          ))
        }
      </div>

      <div className={classes.Content}>
        <WidgetsBudgetItem
          title={"Incomes"}
          id={"incomes"}
          value={isBudget && (updatedBudget[currentYear][currentMonth]["incomes"]["Incomes"]  || '')}
          onChange={onInputChange}
        />

        {categories
          .filter((category) => category.incomes)
          .sort((a, b) => isBudget && updatedBudget[currentYear][currentMonth]["incomes"][b.title] - updatedBudget[currentYear][currentMonth]["incomes"][a.title])
          .map((category) => (
            <WidgetsBudgetItem
              key={category.id}
              title={category.title}
              id={"incomes"}
              value={isBudget && (updatedBudget[currentYear][currentMonth]["incomes"][category.title]  || '')}
              onChange={onInputChange}
            />
          ))
        }
      </div>
    </section>
  )
}

export default WidgetsBudget;
