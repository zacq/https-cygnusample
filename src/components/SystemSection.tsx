import React from 'react';
import { motion } from 'motion/react';
import { Search, PenLine, Rocket, BarChart3, ArrowRight } from 'lucide-react';

const steps = [
  {
    number: '01',
    icon: <Search className="w-6 h-6" />,
    title: 'Assess',
    subtitle: 'Deep-dive operations audit',
    desc: 'We map your current workflows, identify waste streams, safety gaps, and performance bottlenecks with precision diagnostics.',
    color: 'from-blue-600 to-blue-400',
    glow: 'shadow-blue-500/30',
  },
  {
    number: '02',
    icon: <PenLine className="w-6 h-6" />,
    title: 'Design',
    subtitle: 'Tailored Lean roadmap',
    desc: 'Our consultants co-create a bespoke Lean & Kaizen implementation plan aligned with your industry, culture, and goals.',
    color: 'from-violet-600 to-violet-400',
    glow: 'shadow-violet-500/30',
  },
  {
    number: '03',
    icon: <Rocket className="w-6 h-6" />,
    title: 'Implement',
    subtitle: 'Hands-on deployment',
    desc: 'We embed alongside your team — training staff, deploying 5S systems, and building the daily management routines that stick.',
    color: 'from-brand-blue to-brand-accent',
    glow: 'shadow-brand-blue/30',
  },
  {
    number: '04',
    icon: <BarChart3 className="w-6 h-6" />,
    title: 'Sustain',
    subtitle: 'Continuous monitoring',
    desc: 'We establish KPI dashboards, coaching cadences, and governance systems so the improvements compound — forever.',
    color: 'from-emerald-600 to-emerald-400',
    glow: 'shadow-emerald-500/30',
  },
];

const SystemSection: React.FC = () => {
  return (
    <section id="about" className="py-28 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1.5 rounded-full bg-brand-blue/10 border border-brand-blue/20 text-brand-blue text-xs font-bold uppercase tracking-widest mb-4"
          >
            How We Work
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-display text-brand-navy mb-5"
          >
            A Proven System for{' '}
            <span className="italic text-brand-blue">Lasting Change</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-slate-500 max-w-xl mx-auto"
          >
            Our four-phase engagement methodology is battle-tested across 500+ projects in East Africa's most demanding industries.
          </motion.p>
        </div>

        {/* Steps — desktop: horizontal row; mobile: stacked */}
        <div className="grid md:grid-cols-4 gap-6 mb-16">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.6 }}
              className="relative group"
            >
              {/* Connector line (desktop only, not on last item) */}
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-10 left-[calc(100%+0px)] w-full h-px z-0">
                  <div className="w-full h-full bg-gradient-to-r from-slate-200 to-slate-200 relative overflow-hidden">
                    <motion.div
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.4 + i * 0.15, duration: 0.7 }}
                      className="absolute inset-0 bg-gradient-to-r from-brand-blue to-brand-accent origin-left"
                    />
                  </div>
                </div>
              )}

              <div className="bg-slate-50 border border-slate-100 rounded-3xl p-7 h-full hover:shadow-xl hover:border-brand-blue/20 transition-all duration-300 group-hover:-translate-y-1">
                {/* Number */}
                <span className="text-6xl font-bold text-slate-100 leading-none block mb-4 group-hover:text-brand-blue/10 transition-colors">
                  {step.number}
                </span>

                {/* Icon */}
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center text-white mb-5 shadow-lg ${step.glow}`}>
                  {step.icon}
                </div>

                <h3 className="text-xl font-bold text-brand-navy mb-1">{step.title}</h3>
                <p className="text-xs font-semibold text-brand-blue uppercase tracking-wider mb-3">{step.subtitle}</p>
                <p className="text-slate-500 text-sm leading-relaxed">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA strip */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-brand-navy rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div>
            <h3 className="text-2xl md:text-3xl font-display text-white mb-2">
              Ready to start your transformation?
            </h3>
            <p className="text-slate-400">Our first consultation is free. No obligations, just clarity.</p>
          </div>
          <button className="flex-shrink-0 bg-brand-blue hover:bg-brand-accent text-white px-8 py-4 rounded-xl font-bold text-lg transition-all flex items-center gap-2 group shadow-xl shadow-brand-blue/30 whitespace-nowrap">
            Book a Strategy Call
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default SystemSection;
