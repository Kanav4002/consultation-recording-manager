import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Star } from 'lucide-react';

const testimonials = [
  {
    quote: '"I used to scramble before every follow-up. Now I open the client, hit play on the last session, skim the notes and I\'m ready in two minutes."',
    name: 'Dr. Anika Rao',
    role: 'Clinical Psychologist',
    initials: 'DA',
  },
  {
    quote: '"The metadata + search combo is the killer feature. I can find a single discovery call from six months ago in one keystroke."',
    name: 'Marcus Lee',
    role: 'Executive Coach',
    initials: 'ML',
  },
  {
    quote: '"Finally, a tool that respects how careful financial conversations need to be. Encryption, structure, recall — all of it."',
    name: 'Priya Shah',
    role: 'Independent Financial Advisor',
    initials: 'PS',
  },
];

function Stars() {
  return (
    <div className="flex gap-0.5 mb-5">
      {Array.from({ length: 5 }, (_, i) => (
        <Star key={i} size={16} className="text-blue-500 fill-blue-500" />
      ))}
    </div>
  );
}

export default function Testimonials() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="py-24 bg-[#f5f7fc] dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 text-xs font-medium tracking-wide uppercase mb-6">
            Loved by Professionals
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-bold text-gray-900 dark:text-white leading-tight">
            What practitioners say after a week.
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 p-7 hover:shadow-md transition-all duration-200"
            >
              <Stars />
              <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed mb-6">{t.quote}</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                  {t.initials}
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">{t.name}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
