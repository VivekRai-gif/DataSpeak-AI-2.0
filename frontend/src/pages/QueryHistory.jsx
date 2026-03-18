import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import { History, Trash2, Play } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const QueryHistory = () => {
  const [history, setHistory] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('queryHistory') || '[]');
    setHistory(stored);
  }, []);

  const clearHistory = () => {
    localStorage.removeItem('queryHistory');
    setHistory([]);
  };

  const rerunQuery = (query) => {
    navigate('/dashboard', { state: { autoQuery: query } });
  };

  return (
    <div className="dashboard-layout">
      <Sidebar />
      <div className="main-content">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <div>
            <h2 style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>Query History</h2>
            <p style={{ color: 'var(--text-muted)' }}>Re-run any past natural language query instantly.</p>
          </div>
          {history.length > 0 && (
            <button
              className="btn-secondary"
              onClick={clearHistory}
              style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
            >
              <Trash2 size={16} /> Clear All
            </button>
          )}
        </div>

        {history.length === 0 ? (
          <div className="chart-card" style={{ textAlign: 'center', padding: '4rem' }}>
            <History size={48} color="var(--text-muted)" style={{ margin: '0 auto 1rem' }} />
            <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>No queries yet. Go to the Dashboard and ask a question!</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {history.map((item, i) => (
              <div key={i} className="insight-point" style={{ justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <p style={{ fontWeight: 600, marginBottom: '0.25rem' }}>{item.query}</p>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>{item.timestamp}</span>
                </div>
                <button
                  className="btn-secondary"
                  onClick={() => rerunQuery(item.query)}
                  style={{ flexShrink: 0, display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem' }}
                >
                  <Play size={14} /> Re-run
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default QueryHistory;
