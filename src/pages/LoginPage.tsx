import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Shield, Lock, User, KeyRound, Building2, Eye, EyeOff, Fingerprint } from 'lucide-react';

export default function LoginPage() {
  const [role, setRole] = useState<'officer' | 'msme'>('msme');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      login(username || role, password, role);
      navigate(role === 'officer' ? '/officer' : '/landing');
    }, 1200);
  };

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: '#060B18', position: 'relative', overflow: 'hidden',
    }}>
      {/* Animated gradient background */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse at 20% 50%, rgba(245,130,32,0.08) 0%, transparent 50%), radial-gradient(ellipse at 80% 50%, rgba(0,131,108,0.08) 0%, transparent 50%), radial-gradient(ellipse at 50% 0%, rgba(59,130,246,0.05) 0%, transparent 50%)',
      }} />
      {/* Floating orbs */}
      {[
        { top: '10%', left: '10%', size: 300, color: 'rgba(245,130,32,0.06)', delay: '0s', dur: '8s' },
        { top: '60%', left: '70%', size: 400, color: 'rgba(0,131,108,0.05)', delay: '2s', dur: '10s' },
        { top: '30%', left: '50%', size: 200, color: 'rgba(59,130,246,0.04)', delay: '4s', dur: '12s' },
      ].map((orb, i) => (
        <div key={i} style={{
          position: 'absolute', top: orb.top, left: orb.left,
          width: orb.size, height: orb.size, borderRadius: '50%',
          background: orb.color, filter: 'blur(60px)',
          animation: `float ${orb.dur} ease-in-out infinite`,
          animationDelay: orb.delay,
        }} />
      ))}
      {/* Grid pattern */}
      <div style={{
        position: 'absolute', inset: 0, opacity: 0.03,
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
        backgroundSize: '60px 60px',
      }} />

      <div style={{
        width: 440, position: 'relative', zIndex: 10,
        animation: 'fadeInUp 0.8s ease',
      }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{
            width: 64, height: 64, borderRadius: 18,
            background: 'var(--idbi-gradient)', display: 'inline-flex',
            alignItems: 'center', justifyContent: 'center',
            fontSize: '1.5rem', fontWeight: 900, color: 'white',
            boxShadow: '0 0 40px rgba(245,130,32,0.2)',
            marginBottom: 16,
          }}>IB</div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#F0F2F5', marginBottom: 4 }}>
            IDBI Bank
          </h2>
          <p style={{ fontSize: '0.875rem', color: '#8B95A8' }}>
            MSME Financial Health Intelligence
          </p>
        </div>

        {/* Glass card */}
        <div style={{
          background: 'rgba(255,255,255,0.03)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          border: '1px solid rgba(255,255,255,0.06)',
          borderRadius: 20, padding: 36,
          boxShadow: '0 16px 64px rgba(0,0,0,0.4)',
        }}>
          {/* Role tabs */}
          <div style={{
            display: 'flex', gap: 4, padding: 4,
            background: 'rgba(255,255,255,0.04)', borderRadius: 12, marginBottom: 28,
          }}>
            {([
              { key: 'msme' as const, label: 'MSME Login', icon: Building2 },
              { key: 'officer' as const, label: 'Officer Login', icon: Shield },
            ]).map(tab => (
              <button key={tab.key} onClick={() => setRole(tab.key)} style={{
                flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                padding: '10px 16px', borderRadius: 10, border: 'none', cursor: 'pointer',
                fontFamily: 'var(--font-family)', fontSize: '0.875rem', fontWeight: 500,
                background: role === tab.key ? 'linear-gradient(135deg, #F58220, #00836C)' : 'transparent',
                color: role === tab.key ? 'white' : '#8B95A8',
                transition: 'all 250ms ease',
              }}>
                <tab.icon size={16} /> {tab.label}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div className="input-group">
              <label style={{ color: '#8B95A8', fontSize: '0.8125rem', fontWeight: 500 }}>
                {role === 'officer' ? 'Employee ID' : 'GSTIN / Udyam Number'}
              </label>
              <div style={{ position: 'relative' }}>
                <User size={16} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: '#5A6478' }} />
                <input
                  className="input" value={username} onChange={e => setUsername(e.target.value)}
                  placeholder={role === 'officer' ? 'Enter Employee ID' : 'Enter GSTIN or Udyam'}
                  style={{ paddingLeft: 40, width: '100%' }}
                />
              </div>
            </div>

            <div className="input-group">
              <label style={{ color: '#8B95A8', fontSize: '0.8125rem', fontWeight: 500 }}>Password</label>
              <div style={{ position: 'relative' }}>
                <Lock size={16} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: '#5A6478' }} />
                <input
                  className="input" type={showPass ? 'text' : 'password'}
                  value={password} onChange={e => setPassword(e.target.value)}
                  placeholder="Enter password"
                  style={{ paddingLeft: 40, paddingRight: 40, width: '100%' }}
                />
                <button type="button" onClick={() => setShowPass(!showPass)} style={{
                  position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)',
                  background: 'none', border: 'none', color: '#5A6478', cursor: 'pointer',
                }}>
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <div className="input-group">
              <label style={{ color: '#8B95A8', fontSize: '0.8125rem', fontWeight: 500 }}>OTP (Optional)</label>
              <div style={{ position: 'relative' }}>
                <KeyRound size={16} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: '#5A6478' }} />
                <input className="input" placeholder="6-digit OTP" maxLength={6} style={{ paddingLeft: 40, width: '100%' }} />
              </div>
            </div>

            <button type="submit" disabled={loading} style={{
              width: '100%', padding: '13px 24px', borderRadius: 12, border: 'none',
              background: 'linear-gradient(135deg, #F58220, #00836C)', color: 'white',
              fontFamily: 'var(--font-family)', fontSize: '0.9375rem', fontWeight: 600,
              cursor: loading ? 'wait' : 'pointer', display: 'flex', alignItems: 'center',
              justifyContent: 'center', gap: 8, transition: 'all 250ms',
              boxShadow: '0 0 30px rgba(245,130,32,0.15)',
              opacity: loading ? 0.7 : 1,
            }}>
              {loading ? (
                <div style={{ width: 20, height: 20, border: '2px solid rgba(255,255,255,0.3)', borderTopColor: 'white', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
              ) : (
                <>
                  <Lock size={16} /> Secure Login
                </>
              )}
            </button>
          </form>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginTop: 20 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#5A6478', fontSize: '0.75rem' }}>
              <Fingerprint size={14} /> Biometric Login
            </div>
            <span style={{ color: '#5A6478' }}>•</span>
            <span style={{ color: '#5A6478', fontSize: '0.75rem', cursor: 'pointer' }}>Forgot Password?</span>
          </div>
        </div>

        <div style={{ textAlign: 'center', marginTop: 24, color: '#5A6478', fontSize: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
          <Shield size={12} /> Protected by 256-bit SSL Encryption
        </div>
      </div>
    </div>
  );
}
