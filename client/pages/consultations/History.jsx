import { useState, useEffect, useRef } from 'react';
import { Search, SlidersHorizontal, ArrowUpDown, MoreHorizontal } from 'lucide-react';
import { getConsultations, searchConsultations } from '../../services/consultationService';
import CategoryBadge from '../../components/CategoryBadge';

function formatDate(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' });
}

export default function ConsultationHistory({ onNavigate }) {
  const [consultations, setConsultations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState('');
  const [searching, setSearching] = useState(false);
  const debounceRef = useRef(null);

  useEffect(() => {
    getConsultations()
      .then((data) => setConsultations(data.consultations))
      .catch((err) => setError(err.response?.data?.message || 'Failed to load consultations'))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);

    if (!query.trim()) {
      setSearching(false);
      getConsultations()
        .then((data) => setConsultations(data.consultations))
        .catch(() => {});
      return;
    }

    setSearching(true);
    debounceRef.current = setTimeout(() => {
      searchConsultations(query.trim())
        .then((data) => setConsultations(data.consultations))
        .catch(() => {})
        .finally(() => setSearching(false));
    }, 400);

    return () => clearTimeout(debounceRef.current);
  }, [query]);

  if (loading) {
    return (
      <div className="p-4 sm:p-6 lg:p-8 max-w-5xl flex items-center justify-center h-64">
        <p className="text-sm text-gray-400">Loading consultations...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 sm:p-6 lg:p-8 max-w-5xl flex items-center justify-center h-64">
        <p className="text-sm text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-5xl">
      <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Consultation History</h1>
      <p className="text-sm text-gray-500 mt-1">Search and manage your consultation records.</p>

      {/* Search + controls */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mt-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by client, title, or category..."
            className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div className="flex gap-3">
          <button className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3 py-2 text-sm border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors">
            <SlidersHorizontal className="w-4 h-4" />
            Filter
          </button>
          <button className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3 py-2 text-sm border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors">
            <ArrowUpDown className="w-4 h-4" />
            Sort
          </button>
        </div>
      </div>

      {searching && (
        <div className="mt-4 text-center text-sm text-gray-400 py-8">Searching...</div>
      )}

      {/* Desktop table */}
      {!searching && (
        <div className="mt-4 bg-white border border-gray-200 rounded-xl overflow-hidden hidden md:block">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left px-5 py-3 text-xs font-medium text-gray-400">Client</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-400">Title</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-400 w-[140px]">Category</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-400 w-[120px]">Consultation</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-400 w-[120px]">Created</th>
                <th className="w-12" />
              </tr>
            </thead>
            <tbody>
              {consultations.map((c, i) => (
                <tr
                  key={c._id}
                  className={`group hover:bg-gray-50 transition-colors cursor-pointer ${
                    i !== consultations.length - 1 ? 'border-b border-gray-100' : ''
                  }`}
                  onClick={() => onNavigate('details', c._id)}
                >
                  <td className="px-5 py-4 text-sm font-semibold text-gray-900">{c.clientName}</td>
                  <td className="px-4 py-4 text-sm text-gray-600">{c.title}</td>
                  <td className="px-4 py-4">
                    <CategoryBadge category={c.category} />
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-600">{formatDate(c.consultationDate)}</td>
                  <td className="px-4 py-4 text-sm text-gray-600">{formatDate(c.createdAt)}</td>
                  <td className="px-3 py-4">
                    <button
                      onClick={(e) => e.stopPropagation()}
                      className="p-1 rounded text-gray-300 hover:text-gray-500 opacity-0 group-hover:opacity-100 transition-all"
                    >
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
              {consultations.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-5 py-12 text-center text-sm text-gray-400">
                    No consultations found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Mobile cards */}
      {!searching && (
        <div className="mt-4 space-y-3 md:hidden">
          {consultations.length === 0 && (
            <div className="bg-white border border-gray-200 rounded-xl px-4 py-12 text-center text-sm text-gray-400">
              No consultations found.
            </div>
          )}
          {consultations.map((c) => (
            <button
              key={c._id}
              onClick={() => onNavigate('details', c._id)}
              className="w-full bg-white border border-gray-200 rounded-xl p-4 text-left hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-gray-900 truncate">{c.clientName}</p>
                  <p className="text-xs text-gray-500 mt-0.5 truncate">{c.title}</p>
                </div>
                <CategoryBadge category={c.category} />
              </div>
              <div className="flex items-center gap-4 mt-3 text-xs text-gray-400">
                <span>{formatDate(c.consultationDate)}</span>
                <span>Created {formatDate(c.createdAt)}</span>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
