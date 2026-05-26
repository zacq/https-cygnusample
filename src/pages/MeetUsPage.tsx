import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight, TrendingUp, Wrench, RefreshCw } from 'lucide-react';
import LeadCaptureModal from '../components/LeadCaptureModal';

const industries = [
  'Warehouses', 'Retail', 'Manufacturing', 'Horticulture',
  'Food', 'Construction', 'Healthcare', 'Logistics',
];

const pillars = [
  {
    icon: TrendingUp,
    title: 'Business Money Operations',
    body: 'Optimizing cash flow and setting up finance structures to close cash leakages.',
  },
  {
    icon: Wrench,
    title: 'Operations Improvement & Excellence',
    body: 'Building from basics — process flow, waste reduction, value stream and productivity, workplace organization.',
  },
  {
    icon: RefreshCw,
    title: 'Continuous Improvement Practice',
    body: 'Change is people driven. Empowering them is real improvement. Low investment for you — we capacity build your team with Continuous Professional programs on Operations Improvement & Excellence.',
  },
];

const MeetUsPage: React.FC = () => {
  const [modalOpen, setModalOpen] = React.useState(false);

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="font-sans">

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="relative pt-16 pb-24 bg-brand-navy overflow-hidden">
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] rounded-full bg-brand-blue/10 blur-[120px] pointer-events-none" />
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #fff 1px, transparent 0)', backgroundSize: '40px 40px' }}
        />

        <div className="relative z-10 max-w-5xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <p className="text-brand-accent font-bold uppercase tracking-widest text-xs mb-4">
                Can we work together?
              </p>
              <h1 className="text-6xl md:text-7xl font-display text-white leading-none mb-6">
                Reclaim
              </h1>
              <p className="text-lg text-slate-300 leading-relaxed mb-8">
                I did very well in finance management for corporates — over 12 years.
                Now I work with other professionals helping organizations{' '}
                <strong className="text-white">RECLAIM</strong> potential from their operations
                (Finance Operations, Operations Improvement &amp; Excellence).
              </p>
              <button
                onClick={() => setModalOpen(true)}
                className="inline-flex items-center gap-2 bg-brand-blue hover:bg-brand-accent text-white px-8 py-4 rounded-xl font-bold text-base transition-all shadow-xl group"
              >
                Let's Connect
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>

            {/* CEO portrait */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.7 }}
              className="flex justify-center"
            >
              <img
                src="/images/ceo-portrait (1).jpeg"
                alt="CEO, Cygnus Consulting"
                className="w-72 h-96 object-cover object-top rounded-3xl shadow-2xl border-4 border-brand-blue/20"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Philosophy ────────────────────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="space-y-6"
          >
            <p className="text-brand-blue font-bold uppercase tracking-widest text-xs">
              The philosophy
            </p>
            <p className="text-2xl md:text-3xl font-display text-brand-navy leading-snug">
              Business Owners and Decision makers — welcome for dialogue.
            </p>
            <p className="text-lg text-slate-600 leading-relaxed">
              Might be the missing link you have been waiting for much longer.
              <span className="text-slate-400 text-sm ml-2">(I target 3–4 every week)</span>
            </p>
            <p className="text-lg text-slate-600 leading-relaxed">
              Not about disconnected tools — but real Operations Improvement and Excellence.
            </p>
            <div className="pt-4 border-t border-slate-100">
              <p className="text-sm text-slate-500 uppercase tracking-widest mb-2">Real intersection of</p>
              <p className="text-2xl font-display font-bold text-brand-navy">
                Business Money{' '}
                <span className="text-brand-blue">&amp;</span>{' '}
                Business Excellence
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Team Photo ────────────────────────────────────────────────────── */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <img
              src="/images/team photo.jpeg"
              alt="Cygnus Consulting team"
              className="w-full rounded-3xl shadow-xl"
            />
            <p className="text-center text-sm text-slate-400 mt-4">
              The Cygnus Consulting team — practitioners first.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Core Pillars ──────────────────────────────────────────────────── */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-5xl mx-auto px-6">
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-brand-blue font-bold uppercase tracking-widest text-xs mb-10 text-center"
          >
            What I bring
          </motion.p>
          <div className="grid md:grid-cols-3 gap-6">
            {pillars.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm"
              >
                <div className="w-11 h-11 bg-brand-blue/10 rounded-xl flex items-center justify-center text-brand-blue mb-5">
                  <p.icon className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-brand-navy mb-3">{p.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{p.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Industries ────────────────────────────────────────────────────── */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-brand-blue font-bold uppercase tracking-widest text-xs mb-6">
              Industries I serve
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {industries.map(ind => (
                <span
                  key={ind}
                  className="px-4 py-2 rounded-full bg-slate-50 border border-slate-200 text-slate-700 text-sm font-medium"
                >
                  {ind}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────────────── */}
      <section className="py-20 bg-brand-navy">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h2 className="text-4xl font-display text-white">
              Let's have a real conversation.
            </h2>
            <p className="text-slate-400 text-lg leading-relaxed">
              One conversation can be the turning point. Reach out and let's explore what's possible.
            </p>
            <div className="flex flex-wrap justify-center gap-4 pt-2">
              <button
                onClick={() => setModalOpen(true)}
                className="inline-flex items-center gap-2 bg-brand-blue hover:bg-brand-accent text-white px-8 py-4 rounded-xl font-bold transition-all shadow-xl group"
              >
                Let's Connect
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <Link
                to="/training/nca"
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white px-8 py-4 rounded-xl font-bold transition-all"
              >
                Check Our Timetable
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <LeadCaptureModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        source="Meet Us Page"
        heading="Let's Connect"
        subheading="Tell us a bit about yourself and we'll be in touch shortly."
      />
    </main>
  );
};

export default MeetUsPage;
