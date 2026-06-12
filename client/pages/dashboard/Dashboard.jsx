import { useState, useEffect } from 'react';
import { Mic, FileText, AudioLines, TrendingUp, Upload, History, ChevronRight, ArrowUpRight } from 'lucide-react';
import { getDashboardStats } from '../../services/dashboardService';
import CategoryBadge from '../../components/CategoryBadge';

function initials(name) {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

function formatDate(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
}

const avatarColors = [
  'bg-blue-500',
  'bg-emerald-500',
  'bg-amber-500',
  'bg-slate-500',
  'bg-sky-500',
  'bg-rose-500',
];

export default function Dashboard({ onNavigate }) {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getDashboardStats()
      .then(setStats)
      .catch((err) => setError(err.response?.data?.message || 'Failed to load dashboard'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="p-8 max-w-5xl flex items-center justify-center h-64">
        <p className="text-sm text-gray-400">Loading dashboard...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 max-w-5xl flex items-center justify-center h-64">
        <p className="text-sm text-red-500">{error}</p>
      </div>
    );
  }

  const recent = stats.recentConsultations || [];

  return (
    <div className="p-8 max-w-5xl">
      <h1 className="text-2xl font-bold text-gray-900">Welcome back, Dr. Sarah</h1>
      <p className="text-sm text-gray-500 mt-1">Here's an overview of your consultations.</p>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4 mt-6">
        <StatCard
          label="Total Consultations"
          value={String(stats.totalConsultations)}
          icon={<Mic className="w-5 h-5 text-gray-400" />}
        />
        <StatCard
          label="Total Notes"
          value={String(stats.totalNotes)}
          icon={<FileText className="w-5 h-5 text-gray-400" />}
        />
        <StatCard
          label="Total Recordings"
          value={String(stats.totalRecordings)}
          icon={<AudioLines className="w-5 h-5 text-gray-400" />}
        />
      </div>

      <div className="mt-6 grid grid-cols-3 gap-4">
        {/* Recent consultations */}
        <div className="col-span-2 bg-white border border-gray-200 rounded-xl overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
            <div>
              <p className="font-semibold text-gray-900 text-sm">Recent Consultations</p>
              <p className="text-xs text-gray-400 mt-0.5">Your latest 5 sessions</p>
            </div>
            <button
              onClick={() => onNavigate('history')}
              className="flex items-center gap-1 text-xs text-blue-600 font-medium hover:underline"
            >
              View all <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
          <ul>
            {recent.length === 0 && (
              <li className="px-5 py-8 text-center text-sm text-gray-400">No consultations yet.</li>
            )}
            {recent.map((c, i) => (
              <li key={c._id}>
                <button
                  onClick={() => onNavigate('details', c._id)}
                  className={`w-full flex items-center gap-3 px-5 py-3.5 hover:bg-gray-50 transition-colors text-left ${
                    i !== recent.length - 1 ? 'border-b border-gray-100' : ''
                  }`}
                >
                  <div className={`w-9 h-9 rounded-full ${avatarColors[i % avatarColors.length]} flex items-center justify-center text-white text-xs font-semibold flex-shrink-0`}>
                    {initials(c.clientName)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-gray-900">{c.clientName}</span>
                      <CategoryBadge category={c.category} />
                    </div>
                    <p className="text-xs text-gray-500 mt-0.5 truncate">{c.title}</p>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className="text-xs text-gray-400">{formatDate(c.createdAt)}</span>
                    <ChevronRight className="w-4 h-4 text-gray-300" />
                  </div>
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Quick actions */}
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden h-fit">
          <div className="px-5 py-4 border-b border-gray-100">
            <p className="font-semibold text-gray-900 text-sm">Quick Actions</p>
            <p className="text-xs text-gray-400 mt-0.5">Jump to common tasks</p>
          </div>
          <div className="p-3 space-y-2">
            <QuickAction
              icon={<Upload className="w-4 h-4 text-blue-600" />}
              bg="bg-blue-50"
              title="Upload Consultation"
              subtitle="Add a new recording"
              onClick={() => onNavigate('upload')}
            />
            <QuickAction
              icon={<History className="w-4 h-4 text-blue-600" />}
              bg="bg-blue-50"
              title="View History"
              subtitle="Browse past sessions"
              onClick={() => onNavigate('history')}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, badge, icon }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl px-5 py-4">
      <div className="flex items-start justify-between">
        <p className="text-xs text-gray-500 font-medium">{label}</p>
        {icon}
      </div>
      <div className="flex items-end gap-2 mt-2">
        <p className="text-2xl font-bold text-gray-900">{value}</p>
        {badge && (
          <span className="flex items-center gap-0.5 text-xs text-emerald-600 font-medium mb-0.5">
            <TrendingUp className="w-3 h-3" />
            {badge}
          </span>
        )}
      </div>
    </div>
  );
}

function QuickAction({ icon, bg, title, subtitle, onClick }) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-gray-50 transition-colors text-left"
    >
      <div className={`w-8 h-8 rounded-lg ${bg} flex items-center justify-center flex-shrink-0`}>
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-900">{title}</p>
        <p className="text-xs text-gray-400">{subtitle}</p>
      </div>
      <ChevronRight className="w-4 h-4 text-gray-300 flex-shrink-0" />
    </button>
  );
}
