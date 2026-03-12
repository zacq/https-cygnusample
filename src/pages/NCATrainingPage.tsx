import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X, Send, Loader2, CheckCircle, Award, Monitor, CreditCard,
  CalendarDays, Clock4, ChevronDown,
} from 'lucide-react';

// ─── Airtable config (reuses booking credentials) ────────────────────────────
const AIRTABLE_TOKEN = import.meta.env.VITE_BOOKING_AIRTABLE_TOKEN as string;
const LEADS_BASE     = import.meta.env.VITE_BOOKING_AIRTABLE_BASE as string;
const LEADS_TABLE    = import.meta.env.VITE_BOOKING_AIRTABLE_TABLE as string;

// ─── Data ─────────────────────────────────────────────────────────────────────
interface Session {
  id:    number;
  date:  string;
  time:  string;
  topic: string;
  cpd:   number;
}

const SESSIONS: Session[] = [
  { id: 1, date: '11 March 2026',  time: '9:00 AM – 4:00 PM', topic: 'Operational Excellence for Sustainable Constructions',    cpd: 5 },
  { id: 2, date: '25 March 2026',  time: '9:00 AM – 4:00 PM', topic: 'Safety as a Value in the Construction Industry',          cpd: 5 },
  { id: 3, date: '8 April 2026',   time: '9:00 AM – 4:00 PM', topic: 'Managing Construction Site Safety Using Risk Assessment',  cpd: 5 },
  { id: 4, date: '29 April 2026',  time: '9:00 AM – 4:00 PM', topic: 'Operational Excellence for Sustainable Constructions',    cpd: 5 },
  { id: 5, date: '13 May 2026',    time: '9:00 AM – 4:00 PM', topic: 'Safety as a Value in the Construction Industry',          cpd: 5 },
  { id: 6, date: '29 May 2026',    time: '9:00 AM – 4:00 PM', topic: 'Managing Construction Site Safety Using Risk Assessment',  cpd: 5 },
  { id: 7, date: '17 June 2026',   time: '9:00 AM – 4:00 PM', topic: 'Operational Excellence for Sustainable Constructions',    cpd: 5 },
  { id: 8, date: '30 June 2026',   time: '9:00 AM – 4:00 PM', topic: 'Safety as a Value in the Construction Industry',          cpd: 5 },
];

// ─── Registration Modal ───────────────────────────────────────────────────────
interface RegistrationModalProps {
  session:  Session | null;
  onClose:  () => void;
}

const initialForm = { fullName: '', email: '', phone: '', company: '' };

