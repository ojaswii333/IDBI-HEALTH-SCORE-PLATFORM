import { modelAccuracyTrend } from '../../shared/data/adminData';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { AlertTriangle, CheckCircle2 } from 'lucide-react';

const psiData = [
  { feature: 'GST Filing Consistency', psi: 0.012, status: 'stable' },
  { feature: 'Monthly Revenue Trend', psi: 0.008, status: 'stable' },
  { feature: 'Payment Delay Index', psi: 0.045, status: 'warning' },
  { feature: 'UPI Transaction Volume', psi: 0.015, status: 'stable' },
  { feature: 'Cash Flow Stability', psi: 0.022, status: 'stable' },
  { feature: 'Supplier Concentration', psi: 0.068, status: 'alert' },
];

export default function DriftDetection() {
  return (
    <div className="animate-in">
      <div className="page-header"><h1>Drift Detection</h1><p>Monitor feature and concept drift in model inputs</p></div>
      <div className="card" style={{ marginBottom: 24 }}>
        <h4 style={{ marginBottom: 16 }}>Feature Drift Over Time</h4>
        <ResponsiveContainer width="100%" height={220}>
          <LineChart data={modelAccuracyTrend}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
            <XAxis dataKey="day" tick={{ fill: 'var(--text-muted)', fontSize: 9 }} interval={4} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: 'var(--text-muted)', fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={(v: number) => `${(v*100).toFixed(0)}%`} />
            <Tooltip contentStyle={{ background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: 8, fontSize: 12 }} />
            <Line type="monotone" dataKey="drift" stroke="#EF4444" strokeWidth={2} dot={false} name="Drift Score" />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ padding: '14px 20px', borderBottom: '1px solid var(--border)' }}><h4>Population Stability Index (PSI)</h4></div>
        <table>
          <thead><tr><th>Feature</th><th>PSI Score</th><th>Status</th><th>Action</th></tr></thead>
          <tbody>
            {psiData.map((f, i) => (
              <tr key={i}>
                <td style={{ fontWeight: 500 }}>{f.feature}</td>
                <td style={{ fontFamily: 'var(--font-mono)' }}>{f.psi.toFixed(3)}</td>
                <td>
                  {f.status === 'stable' && <span className="badge badge-success"><CheckCircle2 size={9} /> Stable</span>}
                  {f.status === 'warning' && <span className="badge badge-warning"><AlertTriangle size={9} /> Warning</span>}
                  {f.status === 'alert' && <span className="badge badge-danger"><AlertTriangle size={9} /> Alert</span>}
                </td>
                <td>{f.psi > 0.03 ? <button className="btn btn-ghost btn-sm">Investigate</button> : <span className="text-caption">No action needed</span>}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
