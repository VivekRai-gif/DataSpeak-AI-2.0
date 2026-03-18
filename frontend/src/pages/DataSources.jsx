import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import { Database, CheckCircle, Table, RefreshCcw } from 'lucide-react';
import axios from 'axios';

const DataSources = () => {
  const [schema, setSchema] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:8000/api/schema')
      .then(res => setSchema(res.data))
      .catch(() => setSchema(null))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="dashboard-layout">
      <Sidebar />
      <div className="main-content">
        <h2 style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>Data Sources</h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>View and manage the active dataset loaded into the AI engine.</p>

        <div className="kpi-grid" style={{ gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem' }}>
          {/* Active Table Card */}
          <div className="kpi-card">
            <div className="kpi-header">
              <span>Active Table</span>
              <div className="kpi-icon"><Database size={18} /></div>
            </div>
            <div className="kpi-value" style={{ fontSize: '1.5rem' }}>customer_data</div>
            <div className="kpi-trend trend-up"><CheckCircle size={14} /> Connected to SQLite</div>
          </div>

          {/* Schema Column Count */}
          <div className="kpi-card">
            <div className="kpi-header">
              <span>Total Columns</span>
              <div className="kpi-icon"><Table size={18} /></div>
            </div>
            <div className="kpi-value" style={{ fontSize: '1.5rem' }}>
              {loading ? <RefreshCcw size={20} className="animate-spin" /> : (schema?.columns?.length ?? '—')}
            </div>
            <div className="kpi-trend trend-up"><CheckCircle size={14} /> Schema auto-detected</div>
          </div>
        </div>

        {/* Schema Table */}
        <div className="chart-card" style={{ marginTop: '2rem' }}>
          <h3 style={{ marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Database size={18} color="var(--primary-hover)" /> Current Schema
          </h3>
          {loading ? (
            <div style={{ display: 'flex', justifyContent: 'center', padding: '2rem' }}>
              <RefreshCcw size={24} className="animate-spin" color="var(--primary)" />
            </div>
          ) : schema?.columns?.length ? (
            <div className="data-table-wrapper">
              <table className="data-table">
                <thead>
                  <tr><th>#</th><th>Column Name</th><th>Data Type</th></tr>
                </thead>
                <tbody>
                  {schema.columns.map((col, i) => (
                    <tr key={i}>
                      <td style={{ color: 'var(--text-muted)' }}>{i + 1}</td>
                      <td>{col.name}</td>
                      <td><span style={{ background: 'rgba(139,92,246,0.15)', color: '#c77dff', padding: '2px 10px', borderRadius: '999px', fontSize: '0.8rem' }}>{col.type}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '2rem' }}>No schema data available. Upload a CSV to get started.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DataSources;
