import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../auth/AuthContext';
import { useTheme } from '../../auth/ThemeContext';
import {
  LayoutDashboard, Users, ClipboardCheck, Sparkles, BarChart3, Activity,
  Trophy, GitCompareArrows, ShieldAlert, ScrollText, Map, RefreshCw,
  DatabaseZap, Gauge, Server, LogOut, Sun, Moon, Search, Bell, Settings, Menu
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { pageTransition } from '../../shared/animations';
import IDBILogo from '../../components/IDBILogo';

const navSections = [
  {
    label: 'Operations',
    items: [
      { path: '/admin/dashboard', label: 'Portfolio Dashboard', icon: LayoutDashboard },
      { path: '/admin/customers', label: 'Customer Profiles', icon: Users },
      { path: '/admin/underwriting', label: 'Underwriting', icon: ClipboardCheck },
    ],
  },
  {
    label: 'AI & Analytics',
    items: [
      { path: '/admin/explainability', label: 'Explainable AI', icon: Sparkles },
      { path: '/admin/features', label: 'Feature Importance', icon: BarChart3 },
      { path: '/admin/monitoring', label: 'Model Monitoring', icon: Activity },
      { path: '/admin/benchmarking', label: 'Benchmarking', icon: Trophy },
      { path: '/admin/drift', label: 'Drift Detection', icon: GitCompareArrows },
    ],
  },
  {
    label: 'Risk & Compliance',
    items: [
      { path: '/admin/fraud', label: 'Fraud Analytics', icon: ShieldAlert },
      { path: '/admin/audit', label: 'Audit Logs', icon: ScrollText },
      { path: '/admin/risk', label: 'Risk Heatmaps', icon: Map },
    ],
  },
  {
    label: 'Platform',
    items: [
      { path: '/admin/retraining', label: 'Retraining Center', icon: RefreshCw },
      { path: '/admin/data-quality', label: 'Data Quality', icon: DatabaseZap },
      { path: '/admin/api', label: 'API Monitoring', icon: Gauge },
      { path: '/admin/system', label: 'System Health', icon: Server },
    ],
  },
];

export default function AdminLayout() {
  const { user, logout } = useAuth();
  const { theme, toggle } = useTheme();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleLogout = () => { logout(); navigate('/login'); };

  return (
    <div className="app-layout">
      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div 
          onClick={() => setIsSidebarOpen(false)}
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 90 }} 
        />
      )}
      
      <aside className={`app-sidebar ${isSidebarOpen ? 'open' : ''}`} style={{ width: 256 }}>
        <div style={{ padding: '16px 16px 12px', borderBottom: '1px solid var(--border)' }}>
          <IDBILogo size={28} />
          <div style={{ marginTop: 12, paddingLeft: 4 }}>
            <div style={{ fontSize: '0.6875rem', color: 'var(--text-muted)' }}>Officer Console</div>
          </div>
        </div>

        <nav style={{ flex: 1, overflowY: 'auto', padding: '4px 8px' }}>
          {navSections.map(section => (
            <div key={section.label} className="nav-section">
              <div className="nav-section-label">{section.label}</div>
              {section.items.map(item => (
                <NavLink key={item.path} to={item.path}
                  className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                  <item.icon size={15} style={{ flexShrink: 0 }} />
                  <span style={{ fontSize: '0.8125rem' }}>{item.label}</span>
                </NavLink>
              ))}
            </div>
          ))}
        </nav>

        <div style={{ padding: '12px 8px', borderTop: '1px solid var(--border)' }}>
          {user && (
            <div style={{ padding: '8px 12px', display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
              <div style={{
                width: 28, height: 28, borderRadius: 'var(--radius-full)', background: 'var(--accent-secondary-muted)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.6875rem', fontWeight: 600, color: 'var(--accent-secondary)',
              }}>{user.name[0]}</div>
              <div>
                <div style={{ fontSize: '0.8125rem', fontWeight: 500, lineHeight: 1.2 }}>{user.name}</div>
                <div style={{ fontSize: '0.6875rem', color: 'var(--text-muted)', textTransform: 'capitalize' }}>{user.role}</div>
              </div>
            </div>
          )}
          <button onClick={handleLogout} className="nav-item" style={{ color: 'var(--text-muted)' }}>
            <LogOut size={16} /> <span style={{ fontSize: '0.8125rem' }}>Sign Out</span>
          </button>
        </div>
      </aside>

      <div className="app-main">
        <header className="app-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flex: 1 }}>
            <button 
              className="btn btn-icon" 
              onClick={() => setIsSidebarOpen(true)}
              style={{ display: 'inline-flex', padding: 0, marginRight: 12 }}
            >
              <Menu size={20} color="var(--text-primary)" className="mobile-menu-btn" />
            </button>
            <Search size={14} style={{ color: 'var(--text-muted)' }} />
            <input placeholder="Search customers, applications..." style={{
              background: 'none', border: 'none', outline: 'none', color: 'var(--text-primary)',
              fontFamily: 'var(--font)', fontSize: '0.8125rem', width: 280,
            }} />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <button onClick={toggle} className="btn btn-ghost btn-icon btn-sm">
              {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
            </button>
            <button className="btn btn-ghost btn-icon btn-sm"><Bell size={15} /></button>
            <button className="btn btn-ghost btn-icon btn-sm"><Settings size={15} /></button>
          </div>
        </header>

        <motion.div 
          className="page-container" 
          style={{ maxWidth: 1400 }}
          initial="initial"
          animate="animate"
          exit="exit"
          variants={pageTransition}
        >
          <Outlet />
        </motion.div>
      </div>
    </div>
  );
}
