import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import {
  Menu, X, ArrowRight, Zap, ShieldCheck, Clock,
  CheckCircle2, Phone, Mail, MapPin,
  Twitter, Facebook, Linkedin, MessageCircle, ChevronDown, Search,
} from 'lucide-react';

import Hero              from './components/Hero';
import TrustedTeams      from './components/TrustedTeams';
import ProblemSection    from './components/ProblemSection';
import SystemSection     from './components/SystemSection';
import BookingModal      from './components/BookingModal';
import FloatingChatWidget from './components/FloatingChatWidget';
import BusinessExcellencePage from './pages/BusinessExcellencePage';
import NCATrainingPage from './pages/NCATrainingPage';
import BusinessExcellenceTrainingPage from './pages/BusinessExcellenceTrainingPage';
import ServicesPage from './pages/ServicesPage';
import BlogPage      from './pages/BlogPage';
import AboutPage     from './pages/AboutPage';

// ─── CTA trigger phrases ──────────────────────────────────────────────────────
const BOOKING_TRIGGERS = [
  'Book a Strategy Call',
  'Book a Call',
  'Book a Consultation',
  'Book Consultation',
  'Request Consultation',
  'Request Callback',
  'Transform My Business',
  'Get Started',
  'Get Started Today',
  'Initiate Strategy Call',
];

// ─── Navbar ───────────────────────────────────────────────────────────────────
type NavChild = { name: string; to: string };
type NavLink  = { name: string; href?: string; to?: string; children?: NavChild[] };

const navLinks: NavLink[] = [
  { name: 'Home',                to: '/' },
  { name: 'Business Excellence', to: '/business-excellence' },
  {
    name: 'Training',
    children: [
      { name: 'NCA Training',                  to: '/training/nca' },
      { name: 'Business Excellence Training',  to: '/training/business-excellence' },
    ],
  },
  { name: 'Services', to: '/services' },
  { name: 'Blog',     to: '/blog' },
  { name: 'About Us', to: '/about' },
  { name: 'Contact',  href: '#contact' },
];

