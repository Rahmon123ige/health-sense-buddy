
import React from 'react';
import { Link } from 'react-router-dom';
import { Header } from '../components/Header';

const Dashboard: React.FC = () => {
  return (
    <div className="app-container">      
      <main className="dashboard-container">
        <Header />
        {/* <h1>Welcome to AI Welfare</h1>
        <p style={{ textAlign: 'center', color: '#6b7280', marginBottom: '3rem' }}>
          Your personal health assistant, here to help you understand your symptoms and provide guidance.
        </p> */}
        <div className="hero-section">
          <div className="hero-content">
            <h1>Your Health, Simplified</h1>
          <p>Describe your symptoms or use our guided questionaire to get a preliminary diagnosis and connect to nearby healthcare providers.</p>
          <button className='btn btn-secondary'>Start Diagnosis</button>
          </div>
        </div>
        <div className="diagnosis-text">
          <h5>How It Works</h5>
          <h2>Get a Quick Diagnosis and Find Local Care</h2>
          <p>Our AI-powered system helps you understand your symptoms and connects you with nearby pharmacies and hospitals for immediate care.
          </p>
        </div>

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

        <div style={{ background: '#9C7F6A', opacity:'', padding: '2rem', margin:'30px', borderRadius: '10px', marginTop: '2rem' }}>
          <h3 style={{ color: '#ffffff', opacity: '.7', marginBottom: '1rem' }}>⚠️ Important Disclaimer</h3>
          <p style={{ color: '#ffffff' , opacity: '.7' }}>
            This AI assistant provides general health information and should not replace professional medical advice. 
            Always consult with healthcare professionals for serious symptoms or emergencies.
          </p>
        </div>
        <div className="footer">
          <ul>
            <li>Privacy Policy</li>
            <li>Terms of Service</li>
            <li>Contact Us</li>
          </ul>
          <div className="copyright">
            @2025HealthSense. All rights reserved.
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
