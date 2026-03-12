import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Target, Zap, BarChart3, Leaf, Search, PenLine, TrendingUp } from 'lucide-react';

const openChat = () => window.dispatchEvent(new CustomEvent('open-chat-widget'));

// ─── Hero ─────────────────────────────────────────────────────────────────────
const Hero: React.FC = () => (
  <section className="relative min-h-[90vh] flex items-center pt-20 bg-brand-navy overflow-hidden">
    <div className="absolute top-1/4 right-1/3 w-[500px] h-[500px] rounded-full bg-brand-blue/10 blur-[120px] pointer-events-none" />
    <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-brand-navy to-transparent pointer-events-none" />

    <div className="relative z-10 max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center w-full py-20">
      {/* Left — Copy */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.span
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-blue/20 border border-brand-blue/40 text-brand-accent text-xs font-bold uppercase tracking-widest mb-6"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-brand-accent animate-pulse" />
          Operational Excellence Consulting
        </motion.span>

        <h1 className="text-5xl md:text-6xl font-display text-white leading-[1.05] mb-6">
          Transform Your Operations Into a{' '}
          <span className="italic text-brand-accent">High-Performance</span>{' '}
          System
        </h1>

        <p className="text-lg text-slate-300 mb-10 max-w-lg leading-relaxed">
          We help organizations implement proven frameworks for ESG sustainability,
          strategy execution, financial governance, and continuous operational improvement.
        </p>

        <div className="flex flex-wrap gap-4">
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            onClick={openChat}
            className="bg-brand-blue hover:bg-brand-accent text-white px-8 py-4 rounded-xl font-bold text-lg transition-all flex items-center gap-2 group shadow-2xl shadow-brand-blue/30"
          >
            Discuss Your Operational Challenge
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </motion.button>
          <motion.a
            href="#be-framework"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="bg-white/10 hover:bg-white/[0.18] backdrop-blur-sm text-white px-8 py-4 rounded-xl font-bold text-lg transition-all border border-white/20"
          >
            Explore Our Framework
          </motion.a>
        </div>
      </motion.div>

      {/* Right — Image */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="hidden lg:block relative"
      >
        <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl">
          <img
            src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=900&q=80"
            alt="Operational Excellence Consulting"
            className="w-full h-[520px] object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/60 via-transparent to-transparent" />
        </div>
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -bottom-6 -left-8 bg-brand-navy border border-white/10 rounded-2xl px-6 py-5 shadow-2xl"
        >
          <div className="text-4xl font-bold text-white">32%</div>
          <div className="text-brand-accent text-sm font-semibold">Avg. Efficiency Gain</div>
        </motion.div>
      </motion.div>
    </div>
  </section>
);

// ─── Frameworks ───────────────────────────────────────────────────────────────
const FRAMEWORKS = [
  'ESG Sustainability',
  'Lean Management',
  'Kaizen',
  'Hoshin Kanri',
  'Operational Excellence',
];

const FrameworksStrip: React.FC = () => (
  <section className="py-16 bg-white border-b border-slate-100">
    <div className="max-w-5xl mx-auto px-6 text-center">
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-sm font-bold uppercase tracking-widest text-brand-blue mb-2"
      >
        Globally Recognized Frameworks
      </motion.p>
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="text-slate-500 mb-8 max-w-xl mx-auto"
      >
        Using internationally proven methodologies to drive measurable business improvement.
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.15 }}
        className="flex flex-wrap justify-center gap-3"
      >
        {FRAMEWORKS.map(f => (
          <span
            key={f}
            className="px-5 py-2.5 rounded-full bg-brand-navy/5 border border-brand-navy/10 text-brand-navy text-sm font-semibold flex items-center gap-2"
          >
            <span className="text-brand-blue">✓</span> {f}
          </span>
        ))}
      </motion.div>
    </div>
  </section>
);

