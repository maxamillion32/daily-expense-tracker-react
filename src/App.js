import React from "react";
import {Route, Routes, Navigate} from "react-router-dom";
import Layout from "./modules/common/hoc/Layout/Layout";
import "./App.css";
import ScrollToTop from "./modules/common/hoc/ScrollToTop/ScrollToTop";

import TransactionsContainer from "./modules/transactions/components/Container";
import StatisticsContainer from "./modules/statistics/components/Container";
import SettingsContainer from "./modules/settings/components/Container";
import PopupProvider from "./modules/common/hoc/Popup/PopupContext";

function App() {
  return (
    <Layout>
      <ScrollToTop />
      <PopupProvider>
        <Routes>
          <Route path="expence-tracker-react-redux/build/" element={<TransactionsContainer />} />
          <Route path="expence-tracker-react-redux/build/statistics" element={<StatisticsContainer />} />
          <Route path="expence-tracker-react-redux/build/settings" element={<SettingsContainer />} />
          <Route path="*" element={<Navigate to="expence-tracker-react-redux/build/" />} />
        </Routes>
      </PopupProvider>
    </Layout>
  );
}

export default App;
