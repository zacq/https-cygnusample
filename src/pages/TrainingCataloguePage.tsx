import React from 'react';
import { motion } from 'motion/react';
import {
  ArrowRight, AlertTriangle, Flame, Heart, ClipboardCheck, ShieldCheck, Leaf,
  RefreshCcw, Target, TrendingUp, Users, Award, GitBranch, BarChart3, Activity,
  ShoppingCart, Package, Truck, Filter, FileText, Building2, CheckCircle, Layers,
  Phone, Mail, Globe, MapPin, Calendar, Check,
} from 'lucide-react';

// ─── Types ────────────────────────────────────────────────────────────────────

interface Course {
  number: string;
  title: string;
  description: string;
  idealFor: string[];
  duration: string;
  Icon: React.ElementType;
}

// ─── Course Data ──────────────────────────────────────────────────────────────

const SAFETY_COURSES: Course[] = [
  {
    number: '01',
    title: 'Work at Height',
    description: 'Ensure safe operations when working above ground level through practical skills and compliance training. Covers fall prevention, safe access methods, harness inspection and use, ladder safety, anchor systems, and emergency rescue procedures.',
    idealFor: ['Construction Workers', 'Technicians', 'Engineers', 'Installers', 'Supervisors'],
    duration: '2 Days',
    Icon: AlertTriangle,
  },
  {
    number: '02',
    title: 'Fire Safety & Fire Marshal Training',
    description: 'Prepare your team to prevent, detect, and respond effectively to workplace fire emergencies. Participants learn fire causes, extinguisher handling, evacuation planning, and alarm response.',
    idealFor: ['Fire Marshals', 'Safety Officers', 'Security Teams', 'Supervisors', 'All Staff'],
    duration: '2 Days',
    Icon: Flame,
  },
  {
    number: '03',
    title: 'First Aid & CPR Training',
    description: 'Equip employees with life-saving skills to respond confidently during workplace accidents and medical emergencies. Covers CPR, bleeding control, choking response, fractures, burns, shock, and casualty care.',
    idealFor: ['Employees', 'Supervisors', 'HR Teams', 'Security Staff', 'Safety Representatives'],
    duration: '2 Days',
    Icon: Heart,
  },
  {
    number: '04',
    title: 'Risk Assessment Training',
    description: 'Learn how to identify hazards, evaluate risks, and implement effective control measures in the workplace. Participants gain practical tools for creating safer work environments and meeting compliance standards.',
    idealFor: ['Managers', 'Supervisors', 'Safety Officers', 'Team Leaders'],
    duration: '2 Days',
    Icon: ClipboardCheck,
  },
  {
    number: '05',
    title: 'Safety as a Value Training',
    description: 'Build a strong workplace culture where safety becomes a shared responsibility and everyday priority. This course helps employees and leaders understand how attitudes, behaviors, and accountability create a lasting safety culture.',
    idealFor: ['Managers', 'Supervisors', 'Team Leaders', 'All Employees'],
    duration: '2 Days',
    Icon: ShieldCheck,
  },
  {
    number: '06',
    title: 'ESG — Environmental, Social & Governance',
    description: 'Understand the importance of ESG principles in building sustainable and responsible organizations. Covers ESG compliance, sustainability practices, ethical leadership, stakeholder responsibility, and risk management.',
    idealFor: ['Directors', 'Managers', 'Compliance Teams', 'HR Professionals', 'Business Owners'],
    duration: '2 Days',
    Icon: Leaf,
  },
];

