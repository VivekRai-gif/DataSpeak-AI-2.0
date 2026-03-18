import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import DataSources from './pages/DataSources';
import Analytics from './pages/Analytics';
import QueryHistory from './pages/QueryHistory';
import './index.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/data-sources" element={<DataSources />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/query-history" element={<QueryHistory />} />
      </Routes>
    </Router>
  );
}

export default App;
