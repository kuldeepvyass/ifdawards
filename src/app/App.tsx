import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { Suspense, lazy, useEffect } from 'react';
import axios from 'axios';
import { Header } from './components/shared/Header';
import Home from './pages/Home';

const AboutUs = lazy(() => import('./pages/AboutUs').then((m) => ({ default: m.AboutUs })));
const CoreTeam = lazy(() => import('./pages/CoreTeam').then((m) => ({ default: m.CoreTeam })));
const Eligibility = lazy(() => import('./pages/Eligibility').then((m) => ({ default: m.Eligibility })));
const Categories = lazy(() => import('./pages/Categories').then((m) => ({ default: m.Categories })));
const Benefits = lazy(() => import('./pages/Benefits').then((m) => ({ default: m.Benefits })));
const Partners = lazy(() => import('./pages/Partners').then((m) => ({ default: m.Partners })));
const JuryComingSoon = lazy(() => import('./pages/JuryComingSoon'));
const JuryPanel = lazy(() => import('./pages/JuryPanel'));
const Login = lazy(() => import('./pages/Login'));
const Signup = lazy(() => import('./pages/Signup'));
const SubmissionForm = lazy(() => import('./components/home/SubmissionForm'));
const PaymentStep = lazy(() => import('./components/home/PaymentStep'));
const SubmissionSuccess = lazy(() => import('./pages/SubmissionSuccess'));
const SubmitEntry = lazy(() => import('./pages/SubmitEntry').then((m) => ({ default: m.SubmitEntry })));
const FAQ = lazy(() => import('./pages/FAQ').then((m) => ({ default: m.FAQ })));
const Profile = lazy(() => import('./pages/Profile'));
const ComingSoon = lazy(() => import('./pages/ComingSoon'));
const BecomeJury = lazy(() => import('./pages/BecomeJury'));
const JuryAssignedDesigns = lazy(() => import('./pages/JuryAssignedDesigns'));
const JuryChangePassword = lazy(() => import('./pages/JuryChangePassword'));
const AdminLayout = lazy(() => import('./pages/admin/AdminLayout'));
const AdminUsers = lazy(() => import('./pages/admin/AdminUsers'));
const AdminSubmissions = lazy(() => import('./pages/admin/AdminSubmissions'));
const AdminJuryMembers = lazy(() => import('./pages/admin/AdminJuryMembers'));
const AdminJuryApplications = lazy(() => import('./pages/admin/AdminJuryApplications'));
const AdminPayments = lazy(() => import('./pages/admin/AdminPayments'));
const AdminJudgeScores = lazy(() => import('./pages/admin/AdminJudgeScores'));

// Component to handle scroll restoration
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default function App() {
  // Auto-hide scrollbar logic
  useEffect(() => {
    let timeout: number;
    const handleScroll = () => {
      document.body.classList.add('scrolling');
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        document.body.classList.remove('scrolling');
      }, 700); // Hide after 700ms of no scroll
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timeout);
    };
  }, []);

  useEffect(() => {
    const lastVisitRaw = localStorage.getItem('lastVisitAt');
    const lastVisit = lastVisitRaw ? Number(lastVisitRaw) : 0;
    const now = Date.now();
    const tenMinutes = 10 * 60 * 1000;
    if (!lastVisit || now - lastVisit > tenMinutes) {
      axios.post('/api/analytics/visit').catch(() => undefined);
      localStorage.setItem('lastVisitAt', String(now));
    }
  }, []);

  return (
    <Router>
      <ScrollToTop />
      <Header />
      <Suspense
        fallback={
          <div className="min-h-[40vh] flex items-center justify-center px-4 text-sm text-gray-600">
            Loading...
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/core-team" element={<CoreTeam />} />
          <Route path="/eligibility" element={<Eligibility />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/benefits" element={<Benefits />} />
          <Route path="/partners" element={<Partners />} />
          <Route path="/submit-entry" element={<SubmitEntry />} />
          <Route path="/coming-soon" element={<ComingSoon />} />
          <Route path="/jury-coming-soon" element={<JuryComingSoon />} />
          <Route path="/jury-panel" element={<JuryPanel />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/submit-form" element={<SubmissionForm onComplete={() => window.location.href = '/payment'} />} />
          <Route path="/payment" element={<PaymentStep onSuccess={() => window.location.href = '/submission-success'} />} />
          <Route path="/submission-success" element={<SubmissionSuccess />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/become-jury" element={<BecomeJury />} />
          <Route path="/jury/assigned-designs" element={<JuryAssignedDesigns />} />
          <Route path="/jury/change-password" element={<JuryChangePassword />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Navigate to="/admin/users" replace />} />
            <Route path="users" element={<AdminUsers />} />
            <Route path="submissions" element={<AdminSubmissions />} />
            <Route path="jury-members" element={<AdminJuryMembers />} />
            <Route path="jury-applications" element={<AdminJuryApplications />} />
            <Route path="payments" element={<AdminPayments />} />
            <Route path="judge-scores" element={<AdminJudgeScores />} />
          </Route>
        </Routes>
      </Suspense>
    </Router>
  );
}