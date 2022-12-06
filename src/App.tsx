import React, {useEffect, lazy, Suspense} from "react";
import {Route, Routes, Navigate} from "react-router-dom";
import Layout from "./modules/common/hoc/Layout/Layout";
import "./App.css";
import ScrollToTop from "./modules/common/hooks/ScrollToTop/ScrollToTop";

import {loadTransactions, selectIsLoading} from "./reducers/transactions/transactions-slice";
import {loadCategories} from "./reducers/categories/categories-slice";
import {loadAccounts} from "./reducers/accounts/accounts-slice";
import {loadBudgets} from "./reducers/budget/budget-slice";
import {selectUserId} from "./reducers/user/user-slice";
import {useAppDispatch, useAppSelector} from "./modules/common/hooks/ReduxTypedHooks/ReduxTypedHooks";
import {useSelector} from "react-redux";
import Loader from "./modules/common/components/Loader/Loader";

function App() {
  const TransactionsContainer = lazy(() => import("./modules/transactions/components/Container"));
  const StatisticsContainer = lazy(() => import("./modules/statistics/components/Container"));
  const SettingsContainer = lazy(() => import("./modules/settings/components/Container"));

  const dispatch = useAppDispatch();
  const userId = useAppSelector(selectUserId);

  const isLoading = useSelector(selectIsLoading);

  useEffect(() => {
    if (userId) {
      dispatch(loadTransactions(userId));
      dispatch(loadCategories(userId));
      dispatch(loadAccounts(userId));
      dispatch(loadBudgets(userId));
    }
  }, [userId]);

  return (
    <Layout>
      {isLoading ? <Loader /> : null}
      <ScrollToTop />
        <Suspense fallback={""}>
          <Routes>
            <Route path="/" element={<TransactionsContainer />} />
            <Route path="/statistics" element={<StatisticsContainer />} />
            <Route path="/settings" element={<SettingsContainer />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Suspense>
    </Layout>
  );
}

export default App;
