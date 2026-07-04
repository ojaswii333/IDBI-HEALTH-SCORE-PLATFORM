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
    <div style={{ minHeight: '100vh', background: '#050505', color: 'white', overflowX: 'hidden' }}>
      <CustomCursor />
      {!isLoaded && <Preloader onComplete={() => setIsLoaded(true)} />}
      
      <Header />
      
      <main>
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
