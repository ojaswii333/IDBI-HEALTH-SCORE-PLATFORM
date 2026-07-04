import { useState } from 'react';
import { auditLogs } from '../../shared/data/adminData';
import { Search, Download } from 'lucide-react';

export default function AuditLogs() {
  const [search, setSearch] = useState('');
  const filtered = auditLogs.filter(l => l.action.toLowerCase().includes(search.toLowerCase()) || l.user.toLowerCase().includes(search.toLowerCase()) || l.target.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="animate-in">
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div><h1>Audit Logs</h1><p>Complete audit trail of all system actions</p></div>
        <button className="btn btn-secondary"><Download size={14} /> Export CSV</button>
      </div>
      <div style={{ marginBottom: 16 }}>
        <div style={{ position: 'relative', maxWidth: 320 }}>
          <Search size={14} style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input className="input" placeholder="Search logs..." value={search} onChange={e => setSearch(e.target.value)} style={{ paddingLeft: 32 }} />
        </div>
      </div>
      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <table>
          <thead><tr><th>Timestamp</th><th>User</th><th>Role</th><th>Action</th><th>Target</th><th>IP Address</th></tr></thead>
          <tbody>
            {filtered.map(l => (
              <tr key={l.id}>
                <td style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-muted)' }}>{l.timestamp}</td>
                <td style={{ fontWeight: 500 }}>{l.user}</td>
                <td><span className="badge badge-neutral">{l.role}</span></td>
                <td>{l.action}</td>
                <td style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem' }}>{l.target}</td>
                <td style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-muted)' }}>{l.ip}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
