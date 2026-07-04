import { dataQualitySources } from '../../shared/data/adminData';
import { CheckCircle2, AlertTriangle, XCircle } from 'lucide-react';

const statusIcon: Record<string, typeof CheckCircle2> = { healthy: CheckCircle2, warning: AlertTriangle, error: XCircle };
const statusBadge: Record<string, string> = { healthy: 'badge-success', warning: 'badge-warning', error: 'badge-danger' };

export default function DataQuality() {
  return (
    <div className="animate-in">
      <div className="page-header"><h1>Data Quality Monitoring</h1><p>Track data source health, completeness, and freshness</p></div>
      <div className="grid grid-3" style={{ marginBottom: 24 }}>
        {dataQualitySources.map((s, i) => {
          const Icon = statusIcon[s.status];
          return (
            <div key={i} className="card" style={{ padding: 16 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                <span style={{ fontWeight: 600, fontSize: '0.875rem' }}>{s.source}</span>
                <span className={`badge ${statusBadge[s.status]}`}><Icon size={9} /> {s.status}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                <span className="text-caption">Completeness</span>
                <span style={{ fontSize: '0.8125rem', fontWeight: 600 }}>{s.completeness}%</span>
              </div>
              <div className="progress" style={{ marginBottom: 12 }}>
                <div className="progress-fill" style={{ width: `${s.completeness}%`, background: s.completeness > 90 ? 'var(--success)' : s.completeness > 75 ? 'var(--warning)' : 'var(--danger)' }} />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span className="text-caption">Last sync: {s.lastSync}</span>
                <span className="text-caption">{s.records.toLocaleString()} records</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
