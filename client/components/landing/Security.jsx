import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Lock, ShieldCheck, FileCheck, Cloud } from 'lucide-react';

const items = [
  {
    icon: Lock,
    title: 'JWT Authentication',
    description: 'Signed tokens with short expiry and rotating refresh tokens ensure your session stays secure.',
    color: 'text-blue-600 dark:text-blue-400',
    bg: 'bg-blue-50 dark:bg-blue-950/50',
  },
  {
    icon: ShieldCheck,
    title: 'Protected Routes',
    description: 'Every page and API endpoint is protected. Unauthorized access is blocked at every layer.',
    color: 'text-emerald-600 dark:text-emerald-400',
    bg: 'bg-emerald-50 dark:bg-emerald-950/50',
  },
  {
    icon: FileCheck,
    title: 'Secure File Validation',
    description: 'All uploads are validated for format and size. Malformed or unsafe files are rejected immediately.',
    color: 'text-orange-600 dark:text-orange-400',
    bg: 'bg-orange-50 dark:bg-orange-950/50',
  },
  {
    icon: Cloud,
    title: 'Cloud Storage Architecture',
    description: 'Files are encrypted at rest (AES-256) and in transit (TLS 1.3). Only you can access your recordings.',
    color: 'text-violet-600 dark:text-violet-400',
    bg: 'bg-violet-50 dark:bg-violet-950/50',
  },
];

export default function Security() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="py-24 bg-white dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-block px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-xs font-medium tracking-wide uppercase mb-4">
              Security
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white leading-tight mb-4">
              Your clients' trust<br /> is non-negotiable.
            </h2>
            <p className="text-gray-500 dark:text-gray-400 text-base leading-relaxed mb-8">
              We built security in from day one — not as an afterthought. Consultation data is sensitive. Every architectural decision reflects that.
            </p>
            <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-100 dark:border-emerald-900/40 w-fit">
              <ShieldCheck size={18} className="text-emerald-600 dark:text-emerald-400" />
              <span className="text-sm font-medium text-emerald-700 dark:text-emerald-400">SOC 2 compliant architecture</span>
            </div>
          </motion.div>

          {/* Right: Feature grid */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="grid sm:grid-cols-2 gap-4"
          >
            {items.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.2 + i * 0.08 }}
                className="p-5 rounded-2xl border border-gray-100 dark:border-gray-800 hover:border-gray-200 dark:hover:border-gray-700 hover:shadow-sm transition-all duration-200"
              >
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center mb-3 ${item.bg}`}>
                  <item.icon size={16} className={item.color} />
                </div>
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-1.5">{item.title}</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
