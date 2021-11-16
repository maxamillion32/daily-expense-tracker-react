import React from 'react';
import {Route, Routes, Navigate} from 'react-router-dom';
import Layout from '../src/hoc/Layout/Layout'

import Transactions from './containers/Transactions/Transactions';
import Analytics from './containers/Analytics/Analytics';
import Settings from './containers/Settings/Settings';

function App() {
    return (
      <Layout>
        <Routes>
          <Route path="/" element={<Transactions />} />
          <Route path="/budget" element={<Analytics />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Layout>
    );
}

export default App;
