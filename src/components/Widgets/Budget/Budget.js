import React from 'react';
import {useSelector} from 'react-redux';
import {selectAllCategoriesState} from '../../../reducers/categories/categories-slice';
import classes from './Budget.module.css';

function WidgetsBudget() {
  const categories = useSelector(selectAllCategoriesState);

  return (
    <section className={classes.BudgetWrapper}>
      <p style={{marginBottom: 15, fontWeight: 700}}>Budget</p>
      <div className={classes.Block}>
        <p className={classes.Title}>Expenses</p>
        <input type="number" className={classes.Value} value="2400" />
      </div>

      {categories.map((category) => (
        <div className={classes.Block} key={category.id}>
          <p className={classes.Title}>{category.title}</p>
          <input type="number" className={classes.Value} value="300" />
        </div>
        ))
      }

      <div className={classes.Block}>
        <p className={classes.Title}>Incomes</p>
        <input type="number" className={classes.Value} value="4000" />
      </div>

      {categories.map((category) => (
        <div className={classes.Block} key={category.id}>
          <p className={classes.Title}>{category.title}</p>
          <input type="number" className={classes.Value} value="500" />
        </div>
        ))
      }
    </section>
  )
}

export default WidgetsBudget;