const BCIE_COURSES: Course[] = [
  {
    number: '01',
    title: 'Business Continuous Improvement & Excellence',
    description: 'Build a culture of continuous improvement using Lean and Kaizen principles. Helps organizations identify inefficiencies, eliminate waste, and improve productivity through structured operational systems.',
    idealFor: ['Managers', 'Supervisors', 'Team Leaders', 'Operations Staff'],
    duration: '2 Days',
    Icon: RefreshCcw,
  },
  {
    number: '02',
    title: 'Strategic Anchored Operations & Strategy Deployment',
    description: 'Learn how to translate business strategy into daily operations for measurable results. Focuses on aligning goals, tracking performance, and ensuring effective execution across departments.',
    idealFor: ['Directors', 'Senior Managers', 'Department Heads'],
    duration: '2 Days',
    Icon: Target,
  },
  {
    number: '03',
    title: 'Business Finance Operations & Profitable Flow',
    description: 'Understand how operations directly influence profitability. Learn cost control, budgeting, financial awareness, and how to manage operational decisions that improve business cash flow.',
    idealFor: ['Managers', 'Finance Teams', 'Operations Leaders'],
    duration: '2 Days',
    Icon: TrendingUp,
  },
  {
    number: '04',
    title: 'Building Organisational Leadership Skills',
    description: 'Strengthen leadership capacity across all levels of the organization. Focuses on accountability, performance management, team leadership, and decision-making for improved execution.',
    idealFor: ['Supervisors', 'Managers', 'Team Leaders', 'HR Professionals'],
    duration: '2 Days',
    Icon: Users,
  },
  {
    number: '05',
    title: 'ISO Standardisation for Business Excellence',
    description: 'Learn how standardization improves consistency, quality, and operational control. Helps organizations implement structured systems that reduce errors and improve service delivery.',
    idealFor: ['Quality Teams', 'Managers', 'Compliance Officers'],
    duration: '2 Days',
    Icon: Award,
  },
  {
    number: '06',
    title: 'Lean Six Sigma for Operational Excellence',
    description: 'Eliminate waste and improve efficiency using Lean Six Sigma tools. Learn DMAIC methodology to improve processes, reduce variation, and increase productivity across operations.',
    idealFor: ['Operations Teams', 'Engineers', 'Managers'],
    duration: '2–3 Days',
    Icon: GitBranch,
  },
  {
    number: '07',
    title: 'ESG for Business Excellence',
    description: 'Integrate sustainability into business operations through ESG principles. Covers environmental responsibility, social impact, governance systems, and compliance frameworks.',
    idealFor: ['Directors', 'Managers', 'Compliance Teams', 'CSR Officers'],
    duration: '2 Days',
    Icon: Leaf,
  },
  {
    number: '08',
    title: 'Unseen Shilling in Data for Decision Making',
    description: 'Learn how to use operational data to identify hidden costs, inefficiencies, and opportunities. Strengthens data-driven decision-making for better, faster, and more profitable business outcomes.',
    idealFor: ['Managers', 'Analysts', 'Supervisors'],
    duration: '2 Days',
    Icon: BarChart3,
  },
  {
    number: '09',
    title: 'Staff Capacity Optimisation',
    description: 'Maximise workforce productivity by aligning employee skills, roles, and performance with organizational goals. Equips participants to assess capacity, eliminate inefficiencies, and improve output through better workforce planning.',
    idealFor: ['HR Professionals', 'Managers', 'Supervisors', 'Business Owners'],
    duration: '2 Days',
    Icon: Activity,
  },
];