const Navbar: React.FC<{ scrolled: boolean; onBookingClick: () => void }> = ({ scrolled, onBookingClick }) => {
  const [mobileOpen,    setMobileOpen]    = useState(false);
  const [trainingOpen,  setTrainingOpen]  = useState(false);
  const [mobileTrainingOpen, setMobileTrainingOpen] = useState(false);

  const linkClass = `text-sm font-medium transition-colors hover:text-brand-blue ${
    scrolled ? 'text-slate-600' : 'text-white/85'
  }`;

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${
      scrolled
        ? 'bg-white/90 backdrop-blur-xl border-b border-slate-200/60 shadow-sm py-3'
        : 'bg-transparent py-5'
    }`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <img
            src="/images/logo.png"
            alt="Cygnus"
            className="w-9 h-9 object-contain rounded-lg shadow-md bg-white p-0.5"
          />
          <span className={`text-xl font-bold tracking-tight transition-colors ${scrolled ? 'text-brand-navy' : 'text-white'}`}>
            Cygnus<span className="text-brand-blue">.</span>
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-7">
          {navLinks.map(link => {
            if (link.children) {
              return (
                <div
                  key={link.name}
                  className="relative"
                  onMouseEnter={() => setTrainingOpen(true)}
                  onMouseLeave={() => setTrainingOpen(false)}
                >
                  <button className={`${linkClass} flex items-center gap-1`}>
                    {link.name}
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${trainingOpen ? 'rotate-180' : ''}`} />
                  </button>

                  <AnimatePresence>
                    {trainingOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 6 }}
                        transition={{ duration: 0.15 }}
                        className="absolute top-full left-1/2 -translate-x-1/2 pt-2"
                      >
                        <div className="bg-white border border-slate-200 rounded-xl shadow-xl overflow-hidden min-w-[220px]">
                          {link.children.map(child => (
                            <Link
                              key={child.name}
                              to={child.to}
                              onClick={() => setTrainingOpen(false)}
                              className="block px-4 py-3 text-sm font-medium text-slate-700 hover:bg-brand-blue/5 hover:text-brand-blue transition-colors"
                            >
                              {child.name}
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            }

            return link.to ? (
              <Link key={link.name} to={link.to} className={linkClass}>
                {link.name}
              </Link>
            ) : (
              <a key={link.name} href={link.href} className={linkClass}>
                {link.name}
              </a>
            );
          })}
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            to="/blog"
            aria-label="Search insights"
            className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors ${
              scrolled ? 'text-slate-500 hover:bg-slate-100 hover:text-brand-blue' : 'text-white/70 hover:text-white hover:bg-white/10'
            }`}
          >
            <Search className="w-4 h-4" />
          </Link>
          <button
            onClick={onBookingClick}
            className="bg-brand-navy hover:bg-brand-blue text-white px-5 py-2.5 rounded-xl text-sm font-bold transition-all shadow-lg shadow-brand-navy/20 flex items-center gap-1.5"
          >
            Book a Call
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2"
          onClick={() => setMobileOpen(v => !v)}
          aria-label="Toggle menu"
        >
          {mobileOpen
            ? <X className={scrolled ? 'text-brand-navy' : 'text-white'} />
            : <Menu className={scrolled ? 'text-brand-navy' : 'text-white'} />
          }
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 bg-white shadow-2xl border-t border-slate-100 flex flex-col gap-1 p-4 md:hidden"
          >
            {navLinks.map(link => {
              if (link.children) {
                return (
                  <div key={link.name}>
                    <button
                      onClick={() => setMobileTrainingOpen(v => !v)}
                      className="w-full flex items-center justify-between text-base font-medium text-slate-800 hover:text-brand-blue py-2.5 px-3 rounded-lg hover:bg-slate-50 transition-colors"
                    >
                      {link.name}
                      <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${mobileTrainingOpen ? 'rotate-180' : ''}`} />
                    </button>
                    <AnimatePresence>
                      {mobileTrainingOpen && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          {link.children.map(child => (
                            <Link
                              key={child.name}
                              to={child.to}
                              onClick={() => { setMobileOpen(false); setMobileTrainingOpen(false); }}
                              className="block text-sm font-medium text-slate-600 hover:text-brand-blue py-2 pl-7 pr-3 rounded-lg hover:bg-slate-50 transition-colors"
                            >
                              {child.name}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              }

              return link.to ? (
                <Link
                  key={link.name}
                  to={link.to}
                  onClick={() => setMobileOpen(false)}
                  className="text-base font-medium text-slate-800 hover:text-brand-blue py-2.5 px-3 rounded-lg hover:bg-slate-50 transition-colors"
                >
                  {link.name}
                </Link>
              ) : (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-base font-medium text-slate-800 hover:text-brand-blue py-2.5 px-3 rounded-lg hover:bg-slate-50 transition-colors"
                >
                  {link.name}
                </a>
              );
            })}
            <button
              onClick={() => { setMobileOpen(false); onBookingClick(); }}
              className="mt-3 bg-brand-navy text-white py-3.5 rounded-xl font-bold"
            >
              Book a Strategy Call
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

// ─── Benefits section ─────────────────────────────────────────────────────────
const benefits = [
  {
    icon: <Zap className="w-6 h-6" />,
    title: 'Increased Efficiency',
    desc: 'Eliminate waste in processes — streamlined operations and improved resource allocation that show up directly in your bottom line.',
  },
  {
    icon: <ShieldCheck className="w-6 h-6" />,
    title: 'Enhanced Quality & Safety',
    desc: 'Identify and rectify defects early, reduce errors, and build a culture where safety and quality are non-negotiable.',
  },
  {
    icon: <Clock className="w-6 h-6" />,
    title: 'Shorter Lead Times',
    desc: 'Reduce cycle times for faster delivery and more responsive service — giving you a decisive edge over competitors.',
  },
];

