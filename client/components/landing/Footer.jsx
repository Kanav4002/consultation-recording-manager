import { Mail, Lock, Headphones } from 'lucide-react';

function GithubIcon({ size = 13, className }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
    </svg>
  );
}

const productLinks = ['Features', 'How it works', 'Use cases', 'FAQ'];
const companyLinks = ['About', 'Changelog', 'Privacy', 'Terms'];
const resourceLinks = ['Documentation', 'Support', 'Status', 'Contact'];

export default function Footer() {
  const scrollToSection = (label) => {
    const map = {
      Features: '#features',
      'How it works': '#how-it-works',
      'Use cases': '#use-cases',
      FAQ: '#faq',
    };
    const href = map[label];
    if (href) {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-white dark:bg-gray-950 border-t border-gray-100 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center flex-shrink-0">
                <Headphones size={16} className="text-white" />
              </div>
              <span className="font-semibold text-gray-900 dark:text-white text-sm">Consultation Recording Manager</span>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-6 max-w-[260px]">
              A calm, secure home for every consultation recording — with structured metadata, integrated notes, and instant search.
            </p>
            <div className="flex flex-wrap gap-2">
              <a
                href="https://github.com"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 text-xs font-medium hover:border-gray-300 dark:hover:border-gray-600 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                <GithubIcon size={13} />
                GitHub
              </a>
              <a
                href="mailto:hello@consultrec.io"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 text-xs font-medium hover:border-gray-300 dark:hover:border-gray-600 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                <Mail size={13} />
                hello@consultrec.io
              </a>
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 text-xs font-medium">
                <Lock size={13} />
                SOC 2 ready
              </div>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-xs font-semibold text-gray-900 dark:text-white uppercase tracking-widest mb-4">Product</h4>
            <ul className="space-y-2.5">
              {productLinks.map(link => (
                <li key={link}>
                  <button onClick={() => scrollToSection(link)} className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">{link}</button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-gray-900 dark:text-white uppercase tracking-widest mb-4">Company</h4>
            <ul className="space-y-2.5">
              {companyLinks.map(link => (
                <li key={link}>
                  <a href="#" className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">{link}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-gray-900 dark:text-white uppercase tracking-widest mb-4">Resources</h4>
            <ul className="space-y-2.5">
              {resourceLinks.map(link => (
                <li key={link}>
                  <a href="#" className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">{link}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between pt-8 border-t border-gray-100 dark:border-gray-800 gap-3">
          <p className="text-sm text-gray-400 dark:text-gray-500">
            © 2026 Consultation Recording Manager. All rights reserved.
          </p>
          <p className="text-sm text-gray-400 dark:text-gray-500">
            Made with care for working professionals.
          </p>
        </div>
      </div>
    </footer>
  );
}
