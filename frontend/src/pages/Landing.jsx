import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MessageSquare, LayoutDashboard, Zap, Database, TrendingUp, Search, PlayCircle } from 'lucide-react';

const Landing = () => {
  const [showVideo, setShowVideo] = useState(false);
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="landing-container">
      {/* Navigation */}
      <nav className="navbar">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700, fontSize: '1.25rem', color: 'var(--primary)' }}>
          <MessageSquare size={24} />
          <span>DataSpeak AI</span>
        </div>
        <div className="nav-links">
          <a href="#features">Features</a>
          <a href="#how">How it Works</a>
          <a href="#use-cases">Use Cases</a>
          <a href="#demo" onClick={(e) => { e.preventDefault(); setShowVideo(true); }}>Demo</a>
          <Link to="/dashboard" className="btn-primary">Get Started</Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="hero-section">
        <div className="hero-badge">
          ✨ Introducing DataSpeak AI 2.0
        </div>
        <h1 className="hero-title">
          Talk to your data.<br/>
          <span>Get instant answers.</span>
        </h1>
        <p className="hero-subtitle">
          Experience the future of Business Intelligence. Stop writing complex SQL queries and let our generative AI model visualize your entire customer journey with a single prompt.
        </p>
        <div className="hero-actions">
          <Link to="/dashboard" className="btn-primary" style={{ padding: '0.9rem 2.5rem', fontSize: '1.05rem', boxShadow: '0 8px 30px rgba(157, 78, 221, 0.4)' }}>
            Start Free Trial <Zap size={18} fill="currentColor" />
          </Link>
          <button onClick={() => setShowForm(true)} className="btn-secondary" style={{ padding: '0.9rem 2.5rem', fontSize: '1.05rem' }}>
            <PlayCircle size={18} /> Book a Demo
          </button>
        </div>
        
        <div style={{ display: 'flex', gap: '2.5rem', justifyContent: 'center', marginTop: '2.5rem', color: 'var(--text-muted)', fontSize: '0.95rem' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div style={{ background: 'var(--success-bg)', color: 'var(--success)', padding: '2px', borderRadius: '50%' }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
            </div>
            No SQL Required
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div style={{ background: 'var(--success-bg)', color: 'var(--success)', padding: '2px', borderRadius: '50%' }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
            </div>
            Real-time Aggregation
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div style={{ background: 'var(--success-bg)', color: 'var(--success)', padding: '2px', borderRadius: '50%' }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
            </div>
            Enterprise Grade Security
          </span>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="features-section">
        <div className="section-header">
          <span className="section-badge">🎯 Features</span>
          <h2 className="section-title">Powerful Features for Everyone</h2>
          <p className="section-subtitle">
            From beginners to experts, our AI-powered platform makes data analysis effortless.
          </p>
        </div>

        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon"><MessageSquare size={24} /></div>
            <h3 className="feature-title">Natural Language Input</h3>
            <p className="feature-desc">Simply type your questions in plain English. No technical jargon or SQL knowledge needed.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon"><Database size={24} /></div>
            <h3 className="feature-title">Auto-SQL Generation</h3>
            <p className="feature-desc">Our AI automatically converts your questions into optimized SQL queries in milliseconds.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon"><LayoutDashboard size={24} /></div>
            <h3 className="feature-title">Smart Chart Selection</h3>
            <p className="feature-desc">Automatically chooses the best visualization type - bar, line, pie, or tabular data.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon"><Zap size={24} /></div>
            <h3 className="feature-title">Real-Time Processing</h3>
            <p className="feature-desc">Get instant results with lightning-fast data fetching and rendering.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon"><TrendingUp size={24} /></div>
            <h3 className="feature-title">AI Insights</h3>
            <p className="feature-desc">Automatically discover trends, anomalies, and key insights from your data.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon"><Search size={24} /></div>
            <h3 className="feature-title">CSV Upload Support</h3>
            <p className="feature-desc">Upload your own datasets and start analyzing immediately with plug-and-play simplicity.</p>
          </div>
        </div>
      </section>

      {/* How it Works - Placeholder */}
      <section id="how" style={{ padding: '6rem 2rem', textAlign: 'center', color: 'var(--text-muted)' }}>
        <h2 className="section-title" style={{ fontSize: '2.5rem', color: 'var(--text-main)' }}>How it Works</h2>
        <p style={{ fontSize: '1.25rem', marginTop: '1rem', fontStyle: 'italic' }}>update soon... :)</p>
      </section>

      {/* Use Cases - Placeholder */}
      <section id="use-cases" style={{ padding: '6rem 2rem', textAlign: 'center', color: 'var(--text-muted)', background: 'rgba(255,255,255,0.01)' }}>
        <h2 className="section-title" style={{ fontSize: '2.5rem', color: 'var(--text-main)' }}>Use Cases</h2>
        <p style={{ fontSize: '1.25rem', marginTop: '1rem', fontStyle: 'italic' }}>update soon... :)</p>
      </section>
      
      {/* Premium Short Footer */}
      <footer style={{ 
        borderTop: '1px solid var(--border-light)', 
        background: 'rgba(10, 10, 11, 0.4)',
        backdropFilter: 'blur(20px)',
        padding: '3rem 4rem 2rem',
        marginTop: '2rem'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '2rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontWeight: 700, color: 'var(--text-main)', fontSize: '1.1rem' }}>
            <MessageSquare size={20} color="var(--primary)" />
            <span>DataSpeak AI</span>
          </div>
          
          <div style={{ display: 'flex', gap: '2rem', color: 'var(--text-muted)', fontSize: '0.9rem', fontWeight: 500 }}>
            <a href="#" style={{ transition: 'color 0.2s', ':hover': { color: 'var(--primary)' }}}>Privacy Policy</a>
            <a href="#" style={{ transition: 'color 0.2s', ':hover': { color: 'var(--primary)' }}}>Terms of Service</a>
            <a href="#" style={{ transition: 'color 0.2s', ':hover': { color: 'var(--primary)' }}}>Contact</a>
          </div>
          
          <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
            &copy; 2026 DataSpeak AI. All rights reserved.
          </div>
        </div>
      </footer>

      {/* Video Popup Modal */}
      {showVideo && (
        <div className="video-modal-overlay" onClick={() => setShowVideo(false)}>
          <div className="video-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="video-close-btn" onClick={() => setShowVideo(false)}>
              &times;
            </button>
            <iframe 
              src="https://www.youtube.com/embed/fP1vv7Zbs7E?autoplay=1" 
              title="DataSpeak AI Demo" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen>
            </iframe>
          </div>
        </div>
      )}

      {/* Demo Form Modal */}
      {showForm && (
        <div className="video-modal-overlay" onClick={() => setShowForm(false)}>
          <div className="feature-card" style={{ maxWidth: '500px', width: '90%' }} onClick={e => e.stopPropagation()}>
             <h2 style={{ fontSize: '1.75rem', marginBottom: '1.5rem', color: 'var(--primary-hover)' }}>Book a tailored demo</h2>
             <form style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }} onSubmit={(e) => { e.preventDefault(); alert("Thanks! We will contact you soon."); setShowForm(false); }}>
               <input required type="text" placeholder="Your Name" style={{ padding: '0.8rem 1rem', borderRadius: 'var(--radius-md)', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'white' }} />
               <input required type="email" placeholder="Work Email" style={{ padding: '0.8rem 1rem', borderRadius: 'var(--radius-md)', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'white' }} />
               <input required type="text" placeholder="Company Name" style={{ padding: '0.8rem 1rem', borderRadius: 'var(--radius-md)', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'white' }} />
               <select required defaultValue="" style={{ padding: '0.8rem 1rem', borderRadius: 'var(--radius-md)', background: 'rgba(20,20,25,0.9)', border: '1px solid rgba(255,255,255,0.1)', color: 'white' }}>
                  <option value="" disabled>Select Company Size</option>
                  <option value="1-10">1-10 Employees</option>
                  <option value="11-50">11-50 Employees</option>
                  <option value="50-200">50-200 Employees</option>
                  <option value="200+">200+ Employees</option>
               </select>
               <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1rem' }}>
                  <button type="button" className="btn-secondary" onClick={() => setShowForm(false)}>Cancel</button>
                  <button type="submit" className="btn-primary">Request Demo</button>
               </div>
             </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Landing;
