import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';
import {
  ArrowRight,
  ShieldCheck, Award, Globe, Building2, Truck,
  Wifi, Factory, Flame, Landmark, HardHat,
  Search, PenLine, Rocket, BadgeCheck, TrendingUp,
  CheckCircle2,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import LeadCaptureModal from '../components/LeadCaptureModal';


// ─── Page ─────────────────────────────────────────────────────────────────────

const ServicesPage: React.FC = () => {
  const [modal, setModal] = useState<{ open: boolean; source: string; courseDetail?: string }>({
    open: false, source: '',
  });
  const finalRef = useRef<HTMLDivElement>(null);

  const openModal = (source: string, courseDetail = '') =>
    setModal({ open: true, source, courseDetail });
  const scrollToFinal = () => finalRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });

  const CERTIFICATIONS = [
    { label: 'ISO 9001',       sub: 'Quality Management'     },
    { label: 'ISO 45001',      sub: 'OH&S Management'        },
    { label: 'ISO 14001',      sub: 'Environmental Mgmt'     },
    { label: 'Lean Six Sigma', sub: 'Process Excellence'     },
  ];

  const INDUSTRIES = [
    { icon: <Wifi className="w-6 h-6" />,      label: 'Telecommunications'        },
    { icon: <HardHat className="w-6 h-6" />,   label: 'Construction & Infrastructure' },
    { icon: <Factory className="w-6 h-6" />,   label: 'Manufacturing'             },
    { icon: <Flame className="w-6 h-6" />,     label: 'Oil & Gas'                 },
    { icon: <Truck className="w-6 h-6" />,     label: 'Transport & Logistics'     },
    { icon: <Landmark className="w-6 h-6" />,  label: 'Government Ministries'     },
  ];

  const FRAMEWORK = [
    { number: '01', icon: <Search className="w-5 h-5" />,    title: 'Assess',     desc: 'Evaluate operational risks, compliance gaps, and improvement opportunities.', color: 'from-blue-600 to-blue-400' },
    { number: '02', icon: <PenLine className="w-5 h-5" />,   title: 'Design',     desc: 'Develop management systems aligned with global standards.', color: 'from-violet-600 to-violet-400' },
    { number: '03', icon: <Rocket className="w-5 h-5" />,    title: 'Implement',  desc: 'Deploy operational frameworks and training programs.', color: 'from-brand-blue to-brand-accent' },
    { number: '04', icon: <BadgeCheck className="w-5 h-5" />,title: 'Certify',    desc: 'Prepare organizations for industry certifications.', color: 'from-amber-500 to-amber-400' },
    { number: '05', icon: <TrendingUp className="w-5 h-5" />,title: 'Improve',    desc: 'Continuously enhance operational performance.', color: 'from-emerald-600 to-emerald-400' },
  ];

  const SERVICES = [
    {
      title: 'Management System Consultation',
      desc: 'We help you design, document, and implement management systems — including ISO 9001, ISO 14001, and ISO 45001 — from system design through to certification.',
      image: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&q=80',
      tag: 'ISO Certified',
      bullets: ['ISO 9001 Quality Management', 'ISO 14001 Environmental', 'ISO 45001 OH&S'],
    },
    {
      title: 'Work at Height Training',
      desc: 'Complete safety access and rescue training for the telecommunications, construction, and oil & gas industries — keeping your team safe and legally compliant.',
      image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80',
      tag: 'Safety Certified',
      bullets: ['Harness use & anchor systems', 'Fall prevention protocols', 'Emergency rescue procedures'],
    },
    {
      title: 'Lead Auditor Training',
      desc: 'Advance your career with internationally recognized lead auditor certifications. Covering ISO 45001, ISO 9001, and ISO 14001 management systems.',
      image: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=800&q=80',
      tag: 'International Cert',
      bullets: ['ISO 45001 Lead Auditor', 'ISO 9001 Lead Auditor', 'ISO 14001 Lead Auditor'],
    },
    {
      title: 'Cygnus Safety Outsourcing',
      desc: 'Professional safety outsourcing services that allow organizations to meet compliance obligations without the overhead of additional full-time safety personnel.',
      image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80',
      tag: 'Outsourcing',
      bullets: ['Compliance management', 'Risk assessment & reporting', 'On-site safety oversight'],
    },
  ];

  const TRUST = [
    { icon: <Award className="w-6 h-6" />,       title: '15+ Years Experience',       desc: 'Decades of field-tested expertise across critical industries in East Africa and beyond.' },
    { icon: <ShieldCheck className="w-6 h-6" />,  title: 'ISO Implementation Specialists', desc: 'End-to-end support for ISO 9001, 14001, and 45001 management system design and certification.' },
    { icon: <BadgeCheck className="w-6 h-6" />,   title: 'Certified Training Providers',  desc: 'Internationally accredited training programs delivered by certified professionals.' },
    { icon: <Globe className="w-6 h-6" />,        title: 'Multi-Industry Expertise',    desc: 'Serving telecoms, construction, manufacturing, oil & gas, logistics, and government sectors.' },
    { icon: <Building2 className="w-6 h-6" />,    title: 'Compliance & Risk Reduction', desc: 'Proven track record helping organizations reduce incidents, pass audits, and maintain compliance.' },
  ];

  return (
    <main>
      {/* ── Authority Hero ────────────────────────────────────────────────── */}
      <section className="relative pt-32 pb-24 bg-brand-navy overflow-hidden">
        <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] rounded-full bg-brand-blue/10 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-brand-navy to-transparent pointer-events-none" />
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #fff 1px, transparent 0)', backgroundSize: '40px 40px' }} />

        <div className="relative z-10 max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.span
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-blue/20 border border-brand-blue/40 text-brand-accent text-xs font-bold uppercase tracking-widest mb-6"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-brand-accent animate-pulse" />
              Consulting & Training Services
            </motion.span>

            <h1 className="text-5xl md:text-6xl font-display text-white leading-[1.05] mb-6">
              15+ Years Building Safer,{' '}
              <span className="italic text-brand-accent">Smarter Operations</span>
            </h1>

            <p className="text-lg text-slate-300 mb-8 max-w-lg leading-relaxed">
              Cygnus Consulting provides specialized consulting and training across health & safety,
              environmental management, operational excellence, and compliance frameworks.
            </p>

            <ul className="space-y-3 mb-10">
              {[
                'ISO management system implementation',
                'Industry-certified training programs',
                'Operational safety outsourcing',
                'Compliance and risk management',
              ].map((pt, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + i * 0.08 }}
                  className="flex items-center gap-3 text-slate-300"
                >
                  <CheckCircle2 className="w-5 h-5 text-brand-accent shrink-0" />
                  {pt}
                </motion.li>
              ))}
            </ul>

            <motion.button
              whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
              onClick={() => openModal('Services — Free Consultation')}
              className="bg-brand-blue hover:bg-brand-accent text-white px-9 py-4 rounded-xl font-bold text-lg transition-all shadow-2xl shadow-brand-blue/30 flex items-center gap-2 group"
            >
              Request a Free Consultation
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </motion.div>

          {/* Right — image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="hidden lg:block relative"
          >
            <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=900&q=80"
                alt="Cygnus Consulting professionals"
                className="w-full h-[520px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/50 via-transparent to-transparent" />
            </div>
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -bottom-6 -left-8 bg-brand-navy border border-white/10 rounded-2xl px-6 py-5 shadow-2xl"
            >
              <div className="text-4xl font-bold text-white">15+</div>
              <div className="text-brand-accent text-sm font-semibold">Years of Experience</div>
            </motion.div>
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
              className="absolute -top-4 -right-4 bg-white rounded-2xl px-5 py-4 shadow-xl"
            >
              <div className="text-brand-navy font-bold text-sm">ISO Certified</div>
              <div className="text-slate-400 text-xs mt-0.5">9001 · 14001 · 45001</div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── Proof of Expertise ────────────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <motion.p
            initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-brand-blue font-bold uppercase tracking-widest text-sm mb-3"
          >
            Standards & Certifications
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl font-display text-brand-navy mb-4 max-w-2xl mx-auto"
          >
            Proven Experience Across Critical Safety and Operational Standards
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-500 mb-12 max-w-xl mx-auto"
          >
            Cygnus supports organizations in designing, implementing, and maintaining globally recognized management systems.
          </motion.p>

          <div className="flex flex-wrap justify-center gap-4">
            {CERTIFICATIONS.map((cert, i) => (
              <motion.div
                key={cert.label}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-brand-navy/5 border-2 border-brand-navy/10 rounded-2xl px-8 py-6 text-center hover:border-brand-blue/40 hover:bg-brand-blue/5 transition-all group"
              >
                <div className="text-xl font-bold text-brand-navy group-hover:text-brand-blue transition-colors mb-1">
                  {cert.label}
                </div>
                <div className="text-xs text-slate-500 font-medium">{cert.sub}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Industries Served ─────────────────────────────────────────────── */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <motion.p
              initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="text-brand-blue font-bold uppercase tracking-widest text-sm mb-3"
            >
              Our Reach
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl md:text-4xl font-display text-brand-navy"
            >
              Industries We Support
            </motion.h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-5 mb-10">
            {INDUSTRIES.map((ind, i) => (
              <motion.div
                key={ind.label}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm flex items-center gap-4 hover:shadow-lg hover:border-brand-blue/20 transition-all group"
              >
                <div className="w-11 h-11 rounded-xl bg-brand-blue/10 flex items-center justify-center text-brand-blue shrink-0 group-hover:bg-brand-navy group-hover:text-white transition-colors">
                  {ind.icon}
                </div>
                <span className="font-semibold text-slate-700 text-sm leading-snug">{ind.label}</span>
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <button
              onClick={() => openModal('Services — Free Consultation')}
              className="bg-brand-navy hover:bg-brand-blue text-white px-9 py-4 rounded-xl font-bold transition-all inline-flex items-center gap-2 group"
            >
              Request Free Consultation
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* ── Service Framework ─────────────────────────────────────────────── */}
      <section className="py-24 bg-brand-navy overflow-hidden relative">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-blue/40 to-transparent" />
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #fff 1px, transparent 0)', backgroundSize: '40px 40px' }} />

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <motion.p
              initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="text-brand-accent font-bold uppercase tracking-widest text-sm mb-3"
            >
              How We Work
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-display text-white"
            >
              Our Approach to Operational Excellence
            </motion.h2>
          </div>

          <div className="grid md:grid-cols-5 gap-4">
            {FRAMEWORK.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className="relative group"
              >
                {i < FRAMEWORK.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-[calc(100%+0px)] w-full h-px z-0">
                    <motion.div
                      initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }}
                      transition={{ delay: 0.5 + i * 0.12, duration: 0.6 }}
                      className="w-full h-full bg-gradient-to-r from-brand-blue/60 to-brand-accent/60 origin-left"
                    />
                  </div>
                )}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 h-full hover:bg-white/10 hover:border-brand-blue/30 transition-all text-center">
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center text-white mx-auto mb-4 shadow-lg`}>
                    {step.icon}
                  </div>
                  <p className="text-xs font-bold text-white/40 mb-1">{step.number}</p>
                  <h3 className="text-base font-bold text-white mb-2">{step.title}</h3>
                  <p className="text-slate-400 text-xs leading-relaxed">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Services Grid ─────────────────────────────────────────────────── */}
      <section id="services" className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <motion.p
              initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="text-brand-blue font-bold uppercase tracking-widest text-sm mb-3"
            >
              What We Offer
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-display text-brand-navy"
            >
              Our Consulting & Training Services
            </motion.h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            {SERVICES.map((svc, i) => (
              <motion.div
                key={svc.title}
                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className="group relative overflow-hidden rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl transition-all bg-white"
              >
                <div className="relative overflow-hidden h-52">
                  <img src={svc.image} alt={svc.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/70 via-brand-navy/20 to-transparent" />
                  <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-brand-blue/80 text-white text-xs font-bold uppercase tracking-wider backdrop-blur-sm">
                    {svc.tag}
                  </span>
                </div>
                <div className="p-7">
                  <h3 className="text-xl font-bold text-brand-navy mb-3">{svc.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed mb-4">{svc.desc}</p>
                  <ul className="space-y-1.5 mb-6">
                    {svc.bullets.map(b => (
                      <li key={b} className="flex items-center gap-2 text-xs text-slate-600">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                        {b}
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={() => openModal(`Services — Get Started: ${svc.title}`, svc.title)}
                    className="bg-brand-navy hover:bg-brand-blue text-white px-6 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center gap-1.5 group/btn"
                  >
                    Get Started
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-0.5 transition-transform" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* ── Trust Signals ─────────────────────────────────────────────────── */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <motion.p
              initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="text-brand-blue font-bold uppercase tracking-widest text-sm mb-3"
            >
              Why Cygnus
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-display text-brand-navy"
            >
              Why Organizations Choose Cygnus
            </motion.h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            {TRUST.slice(0, 3).map((t, i) => (
              <motion.div
                key={t.title}
                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -6 }}
                className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:border-brand-blue/20 transition-all group"
              >
                <div className="w-12 h-12 bg-brand-blue/10 rounded-2xl flex items-center justify-center text-brand-blue mb-5 group-hover:bg-brand-navy group-hover:text-white transition-colors">
                  {t.icon}
                </div>
                <h3 className="text-lg font-bold text-brand-navy mb-2">{t.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{t.desc}</p>
              </motion.div>
            ))}
          </div>
          <div className="grid md:grid-cols-2 gap-6 md:max-w-[66%] mx-auto">
            {TRUST.slice(3).map((t, i) => (
              <motion.div
                key={t.title}
                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -6 }}
                className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:border-brand-blue/20 transition-all group"
              >
                <div className="w-12 h-12 bg-brand-blue/10 rounded-2xl flex items-center justify-center text-brand-blue mb-5 group-hover:bg-brand-navy group-hover:text-white transition-colors">
                  {t.icon}
                </div>
                <h3 className="text-lg font-bold text-brand-navy mb-2">{t.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{t.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA ─────────────────────────────────────────────────────── */}
      <section ref={finalRef} className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative bg-brand-navy rounded-[3rem] overflow-hidden"
          >
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-blue/20 rounded-full blur-[80px]" />
              <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-brand-accent/15 rounded-full blur-[60px]" />
            </div>
            <div className="relative z-10 px-10 py-20 md:p-20 text-center">
              <motion.span
                initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                className="inline-block px-4 py-1.5 rounded-full bg-brand-blue/20 border border-brand-blue/30 text-brand-accent text-xs font-bold uppercase tracking-widest mb-6"
              >
                Get Started Today
              </motion.span>
              <h2 className="text-4xl md:text-5xl font-display text-white mb-6 max-w-3xl mx-auto leading-tight">
                Start Improving Your Organization's Safety and{' '}
                <span className="italic text-brand-accent">Compliance</span> Today
              </h2>
              <p className="text-lg text-white/65 mb-12 max-w-2xl mx-auto leading-relaxed">
                Cygnus helps organizations implement world-class management systems, deliver certified
                training programs, and improve operational safety and compliance.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <motion.button
                  whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                  onClick={() => openModal('Services — Free Consultation')}
                  className="bg-brand-blue hover:bg-brand-accent text-white px-10 py-5 rounded-2xl font-bold text-xl transition-all shadow-2xl shadow-brand-blue/40 flex items-center gap-2 group"
                >
                  Request Free Consultation
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </motion.button>
                <Link
                  to="/training/business-excellence"
                  className="bg-white/10 hover:bg-white/18 border border-white/20 text-white px-10 py-5 rounded-2xl font-bold text-xl transition-all inline-flex items-center gap-2"
                >
                  Explore Training Programs
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <LeadCaptureModal
        isOpen={modal.open}
        onClose={() => setModal(s => ({ ...s, open: false }))}
        source={modal.source}
        courseDetail={modal.courseDetail}
        heading="Request a Free Consultation"
        subheading="No commitment — just clarity on how we can help."
      />
    </main>
  );
};

export default ServicesPage;
