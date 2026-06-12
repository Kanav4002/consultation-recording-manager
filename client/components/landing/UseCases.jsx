import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Brain, Target, TrendingUp, Scale, Star, User } from 'lucide-react';

const cases = [
  {
    icon: Brain,
    title: 'Therapists & Counselors',
    description: 'Keep every session\'s context intact. Reference past notes before the next appointment.',
    color: 'text-violet-600 dark:text-violet-400',
    bg: 'bg-violet-50 dark:bg-violet-950/50',
  },
  {
    icon: Target,
    title: 'Coaches & Mentors',
    description: 'Track client progress across sessions. Build a clear narrative of every engagement.',
    color: 'text-blue-600 dark:text-blue-400',
    bg: 'bg-blue-50 dark:bg-blue-950/50',
  },
  {
    icon: TrendingUp,
    title: 'Financial Advisors',
    description: 'Maintain structured records of financial discussions. Stay compliant and prepared.',
    color: 'text-emerald-600 dark:text-emerald-400',
    bg: 'bg-emerald-50 dark:bg-emerald-950/50',
  },
  {
    icon: Scale,
    title: 'Legal Consultants',
    description: 'Store client calls with full metadata for accurate recall and reference.',
    color: 'text-orange-600 dark:text-orange-400',
    bg: 'bg-orange-50 dark:bg-orange-950/50',
  },
  {
    icon: Star,
    title: 'Astrologers & Readers',
    description: 'Reference past readings when clients return. Deliver continuity that builds trust.',
    color: 'text-yellow-600 dark:text-yellow-400',
    bg: 'bg-yellow-50 dark:bg-yellow-950/50',
  },
  {
    icon: User,
    title: 'Independent Professionals',
    description: 'One tool for any consultation-based practice. From freelancers to solo consultants.',
    color: 'text-rose-600 dark:text-rose-400',
    bg: 'bg-rose-50 dark:bg-rose-950/50',
  },
];

export default function UseCases() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="use-cases" ref={ref} className="py-24 bg-gradient-to-b from-blue-50/40 to-white dark:from-gray-900 dark:to-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <div className="inline-block px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-xs font-medium tracking-wide uppercase mb-4">
            Use Cases
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white leading-tight mb-4">
            Designed for every kind of<br className="hidden sm:block" /> conversation worth keeping.
          </h2>
          <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto text-base leading-relaxed">
            Any professional who holds consultations will benefit from organized, searchable records.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {cases.map((c, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              className="group p-6 rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 hover:border-gray-200 dark:hover:border-gray-700 hover:shadow-md transition-all duration-200"
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${c.bg} group-hover:scale-105 transition-transform duration-200`}>
                <c.icon size={18} className={c.color} />
              </div>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">{c.title}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{c.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