const LOGISTICS_COURSES: Course[] = [
  {
    number: '01',
    title: 'Procurement & Contract Management',
    description: 'Build efficient procurement systems that ensure value for money, supplier accountability, and compliance. Covers sourcing, tendering, negotiation, contract management, and supplier performance improvement.',
    idealFor: ['Procurement Officers', 'Buyers', 'Administrators', 'Managers'],
    duration: '2 Days',
    Icon: ShoppingCart,
  },
  {
    number: '02',
    title: 'Warehousing & Stores Management',
    description: 'Learn modern warehouse practices that improve stock accuracy, storage efficiency, and operational flow. Covers inventory control, warehouse layout, stock taking, loss prevention, and reporting systems.',
    idealFor: ['Storekeepers', 'Warehouse Supervisors', 'Logistics Teams'],
    duration: '2 Days',
    Icon: Package,
  },
  {
    number: '03',
    title: 'Transport & Logistics Management',
    description: 'Develop reliable transport systems that improve delivery performance while controlling operational costs. Covers route planning, dispatch coordination, fleet utilisation, fuel management, and logistics planning.',
    idealFor: ['Transport Managers', 'Fleet Supervisors', 'Dispatch Teams'],
    duration: '2 Days',
    Icon: Truck,
  },
  {
    number: '04',
    title: 'Strategic Purchasing & Supply Management',
    description: 'Turn procurement into a strategic advantage through spend analysis, supplier relationship management, forecasting, and sourcing strategies that reduce costs and improve reliability.',
    idealFor: ['Senior Procurement Officers', 'Supply Chain Managers'],
    duration: '2 Days',
    Icon: Layers,
  },
  {
    number: '05',
    title: 'Supplier Selection & Tendering',
    description: 'Master supplier evaluation and tendering processes for better procurement decisions. Covers bid analysis, supplier audits, negotiation, and ethical sourcing practices.',
    idealFor: ['Procurement Teams', 'Tender Committees', 'Managers'],
    duration: '2 Days',
    Icon: CheckCircle,
  },
  {
    number: '06',
    title: 'Contracting, Negotiation & Conflict Resolution',
    description: 'Equips professionals with advanced skills to manage negotiations effectively, develop strong contracts, and resolve workplace or supplier conflicts professionally. Achieve win-win outcomes while protecting organizational interests.',
    idealFor: ['Procurement Officers', 'Managers', 'Project Teams', 'Business Owners'],
    duration: '2–3 Days',
    Icon: FileText,
  },
  {
    number: '07',
    title: 'Vendor Qualification, Performance & SLA Management',
    description: 'Focus on selecting the right vendors, monitoring performance, and ensuring compliance through effective Service Level Agreements. Build reliable supplier networks that support quality and efficiency.',
    idealFor: ['Procurement Teams', 'Supply Chain Managers', 'Contract Officers', 'Quality Teams'],
    duration: '2–3 Days',
    Icon: Building2,
  },
  {
    number: '08',
    title: 'Project Cycle Management',
    description: 'A structured approach to managing projects from initiation to closure. Participants learn how to plan, execute, monitor, and evaluate projects effectively for successful delivery of objectives.',
    idealFor: ['Project Managers', 'NGO Officers', 'Engineers', 'Government Project Teams'],
    duration: '2–3 Days',
    Icon: Target,
  },
  {
    number: '09',
    title: 'Sustainable Sales Funnel',
    description: 'Build a structured and consistent sales system that attracts, converts, and retains customers for long-term business growth. Covers lead generation, conversion strategies, and customer retention systems.',
    idealFor: ['Sales Teams', 'Marketing Teams', 'Business Owners', 'Managers'],
    duration: '2 Days',
    Icon: Filter,
  },
];

// ─── Supporting content ───────────────────────────────────────────────────────

const WHY_CYGNUS = [
  { text: 'Certified and experienced trainers', Icon: Award },
  { text: 'Practical hands-on learning approach', Icon: CheckCircle },
  { text: 'Flexible onsite and virtual delivery', Icon: Globe },
  { text: 'Customised corporate programs', Icon: Building2 },
  { text: 'Recognised certificates', Icon: ShieldCheck },
  { text: 'Affordable and value-driven solutions', Icon: TrendingUp },
];

