import { Search, Bell } from 'lucide-react';

export default function TopBar({ title }) {
  return (
    <header className="h-14 border-b border-gray-200 bg-white flex items-center justify-between px-6 flex-shrink-0">
      <span className="text-sm font-medium text-gray-700">{title}</span>
      <div className="flex items-center gap-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search consultations..."
            className="pl-9 pr-4 py-1.5 text-sm bg-gray-50 border border-gray-200 rounded-md w-56 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <button className="relative p-1.5 text-gray-400 hover:text-gray-600 transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-blue-500 rounded-full" />
        </button>
      </div>
    </header>
  );
}
