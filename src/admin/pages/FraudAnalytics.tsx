import { fraudAlerts } from '../../shared/data/adminData';
import { ShieldAlert, Eye } from 'lucide-react';

const sevBadge: Record<string, string> = { critical: 'badge-danger', high: 'badge-warning', medium: 'badge-info', low: 'badge-neutral' };
const statusBadge: Record<string, string> = { open: 'badge-danger', investigating: 'badge-warning', resolved: 'badge-success' };

export default function FraudAnalytics() {
  return (
    <div className="animate-in">
      <div className="page-header"><h1>Fraud Analytics</h1><p>Monitor and investigate suspicious activities across the portfolio</p></div>
      <div className="grid grid-4" style={{ marginBottom: 24 }}>
        {[
          { label: 'Open Alerts', value: fraudAlerts.filter(a => a.status === 'open').length, color: 'var(--danger)' },
          { label: 'Investigating', value: fraudAlerts.filter(a => a.status === 'investigating').length, color: 'var(--warning)' },
          { label: 'Resolved (30d)', value: fraudAlerts.filter(a => a.status === 'resolved').length, color: 'var(--success)' },
          { label: 'Total Alerts', value: fraudAlerts.length, color: 'var(--text-primary)' },
        ].map((k, i) => (
          <div key={i} className="card" style={{ padding: 16, textAlign: 'center' }}>
            <div className="metric-value" style={{ color: k.color }}>{k.value}</div>
            <div className="metric-label" style={{ marginTop: 4 }}>{k.label}</div>
          </div>
        ))}
      </div>
      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ padding: '14px 20px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: 8 }}>
          <ShieldAlert size={16} style={{ color: 'var(--danger)' }} /> <h4>Alert Queue</h4>
        </div>
        <table>
          <thead><tr><th>ID</th><th>Business</th><th>Type</th><th>Severity</th><th>Date</th><th>Status</th><th></th></tr></thead>
          <tbody>
            {fraudAlerts.map(a => (
              <tr key={a.id}>
                <td style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem' }}>{a.id}</td>
                <td style={{ fontWeight: 500 }}>{a.business}</td>
                <td>{a.type}</td>
                <td><span className={`badge ${sevBadge[a.severity]}`}>{a.severity}</span></td>
                <td className="text-caption">{a.date}</td>
                <td><span className={`badge ${statusBadge[a.status]}`}>{a.status}</span></td>
                <td><button className="btn btn-ghost btn-sm"><Eye size={13} /> Investigate</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
