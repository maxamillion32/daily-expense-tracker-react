import React from 'react';
import {Route, Routes} from 'react-router-dom';
import Layout from '../src/hoc/Layout/Layout'

import Transactions from './containers/Transactions/Transactions';
import Budget from './containers/Budget/Budget';
import Settings from './containers/Settings/Settings';

function App() {
    return (
      <Layout>
        <Routes>
          <Route path="/" element={<Transactions />} />
          <Route path="/budget" element={<Budget />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="*" element={<Transactions />} />
        </Routes>
      </Layout>
    );
}

export default App;
