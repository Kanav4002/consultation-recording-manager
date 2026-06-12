import { motion } from 'framer-motion';
import { ArrowRight, Play, Headphones, Search, FileAudio, ChevronUp, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
};

const stagger = {
  animate: { transition: { staggerChildren: 0.1 } },
};

function DashboardMockup() {
  const entries = [
    { name: 'Priya Sharma', type: 'Follow-up', date: 'Jun 10', duration: '42 min', color: 'bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300' },
    { name: 'Arjun Mehta', type: 'Initial', date: 'Jun 8', duration: '58 min', color: 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300' },
    { name: 'Deepa Nair', type: 'Review', date: 'Jun 6', duration: '35 min', color: 'bg-orange-100 dark:bg-orange-900/40 text-orange-700 dark:text-orange-300' },
  ];

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      {/* Main dashboard card */}
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="relative bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200/70 dark:border-gray-700/70 overflow-hidden"
      >
        {/* Header bar */}
        <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/50">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-400" />
            <div className="w-3 h-3 rounded-full bg-yellow-400" />
            <div className="w-3 h-3 rounded-full bg-green-400" />
          </div>
          <div className="flex-1 mx-3">
            <div className="bg-gray-100 dark:bg-gray-700 rounded-md px-3 py-1 text-xs text-gray-500 dark:text-gray-400 flex items-center gap-2 max-w-xs mx-auto">
              <span className="w-2 h-2 rounded-full bg-green-400 flex-shrink-0" />
              consultrec.io/dashboard
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center">
              <span className="text-white text-[8px] font-bold">DR</span>
            </div>
            <span className="text-xs text-gray-600 dark:text-gray-400 font-medium">Dr. Rao</span>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Audio waveform area */}
          <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 mb-4 border border-gray-100 dark:border-gray-700">
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-0.5">Currently playing</p>
                <p className="text-sm font-semibold text-gray-900 dark:text-white">Follow-up Session · Sharma</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 font-medium">Playing</span>
              </div>
            </div>
            {/* Waveform */}
            <div className="flex items-center gap-0.5 h-10 mb-3">
              {Array.from({ length: 52 }, (_, i) => {
                const h = 20 + Math.sin(i * 0.4) * 12 + Math.sin(i * 1.1) * 8 + Math.cos(i * 0.7) * 6;
                const isPlayed = i < 26;
                return (
                  <div
                    key={i}
                    className={`flex-1 rounded-full transition-colors ${isPlayed ? 'bg-blue-500' : 'bg-gray-200 dark:bg-gray-600'}`}
                    style={{ height: `${Math.max(4, h)}%` }}
                  />
                );
              })}
            </div>
            <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
              <span>21:14</span>
              <span>42:00</span>
            </div>
          </div>

          {/* Recent consultations */}
          <div className="space-y-2">
            {entries.map((e, i) => (
              <div key={i} className="flex items-center justify-between px-3 py-2.5 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors group">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-semibold flex-shrink-0">
                    {e.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-800 dark:text-gray-200">{e.name}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{e.date} · {e.duration}</p>
                  </div>
                </div>
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${e.color}`}>{e.type}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Floating stat card - top right */}
      <motion.div
        initial={{ opacity: 0, x: 20, y: -10 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        className="absolute -top-4 -right-4 md:-right-8 bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-200/70 dark:border-gray-700 px-4 py-3 min-w-[110px]"
      >
        <div className="flex items-center gap-1.5 mb-0.5">
          <TrendingUp size={12} className="text-emerald-500" />
          <span className="text-xs text-gray-500 dark:text-gray-400">Success rate</span>
        </div>
        <p className="text-2xl font-bold text-gray-900 dark:text-white">256%</p>
        <div className="flex items-center gap-1 mt-0.5">
          <ChevronUp size={12} className="text-emerald-500" />
          <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">vs last month</span>
        </div>
      </motion.div>

      {/* Floating search card - bottom left */}
      <motion.div
        initial={{ opacity: 0, x: -20, y: 10 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 0.5, delay: 1.0 }}
        className="absolute -bottom-4 -left-4 md:-left-8 bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-200/70 dark:border-gray-700 px-4 py-3"
      >
        <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-xs mb-1.5">
          <Search size={12} />
          <span>Instant search</span>
        </div>
        <div className="flex items-center gap-2">
          <FileAudio size={14} className="text-blue-500" />
          <span className="text-xs font-medium text-gray-700 dark:text-gray-300">Found in &lt;2s</span>
        </div>
      </motion.div>
    </div>
  );
}

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-16 pb-20 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-50/80 via-white to-white dark:from-gray-950 dark:via-gray-950 dark:to-gray-950" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(37,99,235,0.08),transparent)] dark:bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(37,99,235,0.15),transparent)]" />

      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
        style={{
          backgroundImage: 'linear-gradient(#1e3a5f 1px, transparent 1px), linear-gradient(to right, #1e3a5f 1px, transparent 1px)',
          backgroundSize: '64px 64px'
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Text */}
          <motion.div
            variants={stagger}
            initial="initial"
            animate="animate"
            className="text-center lg:text-left"
          >
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-100 dark:border-blue-900 text-blue-700 dark:text-blue-400 text-xs font-medium mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
              Trusted by 10,000+ professionals
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="text-4xl sm:text-5xl lg:text-[56px] font-bold text-gray-900 dark:text-white leading-[1.1] tracking-tight mb-6"
            >
              Never Lose the Context Behind Your{' '}
              <span className="text-blue-600 dark:text-blue-400">Consultations.</span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0"
            >
              Securely upload recordings, organize them with structured metadata, attach notes, and instantly retrieve past consultations when you need them.
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
              <Link
                to="/register"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm transition-all duration-200 shadow-md hover:shadow-lg hover:shadow-blue-500/25 hover:-translate-y-0.5"
              >
                Get Started
                <ArrowRight size={16} />
              </Link>
              <button className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-800 dark:text-gray-200 font-semibold text-sm border border-gray-200 dark:border-gray-700 transition-all duration-200 hover:-translate-y-0.5 shadow-sm">
                <Play size={16} className="text-blue-600" fill="currentColor" />
                Watch Demo
              </button>
            </motion.div>

            <motion.div variants={fadeUp} className="flex items-center gap-6 justify-center lg:justify-start mt-8 pt-8 border-t border-gray-200 dark:border-gray-800">
              <div className="text-center">
                <p className="text-2xl font-bold text-gray-900 dark:text-white">10k+</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Consultations</p>
              </div>
              <div className="w-px h-8 bg-gray-200 dark:bg-gray-700" />
              <div className="text-center">
                <p className="text-2xl font-bold text-gray-900 dark:text-white">99.9%</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Uptime SLA</p>
              </div>
              <div className="w-px h-8 bg-gray-200 dark:bg-gray-700" />
              <div className="text-center">
                <p className="text-2xl font-bold text-gray-900 dark:text-white">&lt;5s</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Retrieval</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Right: Dashboard mockup */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="relative flex justify-center lg:justify-end"
          >
            <DashboardMockup />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
