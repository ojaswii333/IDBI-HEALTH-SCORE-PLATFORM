import { modelBenchmarks, rocCurveData } from '../../shared/data/adminData';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Trophy } from 'lucide-react';

export default function Benchmarking() {
  return (
    <div className="animate-in">
      <div className="page-header"><h1>Model Benchmarking</h1><p>Compare model performance across all trained algorithms</p></div>
      <div className="card" style={{ padding: 0, overflow: 'hidden', marginBottom: 24 }}>
        <table>
          <thead>
            <tr><th>Model</th><th>Accuracy</th><th>Precision</th><th>Recall</th><th>F1</th><th>ROC-AUC</th><th>PR-AUC</th><th>Latency</th><th>Status</th></tr>
          </thead>
          <tbody>
            {modelBenchmarks.map(m => (
              <tr key={m.name} style={{ background: m.isActive ? 'var(--accent-muted)' : undefined }}>
                <td style={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6 }}>
                  <div style={{ width: 8, height: 8, borderRadius: 2, background: m.color }} /> {m.name}
                </td>
                <td style={{ fontFamily: 'var(--font-mono)' }}>{(m.accuracy * 100).toFixed(1)}%</td>
                <td style={{ fontFamily: 'var(--font-mono)' }}>{(m.precision * 100).toFixed(1)}%</td>
                <td style={{ fontFamily: 'var(--font-mono)' }}>{(m.recall * 100).toFixed(1)}%</td>
                <td style={{ fontFamily: 'var(--font-mono)' }}>{(m.f1 * 100).toFixed(1)}%</td>
                <td style={{ fontFamily: 'var(--font-mono)', fontWeight: 700 }}>{(m.rocAuc * 100).toFixed(1)}%</td>
                <td style={{ fontFamily: 'var(--font-mono)' }}>{(m.prAuc * 100).toFixed(1)}%</td>
                <td style={{ fontFamily: 'var(--font-mono)' }}>{m.latencyMs}ms</td>
                <td>{m.isActive ? <span className="badge badge-success"><Trophy size={9} /> Active</span> : <span className="badge badge-neutral">Archived</span>}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="card">
        <h4 style={{ marginBottom: 16 }}>ROC Curves</h4>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={rocCurveData}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
            <XAxis dataKey="fpr" tick={{ fill: 'var(--text-muted)', fontSize: 10 }} axisLine={false} tickLine={false} label={{ value: 'False Positive Rate', position: 'bottom', fontSize: 11, fill: 'var(--text-muted)' }} />
            <YAxis tick={{ fill: 'var(--text-muted)', fontSize: 10 }} axisLine={false} tickLine={false} label={{ value: 'True Positive Rate', angle: -90, position: 'insideLeft', fontSize: 11, fill: 'var(--text-muted)' }} />
            <Tooltip contentStyle={{ background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: 8, fontSize: 12 }} />
            {modelBenchmarks.map(m => (
              <Line key={m.name} type="monotone" dataKey={m.name.toLowerCase().replace(/\s/g, '')} stroke={m.color} strokeWidth={m.isActive ? 3 : 1.5} dot={false} name={m.name} />
            ))}
            <Line type="monotone" dataKey="random" stroke="var(--text-muted)" strokeDasharray="5 5" dot={false} name="Random" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
