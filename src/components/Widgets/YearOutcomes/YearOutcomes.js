import React from 'react';
import {useDispatch} from 'react-redux';
import classes from './YearOutcomes.module.css';
import {updateMonth} from '../../../reducers/transactions/transactions-slice'

function YearOutcomes({currentMonth}) {
  const dispatch = useDispatch();

  const monthOutcomes = [
    'January', 'February', 'March',
    'April', 'May', 'June',
    'July', 'August', 'September',
    'October', 'November', 'December'
  ]

  const monthHandler = ({target}) => {
    dispatch(updateMonth(target.id));
  };

  return (
    <>
      <section className={classes.YearOutcomes}>
        <div className={classes.Wrapper}>
          {monthOutcomes.map((month) => (
            <div
              className={`${classes.List} ${month === currentMonth ? classes.Active : ''}`}
              key={month}
              onClick={monthHandler}
            >
              <div id={month}></div>
              <p id={month}>{month.slice(0, 3)}</p>
            </div>
            ))
          }
        </div>
      </section>
    </>
  )
}

export default YearOutcomes;
