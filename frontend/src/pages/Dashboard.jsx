import React, { useState } from 'react';
import axios from 'axios';
import { Send, Zap, User, RefreshCcw, Bell, TrendingUp, Users, DollarSign, CheckCircle, Search, Terminal, AlertTriangle } from 'lucide-react';
import DynamicChart from '../components/DynamicChart';
import Sidebar from '../components/Sidebar';

const SUGGESTIONS = [
  "Show total sales by region",
  "Monthly revenue trend for 2023",
  "Top 3 products by units sold",
  "Sales breakdown by category"
];

const Dashboard = () => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [dashboardData, setDashboardData] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e, forcedQuery = null) => {
    if (e) e.preventDefault();
    const q = forcedQuery || query;
    if (!q.trim()) return;

    setLoading(true);
    setDashboardData(null);
    setError(null);
    if (forcedQuery) setQuery(forcedQuery);

    try {
      const response = await axios.post('http://localhost:8000/api/query', {
        user_query: q
      });
      console.log('API Response:', response.data);
      if (response.data.error) {
         setError(response.data.error);
      } else {
         setDashboardData(response.data);
      }
    } catch (err) {
      console.error(err);
      setError("Failed to fetch data. Is the backend running?");
    } finally {
      setLoading(false);
    }
  };

  const renderTable = (data) => {
    if (!data || data.length === 0) return null;
    const headers = Object.keys(data[0]);
    
    return (
      <div className="chart-card" style={{ gridColumn: '1 / -1' }}>
        <h3>Raw Data</h3>
        <div className="data-table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                {headers.map((h, i) => <th key={i}>{h}</th>)}
              </tr>
            </thead>
            <tbody>
              {data.map((row, i) => (
                <tr key={i}>
                  {headers.map((h, j) => <td key={j}>{row[h]}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  return (
    <div className="dashboard-layout">
      {/* Sidebar Navigation */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="main-content">
        
        {/* Top Header */}
        <header className="dashboard-header">
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <button style={{ color: 'var(--text-muted)' }}><Search size={20}/></button>
            <button style={{ color: 'var(--text-muted)' }}><Bell size={20} /></button>
            <div className="user-profile">
               <div className="avatar">
                 <img src="https://ui-avatars.com/api/?name=User&background=8B5CF6&color=F3F4F6" alt="User" width="100%" />
               </div>
               <span>Hi, User</span>
            </div>
          </div>
        </header>

        {/* Input area */}
        <div className="chat-section">
          <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Ask anything about your data</h2>
          <p style={{ color: 'var(--text-muted)' }}>Type your question in plain English and get instant insights.</p>
          
          <form onSubmit={handleSubmit} className="chat-input-wrapper">
            <input 
              type="text" 
              className="chat-input" 
              placeholder="E.g., 'Show monthly revenue for Q3 by region'" 
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              disabled={loading}
            />
            <button type="submit" className="send-button" disabled={loading || !query.trim()}>
              {loading ? <RefreshCcw size={20} className="animate-spin" /> : <Send size={20} />}
            </button>
          </form>

          {!dashboardData && !loading && (
            <div className="suggestions">
              {SUGGESTIONS.map((s, idx) => (
                <button 
                  key={idx} 
                  className="suggestion-chip" 
                  onClick={(e) => handleSubmit(e, s)}
                >
                  {s}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Loading / Error States */}
        {loading && (
          <div className="loader-container">
            <div className="spinner"></div>
            <p>Analyzing and generating insights...</p>
          </div>
        )}

        {error && (
           <div className="error-message">⚠️ {error}</div>
        )}

        {/* Dashboard Results layout based on the design */}
        {dashboardData && !loading && (
          <React.Fragment>
            
            {/* KPI Row (Static placement for aesthetic demonstration as AI only returns 1 result currently) */}
            <div className="kpi-grid">
               <div className="kpi-card">
                 <div className="kpi-header">
                   <span>Total Revenue</span>
                   <div className="kpi-icon"><DollarSign size={18}/></div>
                 </div>
                 <div className="kpi-value">$2.4M</div>
                 <div className="kpi-trend trend-up"><TrendingUp size={14}/> +12% from last month</div>
               </div>
               <div className="kpi-card">
                 <div className="kpi-header">
                   <span>Active Users</span>
                   <div className="kpi-icon"><Users size={18}/></div>
                 </div>
                 <div className="kpi-value">45.2K</div>
                 <div className="kpi-trend trend-up"><TrendingUp size={14}/> +5% from last month</div>
               </div>
               <div className="kpi-card">
                 <div className="kpi-header">
                   <span>Conversion Rate</span>
                   <div className="kpi-icon"><CheckCircle size={18}/></div>
                 </div>
                 <div className="kpi-value">3.2%</div>
                 <div className="kpi-trend trend-down"><TrendingUp size={14} style={{transform:'rotate(180deg)'}}/> -0.1% from last month</div>
               </div>
            </div>

            <div className="charts-grid">
               {/* Left/Main Chart returned by AI */}
               {dashboardData.chart && dashboardData.chart !== 'none' && dashboardData.chart !== 'table' && (
                  <div className="chart-card">
                     <h3>
                       Visualization: {dashboardData.chart.toUpperCase()} 
                     </h3>
                     <div style={{ height: '300px' }}>
                       <DynamicChart type={dashboardData.chart} data={dashboardData.data} />
                     </div>
                  </div>
               )}

               {/* AI Insights & Query mapping */}
               <div className="insight-card">
                  <div className="insight-header">
                    <Zap size={20} />
                    <span>AI Insights</span>
                  </div>
                  <div className="insight-point">
                    <CheckCircle size={16} color="var(--success)" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <p>{dashboardData.insight}</p>
                  </div>
                  <div className="insight-point">
                    <AlertTriangle size={16} color="var(--warning)" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <p>Generated SQL directly from your natural language query.</p>
                  </div>

                  <h4 style={{ marginTop: '2rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)' }}>
                    <Terminal size={16} /> Executed Query
                  </h4>
                  <pre className="query-text">
                     {dashboardData.query}
                  </pre>
               </div>

               {/* Table mapping */}
               {renderTable(dashboardData.data)}
            </div>

          </React.Fragment>
        )}
        
        {/* Discreet Dashboard Footer */}
        <footer style={{
          marginTop: 'auto',
          paddingTop: '3rem',
          borderTop: '1px solid rgba(255, 255, 255, 0.05)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          color: 'var(--text-muted)',
          fontSize: '0.85rem'
        }}>
          <div>&copy; 2026 DataSpeak AI Dashboard.</div>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <a href="#" style={{ transition: 'color 0.2s', ':hover': { color: 'var(--text-main)' }}}>Support</a>
            <a href="#" style={{ transition: 'color 0.2s', ':hover': { color: 'var(--text-main)' }}}>API Docs</a>
            <a href="#" style={{ transition: 'color 0.2s', ':hover': { color: 'var(--text-main)' }}}>Settings</a>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Dashboard;
