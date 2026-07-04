import { globalFeatureImportance } from '../../shared/data/adminData';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const categories = [...new Set(globalFeatureImportance.map(f => f.category))];

export default function FeatureImportance() {
  return (
    <div className="animate-in">
      <div className="page-header"><h1>Feature Importance</h1><p>Global feature importance rankings from the active model</p></div>
      <div className="card" style={{ marginBottom: 24 }}>
        <h4 style={{ marginBottom: 16 }}>Top 15 Features by Importance</h4>
        <ResponsiveContainer width="100%" height={420}>
          <BarChart data={globalFeatureImportance} layout="vertical" margin={{ left: 160 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" horizontal={false} />
            <XAxis type="number" tick={{ fill: 'var(--text-muted)', fontSize: 10 }} axisLine={false} tickLine={false} />
            <YAxis dataKey="name" type="category" tick={{ fill: 'var(--text-secondary)', fontSize: 11 }} axisLine={false} tickLine={false} width={160} />
            <Tooltip contentStyle={{ background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: 8, fontSize: 12 }} />
            <Bar dataKey="importance" fill="#F58220" radius={[0, 4, 4, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="card">
        <h4 style={{ marginBottom: 16 }}>Features by Category</h4>
        <div className="grid grid-3">
          {categories.map(cat => (
            <div key={cat} style={{ padding: 12, background: 'var(--bg-app)', borderRadius: 8 }}>
              <div className="text-overline" style={{ marginBottom: 8 }}>{cat}</div>
              {globalFeatureImportance.filter(f => f.category === cat).map((f, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0' }}>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{f.name}</span>
                  <span style={{ fontSize: '0.75rem', fontWeight: 600, fontFamily: 'var(--font-mono)' }}>{(f.importance * 100).toFixed(1)}%</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
