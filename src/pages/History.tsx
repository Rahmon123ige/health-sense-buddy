
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Header } from '../components/Header';

interface HistoryItem {
  id: string;
  date: string;
  symptoms: string;
  analysis: string;
  urgency: 'low' | 'medium' | 'high';
}

const History: React.FC = () => {
  const [history, setHistory] = useState<HistoryItem[]>([]);

  useEffect(() => {
    const savedHistory = JSON.parse(localStorage.getItem('ai-welfare-chat-history') || '[]');
    setHistory(savedHistory.reverse()); // Show most recent first
  }, []);

  const clearHistory = () => {
    if (confirm('Are you sure you want to clear all chat history?')) {
      localStorage.removeItem('ai-welfare-chat-history');
      setHistory([]);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' at ' + date.toLocaleTimeString();
  };

  return (
    <div className="app-container">
      <Header />
      
      <main className="history-container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <h1>Chat History</h1>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <Link to="/chat" className="btn btn-primary">
              New Chat
            </Link>
            {history.length > 0 && (
              <button onClick={clearHistory} className="btn btn-danger">
                Clear History
              </button>
            )}
          </div>
        </div>

        {history.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '3rem', color: '#6b7280' }}>
            <h3>No chat history yet</h3>
            <p>Start your first health consultation to see your history here.</p>
            <Link to="/chat" className="btn btn-primary" style={{ marginTop: '1rem' }}>
              Start First Chat
            </Link>
          </div>
        ) : (
          <div>
            {history.map((item) => (
              <div key={item.id} className="history-item">
                <div className="history-date">
                  {formatDate(item.date)}
                </div>
                <div className="history-symptoms">
                  <strong>Symptoms:</strong> {item.symptoms}
                </div>
                <div className={`urgency-level urgency-${item.urgency}`}>
                  Urgency: {item.urgency.toUpperCase()}
                </div>
                <div className="history-analysis">
                  <strong>Analysis:</strong> {item.analysis}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default History;
