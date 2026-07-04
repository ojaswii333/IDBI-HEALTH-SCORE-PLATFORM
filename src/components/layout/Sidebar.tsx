import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  LayoutDashboard, Database, Cpu, BrainCircuit, FlaskConical, Sparkles,
  Gauge, CreditCard, MessageSquare, Shield, Settings, LogOut,
  ChevronLeft, ChevronRight
} from 'lucide-react';

const navItems = [
  { path: '/landing', label: 'Home', icon: LayoutDashboard, roles: ['msme','officer','admin'] },
  { path: '/connect', label: 'Data Connect', icon: Database, roles: ['msme','officer'] },
  { path: '/ingestion', label: 'Data Engine', icon: Cpu, roles: ['msme','officer'] },
  { path: '/features', label: 'AI Features', icon: BrainCircuit, roles: ['msme','officer'] },
  { path: '/models', label: 'AI Models', icon: FlaskConical, roles: ['msme','officer','admin'] },
  { path: '/explainable', label: 'Explainable AI', icon: Sparkles, roles: ['msme','officer'] },
  { path: '/score', label: 'Health Score', icon: Gauge, roles: ['msme','officer'] },
  { path: '/health-card', label: 'Health Card', icon: CreditCard, roles: ['msme','officer'] },
  { path: '/copilot', label: 'AI Copilot', icon: MessageSquare, roles: ['msme','officer'] },
  { path: '/officer', label: 'Officer Panel', icon: Shield, roles: ['officer','admin'] },
  { path: '/admin', label: 'Admin Panel', icon: Settings, roles: ['admin'] },
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const role = user?.role || 'msme';

  const handleLogout = () => { logout(); navigate('/'); };

  return (
    <aside className={`app-sidebar ${collapsed ? 'collapsed' : ''}`}>
      <div style={{ padding: collapsed ? '20px 12px' : '20px 20px', borderBottom: '1px solid var(--border-subtle)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{
            width: 36, height: 36, borderRadius: 10,
            background: 'var(--idbi-gradient)', display: 'flex',
            alignItems: 'center', justifyContent: 'center',
            fontWeight: 800, fontSize: '0.875rem', color: 'white', flexShrink: 0
          }}>IB</div>
          {!collapsed && (
            <div style={{ overflow: 'hidden' }}>
              <div style={{ fontWeight: 700, fontSize: '0.875rem', whiteSpace: 'nowrap' }}>IDBI Bank</div>
              <div style={{ fontSize: '0.6875rem', color: 'var(--text-tertiary)', whiteSpace: 'nowrap' }}>MSME Intelligence</div>
            </div>
          )}
        </div>
      </div>

      <nav style={{ flex: 1, padding: '12px 8px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 2 }}>
        {navItems.filter(i => i.roles.includes(role)).map(item => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
            style={({ isActive }) => ({
              display: 'flex', alignItems: 'center', gap: 12,
              padding: collapsed ? '10px 12px' : '10px 14px',
              borderRadius: 'var(--radius-sm)',
              color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)',
              background: isActive ? 'var(--bg-glass-strong)' : 'transparent',
              textDecoration: 'none', fontSize: '0.875rem', fontWeight: isActive ? 600 : 400,
              transition: 'all 150ms ease', justifyContent: collapsed ? 'center' : 'flex-start',
              borderLeft: isActive ? '2px solid var(--idbi-orange)' : '2px solid transparent',
            })}
          >
            <item.icon size={18} style={{ flexShrink: 0 }} />
            {!collapsed && <span style={{ whiteSpace: 'nowrap' }}>{item.label}</span>}
          </NavLink>
        ))}
      </nav>

      <div style={{ padding: '12px 8px', borderTop: '1px solid var(--border-subtle)', display: 'flex', flexDirection: 'column', gap: 4 }}>
        {!collapsed && user && (
          <div style={{ padding: '8px 14px', display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{
              width: 32, height: 32, borderRadius: 'var(--radius-full)',
              background: 'var(--idbi-gradient)', display: 'flex',
              alignItems: 'center', justifyContent: 'center',
              fontSize: '0.75rem', fontWeight: 600, color: 'white'
            }}>{user.name[0]}</div>
            <div>
              <div style={{ fontSize: '0.8125rem', fontWeight: 500 }}>{user.name}</div>
              <div style={{ fontSize: '0.6875rem', color: 'var(--text-tertiary)', textTransform: 'capitalize' }}>{user.role}</div>
            </div>
          </div>
        )}
        <button onClick={handleLogout} style={{
          display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px',
          background: 'transparent', border: 'none', color: 'var(--text-secondary)',
          cursor: 'pointer', borderRadius: 'var(--radius-sm)', width: '100%',
          fontSize: '0.875rem', transition: 'all 150ms', justifyContent: collapsed ? 'center' : 'flex-start',
          fontFamily: 'var(--font-family)',
        }}>
          <LogOut size={18} /> {!collapsed && 'Sign Out'}
        </button>
      </div>

      <button
        onClick={() => setCollapsed(!collapsed)}
        style={{
          position: 'absolute', top: 28, right: -12,
          width: 24, height: 24, borderRadius: '50%',
          background: 'var(--bg-elevated)', border: '1px solid var(--border-medium)',
          color: 'var(--text-secondary)', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10,
        }}
      >
        {collapsed ? <ChevronRight size={12} /> : <ChevronLeft size={12} />}
      </button>
    </aside>
  );
}
