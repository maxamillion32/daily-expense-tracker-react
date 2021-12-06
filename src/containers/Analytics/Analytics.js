import React from 'react';
import MonthBalance from '../../components/Widgets/MonthBalance/MonthBalance';
import MonthOutcomes from '../../components/Widgets/MonthOutcomes/MonthOutcomes';
import YearOutcomes from '../../components/Widgets/YearOutcomes/YearOutcomes';
import classes from './Analytics.module.css';

function Analytics() {
  return (
    <section className={classes.Analytics}>
      <MonthBalance />
      <YearOutcomes />
      <MonthOutcomes />
    </section>
  )
}

export default Analytics;
