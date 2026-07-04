import { useState } from 'react';
import Header from '../components/layout/Header';
import Sidebar from '../components/layout/Sidebar';
import { officerDashboardData, generateProfiles } from '../data/mockData';
import {
  CheckCircle2, XCircle, Clock, AlertTriangle, TrendingUp, Search,
  Eye, ThumbsUp, ThumbsDown
} from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts';

const d = officerDashboardData;
const profiles = generateProfiles(20);
const COLORS = ['#F58220','#00836C','#3B82F6','#8B5CF6','#EC4899','#F59E0B','#10B981','#EF4444','#06B6D4','#6366F1'];

export default function OfficerDashboard() {
  const [searchQ, setSearchQ] = useState('');
  const [tab, setTab] = useState<'all'|'approved'|'pending'|'rejected'>('all');

  const filtered = profiles.filter(p => {
    const matchSearch = !searchQ || p.name.toLowerCase().includes(searchQ.toLowerCase()) || p.id.toLowerCase().includes(searchQ.toLowerCase());
    const matchTab = tab === 'all' || p.status.toLowerCase() === tab;
    return matchSearch && matchTab;
  });

  const portfolioData = [
    { name: 'Excellent', value: 45, color: '#10B981' },
    { name: 'Good', value: 62, color: '#3B82F6' },
    { name: 'Moderate', value: 35, color: '#F59E0B' },
    { name: 'High Risk', value: 15, color: '#EF4444' },
  ];

  return (
    <div className="app-layout">
      <Sidebar />
      <div className="app-main">
        <Header title="Officer Dashboard" />
        <div className="page-content">
          {/* KPIs */}
          <div className="grid grid-5" style={{ marginBottom: 32 }}>
            {[
              { label: 'Total Applications', value: d.totalApplications, icon: TrendingUp, color: '#3B82F6' },
              { label: 'Approved', value: d.approved, icon: CheckCircle2, color: '#10B981' },
              { label: 'Rejected', value: d.rejected, icon: XCircle, color: '#EF4444' },
              { label: 'Pending', value: d.pending, icon: Clock, color: '#F59E0B' },
              { label: 'Avg Score', value: d.avgScore, icon: TrendingUp, color: '#F58220' },
            ].map((kpi, i) => (
              <div key={i} className="card" style={{ padding: '20px 18px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                  <div style={{
                    width: 36, height: 36, borderRadius: 10,
                    background: `${kpi.color}12`, display: 'flex',
                    alignItems: 'center', justifyContent: 'center',
                  }}>
                    <kpi.icon size={18} style={{ color: kpi.color }} />
                  </div>
                </div>
                <div style={{ fontSize: '1.75rem', fontWeight: 800, letterSpacing: '-0.02em' }}>{kpi.value}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', marginTop: 2 }}>{kpi.label}</div>
              </div>
            ))}
          </div>

          <div className="grid grid-2" style={{ marginBottom: 32 }}>
            {/* Approval Funnel */}
            <div className="card">
              <h4 style={{ marginBottom: 20 }}>Approval Funnel</h4>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={d.approvalFunnel} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" horizontal={false} />
                  <XAxis type="number" tick={{ fill: '#5A6478', fontSize: 10 }} />
                  <YAxis type="category" dataKey="stage" tick={{ fill: '#8B95A8', fontSize: 11 }} width={120} />
                  <Tooltip contentStyle={{ background: '#0F1A2E', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8 }} />
                  <Bar dataKey="value" radius={[0, 6, 6, 0]}>
                    {d.approvalFunnel.map((_, i) => (
                      <Cell key={i} fill={COLORS[i]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Portfolio Quality */}
            <div className="card">
              <h4 style={{ marginBottom: 20 }}>Portfolio Quality</h4>
              <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
                <ResponsiveContainer width="50%" height={220}>
                  <PieChart>
                    <Pie data={portfolioData} dataKey="value" cx="50%" cy="50%" innerRadius={50} outerRadius={85}
                      paddingAngle={3} stroke="none">
                      {portfolioData.map((e, i) => <Cell key={i} fill={e.color} />)}
                    </Pie>
                    <Tooltip contentStyle={{ background: '#0F1A2E', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8 }} />
                  </PieChart>
                </ResponsiveContainer>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {portfolioData.map((d, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.8125rem' }}>
                      <div style={{ width: 8, height: 8, borderRadius: 2, background: d.color }} />
                      <span style={{ color: 'var(--text-secondary)' }}>{d.name}</span>
                      <span style={{ fontWeight: 600, marginLeft: 'auto' }}>{d.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-2" style={{ marginBottom: 32 }}>
            {/* Sector Distribution */}
            <div className="card">
              <h4 style={{ marginBottom: 20 }}>Sector Distribution</h4>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={d.sectorDistribution.slice(0, 8)}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                  <XAxis dataKey="name" tick={{ fill: '#8B95A8', fontSize: 9 }} angle={-30} textAnchor="end" height={60} />
                  <YAxis tick={{ fill: '#5A6478', fontSize: 10 }} />
                  <Tooltip contentStyle={{ background: '#0F1A2E', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8 }} />
                  <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                    {d.sectorDistribution.slice(0, 8).map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* State Distribution */}
            <div className="card">
              <h4 style={{ marginBottom: 20 }}>State Distribution</h4>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={d.stateDistribution} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" horizontal={false} />
                  <XAxis type="number" tick={{ fill: '#5A6478', fontSize: 10 }} />
                  <YAxis type="category" dataKey="state" tick={{ fill: '#8B95A8', fontSize: 11 }} width={90} />
                  <Tooltip contentStyle={{ background: '#0F1A2E', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8 }} />
                  <Bar dataKey="count" fill="#00836C" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Fraud Alerts */}
          <div className="card" style={{ marginBottom: 32, padding: 0, overflow: 'hidden' }}>
            <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center', gap: 8 }}>
              <AlertTriangle size={16} style={{ color: '#EF4444' }} />
              <h4>Fraud Alerts</h4>
            </div>
            {d.fraudAlerts.map((a, i) => (
              <div key={i} style={{
                padding: '14px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                borderBottom: i < d.fraudAlerts.length - 1 ? '1px solid var(--border-subtle)' : 'none',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <span className={`badge badge-${a.severity === 'high' ? 'danger' : 'warning'}`}>
                    {a.severity.toUpperCase()}
                  </span>
                  <span style={{ fontWeight: 500, fontSize: '0.875rem' }}>{a.business}</span>
                  <span style={{ color: 'var(--text-tertiary)', fontSize: '0.8125rem' }}>{a.type}</span>
                </div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>{a.date}</span>
              </div>
            ))}
          </div>

          {/* Applications Table */}
          <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
            <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border-subtle)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h4>MSME Applications</h4>
              <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <div style={{
                  display: 'flex', alignItems: 'center', gap: 6, padding: '6px 12px',
                  background: 'var(--bg-glass)', borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--border-subtle)',
                }}>
                  <Search size={14} style={{ color: 'var(--text-tertiary)' }} />
                  <input value={searchQ} onChange={e => setSearchQ(e.target.value)}
                    placeholder="Search..." style={{
                      background: 'none', border: 'none', outline: 'none',
                      color: 'var(--text-primary)', fontSize: '0.8125rem',
                      fontFamily: 'var(--font-family)', width: 140,
                    }} />
                </div>
                <div className="tabs">
                  {(['all','approved','pending','rejected'] as const).map(t => (
                    <button key={t} className={`tab ${tab === t ? 'active' : ''}`} onClick={() => setTab(t)}
                      style={{ textTransform: 'capitalize', fontSize: '0.75rem', padding: '6px 10px' }}>
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="table-container" style={{ border: 'none', borderRadius: 0 }}>
              <table>
                <thead>
                  <tr>
                    <th>ID</th><th>Business</th><th>Sector</th><th>Score</th><th>Rating</th><th>Status</th><th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((p, i) => (
                    <tr key={i}>
                      <td style={{ fontFamily: 'monospace', fontSize: '0.8125rem' }}>{p.id}</td>
                      <td style={{ fontWeight: 500 }}>{p.name}</td>
                      <td>{p.sector}</td>
                      <td style={{ fontWeight: 700, color: p.score >= 650 ? '#10B981' : p.score >= 500 ? '#F59E0B' : '#EF4444' }}>{p.score}</td>
                      <td><span className={`badge badge-${p.rating === 'Excellent' ? 'success' : p.rating === 'Good' ? 'info' : p.rating === 'Moderate' ? 'warning' : 'danger'}`}>{p.rating}</span></td>
                      <td><span className={`badge badge-${p.status === 'Approved' ? 'success' : p.status === 'Rejected' ? 'danger' : 'warning'}`}>{p.status}</span></td>
                      <td>
                        <div style={{ display: 'flex', gap: 4 }}>
                          <button className="btn btn-icon btn-ghost btn-sm"><Eye size={14} /></button>
                          <button className="btn btn-icon btn-ghost btn-sm" style={{ color: '#10B981' }}><ThumbsUp size={14} /></button>
                          <button className="btn btn-icon btn-ghost btn-sm" style={{ color: '#EF4444' }}><ThumbsDown size={14} /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Timeline */}
          <div className="card" style={{ marginTop: 32 }}>
            <h4 style={{ marginBottom: 20 }}>Recent Activity</h4>
            {d.recentActivity.map((a, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'flex-start', gap: 12, padding: '10px 0',
                borderBottom: i < d.recentActivity.length - 1 ? '1px solid var(--border-subtle)' : 'none',
              }}>
                <div style={{
                  width: 8, height: 8, borderRadius: '50%', marginTop: 6, flexShrink: 0,
                  background: a.type === 'success' ? '#10B981' : a.type === 'danger' ? '#EF4444' : a.type === 'warning' ? '#F59E0B' : '#3B82F6',
                }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '0.8125rem' }}>{a.action}</div>
                  <div style={{ fontSize: '0.6875rem', color: 'var(--text-tertiary)', marginTop: 2 }}>{a.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
