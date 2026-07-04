import { shapFeatures } from '../../shared/data/adminData';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

export default function ExplainableAI() {
  const positive = shapFeatures.filter(f => f.value > 0).sort((a, b) => b.value - a.value);
  const negative = shapFeatures.filter(f => f.value < 0).sort((a, b) => a.value - b.value);
  const allSorted = [...positive, ...negative];

  return (
    <div className="animate-in">
      <div className="page-header"><h1>Explainable AI</h1><p>SHAP-based model explanations for individual predictions</p></div>

      <div className="card" style={{ marginBottom: 24 }}>
        <h4 style={{ marginBottom: 16 }}>SHAP Feature Contributions — MSME0001 (Raj Industries)</h4>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={allSorted} layout="vertical" margin={{ left: 140 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" horizontal={false} />
            <XAxis type="number" tick={{ fill: 'var(--text-muted)', fontSize: 10 }} axisLine={false} tickLine={false}
              tickFormatter={(v: number) => `${v > 0 ? '+' : ''}${(v * 100).toFixed(0)}%`} />
            <YAxis dataKey="name" type="category" tick={{ fill: 'var(--text-secondary)', fontSize: 11 }} axisLine={false} tickLine={false} width={140} />
            <Tooltip contentStyle={{ background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: 8, fontSize: 12 }}
              formatter={((v: number) => [`${v > 0 ? '+' : ''}${(v * 100).toFixed(1)}%`, 'Impact']) as any} />
            <Bar dataKey="value" radius={[0, 4, 4, 0]}>
              {allSorted.map((f, i) => <Cell key={i} fill={f.value >= 0 ? '#22C55E' : '#EF4444'} />)}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-2">
        <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
          <div style={{ padding: '12px 20px', borderBottom: '1px solid var(--border)', background: 'var(--success-muted)' }}>
            <h4 style={{ fontSize: '0.875rem', color: 'var(--success)' }}>Positive Contributors</h4>
          </div>
          {positive.map((f, i) => (
            <div key={i} style={{ padding: '10px 20px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '0.8125rem' }}>{f.name}</span>
              <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--success)', fontFamily: 'var(--font-mono)' }}>+{(f.value * 100).toFixed(1)}%</span>
            </div>
          ))}
        </div>
        <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
          <div style={{ padding: '12px 20px', borderBottom: '1px solid var(--border)', background: 'var(--danger-muted)' }}>
            <h4 style={{ fontSize: '0.875rem', color: 'var(--danger)' }}>Negative Contributors</h4>
          </div>
          {negative.map((f, i) => (
            <div key={i} style={{ padding: '10px 20px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '0.8125rem' }}>{f.name}</span>
              <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--danger)', fontFamily: 'var(--font-mono)' }}>{(f.value * 100).toFixed(1)}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
