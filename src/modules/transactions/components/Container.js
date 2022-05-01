import React, {useEffect, lazy, Suspense} from "react";
import {useSelector, useDispatch} from "react-redux";

import classes from "./Container.module.css";
import {
  isLoading,
  selectAllTransactionsState,
  setIsEditing
} from "../../../reducers/transactions/transactions-slice";
import {
  setIsAddButtonClick, IsTransactionTypeClick,
  setIsButtonShow, setIsTransactionTypeClick
} from "../../../reducers/navigation/navigation-slice";
import {selectUserId} from "../../../reducers/user/user-slice";

import Search from "./Search/Search";
import Loader from "../../common/components/Loader/Loader";
import Welcome from "../../welcome/components/Welcome";
import Popup from "../../common/components/Popup/Popup";
import TransactionCreateForm from "./CreateForm/Form";
// import WithNavigation from "../../common/hoc/WithNavigation/WithNavigation";

function TransactionsContainer() {
  const TransactionsListContainer = lazy(() => import("./List/Container"));
  const Balance = lazy(() => import("./Balance/Balance"));
  const Chart = lazy(() => import("./Chart/Chart"));

  const getTransactions = useSelector(selectAllTransactionsState);
  const transactions = [...getTransactions];
  const userId = useSelector(selectUserId);
  const loading = useSelector(isLoading);
  const showPopup = useSelector(IsTransactionTypeClick);
  const dispatch = useDispatch();

  const isLoader = loading && userId;
  const isTransactions = transactions.length !== 0;

  const handlePopupClose = () => {
      dispatch(setIsTransactionTypeClick());
      dispatch(setIsAddButtonClick(false));
      dispatch(setIsButtonShow(true));
      dispatch(setIsEditing(false));
  };

  useEffect(() => {
    dispatch(setIsButtonShow(true));
    return () => {
      dispatch(setIsButtonShow(false));
    };
  }, [userId]);

  return (
    <>
      {userId
        ? <section className={classes.Container}>
            <Popup
              showPopup={showPopup}
              setShowPopup={handlePopupClose}>
              <TransactionCreateForm />
            </Popup>

            <Suspense fallback={<Loader />}>
              <Chart />
              <Balance />

              {isTransactions ? <Search /> : null}

              {/* <WithNavigation> */}
                <TransactionsListContainer isLoading={isLoader} />
              {/* </WithNavigation> */}
            </Suspense>
          </section>

        : <Welcome />
      }
    </>
  );
}

export default TransactionsContainer;
