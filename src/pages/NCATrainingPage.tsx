import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';
import {
  Award, Monitor, CreditCard,
  CalendarDays, Clock4, ChevronDown,
} from 'lucide-react';
import LeadCaptureModal from '../components/LeadCaptureModal';

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

const PaymentInstructions = () => (
  <div className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-5 text-left space-y-2 mt-2">
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
);

// ─── Page ─────────────────────────────────────────────────────────────────────
const NCATrainingPage: React.FC = () => {
  const [selectedSession, setSelectedSession] = useState<Session | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const calendarRef = useRef<HTMLDivElement>(null);

  const scrollToCalendar = () =>
    calendarRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });

  const openSession = (session: Session) => {
    setSelectedSession(session);
    setModalOpen(true);
  };

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
              onClick={() => openSession(SESSIONS[0])}
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
                        onClick={() => openSession(session)}
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
                  onClick={() => openSession(session)}
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

      <LeadCaptureModal
        isOpen={modalOpen}
        onClose={() => { setModalOpen(false); setSelectedSession(null); }}
        source={selectedSession ? `NCA Training — ${selectedSession.topic}` : 'NCA Training'}
        courseDetail={selectedSession?.topic}
        heading="Register for Session"
        subheading={selectedSession ? `${selectedSession.date} · ${selectedSession.time} · 5 CPD points` : undefined}
        postSuccess={<PaymentInstructions />}
      />
    </main>
  );
};

export default NCATrainingPage;
