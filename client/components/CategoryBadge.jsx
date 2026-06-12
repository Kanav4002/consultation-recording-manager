const styles = {
  Therapy: 'bg-blue-50 text-blue-600 border border-blue-200',
  Financial: 'bg-green-50 text-green-600 border border-green-200',
  Astrology: 'bg-amber-50 text-amber-600 border border-amber-200',
  Legal: 'bg-slate-100 text-slate-600 border border-slate-200',
  Coaching: 'bg-sky-50 text-sky-600 border border-sky-200',
  Medical: 'bg-rose-50 text-rose-500 border border-rose-200',
};

export default function CategoryBadge({ category, className = '' }) {
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${styles[category]} ${className}`}>
      {category}
    </span>
  );
}
