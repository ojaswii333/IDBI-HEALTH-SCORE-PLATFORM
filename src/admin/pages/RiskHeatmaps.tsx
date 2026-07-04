import { riskHeatmap } from '../../shared/data/adminData';



export default function RiskHeatmaps() {
  return (
    <div className="animate-in">
      <div className="page-header"><h1>Risk Heatmaps</h1><p>Sector-wise risk distribution across the portfolio</p></div>
      <div className="card" style={{ padding: 0, overflow: 'hidden', marginBottom: 24 }}>
        <table>
          <thead><tr><th>Sector</th><th>Excellent</th><th>Good</th><th>Moderate</th><th>High Risk</th><th>Total</th></tr></thead>
          <tbody>
            {riskHeatmap.map((r, i) => {
              const total = r.excellent + r.good + r.moderate + r.highRisk;
              return (
                <tr key={i}>
                  <td style={{ fontWeight: 500 }}>{r.sector}</td>
                  {[r.excellent, r.good, r.moderate, r.highRisk].map((v, j) => (
                    <td key={j}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <div style={{ width: 28, height: 28, borderRadius: 6, background: ['var(--success-muted)', 'var(--info-muted)', 'var(--warning-muted)', 'var(--danger-muted)'][j], display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 600, color: ['var(--success)', 'var(--info)', 'var(--warning)', 'var(--danger)'][j] }}>
                          {v}
                        </div>
                      </div>
                    </td>
                  ))}
                  <td style={{ fontWeight: 600 }}>{total}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="card">
        <h4 style={{ marginBottom: 16 }}>Concentration Risk</h4>
        <div className="grid grid-4">
          {riskHeatmap.map((r, i) => {
            const total = r.excellent + r.good + r.moderate + r.highRisk;
            const riskPct = Math.round((r.highRisk / total) * 100);
            return (
              <div key={i} style={{ padding: 12, background: 'var(--bg-app)', borderRadius: 8 }}>
                <div style={{ fontSize: '0.8125rem', fontWeight: 500, marginBottom: 8 }}>{r.sector}</div>
                <div className="progress" style={{ height: 6, marginBottom: 4 }}>
                  <div className="progress-fill" style={{ width: `${riskPct}%`, background: riskPct > 20 ? 'var(--danger)' : 'var(--success)' }} />
                </div>
                <span className="text-caption">{riskPct}% high risk</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
