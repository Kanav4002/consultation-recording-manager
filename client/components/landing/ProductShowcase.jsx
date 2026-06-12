import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { LayoutDashboard, Upload, History, FileText } from 'lucide-react';

const tabs = [
  {
    id: 'dashboard',
    icon: LayoutDashboard,
    label: 'Dashboard',
    description: 'Your command center — see recent consultations, playback controls, and usage stats at a glance.',
  },
  {
    id: 'upload',
    icon: Upload,
    label: 'Upload Consultation',
    description: 'Simple, guided upload flow. Add file, fill metadata, and you\'re done in under a minute.',
  },
  {
    id: 'history',
    icon: History,
    label: 'Consultation History',
    description: 'Scrollable, filterable timeline of every session you\'ve ever recorded.',
  },
  {
    id: 'details',
    icon: FileText,
    label: 'Consultation Details',
    description: 'Full-page view with playback, metadata, and inline notes for any consultation.',
  },
];

function DashboardMockup() {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden shadow-md">
      <div className="flex items-center gap-2 px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700">
        <div className="flex gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-red-400" /><div className="w-2.5 h-2.5 rounded-full bg-yellow-400" /><div className="w-2.5 h-2.5 rounded-full bg-green-400" /></div>
        <span className="text-xs text-gray-400 ml-2 flex-1">Dashboard — Consultation Recording Manager</span>
      </div>
      <div className="p-4 space-y-3">
        <div className="grid grid-cols-3 gap-3">
          {['12 sessions', '8 clients', '42h recorded'].map((s, i) => (
            <div key={i} className="bg-blue-50 dark:bg-blue-950/40 rounded-lg p-3 text-center">
              <p className="text-sm font-bold text-blue-700 dark:text-blue-300">{s.split(' ')[0]}</p>
              <p className="text-[10px] text-blue-500 dark:text-blue-400 capitalize">{s.split(' ').slice(1).join(' ')}</p>
            </div>
          ))}
        </div>
        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3">
          <p className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-2">Recent sessions</p>
          {['Priya Sharma · Follow-up', 'Arjun Mehta · Initial', 'Deepa Nair · Review'].map((row, i) => (
            <div key={i} className="flex items-center justify-between py-1.5 border-b border-gray-100 dark:border-gray-700 last:border-0">
              <span className="text-xs text-gray-700 dark:text-gray-300">{row}</span>
              <span className="text-[10px] text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 px-2 py-0.5 rounded-full">Play</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function UploadMockup() {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden shadow-md">
      <div className="flex items-center gap-2 px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700">
        <div className="flex gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-red-400" /><div className="w-2.5 h-2.5 rounded-full bg-yellow-400" /><div className="w-2.5 h-2.5 rounded-full bg-green-400" /></div>
        <span className="text-xs text-gray-400 ml-2">Upload Consultation</span>
      </div>
      <div className="p-4 space-y-3">
        <div className="border-2 border-dashed border-blue-200 dark:border-blue-900 rounded-lg p-6 text-center bg-blue-50/50 dark:bg-blue-950/20">
          <Upload size={20} className="text-blue-400 mx-auto mb-2" />
          <p className="text-xs text-gray-600 dark:text-gray-400">Drop audio file here</p>
          <p className="text-[10px] text-gray-400 dark:text-gray-500 mt-1">MP3, M4A, WAV, OGG — max 500MB</p>
        </div>
        {[['Client Name', 'Priya Sharma'], ['Session Type', 'Follow-up'], ['Date', 'Jun 10, 2026']].map(([label, val], i) => (
          <div key={i}>
            <p className="text-[10px] text-gray-500 dark:text-gray-400 mb-1">{label}</p>
            <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 text-xs text-gray-700 dark:text-gray-300">{val}</div>
          </div>
        ))}
        <button className="w-full py-2 rounded-lg bg-blue-600 text-white text-xs font-semibold">Upload Consultation</button>
      </div>
    </div>
  );
}

function HistoryMockup() {
  const entries = [
    { name: 'Priya Sharma', type: 'Follow-up', date: 'Jun 10', dur: '42m' },
    { name: 'Arjun Mehta', type: 'Initial', date: 'Jun 8', dur: '58m' },
    { name: 'Deepa Nair', type: 'Review', date: 'Jun 6', dur: '35m' },
    { name: 'Rahul Gupta', type: 'Follow-up', date: 'Jun 3', dur: '48m' },
  ];
  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden shadow-md">
      <div className="flex items-center gap-2 px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700">
        <div className="flex gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-red-400" /><div className="w-2.5 h-2.5 rounded-full bg-yellow-400" /><div className="w-2.5 h-2.5 rounded-full bg-green-400" /></div>
        <span className="text-xs text-gray-400 ml-2">Consultation History</span>
      </div>
      <div className="p-4">
        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg px-3 py-2 text-xs text-gray-400 mb-3 flex items-center gap-2">
          <span>🔍</span> Search consultations...
        </div>
        <div className="space-y-2">
          {entries.map((e, i) => (
            <div key={i} className="flex items-center justify-between p-2.5 rounded-lg border border-gray-100 dark:border-gray-800 hover:border-blue-200 dark:hover:border-blue-900 transition-colors">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center text-white text-[9px] font-bold">
                  {e.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-800 dark:text-gray-200">{e.name}</p>
                  <p className="text-[10px] text-gray-400">{e.date}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-gray-500 dark:text-gray-400">{e.dur}</span>
                <span className="text-[10px] bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 px-1.5 py-0.5 rounded-full">{e.type}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function DetailsMockup() {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden shadow-md">
      <div className="flex items-center gap-2 px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700">
        <div className="flex gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-red-400" /><div className="w-2.5 h-2.5 rounded-full bg-yellow-400" /><div className="w-2.5 h-2.5 rounded-full bg-green-400" /></div>
        <span className="text-xs text-gray-400 ml-2">Consultation Details</span>
      </div>
      <div className="p-4 space-y-3">
        <div>
          <p className="text-sm font-semibold text-gray-900 dark:text-white">Priya Sharma</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">Follow-up · Jun 10, 2026 · 42 minutes</p>
        </div>
        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3">
          <div className="flex items-center gap-0.5 h-8 mb-2">
            {Array.from({ length: 40 }, (_, i) => {
              const h = 30 + Math.sin(i * 0.5) * 20 + Math.cos(i * 0.8) * 15;
              return <div key={i} className={`flex-1 rounded-full ${i < 20 ? 'bg-blue-500' : 'bg-gray-200 dark:bg-gray-600'}`} style={{ height: `${Math.max(10, h)}%` }} />;
            })}
          </div>
          <div className="flex justify-between text-[10px] text-gray-400">
            <span>21:00</span><span>42:00</span>
          </div>
        </div>
        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3">
          <p className="text-[10px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1.5">Session Notes</p>
          <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">Client reported significant improvement in sleep patterns. Discussed CBT strategies for recurring anxiety. Follow-up scheduled in 2 weeks.</p>
        </div>
      </div>
    </div>
  );
}

const mockups = {
  dashboard: DashboardMockup,
  upload: UploadMockup,
  history: HistoryMockup,
  details: DetailsMockup,
};

export default function ProductShowcase() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const [active, setActive] = useState('dashboard');

  const activeTab = tabs.find(t => t.id === active);
  const MockupComponent = mockups[active];

  return (
    <section ref={ref} className="py-24 bg-white dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="inline-block px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-xs font-medium tracking-wide uppercase mb-4">
            See it in action
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white leading-tight mb-4">
            A look inside the workspace.
          </h2>
          <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto text-base leading-relaxed">
            Built for speed and focus — every screen optimizes the way professionals actually work.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          {/* Tab buttons */}
          <div className="flex flex-wrap gap-2 justify-center mb-8">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActive(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                  active === tab.id
                    ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900 shadow-sm'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                <tab.icon size={15} />
                {tab.label}
              </button>
            ))}
          </div>

          {/* Mockup display */}
          <div className="grid lg:grid-cols-2 gap-8 items-center max-w-5xl mx-auto">
            <motion.div
              key={active}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <MockupComponent />
            </motion.div>
            <motion.div
              key={active + '-text'}
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.05 }}
              className="text-center lg:text-left"
            >
              <div className="flex items-center gap-3 mb-4 justify-center lg:justify-start">
                <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/50 flex items-center justify-center">
                  {activeTab && <activeTab.icon size={18} className="text-blue-600 dark:text-blue-400" />}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{activeTab?.label}</h3>
              </div>
              <p className="text-gray-500 dark:text-gray-400 text-base leading-relaxed mb-6">
                {activeTab?.description}
              </p>
              <button className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors">
                Learn more about this feature →
              </button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
