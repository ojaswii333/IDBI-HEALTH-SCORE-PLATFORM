import { useState, useRef, useEffect } from 'react';
import { advisorResponses } from '../../shared/data/customerData';
import { Send, Sparkles } from 'lucide-react';

interface Message { role: 'user' | 'ai'; content: string; }

const suggestions = Object.keys(advisorResponses);

export default function AIAdvisor() {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'ai', content: 'Hello! I\'m your AI Business Advisor. I can help you understand your financial health, improve your credit score, and explore loan options. What would you like to know?' },
  ]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

  const send = (text: string) => {
    if (!text.trim()) return;
    setMessages(prev => [...prev, { role: 'user', content: text }]);
    setInput('');
    setTyping(true);
    setTimeout(() => {
      const response = advisorResponses[text] || 'Based on your current financial health score of **724** and analysis of your business data, I can help you explore specific areas. Try asking about:\n\n- How to improve your score\n- Your loan eligibility\n- Your business strengths\n- Recent score changes';
      setMessages(prev => [...prev, { role: 'ai', content: response }]);
      setTyping(false);
    }, 1200);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 56px - 64px)' }}>
      <div style={{ padding: '16px 0 12px', borderBottom: '1px solid var(--border)', marginBottom: 0 }}>
        <h1 style={{ fontSize: '1.25rem', display: 'flex', alignItems: 'center', gap: 8 }}><Sparkles size={18} style={{ color: 'var(--accent)' }} /> AI Business Advisor</h1>
        <p className="text-caption" style={{ marginTop: 2 }}>Personalized insights powered by your financial data</p>
      </div>

      {/* Messages */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '20px 0', display: 'flex', flexDirection: 'column', gap: 16 }}>
        {messages.map((msg, i) => (
          <div key={i} style={{ display: 'flex', justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start' }}>
            <div style={{
              maxWidth: 600, padding: '12px 16px', borderRadius: 12,
              background: msg.role === 'user' ? 'var(--accent)' : 'var(--bg-surface)',
              color: msg.role === 'user' ? 'white' : 'var(--text-primary)',
              border: msg.role === 'ai' ? '1px solid var(--border)' : 'none',
              fontSize: '0.8125rem', lineHeight: 1.7,
              borderBottomRightRadius: msg.role === 'user' ? 4 : 12,
              borderBottomLeftRadius: msg.role === 'ai' ? 4 : 12,
              whiteSpace: 'pre-wrap',
            }}>
              {msg.content.split('\n').map((line, j) => {
                const bold = line.replace(/\*\*(.*?)\*\*/g, '⟨b⟩$1⟨/b⟩');
                return <div key={j}>{bold.split('⟨b⟩').map((part, k) => {
                  if (part.includes('⟨/b⟩')) {
                    const [b, rest] = part.split('⟨/b⟩');
                    return <span key={k}><strong>{b}</strong>{rest}</span>;
                  }
                  return <span key={k}>{part}</span>;
                })}</div>;
              })}
            </div>
          </div>
        ))}
        {typing && (
          <div style={{ display: 'flex' }}>
            <div style={{ padding: '12px 20px', background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: 12, borderBottomLeftRadius: 4 }}>
              <div style={{ display: 'flex', gap: 4 }}>
                {[0, 1, 2].map(i => (
                  <div key={i} style={{ width: 6, height: 6, borderRadius: 3, background: 'var(--text-muted)', animation: `pulse 1.2s ease-in-out ${i * 0.2}s infinite` }} />
                ))}
              </div>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Suggestions */}
      {messages.length <= 2 && (
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', paddingBottom: 12 }}>
          {suggestions.map(q => (
            <button key={q} onClick={() => send(q)} className="btn btn-secondary btn-sm" style={{ fontSize: '0.75rem' }}>{q}</button>
          ))}
        </div>
      )}

      {/* Input */}
      <div style={{ display: 'flex', gap: 8, paddingTop: 12, borderTop: '1px solid var(--border)' }}>
        <input className="input" value={input} onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && send(input)}
          placeholder="Ask about your financial health..." style={{ flex: 1 }} />
        <button className="btn btn-primary" onClick={() => send(input)} disabled={!input.trim()}>
          <Send size={14} />
        </button>
      </div>
    </div>
  );
}
