import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Route, Routes, Navigate} from "react-router-dom";
import Layout from "./modules/common/hoc/Layout/Layout";
import "./App.css";
import ScrollToTop from "./modules/common/hoc/ScrollToTop/ScrollToTop";

import TransactionsContainer from "./modules/transactions/components/Container";
import StatisticsContainer from "./modules/statistics/components/Container";
import SettingsContainer from "./modules/settings/components/Container";

import {loadTransactions} from "./reducers/transactions/transactions-slice";
import {loadCategories} from "./reducers/categories/categories-slice";
import {loadAccounts} from "./reducers/accounts/accounts-slice";
import {selectUserId} from "./reducers/user/user-slice";

function App() {
  const dispatch = useDispatch();
  const userId = useSelector(selectUserId);

  useEffect(() => {
    dispatch(loadTransactions(userId));
    dispatch(loadCategories(userId));
    dispatch(loadAccounts(userId));
  }, [userId]);

  return (
    <Layout>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<TransactionsContainer />} />
        <Route path="/statistics" element={<StatisticsContainer />} />
        <Route path="/settings" element={<SettingsContainer />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Layout>
  );
}

export default App;
