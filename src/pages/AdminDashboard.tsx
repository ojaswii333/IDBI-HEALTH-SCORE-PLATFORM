import { useState } from 'react';
import Header from '../components/layout/Header';
import Sidebar from '../components/layout/Sidebar';
import { adminDashboardData as d } from '../data/mockData';
import {
  Users, Activity, Server, Database, Cpu, HardDrive, Shield
} from 'lucide-react';
import {
  Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, AreaChart, Area
} from 'recharts';

export default function AdminDashboard() {
  const [logFilter, setLogFilter] = useState('all');

  const filteredLogs = d.logs.filter(l => logFilter === 'all' || l.level === logFilter.toUpperCase());

  return (
    <div className="app-layout">
      <Sidebar />
      <div className="app-main">
        <Header title="Admin Dashboard" />
        <div className="page-content">
          {/* User Management */}
          <div className="grid grid-4" style={{ marginBottom: 32 }}>
            {[
              { label: 'Total Users', value: d.users.total, icon: Users, color: '#3B82F6' },
              { label: 'Officers', value: d.users.officers, icon: Shield, color: '#F58220' },
              { label: 'MSME Users', value: d.users.msme, icon: Database, color: '#00836C' },
              { label: 'Admins', value: d.users.admins, icon: Cpu, color: '#8B5CF6' },
            ].map((kpi, i) => (
              <div key={i} className="card" style={{ padding: '20px 18px' }}>
                <div style={{
                  width: 36, height: 36, borderRadius: 10, marginBottom: 12,
                  background: `${kpi.color}12`, display: 'flex',
                  alignItems: 'center', justifyContent: 'center',
                }}>
                  <kpi.icon size={18} style={{ color: kpi.color }} />
                </div>
                <div style={{ fontSize: '1.75rem', fontWeight: 800 }}>{kpi.value}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', marginTop: 2 }}>{kpi.label}</div>
              </div>
            ))}
          </div>

          {/* API Metrics */}
          <div className="grid grid-4" style={{ marginBottom: 32 }}>
            {[
              { label: 'Total API Calls', value: d.apiMetrics.totalCalls.toLocaleString(), color: '#3B82F6' },
              { label: 'Avg Latency', value: `${d.apiMetrics.avgLatency}ms`, color: '#F59E0B' },
              { label: 'Error Rate', value: `${d.apiMetrics.errorRate}%`, color: '#EF4444' },
              { label: 'Uptime', value: `${d.apiMetrics.uptime}%`, color: '#10B981' },
            ].map((m, i) => (
              <div key={i} className="card" style={{ textAlign: 'center', padding: '20px 16px' }}>
                <div style={{ fontSize: '1.5rem', fontWeight: 800, color: m.color }}>{m.value}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', marginTop: 4 }}>{m.label}</div>
              </div>
            ))}
          </div>

          <div className="grid grid-2" style={{ marginBottom: 32 }}>
            {/* Model Accuracy Trend */}
            <div className="card">
              <h4 style={{ marginBottom: 20 }}>Model Accuracy Trend</h4>
              <ResponsiveContainer width="100%" height={250}>
                <AreaChart data={d.modelMetrics}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                  <XAxis dataKey="day" tick={{ fill: '#5A6478', fontSize: 9 }} interval={4} />
                  <YAxis domain={[0.9, 0.96]} tick={{ fill: '#5A6478', fontSize: 10 }}
                    tickFormatter={(v: number) => `${(v*100).toFixed(0)}%`} />
                  <Tooltip contentStyle={{ background: '#0F1A2E', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8 }}
                    formatter={((v: number) => [`${(v*100).toFixed(2)}%`, 'Accuracy']) as any} />
                  <Area type="monotone" dataKey="accuracy" stroke="#F58220" fill="#F58220" fillOpacity={0.08} strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Model Drift */}
            <div className="card">
              <h4 style={{ marginBottom: 20 }}>Model Drift Detection</h4>
              <ResponsiveContainer width="100%" height={250}>
                <AreaChart data={d.modelMetrics}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                  <XAxis dataKey="day" tick={{ fill: '#5A6478', fontSize: 9 }} interval={4} />
                  <YAxis tick={{ fill: '#5A6478', fontSize: 10 }}
                    tickFormatter={(v: number) => `${(v*100).toFixed(0)}%`} />
                  <Tooltip contentStyle={{ background: '#0F1A2E', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8 }}
                    formatter={((v: number) => [`${(v*100).toFixed(2)}%`, 'Drift']) as any} />
                  <Area type="monotone" dataKey="drift" stroke="#EF4444" fill="#EF4444" fillOpacity={0.08} strokeWidth={2} />
                  <Line type="monotone" dataKey={() => 0.03} stroke="#F59E0B" strokeDasharray="5 5" dot={false} name="Threshold" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* System Health */}
          <div className="card" style={{ marginBottom: 32 }}>
            <h4 style={{ marginBottom: 20 }}>System Health</h4>
            <div className="grid grid-4">
              {[
                { label: 'CPU', value: d.systemHealth.cpu, color: d.systemHealth.cpu > 80 ? '#EF4444' : '#10B981', icon: Cpu },
                { label: 'Memory', value: d.systemHealth.memory, color: d.systemHealth.memory > 80 ? '#EF4444' : '#3B82F6', icon: Server },
                { label: 'Disk', value: d.systemHealth.disk, color: d.systemHealth.disk > 80 ? '#EF4444' : '#8B5CF6', icon: HardDrive },
                { label: 'GPU', value: d.systemHealth.gpu, color: d.systemHealth.gpu > 80 ? '#EF4444' : '#F58220', icon: Activity },
              ].map((s, i) => (
                <div key={i} style={{ textAlign: 'center' }}>
                  <div style={{ position: 'relative', width: 100, height: 100, margin: '0 auto 12px' }}>
                    <svg width="100" height="100" viewBox="0 0 100 100" style={{ transform: 'rotate(-90deg)' }}>
                      <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="8" />
                      <circle cx="50" cy="50" r="42" fill="none" stroke={s.color} strokeWidth="8"
                        strokeLinecap="round" strokeDasharray={`${(s.value/100)*264} 264`} />
                    </svg>
                    <div style={{
                      position: 'absolute', inset: 0, display: 'flex',
                      alignItems: 'center', justifyContent: 'center',
                      fontSize: '1.125rem', fontWeight: 700, color: s.color,
                    }}>{s.value}%</div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>
                    <s.icon size={14} /> {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* API Traffic */}
          <div className="card" style={{ marginBottom: 32 }}>
            <h4 style={{ marginBottom: 20 }}>API Traffic (30 Days)</h4>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={d.modelMetrics}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                <XAxis dataKey="day" tick={{ fill: '#5A6478', fontSize: 9 }} interval={4} />
                <YAxis tick={{ fill: '#5A6478', fontSize: 10 }} />
                <Tooltip contentStyle={{ background: '#0F1A2E', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8 }} />
                <Area type="monotone" dataKey="requests" stroke="#00836C" fill="#00836C" fillOpacity={0.08} strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Logs */}
          <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
            <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border-subtle)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h4>System Logs</h4>
              <div className="tabs">
                {['all','info','warn','error'].map(f => (
                  <button key={f} className={`tab ${logFilter === f ? 'active' : ''}`}
                    onClick={() => setLogFilter(f)}
                    style={{ textTransform: 'uppercase', fontSize: '0.6875rem', padding: '5px 10px' }}>
                    {f}
                  </button>
                ))}
              </div>
            </div>
            <div className="terminal" style={{ borderRadius: 0, border: 'none', maxHeight: 300 }}>
              {filteredLogs.map((l, i) => (
                <div key={i} className={`terminal-line ${l.level === 'ERROR' ? 'error' : l.level === 'WARN' ? 'warning' : ''}`}>
                  <span style={{ color: '#5A6478', marginRight: 8 }}>[{l.ts}]</span>
                  <span style={{
                    marginRight: 8, fontWeight: 600, fontSize: '0.75rem',
                    color: l.level === 'ERROR' ? '#EF4444' : l.level === 'WARN' ? '#F59E0B' : '#10B981',
                  }}>{l.level}</span>
                  <span style={{ color: '#3B82F6', marginRight: 8 }}>[{l.source}]</span>
                  {l.msg}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
