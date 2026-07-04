import { apiMetrics } from '../../shared/data/adminData';
import { Activity, Zap, AlertCircle } from 'lucide-react';

export default function ApiMonitoring() {
  return (
    <div className="animate-in">
      <div className="page-header"><h1>API Monitoring</h1><p>Real-time telemetry for platform API endpoints</p></div>
      <div className="grid grid-4" style={{ marginBottom: 24 }}>
        {[
          { label: 'Total Calls (24h)', value: apiMetrics.totalCalls.toLocaleString(), icon: Activity, color: 'var(--text-primary)' },
          { label: 'Avg Latency', value: `${apiMetrics.avgLatency}ms`, icon: Zap, color: 'var(--info)' },
          { label: 'Error Rate', value: `${apiMetrics.errorRate}%`, icon: AlertCircle, color: 'var(--danger)' },
          { label: 'Uptime', value: `${apiMetrics.uptime}%`, icon: Zap, color: 'var(--success)' },
        ].map((m, i) => (
          <div key={i} className="card" style={{ padding: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
              <m.icon size={14} style={{ color: 'var(--text-muted)' }} />
              <span className="metric-label">{m.label}</span>
            </div>
            <div className="metric-value" style={{ color: m.color, fontSize: '1.25rem' }}>{m.value}</div>
          </div>
        ))}
      </div>
      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <table>
          <thead><tr><th>Endpoint</th><th>Calls (24h)</th><th>Avg Latency</th><th>Errors</th><th>Status</th></tr></thead>
          <tbody>
            {apiMetrics.endpoints.map((e, i) => (
              <tr key={i}>
                <td style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8125rem' }}>{e.path}</td>
                <td style={{ fontFamily: 'var(--font-mono)' }}>{e.calls.toLocaleString()}</td>
                <td style={{ fontFamily: 'var(--font-mono)', color: e.avgMs > 500 ? 'var(--warning)' : 'var(--text-primary)' }}>{e.avgMs}ms</td>
                <td style={{ fontFamily: 'var(--font-mono)', color: e.errors > 10 ? 'var(--danger)' : 'var(--text-primary)' }}>{e.errors}</td>
                <td>
                  {e.errors > 10 ? <span className="badge badge-danger">High Error Rate</span> : e.avgMs > 500 ? <span className="badge badge-warning">High Latency</span> : <span className="badge badge-success">Healthy</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
