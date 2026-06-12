import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { X, Check, ArrowRight } from 'lucide-react';

const problems = [
  'Scattered voice notes across devices',
  'Lost context before follow-up calls',
  'Difficult to track client history',
  'Slow retrieval of past recordings',
];

const solutions = [
  'Centralized consultation records',
  'Structured metadata per session',
  'Integrated notes & observations',
  'Instant full-text search',
];

export default function ProblemSolution() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="py-24 bg-gradient-to-b from-white to-blue-50/40 dark:from-gray-950 dark:to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <div className="inline-block px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-xs font-medium tracking-wide uppercase mb-4">
            The Problem
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white leading-tight mb-4">
            Consultation records shouldn't be<br className="hidden sm:block" /> scattered everywhere.
          </h2>
          <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto text-base leading-relaxed">
            Most professionals juggle recordings, notes, calendars and spreadsheets. Context gets lost, follow-ups suffer, and good work goes unrecorded.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-6 items-center max-w-4xl mx-auto relative">
          {/* Without */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="bg-white dark:bg-gray-900 rounded-2xl border border-red-100 dark:border-red-900/30 p-6 shadow-sm"
          >
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[11px] font-semibold text-red-500 uppercase tracking-widest">Without the platform</span>
            </div>
            <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-4">Fragmented &amp; forgettable</h3>
            <ul className="space-y-3">
              {problems.map((p, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-gray-600 dark:text-gray-400">
                  <span className="mt-0.5 w-5 h-5 rounded-full bg-red-50 dark:bg-red-950/50 flex items-center justify-center flex-shrink-0">
                    <X size={11} className="text-red-500" strokeWidth={2.5} />
                  </span>
                  {p}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Arrow */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.3, delay: 0.3 }}
            className="hidden lg:flex absolute left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-md items-center justify-center z-10"
          >
            <ArrowRight size={16} className="text-blue-600" />
          </motion.div>

          {/* With */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white dark:bg-gray-900 rounded-2xl border border-blue-100 dark:border-blue-900/30 p-6 shadow-sm relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50/50 dark:bg-blue-950/20 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="relative">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[11px] font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-widest">With the platform</span>
              </div>
              <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-4">Organized &amp; instantly accessible</h3>
              <ul className="space-y-3">
                {solutions.map((s, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-gray-700 dark:text-gray-300">
                    <span className="mt-0.5 w-5 h-5 rounded-full bg-blue-50 dark:bg-blue-950/50 flex items-center justify-center flex-shrink-0">
                      <Check size={11} className="text-blue-600 dark:text-blue-400" strokeWidth={2.5} />
                    </span>
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
