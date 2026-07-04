import { useState } from 'react';
import { generateProfiles } from '../../shared/data/adminData';
import { CheckCircle2, XCircle, MessageSquare } from 'lucide-react';

const queue = generateProfiles(10).filter(p => p.status === 'Under Review' || p.status === 'Pending');
const ratingBadge: Record<string, string> = { Excellent: 'badge-success', Good: 'badge-info', Moderate: 'badge-warning', 'High Risk': 'badge-danger' };

export default function Underwriting() {
  const [selected, setSelected] = useState(0);
  const current = queue[selected] || queue[0];
  if (!current) return <div className="animate-in"><div className="page-header"><h1>Underwriting Workspace</h1></div><p>No pending applications.</p></div>;

  return (
    <div className="animate-in">
      <div className="page-header"><h1>Underwriting Workspace</h1><p>Review and process MSME loan applications</p></div>
      <div className="grid" style={{ gridTemplateColumns: '280px 1fr' }}>
        {/* Queue */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <div className="text-overline" style={{ padding: '0 8px', marginBottom: 8 }}>Queue ({queue.length})</div>
          {queue.map((p, i) => (
            <button key={p.id} onClick={() => setSelected(i)} className="card card-interactive"
              style={{ padding: 12, textAlign: 'left', cursor: 'pointer', borderColor: i === selected ? 'var(--accent)' : 'var(--border)' }}>
              <div style={{ fontSize: '0.8125rem', fontWeight: 600, marginBottom: 2 }}>{p.name}</div>
              <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <span className="text-caption">{p.id}</span>
                <span className={`badge ${ratingBadge[p.rating]}`} style={{ fontSize: '0.625rem' }}>{p.score}</span>
              </div>
            </button>
          ))}
        </div>

        {/* Detail */}
        <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
          <div style={{ padding: '16px 24px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h3>{current.name}</h3>
              <span className="text-caption">{current.id} · {current.sector} · {current.city}</span>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button className="btn btn-secondary btn-sm"><MessageSquare size={13} /> Request Info</button>
              <button className="btn btn-danger btn-sm"><XCircle size={13} /> Reject</button>
              <button className="btn btn-primary btn-sm" style={{ background: 'var(--success)' }}><CheckCircle2 size={13} /> Approve</button>
            </div>
          </div>
          <div style={{ padding: 24 }}>
            <div className="grid grid-3" style={{ marginBottom: 24 }}>
              {[
                { label: 'Health Score', value: current.score, color: current.score >= 650 ? 'var(--success)' : 'var(--warning)' },
                { label: 'Annual Revenue', value: `₹${(current.annualRevenue / 100000).toFixed(1)}L`, color: 'var(--text-primary)' },
                { label: 'Business Vintage', value: `${current.vintage} years`, color: 'var(--text-primary)' },
              ].map((m, i) => (
                <div key={i} className="card" style={{ background: 'var(--bg-app)', textAlign: 'center', padding: 16 }}>
                  <div className="metric-label" style={{ marginBottom: 4 }}>{m.label}</div>
                  <div className="metric-value" style={{ color: m.color }}>{m.value}</div>
                </div>
              ))}
            </div>
            <div className="grid grid-2" style={{ gap: 20 }}>
              {[
                { label: 'GSTIN', value: current.gstin }, { label: 'Udyam', value: current.udyam },
                { label: 'Employees', value: current.employees }, { label: 'Contact', value: current.contactPerson },
                { label: 'Phone', value: current.phone }, { label: 'Email', value: current.email },
              ].map((f, i) => (
                <div key={i}>
                  <div className="text-caption" style={{ marginBottom: 2 }}>{f.label}</div>
                  <div style={{ fontSize: '0.8125rem', fontWeight: 500 }}>{f.value}</div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 24 }}>
              <label style={{ fontSize: '0.8125rem', fontWeight: 500, display: 'block', marginBottom: 6 }}>Officer Notes</label>
              <textarea className="input" rows={3} placeholder="Add your assessment notes..." style={{ resize: 'vertical' }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