const Benefits: React.FC = () => (
  <section className="py-24 bg-slate-50">
    <div className="max-w-7xl mx-auto px-6">
      <div className="text-center max-w-3xl mx-auto mb-14">
        <motion.p
          initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="text-brand-blue font-bold uppercase tracking-widest text-sm mb-3"
        >
          Our Promise
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-5xl font-display text-brand-navy mb-5"
        >
          To Install a Culture of{' '}
          <span className="italic text-brand-blue">Continuous Improvement</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ delay: 0.18 }}
          className="text-lg text-slate-500"
        >
          We don't just consult — we transform your organizational DNA to focus on value and excellence.
        </motion.p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {benefits.map((b, i) => (
          <motion.div
            key={b.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.12, duration: 0.6 }}
            whileHover={{ y: -8 }}
            className="bg-white p-9 rounded-3xl shadow-sm border border-slate-100 hover:shadow-xl hover:border-brand-blue/20 transition-all group"
          >
            <div className="w-14 h-14 bg-brand-blue/10 rounded-2xl flex items-center justify-center text-brand-blue mb-7 group-hover:bg-brand-navy group-hover:text-white transition-colors">
              {b.icon}
            </div>
            <h3 className="text-xl font-bold text-brand-navy mb-3">{b.title}</h3>
            <p className="text-slate-500 leading-relaxed">{b.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

// ─── Services section ─────────────────────────────────────────────────────────
const services = [
  {
    title: 'Lean Systems Implementation',
    desc: 'End-to-end deployment of Lean Management Systems using 5S Methodology and Kaizen to eliminate waste and drive measurable ROI.',
    image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800&q=80',
    tag: 'Core Service',
  },
  {
    title: 'Safety Training — WAH & GWO',
    desc: 'Comprehensive certified safety training: Working at Heights (WAH) and Global Wind Organisation (GWO) standards for your workforce.',
    image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&q=80',
    tag: 'Certification',
  },
  {
    title: 'Continuous Improvement Programs',
    desc: 'Sustained CI culture programs that boost productivity, employee morale, and long-term sustainable profitability.',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80',
    tag: 'Long-term',
  },
  {
    title: 'Management Systems Consulting',
    desc: 'Strategic advisory to align your leadership, processes, and people for resilient long-term operational excellence.',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80',
    tag: 'Strategic',
  },
];

const Services: React.FC = () => (
  <section id="services" className="py-24 bg-white">
    <div className="max-w-7xl mx-auto px-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
        <div className="max-w-xl">
          <motion.p
            initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-brand-blue font-bold uppercase tracking-widest text-sm mb-3"
          >
            What We Do
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-display text-brand-navy"
          >
            Specialized Solutions for Operational Excellence
          </motion.h2>
        </div>
        <motion.button
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          className="text-brand-navy font-bold flex items-center gap-2 hover:text-brand-blue transition-colors group flex-shrink-0"
        >
          View All Services
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </motion.button>
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
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-navy via-brand-navy/30 to-transparent opacity-90" />

            {/* Tag */}
            <div className="absolute top-6 left-6">
              <span className="px-3 py-1 rounded-full bg-brand-blue/80 text-white text-xs font-bold uppercase tracking-wider backdrop-blur-sm">
                {svc.tag}
              </span>
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-8">
              <h3 className="text-2xl font-bold text-white mb-3 leading-tight">{svc.title}</h3>
              <p className="text-white/80 text-sm leading-relaxed mb-5 max-w-md opacity-0 group-hover:opacity-100 -translate-y-2 group-hover:translate-y-0 transition-all duration-400">
                {svc.desc}
              </p>
              <button className="bg-white text-brand-navy px-6 py-2.5 rounded-full text-sm font-bold hover:bg-brand-blue hover:text-white transition-all opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 duration-400">
                Learn More →
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

// ─── About section ────────────────────────────────────────────────────────────
const aboutPoints = [
  'Competitive advantage through process efficiency',
  'Adaptability to market changes and disruptions',
  'Sustainability of long-term operational growth',
  'Maximized productivity, morale, and team alignment',
];

const About: React.FC = () => (
  <section className="py-24 bg-slate-50 overflow-hidden">
    <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-20 items-center">
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="relative"
      >
        <div className="relative z-10 rounded-[2.5rem] overflow-hidden shadow-2xl">
          <img
            src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=900&q=80"
            alt="Cygnus team in action"
            className="w-full h-auto object-cover"
          />
        </div>
        {/* Floating badge */}
        <motion.div
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -bottom-8 -right-6 bg-brand-navy rounded-2xl px-6 py-5 shadow-2xl z-20"
        >
          <div className="text-4xl font-bold text-white">98%</div>
          <div className="text-brand-accent text-sm font-semibold">Client Satisfaction</div>
        </motion.div>
        {/* Glow */}
        <div className="absolute -top-12 -right-12 w-64 h-64 bg-brand-blue/10 rounded-full blur-3xl -z-10" />
        <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-brand-navy/8 rounded-full blur-3xl -z-10" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        <p className="text-brand-blue font-bold uppercase tracking-widest text-sm mb-3">Who We Are</p>
        <h2 className="text-4xl md:text-5xl font-display text-brand-navy mb-7 leading-tight">
          Your Partner in{' '}
          <span className="italic text-brand-blue">Operational Excellence</span>
        </h2>
        <p className="text-lg text-slate-600 mb-8 leading-relaxed">
          Cygnus Consulting is a leading firm with unmatched specialty in Lean Management Systems.
          We focus on the continuous improvement and optimization of processes, operations, and
          resources within our clients' organizations — helping East Africa's best businesses operate at their peak.
        </p>

        <ul className="space-y-4 mb-10">
          {aboutPoints.map((pt, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: 16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="flex items-center gap-3"
            >
              <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              </div>
              <span className="text-slate-700 font-medium">{pt}</span>
            </motion.li>
          ))}
        </ul>

        <button className="bg-brand-navy text-white px-8 py-4 rounded-xl font-bold hover:bg-brand-blue transition-all flex items-center gap-2 group">
          Learn More About Cygnus
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>
      </motion.div>
    </div>
  </section>
);

// ─── Training section ─────────────────────────────────────────────────────────
const trainingCourses = [
  {
    code: 'WAH',
    title: 'Working at Heights',
    desc: 'Comprehensive certification covering harness use, anchor points, rescue procedures, and fall prevention protocols.',
    duration: '2–3 Days',
    level: 'All Levels',
  },
  {
    code: 'GWO',
    title: 'Global Wind Organisation',
    desc: 'International standard safety training for wind energy workers — basic safety, first aid, fire awareness, manual handling.',
    duration: '4–5 Days',
    level: 'Industry Certified',
  },
  {
    code: '5S',
    title: 'Lean 5S Methodology',
    desc: 'Sort, Set in Order, Shine, Standardise, Sustain — practical implementation training for your entire shop floor.',
    duration: '1–2 Days',
    level: 'All Teams',
  },
  {
    code: 'KZN',
    title: 'Kaizen Facilitation',
    desc: 'Train your internal team to lead Kaizen events — from problem identification to solution deployment and sustainment.',
    duration: '3 Days',
    level: 'Management',
  },
];

const Training: React.FC = () => (
  <section id="training" className="py-24 bg-brand-navy overflow-hidden relative">
    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-blue/40 to-transparent" />
    <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
      style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #fff 1px, transparent 0)', backgroundSize: '40px 40px' }}
    />

    <div className="relative z-10 max-w-7xl mx-auto px-6">
      <div className="text-center mb-14">
        <motion.p
          initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="text-brand-accent font-bold uppercase tracking-widest text-sm mb-3"
        >
          Certified Training
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-5xl font-display text-white mb-4"
        >
          Build the Skills That <span className="italic text-brand-accent">Protect & Perform</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ delay: 0.18 }}
          className="text-slate-400 max-w-xl mx-auto text-lg"
        >
          Internationally recognised certifications delivered on-site or at our training centres across Kenya.
        </motion.p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
        {trainingCourses.map((course, i) => (
          <motion.div
            key={course.code}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.6 }}
            className="bg-white/5 border border-white/10 rounded-2xl p-7 hover:bg-white/10 hover:border-brand-blue/30 transition-all group"
          >
            <div className="text-brand-accent font-bold text-xs uppercase tracking-widest mb-4">{course.code}</div>
            <h3 className="text-lg font-bold text-white mb-3 leading-tight">{course.title}</h3>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">{course.desc}</p>
            <div className="border-t border-white/10 pt-4 space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-slate-500">Duration</span>
                <span className="text-white font-semibold">{course.duration}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-slate-500">Level</span>
                <span className="text-brand-accent font-semibold">{course.level}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mt-12"
      >
        <button className="bg-brand-blue hover:bg-brand-accent text-white px-10 py-4 rounded-xl font-bold text-lg transition-all flex items-center gap-2 group mx-auto shadow-xl shadow-brand-blue/30">
          Book a Strategy Call
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>
        <p className="text-slate-500 text-sm mt-4">On-site & remote delivery available across East Africa</p>
      </motion.div>
    </div>
  </section>
);

// ─── CTA section ──────────────────────────────────────────────────────────────
const CTASection: React.FC = () => (
  <section className="py-24 bg-white">
    <div className="max-w-7xl mx-auto px-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="relative bg-brand-navy rounded-[3rem] overflow-hidden"
      >
        {/* Background glow */}
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
            Start Your Transformation
          </motion.span>
          <h2 className="text-4xl md:text-6xl font-display text-white mb-7 max-w-4xl mx-auto leading-tight">
            Ready to{' '}
            <span className="italic text-brand-accent">Accelerate</span>{' '}
            Your Progress & Transform Your Business?
          </h2>
          <p className="text-xl text-white/65 mb-12 max-w-2xl mx-auto leading-relaxed">
            Join hundreds of organizations across East Africa that have unlocked peak operational performance with Cygnus.
          </p>
          <div className="flex flex-wrap justify-center gap-5">
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="bg-brand-blue hover:bg-brand-accent text-white px-10 py-5 rounded-2xl font-bold text-xl transition-all shadow-2xl shadow-brand-blue/40 flex items-center gap-2 group"
            >
              Book a Strategy Call
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.button>
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.03 }}
              className="bg-white/10 hover:bg-white/18 backdrop-blur-sm text-white px-10 py-5 rounded-2xl font-bold text-xl transition-all border border-white/20"
            >
              Contact Us
            </motion.a>
          </div>
        </div>
      </motion.div>
    </div>
  </section>
);

// ─── Footer ───────────────────────────────────────────────────────────────────
const Footer: React.FC = () => (
  <footer id="contact" className="bg-slate-950 text-white pt-20 pb-10">
    <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
      {/* Brand */}
      <div className="lg:col-span-1">
        <div className="flex items-center gap-2.5 mb-7">
          <div className="w-8 h-8 bg-brand-blue rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-base">C</span>
          </div>
          <span className="text-xl font-bold tracking-tight">Cygnus<span className="text-brand-blue">.</span></span>
        </div>
        <p className="text-slate-400 leading-relaxed mb-7 text-sm">
          East Africa's leading operational excellence consultancy. Lean systems, safety training, and continuous improvement — built for lasting results.
        </p>
        <div className="flex gap-3">
          {[
            { icon: <Twitter className="w-4 h-4" />,     label: 'Twitter',  href: 'https://x.com/cygnus_safety' },
            { icon: <Facebook className="w-4 h-4" />,    label: 'Facebook', href: 'https://www.facebook.com/CygnusSafetyConsulting' },
            { icon: <Linkedin className="w-4 h-4" />,    label: 'LinkedIn', href: 'https://www.linkedin.com/company/cygnus-safety-consulting-ltd/posts/?feedView=all' },
            { icon: <MessageCircle className="w-4 h-4" />, label: 'WhatsApp', href: 'https://wa.me/254717925881' },
          ].map(s => (
            <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label} className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center hover:bg-brand-blue transition-colors">
              {s.icon}
            </a>
          ))}
        </div>
      </div>

      {/* Services */}
      <div>
        <h4 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-6">Services</h4>
        <ul className="space-y-3 text-slate-400 text-sm">
          {['Lean Implementation', 'WAH Training', 'GWO Training', 'Safety Management', 'Systems Consulting'].map(s => (
            <li key={s}><a href="#services" className="hover:text-brand-blue transition-colors">{s}</a></li>
          ))}
        </ul>
      </div>

      {/* Quick links */}
      <div>
        <h4 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-6">Company</h4>
        <ul className="space-y-3 text-slate-400 text-sm">
          {['About Cygnus', 'Our Process', 'Case Studies', 'Blog & Insights', 'Careers'].map(s => (
            <li key={s}><a href="#" className="hover:text-brand-blue transition-colors">{s}</a></li>
          ))}
        </ul>
      </div>

      {/* Contact */}
      <div>
        <h4 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-6">Contact</h4>
        <ul className="space-y-5 text-sm">
          <li className="flex gap-3">
            <MapPin className="w-5 h-5 text-brand-blue shrink-0 mt-0.5" />
            <span className="text-slate-400">Riabai Centre, Kiambu, Kenya</span>
          </li>
          <li className="flex gap-3">
            <Phone className="w-5 h-5 text-brand-blue shrink-0" />
            <a href="tel:+254717925881" className="text-slate-400 hover:text-white transition-colors">+254 717 925 881</a>
          </li>
          <li className="flex gap-3">
            <Mail className="w-5 h-5 text-brand-blue shrink-0" />
            <a href="mailto:info@cygnus.co.ke" className="text-slate-400 hover:text-white transition-colors">info@cygnus.co.ke</a>
          </li>
        </ul>

        {/* Status */}
        <div className="mt-7 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-slate-500 text-xs">All systems operational</span>
        </div>
      </div>
    </div>

    <div className="max-w-7xl mx-auto px-6 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-500 text-xs">
      <p>© {new Date().getFullYear()} Cygnus Consulting. All Rights Reserved.</p>
      <div className="flex gap-6">
        <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
        <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
      </div>
    </div>

  </footer>
);

