import { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, SlidersHorizontal, ArrowUpDown, MoreHorizontal, Check } from 'lucide-react';
import { getConsultations, searchConsultations } from '../../services/consultationService';
import CategoryBadge from '../../components/CategoryBadge';

const CATEGORIES = ['Therapy', 'Financial', 'Astrology', 'Legal', 'Coaching', 'Medical'];

const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest first' },
  { value: 'oldest', label: 'Oldest first' },
  { value: 'client-asc', label: 'Client A–Z' },
  { value: 'client-desc', label: 'Client Z–A' },
  { value: 'title-asc', label: 'Title A–Z' },
];

function formatDate(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' });
}

function applySort(items, sort) {
  const sorted = [...items];
  switch (sort) {
    case 'newest':
      return sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    case 'oldest':
      return sorted.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    case 'client-asc':
      return sorted.sort((a, b) => a.clientName.localeCompare(b.clientName));
    case 'client-desc':
      return sorted.sort((a, b) => b.clientName.localeCompare(a.clientName));
    case 'title-asc':
      return sorted.sort((a, b) => a.title.localeCompare(b.title));
    default:
      return sorted;
  }
}

export default function ConsultationHistory({ onNavigate }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [consultations, setConsultations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [searching, setSearching] = useState(false);
  const debounceRef = useRef(null);
  const mountedRef = useRef(false);

  const [filterOpen, setFilterOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);
  const [activeCategories, setActiveCategories] = useState([]);
  const [sort, setSort] = useState('newest');

  const filterRef = useRef(null);
  const sortRef = useRef(null);

  useEffect(() => {
    getConsultations()
      .then((data) => setConsultations(data.consultations))
      .catch((err) => setError(err.response?.data?.message || 'Failed to load consultations'))
      .finally(() => { setLoading(false); mountedRef.current = true; });
  }, []);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);

    const q = query.trim();

    if (!q) {
      setSearching(false);
      setSearchParams({});
      if (mountedRef.current) {
        getConsultations()
          .then((data) => setConsultations(data.consultations))
          .catch(() => {});
      }
      return;
    }

    setSearchParams({ q });
    setSearching(true);
    debounceRef.current = setTimeout(() => {
      searchConsultations(q)
        .then((data) => setConsultations(data.consultations))
        .catch(() => {})
        .finally(() => setSearching(false));
    }, 400);

    return () => clearTimeout(debounceRef.current);
  }, [query]);

  // Close dropdowns on outside click
  useEffect(() => {
    function handleClick(e) {
      if (filterRef.current && !filterRef.current.contains(e.target)) setFilterOpen(false);
      if (sortRef.current && !sortRef.current.contains(e.target)) setSortOpen(false);
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  function toggleCategory(cat) {
    setActiveCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  }

  let displayed = consultations;
  if (activeCategories.length > 0) {
    displayed = displayed.filter((c) => activeCategories.includes(c.category));
  }
  displayed = applySort(displayed, sort);

  const hasActiveFilters = activeCategories.length > 0;

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
          {/* Filter dropdown */}
          <div ref={filterRef} className="relative">
            <button
              onClick={() => { setFilterOpen(!filterOpen); setSortOpen(false); }}
              className={`flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3 py-2 text-sm border rounded-lg transition-colors ${
                hasActiveFilters
                  ? 'border-blue-300 bg-blue-50 text-blue-700'
                  : 'border-gray-200 text-gray-600 hover:bg-gray-50'
              }`}
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filter
              {hasActiveFilters && (
                <span className="ml-1 w-5 h-5 rounded-full bg-blue-600 text-white text-xs flex items-center justify-center">
                  {activeCategories.length}
                </span>
              )}
            </button>
            {filterOpen && (
              <div className="absolute right-0 top-full mt-1 w-56 bg-white border border-gray-200 rounded-xl shadow-lg z-20 p-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-gray-900">Category</span>
                  {hasActiveFilters && (
                    <button onClick={() => setActiveCategories([])} className="text-xs text-blue-600 hover:underline">
                      Clear
                    </button>
                  )}
                </div>
                <div className="space-y-1">
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => toggleCategory(cat)}
                      className="w-full flex items-center gap-2.5 px-2 py-1.5 rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      <div className={`w-4 h-4 rounded border flex items-center justify-center flex-shrink-0 ${
                        activeCategories.includes(cat) ? 'bg-blue-600 border-blue-600' : 'border-gray-300'
                      }`}>
                        {activeCategories.includes(cat) && <Check className="w-3 h-3 text-white" />}
                      </div>
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sort dropdown */}
          <div ref={sortRef} className="relative">
            <button
              onClick={() => { setSortOpen(!sortOpen); setFilterOpen(false); }}
              className={`flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3 py-2 text-sm border rounded-lg transition-colors ${
                sort !== 'newest'
                  ? 'border-blue-300 bg-blue-50 text-blue-700'
                  : 'border-gray-200 text-gray-600 hover:bg-gray-50'
              }`}
            >
              <ArrowUpDown className="w-4 h-4" />
              Sort
            </button>
            {sortOpen && (
              <div className="absolute right-0 top-full mt-1 w-48 bg-white border border-gray-200 rounded-xl shadow-lg z-20 p-2">
                {SORT_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => { setSort(opt.value); setSortOpen(false); }}
                    className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
                      sort === opt.value
                        ? 'bg-blue-50 text-blue-700 font-medium'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            )}
          </div>
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
              {displayed.map((c, i) => (
                <tr
                  key={c._id}
                  className={`group hover:bg-gray-50 transition-colors cursor-pointer ${
                    i !== displayed.length - 1 ? 'border-b border-gray-100' : ''
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
              {displayed.length === 0 && (
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
          {displayed.length === 0 && (
            <div className="bg-white border border-gray-200 rounded-xl px-4 py-12 text-center text-sm text-gray-400">
              No consultations found.
            </div>
          )}
          {displayed.map((c) => (
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
