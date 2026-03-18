import React from 'react';
import { motion } from 'motion/react';
import {
  ClipboardList, Layers, Wrench, BadgeCheck, TrendingUp, ArrowRight,
} from 'lucide-react';

const steps = [
  {
    step: 'Step 1',
    icon: <ClipboardList className="w-6 h-6" />,
    title: 'Assess',
    desc: 'Evaluate operational challenges, risks, and compliance gaps.',
    color: 'from-blue-600 to-blue-400',
  },
  {
    step: 'Step 2',
    icon: <Layers className="w-6 h-6" />,
    title: 'Design',
    desc: 'Develop tailored management systems aligned with industry standards.',
    color: 'from-violet-600 to-violet-400',
  },
  {
    step: 'Step 3',
    icon: <Wrench className="w-6 h-6" />,
    title: 'Implement',
    desc: 'Deploy operational frameworks and training programs across the organization.',
    color: 'from-brand-blue to-brand-accent',
  },
  {
    step: 'Step 4',
    icon: <BadgeCheck className="w-6 h-6" />,
    title: 'Certify',
    desc: 'Prepare organizations for global certifications and regulatory compliance.',
    color: 'from-amber-500 to-amber-400',
  },
  {
    step: 'Step 5',
    icon: <TrendingUp className="w-6 h-6" />,
    title: 'Improve',
    desc: 'Drive continuous operational improvement and sustain performance gains.',
    color: 'from-emerald-600 to-emerald-400',
  },
];

const SystemSection: React.FC = () => {
  return (
    <section id="about" className="py-24 bg-brand-navy overflow-hidden relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-blue/40 to-transparent" />
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #fff 1px, transparent 0)', backgroundSize: '40px 40px' }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-14">
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1.5 rounded-full bg-brand-blue/20 border border-brand-blue/30 text-brand-accent text-xs font-bold uppercase tracking-widest mb-4"
          >
            How We Work
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-display text-white mb-5"
          >
            Our Approach to{' '}
            <span className="italic text-brand-accent">Operational Excellence</span>
          </motion.h2>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-5 gap-4 mb-14">
          {steps.map((step, i) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="relative group"
            >
              {/* Connector arrow */}
              {i < steps.length - 1 && (
                <div className="hidden md:flex absolute top-8 left-[calc(100%+2px)] w-[calc(100%-4px)] items-center justify-center z-10 pointer-events-none">
                  <motion.div
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 + i * 0.12, duration: 0.5 }}
                    className="w-full h-px bg-brand-blue/40 origin-left"
                  />
                  <ArrowRight className="w-3 h-3 text-brand-blue/50 -ml-1 shrink-0" />
                </div>
              )}

              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 h-full hover:bg-white/10 hover:border-brand-blue/40 transition-all text-center">
                {/* Icon */}
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center text-white mx-auto mb-4 shadow-lg`}>
                  {step.icon}
                </div>
                <p className="text-xs font-bold text-brand-accent uppercase tracking-widest mb-2">{step.step}</p>
                <h3 className="text-lg font-bold text-white mb-2">{step.title}</h3>
                <p className="text-slate-400 text-xs leading-relaxed">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6"
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
