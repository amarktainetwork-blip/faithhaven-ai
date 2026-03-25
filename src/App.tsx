import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from '@/components/ui/sonner';
import { useAuthStore } from '@/store';

// Landing Pages
import LandingPage from '@/pages/landing/LandingPage';
import AboutPage from '@/pages/landing/AboutPage';
import ContactPage from '@/pages/landing/ContactPage';
import CareersPage from '@/pages/landing/CareersPage';
import PressPage from '@/pages/landing/PressPage';
import BlogPage from '@/pages/landing/BlogPage';
import BlogPostPage from '@/pages/landing/BlogPostPage';
import HelpCenterPage from '@/pages/landing/HelpCenterPage';
import CommunityPage from '@/pages/landing/CommunityPage';
import GuidelinesPage from '@/pages/landing/GuidelinesPage';
import PrivacyPolicyPage from '@/pages/landing/PrivacyPolicyPage';
import TermsOfServicePage from '@/pages/landing/TermsOfServicePage';
import CookiePolicyPage from '@/pages/landing/CookiePolicyPage';
import GDPRPage from '@/pages/landing/GDPRPage';

// Auth Pages
import LoginPage from '@/pages/auth/LoginPage';
import RegisterPage from '@/pages/auth/RegisterPage';

// Dashboard Pages
import DashboardLayout from '@/pages/dashboard/DashboardLayout';
import AIChat from '@/pages/dashboard/AIChat';
import PrayerJournal from '@/pages/dashboard/PrayerJournal';
import DailyDevotional from '@/pages/dashboard/DailyDevotional';
import Calendar from '@/pages/dashboard/Calendar';
import SermonCreator from '@/pages/dashboard/SermonCreator';
import LiturgyBuilder from '@/pages/dashboard/LiturgyBuilder';
import YouthHub from '@/pages/dashboard/YouthHub';
import LittleLambs from '@/pages/dashboard/LittleLambs';
import BibleAudio from '@/pages/dashboard/BibleAudio';
import FamilyDevotionals from '@/pages/dashboard/FamilyDevotionals';
import WorshipMusic from '@/pages/dashboard/WorshipMusic';
import PrayerWall from '@/pages/dashboard/PrayerWall';
import AdminPanel from '@/pages/dashboard/AdminPanel';
import Settings from '@/pages/dashboard/Settings';

// Protected Route Component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuthStore();
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <Toaster position="top-right" richColors />
      <Routes>
        {/* Public Landing Pages */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/careers" element={<CareersPage />} />
        <Route path="/press" element={<PressPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/:id" element={<BlogPostPage />} />
        <Route path="/help" element={<HelpCenterPage />} />
        <Route path="/community" element={<CommunityPage />} />
        <Route path="/guidelines" element={<GuidelinesPage />} />
        <Route path="/privacy" element={<PrivacyPolicyPage />} />
        <Route path="/terms" element={<TermsOfServicePage />} />
        <Route path="/cookies" element={<CookiePolicyPage />} />
        <Route path="/gdpr" element={<GDPRPage />} />
        
        {/* Auth Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        
        {/* Protected Dashboard Routes */}
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }>
          <Route index element={<AIChat />} />
          <Route path="chat" element={<AIChat />} />
          <Route path="prayer-journal" element={<PrayerJournal />} />
          <Route path="devotional" element={<DailyDevotional />} />
          <Route path="calendar" element={<Calendar />} />
          <Route path="sermon-creator" element={<SermonCreator />} />
          <Route path="liturgy" element={<LiturgyBuilder />} />
          <Route path="youth-hub" element={<YouthHub />} />
          <Route path="little-lambs" element={<LittleLambs />} />
          <Route path="bible-audio" element={<BibleAudio />} />
          <Route path="family-devotionals" element={<FamilyDevotionals />} />
          <Route path="worship-music" element={<WorshipMusic />} />
          <Route path="prayer-wall" element={<PrayerWall />} />
          <Route path="admin" element={<AdminPanel />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
