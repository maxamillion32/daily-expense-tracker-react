import React from "react";
import {Route, Routes, Navigate} from "react-router-dom";
import Layout from "./modules/common/hoc/Layout/Layout";
import "./App.css";
import ScrollToTop from "./modules/common/hoc/ScrollToTop/ScrollToTop";

import Transactions from "./modules/transactions/components/Transactions";
import Statistics from "./modules/statistics/components/Statistics";
import Settings from "./modules/settings/components/Settings";
import PopupProvider from "./modules/common/hoc/Popup/PopupContext";

function App() {
  return (
    <Layout>
      <ScrollToTop />
      <PopupProvider>
        <Routes>
          <Route path="/" element={<Transactions />} />
          <Route path="/statistics" element={<Statistics />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </PopupProvider>
    </Layout>
  );
}

export default App;
