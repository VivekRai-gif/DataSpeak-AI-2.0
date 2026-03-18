import React from 'react';
import Sidebar from '../components/Sidebar';
import { TrendingUp, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SAMPLE_ANALYTICS = [
  { title: 'Income by City Tier', query: 'Show average monthly income by city tier', icon: '🏙️', desc: 'Compare average incomes across Tier 1, 2 & 3 cities.' },
  { title: 'Gender vs Online Orders', query: 'Show online orders by gender', icon: '🛒', desc: 'Understand ordering patterns split by gender.' },
  { title: 'Store Visit Preferences', query: 'Show store visits by shopping preference', icon: '🏪', desc: 'Analyze in-store visit frequency by customer shopping type.' },
  { title: 'Online vs Store Spend', query: 'Compare online vs store spending by city tier', icon: '💰', desc: 'Breakdown spend channels across city tiers.' },
  { title: 'Discount Sensitivity', query: 'Show discount sensitivity by gender', icon: '🏷️', desc: 'Who is more coupon-driven — male or female shoppers?' },
  { title: 'Tech Savvy Score', query: 'Show average tech savvy score by city tier', icon: '📱', desc: 'How tech-comfortable are shoppers across cities?' },
];

const Analytics = () => {
  const navigate = useNavigate();

  const launchQuery = (query) => {
    navigate('/dashboard', { state: { autoQuery: query } });
  };

  return (
    <div className="dashboard-layout">
      <Sidebar />
      <div className="main-content">
        <h2 style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>Analytics</h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>Pre-built analytical views. Click any card to instantly run the query on the Dashboard.</p>

        <div className="features-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
          {SAMPLE_ANALYTICS.map((item, i) => (
            <div
              key={i}
              className="feature-card"
              style={{ cursor: 'pointer' }}
              onClick={() => launchQuery(item.query)}
            >
              <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>{item.icon}</div>
              <h3 className="feature-title">{item.title}</h3>
              <p className="feature-desc">{item.desc}</p>
              <div style={{ marginTop: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary-hover)', fontSize: '0.85rem', fontWeight: 600 }}>
                <Zap size={14} fill="currentColor" /> Run Query
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Analytics;
