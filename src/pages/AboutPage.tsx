import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import {
  ArrowRight, CheckCircle2, Users, Target, Leaf,
  ClipboardList, Layers, Wrench, Award, TrendingUp,
  Radio, Building2, Cog, Flame, Truck, Landmark,
} from 'lucide-react';

// ─── Data ─────────────────────────────────────────────────────────────────────
const VALUE_POINTS = [
  'Lean Management consulting',
  'ISO management system implementation',
  'Industry-certified training programs',
  'Safety and compliance solutions',
];

const INDUSTRIES: Array<{ name: string; Icon: React.FC<{ className?: string }> }> = [
  { name: 'Telecommunications',          Icon: Radio      },
  { name: 'Construction & Infrastructure', Icon: Building2 },
  { name: 'Manufacturing',               Icon: Cog        },
  { name: 'Oil & Gas',                   Icon: Flame      },
  { name: 'Transport & Logistics',       Icon: Truck      },
  { name: 'Government Ministries',       Icon: Landmark   },
];

const METHODOLOGY: Array<{
  step: number; title: string; desc: string;
  Icon: React.FC<{ className?: string }>;
}> = [
  { step: 1, title: 'Assess',    desc: 'Evaluate operational challenges, risks, and compliance gaps.',                    Icon: ClipboardList },
  { step: 2, title: 'Design',    desc: 'Develop tailored management systems aligned with industry standards.',             Icon: Layers       },
  { step: 3, title: 'Implement', desc: 'Deploy operational frameworks and training programs across the organization.',     Icon: Wrench       },
  { step: 4, title: 'Certify',   desc: 'Prepare organizations for global certifications and regulatory compliance.',       Icon: Award        },
  { step: 5, title: 'Improve',   desc: 'Drive continuous operational improvement and sustain performance gains.',          Icon: TrendingUp   },
];

const FEATURES = [
  {
    Icon: Users,
    title: 'Expertise and Experience',
    desc: 'Our consultants bring decades of experience implementing Lean and safety management systems across diverse industries.',
  },
  {
    Icon: Target,
    title: 'Customized Solutions',
    desc: 'Every organization is unique. Our consulting engagements are tailored to your specific operational challenges and strategic goals.',
  },
  {
    Icon: Leaf,
    title: 'Sustainable Results',
    desc: 'Our solutions focus on long-term operational improvements rather than short-term fixes — building lasting capability within your teams.',
  },
];

const DIFFERENTIATORS = [
  '35+ years of consulting experience',
  'Lean and operational excellence specialists',
  'Industry-certified training providers',
  'ISO implementation expertise',
  'Multi-industry consulting capability',
];

const AUTHORITY_STATS = [
  { stat: '35+',  label: 'Years of Experience',       sub: 'Across East Africa and beyond' },
  { stat: '500+', label: 'Organizations Supported',   sub: 'From SMEs to large corporations' },
  { stat: 'ISO',  label: 'Implementation Specialists', sub: 'ISO 9001, 45001, 14001' },
  { stat: '100%', label: 'Industry-Certified Trainers', sub: 'GWO, WAH, Lean certified' },
];

