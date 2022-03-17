import React from "react";
import {Route, Routes, Navigate} from "react-router-dom";
import {AppContextProvider} from "./Context";
import Layout from "./modules/common/hoc/Layout/Layout";
import "./App.css";
import ScrollToTop from "./modules/common/hoc/ScrollToTop/ScrollToTop";

import TransactionsContainer from "./modules/transactions/components/Container";
import StatisticsContainer from "./modules/statistics/components/Container";
import SettingsContainer from "./modules/settings/components/Container";

function App() {
  return (
    <AppContextProvider>
      <Layout>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<TransactionsContainer />} />
          <Route path="/statistics" element={<StatisticsContainer />} />
          <Route path="/settings" element={<SettingsContainer />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Layout>
    </AppContextProvider>
  );
}

export default App;