const WHY_BCIE = [
  { head: 'Improves Profitability', body: 'Reduces waste, controls costs, and improves how resources are used for better financial results.' },
  { head: 'Increases Efficiency', body: 'Streamlines processes, eliminates bottlenecks, and ensures work is done faster with fewer errors.' },
  { head: 'Enhances Productivity', body: 'Improves employee performance through clear systems, roles, and accountability.' },
  { head: 'Strengthens Competitiveness', body: 'Enables organisations to deliver better quality services and products than competitors.' },
  { head: 'Builds Strong Leadership & Culture', body: 'Promotes accountability, discipline, and continuous improvement across all levels.' },
  { head: 'Ensures Compliance & Risk Reduction', body: 'Integrates safety, ESG, and governance practices to reduce legal and operational risks.' },
  { head: 'Supports Sustainable Growth', body: 'Helps businesses grow in a structured way without collapsing due to poor systems.' },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

const CourseCard: React.FC<{ course: Course; accent: string; index: number }> = ({ course, accent, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 18 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-40px' }}
    transition={{ delay: (index % 2) * 0.07, duration: 0.48 }}
    className="group relative bg-slate-50 hover:bg-white rounded-2xl p-7 pl-8 overflow-hidden flex flex-col gap-4 transition-colors"
    style={{ boxShadow: 'inset 0 0 0 1px transparent' }}
  >
    {/* Left accent strip */}
    <div className="absolute left-0 top-4 bottom-4 w-[3px] rounded-full" style={{ background: accent }} />

    {/* Header */}
    <div className="flex items-start justify-between gap-3">
      <div className="flex items-center gap-2.5">
        <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${accent}18` }}>
          <course.Icon className="w-4 h-4" style={{ color: accent }} />
        </div>
        <span className="text-xs font-mono font-bold" style={{ color: accent }}>{course.number}</span>
      </div>
      <span className="inline-flex items-center gap-1 text-xs text-slate-400 bg-white border border-slate-200 px-2.5 py-1 rounded-full font-medium whitespace-nowrap">
        <Calendar className="w-3 h-3" />
        {course.duration}
      </span>
    </div>

    {/* Content */}
    <div className="flex-1">
      <h3
        className="font-bold text-brand-navy text-[1rem] leading-snug mb-2.5"
        style={{ textWrap: 'balance' } as React.CSSProperties}
      >
        {course.title}
      </h3>
      <p className="text-sm text-slate-500 leading-relaxed">{course.description}</p>
    </div>

    {/* Ideal For pills */}
    <div className="flex flex-wrap gap-1.5">
      {course.idealFor.map((role) => (
        <span key={role} className="text-xs text-slate-500 bg-white border border-slate-200 px-2 py-0.5 rounded-full">
          {role}
        </span>
      ))}
    </div>

    {/* CTA — pinned to bottom, uses global click intercept */}
    <button
      className="mt-auto self-start inline-flex items-center gap-1.5 text-sm font-semibold transition-all group-hover:gap-2.5"
      style={{ color: accent }}
    >
      Book This Course
      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
    </button>
  </motion.div>
);

interface CategorySectionProps {
  label: string;
  title: string;
  accent: string;
  courses: Course[];
  children?: React.ReactNode;
}

const CategorySection: React.FC<CategorySectionProps> = ({ label, title, accent, courses, children }) => (
  <section className="max-w-6xl mx-auto px-6 py-16">
    {/* Section header */}
    <div className="relative mb-12 overflow-hidden">
      {/* Large background letter */}
      <span
        className="absolute -right-4 -top-6 text-[120px] font-display leading-none select-none pointer-events-none font-bold opacity-[0.04] text-brand-navy"
        aria-hidden
      >
        {label}
      </span>

      <div className="relative z-10 flex items-end gap-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <span
              className="w-7 h-7 rounded-lg text-xs font-bold flex items-center justify-center text-white"
              style={{ background: accent }}
            >
              {label}
            </span>
            <span className="text-xs font-bold uppercase tracking-widest text-slate-400">
              {label === 'A' ? 'Safety & Sustainability' : label === 'B' ? 'Business Continuous Improvement & Excellence' : 'Logistics'}
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-display text-brand-navy leading-tight tracking-tight">
            {title}
          </h2>
          <div className="mt-4 h-[2px] w-14 rounded-full" style={{ background: accent }} />
        </div>
        <span className="ml-auto text-sm text-slate-400 font-medium pb-1 hidden md:block">
          {courses.length} programs
        </span>
      </div>
    </div>

    {/* Optional intro block (used for BCI&E "Why" banner) */}
    {children}

    {/* Course grid — 2 columns, NOT the generic 3-equal pattern */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {courses.map((course, i) => (
        <CourseCard key={course.number} course={course} accent={accent} index={i} />
      ))}
    </div>
  </section>
);

// ─── Main Page ────────────────────────────────────────────────────────────────

const TrainingCataloguePage: React.FC = () => {
  return (
    <main className="min-h-screen bg-white">

      {/* ── Hero ───────────────────────────────────────────────────────────── */}
      <section className="relative pt-32 pb-24 bg-brand-navy overflow-hidden">
        <div className="absolute top-0 left-1/3 w-[700px] h-[700px] rounded-full bg-brand-blue/10 blur-[130px] pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-brand-accent/8 blur-[100px] pointer-events-none" />
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #fff 1px, transparent 0)', backgroundSize: '40px 40px' }}
        />

        <div className="relative z-10 max-w-5xl mx-auto px-6">
          <motion.span
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-blue/20 border border-brand-blue/40 text-brand-accent text-xs font-bold uppercase tracking-widest mb-6"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-brand-accent animate-pulse" />
            24 Programs · 3 Categories
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="text-5xl md:text-7xl font-display text-white leading-[1.04] tracking-tight mb-5"
            style={{ textWrap: 'balance' } as React.CSSProperties}
          >
            Training{' '}
            <span className="italic text-brand-accent">Catalogue</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-lg text-slate-300 max-w-lg leading-relaxed"
          >
            Practical, industry-relevant training programs for corporates, NGOs,
            SMEs, government institutions, and individuals across East Africa.
          </motion.p>

          {/* Quick category jump links */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.32, duration: 0.55 }}
            className="flex flex-wrap gap-3 mt-10"
          >
            {[
              { label: 'A — Safety & Sustainability', href: '#safety', color: '#DC2626' },
              { label: 'B — Business Excellence', href: '#bcie', color: '#D4AF37' },
              { label: 'C — Logistics', href: '#logistics', color: '#1B6EC2' },
            ].map(({ label, href, color }) => (
              <a
                key={href}
                href={href}
                className="inline-flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-full bg-white/8 border border-white/15 text-slate-300 hover:text-white hover:bg-white/14 active:scale-[0.98] transition-all"
              >
                <span className="w-2 h-2 rounded-full" style={{ background: color }} />
                {label}
              </a>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── About Cygnus ───────────────────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">

          {/* About text */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
          >
            <span className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3 block">About Cygnus</span>
            <h2 className="text-3xl font-display text-brand-navy leading-tight tracking-tight mb-5">
              Building stronger organisations through skills, systems and performance excellence
            </h2>
            <p className="text-slate-500 leading-relaxed mb-4">
              Cygnus Safety Consultants is a leading training and consultancy firm dedicated to
              developing workplace competence, safety culture, and operational excellence.
            </p>
            <p className="text-slate-500 leading-relaxed">
              We provide practical, industry-relevant training programs tailored for corporates, NGOs,
              SMEs, government institutions, and individuals. Our programs are designed for mindset
              change, capacity optimisation, and driving daily practice of continuous improvement.
            </p>
          </motion.div>

          {/* Why Choose Cygnus — 2-col list, not the generic 3-equal-card pattern */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.08 }}
          >
            <span className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-5 block">Why choose us</span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {WHY_CYGNUS.map(({ text, Icon }, i) => (
                <motion.div
                  key={text}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06, duration: 0.4 }}
                  className="flex items-start gap-3 bg-slate-50 rounded-xl p-4"
                >
                  <div className="w-7 h-7 rounded-lg bg-brand-navy/8 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Icon className="w-3.5 h-3.5 text-brand-navy" />
                  </div>
                  <span className="text-sm text-slate-600 leading-snug font-medium">{text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-6xl mx-auto px-6">
        <div className="h-px bg-slate-100" />
      </div>

      {/* ── Section A: Safety & Sustainability ─────────────────────────────── */}
      <div id="safety">
        <CategorySection label="A" title="Safety & Sustainability" accent="#DC2626" courses={SAFETY_COURSES} />
      </div>

      {/* Divider */}
      <div className="max-w-6xl mx-auto px-6">
        <div className="h-px bg-slate-100" />
      </div>

      {/* ── Section B: BCI&E ───────────────────────────────────────────────── */}
      <div id="bcie">
        <CategorySection
          label="B"
          title="Business Continuous Improvement & Excellence"
          accent="#D4AF37"
          courses={BCIE_COURSES}
        >
          {/* "Why BCI&E" banner — dark feature card before course list */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative rounded-3xl overflow-hidden bg-brand-navy mb-10 p-8 md:p-12"
          >
            <div
              className="absolute inset-0 opacity-[0.04] pointer-events-none"
              style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #fff 1px, transparent 0)', backgroundSize: '28px 28px' }}
            />
            <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-brand-gold/10 blur-[100px] pointer-events-none" />

            <div className="relative z-10">
              <span className="text-xs font-bold uppercase tracking-widest text-brand-gold mb-4 block">Why business excellence matters</span>
              <h3
                className="text-2xl md:text-3xl font-display text-white leading-tight mb-8"
                style={{ textWrap: 'balance' } as React.CSSProperties}
              >
                Seven reasons every organisation needs a structured approach to excellence
              </h3>

              {/* 2-col checklist — asymmetric split (4 + 3) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {WHY_BCIE.map(({ head, body }) => (
                  <div key={head} className="flex items-start gap-3 bg-white/5 rounded-xl p-4">
                    <div className="w-5 h-5 rounded-full bg-brand-gold/25 border border-brand-gold/40 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-2.5 h-2.5 text-brand-gold" />
                    </div>
                    <div>
                      <span className="text-sm font-semibold text-white block mb-0.5">{head}</span>
                      <span className="text-xs text-slate-400 leading-relaxed">{body}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </CategorySection>
      </div>

      {/* Divider */}
      <div className="max-w-6xl mx-auto px-6">
        <div className="h-px bg-slate-100" />
      </div>

      {/* ── Section C: Logistics ───────────────────────────────────────────── */}
      <div id="logistics">
        <CategorySection label="C" title="Logistics" accent="#1B6EC2" courses={LOGISTICS_COURSES} />
      </div>

      {/* ── Contact Section ────────────────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-6 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative rounded-3xl bg-brand-navy overflow-hidden p-10 md:p-14"
        >
          <div
            className="absolute inset-0 opacity-[0.04] pointer-events-none"
            style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #fff 1px, transparent 0)', backgroundSize: '32px 32px' }}
          />
          <div className="absolute bottom-0 right-0 w-[500px] h-[400px] rounded-full bg-brand-accent/8 blur-[100px] pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-brand-accent mb-4 block">Get in touch</span>
              <h2 className="text-3xl md:text-4xl font-display text-white leading-tight tracking-tight mb-4">
                Ready to upskill<br />
                <span className="italic text-brand-accent">your team?</span>
              </h2>
              <p className="text-slate-400 leading-relaxed mb-8">
                All programs are available for onsite corporate delivery, virtual sessions, or customised formats. Contact us to schedule a training for your organisation.
              </p>
              <button className="inline-flex items-center gap-2.5 bg-brand-accent hover:bg-brand-accent/90 active:scale-[0.98] text-white font-bold px-7 py-3.5 rounded-xl transition-all text-sm tracking-wide shadow-lg shadow-brand-accent/20">
                Book This Course
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { Icon: Globe,  label: 'Website',  value: 'www.cygnus.co.ke' },
                { Icon: Mail,   label: 'Email',    value: 'info@cygnus.co.ke' },
                { Icon: Phone,  label: 'Phone',    value: '+254 717 925 881' },
                { Icon: MapPin, label: 'Location', value: 'Nairobi, Kenya' },
              ].map(({ Icon, label, value }) => (
                <div key={label} className="flex items-start gap-3 bg-white/5 border border-white/8 rounded-2xl p-4">
                  <div className="w-8 h-8 rounded-lg bg-brand-accent/15 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-4 h-4 text-brand-accent" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 mb-0.5">{label}</p>
                    <p className="text-sm text-white font-medium">{value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

    </main>
  );
};

export default TrainingCataloguePage;
