import React, {useEffect, lazy, Suspense} from "react";
import {useSelector, useDispatch} from "react-redux";

import classes from "./Container.module.css";
import {selectAllTransactionsState, selectIsLoading} from "../../../reducers/transactions/transactions-slice";
import {setIsButtonShow} from "../../../reducers/navigation/navigation-slice";
import {selectUserId} from "../../../reducers/user/user-slice";

import Search from "./Search/Search";
import Loader from "../../common/components/Loader/Loader";
import Welcome from "../../welcome/components/Welcome";
import CreateFormPopup from "./Popup/Popup";
// import WithNavigation from "../../common/hoc/WithNavigation/WithNavigation";

// import TransactionsListContainer from "./List/Container";
// import Balance from "./Balance/Balance";
// import Chart from "./Chart/Chart";

function TransactionsContainer() {
  const TransactionsListContainer = lazy(() => import("./List/Container"));
  const Balance = lazy(() => import("./Balance/Balance"));
  const Chart = lazy(() => import("./Chart/Chart"));

  const getTransactions = useSelector(selectAllTransactionsState);
  const transactions = [...getTransactions];
  const userId = useSelector(selectUserId);
  const isLoading = useSelector(selectIsLoading);
  const dispatch = useDispatch();

  const isTransactions = transactions.length !== 0;

  useEffect(() => {
    dispatch(setIsButtonShow(true));
    return () => {
      dispatch(setIsButtonShow(false));
    };
  }, []);

  return (
    <>
      {userId
        ? !isLoading ?
            <section className={classes.Container}>
                <CreateFormPopup />

                <Suspense fallback={<Loader />}>
                  <Chart />
                  <Balance />

                  {isTransactions ? <Search /> : null}

                  {/* <WithNavigation> */}
                    <TransactionsListContainer />
                  {/* </WithNavigation> */}
                </Suspense>
              </section> : null
        : <Welcome />
      }
    </>
  );
}

export default TransactionsContainer;
