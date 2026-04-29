import React, { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowRight, ArrowLeft, BarChart3, Clock, FileText,
  CheckCircle2, AlertCircle, TrendingUp, Award,
} from 'lucide-react';

// ─── Data ─────────────────────────────────────────────────────────────────────
interface Question { id: string; area: string; question: string; options: string[] }

const QUESTIONS: Question[] = [
  { id: 'q1',  area: 'Process Visibility',      question: 'Do you have clearly documented workflows for your core operations?',                              options: ['No documentation at all', 'Informal, unwritten processes', 'Partially documented', 'Documented but not consistently used', 'Fully documented & actively followed'] },
  { id: 'q2',  area: 'Waste & Efficiency',       question: 'How often do delays, rework, or inefficiencies occur in your operations?',                       options: ['Constantly — a daily fire-fight', 'Frequently', 'Occasionally', 'Rarely', 'Almost never — operations run tight'] },
  { id: 'q3',  area: 'Financial Alignment',      question: 'Can you directly link your operational activities to cost and profitability?',                    options: ['No visibility whatsoever', 'Very limited visibility', 'Partial alignment only', 'Mostly clear connection', 'Fully integrated and measurable'] },
  { id: 'q4',  area: 'Performance Tracking',     question: 'Do you track operational KPIs — lead time, output volume, defect rate?',                         options: ['No tracking in place', 'Inconsistent, ad hoc tracking', 'Basic metrics only', 'Regular tracking with limited review', 'Structured KPIs reviewed consistently'] },
  { id: 'q5',  area: 'Continuous Improvement',   question: 'Does your team actively identify and act on process improvements?',                               options: ['Improvement is never discussed', 'Rarely and reactively', 'Occasionally', 'Regular improvement projects exist', 'A formal CI system is in place'] },
  { id: 'q6',  area: 'Leadership Systems',       question: 'How structured are your leadership routines — stand-ups, reviews, escalations?',                 options: ['No structured routines', 'Ad hoc and informal', 'Some structure exists', 'Mostly structured', 'Fully standardised and consistently followed'] },
  { id: 'q7',  area: 'Process Standardization',  question: 'How consistently are your core processes performed across teams and shifts?',                     options: ['Highly inconsistent — everyone does it differently', 'Mostly inconsistent', 'Partially standardised', 'Mostly standardised', 'Fully standardised across all teams'] },
  { id: 'q8',  area: 'Technology & Systems',     question: 'Do you use integrated systems — ERP, CRM, dashboards — to manage operations?',                   options: ['No systems — purely manual', 'Basic tools, not integrated', 'Some systems in partial use', 'Integrated across most areas', 'Fully integrated, data-driven operations'] },
  { id: 'q9',  area: 'Quality & Defects',        question: 'How often do errors or defects affect your output or customer experience?',                       options: ['Very frequently — serious quality issues', 'Frequently', 'Occasionally', 'Rarely', 'Almost never — quality is tightly controlled'] },
  { id: 'q10', area: 'Data-Driven Decisions',    question: 'How often are operational decisions based on data rather than intuition?',                        options: ['Rarely — mostly gut feel', 'Occasionally', 'Sometimes', 'Frequently', 'Always — every decision is data-backed'] },
];

const SERVICE_MAP: Record<string, string> = {
  'Process Visibility':     'Lean Systems Implementation',
  'Waste & Efficiency':     'Kaizen Facilitation',
  'Financial Alignment':    'Management Systems Consulting',
  'Performance Tracking':   'Management Systems Consulting',
  'Continuous Improvement': 'Kaizen Facilitation',
  'Leadership Systems':     'Management Systems Consulting',
  'Process Standardization':'Lean 5S Methodology',
  'Technology & Systems':   'Management Systems Consulting',
  'Quality & Defects':      'Safety & CI Training',
  'Data-Driven Decisions':  'Management Systems Consulting',
};

// ─── Scoring ──────────────────────────────────────────────────────────────────
type Category = 'Critical' | 'Developing' | 'Progressing' | 'Advanced';
interface Results { totalScore: number; scorePercent: number; category: Category; weakAreas: string[] }

