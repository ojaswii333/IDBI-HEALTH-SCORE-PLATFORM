import { portfolioKPIs, scoreDistribution, approvalFunnel, sectorBreakdown, recentActivity } from '../../shared/data/adminData';
import { Users, FileCheck, TrendingUp, Target, Banknote, ArrowUpRight } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function Dashboard() {
  const k = portfolioKPIs;
  return (
    <div className="animate-in">
      <div className="page-header"><h1>Portfolio Dashboard</h1><p>Overview of MSME portfolio health and application pipeline</p></div>

      <div className="grid grid-5" style={{ marginBottom: 24 }}>
        {[
          { label: 'Total MSMEs', value: k.totalMSMEs.toLocaleString(), icon: Users, trend: '+12 this month' },
          { label: 'Active Applications', value: k.activeApplications, icon: FileCheck, trend: '53 pending' },
          { label: 'Approval Rate', value: `${k.approvalRate}%`, icon: Target, trend: '+2.1% MoM' },
          { label: 'Avg Health Score', value: k.avgScore, icon: TrendingUp, trend: '+8 pts QoQ' },
          { label: 'Portfolio Value', value: `₹${(k.portfolioValue / 10000000).toFixed(1)}Cr`, icon: Banknote, trend: '+₹1.2Cr' },
        ].map((kpi, i) => (
          <div key={i} className="card" style={{ padding: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 10 }}>
              <kpi.icon size={14} style={{ color: 'var(--text-muted)' }} />
              <span className="metric-label">{kpi.label}</span>
            </div>
            <div className="metric-value" style={{ fontSize: '1.25rem' }}>{kpi.value}</div>
            <div className="metric-trend up" style={{ marginTop: 4 }}><ArrowUpRight size={11} /> {kpi.trend}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-2" style={{ marginBottom: 24 }}>
        <div className="card">
          <h4 style={{ marginBottom: 16 }}>Score Distribution</h4>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={scoreDistribution}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
              <XAxis dataKey="range" tick={{ fill: 'var(--text-muted)', fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: 'var(--text-muted)', fontSize: 10 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: 8, fontSize: 12 }} />
              <Bar dataKey="count" fill="#3B82F6" radius={[4,4,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="card">
          <h4 style={{ marginBottom: 16 }}>Approval Funnel</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {approvalFunnel.map((s, i) => {
              const pct = (s.value / approvalFunnel[0].value) * 100;
              return (
                <div key={i}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                    <span style={{ fontSize: '0.8125rem' }}>{s.stage}</span>
                    <span style={{ fontSize: '0.8125rem', fontWeight: 600 }}>{s.value}</span>
                  </div>
                  <div className="progress" style={{ height: 6 }}>
                    <div className="progress-fill" style={{ width: `${pct}%`, background: `hsl(${200 + i * 20}, 70%, 55%)` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="grid grid-2">
        <div className="card">
          <h4 style={{ marginBottom: 16 }}>Sector Breakdown</h4>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={sectorBreakdown.slice(0, 8)} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" horizontal={false} />
              <XAxis type="number" tick={{ fill: 'var(--text-muted)', fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis dataKey="name" type="category" tick={{ fill: 'var(--text-muted)', fontSize: 10 }} axisLine={false} tickLine={false} width={90} />
              <Tooltip contentStyle={{ background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: 8, fontSize: 12 }} />
              <Bar dataKey="count" fill="#F58220" radius={[0,4,4,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
          <div style={{ padding: '14px 20px', borderBottom: '1px solid var(--border)' }}><h4>Recent Activity</h4></div>
          {recentActivity.map((a, i) => (
            <div key={i} style={{ padding: '10px 20px', borderBottom: '1px solid var(--border)', display: 'flex', gap: 10, alignItems: 'flex-start' }}>
              <div style={{ width: 6, height: 6, borderRadius: 3, marginTop: 6, flexShrink: 0,
                background: a.type === 'success' ? 'var(--success)' : a.type === 'danger' ? 'var(--danger)' : a.type === 'warning' ? 'var(--warning)' : 'var(--info)' }} />
              <div>
                <div style={{ fontSize: '0.8125rem' }}>{a.action}</div>
                <div className="text-caption">{a.time}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
