import React from 'react';
import { motion } from 'motion/react';
import { X, CheckCircle2, ArrowRight } from 'lucide-react';

const oldWay = [
  'Inefficient processes quietly burning your profit margins',
  'Safety incidents disrupting operations and risking lives',
  'Poor employee morale and high costly turnover',
  'Reactive firefighting with no structured system',
  'Siloed teams working against — not with — each other',
  'No clear metrics; decisions made on gut instinct',
];

const newWay = [
  'Streamlined Lean systems delivering measurable ROI',
  'Certified safety compliance — WAH & GWO standards',
  'A culture of Kaizen: every employee drives improvement',
  'Proactive management frameworks that prevent breakdowns',
  'Unified teams aligned around shared operational goals',
  'KPI-driven decisions with transparent performance tracking',
];

const ProblemSection: React.FC = () => {
  return (
    <section id="excellence" className="py-28 bg-brand-navy overflow-hidden relative">
      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg, #fff 0px, #fff 1px, transparent 1px, transparent 60px), repeating-linear-gradient(90deg, #fff 0px, #fff 1px, transparent 1px, transparent 60px)',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1.5 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-bold uppercase tracking-widest mb-4"
          >
            The Burning Problem
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-display text-white mb-5"
          >
            Still Running on{' '}
            <span className="italic text-red-400">Old Systems?</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-slate-400 max-w-xl mx-auto"
          >
            Every day without a structured excellence system is money, safety, and morale slipping through the cracks.
          </motion.p>
        </div>

        {/* Comparison grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-14">
          {/* Old Way */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-red-950/20 border border-red-500/20 rounded-3xl p-8"
          >
            <div className="flex items-center gap-3 mb-7">
              <div className="w-9 h-9 rounded-full bg-red-500/20 flex items-center justify-center">
                <X className="w-5 h-5 text-red-400" />
              </div>
              <h3 className="text-lg font-bold text-red-400">Without Cygnus</h3>
            </div>
            <ul className="space-y-4">
              {oldWay.map((item, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                  className="flex items-start gap-3 text-slate-400"
                >
                  <X className="w-4 h-4 text-red-500/70 shrink-0 mt-0.5" />
                  <span className="text-sm leading-relaxed">{item}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* New Way */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-emerald-950/20 border border-emerald-500/20 rounded-3xl p-8"
          >
            <div className="flex items-center gap-3 mb-7">
              <div className="w-9 h-9 rounded-full bg-emerald-500/20 flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              </div>
              <h3 className="text-lg font-bold text-emerald-400">With Cygnus</h3>
            </div>
            <ul className="space-y-4">
              {newWay.map((item, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: 16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                  className="flex items-start gap-3 text-slate-300"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span className="text-sm leading-relaxed">{item}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Inline CTA */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="text-slate-400 mb-6 text-lg">
            The gap between where you are and where you could be is one conversation away.
          </p>
          <button className="bg-brand-blue hover:bg-brand-accent text-white px-10 py-4 rounded-xl font-bold text-lg transition-all flex items-center gap-2 group mx-auto shadow-xl shadow-brand-blue/20">
            Book a Strategy Call
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default ProblemSection;
