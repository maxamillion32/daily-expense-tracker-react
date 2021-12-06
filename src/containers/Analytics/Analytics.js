import React from 'react';
import MonthBalance from '../../components/Widgets/MonthBalance/MonthBalance';
import MonthOutcomes from '../../components/Widgets/MonthOutcomes/MonthOutcomes';
import YearOutcomes from '../../components/Widgets/YearOutcomes/YearOutcomes';
import classes from './Analytics.module.css';
import {useSelector} from 'react-redux';
import {currentMonth} from '../../reducers/transactions/transactions-slice';

function Analytics() {
  const month = useSelector(currentMonth);
  return (
    <section className={classes.Analytics}>
      <MonthBalance currentMonth={month} />
      <YearOutcomes currentMonth={month} />
      <MonthOutcomes currentMonth={month} />
    </section>
  )
}

export default Analytics;
