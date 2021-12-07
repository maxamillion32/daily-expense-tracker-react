import React from 'react';
import {Route, Routes, Navigate} from 'react-router-dom';
import Layout from '../src/hoc/Layout/Layout'
import './App.css'

import Transactions from './containers/Transactions/Transactions';
import Statistics from './containers/Statistics/Statistics';
import Settings from './containers/Settings/Settings';

function App() {
    return (
      <Layout>
        <Routes>
          <Route path="/" element={<Transactions />} />
          <Route path="/budget" element={<Statistics />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Layout>
    );
}

export default App;
