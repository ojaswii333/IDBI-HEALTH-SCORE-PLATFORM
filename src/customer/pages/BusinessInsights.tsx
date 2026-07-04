import { insightsData } from '../../shared/data/customerData';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const pieColors = ['#F58220', '#3B82F6', '#22C55E', '#8B5CF6', '#EAB308', '#71717A'];

export default function BusinessInsights() {
  const d = insightsData;
  return (
    <div className="animate-in">
      <div className="page-header"><h1>Business Insights</h1><p>Data-driven analytics from your connected financial sources</p></div>

      <div className="grid grid-2" style={{ marginBottom: 24 }}>
        <div className="card">
          <h4 style={{ marginBottom: 16 }}>Revenue Trend (6 Months)</h4>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={d.revenue}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
              <XAxis dataKey="month" tick={{ fill: 'var(--text-muted)', fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: 'var(--text-muted)', fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={(v: number) => `₹${(v/100000).toFixed(0)}L`} />
              <Tooltip contentStyle={{ background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: 8, fontSize: 12 }} formatter={((v: number) => [`₹${(v/100000).toFixed(1)}L`, 'Revenue']) as any} />
              <Area type="monotone" dataKey="value" stroke="#F58220" fill="#F58220" fillOpacity={0.08} strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="card">
          <h4 style={{ marginBottom: 16 }}>Cash Flow (Inflow vs Outflow)</h4>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={d.cashFlow}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
              <XAxis dataKey="month" tick={{ fill: 'var(--text-muted)', fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: 'var(--text-muted)', fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={(v: number) => `₹${(v/100000).toFixed(0)}L`} />
              <Tooltip contentStyle={{ background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: 8, fontSize: 12 }} />
              <Bar dataKey="inflow" fill="#22C55E" radius={[3,3,0,0]} name="Inflow" />
              <Bar dataKey="outflow" fill="#EF4444" radius={[3,3,0,0]} name="Outflow" opacity={0.6} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-2">
        <div className="card">
          <h4 style={{ marginBottom: 16 }}>Expense Breakdown</h4>
          <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
            <ResponsiveContainer width={180} height={180}>
              <PieChart>
                <Pie data={d.expenses} dataKey="value" cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={2}>
                  {d.expenses.map((_, i) => <Cell key={i} fill={pieColors[i]} />)}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, flex: 1 }}>
              {d.expenses.map((e, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{ width: 8, height: 8, borderRadius: 2, background: pieColors[i], flexShrink: 0 }} />
                  <span style={{ fontSize: '0.8125rem', flex: 1 }}>{e.name}</span>
                  <span style={{ fontSize: '0.8125rem', fontWeight: 600 }}>{e.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="card">
          <h4 style={{ marginBottom: 16 }}>Peer Comparison (Industry Avg)</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {d.peerComparison.map((p, i) => (
              <div key={i}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                  <span style={{ fontSize: '0.8125rem' }}>{p.metric}</span>
                  <span style={{ fontSize: '0.75rem', fontWeight: 600, color: p.you > p.industry ? 'var(--success)' : 'var(--danger)' }}>
                    {p.you > p.industry ? '+' : ''}{p.you - p.industry}
                  </span>
                </div>
                <div style={{ display: 'flex', gap: 4, height: 6 }}>
                  <div style={{ flex: p.you, background: '#3B82F6', borderRadius: 3 }} title={`You: ${p.you}`} />
                  <div style={{ flex: 100 - p.you, background: 'var(--bg-elevated)', borderRadius: 3 }} />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
                  <span className="text-caption">You: {p.you}</span>
                  <span className="text-caption">Industry: {p.industry}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