// ─── Root App ─────────────────────────────────────────────────────────────────
export default function App() {
  const [scrolled,     setScrolled]     = useState(false);
  const [isModalOpen,  setIsModalOpen]  = useState(false);

  const openBooking = () => setIsModalOpen(true);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    const onBookingEvent = () => setIsModalOpen(true);

    // Global click intercept — any button/link with matching text opens the modal
    const onGlobalClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const closest = target.closest('a, button');
      if (!closest) return;
      const text = closest.textContent?.trim() ?? '';
      if (BOOKING_TRIGGERS.some(t => text.includes(t))) {
        e.preventDefault();
        setIsModalOpen(true);
      }
    };

    window.addEventListener('scroll',              onScroll);
    window.addEventListener('open-booking-modal',  onBookingEvent);
    document.addEventListener('click',             onGlobalClick);

    return () => {
      window.removeEventListener('scroll',             onScroll);
      window.removeEventListener('open-booking-modal', onBookingEvent);
      document.removeEventListener('click',            onGlobalClick);
    };
  }, []);

  return (
    <BrowserRouter>
      <div className="font-sans overflow-x-hidden">
        <Navbar scrolled={scrolled} onBookingClick={openBooking} />
        <Routes>
          <Route path="/" element={
            <>
              <Hero />
              <TrustedTeams />
              <Benefits />
              <ProblemSection />
              <Services />
              <About />
              <Training />
              <SystemSection />
              <CTASection />
            </>
          } />
          <Route path="/business-excellence" element={<BusinessExcellencePage />} />
          <Route path="/training/nca" element={<NCATrainingPage />} />
          <Route path="/training/business-excellence" element={<BusinessExcellenceTrainingPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/blog"     element={<BlogPage />} />
          <Route path="/about"    element={<AboutPage />} />
        </Routes>
        <Footer />
      </div>

      <BookingModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <FloatingChatWidget />
    </BrowserRouter>
  );
}