function computeResults(scores: Record<string, number>): Results {
  const totalScore = Object.values(scores).reduce((a, b) => a + b, 0);
  const scorePercent = Math.round((totalScore / 50) * 100);
  const category: Category = totalScore <= 19 ? 'Critical' : totalScore <= 29 ? 'Developing' : totalScore <= 39 ? 'Progressing' : 'Advanced';
  const weakAreas = Object.entries(scores)
    .sort(([, a], [, b]) => a - b)
    .slice(0, 3)
    .map(([id]) => QUESTIONS.find(q => q.id === id)?.area ?? id);
  return { totalScore, scorePercent, category, weakAreas };
}

const CAT: Record<Category, { ring: string; bg: string; text: string; badge: string; message: string }> = {
  Critical:    { ring: 'ring-red-200',    bg: 'bg-red-50',     text: 'text-red-600',    badge: 'bg-red-100 text-red-700 border-red-200',       message: 'Your operations have foundational gaps across multiple areas. Immediate structured intervention will prevent further revenue leakage.' },
  Developing:  { ring: 'ring-orange-200', bg: 'bg-orange-50',  text: 'text-orange-600', badge: 'bg-orange-100 text-orange-700 border-orange-200', message: 'Significant improvement opportunities exist. A targeted Lean program can unlock substantial efficiency gains within 90 days.' },
  Progressing: { ring: 'ring-amber-200',  bg: 'bg-amber-50',   text: 'text-amber-600',  badge: 'bg-amber-100 text-amber-700 border-amber-200',   message: "You're on the right track. Closing your identified gaps will deliver high-ROI improvements and competitive advantage." },
  Advanced:    { ring: 'ring-emerald-200',bg: 'bg-emerald-50', text: 'text-emerald-600',badge: 'bg-emerald-100 text-emerald-700 border-emerald-200', message: 'You have a strong operational foundation. The focus now is sustaining excellence and scaling your systems across the business.' },
};

const INDUSTRIES = ['Manufacturing', 'Construction', 'Logistics & Supply Chain', 'Healthcare', 'Financial Services', 'Agriculture', 'Education', 'Retail & Distribution', 'Other'];

// ─── Contact ──────────────────────────────────────────────────────────────────
interface ContactData { fullName: string; email: string; phone: string; company: string; industry: string }

