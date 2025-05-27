
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const location = useLocation();

  return (
    <header className="header">
      <div className="header-content">
        <div className="logo">
          <span>🏥</span>
          <span>AI Welfare</span>
        </div>
        
        {user && (
          <nav className="nav">
            <Link 
              to="/dashboard" 
              className={`nav-link ${location.pathname === '/dashboard' ? 'active' : ''}`}
            >
              Dashboard
            </Link>
            <Link 
              to="/chat" 
              className={`nav-link ${location.pathname === '/chat' ? 'active' : ''}`}
            >
              New Chat
            </Link>
            <Link 
              to="/history" 
              className={`nav-link ${location.pathname === '/history' ? 'active' : ''}`}
            >
              History
            </Link>
            <span className="nav-link">Hello, {user.name}</span>
            <button onClick={logout} className="btn btn-secondary">
              Logout
            </button>
          </nav>
        )}
      </div>
    </header>
  );
};
