import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { healthScore, strengths, risks, businessProfile } from '../../shared/data/customerData';
import { ArrowUpRight, ArrowDownRight, TrendingUp, CreditCard, Clock } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { staggerContainer, staggerItem } from '../../shared/animations';

export default function Dashboard() {
  const navigate = useNavigate();
  const [displayScore, setDisplayScore] = useState(300);
  const s = healthScore;

  useEffect(() => {
    const dur = 1600, start = 300, t0 = Date.now();
    const anim = () => {
      const p = Math.min((Date.now() - t0) / dur, 1);
      const e = 1 - Math.pow(1 - p, 3);
      setDisplayScore(Math.round(start + (s.overall - start) * e));
      if (p < 1) requestAnimationFrame(anim);
    };
    requestAnimationFrame(anim);
  }, [s.overall]);

  const pct = ((s.overall - 300) / 600) * 100;
  const circ = 2 * Math.PI * 90;

  // Determine greeting
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';
  const firstName = businessProfile.contactPerson.split(' ')[0];

  return (
    <motion.div variants={staggerContainer} initial="initial" animate="animate">
      
      {/* Massive Personalized Welcome Section */}
      <motion.div variants={staggerItem} style={{ marginBottom: 40, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: 'var(--text-secondary)', fontSize: '0.8125rem', fontWeight: 500, marginBottom: 8, letterSpacing: '0.02em', textTransform: 'uppercase' }}>
            <Clock size={12} /> Last synced today at 09:41 AM
          </div>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.1, color: 'var(--text-primary)' }}>
            {greeting}, <span style={{ color: 'var(--accent-secondary)' }}>{firstName}</span>
          </h1>
          <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', marginTop: 8 }}>
            Here is the financial intelligence overview for {businessProfile.name}.
          </p>
        </div>
        <button className="btn btn-primary" onClick={() => navigate('/customer/health-card')} style={{ height: 44, padding: '0 24px', boxShadow: 'var(--shadow-sm)' }}>
          <CreditCard size={16} /> View Detailed Report
        </button>
      </motion.div>

      {/* Primary KPI Cards */}
      <motion.div variants={staggerItem} className="grid grid-4" style={{ marginBottom: 32 }}>
        {[
          { label: 'Total Credit Limit', value: `₹${(s.creditLimit / 100000).toFixed(1)}L`, trend: '+8.2% vs last month', up: true },
          { label: 'Available Loan Eligibility', value: `₹${(s.loanEligibility / 100000).toFixed(1)}L`, trend: 'Pre-approved', up: true, highlight: true },
          { label: 'AI Default Probability', value: `${(s.probabilityOfDefault * 100).toFixed(1)}%`, trend: '-0.4% improvement', up: true },
          { label: 'Next Underwriting Review', value: 'Jul 15, 2026', trend: 'In 12 days', up: null },
        ].map((kpi, i) => (
          <div key={i} className="card card-interactive" style={{ padding: 24, boxShadow: 'var(--shadow-sm)', border: kpi.highlight ? '1px solid var(--accent)' : '1px solid var(--border)', background: kpi.highlight ? 'var(--bg-surface)' : 'var(--bg-surface)' }}>
            <div className="metric-label" style={{ marginBottom: 12, fontSize: '0.8125rem' }}>{kpi.label}</div>
            <div className="metric-value" style={{ fontSize: '1.75rem', marginBottom: 8 }}>{kpi.value}</div>
            <div className={`metric-trend ${kpi.up === true ? 'up' : kpi.up === false ? 'down' : ''}`} style={{ fontSize: '0.75rem' }}>
              {kpi.up === true && <ArrowUpRight size={12} />}
              {kpi.up === false && <ArrowDownRight size={12} />}
              {kpi.up === null && <Clock size={12} style={{ color: 'var(--text-muted)' }} />}
              <span style={{ marginLeft: 4 }}>{kpi.trend}</span>
            </div>
          </div>
        ))}
      </motion.div>

      <motion.div variants={staggerItem} className="grid" style={{ gridTemplateColumns: '360px 1fr', marginBottom: 32, gap: 24 }}>
        {/* Score Gauge */}
        <div className="card" style={{ textAlign: 'center', padding: '40px 32px', boxShadow: 'var(--shadow-md)' }}>
          <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: 24 }}>IDBI Health Score</h3>
          <div style={{ position: 'relative', width: 220, height: 220, margin: '0 auto 24px' }}>
            <svg width="220" height="220" viewBox="0 0 200 200" style={{ transform: 'rotate(-90deg)' }}>
              <circle cx="100" cy="100" r="90" fill="none" stroke="var(--bg-elevated)" strokeWidth="12" />
              <circle cx="100" cy="100" r="90" fill="none" stroke={s.ratingColor} strokeWidth="12"
                strokeLinecap="round" strokeDasharray={circ} strokeDashoffset={circ - (pct / 100) * circ}
                style={{ transition: 'stroke-dashoffset 1.6s cubic-bezier(0.16, 1, 0.3, 1)' }} />
            </svg>
            <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ fontSize: '3rem', fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1 }}>{displayScore}</div>
              <div className="text-caption" style={{ marginTop: 8 }}>out of 900</div>
            </div>
          </div>
          <span className="badge badge-info" style={{ fontSize: '0.875rem', padding: '6px 20px', background: 'var(--info-muted)', color: 'var(--info)' }}>
            Rating: {s.rating}
          </span>
          {/* Score bar */}
          <div style={{ marginTop: 32, padding: '0 8px' }}>
            <div style={{ height: 6, borderRadius: 3, background: 'linear-gradient(90deg, #EF4444 0%, #EAB308 33%, #3B82F6 66%, #22C55E 100%)', position: 'relative' }}>
              <div style={{ position: 'absolute', left: `${pct}%`, top: -4, width: 4, height: 14, background: 'var(--text-primary)', borderRadius: 2, transform: 'translateX(-50%)', boxShadow: '0 0 4px rgba(0,0,0,0.5)' }} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8, fontSize: '0.6875rem', color: 'var(--text-muted)', fontWeight: 500 }}>
              <span>300</span><span>500</span><span>650</span><span>750</span><span>900</span>
            </div>
          </div>
        </div>

        {/* Score Trend */}
        <div className="card" style={{ padding: 32, boxShadow: 'var(--shadow-sm)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
            <div>
              <h4 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: 4 }}>Score Trajectory</h4>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>12-month historical performance</p>
            </div>
            <div className="badge badge-success">+11.7% YoY</div>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={s.trend}>
              <CartesianGrid strokeDasharray="4 4" stroke="var(--border)" vertical={false} />
              <XAxis dataKey="month" tick={{ fill: 'var(--text-muted)', fontSize: 11 }} axisLine={false} tickLine={false} tickMargin={12} />
              <YAxis domain={[600, 800]} tick={{ fill: 'var(--text-muted)', fontSize: 11 }} axisLine={false} tickLine={false} tickMargin={12} />
              <Tooltip 
                contentStyle={{ background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: 8, fontSize: 13, boxShadow: 'var(--shadow-lg)', padding: '8px 12px' }}
                itemStyle={{ color: 'var(--text-primary)', fontWeight: 600 }}
              />
              <Area type="monotone" dataKey="score" stroke="var(--info)" fill="url(#colorScore)" strokeWidth={3} activeDot={{ r: 6, fill: 'var(--info)', stroke: 'var(--bg-surface)', strokeWidth: 2 }} />
              <defs>
                <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--info)" stopOpacity={0.15}/>
                  <stop offset="95%" stopColor="var(--info)" stopOpacity={0}/>
                </linearGradient>
              </defs>
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Strengths & Risks */}
      <motion.div variants={staggerItem} className="grid grid-2" style={{ marginBottom: 32, gap: 24 }}>
        <div className="card" style={{ padding: 0, overflow: 'hidden', boxShadow: 'var(--shadow-sm)' }}>
          <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: 12, background: 'var(--bg-hover)' }}>
            <TrendingUp size={18} style={{ color: 'var(--success)' }} />
            <h4 style={{ fontSize: '1rem', fontWeight: 600 }}>Key Strengths</h4>
          </div>
          {strengths.map((s, i) => (
            <div key={i} style={{ padding: '16px 24px', borderBottom: i < strengths.length - 1 ? '1px solid var(--border)' : 'none', transition: 'background 0.2s', cursor: 'default' }} className="hover-bg-subtle">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                <span style={{ fontSize: '0.875rem', fontWeight: 600 }}>{s.label}</span>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--success)' }}>{s.impact}</span>
              </div>
              <span className="text-caption" style={{ fontSize: '0.8125rem' }}>{s.detail}</span>
            </div>
          ))}
        </div>
        <div className="card" style={{ padding: 0, overflow: 'hidden', boxShadow: 'var(--shadow-sm)' }}>
          <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: 12, background: 'var(--bg-hover)' }}>
            <ArrowDownRight size={18} style={{ color: 'var(--danger)' }} />
            <h4 style={{ fontSize: '1rem', fontWeight: 600 }}>Areas for Improvement</h4>
          </div>
          {risks.map((r, i) => (
            <div key={i} style={{ padding: '16px 24px', borderBottom: i < risks.length - 1 ? '1px solid var(--border)' : 'none', transition: 'background 0.2s', cursor: 'default' }} className="hover-bg-subtle">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                <span style={{ fontSize: '0.875rem', fontWeight: 600 }}>{r.label}</span>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--danger)' }}>{r.impact}</span>
              </div>
              <span className="text-caption" style={{ fontSize: '0.8125rem' }}>{r.detail}</span>
            </div>
          ))}
        </div>
      </motion.div>

    </motion.div>
  );
}
