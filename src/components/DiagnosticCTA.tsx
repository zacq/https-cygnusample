import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { BarChart3, ArrowRight, Clock, FileText, Award } from 'lucide-react';

const DiagnosticCTA: React.FC = () => (
  <section className="py-16 bg-white">
    <div className="max-w-7xl mx-auto px-6">
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
        className="relative rounded-3xl overflow-hidden bg-brand-navy"
      >
        {/* Dot texture */}
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(circle at 2px 2px,#fff 1px,transparent 0)', backgroundSize: '40px 40px' }} />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-blue/40 to-transparent" />

        {/* Ambient glows */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-brand-blue/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-48 h-48 bg-brand-accent/8 rounded-full blur-[60px] pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center gap-10 justify-between px-10 py-12 md:px-14 md:py-14">

          {/* Left — copy */}
          <div className="max-w-lg">
            <div className="flex items-center gap-2.5 mb-5">
              <BarChart3 className="w-5 h-5 text-brand-accent" />
              <span className="text-brand-accent text-xs font-bold uppercase tracking-[0.14em]">Free Diagnostic</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-display text-white mb-4 leading-tight">
              How operationally mature is your business?
            </h2>
            <p className="text-slate-400 leading-relaxed text-base">
              10 questions. 3 minutes. A personalized maturity score and prioritized roadmap — at no cost.
            </p>

            {/* Stats row */}
            <div className="flex flex-wrap items-center gap-7 mt-6">
              {[
                { icon: <Clock className="w-4 h-4" />, label: '≈ 3 minutes' },
                { icon: <FileText className="w-4 h-4" />, label: '10 questions' },
                { icon: <Award className="w-4 h-4" />, label: 'Free report' },
              ].map(({ icon, label }) => (
                <div key={label} className="flex items-center gap-2 text-slate-400 text-sm">
                  <span className="text-brand-accent">{icon}</span>
                  {label}
                </div>
              ))}
            </div>
          </div>

          {/* Right — CTA (double-bezel) */}
          <div className="shrink-0 flex flex-col items-center gap-3">
            <div className="p-1.5 rounded-[1.25rem] bg-white/5 ring-1 ring-white/10">
              <Link
                to="/diagnostic"
                className="bg-brand-blue hover:bg-brand-accent active:scale-[0.98] text-white px-9 py-4 rounded-[0.875rem] font-bold text-base transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] flex items-center gap-3 shadow-[0_8px_32px_rgba(27,110,194,0.4)] hover:shadow-[0_12px_40px_rgba(14,165,214,0.45)] whitespace-nowrap"
              >
                Start Free Diagnostic
                <span className="w-7 h-7 rounded-full bg-white/15 flex items-center justify-center shrink-0">
                  <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            </div>
            <p className="text-slate-500 text-xs">No sign-up required to start</p>
          </div>
        </div>
      </motion.div>
    </div>
  </section>
);

export default DiagnosticCTA;
