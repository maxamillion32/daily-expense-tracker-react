import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {selectAllCategoriesState} from '../../../reducers/categories/categories-slice';
import classes from './Budget.module.css';
import WidgetsBudgetItem from './Items/Item';
import {selectBudgetState, updateBudget} from '../../../reducers/budget/budget-slice';

function WidgetsBudget({currentMonth}) {
  const dispatch = useDispatch();
  const categories = useSelector(selectAllCategoriesState);
  const budget = useSelector(selectBudgetState);

  const onChange = ({target}) => {
    const type = target.id;
    const name = target.name;
    const value = target.value;
    const month = currentMonth;

    dispatch(updateBudget({type, name, value, month}));
  }

  return (
    <section className={classes.BudgetWrapper}>
      <p className={classes.Header}>Budget</p>

      <div className={classes.Content}>
        <WidgetsBudgetItem
          title={"Expenses"}
          id={"expenses"}
          value={budget[currentMonth]["expenses"]["Expenses"] ? budget[currentMonth]["expenses"]["Expenses"] : ''}
          onChange={onChange}
        />

        {categories.map((category) => (
          <WidgetsBudgetItem
            key={category.id}
            title={category.title}
            id={"expenses"}
            value={budget[currentMonth]["expenses"][category.title] ? budget[currentMonth]["expenses"][category.title] : ''}
            onChange={onChange}
          />
          ))
        }
      </div>

      <div className={classes.Content}>
        <WidgetsBudgetItem
          title={"Incomes"}
          id={"incomes"}
          value={budget[currentMonth]["incomes"]["Incomes"] ? budget[currentMonth]["incomes"]["Incomes"] : ''}
          onChange={onChange}
        />

        {categories.map((category) => (
            <WidgetsBudgetItem
              key={category.id}
              title={category.title}
              id={"incomes"}
              value={budget[currentMonth]["incomes"][category.title] ? budget[currentMonth]["incomes"][category.title] : ''}
              onChange={onChange}
            />
          ))
        }
      </div>
    </section>
  )
}

export default WidgetsBudget;
