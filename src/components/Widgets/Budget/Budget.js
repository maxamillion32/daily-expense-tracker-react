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

  // const balanceBudget = Object.values(budget[currentMonth]["expenses"]).reduce((a, b) => +a + +b);
  // console.log(`🚀 ~ file: Budget.js ~ line 14 ~ WidgetsBudget ~ balanceBudget`, balanceBudget);

  // const balanceTotal = budget[currentMonth]["expenses"]["Expenses"];
  // console.log(`🚀 ~ file: Budget.js ~ line 17 ~ WidgetsBudget ~ balanceTotal`, balanceTotal);

  // const overall = balanceTotal - balanceBudget;
  // console.log(`🚀 ~ file: Budget.js ~ line 20 ~ WidgetsBudget ~ overall`, overall);



  const getOverall = (type) => {
    if (Object.keys(budget[currentMonth][type]).length === 0) {
      return;
    };
    const upperCase = type[0].toUpperCase() + type.slice(1);
    const balanceTotal = budget[currentMonth][type][upperCase];
    const balanceBudget = Object.values(budget[currentMonth][type]).reduce((a, b) => +a + +b);

    const overall = Math.abs((!balanceTotal ? 0 : balanceTotal) - balanceBudget);

    return overall;
  }

  const getBalance = (type) => {
    if (Object.keys(budget[currentMonth][type]).length === 0) {
      return;
    };
    const upperCase = type[0].toUpperCase() + type.slice(1);
    const balanceTotal = budget[currentMonth][type][upperCase];

    return !balanceTotal ? 0 : balanceTotal;
  }

  // const isBalance = getOverall("expenses") > getBalance("expenses");

  // const isSum = getOverall("expenses") < 0;

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
          value={getOverall("expenses") > getBalance("expenses") ? getOverall("expenses") : budget[currentMonth]["expenses"]["Expenses"] || ''}
          onChange={onChange}
        />

        {categories.map((category) => (
          <WidgetsBudgetItem
            key={category.id}
            title={category.title}
            id={"expenses"}
            value={budget[currentMonth]["expenses"][category.title] || ''}
            onChange={onChange}
          />
          ))
        }
      </div>

      <div className={classes.Content}>
        <WidgetsBudgetItem
          title={"Incomes"}
          id={"incomes"}
          value={getOverall("incomes") > getBalance("incomes") ? getOverall("incomes") : budget[currentMonth]["incomes"]["Incomes"] || ''}
          onChange={onChange}
        />

        {categories.map((category) => (
            <WidgetsBudgetItem
              key={category.id}
              title={category.title}
              id={"incomes"}
              value={budget[currentMonth]["incomes"][category.title] || ''}
              onChange={onChange}
            />
          ))
        }
      </div>
    </section>
  )
}

export default WidgetsBudget;
