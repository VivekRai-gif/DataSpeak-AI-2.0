import React from 'react';
import { LayoutDashboard, Database, BarChart2, History, UploadCloud, MessageSquare } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <MessageSquare color="var(--primary)" size={24} />
        <span>DataSpeak AI</span>
      </div>
      
      <div className="sidebar-nav">
        <NavLink to="/dashboard" className={({isActive}) => isActive ? "nav-item active" : "nav-item"}>
          <LayoutDashboard size={18} />
          <span>Dashboard</span>
        </NavLink>
        <div className="nav-item">
          <Database size={18} />
          <span>Data Sources</span>
        </div>
        <div className="nav-item">
          <BarChart2 size={18} />
          <span>Analytics</span>
        </div>
        <div className="nav-item">
          <History size={18} />
          <span>Query History</span>
        </div>
      </div>

      <div className="sidebar-footer">
        <div className="upload-card">
          <p>Upload Data<br/><span style={{fontSize: '0.75rem'}}>Import CSV file to get started</span></p>
          <button className="btn-primary" style={{width: '100%', justifyContent: 'center'}}>
            <UploadCloud size={16} /> Upload CSV
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
