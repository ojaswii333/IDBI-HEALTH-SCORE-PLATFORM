import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../auth/AuthContext';
import { useTheme } from '../../auth/ThemeContext';
import {
  LayoutDashboard, CreditCard, BadgeCheck, MessageSquare,
  BarChart3, FileText, FolderLock, Settings, LogOut, Sun, Moon, Search,
  PieChart, UserCircle, Bell, Menu
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { pageTransition } from '../../shared/animations';
import IDBILogo from '../../components/IDBILogo';

const navSections = [
  {
    label: 'Overview',
    items: [
      { path: '/customer/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    ],
  },
  {
    label: 'Finance',
    items: [
      { path: '/customer/health-card', label: 'Financial Health', icon: CreditCard },
      { path: '/customer/loan-eligibility', label: 'Loan Eligibility', icon: BadgeCheck },
      { path: '/customer/intelligence-report', label: 'Intelligence Report', icon: PieChart },
      { path: '/customer/advisor', label: 'AI Business Advisor', icon: MessageSquare },
      { path: '/customer/insights', label: 'Business Insights', icon: BarChart3 },
    ],
  },
  {
    label: 'Manage',
    items: [
      { path: '/customer/applications', label: 'Loan Applications', icon: FileText },
      { path: '/customer/documents', label: 'Document Vault', icon: FolderLock },
      { path: '/customer/profile', label: 'Profile', icon: UserCircle },
      { path: '/customer/settings', label: 'Settings', icon: Settings },
    ],
  },
];

export default function CustomerLayout() {
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

      {/* Sidebar */}
      <aside className={`app-sidebar ${isSidebarOpen ? 'open' : ''}`}>
        {/* Brand */}
        <div style={{ padding: '16px 16px 12px', borderBottom: '1px solid var(--border)' }}>
          <IDBILogo size={28} />
          <div style={{ marginTop: 12, paddingLeft: 4 }}>
            <div style={{ fontSize: '0.6875rem', color: 'var(--text-muted)' }}>MSME Health Platform</div>
          </div>
        </div>

        {/* Navigation */}
        <nav style={{ flex: 1, overflowY: 'auto', padding: '8px 8px' }}>
          {navSections.map(section => (
            <div key={section.label} className="nav-section">
              <div className="nav-section-label">{section.label}</div>
              {section.items.map(item => (
                <NavLink key={item.path} to={item.path}
                  className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                  <item.icon size={16} style={{ flexShrink: 0 }} />
                  <span style={{ fontSize: '0.8125rem' }}>{item.label}</span>
                </NavLink>
              ))}
            </div>
          ))}
        </nav>

        {/* User */}
        <div style={{ padding: '12px 8px', borderTop: '1px solid var(--border)' }}>
          {user && (
            <div style={{ padding: '8px 12px', display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
              <div style={{
                width: 28, height: 28, borderRadius: 'var(--radius-full)', background: 'var(--bg-elevated)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.6875rem', fontWeight: 600,
              }}>{user.name[0]}</div>
              <div>
                <div style={{ fontSize: '0.8125rem', fontWeight: 500, lineHeight: 1.2 }}>{user.name}</div>
                <div style={{ fontSize: '0.6875rem', color: 'var(--text-muted)' }}>MSME Customer</div>
              </div>
            </div>
          )}
          <button onClick={handleLogout} className="nav-item" style={{ color: 'var(--text-muted)' }}>
            <LogOut size={16} /> <span style={{ fontSize: '0.8125rem' }}>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main */}
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
            <input placeholder="Search..." style={{
              background: 'none', border: 'none', outline: 'none', color: 'var(--text-primary)',
              fontFamily: 'var(--font)', fontSize: '0.8125rem', width: 200,
            }} />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <button onClick={toggle} className="btn btn-ghost btn-icon btn-sm" aria-label="Toggle theme">
              {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
            </button>
            <button className="btn btn-ghost btn-icon btn-sm"><Bell size={15} /></button>
          </div>
        </header>

        <motion.div 
          className="page-container"
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
