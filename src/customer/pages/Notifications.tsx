import { useState } from 'react';
import { notifications } from '../../shared/data/customerData';
import { Bell, TrendingUp, FileText, Sparkles, Settings, CheckCheck } from 'lucide-react';

const typeIcons: Record<string, typeof Bell> = { score: TrendingUp, document: FileText, application: Bell, advisory: Sparkles, system: Settings };

export default function Notifications() {
  const [items, setItems] = useState(notifications);
  const unread = items.filter(n => !n.read).length;

  return (
    <div className="animate-in">
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div><h1>Notifications {unread > 0 && <span className="badge badge-accent" style={{ marginLeft: 8, verticalAlign: 'middle' }}>{unread} new</span>}</h1><p>Stay updated on your financial health and applications</p></div>
        {unread > 0 && <button className="btn btn-ghost btn-sm" onClick={() => setItems(items.map(n => ({ ...n, read: true })))}><CheckCheck size={14} /> Mark all read</button>}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 1, borderRadius: 12, overflow: 'hidden', border: '1px solid var(--border)' }}>
        {items.map(n => {
          const Icon = typeIcons[n.type] || Bell;
          return (
            <div key={n.id} style={{ display: 'flex', gap: 14, padding: '14px 20px', background: n.read ? 'var(--bg-surface)' : 'var(--bg-app)', borderBottom: '1px solid var(--border)', cursor: 'pointer', transition: 'background 120ms' }}
              onClick={() => setItems(prev => prev.map(i => i.id === n.id ? { ...i, read: true } : i))}>
              <div style={{ width: 32, height: 32, borderRadius: 8, background: 'var(--bg-elevated)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Icon size={14} style={{ color: n.read ? 'var(--text-muted)' : 'var(--accent)' }} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.8125rem', fontWeight: n.read ? 400 : 600 }}>{n.title}</span>
                  <span className="text-caption">{n.date}</span>
                </div>
                <p className="text-caption" style={{ marginTop: 2 }}>{n.message}</p>
              </div>
              {!n.read && <div style={{ width: 6, height: 6, borderRadius: 3, background: 'var(--accent)', marginTop: 4, flexShrink: 0 }} />}
            </div>
          );
        })}
      </div>
    </div>
  );
}
