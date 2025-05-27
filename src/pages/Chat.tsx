
import React, { useState, useRef, useEffect } from 'react';
import { Header } from '../components/Header';

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  urgency?: 'low' | 'medium' | 'high';
  timestamp: Date;
}

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'ai',
      content: "Hello! I'm your AI health assistant. Please describe your symptoms and I'll help you understand what might be going on and how urgent it might be. Remember, I'm here to provide guidance, not replace professional medical advice.",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const analyzeSymptoms = async (symptoms: string): Promise<{ analysis: string; urgency: 'low' | 'medium' | 'high' }> => {
    // Replace with actual OpenAI API call
    const API_KEY = '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';
    
    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-4',
          messages: [
            {
              role: 'system',
              content: `You are a friendly AI health assistant for AI Welfare, helping people in underserved communities understand their health symptoms. 

Your response should:
1. Be empathetic and reassuring
2. Provide possible causes (non-diagnostic)
3. Classify urgency as: LOW (monitor/self-care), MEDIUM (see doctor soon), or HIGH (seek immediate care)
4. Give practical self-care tips when appropriate
5. Always remind that this is guidance, not medical diagnosis

Format your response naturally but include:
- Possible causes
- Urgency level (LOW/MEDIUM/HIGH)
- Self-care recommendations
- When to seek professional help

Be warm, understanding, and supportive. Remember many users may have limited healthcare access.`
            },
            {
              role: 'user',
              content: `I'm experiencing: ${symptoms}`
            }
          ],
          max_tokens: 500,
          temperature: 0.7,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get AI response');
      }

      const data = await response.json();
      const analysis = data.choices[0].message.content;

      // Extract urgency level from response
      let urgency: 'low' | 'medium' | 'high' = 'medium';
      if (analysis.includes('LOW') || analysis.toLowerCase().includes('low urgency')) {
        urgency = 'low';
      } else if (analysis.includes('HIGH') || analysis.toLowerCase().includes('high urgency') || analysis.toLowerCase().includes('emergency')) {
        urgency = 'high';
      }

      return { analysis, urgency };
    } catch (error) {
      console.error('Error calling OpenAI:', error);
      // Fallback response
      return {
        analysis: "I'm sorry, I'm having trouble connecting to my analysis system right now. Please try again in a moment, or consult with a healthcare professional if your symptoms are concerning.",
        urgency: 'medium'
      };
    }
  };

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const { analysis, urgency } = await analyzeSymptoms(input);

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: analysis,
        urgency,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMessage]);

      // Save to history
      const existingHistory = JSON.parse(localStorage.getItem('ai-welfare-chat-history') || '[]');
      const chatSession = {
        id: Date.now().toString(),
        date: new Date().toISOString(),
        symptoms: input,
        analysis,
        urgency
      };
      existingHistory.push(chatSession);
      localStorage.setItem('ai-welfare-chat-history', JSON.stringify(existingHistory));

    } catch (error) {
      console.error('Error:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: "I'm sorry, I encountered an error while analyzing your symptoms. Please try again or consult with a healthcare professional.",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="app-container">
      <Header />
      
      <main style={{ padding: '2rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div className="chat-container">
          <div className="chat-header">
            <h2>Health Symptom Analysis</h2>
            <p>Describe your symptoms and get AI-powered guidance</p>
          </div>

          <div className="chat-messages">
            {messages.map((message) => (
              <div key={message.id} className={`message ${message.type}`}>
                <div className="message-avatar">
                  {message.type === 'user' ? 'U' : '🤖'}
                </div>
                <div className="message-content">
                  <p>{message.content}</p>
                  {message.urgency && (
                    <div className={`urgency-level urgency-${message.urgency}`}>
                      Urgency: {message.urgency.toUpperCase()}
                    </div>
                  )}
                </div>
              </div>
            ))}
            
            {loading && (
              <div className="message ai">
                <div className="message-avatar">🤖</div>
                <div className="message-content">
                  <div className="loading">
                    <div className="spinner"></div>
                    Analyzing your symptoms...
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          <div className="chat-input-container">
            <textarea
              className="form-textarea"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Describe your symptoms... (e.g., 'I have a headache and feel dizzy')"
              style={{ minHeight: '60px', borderRadius: '1.5rem' }}
            />
            <button 
              onClick={handleSend} 
              className="chat-send-btn"
              disabled={loading || !input.trim()}
            >
              Send
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Chat;
