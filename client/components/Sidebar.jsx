import { useNavigate } from 'react-router-dom';
import { LayoutDashboard, Upload, History, LogOut, Mic, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const navItems = [
  { label: 'Dashboard', page: 'dashboard', icon: LayoutDashboard },
  { label: 'Upload Consultation', page: 'upload', icon: Upload },
  { label: 'Consultation History', page: 'history', icon: History },
];

export default function Sidebar({ activePage, onNavigate, mobileOpen, onMobileClose }) {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  function handleLogout() {
    logout();
    navigate('/login');
  }

  function handleNav(page) {
    onNavigate(page);
    onMobileClose?.();
  }

  function initials(name) {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .slice(0, 2)
      .toUpperCase();
  }

  const userName = user?.name || 'User';
  const userEmail = user?.email || '';

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex w-[216px] min-h-screen bg-white border-r border-gray-200 flex-col flex-shrink-0">
        <SidebarContent
          activePage={activePage}
          onNavigate={handleNav}
          onLogout={handleLogout}
          userName={userName}
          userEmail={userEmail}
          initialsFn={initials}
        />
      </aside>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/30" onClick={onMobileClose} />
          <aside className="absolute left-0 top-0 bottom-0 w-[260px] bg-white shadow-xl flex flex-col">
            <div className="flex items-center justify-between px-5 h-14 border-b border-gray-100">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
                  <Mic className="w-4 h-4 text-white" />
                </div>
                <span className="font-semibold text-gray-900 text-sm">Consultations</span>
              </div>
              <button onClick={onMobileClose} className="p-1 text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <SidebarContent
              activePage={activePage}
              onNavigate={handleNav}
              onLogout={handleLogout}
              userName={userName}
              userEmail={userEmail}
              initialsFn={initials}
            />
          </aside>
        </div>
      )}
    </>
  );
}

function SidebarContent({ activePage, onNavigate, onLogout, userName, userEmail, initialsFn }) {
  return (
    <>
      {/* Logo - only on desktop (mobile has it in the overlay header) */}
      <div className="hidden lg:flex items-center gap-2.5 px-5 h-14 border-b border-gray-100">
        <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
          <Mic className="w-4 h-4 text-white" />
        </div>
        <span className="font-semibold text-gray-900 text-sm">Consultations</span>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-0.5">
        {navItems.map(({ label, page, icon: Icon }) => {
          const isActive = activePage === page || (activePage === 'details' && page === 'history');
          return (
            <button
              key={page}
              onClick={() => onNavigate(page)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 lg:py-2 rounded-md text-sm transition-colors ${
                isActive
                  ? 'bg-gray-100 text-gray-900 font-medium'
                  : 'text-gray-500 hover:bg-gray-50 hover:text-gray-800'
              }`}
            >
              <Icon className="w-4 h-4 flex-shrink-0" />
              {label}
            </button>
          );
        })}
      </nav>

      <div className="px-3 pb-3">
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 lg:py-2 rounded-md text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-800 transition-colors"
        >
          <LogOut className="w-4 h-4 flex-shrink-0" />
          Logout
        </button>
      </div>

      <div className="px-4 py-4 border-t border-gray-100 flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-slate-600 flex items-center justify-center text-white text-xs font-semibold flex-shrink-0">
          {initialsFn(userName)}
        </div>
        <div className="min-w-0">
          <p className="text-xs font-semibold text-gray-900 truncate">{userName}</p>
          <p className="text-xs text-gray-400 truncate">{userEmail}</p>
        </div>
      </div>
    </>
  );
}
