import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Mic2, FileText, Heart, Smartphone, Calendar } from 'lucide-react';

const upcoming = [
  {
    icon: Mic2,
    title: 'AI Transcription',
    description: 'Automatically transcribe every consultation into searchable, timestamped text.',
  },
  {
    icon: FileText,
    title: 'AI Summaries',
    description: 'Generate concise session summaries instantly — ready to review before your next call.',
  },
  {
    icon: Heart,
    title: 'Sentiment Analysis',
    description: 'Understand client emotional tone over time to spot patterns and improve outcomes.',
  },
  {
    icon: Smartphone,
    title: 'Mobile Application',
    description: 'Record, upload, and review consultations on iOS and Android from anywhere.',
  },
  {
    icon: Calendar,
    title: 'Calendar Integrations',
    description: 'Sync with Google Calendar and Outlook to auto-attach sessions to appointments.',
  },
];

export default function FutureVision() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="py-24 bg-gradient-to-b from-blue-50/40 to-white dark:from-gray-900 dark:to-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <div className="inline-block px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-xs font-medium tracking-wide uppercase mb-4">
            What's coming
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white leading-tight mb-4">
            The future of consultation management.
          </h2>
          <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto text-base leading-relaxed">
            We're building the AI layer to make every consultation even more actionable. Here's what's coming next.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {upcoming.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              className="relative p-6 rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 overflow-hidden"
            >
              {/* Coming soon badge */}
              <div className="absolute top-4 right-4 px-2 py-0.5 rounded-full bg-amber-50 dark:bg-amber-950/50 border border-amber-100 dark:border-amber-900/40 text-amber-600 dark:text-amber-400 text-[10px] font-semibold tracking-wide">
                Coming Soon
              </div>

              <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 bg-gray-50 dark:bg-gray-800 opacity-80">
                <item.icon size={18} className="text-gray-400 dark:text-gray-500" />
              </div>
              <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">{item.title}</h3>
              <p className="text-sm text-gray-400 dark:text-gray-500 leading-relaxed">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
