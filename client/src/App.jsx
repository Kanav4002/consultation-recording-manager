import { useState } from 'react';
import { Routes, Route, useNavigate, useParams, useLocation } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import TopBar from '../components/TopBar';
import ProtectedRoute from '../components/ProtectedRoute';
import Dashboard from '../pages/dashboard/Dashboard';
import ConsultationHistory from '../pages/consultations/History';
import UploadConsultation from '../pages/consultations/UploadConsultation';
import ConsultationDetails from '../pages/consultations/ConsultationDetails';
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';

const PAGE_TITLES = {
  '/': 'Dashboard',
  '/upload': 'Upload Consultation',
  '/history': 'Consultation History',
};

function AppLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleNavigate = (page, consultationId) => {
    if (page === 'dashboard') navigate('/');
    else if (page === 'upload') navigate('/upload');
    else if (page === 'history') navigate('/history');
    else if (page === 'details') navigate(`/consultations/${consultationId}`);
  };

  const path = location.pathname;
  let activePage = 'dashboard';
  if (path.startsWith('/consultations/')) activePage = 'details';
  else if (path === '/upload') activePage = 'upload';
  else if (path === '/history') activePage = 'history';

  const title = PAGE_TITLES[path] || 'Consultation Details';

  return (
    <div className="flex min-h-screen bg-gray-50 font-sans">
      <Sidebar
        activePage={activePage}
        onNavigate={handleNavigate}
        mobileOpen={mobileOpen}
        onMobileClose={() => setMobileOpen(false)}
      />
      <div className="flex-1 flex flex-col min-w-0">
        <TopBar title={title} onMenuClick={() => setMobileOpen(true)} />
        <main className="flex-1 overflow-y-auto">
          <Routes>
            <Route path="/" element={<Dashboard onNavigate={handleNavigate} />} />
            <Route path="/upload" element={<UploadConsultation onNavigate={handleNavigate} />} />
            <Route path="/history" element={<ConsultationHistory onNavigate={handleNavigate} />} />
            <Route path="/consultations/:id" element={<ConsultationDetailsPage onNavigate={handleNavigate} />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

function ConsultationDetailsPage({ onNavigate }) {
  const { id } = useParams();
  return <ConsultationDetails consultationId={id} onNavigate={onNavigate} />;
}

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/*"
        element={
          <ProtectedRoute>
            <AppLayout />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}