// ─── AboutPage ────────────────────────────────────────────────────────────────
const AboutPage: React.FC = () => {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  const openBooking = () => window.dispatchEvent(new CustomEvent('open-booking-modal'));

  return (
    <div className="min-h-screen bg-white">

      {/* ── Hero Authority Section ────────────────────────────────────────────── */}
      <section className="bg-brand-navy pt-36 pb-24 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #fff 1px, transparent 0)', backgroundSize: '40px 40px' }}
        />
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-brand-blue/15 rounded-full blur-[80px] pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-brand-accent/10 rounded-full blur-[60px] pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-brand-blue/20 border border-brand-blue/30 text-brand-accent text-xs font-bold uppercase tracking-widest mb-6">
              35+ Years of Operational Excellence
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-[3.25rem] font-display text-white mb-7 leading-tight">
              35+ Years Helping Organizations Achieve{' '}
              <span className="italic text-brand-accent">Operational Excellence</span>
            </h1>
            <p className="text-white/65 text-lg mb-8 leading-relaxed">
              Cygnus Consulting partners with organizations to implement world-class safety systems,
              operational frameworks, and management standards that drive sustainable business performance.
            </p>
            <ul className="space-y-3 mb-10">
              {VALUE_POINTS.map((pt, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.35 + i * 0.08 }}
                  className="flex items-center gap-3"
                >
                  <CheckCircle2 className="w-5 h-5 text-brand-accent flex-shrink-0" />
                  <span className="text-white/80 font-medium">{pt}</span>
                </motion.li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={openBooking}
                className="bg-brand-blue hover:bg-brand-accent text-white px-8 py-4 rounded-xl font-bold transition-all shadow-xl shadow-brand-blue/30 flex items-center gap-2 group"
              >
                Request a Free Consultation
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <Link
                to="/services"
                className="bg-white/10 hover:bg-white/[0.18] border border-white/20 text-white px-8 py-4 rounded-xl font-bold transition-all"
              >
                Explore Our Services
              </Link>
            </div>
          </motion.div>

          {/* Right: image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="relative hidden lg:block"
          >
            <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=900&q=80"
                alt="Cygnus Consulting team"
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/35 to-transparent" />
            </div>
            {/* Floating badge */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -bottom-6 -left-6 bg-white rounded-2xl px-6 py-4 shadow-2xl"
            >
              <div className="text-3xl font-bold text-brand-navy">500+</div>
              <div className="text-brand-blue text-xs font-semibold mt-0.5">Organizations Supported</div>
            </motion.div>
            <div className="absolute -top-8 -right-8 w-48 h-48 bg-brand-blue/15 rounded-full blur-3xl pointer-events-none" />
          </motion.div>
        </div>
      </section>

      {/* ── Company Mission ───────────────────────────────────────────────────── */}
      <section className="py-24 bg-slate-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-20 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative rounded-[2rem] overflow-hidden shadow-xl"
          >
            <img
              src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=900&q=80"
              alt="Cygnus team collaboration"
              className="w-full h-auto object-cover"
            />
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-brand-blue font-bold uppercase tracking-widest text-sm mb-3">Cygnus Consulting</p>
            <h2 className="text-4xl md:text-5xl font-display text-brand-navy mb-6 leading-tight">
              We Are Synonymous With{' '}
              <span className="italic text-brand-blue">Operational Excellence</span>
            </h2>
            <p className="text-slate-600 leading-relaxed mb-5 text-lg">
              Cygnus Consulting is a trusted partner in Lean Management and operational transformation.
              Our mission is to help organizations unlock their full potential through continuous
              improvement, effective safety systems, and operational discipline.
            </p>
            <p className="text-slate-600 leading-relaxed mb-9">
              We empower organizations across industries to optimize processes, improve performance,
              and build sustainable growth that lasts beyond the initial engagement.
            </p>
            <button
              onClick={openBooking}
              className="bg-brand-navy hover:bg-brand-blue text-white px-8 py-4 rounded-xl font-bold transition-all flex items-center gap-2 group"
            >
              Talk to Our Experts
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* ── Industries & Client Focus ──────────────────────────────────────────── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <motion.p
              initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="text-brand-blue font-bold uppercase tracking-widest text-sm mb-3"
            >
              Who Do We Serve
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-display text-brand-navy mb-5"
            >
              Empowering Organizations Across Industries
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: 0.18 }}
              className="text-slate-500 text-lg leading-relaxed"
            >
              Regardless of industry, organizations face similar challenges: improving efficiency,
              maintaining safety standards, and ensuring compliance. Cygnus helps businesses overcome
              these challenges through structured operational improvement.
            </motion.p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-5 mb-12">
            {INDUSTRIES.map(({ name, Icon }, i) => (
              <motion.div
                key={name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ y: -4 }}
                className="bg-slate-50 rounded-2xl p-7 border border-slate-100 hover:border-brand-blue/30 hover:bg-brand-blue/5 hover:shadow-lg transition-all group text-center"
              >
                <div className="w-14 h-14 rounded-2xl bg-brand-blue/10 group-hover:bg-brand-navy flex items-center justify-center mx-auto mb-4 transition-colors duration-300">
                  <Icon className="w-7 h-7 text-brand-blue group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="font-bold text-brand-navy text-sm leading-snug">{name}</h3>
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <button
              onClick={openBooking}
              className="bg-brand-navy hover:bg-brand-blue text-white px-9 py-4 rounded-xl font-bold transition-all inline-flex items-center gap-2 group"
            >
              Request Free Consultation
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* ── Consulting Methodology ────────────────────────────────────────────── */}
      <section className="py-24 bg-brand-navy relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #fff 1px, transparent 0)', backgroundSize: '40px 40px' }}
        />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-blue/40 to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <motion.p
              initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="text-brand-accent font-bold uppercase tracking-widest text-sm mb-3"
            >
              Our Methodology
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-display text-white"
            >
              Our Approach to Operational Excellence
            </motion.h2>
          </div>

          {/* Desktop: horizontal flow */}
          <div className="hidden lg:flex items-start">
            {METHODOLOGY.map(({ step, title, desc, Icon }, i) => (
              <React.Fragment key={title}>
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.12 }}
                  className="flex-1 text-center px-5"
                >
                  <div className="w-16 h-16 rounded-2xl bg-brand-blue/20 border border-brand-blue/30 flex items-center justify-center mx-auto mb-5">
                    <Icon className="w-7 h-7 text-brand-accent" />
                  </div>
                  <div className="text-brand-accent text-xs font-bold uppercase tracking-widest mb-2">
                    Step {step}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{desc}</p>
                </motion.div>
                {i < METHODOLOGY.length - 1 && (
                  <div className="flex-shrink-0 flex items-start pt-7">
                    <ArrowRight className="w-5 h-5 text-brand-blue/35 mx-1" />
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Mobile: vertical list */}
          <div className="lg:hidden space-y-7">
            {METHODOLOGY.map(({ step, title, desc, Icon }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex gap-5 items-start"
              >
                <div className="w-12 h-12 rounded-xl bg-brand-blue/20 border border-brand-blue/30 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-5 h-5 text-brand-accent" />
                </div>
                <div>
                  <div className="text-brand-accent text-xs font-bold uppercase tracking-widest mb-1">
                    Step {step}
                  </div>
                  <h3 className="text-lg font-bold text-white mb-1">{title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why Choose Cygnus ─────────────────────────────────────────────────── */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <motion.p
              initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="text-brand-blue font-bold uppercase tracking-widest text-sm mb-3"
            >
              Why Choose Us
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-display text-brand-navy"
            >
              Helping Organizations Set New{' '}
              <span className="italic text-brand-blue">Standards of Excellence</span>
            </motion.h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {FEATURES.map(({ Icon, title, desc }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.6 }}
                whileHover={{ y: -8 }}
                className="bg-white p-9 rounded-3xl shadow-sm border border-slate-100 hover:shadow-xl hover:border-brand-blue/20 transition-all group"
              >
                <div className="w-14 h-14 bg-brand-blue/10 rounded-2xl flex items-center justify-center text-brand-blue mb-7 group-hover:bg-brand-navy group-hover:text-white transition-colors">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-brand-navy mb-3">{title}</h3>
                <p className="text-slate-500 leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Expertise & Differentiators ───────────────────────────────────────── */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-20 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-brand-blue font-bold uppercase tracking-widest text-sm mb-3">Our Edge</p>
            <h2 className="text-4xl md:text-5xl font-display text-brand-navy mb-8 leading-tight">
              Proven Expertise in{' '}
              <span className="italic text-brand-blue">Operational Improvement</span>
            </h2>
            <ul className="space-y-4">
              {DIFFERENTIATORS.map((item, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  </div>
                  <span className="text-slate-700 font-medium">{item}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="rounded-[2rem] overflow-hidden shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=900&q=80"
                alt="Cygnus operational excellence in practice"
                className="w-full h-auto object-cover"
              />
            </div>
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -bottom-6 -right-4 bg-brand-navy rounded-2xl px-6 py-4 shadow-2xl"
            >
              <div className="text-3xl font-bold text-white">98%</div>
              <div className="text-brand-accent text-xs font-semibold mt-0.5">Client Satisfaction</div>
            </motion.div>
            <div className="absolute -top-8 -left-8 w-48 h-48 bg-brand-blue/10 rounded-full blur-3xl pointer-events-none" />
          </motion.div>
        </div>
      </section>

      {/* ── Authority & Credibility Indicators ───────────────────────────────── */}
      <section className="py-20 bg-brand-navy relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #fff 1px, transparent 0)', backgroundSize: '40px 40px' }}
        />
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {AUTHORITY_STATS.map(({ stat, label, sub }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-display font-bold text-white mb-2">{stat}</div>
                <div className="text-brand-accent font-bold text-sm mb-1">{label}</div>
                <div className="text-slate-500 text-xs leading-relaxed">{sub}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final Consultation CTA ────────────────────────────────────────────── */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative bg-brand-navy rounded-[3rem] overflow-hidden"
          >
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-blue/20 rounded-full blur-[80px]" />
              <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-brand-accent/15 rounded-full blur-[60px]" />
            </div>
            <div className="relative z-10 px-10 py-20 md:p-20 text-center">
              <motion.span
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-block px-4 py-1.5 rounded-full bg-brand-blue/20 border border-brand-blue/30 text-brand-accent text-xs font-bold uppercase tracking-widest mb-6"
              >
                Let's Get Started
              </motion.span>
              <h2 className="text-4xl md:text-5xl font-display text-white mb-6 max-w-3xl mx-auto leading-tight">
                Start Improving Your Organization's{' '}
                <span className="italic text-brand-accent">Operational Performance</span>
              </h2>
              <p className="text-xl text-white/65 mb-12 max-w-2xl mx-auto leading-relaxed">
                Cygnus Consulting helps organizations implement world-class management systems,
                improve operational safety, and achieve sustainable business performance.
              </p>
              <div className="flex flex-wrap justify-center gap-5">
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={openBooking}
                  className="bg-brand-blue hover:bg-brand-accent text-white px-10 py-5 rounded-2xl font-bold text-xl transition-all shadow-2xl shadow-brand-blue/40 flex items-center gap-2 group"
                >
                  Request Free Consultation
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </motion.button>
                <motion.div whileHover={{ scale: 1.03 }}>
                  <Link
                    to="/training/business-excellence"
                    className="bg-white/10 hover:bg-white/[0.18] backdrop-blur-sm text-white px-10 py-5 rounded-2xl font-bold text-xl transition-all border border-white/20 inline-block"
                  >
                    Explore Training Programs
                  </Link>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
