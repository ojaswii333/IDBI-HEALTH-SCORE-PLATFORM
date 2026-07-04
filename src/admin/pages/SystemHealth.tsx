import { systemServices, systemHealth } from '../../shared/data/adminData';
import { Server, Database, Brain, Activity, CheckCircle2, AlertTriangle, XCircle } from 'lucide-react';

const statusIcon: Record<string, typeof CheckCircle2> = { healthy: CheckCircle2, degraded: AlertTriangle, down: XCircle };
const statusBadge: Record<string, string> = { healthy: 'badge-success', degraded: 'badge-warning', down: 'badge-danger' };

export default function SystemHealth() {
  return (
    <div className="animate-in">
      <div className="page-header"><h1>System Health</h1><p>Infrastructure resources and microservice statuses</p></div>
      <div className="grid grid-4" style={{ marginBottom: 24 }}>
        {[
          { label: 'CPU Usage', value: systemHealth.cpu, icon: Server },
          { label: 'Memory', value: systemHealth.memory, icon: Database },
          { label: 'Disk Space', value: systemHealth.disk, icon: Server },
          { label: 'GPU (Inference)', value: systemHealth.gpu, icon: Brain },
        ].map((m, i) => (
          <div key={i} className="card" style={{ padding: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 12 }}>
              <m.icon size={14} style={{ color: 'var(--text-muted)' }} />
              <span className="metric-label">{m.label}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8, marginBottom: 6 }}>
              <div style={{ fontSize: '1.5rem', fontWeight: 700, lineHeight: 1 }}>{m.value}%</div>
            </div>
            <div className="progress" style={{ height: 4 }}>
              <div className="progress-fill" style={{ width: `${m.value}%`, background: m.value > 80 ? 'var(--danger)' : m.value > 60 ? 'var(--warning)' : 'var(--success)' }} />
            </div>
          </div>
        ))}
      </div>
      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ padding: '14px 20px', borderBottom: '1px solid var(--border)' }}>
          <h4 style={{ display: 'flex', alignItems: 'center', gap: 8 }}><Activity size={16} /> Services</h4>
        </div>
        <table>
          <thead><tr><th>Service</th><th>Status</th><th>Uptime</th><th>Latency</th></tr></thead>
          <tbody>
            {systemServices.map((s, i) => {
              const Icon = statusIcon[s.status];
              return (
                <tr key={i}>
                  <td style={{ fontWeight: 500 }}>{s.name}</td>
                  <td><span className={`badge ${statusBadge[s.status]}`}><Icon size={9} /> {s.status}</span></td>
                  <td style={{ fontFamily: 'var(--font-mono)' }}>{s.uptime}</td>
                  <td style={{ fontFamily: 'var(--font-mono)' }}>{s.latency}ms</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
