import React from 'react';
import { motion } from 'motion/react';
import { BookOpen, Download, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Course {
  title: string;
  category: string;
  duration: string;
  cpd?: string;
  description: string;
  to?: string;
}

const courses: Course[] = [
  {
    title: 'NCA Accredited Training — Safety as a Value',
    category: 'NCA Accredited',
    duration: '2 Days',
    cpd: '10 CPD Points',
    description: 'Integrating the National Building Code-2024 into the current technological construction and infrastructure landscape.',
    to: '/training/nca',
  },
  {
    title: 'Business Excellence Annual Program',
    category: 'Business Excellence',
    duration: 'Annual Program',
    description: 'A structured program covering Lean Management, Operational Excellence, and continuous improvement frameworks for organisations.',
    to: '/training/business-excellence',
  },
];

const TrainingCataloguePage: React.FC = () => {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative pt-32 pb-20 bg-brand-navy overflow-hidden">
        <div className="absolute top-0 left-1/3 w-[600px] h-[600px] rounded-full bg-brand-blue/10 blur-[120px] pointer-events-none" />
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #fff 1px, transparent 0)', backgroundSize: '40px 40px' }} />

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-blue/20 border border-brand-blue/40 text-brand-accent text-xs font-bold uppercase tracking-widest mb-6"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-brand-accent animate-pulse" />
            All Programs
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.7 }}
            className="text-5xl md:text-6xl font-display text-white leading-tight mb-4"
          >
            Training{' '}
            <span className="italic text-brand-accent">Catalogue</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.28, duration: 0.7 }}
            className="text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed"
          >
            Browse our full pool of accredited and professional development programs.
          </motion.p>
        </div>
      </section>

      {/* Download BCIE Calendar CTA */}
      <section className="max-w-6xl mx-auto px-6 pt-10">
        <a
          href="/2026 BCIE Calendar.pdf"
          download
          className="flex items-center gap-4 bg-brand-navy/5 border border-brand-navy/10 rounded-2xl px-6 py-4 hover:bg-brand-blue/5 hover:border-brand-blue/20 transition-all group w-fit"
        >
          <div className="w-10 h-10 rounded-xl bg-brand-blue/10 flex items-center justify-center group-hover:bg-brand-blue/20 transition-colors">
            <Download className="w-5 h-5 text-brand-blue" />
          </div>
          <div>
            <p className="text-sm font-bold text-brand-navy">Download 2026 BCIE Calendar</p>
            <p className="text-xs text-slate-500">Full program schedule — PDF</p>
          </div>
        </a>
      </section>

      {/* Course cards */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {courses.map((course, i) => (
            <motion.div
              key={course.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="border border-slate-200 rounded-2xl p-7 hover:border-brand-blue/30 hover:shadow-lg transition-all flex flex-col gap-4"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="w-11 h-11 rounded-xl bg-brand-blue/10 flex items-center justify-center flex-shrink-0">
                  <BookOpen className="w-5 h-5 text-brand-blue" />
                </div>
                <span className="text-xs font-bold uppercase tracking-wider text-brand-accent bg-brand-accent/10 px-3 py-1 rounded-full">
                  {course.category}
                </span>
              </div>

              <div>
                <h3 className="text-lg font-bold text-brand-navy mb-2">{course.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{course.description}</p>
              </div>

              <div className="flex flex-wrap gap-3 text-xs">
                <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-full font-medium">{course.duration}</span>
                {course.cpd && (
                  <span className="bg-brand-gold/10 text-brand-gold px-3 py-1 rounded-full font-medium">{course.cpd}</span>
                )}
              </div>

              {course.to && (
                <Link
                  to={course.to}
                  className="mt-auto flex items-center gap-1.5 text-sm font-semibold text-brand-blue hover:text-brand-accent transition-colors"
                >
                  View program <ArrowRight className="w-4 h-4" />
                </Link>
              )}
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default TrainingCataloguePage;
