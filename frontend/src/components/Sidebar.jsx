import React, { useRef, useState } from 'react';
import { LayoutDashboard, Database, BarChart2, History, UploadCloud, MessageSquare, CheckCircle, AlertCircle, Loader } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

const Sidebar = () => {
  const fileInputRef = useRef(null);
  const [uploadStatus, setUploadStatus] = useState(null); // null | 'loading' | 'success' | 'error'
  const [uploadMessage, setUploadMessage] = useState('');

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.name.endsWith('.csv')) {
      setUploadStatus('error');
      setUploadMessage('Only .csv files are supported.');
      return;
    }

    setUploadStatus('loading');
    setUploadMessage('');

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await axios.post('http://localhost:8000/api/upload-csv', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setUploadStatus('success');
      setUploadMessage(res.data.message || 'Dataset loaded!');
    } catch (err) {
      setUploadStatus('error');
      setUploadMessage(err.response?.data?.detail || 'Upload failed. Try again.');
    } finally {
      // Reset the file input so the same file can be re-uploaded if needed
      e.target.value = '';
    }
  };

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
        <NavLink to="/data-sources" className={({isActive}) => isActive ? "nav-item active" : "nav-item"}>
          <Database size={18} />
          <span>Data Sources</span>
        </NavLink>
        <NavLink to="/analytics" className={({isActive}) => isActive ? "nav-item active" : "nav-item"}>
          <BarChart2 size={18} />
          <span>Analytics</span>
        </NavLink>
        <NavLink to="/query-history" className={({isActive}) => isActive ? "nav-item active" : "nav-item"}>
          <History size={18} />
          <span>Query History</span>
        </NavLink>
      </div>

      <div className="sidebar-footer">
        <div className="upload-card">
          <p>
            Upload Data<br/>
            <span style={{fontSize: '0.75rem'}}>Import CSV file to get started</span>
          </p>

          {/* Status feedback */}
          {uploadStatus === 'success' && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--success)', fontSize: '0.8rem', marginBottom: '0.75rem' }}>
              <CheckCircle size={14} />
              <span>{uploadMessage}</span>
            </div>
          )}
          {uploadStatus === 'error' && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--error)', fontSize: '0.8rem', marginBottom: '0.75rem' }}>
              <AlertCircle size={14} />
              <span>{uploadMessage}</span>
            </div>
          )}

          {/* Hidden real file input */}
          <input
            ref={fileInputRef}
            type="file"
            accept=".csv"
            style={{ display: 'none' }}
            onChange={handleFileChange}
          />

          <button
            className="btn-primary"
            style={{ width: '100%', justifyContent: 'center' }}
            onClick={handleUploadClick}
            disabled={uploadStatus === 'loading'}
          >
            {uploadStatus === 'loading' ? (
              <>
                <Loader size={16} className="animate-spin" /> Uploading...
              </>
            ) : (
              <>
                <UploadCloud size={16} /> Upload CSV
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
