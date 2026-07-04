import { useState, useRef, useEffect } from 'react';
import Header from '../components/layout/Header';
import Sidebar from '../components/layout/Sidebar';
import { copilotResponses } from '../data/mockData';
import { Send, Sparkles, User, Bot, Lightbulb } from 'lucide-react';

interface Message { role: 'user' | 'ai'; content: string; time: string; }

const quickPrompts = Object.keys(copilotResponses);

export default function CopilotPage() {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'ai', content: '👋 Hello! I\'m the IDBI Financial Health AI Copilot. I can help you understand your credit score, suggest improvements, and provide business insights.\n\nTry asking me one of the suggested questions below, or type your own!', time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
  ]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const msgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (msgRef.current) msgRef.current.scrollTop = msgRef.current.scrollHeight;
  }, [messages, typing]);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setMessages(prev => [...prev, { role: 'user', content: text, time: now }]);
    setInput('');
    setTyping(true);

    setTimeout(() => {
      const response = copilotResponses[text] ||
        `Based on the analysis of 156 features from your alternate data sources, here's what I found:\n\n` +
        `Your financial health score of **724** places you in the "Good" category. ` +
        `The key areas to focus on are payment discipline (currently 34/100) and supplier diversification (38/100).\n\n` +
        `Would you like me to elaborate on any specific aspect of your financial profile?`;

      setMessages(prev => [...prev, { role: 'ai', content: response, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }]);
      setTyping(false);
    }, 1200 + Math.random() * 800);
  };

  const renderContent = (text: string) => {
    return text.split('\n').map((line, i) => {
      let processed = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
      if (line.startsWith('|') && line.endsWith('|')) {
        return <div key={i} style={{ fontFamily: 'monospace', fontSize: '0.8125rem', whiteSpace: 'pre' }} dangerouslySetInnerHTML={{ __html: processed }} />;
      }
      return <p key={i} style={{ margin: line === '' ? '8px 0' : '2px 0', color: 'inherit' }} dangerouslySetInnerHTML={{ __html: processed }} />;
    });
  };

  return (
    <div className="app-layout">
      <Sidebar />
      <div className="app-main">
        <Header title="AI Copilot" />
        <div className="chat-container">
          {/* Messages */}
          <div className="chat-messages" ref={msgRef}>
            {messages.map((m, i) => (
              <div key={i} style={{
                display: 'flex', gap: 12,
                justifyContent: m.role === 'user' ? 'flex-end' : 'flex-start',
                animation: 'fadeIn 0.3s ease',
              }}>
                {m.role === 'ai' && (
                  <div style={{
                    width: 32, height: 32, borderRadius: 10, flexShrink: 0,
                    background: 'var(--idbi-gradient)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <Bot size={16} color="white" />
                  </div>
                )}
                <div>
                  <div className={`chat-bubble ${m.role}`} style={{ fontSize: '0.9375rem' }}>
                    {renderContent(m.content)}
                  </div>
                  <div style={{
                    fontSize: '0.6875rem', color: 'var(--text-tertiary)',
                    marginTop: 4, textAlign: m.role === 'user' ? 'right' : 'left',
                    padding: '0 4px',
                  }}>{m.time}</div>
                </div>
                {m.role === 'user' && (
                  <div style={{
                    width: 32, height: 32, borderRadius: 10, flexShrink: 0,
                    background: 'var(--bg-glass-strong)', border: '1px solid var(--border-subtle)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <User size={16} />
                  </div>
                )}
              </div>
            ))}

            {typing && (
              <div style={{ display: 'flex', gap: 12, animation: 'fadeIn 0.3s ease' }}>
                <div style={{
                  width: 32, height: 32, borderRadius: 10, flexShrink: 0,
                  background: 'var(--idbi-gradient)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <Bot size={16} color="white" />
                </div>
                <div className="chat-bubble ai" style={{ display: 'flex', gap: 4, padding: '16px 20px' }}>
                  {[0, 1, 2].map(i => (
                    <div key={i} style={{
                      width: 6, height: 6, borderRadius: '50%', background: 'var(--text-tertiary)',
                      animation: `pulse 1.4s ease-in-out ${i * 0.2}s infinite`,
                    }} />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Quick prompts */}
          <div style={{
            padding: '12px 24px', display: 'flex', gap: 8, flexWrap: 'wrap',
            borderTop: '1px solid var(--border-subtle)',
          }}>
            <Lightbulb size={14} style={{ color: 'var(--text-tertiary)', marginTop: 7 }} />
            {quickPrompts.map((p, i) => (
              <button key={i} onClick={() => sendMessage(p)} className="btn btn-secondary btn-sm"
                style={{ fontSize: '0.75rem', padding: '6px 12px' }}>
                {p}
              </button>
            ))}
          </div>

          {/* Input */}
          <div className="chat-input-area">
            <Sparkles size={18} style={{ color: 'var(--idbi-orange)', flexShrink: 0 }} />
            <input
              className="input" value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && sendMessage(input)}
              placeholder="Ask about your financial health..."
              style={{ flex: 1 }}
            />
            <button className="btn btn-primary" onClick={() => sendMessage(input)}
              style={{ padding: '10px 16px' }}>
              <Send size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
