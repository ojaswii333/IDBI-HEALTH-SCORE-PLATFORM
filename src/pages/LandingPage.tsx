import { Link } from 'react-router-dom';
import IDBILogo from '../components/IDBILogo';
import Preloader from '../components/Preloader';
import CustomCursor from '../components/CustomCursor';
import HeroSection from './landing/HeroSection';
import FeaturesSection from './landing/FeaturesSection';
import JourneySection from './landing/JourneySection';
import TrustSection from './landing/TrustSection';
import CtaSection from './landing/CtaSection';
import { useState, useEffect } from 'react';

export default function LandingPage() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Add global class for cursor hiding
    document.body.classList.add('landing-page-active');
    return () => document.body.classList.remove('landing-page-active');
  }, []);

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-app)', color: 'var(--text-primary)', overflowX: 'hidden' }}>
      <CustomCursor />
      {!isLoaded && <Preloader onComplete={() => setIsLoaded(true)} />}
      
      {/* Navigation */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        background: 'rgba(9,9,11,0.85)', backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(255,255,255,0.05)'
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '20px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <IDBILogo size={36} />
          <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
            <Link to="/login" className="btn btn-ghost" style={{ fontWeight: 600 }}>Sign In</Link>
            <Link to="/login" className="btn btn-primary" style={{ borderRadius: 100, padding: '10px 20px' }}>Open Account</Link>
          </div>
        </div>
      </nav>

      <HeroSection />
      <FeaturesSection />
      <JourneySection />
      <TrustSection />
      <CtaSection />
      
    </div>
  );
}
