import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const faqs = [
  {
    question: 'Is my data secure?',
    answer: 'Yes. Every upload is encrypted in transit (TLS 1.3) and at rest with AES-256. Authentication uses signed JWTs with short expiry and rotating refresh tokens. Only you can access your recordings.',
  },
  {
    question: 'What file formats are supported?',
    answer: 'We support all common audio formats including MP3, M4A, WAV, OGG, FLAC, and AAC. Files up to 500MB are accepted per upload. If you need support for a specific format, contact us.',
  },
  {
    question: 'Can I search old consultations?',
    answer: 'Yes. Full-text search across all consultation metadata, client names, session types, and notes. Results appear in under 5 seconds regardless of how many sessions you have stored.',
  },
  {
    question: 'Can I add notes to recordings?',
    answer: 'Absolutely. Every consultation has a dedicated notes area with rich text editing. Notes are auto-saved, versioned, and always indexed for search.',
  },
  {
    question: 'Is the application mobile-friendly?',
    answer: 'The web application is fully responsive and works on all modern mobile browsers. A dedicated iOS and Android app is coming soon.',
  },
];

function FAQItem({ faq, isOpen, onToggle }) {
  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
      >
        <span className="text-sm font-medium text-gray-900 dark:text-white pr-4">{faq.question}</span>
        {isOpen ? (
          <ChevronUp size={16} className="text-gray-400 dark:text-gray-500 flex-shrink-0" />
        ) : (
          <ChevronDown size={16} className="text-gray-400 dark:text-gray-500 flex-shrink-0" />
        )}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
          >
            <div className="px-5 pb-4 text-sm text-gray-600 dark:text-gray-400 leading-relaxed border-t border-gray-100 dark:border-gray-800 pt-3">
              {faq.answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQ() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="faq" ref={ref} className="py-24 bg-[#f5f7fc] dark:bg-gray-900">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="inline-block px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-xs font-medium tracking-wide uppercase mb-4">
            FAQ
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white leading-tight">
            Questions, answered.
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="space-y-3"
        >
          {faqs.map((faq, i) => (
            <FAQItem
              key={i}
              faq={faq}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