const RegistrationModal: React.FC<RegistrationModalProps> = ({ session, onClose }) => {
  const [form,   setForm]   = useState(initialForm);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errMsg, setErrMsg] = useState('');

  const isOpen = session !== null;

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      const t = setTimeout(() => { setStatus('idle'); setForm(initialForm); setErrMsg(''); }, 350);
      return () => clearTimeout(t);
    }
  }, [isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session) return;
    setStatus('loading');
    setErrMsg('');

    try {
      const res = await fetch(`https://api.airtable.com/v0/${LEADS_BASE}/${LEADS_TABLE}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${AIRTABLE_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fields: {
            Name:             form.fullName,
            Email:            form.email,
            Phone:            form.phone,
            Company:          form.company,
            'Preferred Date': session.date,
            'Preferred Time': session.time,
            Status:           'New',
            Source:           'NCA Training Registration',
          },
        }),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err?.error?.message || 'Submission failed');
      }
      setStatus('success');
    } catch (err: unknown) {
      setStatus('error');
      setErrMsg(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            key="modal"
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 20 }}
            transition={{ type: 'spring', damping: 28, stiffness: 300 }}
            className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden"
            onClick={e => e.stopPropagation()}
          >
            <div className="h-1.5 bg-gradient-to-r from-brand-navy via-brand-blue to-brand-accent" />

            <button
              onClick={onClose}
              aria-label="Close"
              className="absolute top-5 right-5 z-10 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 transition-all"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="p-8">
              {status === 'success' ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center py-10 text-center"
                >
                  <div className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center mb-5">
                    <CheckCircle className="w-10 h-10 text-emerald-500" />
                  </div>
                  <h2 className="text-2xl font-display font-bold text-brand-navy mb-3">
                    Registration Received!
                  </h2>
                  <p className="text-slate-500 mb-6 max-w-xs">
                    You're registered for <span className="font-semibold text-brand-navy">{session?.date}</span>.
                    Complete payment to confirm your spot.
                  </p>
                  <div className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-5 text-left space-y-2">
                    <p className="text-sm font-bold text-brand-navy mb-3">Payment Instructions</p>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500">Paybill Number</span>
                      <span className="font-bold text-slate-800">453521</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500">Account No.</span>
                      <span className="font-bold text-slate-800">Your Company Name</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500">Amount</span>
                      <span className="font-bold text-slate-800">KES 4,000</span>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <>
                  {/* Header */}
                  <div className="mb-6">
                    <h2 className="text-xl font-display font-bold text-brand-navy mb-1">
                      Register for Session
                    </h2>
                    {session && (
                      <div className="bg-brand-blue/5 border border-brand-blue/20 rounded-xl px-4 py-3 mt-3">
                        <p className="text-xs font-bold text-brand-blue uppercase tracking-wider mb-1">Selected Session</p>
                        <p className="text-sm font-semibold text-brand-navy">{session.topic}</p>
                        <p className="text-xs text-slate-500 mt-0.5">{session.date} · {session.time} · 5 CPD pts</p>
                      </div>
                    )}
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="text-sm font-semibold text-slate-700 mb-1.5 block">Full Name *</label>
                      <input
                        required type="text" name="fullName" placeholder="John Doe"
                        value={form.fullName} onChange={handleChange}
                        className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-blue/40 focus:border-brand-blue transition-all"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-semibold text-slate-700 mb-1.5 block">Email *</label>
                        <input
                          required type="email" name="email" placeholder="you@company.com"
                          value={form.email} onChange={handleChange}
                          className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-blue/40 focus:border-brand-blue transition-all"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-semibold text-slate-700 mb-1.5 block">Phone *</label>
                        <input
                          required type="tel" name="phone" placeholder="+254 7XX XXX XXX"
                          value={form.phone} onChange={handleChange}
                          className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-blue/40 focus:border-brand-blue transition-all"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-semibold text-slate-700 mb-1.5 block">Company Name *</label>
                      <input
                        required type="text" name="company" placeholder="Your Company Ltd"
                        value={form.company} onChange={handleChange}
                        className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-blue/40 focus:border-brand-blue transition-all"
                      />
                    </div>

                    {status === 'error' && (
                      <p className="text-red-600 text-sm bg-red-50 border border-red-200 rounded-xl px-4 py-3">
                        ⚠️ {errMsg}
                      </p>
                    )}

                    <button
                      type="submit"
                      disabled={status === 'loading'}
                      className="w-full bg-[#79B56E] hover:bg-[#5a9a4f] disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl shadow-lg flex items-center justify-center gap-2 transition-all"
                    >
                      {status === 'loading'
                        ? <><Loader2 className="w-5 h-5 animate-spin" /> Registering...</>
                        : <><Send className="w-5 h-5" /> Confirm Registration</>
                      }
                    </button>

                    <p className="text-center text-xs text-slate-400">
                      Payment instructions will be shown after registration.
                    </p>
                  </form>
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// ─── Page ─────────────────────────────────────────────────────────────────────
const NCATrainingPage: React.FC = () => {
  const [selectedSession, setSelectedSession] = useState<Session | null>(null);
  const calendarRef = useRef<HTMLDivElement>(null);

  const scrollToCalendar = () =>
    calendarRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });

  return (
    <main>
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative pt-32 pb-24 bg-brand-navy overflow-hidden">
        <div className="absolute top-0 left-1/3 w-[600px] h-[600px] rounded-full bg-brand-blue/10 blur-[120px] pointer-events-none" />
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #fff 1px, transparent 0)', backgroundSize: '40px 40px' }} />

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-blue/20 border border-brand-blue/40 text-brand-accent text-xs font-bold uppercase tracking-widest mb-6"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-brand-accent animate-pulse" />
            NCA Accredited Training
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.7 }}
            className="text-5xl md:text-6xl font-display text-white leading-tight mb-4"
          >
            A Full Day{' '}
            <span className="italic text-brand-accent">Webinar</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.28, duration: 0.7 }}
            className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto mb-10 leading-relaxed"
          >
            Innovatively integrating the National Building Code-2024 into the current
            technological construction and infrastructure landscape
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <button
              onClick={() => setSelectedSession(SESSIONS[0])}
              className="bg-[#79B56E] hover:bg-[#5a9a4f] text-white px-9 py-4 rounded-xl font-bold text-lg transition-all shadow-xl"
            >
              Register Now
            </button>
            <button
              onClick={scrollToCalendar}
              className="bg-white/10 hover:bg-white/20 border border-white/20 text-white px-9 py-4 rounded-xl font-bold text-lg transition-all"
            >
              View Calendar
            </button>
          </motion.div>

          {/* Quick stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.6 }}
            className="flex flex-wrap justify-center gap-8 mt-14 border-t border-white/10 pt-10"
          >
            {[
              { value: '5 CPD', label: 'Points per session' },
              { value: '2 Sessions', label: 'To reach 10 CPD' },
              { value: 'KES 4,000', label: 'Per training' },
              { value: '100% Online', label: 'Full-day webinar' },
            ].map((stat, i) => (
              <React.Fragment key={stat.label}>
                {i > 0 && <div className="w-px h-10 bg-white/10 hidden sm:block" />}
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                  <div className="text-sm text-slate-400">{stat.label}</div>
                </div>
              </React.Fragment>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Changes in Training Model ─────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-slate-50 border border-slate-200 rounded-3xl p-10 md:p-14"
          >
            <p className="text-xs font-bold uppercase tracking-widest text-red-500 mb-3">Important Notice</p>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-red-600 mb-6">
              Changes in Training Model
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed max-w-3xl">
              The NCA training model has been revised, and changes have been effected going forward.
              During this training period, we will adopt one of the models suggested by NCA:{' '}
              <strong className="text-brand-navy">a full-day webinar</strong>. This is a purely online,
              full-day session that earns you{' '}
              <strong className="text-brand-navy">5 CPD points</strong>. Hence, you will need to
              attend <strong className="text-brand-navy">two sessions</strong> in order to obtain the{' '}
              <strong className="text-brand-navy">10 CPD points</strong> required for license renewal.
            </p>
            <button
              onClick={scrollToCalendar}
              className="mt-8 inline-flex items-center gap-2 bg-brand-navy hover:bg-brand-blue text-white px-7 py-3.5 rounded-xl font-bold transition-all group"
            >
              View Calendar
              <ChevronDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* ── What You Gain + Details + Payment ────────────────────────────── */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-3 gap-6">
          {/* What You Will Gain */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm"
          >
            <div className="w-11 h-11 bg-brand-blue/10 rounded-xl flex items-center justify-center text-brand-blue mb-5">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-brand-navy mb-4">What You Will Gain</h3>
            <ul className="space-y-3 text-sm text-slate-600">
              {[
                '5 CPD points per training',
                'Enhanced contracting skills',
                'Certificate of attendance',
              ].map(item => (
                <li key={item} className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center shrink-0 mt-0.5">
                    <svg className="w-3 h-3 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Training Details */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm"
          >
            <div className="w-11 h-11 bg-brand-blue/10 rounded-xl flex items-center justify-center text-brand-blue mb-5">
              <Monitor className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-brand-navy mb-4">Training Details</h3>
            <ul className="space-y-3 text-sm">
              {[
                { label: 'Format',   value: 'Full-day webinar' },
                { label: 'Mode',     value: 'Online' },
                { label: 'Duration', value: '9:00 AM – 4:00 PM' },
                { label: 'Fee',      value: 'KES 4,000 per session' },
              ].map(({ label, value }) => (
                <li key={label} className="flex justify-between">
                  <span className="text-slate-500">{label}</span>
                  <span className="font-semibold text-slate-800">{value}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Payment Details */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm"
          >
            <div className="w-11 h-11 bg-brand-blue/10 rounded-xl flex items-center justify-center text-brand-blue mb-5">
              <CreditCard className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-brand-navy mb-4">Payment Details</h3>
            <ul className="space-y-3 text-sm">
              {[
                { label: 'Paybill',     value: '453521' },
                { label: 'Account No.', value: 'Company Name' },
                { label: 'Amount',      value: 'KES 4,000' },
              ].map(({ label, value }) => (
                <li key={label} className="flex justify-between">
                  <span className="text-slate-500">{label}</span>
                  <span className="font-semibold text-slate-800">{value}</span>
                </li>
              ))}
            </ul>
            <p className="text-xs text-slate-400 mt-5 leading-relaxed">
              Choose your preferred date from the calendar, then register and complete payment.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Training Calendar ─────────────────────────────────────────────── */}
      <section ref={calendarRef} id="nca-calendar" className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-brand-blue font-bold uppercase tracking-widest text-sm mb-3"
            >
              Upcoming Sessions
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-display text-brand-navy"
            >
              NCA Training Calendar — 2025/2026
            </motion.h2>
          </div>

          {/* Desktop table */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="hidden md:block rounded-2xl overflow-hidden border border-slate-200 shadow-sm"
          >
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#1B6EC2] text-white">
                  <th className="px-6 py-4 text-left font-bold uppercase tracking-wider text-xs">
                    <span className="flex items-center gap-2"><CalendarDays className="w-4 h-4" /> Date</span>
                  </th>
                  <th className="px-6 py-4 text-left font-bold uppercase tracking-wider text-xs">
                    <span className="flex items-center gap-2"><Clock4 className="w-4 h-4" /> Time</span>
                  </th>
                  <th className="px-6 py-4 text-left font-bold uppercase tracking-wider text-xs">Training Topic</th>
                  <th className="px-6 py-4 text-center font-bold uppercase tracking-wider text-xs">CPD</th>
                  <th className="px-6 py-4 text-center font-bold uppercase tracking-wider text-xs">Book</th>
                </tr>
              </thead>
              <tbody>
                {SESSIONS.map((session, i) => (
                  <tr
                    key={session.id}
                    className={`border-t border-slate-200 transition-colors hover:bg-brand-blue/5 ${
                      i % 2 === 0 ? 'bg-[#F5F5F5]' : 'bg-white'
                    }`}
                  >
                    <td className="px-6 py-4 font-semibold text-slate-800 whitespace-nowrap">{session.date}</td>
                    <td className="px-6 py-4 text-slate-600 whitespace-nowrap">{session.time}</td>
                    <td className="px-6 py-4 text-slate-700">{session.topic}</td>
                    <td className="px-6 py-4 text-center">
                      <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-brand-blue/10 text-brand-blue font-bold text-sm">
                        {session.cpd}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button
                        onClick={() => setSelectedSession(session)}
                        className="bg-[#79B56E] hover:bg-[#5a9a4f] text-white px-5 py-2 rounded-lg font-bold text-xs uppercase tracking-wide transition-all whitespace-nowrap shadow-sm hover:shadow-md"
                      >
                        Book Now
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>

          {/* Mobile cards */}
          <div className="md:hidden space-y-4">
            {SESSIONS.map((session, i) => (
              <motion.div
                key={session.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="bg-[#F5F5F5] border border-slate-200 rounded-2xl p-5"
              >
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div>
                    <p className="font-bold text-slate-800">{session.date}</p>
                    <p className="text-xs text-slate-500 mt-0.5">{session.time}</p>
                  </div>
                  <span className="shrink-0 w-10 h-10 rounded-full bg-brand-blue/10 flex items-center justify-center text-brand-blue font-bold text-sm">
                    {session.cpd}
                  </span>
                </div>
                <p className="text-sm text-slate-700 mb-4">{session.topic}</p>
                <button
                  onClick={() => setSelectedSession(session)}
                  className="w-full bg-[#79B56E] hover:bg-[#5a9a4f] text-white py-2.5 rounded-xl font-bold text-sm transition-all"
                >
                  Book Now
                </button>
              </motion.div>
            ))}
          </div>

          {/* Footer note */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center text-sm text-slate-400 mt-8"
          >
            Need to attend <strong className="text-slate-600">2 sessions</strong> for 10 CPD points required for license renewal.
          </motion.p>
        </div>
      </section>

      <RegistrationModal
        session={selectedSession}
        onClose={() => setSelectedSession(null)}
      />
    </main>
  );
};

export default NCATrainingPage;
