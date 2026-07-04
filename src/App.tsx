import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { AuthProvider, useAuth } from './auth/AuthContext';
import { ThemeProvider } from './auth/ThemeContext';
import LandingPage from './pages/LandingPage';
import LoginPage from './auth/LoginPage';
import CustomerLayout from './customer/layout/CustomerLayout';
import AdminLayout from './admin/layout/AdminLayout';

// Customer pages (lazy would be better but keeping simple for prototype)
import CustomerDashboard from './customer/pages/Dashboard';
import HealthCard from './customer/pages/HealthCard';
import LoanEligibility from './customer/pages/LoanEligibility';
import CreditSimulator from './customer/pages/CreditSimulator';
import AIAdvisor from './customer/pages/AIAdvisor';
import BusinessInsights from './customer/pages/BusinessInsights';
import HealthTimeline from './customer/pages/HealthTimeline';
import LoanApplications from './customer/pages/LoanApplications';
import DocumentVault from './customer/pages/DocumentVault';
import Notifications from './customer/pages/Notifications';
import CustomerSettings from './customer/pages/CustomerSettings';
import IntelligenceReport from './customer/pages/IntelligenceReport';
import CustomerProfile from './customer/pages/CustomerProfile';

// Admin pages
import AdminDashboard from './admin/pages/Dashboard';
import CustomerProfiles from './admin/pages/CustomerProfiles';
import Underwriting from './admin/pages/Underwriting';
import ExplainableAI from './admin/pages/ExplainableAI';
import FeatureImportance from './admin/pages/FeatureImportance';
import ModelMonitoring from './admin/pages/ModelMonitoring';
import Benchmarking from './admin/pages/Benchmarking';
import DriftDetection from './admin/pages/DriftDetection';
import FraudAnalytics from './admin/pages/FraudAnalytics';
import AuditLogs from './admin/pages/AuditLogs';
import RiskHeatmaps from './admin/pages/RiskHeatmaps';
import RetrainingCenter from './admin/pages/RetrainingCenter';
import DataQuality from './admin/pages/DataQuality';
import ApiMonitoring from './admin/pages/ApiMonitoring';
import SystemHealth from './admin/pages/SystemHealth';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuth } = useAuth();
  return isAuth ? <>{children}</> : <Navigate to="/login" replace />;
}

function AppRoutes() {
  const { user } = useAuth();
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname.split('/')[1] || location.pathname}>
        <Route path="/login" element={<LoginPage />} />

      {/* Customer Portal */}
      <Route path="/customer" element={<ProtectedRoute><CustomerLayout /></ProtectedRoute>}>
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<CustomerDashboard />} />
        <Route path="health-card" element={<HealthCard />} />
        <Route path="loan-eligibility" element={<LoanEligibility />} />
        <Route path="simulator" element={<CreditSimulator />} />
        <Route path="advisor" element={<AIAdvisor />} />
        <Route path="insights" element={<BusinessInsights />} />
        <Route path="timeline" element={<HealthTimeline />} />
        <Route path="applications" element={<LoanApplications />} />
        <Route path="documents" element={<DocumentVault />} />
        <Route path="notifications" element={<Notifications />} />
        <Route path="settings" element={<CustomerSettings />} />
        <Route path="intelligence-report" element={<IntelligenceReport />} />
        <Route path="profile" element={<CustomerProfile />} />
      </Route>

      {/* Admin Portal */}
      <Route path="/admin" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="customers" element={<CustomerProfiles />} />
        <Route path="underwriting" element={<Underwriting />} />
        <Route path="explainability" element={<ExplainableAI />} />
        <Route path="features" element={<FeatureImportance />} />
        <Route path="monitoring" element={<ModelMonitoring />} />
        <Route path="benchmarking" element={<Benchmarking />} />
        <Route path="drift" element={<DriftDetection />} />
        <Route path="fraud" element={<FraudAnalytics />} />
        <Route path="audit" element={<AuditLogs />} />
        <Route path="risk" element={<RiskHeatmaps />} />
        <Route path="retraining" element={<RetrainingCenter />} />
        <Route path="data-quality" element={<DataQuality />} />
        <Route path="api" element={<ApiMonitoring />} />
        <Route path="system" element={<SystemHealth />} />
      </Route>

      {/* Default redirect to Landing or Dashboard based on Auth */}
      <Route path="/" element={
        user ? (
          <Navigate to={user.role === 'customer' ? '/customer/dashboard' : '/admin/dashboard'} replace />
        ) : (
          <LandingPage />
        )
      } />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}
