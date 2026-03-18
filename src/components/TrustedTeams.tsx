import React from 'react';
import { motion } from 'motion/react';
import { Award, Users, Briefcase } from 'lucide-react';

const INDUSTRIES = [
  'Manufacturing', 'Energy & Utilities', 'Logistics & Transport',
  'Healthcare', 'Construction', 'Mining & Resources',
  'Automotive', 'Food & Beverage', 'Pharmaceuticals',
  'Renewable Energy', 'Government & Public Sector', 'Retail & Distribution',
];

// Duplicated for infinite scroll illusion
const MARQUEE_ITEMS = [...INDUSTRIES, ...INDUSTRIES];

const stats = [
  { icon: <Award className="w-6 h-6" />, value: '15+', label: 'Years of Excellence' },
  { icon: <Briefcase className="w-6 h-6" />, value: '50+', label: 'Projects Delivered' },
  { icon: <Users className="w-6 h-6" />, value: '200+', label: 'Organizations Served' },
];

const TrustedTeams: React.FC = () => {
  return (
    <section className="py-20 bg-slate-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-12 text-center">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-sm font-bold uppercase tracking-widest text-brand-blue mb-3"
        >
          Trusted Across Industries
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-3xl md:text-4xl font-display text-brand-navy"
        >
          Serving Leaders Across East Africa
        </motion.h2>
      </div>

      {/* Scrolling marquee strip */}
      <div className="relative w-full overflow-hidden py-4 mb-16">
        {/* Edge fades */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-slate-50 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-slate-50 to-transparent z-10 pointer-events-none" />

        <div className="animate-marquee flex gap-6">
          {MARQUEE_ITEMS.map((industry, i) => (
            <div
              key={i}
              className="flex-shrink-0 px-6 py-3 rounded-full bg-white border border-slate-200 shadow-sm text-sm font-semibold text-slate-700 whitespace-nowrap flex items-center gap-2"
            >
              <span className="w-2 h-2 rounded-full bg-brand-blue/40 flex-shrink-0" />
              {industry}
            </div>
          ))}
        </div>
      </div>

      {/* Stats row */}
      <div className="max-w-4xl mx-auto px-6 grid md:grid-cols-3 gap-8">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.12, duration: 0.6 }}
            className="bg-white rounded-2xl p-8 text-center shadow-sm border border-slate-100 group hover:shadow-lg hover:border-brand-blue/20 transition-all"
          >
            <div className="w-12 h-12 bg-brand-blue/10 rounded-xl flex items-center justify-center text-brand-blue mx-auto mb-4 group-hover:bg-brand-blue group-hover:text-white transition-colors">
              {stat.icon}
            </div>
            <div className="text-4xl font-bold text-brand-navy mb-1">{stat.value}</div>
            <div className="text-slate-500 font-medium">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Trust badges */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
        className="max-w-2xl mx-auto mt-12 px-6 flex flex-wrap justify-center gap-4"
      >
        {['WAH Certified', 'ISO 9001 Aligned', 'Lean Six Sigma'].map(badge => (
          <span key={badge} className="px-4 py-2 rounded-full bg-brand-navy/5 border border-brand-navy/10 text-brand-navy text-sm font-semibold flex items-center gap-2">
            <span className="text-brand-blue">✓</span> {badge}
          </span>
        ))}
      </motion.div>
    </section>
  );
};

export default TrustedTeams;
