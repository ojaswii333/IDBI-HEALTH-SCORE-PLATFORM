import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { Lock, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
import type { UserRole } from '../shared/types';
import IDBILogo from '../components/IDBILogo';
import { motion, AnimatePresence } from 'framer-motion';

export default function LoginPage() {
  const [role, setRole] = useState<UserRole>('customer');
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState<'login' | 'otp'>('login');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep('otp');
    }, 800);
  };

  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      login(role);
      navigate(role === 'customer' ? '/customer/dashboard' : '/admin/dashboard');
    }, 1200);
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return; // Only allow 1 char
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    // Auto focus next
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', background: 'var(--bg-app)' }}>
      {/* Left pane - Visuals */}
      <div className="login-visual-pane" style={{ flex: 1, position: 'relative' }}>
        <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
          <img 
            src="/idbi-visual.png" 
            alt="Enterprise AI Banking" 
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(0,0,0,0.4), rgba(0,0,0,0.1))' }} />
        </div>
        
        <div style={{ position: 'absolute', bottom: 60, left: 60, right: 60, color: 'white' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '8px 16px', background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(12px)', borderRadius: 100, marginBottom: 24, fontSize: '0.8125rem', fontWeight: 500 }}>
            <ShieldCheck size={16} color="#22C55E" /> Enterprise Grade ML Infrastructure
          </div>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 600, letterSpacing: '-0.02em', lineHeight: 1.1, marginBottom: 16 }}>
            The future of MSME <br/>Underwriting is here.
          </h2>
          <p style={{ fontSize: '1.125rem', color: 'rgba(255,255,255,0.8)', maxWidth: 480, lineHeight: 1.5 }}>
            Unlock automated financial health intelligence with industry-leading explainable AI, engineered specifically for IDBI Bank operations.
          </p>
        </div>
      </div>

      {/* Right pane - Login Form */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 32, position: 'relative', background: 'var(--bg-app)' }}>
        <div style={{ width: '100%', maxWidth: 400 }}>
          
          <div style={{ marginBottom: 48, display: 'flex', justifyContent: 'center' }}>
            <Link to="/" style={{ textDecoration: 'none' }}><IDBILogo size={48} showText={true} /></Link>
          </div>

          <AnimatePresence mode="wait">
            {step === 'login' ? (
              <motion.div
                key="login"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                <div style={{ marginBottom: 32 }}>
                  <h1 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: 8, color: 'var(--text-primary)' }}>Welcome back</h1>
                  <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Sign in to access your intelligence dashboard</p>
                </div>

                {/* Role Selector */}
                <div style={{ marginBottom: 24 }}>
                  <label style={{ fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)', display: 'block', marginBottom: 12 }}>
                    Select Portal Identity
                  </label>
                  <div style={{ display: 'flex', gap: 8, background: 'var(--bg-elevated)', padding: 4, borderRadius: 'var(--radius-md)' }}>
                    {([
                      { key: 'customer' as const, label: 'Customer' },
                      { key: 'officer' as const, label: 'Officer' },
                      { key: 'admin' as const, label: 'System Admin' },
                    ]).map(opt => (
                      <button key={opt.key} onClick={() => setRole(opt.key)} style={{
                        flex: 1, padding: '8px 4px', borderRadius: 'var(--radius-sm)', border: 'none',
                        background: role === opt.key ? 'var(--bg-surface)' : 'transparent',
                        color: role === opt.key ? 'var(--text-primary)' : 'var(--text-secondary)',
                        boxShadow: role === opt.key ? 'var(--shadow-sm)' : 'none',
                        fontSize: '0.75rem', fontWeight: 500, cursor: 'pointer', fontFamily: 'var(--font)',
                        transition: 'all 200ms ease',
                      }}>
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                <form onSubmit={handleLoginSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  <div className="input-group">
                    <label>{role === 'customer' ? 'GSTIN / Udyam Number' : 'Employee ID'}</label>
                    <input required className="input" placeholder={role === 'customer' ? 'Enter GSTIN or Udyam' : 'Enter Employee ID'} />
                  </div>
                  <div className="input-group">
                    <label>Password</label>
                    <input required className="input" type="password" placeholder="Enter password" />
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 4 }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>
                      <input type="checkbox" style={{ accentColor: 'var(--accent)' }} /> Remember me
                    </label>
                    <a href="#" style={{ fontSize: '0.8125rem', color: 'var(--accent)', textDecoration: 'none', fontWeight: 500 }}>Forgot password?</a>
                  </div>

                  <button type="submit" disabled={loading} className="btn btn-primary btn-lg" style={{ width: '100%', marginTop: 12, height: 44 }}>
                    {loading ? (
                      <div style={{ width: 16, height: 16, border: '2px solid rgba(255,255,255,0.3)', borderTopColor: 'white', borderRadius: '50%', animation: 'spin 0.6s linear infinite' }} />
                    ) : (
                      <>Continue <ArrowRight size={16} /></>
                    )}
                  </button>
                </form>
                
                {role === 'customer' && (
                  <div style={{ textAlign: 'center', marginTop: 24, fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>
                    Don't have an account? <Link to="/" style={{ color: 'var(--accent)', fontWeight: 600, textDecoration: 'none' }}>Register Business</Link>
                  </div>
                )}
              </motion.div>
            ) : (
              <motion.div
                key="otp"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div style={{ marginBottom: 32 }}>
                  <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 48, height: 48, borderRadius: 24, background: 'var(--success-muted)', color: 'var(--success)', marginBottom: 16 }}>
                    <ShieldCheck size={24} />
                  </div>
                  <h1 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: 8, color: 'var(--text-primary)' }}>Two-Step Verification</h1>
                  <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                    We've sent a 6-digit code to your registered mobile number ending in <b>**210</b>.
                  </p>
                </div>

                <form onSubmit={handleOtpSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                  <div style={{ display: 'flex', gap: 12, justifyContent: 'space-between' }}>
                    {otp.map((digit, i) => (
                      <input
                        key={i}
                        id={`otp-${i}`}
                        type="text"
                        value={digit}
                        onChange={(e) => handleOtpChange(i, e.target.value)}
                        style={{
                          width: '45px', height: '56px', fontSize: '1.5rem', textAlign: 'center',
                          borderRadius: 'var(--radius-md)', border: '1px solid var(--border)',
                          background: 'var(--bg-surface)', color: 'var(--text-primary)',
                          outline: 'none', transition: 'all 0.2s ease', fontFamily: 'var(--font-mono)'
                        }}
                        onFocus={(e) => e.target.style.borderColor = 'var(--accent)'}
                        onBlur={(e) => e.target.style.borderColor = 'var(--border)'}
                      />
                    ))}
                  </div>

                  <button type="submit" disabled={loading || otp.join('').length < 6} className="btn btn-primary btn-lg" style={{ width: '100%', height: 44 }}>
                    {loading ? (
                      <div style={{ width: 16, height: 16, border: '2px solid rgba(255,255,255,0.3)', borderTopColor: 'white', borderRadius: '50%', animation: 'spin 0.6s linear infinite' }} />
                    ) : (
                      <>Verify & Access Platform <CheckCircle2 size={16} /></>
                    )}
                  </button>
                </form>

                <div style={{ textAlign: 'center', marginTop: 24, fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>
                  Didn't receive the code? <button onClick={() => setStep('login')} className="btn btn-ghost btn-sm" style={{ padding: 0, fontWeight: 600, color: 'var(--text-primary)' }}>Resend SMS</button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div style={{ textAlign: 'center', marginTop: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
            <Lock size={12} style={{ color: 'var(--text-muted)' }} />
            <span style={{ fontSize: '0.6875rem', color: 'var(--text-muted)' }}>Protected by 256-bit SSL Encryption</span>
          </div>
        </div>
      </div>
    </div>
  );
}