// ─── Problems ─────────────────────────────────────────────────────────────────
const problems = [
  {
    icon: <Target className="w-6 h-6" />,
    title: 'Strategic Misalignment',
    desc: 'Leadership strategy does not translate into operational execution across teams.',
  },
  {
    icon: <Zap className="w-6 h-6" />,
    title: 'Process Inefficiencies',
    desc: 'Hidden inefficiencies create operational waste and increase costs without visibility.',
  },
  {
    icon: <BarChart3 className="w-6 h-6" />,
    title: 'Financial Governance Gaps',
    desc: 'Operational decisions are made without structured financial frameworks or accountability.',
  },
  {
    icon: <Leaf className="w-6 h-6" />,
    title: 'Sustainability Pressure',
    desc: 'Organizations struggle to design and implement effective ESG programs at scale.',
  },
];

const ProblemsSection: React.FC = () => (
  <section id="be-problems" className="py-24 bg-slate-50">
    <div className="max-w-7xl mx-auto px-6">
      <div className="text-center max-w-3xl mx-auto mb-14">
        <motion.span
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-block px-4 py-1.5 rounded-full bg-red-500/10 border border-red-400/30 text-red-500 text-xs font-bold uppercase tracking-widest mb-4"
        >
          Operational Challenges
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-5xl font-display text-brand-navy"
        >
          Most Organizations Face These Challenges
        </motion.h2>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-12">
        {problems.map((p, i) => (
          <motion.div
            key={p.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.6 }}
            className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-lg hover:border-brand-blue/20 transition-all group"
          >
            <div className="w-12 h-12 bg-brand-blue/10 rounded-2xl flex items-center justify-center text-brand-blue mb-5 group-hover:bg-brand-navy group-hover:text-white transition-colors">
              {p.icon}
            </div>
            <h3 className="text-xl font-bold text-brand-navy mb-2">{p.title}</h3>
            <p className="text-slate-500 leading-relaxed">{p.desc}</p>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center"
      >
        <button
          onClick={openChat}
          className="bg-brand-blue hover:bg-brand-accent text-white px-10 py-4 rounded-xl font-bold text-lg transition-all inline-flex items-center gap-2 group shadow-xl shadow-brand-blue/20"
        >
          Ask How We Solve These Challenges
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>
      </motion.div>
    </div>
  </section>
);

// ─── Consulting Framework ─────────────────────────────────────────────────────
const steps = [
  {
    number: '01',
    icon: <Search className="w-6 h-6" />,
    title: 'Strategy Deployment',
    subtitle: 'Hoshin Kanri alignment',
    desc: 'Align leadership strategy with every level of your organization through structured planning and accountability frameworks.',
    color: 'from-blue-600 to-blue-400',
    glow: 'shadow-blue-500/30',
  },
  {
    number: '02',
    icon: <PenLine className="w-6 h-6" />,
    title: 'Operational Systems',
    subtitle: 'Lean workflow design',
    desc: 'Map and redesign your core workflows to eliminate waste, reduce cycle times, and standardize performance.',
    color: 'from-violet-600 to-violet-400',
    glow: 'shadow-violet-500/30',
  },
  {
    number: '03',
    icon: <BarChart3 className="w-6 h-6" />,
    title: 'Financial Governance',
    subtitle: 'Decision frameworks',
    desc: 'Build structured financial governance so operational decisions are driven by data and aligned with business objectives.',
    color: 'from-brand-blue to-brand-accent',
    glow: 'shadow-brand-blue/30',
  },
  {
    number: '04',
    icon: <TrendingUp className="w-6 h-6" />,
    title: 'Continuous Improvement',
    subtitle: 'Kaizen culture',
    desc: 'Embed a culture of daily improvement where every team member contributes to ongoing performance gains.',
    color: 'from-emerald-600 to-emerald-400',
    glow: 'shadow-emerald-500/30',
  },
];

const ConsultingFramework: React.FC = () => (
  <section id="be-framework" className="py-24 bg-brand-navy overflow-hidden relative">
    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-blue/40 to-transparent" />
    <div
      className="absolute inset-0 opacity-[0.03] pointer-events-none"
      style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #fff 1px, transparent 0)', backgroundSize: '40px 40px' }}
    />

    <div className="relative z-10 max-w-7xl mx-auto px-6">
      <div className="text-center mb-14">
        <motion.span
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-block px-4 py-1.5 rounded-full bg-brand-blue/20 border border-brand-blue/30 text-brand-accent text-xs font-bold uppercase tracking-widest mb-4"
        >
          Our Approach
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-5xl font-display text-white"
        >
          Our Operational Excellence Framework
        </motion.h2>
      </div>

      <div className="grid md:grid-cols-4 gap-5">
        {steps.map((step, i) => (
          <motion.div
            key={step.number}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.12, duration: 0.6 }}
            className="relative group"
          >
            {i < steps.length - 1 && (
              <div className="hidden md:block absolute top-10 left-[calc(100%+0px)] w-full h-px z-0">
                <motion.div
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 + i * 0.15, duration: 0.7 }}
                  className="w-full h-full bg-gradient-to-r from-brand-blue to-brand-accent origin-left"
                />
              </div>
            )}
            <div className="bg-white/5 border border-white/10 rounded-3xl p-7 h-full hover:bg-white/10 hover:border-brand-blue/30 transition-all">
              <span className="text-5xl font-bold text-white/10 leading-none block mb-4">{step.number}</span>
              <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center text-white mb-5 shadow-lg ${step.glow}`}>
                {step.icon}
              </div>
              <h3 className="text-lg font-bold text-white mb-1">{step.title}</h3>
              <p className="text-xs font-semibold text-brand-accent uppercase tracking-wider mb-3">{step.subtitle}</p>
              <p className="text-slate-400 text-sm leading-relaxed">{step.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

// ─── Services ─────────────────────────────────────────────────────────────────
const services = [
  {
    title: 'ESG Sustainability',
    desc: 'Implement ESG programs that improve environmental responsibility, governance, and long-term sustainability performance.',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80',
    tag: 'ESG',
    cta: 'Ask About ESG Implementation',
  },
  {
    title: 'Strategy Deployment',
    desc: 'Align leadership strategy with operational execution across all teams using Hoshin Kanri frameworks.',
    image: 'https://images.unsplash.com/photo-1552581234-26160f608093?w=800&q=80',
    tag: 'Hoshin Kanri',
    cta: 'Discuss Strategy Deployment',
  },
  {
    title: 'Business Finance OE',
    desc: 'Improve operational decision-making through structured financial governance and performance frameworks.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
    tag: 'Finance',
    cta: 'Talk About Financial Optimization',
  },
  {
    title: 'Kaizen in OE',
    desc: 'Implement continuous improvement systems to eliminate inefficiencies and improve productivity across operations.',
    image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800&q=80',
    tag: 'Kaizen',
    cta: 'Learn About Kaizen Implementation',
  },
];

const ServicesSection: React.FC = () => (
  <section id="be-services" className="py-24 bg-white">
    <div className="max-w-7xl mx-auto px-6">
      <div className="text-center max-w-2xl mx-auto mb-14">
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-brand-blue font-bold uppercase tracking-widest text-sm mb-3"
        >
          Consulting Services
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-5xl font-display text-brand-navy"
        >
          Specialized Solutions for Your Organization
        </motion.h2>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {services.map((svc, i) => (
          <motion.div
            key={svc.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.6 }}
            className="group relative overflow-hidden rounded-3xl aspect-[16/10] cursor-pointer"
          >
            <img
              src={svc.image}
              alt={svc.title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-navy via-brand-navy/30 to-transparent opacity-90" />
            <div className="absolute top-6 left-6">
              <span className="px-3 py-1 rounded-full bg-brand-blue/80 text-white text-xs font-bold uppercase tracking-wider backdrop-blur-sm">
                {svc.tag}
              </span>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <h3 className="text-2xl font-bold text-white mb-3 leading-tight">{svc.title}</h3>
              <p className="text-white/80 text-sm leading-relaxed mb-5 max-w-md opacity-0 group-hover:opacity-100 -translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                {svc.desc}
              </p>
              <button
                onClick={openChat}
                className="bg-white text-brand-navy px-6 py-2.5 rounded-full text-sm font-bold hover:bg-brand-blue hover:text-white transition-all opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 duration-300"
              >
                {svc.cta} →
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

// ─── Outcomes ─────────────────────────────────────────────────────────────────
const outcomes = [
  {
    icon: <Zap className="w-6 h-6" />,
    title: 'Reduce Operational Waste',
    desc: 'Identify and eliminate hidden inefficiencies that drain resources and reduce margins.',
  },
  {
    icon: <Target className="w-6 h-6" />,
    title: 'Improve Strategic Execution',
    desc: 'Close the gap between leadership intent and frontline operational performance.',
  },
  {
    icon: <BarChart3 className="w-6 h-6" />,
    title: 'Increase Financial Discipline',
    desc: 'Make operational decisions backed by structured financial governance frameworks.',
  },
  {
    icon: <Leaf className="w-6 h-6" />,
    title: 'Improve Sustainability Compliance',
    desc: 'Build credible ESG programs that meet regulatory and stakeholder expectations.',
  },
];

const OutcomesSection: React.FC = () => (
  <section className="py-24 bg-slate-50">
    <div className="max-w-7xl mx-auto px-6">
      <div className="text-center max-w-2xl mx-auto mb-14">
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-brand-blue font-bold uppercase tracking-widest text-sm mb-3"
        >
          Results
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-5xl font-display text-brand-navy"
        >
          What Organizations Achieve With Operational Excellence
        </motion.h2>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {outcomes.map((o, i) => (
          <motion.div
            key={o.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.6 }}
            whileHover={{ y: -6 }}
            className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:border-brand-blue/20 transition-all group"
          >
            <div className="w-12 h-12 bg-brand-blue/10 rounded-2xl flex items-center justify-center text-brand-blue mb-6 group-hover:bg-brand-navy group-hover:text-white transition-colors">
              {o.icon}
            </div>
            <h3 className="text-lg font-bold text-brand-navy mb-2">{o.title}</h3>
            <p className="text-slate-500 text-sm leading-relaxed">{o.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

// ─── Conversation CTA ─────────────────────────────────────────────────────────
const ConversationCTA: React.FC = () => (
  <section className="py-24 bg-white">
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
            Get Started
          </motion.span>
          <h2 className="text-4xl md:text-5xl font-display text-white mb-6 max-w-3xl mx-auto leading-tight">
            Start the{' '}
            <span className="italic text-brand-accent">Conversation</span>
          </h2>
          <p className="text-xl text-white/65 mb-12 max-w-2xl mx-auto leading-relaxed">
            Every organization faces operational challenges. The first step to solving them
            is understanding where improvement is needed.
          </p>
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            onClick={openChat}
            className="bg-brand-blue hover:bg-brand-accent text-white px-10 py-5 rounded-2xl font-bold text-xl transition-all shadow-2xl shadow-brand-blue/40 inline-flex items-center gap-2 group"
          >
            Start a Conversation With an Advisor
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </div>
      </motion.div>
    </div>
  </section>
);

// ─── Page ─────────────────────────────────────────────────────────────────────
const BusinessExcellencePage: React.FC = () => (
  <main>
    <Hero />
    <FrameworksStrip />
    <ProblemsSection />
    <ConsultingFramework />
    <ServicesSection />
    <OutcomesSection />
    <ConversationCTA />
  </main>
);

export default BusinessExcellencePage;
