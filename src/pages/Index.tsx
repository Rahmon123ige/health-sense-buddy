
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Index = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    } else {
      navigate('/login');
    }
  }, [user, navigate]);

  return (
    <div className="loading" style={{ height: '100vh' }}>
      <div className="spinner"></div>
      Loading AI Welfare...
    </div>
  );
};

export default Index;
