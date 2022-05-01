import React, {useEffect, lazy, Suspense} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Route, Routes, Navigate} from "react-router-dom";
import Layout from "./modules/common/hoc/Layout/Layout";
import "./App.css";
import ScrollToTop from "./modules/common/hooks/ScrollToTop/ScrollToTop";

import {loadTransactions} from "./reducers/transactions/transactions-slice";
import {loadCategories} from "./reducers/categories/categories-slice";
import {loadAccounts} from "./reducers/accounts/accounts-slice";
import {loadBudgets} from "./reducers/budget/budget-slice";
import {selectUserId} from "./reducers/user/user-slice";


function App() {
  const TransactionsContainer = lazy(() => import("./modules/transactions/components/Container"));
  const StatisticsContainer = lazy(() => import("./modules/statistics/components/Container"));
  const SettingsContainer = lazy(() => import("./modules/settings/components/Container"));

  const dispatch = useDispatch();
  const userId = useSelector(selectUserId);

  useEffect(() => {
    dispatch(loadTransactions(userId));
    dispatch(loadCategories(userId));
    dispatch(loadAccounts(userId));
    dispatch(loadBudgets(userId));
  }, [userId]);

  return (
    <Layout>
      <ScrollToTop />
        <Suspense>
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
