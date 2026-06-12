import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { ShieldCheck, Upload, Tag, StickyNote, History, Search, Play, BarChart3 } from 'lucide-react';

const features = [
  {
    icon: ShieldCheck,
    title: 'Secure Authentication',
    description: 'JWT-based login with protected routes. Your data is only accessible to you.',
    color: 'text-blue-600 dark:text-blue-400',
    bg: 'bg-blue-50 dark:bg-blue-950/50',
  },
  {
    icon: Upload,
    title: 'Audio Uploads',
    description: 'Drag-and-drop audio files in any common format. Validated and stored securely in the cloud.',
    color: 'text-violet-600 dark:text-violet-400',
    bg: 'bg-violet-50 dark:bg-violet-950/50',
  },
  {
    icon: Tag,
    title: 'Consultation Metadata',
    description: 'Attach client name, session type, date, duration, and custom tags to every recording.',
    color: 'text-orange-600 dark:text-orange-400',
    bg: 'bg-orange-50 dark:bg-orange-950/50',
  },
  {
    icon: StickyNote,
    title: 'Notes Management',
    description: 'Write and edit session notes inline. Rich text support with auto-save.',
    color: 'text-yellow-600 dark:text-yellow-400',
    bg: 'bg-yellow-50 dark:bg-yellow-950/50',
  },
  {
    icon: History,
    title: 'Consultation History',
    description: 'Browse your complete consultation timeline. Filter by client, date, or session type.',
    color: 'text-teal-600 dark:text-teal-400',
    bg: 'bg-teal-50 dark:bg-teal-950/50',
  },
  {
    icon: Search,
    title: 'Powerful Search',
    description: 'Find any consultation in under 5 seconds by client name, notes content, or metadata.',
    color: 'text-blue-600 dark:text-blue-400',
    bg: 'bg-blue-50 dark:bg-blue-950/50',
  },
  {
    icon: Play,
    title: 'In-App Playback',
    description: 'Listen to recordings directly in the browser. No downloads or external players needed.',
    color: 'text-emerald-600 dark:text-emerald-400',
    bg: 'bg-emerald-50 dark:bg-emerald-950/50',
  },
  {
    icon: BarChart3,
    title: 'Dashboard Analytics',
    description: 'Session frequency, client stats, and usage patterns at a glance.',
    color: 'text-rose-600 dark:text-rose-400',
    bg: 'bg-rose-50 dark:bg-rose-950/50',
  },
];

export default function Features() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="features" ref={ref} className="py-24 bg-white dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <div className="inline-block px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-xs font-medium tracking-wide uppercase mb-4">
            Features
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white leading-tight mb-4">
            Everything you need to run<br className="hidden sm:block" /> consultations with clarity.
          </h2>
          <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto text-base leading-relaxed">
            This platform gives you the tools professionals trust — one place to manage every consultation, for every client.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="group p-6 rounded-2xl border border-gray-100 dark:border-gray-800 hover:border-gray-200 dark:hover:border-gray-700 hover:shadow-md transition-all duration-200 cursor-default"
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${feature.bg} group-hover:scale-105 transition-transform duration-200`}>
                <feature.icon size={18} className={feature.color} />
              </div>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-2 leading-snug">{feature.title}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
