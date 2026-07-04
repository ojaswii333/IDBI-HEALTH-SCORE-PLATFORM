import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import IDBILogo from '../../components/IDBILogo';

export default function Header() {
  const { scrollY } = useScroll();
  const background = useTransform(
    scrollY,
    [0, 50],
    ['rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 0.85)']
  );
  const backdropFilter = useTransform(
    scrollY,
    [0, 50],
    ['blur(0px)', 'blur(12px)']
  );
  const borderBottom = useTransform(
    scrollY,
    [0, 50],
    ['1px solid rgba(0, 0, 0, 0)', '1px solid rgba(0, 0, 0, 0.05)']
  );

  return (
    <motion.header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        background,
        backdropFilter,
        borderBottom,
      }}
    >
      <div style={{ maxWidth: 1400, margin: '0 auto', padding: '16px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 12 }}>
          <IDBILogo size={32} showText={false} />
          <span style={{ fontWeight: 600, fontSize: '1.125rem', letterSpacing: '-0.02em', color: 'var(--text-primary)' }}>MSME Intelligence</span>
        </Link>
        
        <div style={{ display: 'none', gap: 40, alignItems: 'center', '@media (minWidth: 768px)': { display: 'flex' } } as any}>
          <a href="#platform" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.875rem', fontWeight: 500, transition: 'color 0.2s' }} className="hover:text-white">Platform</a>
          <a href="#intelligence" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.875rem', fontWeight: 500, transition: 'color 0.2s' }} className="hover:text-white">Intelligence</a>
          <a href="#security" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.875rem', fontWeight: 500, transition: 'color 0.2s' }} className="hover:text-white">Security</a>
        </div>

        <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
          <Link to="/login" style={{ color: 'var(--text-primary)', textDecoration: 'none', fontSize: '0.875rem', fontWeight: 600, padding: '8px 16px', borderRadius: 8, transition: 'background 0.2s' }} className="hover-bg-subtle">
            Sign In
          </Link>
          <Link to="/login" style={{ background: 'var(--text-primary)', color: 'white', textDecoration: 'none', fontSize: '0.875rem', fontWeight: 600, padding: '10px 20px', borderRadius: 100, transition: 'transform 0.2s', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} className="hover:scale-105">
            Get Started
          </Link>
        </div>
      </div>
    </motion.header>
  );
}
