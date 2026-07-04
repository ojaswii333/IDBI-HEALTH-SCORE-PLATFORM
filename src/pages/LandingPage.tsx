import { useState, useEffect } from 'react';
import Preloader from '../components/Preloader';
import CustomCursor from '../components/CustomCursor';
import Header from './landing/Header';
import HeroSection from './landing/HeroSection';
import TrustedBySection from './landing/TrustedBySection';
import HowItWorksSection from './landing/HowItWorksSection';
import ProductShowcaseSection from './landing/ProductShowcaseSection';
import FinancialJourneySection from './landing/FinancialJourneySection';
import GrowthInsightsSection from './landing/GrowthInsightsSection';
import SecuritySection from './landing/SecuritySection';
import FutureOfBankingSection from './landing/FutureOfBankingSection';
import FaqSection from './landing/FaqSection';
import CtaSection from './landing/CtaSection';
import PremiumFooter from './landing/PremiumFooter';

export default function LandingPage() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Add global class for cursor hiding
    document.body.classList.add('landing-page-active');
    return () => document.body.classList.remove('landing-page-active');
  }, []);

  return (
    <div style={{ minHeight: '100vh', background: '#05080A', color: 'white', overflowX: 'hidden', position: 'relative' }}>
      
      {/* Global Ambient Glow to fix the "too black" issue and make it fascinating */}
      <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent, rgba(5,8,10,0.8) 80%)', zIndex: 1 }} />
        {/* Massive IDBI Green Glow */}
        <div 
          style={{ position: 'absolute', top: '-10%', left: '-10%', width: '60vw', height: '60vw', borderRadius: '50%', background: 'radial-gradient(circle, rgba(0, 131, 108, 0.25) 0%, transparent 60%)', filter: 'blur(120px)', animation: 'float1 20s infinite alternate ease-in-out' }} 
        />
        {/* Massive IDBI Orange Glow */}
        <div 
          style={{ position: 'absolute', top: '40%', right: '-20%', width: '70vw', height: '70vw', borderRadius: '50%', background: 'radial-gradient(circle, rgba(245, 130, 32, 0.2) 0%, transparent 60%)', filter: 'blur(140px)', animation: 'float2 25s infinite alternate-reverse ease-in-out' }} 
        />
        {/* Center Bright Spot */}
        <div 
          style={{ position: 'absolute', top: '20%', left: '30%', width: '40vw', height: '40vw', borderRadius: '50%', background: 'radial-gradient(circle, rgba(64, 224, 208, 0.15) 0%, transparent 60%)', filter: 'blur(100px)', animation: 'float1 15s infinite alternate ease-in-out' }} 
        />
      </div>

      {/* Global Keyframes for the orbs */}
      <style>
        {`
          @keyframes float1 { 0% { transform: translate(0, 0) scale(1); } 100% { transform: translate(5%, 10%) scale(1.1); } }
          @keyframes float2 { 0% { transform: translate(0, 0) scale(1); } 100% { transform: translate(-5%, -10%) scale(1.2); } }
        `}
      </style>

      <CustomCursor />
      {!isLoaded && <Preloader onComplete={() => setIsLoaded(true)} />}
      
      <Header />
      
      <main style={{ position: 'relative', zIndex: 10 }}>
        <HeroSection />
        <TrustedBySection />
        <HowItWorksSection />
        <ProductShowcaseSection />
        <FinancialJourneySection />
        <GrowthInsightsSection />
        <SecuritySection />
        <FutureOfBankingSection />
        <FaqSection />
        <CtaSection />
      </main>

      <PremiumFooter />
    </div>
  );
}
