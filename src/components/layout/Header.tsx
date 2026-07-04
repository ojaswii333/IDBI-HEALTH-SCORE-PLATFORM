import { Search, Bell, Sun, Moon } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';

export default function Header({ title }: { title: string }) {
  const { theme, toggle } = useTheme();
  const { user } = useAuth();

  return (
    <header className="app-header">
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <h3 style={{ fontSize: '1.125rem', fontWeight: 600 }}>{title}</h3>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 8, padding: '6px 14px',
          background: 'var(--bg-glass)', borderRadius: 'var(--radius-full)',
          border: '1px solid var(--border-subtle)', width: 220,
        }}>
          <Search size={14} style={{ color: 'var(--text-tertiary)' }} />
          <input placeholder="Search..." style={{
            background: 'none', border: 'none', outline: 'none', color: 'var(--text-primary)',
            fontSize: '0.8125rem', fontFamily: 'var(--font-family)', width: '100%',
          }} />
        </div>
        <button onClick={toggle} className="btn btn-icon btn-ghost" title="Toggle theme">
          {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
        </button>
        <button className="btn btn-icon btn-ghost" style={{ position: 'relative' }}>
          <Bell size={18} />
          <span style={{
            position: 'absolute', top: 4, right: 4, width: 6, height: 6,
            background: 'var(--danger)', borderRadius: '50%',
          }} />
        </button>
        <div style={{
          width: 32, height: 32, borderRadius: 'var(--radius-full)',
          background: 'var(--idbi-gradient)', display: 'flex',
          alignItems: 'center', justifyContent: 'center',
          fontSize: '0.75rem', fontWeight: 600, color: 'white', cursor: 'pointer',
        }}>{user?.name?.[0] || 'U'}</div>
      </div>
    </header>
  );
}
