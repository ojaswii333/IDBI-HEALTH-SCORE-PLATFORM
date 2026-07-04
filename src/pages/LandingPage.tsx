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
    <div style={{ minHeight: '100vh', background: 'var(--bg-app)', color: 'var(--text-primary)', overflowX: 'hidden', position: 'relative' }}>
      
      {/* Light Mode subtle ambient gradient */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '80vh', background: 'linear-gradient(180deg, rgba(0,131,108,0.03) 0%, transparent 100%)', pointerEvents: 'none', zIndex: 0 }} />

      <CustomCursor />
      {!isLoaded && <Preloader onComplete={() => setIsLoaded(true)} />}
      
      <Header />
      
      <main style={{ position: 'relative', zIndex: 10 }}>
        <HeroSection />
        <TrustedBySection />
        <FutureOfBankingSection />
        <HowItWorksSection />
        <ProductShowcaseSection />
        <FinancialJourneySection />
        <GrowthInsightsSection />
        <SecuritySection />
        <FaqSection />
        <CtaSection />
      </main>

      <PremiumFooter />
    </div>
  );
}
