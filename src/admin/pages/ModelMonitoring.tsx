import { modelAccuracyTrend } from '../../shared/data/adminData';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

export default function ModelMonitoring() {
  return (
    <div className="animate-in">
      <div className="page-header"><h1>Model Monitoring</h1><p>Track model performance and prediction quality over time</p></div>
      <div className="grid grid-2" style={{ marginBottom: 24 }}>
        <div className="card">
          <h4 style={{ marginBottom: 16 }}>Model Accuracy (30 Days)</h4>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={modelAccuracyTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
              <XAxis dataKey="day" tick={{ fill: 'var(--text-muted)', fontSize: 9 }} interval={4} axisLine={false} tickLine={false} />
              <YAxis domain={[0.91, 0.96]} tick={{ fill: 'var(--text-muted)', fontSize: 10 }} axisLine={false} tickLine={false}
                tickFormatter={(v: number) => `${(v*100).toFixed(0)}%`} />
              <Tooltip contentStyle={{ background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: 8, fontSize: 12 }}
                formatter={((v: number) => [`${(v*100).toFixed(2)}%`, 'Accuracy']) as any} />
              <Area type="monotone" dataKey="accuracy" stroke="#22C55E" fill="#22C55E" fillOpacity={0.06} strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="card">
          <h4 style={{ marginBottom: 16 }}>Prediction Requests (30 Days)</h4>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={modelAccuracyTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
              <XAxis dataKey="day" tick={{ fill: 'var(--text-muted)', fontSize: 9 }} interval={4} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: 'var(--text-muted)', fontSize: 10 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: 8, fontSize: 12 }} />
              <Area type="monotone" dataKey="requests" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.06} strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="card">
        <h4 style={{ marginBottom: 16 }}>Model Drift Score</h4>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={modelAccuracyTrend}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
            <XAxis dataKey="day" tick={{ fill: 'var(--text-muted)', fontSize: 9 }} interval={4} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: 'var(--text-muted)', fontSize: 10 }} axisLine={false} tickLine={false}
              tickFormatter={(v: number) => `${(v*100).toFixed(0)}%`} />
            <Tooltip contentStyle={{ background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: 8, fontSize: 12 }} />
            <Line type="monotone" dataKey="drift" stroke="#EF4444" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