// ─── Slide animation ──────────────────────────────────────────────────────────
const SLIDE = {
  enter: (d: number) => ({ x: d > 0 ? 72 : -72, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit:  (d: number) => ({ x: d > 0 ? -72 : 72, opacity: 0 }),
};
const SPRING = { duration: 0.38, ease: [0.32, 0.72, 0, 1] as const };

// ─── Component ────────────────────────────────────────────────────────────────
const DiagnosticPage: React.FC = () => {
  const [screen,   setScreen]   = useState(0);
  const [scores,   setScores]   = useState<Record<string, number>>({});
  const [selected, setSelected] = useState<number | null>(null);
  const [dir,      setDir]      = useState<1 | -1>(1);
  const [contact,  setContact]  = useState<ContactData>({ fullName: '', email: '', phone: '', company: '', industry: '' });
  const [results,  setResults]  = useState<Results | null>(null);
  const [busy,     setBusy]     = useState(false);

  const currentQ = screen >= 1 && screen <= 10 ? QUESTIONS[screen - 1] : null;

  const nav = useCallback((to: number, d: 1 | -1) => {
    setDir(d);
    const nextQ = QUESTIONS[to - 1];
    setSelected(nextQ ? (scores[nextQ.id] ?? null) : null);
    setScreen(to);
  }, [scores]);

  const handleNext = () => {
    if (selected === null || !currentQ) return;
    const next = { ...scores, [currentQ.id]: selected };
    setScores(next);
    if (screen === 10) { setDir(1); setSelected(null); setScreen(11); }
    else nav(screen + 1, 1);
  };

  const handleBack = () => {
    if (screen === 1) { setDir(-1); setScreen(0); }
    else if (screen === 11) nav(10, -1);
    else nav(screen - 1, -1);
  };

  const handleSubmit = async () => {
    if (!contact.fullName || !contact.email || !contact.company || !contact.industry) return;
    setBusy(true);
    const res = computeResults(scores);
    setResults(res);
    const url = import.meta.env.VITE_DIAGNOSTIC_WEBHOOK_URL;
    if (url) {
      try {
        await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...contact, scores, ...res, submittedAt: new Date().toISOString(), pageUrl: window.location.href }),
        });
      } catch { /* non-blocking — show results regardless */ }
    }
    setBusy(false);
    setDir(1);
    setScreen(12);
  };

  const setField = (k: keyof ContactData, v: string) => setContact(p => ({ ...p, [k]: v }));
  const canSubmit = !busy && !!contact.fullName && !!contact.email && !!contact.company && !!contact.industry;

  return (
    <div className="min-h-[100dvh] bg-slate-50 overflow-x-hidden">

      {/* Slim progress bar — sits below fixed navbar (z-[49]) */}
      {screen >= 1 && screen <= 11 && (
        <div className="fixed top-0 left-0 right-0 z-[49] h-0.5 bg-slate-200">
          <motion.div
            className="h-full bg-brand-blue"
            initial={false}
            animate={{ width: `${(Math.min(screen, 10) / 10) * 100}%` }}
            transition={{ duration: 0.45, ease: [0.32, 0.72, 0, 1] }}
          />
        </div>
      )}

      <AnimatePresence mode="wait" custom={dir}>

        {/* ═══ INTRO ════════════════════════════════════════════════════════════ */}
        {screen === 0 && (
          <motion.div key="intro" custom={dir} variants={SLIDE} initial="enter" animate="center" exit="exit"
            transition={SPRING}
            className="min-h-[100dvh] bg-brand-navy flex items-center justify-center relative overflow-hidden"
          >
            {/* Dot texture */}
            <div className="absolute inset-0 opacity-[0.04] pointer-events-none"
              style={{ backgroundImage: 'radial-gradient(circle at 2px 2px,#fff 1px,transparent 0)', backgroundSize: '40px 40px' }} />
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-blue/40 to-transparent" />

            {/* Ambient glow orbs */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-blue/10 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-brand-accent/8 rounded-full blur-[80px] pointer-events-none" />

            <div className="relative z-10 max-w-2xl mx-auto px-6 py-28 text-center">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, ...SPRING }}
                className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-brand-blue/20 border border-brand-blue/30 mb-8"
              >
                <BarChart3 className="w-4 h-4 text-brand-accent" />
                <span className="text-brand-accent text-xs font-bold uppercase tracking-[0.14em]">Free Operational Diagnostic</span>
              </motion.div>

              <motion.h1 initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.18, ...SPRING }}
                className="text-4xl md:text-6xl font-display text-white mb-6 leading-tight"
              >
                Is your business running at its{' '}
                <span className="italic text-brand-accent">true potential?</span>
              </motion.h1>

              <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.28, ...SPRING }}
                className="text-xl text-slate-400 mb-10 leading-relaxed max-w-lg mx-auto"
              >
                Answer 10 questions. Get a free personalized operational maturity score — and a clear picture of where to focus first.
              </motion.p>

              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.38, ...SPRING }}
                className="flex flex-wrap items-center justify-center gap-8 mb-12"
              >
                {[
                  { icon: <Clock className="w-4 h-4" />, label: '≈ 3 minutes' },
                  { icon: <FileText className="w-4 h-4" />, label: '10 questions' },
                  { icon: <CheckCircle2 className="w-4 h-4" />, label: 'Free report' },
                ].map(({ icon, label }) => (
                  <div key={label} className="flex items-center gap-2 text-slate-400 text-sm">
                    <span className="text-brand-accent">{icon}</span>
                    {label}
                  </div>
                ))}
              </motion.div>

              {/* Double-bezel CTA — outer shell + inner core */}
              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.48, ...SPRING }}
                className="inline-flex p-1.5 rounded-[1.25rem] bg-white/5 ring-1 ring-white/10"
              >
                <button
                  onClick={() => { setDir(1); setSelected(null); setScreen(1); }}
                  className="bg-brand-blue hover:bg-brand-accent active:scale-[0.98] text-white px-10 py-4 rounded-[0.875rem] font-bold text-lg flex items-center gap-3 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] shadow-[0_8px_32px_rgba(27,110,194,0.45)] hover:shadow-[0_12px_40px_rgba(14,165,214,0.5)]"
                >
                  Start the Diagnostic
                  {/* Button-in-button icon */}
                  <span className="w-8 h-8 rounded-full bg-white/15 flex items-center justify-center">
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </button>
              </motion.div>

              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.62 }}
                className="mt-8 text-slate-500 text-sm"
              >
                <Link to="/" className="hover:text-slate-300 transition-colors">← Back to Cygnus home</Link>
              </motion.p>
            </div>
          </motion.div>
        )}

        {/* ═══ QUESTIONS 1–10 ═══════════════════════════════════════════════════ */}
        {screen >= 1 && screen <= 10 && currentQ && (
          <motion.div key={`q${screen}`} custom={dir} variants={SLIDE} initial="enter" animate="center" exit="exit"
            transition={SPRING}
            className="min-h-[100dvh] flex flex-col justify-center pt-24 pb-14 px-6"
          >
            <div className="max-w-xl mx-auto w-full">

              {/* Meta row */}
              <div className="flex items-center justify-between mb-8">
                <span className="text-xs font-bold text-brand-blue uppercase tracking-[0.14em]">{currentQ.area}</span>
                <span className="text-xs text-slate-400 font-medium tabular-nums">{screen} / 10</span>
              </div>

              <h2 className="text-2xl md:text-3xl font-bold text-brand-navy mb-9 leading-snug">
                {currentQ.question}
              </h2>

              {/* Option cards — staggered reveal */}
              <div className="space-y-3 mb-10">
                {currentQ.options.map((opt, idx) => {
                  const val = idx + 1;
                  const isSelected = selected === val;
                  return (
                    <motion.button
                      key={idx}
                      initial={{ opacity: 0, x: 16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.06, duration: 0.32, ease: [0.32, 0.72, 0, 1] }}
                      onClick={() => setSelected(val)}
                      className={`w-full text-left px-5 py-4 rounded-2xl border-2 flex items-center gap-4 transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] group active:scale-[0.99] ${
                        isSelected
                          ? 'border-brand-blue bg-brand-blue/5 shadow-[0_4px_20px_rgba(27,110,194,0.10)]'
                          : 'border-slate-200 bg-white hover:border-brand-blue/40 hover:shadow-[0_2px_12px_rgba(27,110,194,0.06)]'
                      }`}
                    >
                      <span className={`w-8 h-8 rounded-full border-2 shrink-0 flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                        isSelected ? 'border-brand-blue bg-brand-blue text-white' : 'border-slate-300 text-slate-400'
                      }`}>{val}</span>
                      <span className={`font-medium text-sm leading-snug transition-colors duration-200 ${
                        isSelected ? 'text-brand-navy' : 'text-slate-600 group-hover:text-slate-800'
                      }`}>{opt}</span>
                    </motion.button>
                  );
                })}
              </div>

              <div className="flex items-center justify-between">
                <button onClick={handleBack}
                  className="flex items-center gap-2 text-slate-400 hover:text-brand-navy font-medium text-sm transition-colors duration-200"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back
                </button>
                <button onClick={handleNext} disabled={selected === null}
                  className="bg-brand-navy hover:bg-brand-blue disabled:opacity-30 disabled:cursor-not-allowed active:scale-[0.98] text-white px-8 py-3 rounded-xl font-bold text-sm flex items-center gap-2 transition-all duration-400 ease-[cubic-bezier(0.32,0.72,0,1)] shadow-[0_4px_16px_rgba(13,31,53,0.18)] hover:shadow-[0_6px_24px_rgba(27,110,194,0.22)]"
                >
                  {screen === 10 ? 'Get My Results' : 'Next'}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* ═══ CONTACT ══════════════════════════════════════════════════════════ */}
        {screen === 11 && (
          <motion.div key="contact" custom={dir} variants={SLIDE} initial="enter" animate="center" exit="exit"
            transition={SPRING}
            className="min-h-[100dvh] flex flex-col justify-center pt-24 pb-14 px-6"
          >
            <div className="max-w-md mx-auto w-full">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05, ...SPRING }}>
                <p className="text-brand-blue font-bold text-xs uppercase tracking-[0.14em] mb-3">Almost there</p>
                <h2 className="text-3xl font-display text-brand-navy mb-2 leading-tight">Get your personalized report</h2>
                <p className="text-slate-500 text-sm mb-8 leading-relaxed">We'll show your results instantly and email you a full copy.</p>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12, ...SPRING }}
                className="space-y-4"
              >
                {([
                  { key: 'fullName' as const, label: 'Full Name',       type: 'text',  placeholder: 'Jane Mwangi',       required: true  },
                  { key: 'email'    as const, label: 'Work Email',       type: 'email', placeholder: 'jane@company.com',  required: true  },
                  { key: 'phone'    as const, label: 'Phone (optional)', type: 'tel',   placeholder: '+254 700 000 000',  required: false },
                  { key: 'company'  as const, label: 'Company Name',     type: 'text',  placeholder: 'Your company',      required: true  },
                ]).map(f => (
                  <div key={f.key}>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">{f.label}</label>
                    <input
                      type={f.type}
                      placeholder={f.placeholder}
                      value={contact[f.key]}
                      onChange={e => setField(f.key, e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-brand-blue focus:outline-none text-sm text-slate-800 placeholder-slate-400 transition-colors duration-200 bg-white"
                    />
                  </div>
                ))}

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Industry</label>
                  <select
                    value={contact.industry}
                    onChange={e => setField('industry', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-brand-blue focus:outline-none text-sm text-slate-800 transition-colors duration-200 bg-white"
                  >
                    <option value="">Select your industry</option>
                    {INDUSTRIES.map(i => <option key={i} value={i}>{i}</option>)}
                  </select>
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.22 }}
                className="flex items-center justify-between mt-8"
              >
                <button onClick={handleBack}
                  className="flex items-center gap-2 text-slate-400 hover:text-brand-navy font-medium text-sm transition-colors duration-200"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back
                </button>
                <button onClick={handleSubmit} disabled={!canSubmit}
                  className="bg-brand-blue hover:bg-brand-navy disabled:opacity-30 disabled:cursor-not-allowed active:scale-[0.98] text-white px-8 py-3.5 rounded-xl font-bold text-sm flex items-center gap-2 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] shadow-[0_6px_24px_rgba(27,110,194,0.28)] hover:shadow-[0_8px_32px_rgba(13,31,53,0.25)]"
                >
                  {busy ? 'Processing…' : 'See My Results'}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </motion.div>

              <p className="text-xs text-slate-400 mt-4 text-center">No spam. A Cygnus consultant may follow up with you.</p>
            </div>
          </motion.div>
        )}

        {/* ═══ RESULTS ══════════════════════════════════════════════════════════ */}
        {screen === 12 && results && (() => {
          const cfg = CAT[results.category];
          return (
            <motion.div key="results" custom={dir} variants={SLIDE} initial="enter" animate="center" exit="exit"
              transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
              className="min-h-[100dvh] pt-28 pb-20 px-6 bg-slate-50"
            >
              <div className="max-w-2xl mx-auto">

                {/* Score card — double-bezel */}
                <motion.div initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08, duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
                  className="text-center mb-12"
                >
                  <p className="text-brand-blue font-bold text-xs uppercase tracking-[0.14em] mb-8">Your Diagnostic Results</p>

                  {/* Double-bezel score circle */}
                  <div className={`inline-flex p-3 rounded-full ${cfg.bg} ring-8 ${cfg.ring} mb-5`}>
                    <div className={`w-28 h-28 rounded-full flex flex-col items-center justify-center ${cfg.bg}`}>
                      <span className={`text-4xl font-bold tabular-nums ${cfg.text}`}>{results.scorePercent}%</span>
                      <span className="text-xs text-slate-500 font-medium">{results.totalScore} / 50</span>
                    </div>
                  </div>

                  <div className="mb-5">
                    <span className={`inline-flex px-5 py-1.5 rounded-full text-sm font-bold uppercase tracking-wider border ${cfg.badge}`}>
                      {results.category}
                    </span>
                  </div>

                  <h2 className="text-2xl md:text-3xl font-display text-brand-navy mb-3">
                    {contact.company ? `${contact.company}'s` : 'Your'} Operational Maturity Report
                  </h2>
                  <p className="text-slate-500 leading-relaxed max-w-md mx-auto text-sm">{cfg.message}</p>
                </motion.div>

                {/* Priority areas — asymmetric [2fr 1fr 1fr] */}
                <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.22, duration: 0.55, ease: [0.32, 0.72, 0, 1] }}
                  className="mb-10"
                >
                  <h3 className="text-sm font-bold text-brand-navy mb-4 flex items-center gap-2 uppercase tracking-[0.1em]">
                    <AlertCircle className="w-4 h-4 text-orange-500 shrink-0" />
                    Priority Improvement Areas
                  </h3>

                  <div className="grid md:grid-cols-[2fr_1fr_1fr] gap-4">
                    {results.weakAreas.map((area, i) => (
                      <motion.div key={area}
                        initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.28 + i * 0.1, duration: 0.45, ease: [0.32, 0.72, 0, 1] }}
                        className={`rounded-2xl p-5 border transition-shadow duration-300 ${
                          i === 0
                            ? 'bg-white shadow-[0_4px_24px_rgba(13,31,53,0.07)] border-slate-200'
                            : 'bg-white/60 border-slate-100 hover:bg-white hover:shadow-[0_2px_12px_rgba(13,31,53,0.05)]'
                        }`}
                      >
                        <div className="flex items-center gap-2 mb-3">
                          <span className="w-5 h-5 rounded-full bg-orange-100 text-orange-600 text-[10px] font-bold flex items-center justify-center shrink-0">{i + 1}</span>
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Priority {i + 1}</span>
                        </div>
                        <p className="font-bold text-brand-navy text-sm mb-1.5">{area}</p>
                        <p className="text-[11px] text-slate-500 leading-snug">
                          Recommended: <span className="font-semibold text-brand-blue">{SERVICE_MAP[area]}</span>
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* CTA block */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.55, ease: [0.32, 0.72, 0, 1] }}
                  className="relative bg-brand-navy rounded-3xl overflow-hidden"
                >
                  <div className="absolute inset-0 opacity-[0.04] pointer-events-none"
                    style={{ backgroundImage: 'radial-gradient(circle at 2px 2px,#fff 1px,transparent 0)', backgroundSize: '40px 40px' }} />
                  <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-brand-blue/15 rounded-full blur-[80px] pointer-events-none" />

                  <div className="relative z-10 p-8 md:p-10 text-center">
                    <TrendingUp className="w-9 h-9 text-brand-accent mx-auto mb-4" />
                    <h3 className="text-2xl font-display text-white mb-3">Ready to close these gaps?</h3>
                    <p className="text-slate-400 text-sm mb-7 max-w-sm mx-auto leading-relaxed">
                      Book a free 30-minute strategy call. We'll walk through your results and outline a tailored improvement roadmap.
                    </p>
                    {/* Double-bezel button */}
                    <div className="inline-flex p-1.5 rounded-[1.25rem] bg-white/5 ring-1 ring-white/10">
                      <button
                        onClick={() => window.dispatchEvent(new CustomEvent('open-booking-modal'))}
                        className="bg-brand-blue hover:bg-brand-accent active:scale-[0.98] text-white px-9 py-3.5 rounded-[0.875rem] font-bold flex items-center gap-3 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] shadow-[0_8px_32px_rgba(27,110,194,0.4)] hover:shadow-[0_12px_40px_rgba(14,165,214,0.45)]"
                      >
                        Book a Free Strategy Call
                        <span className="w-7 h-7 rounded-full bg-white/15 flex items-center justify-center">
                          <ArrowRight className="w-4 h-4" />
                        </span>
                      </button>
                    </div>
                    <Link to="/" className="block mt-5 text-slate-500 hover:text-slate-300 text-sm transition-colors">
                      Return to Cygnus home
                    </Link>
                  </div>
                </motion.div>

              </div>
            </motion.div>
          );
        })()}

      </AnimatePresence>
    </div>
  );
};

export default DiagnosticPage;
