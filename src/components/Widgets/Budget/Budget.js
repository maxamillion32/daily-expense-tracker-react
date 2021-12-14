import React from 'react';
import {useSelector} from 'react-redux';
import {selectAllCategoriesState} from '../../../reducers/categories/categories-slice';
import classes from './Budget.module.css';

function WidgetsBudget() {
  const categories = useSelector(selectAllCategoriesState);

  return (
    <section className={classes.BudgetWrapper}>
      <ul> Expenses
        {categories.map((category) => (
            <li key={category.id}>{category.title}</li>
          ))
        }
      </ul>
    </section>
  )
}

export default WidgetsBudget;
