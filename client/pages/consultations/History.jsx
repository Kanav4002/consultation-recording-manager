import { useState } from 'react';
import { Search, SlidersHorizontal, ArrowUpDown, MoreHorizontal } from 'lucide-react';
import { CONSULTATIONS } from '../../src/data/data';
import CategoryBadge from '../../components/CategoryBadge';

function formatDate(dateStr) {
  const [y, m, d] = dateStr.split('-');
  return `${d}/${m}/${y}`;
}

export default function ConsultationHistory({ onNavigate }) {
  const [query, setQuery] = useState('');

  const filtered = CONSULTATIONS.filter(
    (c) =>
      c.client.toLowerCase().includes(query.toLowerCase()) ||
      c.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="p-8 max-w-5xl">
      <h1 className="text-2xl font-bold text-gray-900">Consultation History</h1>
      <p className="text-sm text-gray-500 mt-1">Search and manage your consultation records.</p>

      {/* Search + controls */}
      <div className="flex items-center gap-3 mt-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by client or title..."
            className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <button className="flex items-center gap-1.5 px-3 py-2 text-sm border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors">
          <SlidersHorizontal className="w-4 h-4" />
          Filter
        </button>
        <button className="flex items-center gap-1.5 px-3 py-2 text-sm border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors">
          <ArrowUpDown className="w-4 h-4" />
          Sort
        </button>
      </div>

      {/* Table */}
      <div className="mt-4 bg-white border border-gray-200 rounded-xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="text-left px-5 py-3 text-xs font-medium text-gray-400 w-[200px]">Client</th>
              <th className="text-left px-4 py-3 text-xs font-medium text-gray-400">Title</th>
              <th className="text-left px-4 py-3 text-xs font-medium text-gray-400 w-[140px]">Category</th>
              <th className="text-left px-4 py-3 text-xs font-medium text-gray-400 w-[120px]">Consultation</th>
              <th className="text-left px-4 py-3 text-xs font-medium text-gray-400 w-[120px]">Created</th>
              <th className="w-12" />
            </tr>
          </thead>
          <tbody>
            {filtered.map((c, i) => (
              <tr
                key={c.id}
                className={`group hover:bg-gray-50 transition-colors cursor-pointer ${
                  i !== filtered.length - 1 ? 'border-b border-gray-100' : ''
                }`}
                onClick={() => onNavigate('details', c.id)}
              >
                <td className="px-5 py-4 text-sm font-semibold text-gray-900">{c.client}</td>
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
            {filtered.length === 0 && (
              <tr>
                <td colSpan={6} className="px-5 py-12 text-center text-sm text-gray-400">
                  No consultations found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
