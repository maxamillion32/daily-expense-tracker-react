import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {selectAllCategoriesState} from '../../../reducers/categories/categories-slice';
import classes from './Budget.module.css';
import WidgetsBudgetItem from './Items/Item';
import {
  // selectBudgetState, updateBudget,
  postBudget, loadBudgets,
  // selectAllBudgetState
} from '../../../reducers/budget/budget-slice';

function WidgetsBudget({currentMonth, budget, userId}) {
  // console.log(`🚀 ~ file: Budget.js ~ line 9 ~ WidgetsBudget ~ budget`, budget);
  const dispatch = useDispatch();
  const categories = useSelector(selectAllCategoriesState);
  // const budget = useSelector(selectBudgetState);
  // const userId = 'userId';

  // useEffect(() => {
    //   dispatch(loadBudgets());
    //   // eslint-disable-next-line
    // }, []);


    if (!budget) {
      return (<p></p>)
    }
    // console.log(`🚀 ~ file: Budget.js ~ line 9 ~ WidgetsBudget ~ budget`, !Object.keys(budget[userId]).length);

  // const isBudget = Object.keys(budget[userId]).length !== 0;

  const onChange = ({target}) => {
    const type = target.id;
    const name = target.name;
    const nameUpperCase = type[0].toUpperCase() + type.slice(1);
    const value = target.value;
    const month = currentMonth;

    // dispatch(updateBudget({type, name, nameUpperCase, value, month, budget}));
    dispatch(postBudget({type, name, nameUpperCase, value, month, userId}));
    dispatch(loadBudgets());
  }

  return (
    <section className={classes.BudgetWrapper}>
      <p className={classes.Header}>Budget</p>

      <div className={classes.Content}>
        <WidgetsBudgetItem
          title={"Expenses"}
          id={"expenses"}
          value={budget[userId][currentMonth]["expenses"]["Expenses"] || ''}
          onChange={onChange}
        />

        {categories.map((category) => (
          <WidgetsBudgetItem
            key={category.id}
            title={category.title}
            id={"expenses"}
            value={budget[userId][currentMonth]["expenses"][category.title] || ''}
            onChange={onChange}
          />
          ))
        }
      </div>

      <div className={classes.Content}>
        <WidgetsBudgetItem
          title={"Incomes"}
          id={"incomes"}
          value={budget[userId][currentMonth]["incomes"]["Incomes"]  || ''}
          onChange={onChange}
        />

        {categories.map((category) => (
            <WidgetsBudgetItem
              key={category.id}
              title={category.title}
              id={"incomes"}
              value={budget[userId][currentMonth]["incomes"][category.title]  || ''}
              onChange={onChange}
            />
          ))
        }
      </div>
    </section>
  )
}

export default WidgetsBudget;
