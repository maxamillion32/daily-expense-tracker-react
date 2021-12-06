import React from 'react';
import classes from './Dummy.module.css';
// import {useDispatch, useSelector} from 'react-redux';

// import {
//   loadTransactions,
//   selectAllTransactionsState
// } from '../../reducers/transactions/transactions-slice'
// import Balance from '../../components/Balance/Balance';

function Dummy() {
//   const allTransactions = useSelector(selectAllTransactionsState);
//   const dispatch = useDispatch();

//   const sumOutcomes = allTransactions.map((transaction) => {
//       return transaction.outcome ? transaction = +transaction.sum : transaction = null;
//     }).reduce((a, b) => a + b, 0);

//   const sumIncomes = allTransactions.map((item) => {
//     return !item.outcome ? item = +item.sum : item = null;
//   }).reduce((a, b) => a + b, 0);

//   useEffect(() => {
//     dispatch(loadTransactions());
//     // eslint-disable-next-line
//   }, []);
  return (
    // <section style={{paddingTop: 130, paddingLeft: 20, paddingRight: 20}}>
    //   <Balance transactions={allTransactions} />
    //   <ul style={{marginTop: 20}}>2021
    //     <li style={{marginLeft: 20}}>income: {sumIncomes}</li>
    //     <li style={{marginLeft: 20}}>outcome: {sumOutcomes}</li>
    //   </ul>
    // </section>

    <section className={classes.DummyWrapper}>
      <div className={classes.Dummy} style={{height: 150}}>
        Coming soon...
      </div>
      <div className={classes.Dummy} style={{height: 50, marginTop: 20}}>
        Coming soon...
      </div>
      <div className={classes.Dummy} style={{height: 'calc(100vh - 350px)', marginTop: 20}}>
        Coming soon...
      </div>
    </section>
  )
}

export default Dummy;
