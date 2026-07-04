import { businessProfile, connectedSources } from '../../shared/data/customerData';
import { useTheme } from '../../auth/ThemeContext';
import { CheckCircle2, Clock, Sun, Moon } from 'lucide-react';

export default function CustomerSettings() {
  const { theme, toggle } = useTheme();
  const b = businessProfile;

  return (
    <div className="animate-in">
      <div className="page-header"><h1>Settings</h1><p>Manage your profile and preferences</p></div>

      {/* Business Profile */}
      <div className="card" style={{ marginBottom: 24 }}>
        <h3 style={{ fontSize: '1rem', marginBottom: 16 }}>Business Profile</h3>
        <div className="grid grid-2" style={{ gap: 20 }}>
          {[
            { label: 'Business Name', value: b.name },
            { label: 'GSTIN', value: b.gstin },
            { label: 'Udyam', value: b.udyam },
            { label: 'PAN', value: b.pan },
            { label: 'Sector', value: b.sector },
            { label: 'Location', value: `${b.city}, ${b.state}` },
            { label: 'Contact Person', value: b.contactPerson },
            { label: 'Email', value: b.email },
          ].map((f, i) => (
            <div key={i}>
              <div className="text-caption" style={{ marginBottom: 4 }}>{f.label}</div>
              <div style={{ fontSize: '0.875rem', fontWeight: 500 }}>{f.value}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Theme */}
      <div className="card" style={{ marginBottom: 24 }}>
        <h3 style={{ fontSize: '1rem', marginBottom: 16 }}>Appearance</h3>
        <div style={{ display: 'flex', gap: 12 }}>
          {([['dark', Moon, 'Dark'] as const, ['light', Sun, 'Light'] as const]).map(([t, Icon, label]) => (
            <button key={t} onClick={toggle} style={{
              padding: '12px 24px', borderRadius: 8, border: '1px solid',
              borderColor: theme === t ? 'var(--accent)' : 'var(--border)',
              background: theme === t ? 'var(--accent-muted)' : 'transparent',
              color: theme === t ? 'var(--accent)' : 'var(--text-secondary)',
              cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8,
              fontFamily: 'var(--font)', fontSize: '0.8125rem', fontWeight: 500,
            }}>
              <Icon size={16} /> {label}
            </button>
          ))}
        </div>
      </div>

      {/* Connected Sources */}
      <div className="card">
        <h3 style={{ fontSize: '1rem', marginBottom: 16 }}>Connected Data Sources</h3>
        <table>
          <thead><tr><th>Source</th><th>Status</th><th>Last Sync</th><th>Records</th></tr></thead>
          <tbody>
            {connectedSources.map((s, i) => (
              <tr key={i}>
                <td style={{ fontWeight: 500 }}>{s.name}</td>
                <td>
                  {s.status === 'connected' ? (
                    <span className="badge badge-success"><CheckCircle2 size={9} /> Connected</span>
                  ) : (
                    <span className="badge badge-warning"><Clock size={9} /> Pending</span>
                  )}
                </td>
                <td className="text-caption">{s.lastSync}</td>
                <td style={{ fontFamily: 'var(--font-mono)' }}>{s.records.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
