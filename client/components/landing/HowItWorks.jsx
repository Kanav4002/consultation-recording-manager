import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Upload, Tag, StickyNote, Search } from 'lucide-react';

const steps = [
  {
    number: '01',
    icon: Upload,
    title: 'Upload consultation recording',
    description: 'Drag and drop or browse to upload. We accept MP3, M4A, WAV, and other common audio formats. Files are validated and encrypted on upload.',
    color: 'text-blue-600 dark:text-blue-400',
    bg: 'bg-blue-50 dark:bg-blue-950/50',
    border: 'border-blue-100 dark:border-blue-900/40',
  },
  {
    number: '02',
    icon: Tag,
    title: 'Add client details and metadata',
    description: 'Attach the client name, session type, consultation date, duration, and any custom tags that help you organize your work.',
    color: 'text-violet-600 dark:text-violet-400',
    bg: 'bg-violet-50 dark:bg-violet-950/50',
    border: 'border-violet-100 dark:border-violet-900/40',
  },
  {
    number: '03',
    icon: StickyNote,
    title: 'Attach notes and observations',
    description: 'Add session notes, key insights, and follow-up reminders alongside the recording. Notes are searchable and always with the right session.',
    color: 'text-teal-600 dark:text-teal-400',
    bg: 'bg-teal-50 dark:bg-teal-950/50',
    border: 'border-teal-100 dark:border-teal-900/40',
  },
  {
    number: '04',
    icon: Search,
    title: 'Search and revisit anytime',
    description: 'Use the powerful search to find any consultation in seconds by name, date, or session content. Always ready when you need it.',
    color: 'text-emerald-600 dark:text-emerald-400',
    bg: 'bg-emerald-50 dark:bg-emerald-950/50',
    border: 'border-emerald-100 dark:border-emerald-900/40',
  },
];

export default function HowItWorks() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="how-it-works" ref={ref} className="py-24 bg-gradient-to-b from-blue-50/40 to-white dark:from-gray-900 dark:to-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <div className="inline-block px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-xs font-medium tracking-wide uppercase mb-4">
            How it works
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white leading-tight mb-4">
            From recording to retrievable — in four steps.
          </h2>
          <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto text-base leading-relaxed">
            Set up in minutes. Works the way you already think about your consultations.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-5 max-w-4xl mx-auto">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.45, delay: i * 0.1 }}
              className={`relative p-6 rounded-2xl border bg-white dark:bg-gray-900 shadow-sm hover:shadow-md transition-all duration-200 ${step.border}`}
            >
              <div className="flex items-start gap-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${step.bg}`}>
                  <step.icon size={18} className={step.color} />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-[11px] font-bold text-gray-400 dark:text-gray-500 tracking-widest">{step.number}</span>
                  </div>
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">{step.title}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{step.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
