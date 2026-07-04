import { useState } from 'react';
import { generateProfiles } from '../../shared/data/adminData';
import { Search, Eye } from 'lucide-react';

const profiles = generateProfiles(50);
const ratingBadge: Record<string, string> = { Excellent: 'badge-success', Good: 'badge-info', Moderate: 'badge-warning', 'High Risk': 'badge-danger' };

export default function CustomerProfiles() {
  const [search, setSearch] = useState('');
  const [ratingFilter, setRatingFilter] = useState('All');
  const filtered = profiles.filter(p =>
    (ratingFilter === 'All' || p.rating === ratingFilter) &&
    (p.name.toLowerCase().includes(search.toLowerCase()) || p.id.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="animate-in">
      <div className="page-header"><h1>Customer Profiles</h1><p>View and manage all MSME customer profiles</p></div>
      <div style={{ display: 'flex', gap: 12, marginBottom: 16, alignItems: 'center' }}>
        <div style={{ position: 'relative', flex: 1, maxWidth: 320 }}>
          <Search size={14} style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input className="input" placeholder="Search by name or ID..." value={search} onChange={e => setSearch(e.target.value)} style={{ paddingLeft: 32 }} />
        </div>
        <div className="tabs-pills">
          {['All', 'Excellent', 'Good', 'Moderate', 'High Risk'].map(r => (
            <button key={r} className={`tab ${ratingFilter === r ? 'active' : ''}`} onClick={() => setRatingFilter(r)}>{r}</button>
          ))}
        </div>
      </div>
      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <table>
          <thead><tr><th>ID</th><th>Business Name</th><th>Sector</th><th>Location</th><th>Score</th><th>Rating</th><th>Status</th><th></th></tr></thead>
          <tbody>
            {filtered.slice(0, 25).map(p => (
              <tr key={p.id}>
                <td style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem' }}>{p.id}</td>
                <td style={{ fontWeight: 500 }}>{p.name}</td>
                <td style={{ color: 'var(--text-secondary)' }}>{p.sector}</td>
                <td style={{ color: 'var(--text-secondary)' }}>{p.city}</td>
                <td style={{ fontWeight: 700, fontFamily: 'var(--font-mono)' }}>{p.score}</td>
                <td><span className={`badge ${ratingBadge[p.rating]}`}>{p.rating}</span></td>
                <td><span className="badge badge-neutral">{p.status}</span></td>
                <td><button className="btn btn-ghost btn-sm"><Eye size={13} /></button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="text-caption" style={{ marginTop: 12 }}>Showing {Math.min(25, filtered.length)} of {filtered.length} results</div>
    </div>
  );
}
