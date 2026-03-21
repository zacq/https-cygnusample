import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import {
  CheckCircle,
  RefreshCw, BarChart3, Target, DollarSign, Layers, Leaf,
  ArrowRight, ChevronDown, Download, Calendar,
  Users, HardHat, Briefcase, Building2, Sprout,
  Network, TrendingUp, ShieldCheck, Cpu,
} from 'lucide-react';
import LeadCaptureModal from '../components/LeadCaptureModal';

// ─── Day Section ──────────────────────────────────────────────────────────────
interface Topic {
  icon:  React.ReactNode;
  title: string;
  body:  string;
  bullets?: string[];
}

interface DayProps {
  day:    number;
  label:  string;
  title:  string;
  color:  string; // tailwind gradient class
  topics: [Topic, Topic];
  flip?:  boolean;
}

const DaySection: React.FC<DayProps> = ({ day, label, title, color, topics, flip }) => (
  <section className={`py-24 ${flip ? 'bg-white' : 'bg-slate-50'}`}>
    <div className="max-w-6xl mx-auto px-6">
      {/* Day label row */}
      <motion.div
        initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
        className="flex items-center gap-4 mb-10"
      >
        <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center shadow-lg shrink-0`}>
          <span className="text-white font-bold text-lg">{day}</span>
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-brand-blue">Day {day}</p>
          <h2 className="text-3xl md:text-4xl font-display text-brand-navy">{title}</h2>
        </div>
        <div className="flex-1 hidden md:block h-px bg-gradient-to-r from-slate-200 to-transparent ml-4" />
      </motion.div>

      {/* Topic cards */}
      <div className="grid md:grid-cols-2 gap-6">
        {topics.map((topic, i) => (
          <motion.div
            key={topic.title}
            initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ delay: i * 0.12, duration: 0.6 }}
            className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm hover:shadow-lg hover:border-brand-blue/20 transition-all group"
          >
            <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center text-white mb-6 shadow-md group-hover:scale-110 transition-transform`}>
              {topic.icon}
            </div>
            <h3 className="text-xl font-bold text-brand-navy mb-3">{topic.title}</h3>
            <p className="text-slate-500 leading-relaxed mb-4">{topic.body}</p>
            {topic.bullets && (
              <ul className="space-y-2">
                {topic.bullets.map(b => (
                  <li key={b} className="flex items-center gap-2.5 text-sm text-slate-600">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-blue shrink-0" />
                    {b}
                  </li>
                ))}
              </ul>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

// ─── Page ─────────────────────────────────────────────────────────────────────
const BusinessExcellenceTrainingPage: React.FC = () => {
  const [modal, setModal] = useState<{ open: boolean; source: string }>({ open: false, source: '' });
  const finalRef = useRef<HTMLDivElement>(null);
  const openModal = (source: string) => setModal({ open: true, source });

  const scrollToFinal = () =>
    finalRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });

  const FRAMEWORKS = ['Lean', 'Kaizen', 'Hoshin Kanri', 'Lean Six Sigma', 'ESG Frameworks'];

  const AUDIENCE = [
    { icon: <Briefcase className="w-5 h-5" />,  label: 'Operations Managers' },
    { icon: <HardHat className="w-5 h-5" />,    label: 'Construction Professionals' },
    { icon: <Users className="w-5 h-5" />,      label: 'Project Managers' },
    { icon: <Building2 className="w-5 h-5" />,  label: 'Business Leaders' },
    { icon: <Sprout className="w-5 h-5" />,     label: 'Sustainability Officers' },
  ];

  return (
    <main>
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative pt-32 pb-24 bg-brand-navy overflow-hidden">
        <div className="absolute top-0 right-1/4 w-[600px] h-[600px] rounded-full bg-brand-blue/10 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] rounded-full bg-brand-accent/8 blur-[80px] pointer-events-none" />
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #fff 1px, transparent 0)', backgroundSize: '40px 40px' }} />

        <div className="relative z-10 max-w-5xl mx-auto px-6">
          <motion.span
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-blue/20 border border-brand-blue/40 text-brand-accent text-xs font-bold uppercase tracking-widest mb-6"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-brand-accent animate-pulse" />
            3-Day Operations Excellence Training
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 0.8 }}
            className="text-5xl md:text-6xl font-display text-white leading-[1.08] mb-6 max-w-4xl"
          >
            Earn CPD Credits While Learning How to{' '}
            <span className="italic text-brand-accent">Improve Business Operations</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.7 }}
            className="text-lg text-slate-300 max-w-2xl mb-10 leading-relaxed"
          >
            Organizations today face increasing pressure to improve efficiency, reduce operational
            waste, and remain competitive in rapidly evolving markets. This 3-day program equips
            professionals with practical tools to transform operations, strengthen financial
            decision-making, and drive sustainable growth.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45, duration: 0.6 }}
            className="flex flex-wrap gap-4"
          >
            <button
              onClick={() => openModal('BE Training — Reserve Seat')}
              className="bg-brand-blue hover:bg-brand-accent text-white px-9 py-4 rounded-xl font-bold text-lg transition-all shadow-2xl shadow-brand-blue/30 flex items-center gap-2 group"
            >
              Reserve Your Seat
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={scrollToFinal}
              className="bg-white/10 hover:bg-white/20 border border-white/20 text-white px-9 py-4 rounded-xl font-bold text-lg transition-all flex items-center gap-2"
            >
              <ChevronDown className="w-5 h-5" /> View Program
            </button>
          </motion.div>

          {/* Quick facts */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.6 }}
            className="flex flex-wrap gap-8 mt-14 border-t border-white/10 pt-10"
          >
            {[
              { label: 'Duration',      value: '3 Days' },
              { label: 'Format',        value: 'Online' },
              { label: 'Certification', value: 'Certificate' },
              { label: 'CPD Credits',   value: 'Included' },
            ].map((f, i) => (
              <React.Fragment key={f.label}>
                {i > 0 && <div className="w-px h-10 bg-white/10 hidden sm:block" />}
                <div>
                  <div className="text-2xl font-bold text-white">{f.value}</div>
                  <div className="text-sm text-slate-400">{f.label}</div>
                </div>
              </React.Fragment>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Why This Training Matters ─────────────────────────────────────── */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -32 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-brand-blue font-bold uppercase tracking-widest text-sm mb-3">Why It Matters</p>
            <h2 className="text-4xl md:text-5xl font-display text-brand-navy mb-6 leading-tight">
              Why Operations Excellence Matters for Modern Businesses
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed">
              Companies today face increasing pressure to improve efficiency, reduce operational
              waste, and remain competitive in rapidly evolving markets. This program equips
              professionals with practical tools to transform operations, strengthen financial
              decision-making, and drive sustainable growth.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 32 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="space-y-5"
          >
            <p className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-6">
              Participants will learn how to:
            </p>
            {[
              { icon: <RefreshCw className="w-5 h-5" />,  text: 'Improve operational efficiency using Lean and Kaizen' },
              { icon: <Target className="w-5 h-5" />,     text: 'Align strategy with daily execution using Hoshin Kanri' },
              { icon: <DollarSign className="w-5 h-5" />, text: 'Make better financial decisions in operational roles' },
              { icon: <Leaf className="w-5 h-5" />,       text: 'Integrate sustainability and ESG into business operations' },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="flex items-start gap-4 p-5 rounded-2xl bg-slate-50 border border-slate-100 hover:border-brand-blue/20 hover:bg-brand-blue/5 transition-all group"
              >
                <div className="w-10 h-10 rounded-xl bg-brand-blue/10 flex items-center justify-center text-brand-blue shrink-0 group-hover:bg-brand-navy group-hover:text-white transition-colors">
                  {item.icon}
                </div>
                <p className="text-slate-700 font-medium leading-snug">{item.text}</p>
              </motion.div>
            ))}

            <button
              onClick={() => openModal('BE Training — Reserve Seat')}
              className="mt-4 w-full bg-brand-navy hover:bg-brand-blue text-white px-8 py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2 group"
            >
              Reserve Your Seat
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* ── 360° OE System ───────────────────────────────────────────────── */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <motion.p
              initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="text-brand-blue font-bold uppercase tracking-widest text-sm mb-3"
            >
              Holistic Framework
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-display text-brand-navy"
            >
              The Cygnus 360° Operational{' '}
              <span className="italic text-brand-blue">Excellence System</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: 0.18 }}
              className="text-slate-500 max-w-xl mx-auto mt-4 text-lg"
            >
              Eight interconnected pillars that together define a fully transformed, high-performing organisation.
            </motion.p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { icon: <RefreshCw className="w-6 h-6" />,   title: 'Process Excellence',     desc: 'VSM, flow optimisation, SMED, and takt time alignment.',       link: '/services' },
              { icon: <TrendingUp className="w-6 h-6" />,  title: 'Continuous Improvement', desc: 'DMAIC, daily management boards, and sustainability gates.',     link: '/services' },
              { icon: <DollarSign className="w-6 h-6" />,  title: 'Financial Impact',       desc: 'ROI validation, cost-of-poor-quality reduction frameworks.',   link: '/business-excellence' },
              { icon: <Users className="w-6 h-6" />,       title: 'People & Culture',       desc: 'Leader Standard Work, Kaizen culture, engagement metrics.',    link: '/business-excellence' },
              { icon: <ShieldCheck className="w-6 h-6" />, title: 'Quality Systems',        desc: 'Zero-defect design, FMEA, control plans, and audit cycles.',   link: '/services' },
              { icon: <Network className="w-6 h-6" />,     title: 'Safety & Compliance',    desc: 'ISO integration, ESG alignment, and regulatory governance.',   link: '/services' },
              { icon: <Target className="w-6 h-6" />,      title: 'Strategy Deployment',    desc: 'Hoshin Kanri X-matrix execution across all business levels.',  link: '/business-excellence' },
              { icon: <Cpu className="w-6 h-6" />,         title: 'Technology & BPMN',      desc: 'Process modelling, digital dashboards, workflow automation.',  link: '/business-excellence' },
            ].map((area, i) => (
              <motion.div
                key={area.title}
                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.07, duration: 0.5 }}
              >
                <Link
                  to={area.link}
                  className="flex flex-col h-full bg-white border border-slate-100 rounded-2xl p-6 hover:border-brand-blue/30 hover:shadow-lg transition-all group"
                >
                  <div className="w-11 h-11 rounded-xl bg-brand-blue/10 flex items-center justify-center text-brand-blue mb-4 group-hover:bg-brand-navy group-hover:text-white transition-colors shrink-0">
                    {area.icon}
                  </div>
                  <h3 className="font-bold text-brand-navy mb-2 text-base">{area.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed flex-1">{area.desc}</p>
                  <span className="mt-4 text-brand-blue text-xs font-bold flex items-center gap-1 group-hover:gap-2 transition-all">
                    Learn more <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Engagement Tiers ─────────────────────────────────────────────── */}
      <section className="py-24 bg-brand-navy overflow-hidden relative">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-blue/40 to-transparent" />
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #fff 1px, transparent 0)', backgroundSize: '40px 40px' }} />

        <div className="relative z-10 max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <motion.p
              initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="text-brand-accent font-bold uppercase tracking-widest text-sm mb-3"
            >
              How We Engage
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-display text-white"
            >
              Choose Your Path to{' '}
              <span className="italic text-brand-accent">Operational Excellence</span>
            </motion.h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6 items-start">
            {[
              {
                tier: 'Tier 1', name: 'Diagnostic', duration: '2–4 Weeks', featured: false,
                bullets: ['Current-state assessment', 'BPMN As-Is process mapping', 'Opportunity register', 'Financial quantification of losses'],
              },
              {
                tier: 'Tier 2', name: 'Improvement Project', duration: '3–6 Months', featured: true,
                bullets: ['DMAIC & Kaizen project execution', 'Future-state BPMN design', 'Control plans & sustainment', 'Team capability building'],
              },
              {
                tier: 'Tier 3', name: '360° Transformation', duration: '12–24 Months', featured: false,
                bullets: ['Full system deployment across all pillars', 'Internal belt certification training', 'Hoshin Kanri strategy cascade', 'Monthly leadership review cadence'],
              },
            ].map((t, i) => (
              <motion.div
                key={t.tier}
                initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.6 }}
                className={`relative rounded-3xl p-8 border flex flex-col ${
                  t.featured
                    ? 'bg-brand-blue border-brand-blue shadow-2xl shadow-brand-blue/40 md:-mt-4 md:-mb-4'
                    : 'bg-white/5 border-white/10 hover:bg-white/10 transition-all'
                }`}
              >
                {t.featured && (
                  <span className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-brand-gold text-brand-navy text-xs font-bold uppercase tracking-wider shadow-lg whitespace-nowrap">
                    Most Popular
                  </span>
                )}
                <div className="mb-6">
                  <p className={`text-xs font-bold uppercase tracking-widest mb-1 ${t.featured ? 'text-white/70' : 'text-brand-accent'}`}>{t.tier}</p>
                  <h3 className="text-2xl font-bold text-white">{t.name}</h3>
                  <p className={`text-sm mt-1 ${t.featured ? 'text-white/80' : 'text-slate-400'}`}>{t.duration}</p>
                </div>
                <ul className="space-y-3 flex-1 mb-8">
                  {t.bullets.map(b => (
                    <li key={b} className="flex items-start gap-3 text-sm">
                      <CheckCircle className={`w-4 h-4 shrink-0 mt-0.5 ${t.featured ? 'text-white' : 'text-brand-accent'}`} />
                      <span className={t.featured ? 'text-white/90' : 'text-slate-300'}>{b}</span>
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => openModal(`BE Training — ${t.tier} Enquiry`)}
                  className={`w-full py-3 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 group ${
                    t.featured
                      ? 'bg-white text-brand-blue hover:bg-brand-accent hover:text-white'
                      : 'bg-white/10 hover:bg-white/20 text-white border border-white/20'
                  }`}
                >
                  Enquire About {t.tier}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Implementation Roadmap ───────────────────────────────────────── */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <motion.p
              initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="text-brand-blue font-bold uppercase tracking-widest text-sm mb-3"
            >
              Your Journey
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-display text-brand-navy"
            >
              From Assessment to{' '}
              <span className="italic text-brand-blue">Sustained Excellence</span>
            </motion.h2>
          </div>

          <div className="relative">
            {/* Animated progress line (desktop) */}
            <div className="hidden md:block absolute top-8 left-0 right-0 h-0.5 bg-slate-100 z-0" />
            <motion.div
              initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }}
              transition={{ duration: 1.4, ease: 'easeInOut' }}
              className="hidden md:block absolute top-8 left-0 right-0 h-0.5 bg-gradient-to-r from-brand-blue to-brand-accent origin-left z-0"
            />

            <div className="grid md:grid-cols-5 gap-6 relative z-10">
              {[
                { phase: 'Phase 0', label: 'Initiation',    timing: 'Weeks 1–2',   desc: 'Stakeholder alignment, scope definition, baseline data collection.' },
                { phase: 'Phase 1', label: 'Foundation',    timing: '1–3 Months',  desc: 'Process mapping, waste identification, quick-win Kaizen events.' },
                { phase: 'Phase 2', label: 'Deployment',    timing: '3–9 Months',  desc: 'DMAIC projects, future-state BPMN, Hoshin X-matrix rollout.' },
                { phase: 'Phase 3', label: 'Embedding',     timing: '9–18 Months', desc: 'Belt certification, process registry, financial validation.' },
                { phase: 'Phase 4', label: 'Sustainability', timing: '18+ Months', desc: 'Continuous pipeline, governance audits, replication across sites.' },
              ].map((p, i) => (
                <motion.div
                  key={p.phase}
                  initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                  transition={{ delay: i * 0.12, duration: 0.6 }}
                  className="flex flex-col items-center text-center"
                >
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-blue to-brand-accent flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-brand-blue/30 mb-5 border-4 border-white">
                    {i}
                  </div>
                  <p className="text-xs font-bold text-brand-blue uppercase tracking-widest mb-1">{p.phase}</p>
                  <h3 className="font-bold text-brand-navy mb-1">{p.label}</h3>
                  <p className="text-xs text-brand-accent font-semibold mb-3">{p.timing}</p>
                  <p className="text-slate-500 text-xs leading-relaxed">{p.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Key Success Metrics ──────────────────────────────────────────── */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <motion.p
              initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="text-brand-blue font-bold uppercase tracking-widest text-sm mb-3"
            >
              Measurable Outcomes
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-display text-brand-navy"
            >
              Key Success Metrics
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: 0.18 }}
              className="text-slate-500 max-w-xl mx-auto mt-4 text-lg"
            >
              Every engagement is tracked against these KPIs to ensure transformation delivers real business impact.
            </motion.p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { kpi: 'Lead Time Reduction', target: '30–50%', icon: <RefreshCw className="w-5 h-5" />, desc: 'End-to-end cycle time compressed through flow optimisation.' },
              { kpi: 'First Pass Yield',    target: '>98%',   icon: <CheckCircle className="w-5 h-5" />, desc: 'Product or service right-first-time without rework.' },
              { kpi: 'OEE',                 target: '>85%',   icon: <BarChart3 className="w-5 h-5" />,  desc: 'Overall Equipment Effectiveness across availability, performance, quality.' },
              { kpi: 'COPQ Reduction',      target: '>20%',   icon: <DollarSign className="w-5 h-5" />, desc: 'Cost of poor quality eliminated through defect prevention.' },
              { kpi: 'Sigma Level',          target: '≥4.5σ', icon: <Target className="w-5 h-5" />,    desc: 'Process capability demonstrating near-zero defect performance.' },
              { kpi: 'Team Engagement',     target: '100%',   icon: <Users className="w-5 h-5" />,     desc: 'Every employee in at least one improvement cycle per year.' },
              { kpi: 'BPMN Coverage',       target: '100%',   icon: <Layers className="w-5 h-5" />,    desc: 'All core processes documented and governed in BPMN 2.0.' },
              { kpi: 'Safety Incidents',    target: 'Zero',   icon: <ShieldCheck className="w-5 h-5" />, desc: 'Lost-time incidents eliminated through embedded safety systems.' },
            ].map((m, i) => (
              <motion.div
                key={m.kpi}
                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.07, duration: 0.5 }}
                className="bg-white border border-slate-100 rounded-2xl p-6 hover:border-brand-blue/20 hover:shadow-lg transition-all group"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-brand-blue/10 flex items-center justify-center text-brand-blue group-hover:bg-brand-navy group-hover:text-white transition-colors">
                    {m.icon}
                  </div>
                  <span className="text-2xl font-bold text-brand-navy">{m.target}</span>
                </div>
                <h3 className="font-bold text-brand-navy text-sm mb-2">{m.kpi}</h3>
                <p className="text-slate-500 text-xs leading-relaxed">{m.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3-Day Timeline Overview ───────────────────────────────────────── */}
      <section className="py-20 bg-brand-navy overflow-hidden relative">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-blue/40 to-transparent" />
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #fff 1px, transparent 0)', backgroundSize: '40px 40px' }} />

        <div className="relative z-10 max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <motion.p
              initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="text-brand-accent font-bold uppercase tracking-widest text-sm mb-3"
            >
              Program Structure
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-display text-white"
            >
              3 Days. 6 Topics. Lasting Results.
            </motion.h2>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {[
              {
                day: 'Day 1', title: 'Building the Foundation',
                color: 'from-blue-600 to-blue-400', glow: 'shadow-blue-500/30',
                bullets: ['Continuous Improvement Framework', 'Unseen Shifts in Data for Decisions'],
              },
              {
                day: 'Day 2', title: 'Strategy & Financial Leadership',
                color: 'from-violet-600 to-violet-400', glow: 'shadow-violet-500/30',
                bullets: ['Strategy Deployment Success', 'Business Finance for Operations Leaders'],
              },
              {
                day: 'Day 3', title: 'Driving Sustainability',
                color: 'from-emerald-600 to-emerald-400', glow: 'shadow-emerald-500/30',
                bullets: ['Lean Six Sigma', 'ESG for Sustainability'],
              },
            ].map((card, i) => (
              <motion.div
                key={card.day}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.6 }}
                className="relative group"
              >
                {i < 2 && (
                  <div className="hidden md:block absolute top-8 left-[calc(100%+0px)] w-full h-px z-0">
                    <motion.div
                      initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }}
                      transition={{ delay: 0.6 + i * 0.15, duration: 0.7 }}
                      className="w-full h-full bg-gradient-to-r from-brand-blue/60 to-brand-accent/60 origin-left"
                    />
                  </div>
                )}
                <div className="bg-white/5 border border-white/10 rounded-3xl p-8 h-full hover:bg-white/10 hover:border-white/20 transition-all">
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${card.color} flex items-center justify-center text-white font-bold mb-5 shadow-lg ${card.glow}`}>
                    {i + 1}
                  </div>
                  <p className="text-xs font-bold text-brand-accent uppercase tracking-widest mb-1">{card.day}</p>
                  <h3 className="text-xl font-bold text-white mb-5">{card.title}</h3>
                  <ul className="space-y-3">
                    {card.bullets.map(b => (
                      <li key={b} className="flex items-start gap-2.5 text-slate-400 text-sm">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-accent shrink-0 mt-1.5" />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Day 1 ─────────────────────────────────────────────────────────── */}
      <DaySection
        day={1} label="Day 1" title="Building the Foundation"
        color="from-blue-600 to-blue-400"
        topics={[
          {
            icon: <RefreshCw className="w-6 h-6" />,
            title: 'Continuous Improvement Framework',
            body: 'Understand how to build a culture of ongoing improvement using Kaizen principles and Lean methodologies. Participants learn how small operational improvements can produce significant gains in efficiency and quality.',
          },
          {
            icon: <BarChart3 className="w-6 h-6" />,
            title: 'Unseen Shifts in Data for Decisions',
            body: 'Discover how hidden patterns in operational data can reveal cost savings, growth opportunities, and performance gaps. Participants learn data interpretation and visualization techniques that support smarter operational decisions.',
          },
        ]}
      />

      {/* ── Day 2 ─────────────────────────────────────────────────────────── */}
      <DaySection
        day={2} label="Day 2" title="Strategy and Financial Leadership"
        color="from-violet-600 to-violet-400"
        flip
        topics={[
          {
            icon: <Target className="w-6 h-6" />,
            title: 'Strategy Deployment Success',
            body: 'Learn how to align day-to-day operations with long-term strategic goals. Participants will learn how to cascade strategic objectives across departments and track execution using tools like Hoshin Kanri.',
          },
          {
            icon: <DollarSign className="w-6 h-6" />,
            title: 'Business Finance for Operations Leaders',
            body: 'Gain financial literacy for operational roles and learn to influence decisions at the executive level.',
            bullets: ['Budgeting and cost control', 'ROI analysis', 'Operational financial metrics'],
          },
        ]}
      />

      {/* ── Day 3 ─────────────────────────────────────────────────────────── */}
      <DaySection
        day={3} label="Day 3" title="Driving Sustainability and Efficiency"
        color="from-emerald-600 to-emerald-400"
        topics={[
          {
            icon: <Layers className="w-6 h-6" />,
            title: 'Lean Six Sigma',
            body: 'Learn how Lean Six Sigma helps eliminate waste, improve quality, and accelerate operational processes. Participants are introduced to the DMAIC improvement methodology.',
          },
          {
            icon: <Leaf className="w-6 h-6" />,
            title: 'ESG for Sustainability',
            body: 'Understand Environmental, Safety, and Governance (ESG) frameworks and how integrating sustainability into operations improves compliance, reputation, and stakeholder trust.',
          },
        ]}
      />

      {/* ── Social Proof ──────────────────────────────────────────────────── */}
      <section className="py-24 bg-brand-navy overflow-hidden relative">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-blue/40 to-transparent" />
        <div className="relative z-10 max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <motion.p
              initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="text-brand-accent font-bold uppercase tracking-widest text-sm mb-3"
            >
              Who This Is For
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-display text-white max-w-2xl mx-auto"
            >
              Designed for Professionals Responsible for Performance
            </motion.h2>
          </div>

          {/* Audience cards */}
          <div className="flex flex-wrap justify-center gap-4 mb-16">
            {AUDIENCE.map((a, i) => (
              <motion.div
                key={a.label}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-2xl px-6 py-4 hover:bg-white/10 transition-all"
              >
                <div className="w-9 h-9 rounded-xl bg-brand-blue/20 flex items-center justify-center text-brand-accent">
                  {a.icon}
                </div>
                <span className="text-white font-medium">{a.label}</span>
              </motion.div>
            ))}
          </div>

          {/* Framework trust badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-center"
          >
            <p className="text-slate-500 text-sm uppercase tracking-widest font-bold mb-5">
              Trusted frameworks used by leading organizations
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {FRAMEWORKS.map(f => (
                <span key={f} className="px-5 py-2.5 rounded-full bg-white/5 border border-white/10 text-white text-sm font-semibold flex items-center gap-2">
                  <span className="text-brand-accent">✓</span> {f}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Final Registration ─────────────────────────────────────────────── */}
      <section ref={finalRef} className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative bg-brand-navy rounded-[3rem] overflow-hidden"
          >
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-0 left-1/4 w-80 h-80 bg-brand-blue/20 rounded-full blur-[70px]" />
              <div className="absolute bottom-0 right-1/4 w-60 h-60 bg-brand-accent/15 rounded-full blur-[60px]" />
            </div>

            <div className="relative z-10 px-10 py-16 md:px-16 md:py-20 text-center">
              <motion.span
                initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                className="inline-block px-4 py-1.5 rounded-full bg-brand-blue/20 border border-brand-blue/30 text-brand-accent text-xs font-bold uppercase tracking-widest mb-6"
              >
                Join the Program
              </motion.span>

              <h2 className="text-4xl md:text-5xl font-display text-white mb-5 leading-tight">
                Join the Operations{' '}
                <span className="italic text-brand-accent">Excellence Program</span>
              </h2>
              <p className="text-lg text-white/65 mb-8 max-w-2xl mx-auto leading-relaxed">
                This 3-day intensive program equips professionals with the frameworks used by
                leading organizations to improve operational performance, financial discipline,
                and sustainable growth.
              </p>

              {/* Summary pills */}
              <div className="flex flex-wrap justify-center gap-3 mb-10">
                {[
                  { icon: <Calendar className="w-4 h-4" />, text: '3 Days' },
                  { icon: <Users className="w-4 h-4" />,    text: 'Online Training' },
                  { icon: <CheckCircle className="w-4 h-4" />, text: 'Certificate of Completion' },
                ].map(p => (
                  <span key={p.text} className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white text-sm font-semibold">
                    {p.icon} {p.text}
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap justify-center gap-4">
                <motion.button
                  whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                  onClick={() => openModal('BE Training — Register for Training')}
                  className="bg-brand-blue hover:bg-brand-accent text-white px-10 py-5 rounded-2xl font-bold text-xl transition-all shadow-2xl shadow-brand-blue/40 flex items-center gap-2 group"
                >
                  Register for the Training Program
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </motion.button>
                <motion.a
                  whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                  href="/BCIE-2026-Full-Course-Calendar.pdf"
                  download="BCIE-2026-Program-Outline.pdf"
                  className="bg-white/10 hover:bg-white/18 border border-white/20 text-white px-10 py-5 rounded-2xl font-bold text-xl transition-all flex items-center gap-2"
                >
                  <Download className="w-5 h-5" /> Download Program Outline
                </motion.a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <LeadCaptureModal
        isOpen={modal.open}
        onClose={() => setModal(s => ({ ...s, open: false }))}
        source={modal.source}
        heading="Register for the Program"
        subheading="3-Day Operations Excellence Training — online, certificate included"
      />
    </main>
  );
};

export default BusinessExcellenceTrainingPage;
