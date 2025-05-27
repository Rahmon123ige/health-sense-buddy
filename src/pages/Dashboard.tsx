
import React from 'react';
import { Link } from 'react-router-dom';
import { Header } from '../components/Header';

const Dashboard: React.FC = () => {
  return (
    <div className="app-container">
      <Header />
      
      <main className="dashboard-container">
        <h1>Welcome to AI Welfare</h1>
        <p style={{ textAlign: 'center', color: '#6b7280', marginBottom: '3rem' }}>
          Your personal health assistant, here to help you understand your symptoms and provide guidance.
        </p>

        <div className="dashboard-grid">
          <div className="dashboard-card">
            <h3>💬 Start New Chat</h3>
            <p>Describe your symptoms and get AI-powered health insights with urgency recommendations.</p>
            <Link to="/chat" className="btn btn-primary">
              Start Chat
            </Link>
          </div>

          <div className="dashboard-card">
            <h3>📋 View History</h3>
            <p>Access your previous consultations and track your health concerns over time.</p>
            <Link to="/history" className="btn btn-secondary">
              View History
            </Link>
          </div>

          <div className="dashboard-card">
            <h3>🩺 How It Works</h3>
            <p>
              1. Describe your symptoms in natural language<br/>
              2. Get AI analysis with urgency level<br/>
              3. Receive self-care recommendations<br/>
              4. Find nearby clinics if needed
            </p>
          </div>
        </div>

        <div style={{ background: '#f0f9ff', padding: '2rem', borderRadius: '1rem', marginTop: '2rem' }}>
          <h3 style={{ color: '#1e40af', marginBottom: '1rem' }}>⚠️ Important Disclaimer</h3>
          <p style={{ color: '#1e40af' }}>
            This AI assistant provides general health information and should not replace professional medical advice. 
            Always consult with healthcare professionals for serious symptoms or emergencies.
          </p>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
