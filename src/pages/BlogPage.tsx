import React, { useState, useMemo, useEffect } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import {
  ArrowRight, Search, Heart, Download, Mail, BookOpen,
  ChevronRight, ChevronLeft, ShieldCheck, FileText, Clock, Calendar, BarChart2,
} from 'lucide-react';

// ─── Types ────────────────────────────────────────────────────────────────────
interface Article {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  image: string;
  date: string;
  readTime: string;
  likes: number;
  tags: string[];
  featured?: boolean;
}

// ─── Static Data ──────────────────────────────────────────────────────────────
const CATEGORIES = [
  'All',
  'Operational Excellence',
  'Safety & Risk Management',
  'Construction Safety',
  'Lean & Kaizen',
  'Sustainability',
  'Compliance & Standards',
];

const ARTICLES: Article[] = [
  {
    id: 1,
    slug: 'building-future-safety-operational-excellence',
    title: 'Building the Future: Why Safety and Operational Excellence Matter',
    excerpt: 'Discover how effective safety systems and operational excellence frameworks improve productivity, profitability, and long-term business performance.',
    category: 'Safety & Risk Management',
    image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=1200&q=80',
    date: 'March 5, 2026',
    readTime: '8 min read',
    likes: 129,
    tags: ['Safety', 'Operational Excellence', 'Lean Management'],
    featured: true,
  },
  {
    id: 2,
    slug: 'start-thriving-operational-excellence',
    title: 'Start Thriving with Operational Excellence in Your Business Today',
    excerpt: 'Discover how Kaizen can cut inventory costs by 30% and improve lead times by 40% while strengthening operational planning.',
    category: 'Operational Excellence',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80',
    date: 'February 28, 2026',
    readTime: '6 min read',
    likes: 94,
    tags: ['Kaizen', 'Operational Excellence', 'Process Improvement'],
  },
  {
    id: 3,
    slug: '5s-methodology-manufacturing-excellence',
    title: '5S Methodology: The Foundation of Manufacturing Excellence',
    excerpt: 'Implementing 5S is not just about tidiness — it is the bedrock of a high-performance operational culture that drives lasting results.',
    category: 'Lean & Kaizen',
    image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&q=80',
    date: 'February 20, 2026',
    readTime: '5 min read',
    likes: 87,
    tags: ['5S Methodology', 'Lean Management', 'Manufacturing'],
  },
  {
    id: 4,
    slug: 'construction-safety-risk-assessment-guide',
    title: 'Construction Safety: A Complete Risk Assessment Guide',
    excerpt: 'A step-by-step framework for identifying, evaluating, and mitigating workplace hazards on construction sites across East Africa.',
    category: 'Construction Safety',
    image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&q=80',
    date: 'February 10, 2026',
    readTime: '7 min read',
    likes: 112,
    tags: ['Construction Safety', 'Risk Management', 'Safety Training'],
  },
  {
    id: 5,
    slug: 'iso-45001-what-your-organization-needs',
    title: 'ISO 45001: What Your Organization Needs to Know in 2026',
    excerpt: 'The international standard for occupational health and safety management is more relevant than ever. Here is what compliance requires.',
    category: 'Compliance & Standards',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80',
    date: 'January 30, 2026',
    readTime: '9 min read',
    likes: 76,
    tags: ['ISO 45001', 'Compliance', 'Safety Management'],
  },
  {
    id: 6,
    slug: 'lean-management-east-african-manufacturers',
    title: 'Lean Management for East African Manufacturers',
    excerpt: 'How local manufacturers are leveraging lean principles to compete globally — reducing waste, cutting costs, and improving quality.',
    category: 'Lean & Kaizen',
    image: 'https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=800&q=80',
    date: 'January 20, 2026',
    readTime: '6 min read',
    likes: 103,
    tags: ['Lean Management', 'Manufacturing', 'East Africa'],
  },
  {
    id: 7,
    slug: 'sustainability-operations-business-case',
    title: 'The Business Case for Sustainability in Operations',
    excerpt: 'Sustainable operations are not just good ethics — they deliver measurable ROI through reduced waste, energy savings, and regulatory compliance.',
    category: 'Sustainability',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80',
    date: 'January 10, 2026',
    readTime: '7 min read',
    likes: 68,
    tags: ['Sustainability', 'ESG', 'Operational Excellence'],
  },
  {
    id: 8,
    slug: 'working-at-heights-best-practices',
    title: 'Working at Heights: Best Practices for Construction Sites',
    excerpt: 'Falls remain the leading cause of construction fatalities. A structured WAH program can prevent accidents and protect your workforce.',
    category: 'Construction Safety',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80',
    date: 'December 28, 2025',
    readTime: '5 min read',
    likes: 91,
    tags: ['Work at Height', 'Safety Training', 'Construction Safety'],
  },
  {
    id: 9,
    slug: 'hoshin-kanri-strategy-deployment',
    title: 'Hoshin Kanri: Strategy Deployment That Actually Works',
    excerpt: 'Most strategies fail at execution. Hoshin Kanri aligns your entire organization around key objectives with measurable results.',
    category: 'Operational Excellence',
    image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&q=80',
    date: 'December 15, 2025',
    readTime: '8 min read',
    likes: 58,
    tags: ['Hoshin Kanri', 'Strategy', 'Operational Excellence'],
  },
];

const RESOURCES: Array<{ title: string; bg: string; Icon: React.FC<{ className?: string }> }> = [
  { title: 'Operational Excellence Guide',  bg: 'bg-brand-blue',  Icon: BookOpen   },
  { title: 'Construction Safety Checklist', bg: 'bg-emerald-600', Icon: ShieldCheck },
  { title: 'Lean Management Framework',     bg: 'bg-violet-600',  Icon: BarChart2  },
  { title: 'Risk Assessment Template',      bg: 'bg-amber-500',   Icon: FileText   },
];

const SIDEBAR_TAGS = [
  '5S Methodology', 'Lean Management', 'Operational Excellence',
  'Safety', 'Work at Height', 'Safety Training', 'Kaizen', 'ISO 45001',
];

const ARTICLES_PER_PAGE = 6;

// ─── ArticleCard ──────────────────────────────────────────────────────────────
const ArticleCard: React.FC<{ article: Article; index: number }> = ({ article, index }) => (
  <motion.article
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.07, duration: 0.5 }}
    className="group bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl hover:border-brand-blue/20 transition-all flex flex-col"
  >
    {/* Image */}
    <div className="relative overflow-hidden aspect-video flex-shrink-0">
      <img
        src={article.image}
        alt={article.title}
        loading="lazy"
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <div className="absolute top-4 left-4">
        <span className="px-3 py-1 rounded-full bg-brand-navy/85 text-white text-xs font-bold uppercase tracking-wider backdrop-blur-sm">
          {article.category}
        </span>
      </div>
    </div>

    {/* Content */}
    <div className="p-6 flex flex-col flex-1">
      <div className="flex items-center gap-3 text-xs text-slate-400 mb-3">
        <span className="flex items-center gap-1">
          <Calendar className="w-3.5 h-3.5" />{article.date}
        </span>
        <span className="flex items-center gap-1">
          <Clock className="w-3.5 h-3.5" />{article.readTime}
        </span>
      </div>
      <h3 className="text-[22px] font-bold text-brand-navy mb-3 leading-snug line-clamp-2 group-hover:text-brand-blue transition-colors">
        {article.title}
      </h3>
      <p className="text-sm text-slate-500 leading-relaxed mb-5 line-clamp-3 flex-1">
        {article.excerpt}
      </p>
      <div className="flex items-center justify-between mt-auto pt-1">
        <a
          href={`/blog/${article.slug}`}
          onClick={e => e.preventDefault()}
          className="text-sm font-bold text-brand-blue hover:text-brand-navy transition-colors flex items-center gap-1"
        >
          → READ INSIGHT
        </a>
        <span className="flex items-center gap-1.5 text-xs text-slate-400">
          <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400" />
          {article.likes}
        </span>
      </div>
    </div>
  </motion.article>
);

// ─── BlogPage ─────────────────────────────────────────────────────────────────
const BlogPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery,    setSearchQuery]    = useState('');
  const [currentPage,    setCurrentPage]    = useState(1);
  const [newsletter,     setNewsletter]     = useState({ name: '', email: '' });
  const [newsletterSent, setNewsletterSent] = useState(false);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const openBooking = () => window.dispatchEvent(new CustomEvent('open-booking-modal'));

  const featuredArticle = ARTICLES.find(a => a.featured)!;
  const gridArticles    = ARTICLES.filter(a => !a.featured);

  const filtered = useMemo(() => {
    const q = searchQuery.toLowerCase();
    return gridArticles.filter(a => {
      const matchCat    = activeCategory === 'All' || a.category === activeCategory;
      const matchSearch = !q || a.title.toLowerCase().includes(q) || a.tags.some(t => t.toLowerCase().includes(q));
      return matchCat && matchSearch;
    });
  }, [activeCategory, searchQuery]);

  const totalPages = Math.ceil(filtered.length / ARTICLES_PER_PAGE);
  const paginated  = filtered.slice((currentPage - 1) * ARTICLES_PER_PAGE, currentPage * ARTICLES_PER_PAGE);

  const setCategory = (cat: string) => { setActiveCategory(cat); setCurrentPage(1); };
  const setSearch   = (q: string)   => { setSearchQuery(q);      setCurrentPage(1); };

  const popularArticles = [...ARTICLES].sort((a, b) => b.likes - a.likes).slice(0, 3);

  return (
    <div className="min-h-screen bg-white">
      {/* ── Hero ──────────────────────────────────────────────────────────────── */}
      <section className="bg-brand-navy pt-36 pb-20 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #fff 1px, transparent 0)', backgroundSize: '40px 40px' }}
        />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-blue/15 rounded-full blur-[80px] pointer-events-none" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block px-4 py-1.5 rounded-full bg-brand-blue/20 border border-brand-blue/30 text-brand-accent text-xs font-bold uppercase tracking-widest mb-6"
          >
            Cygnus Insights
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-display text-white mb-6 max-w-4xl mx-auto leading-tight"
          >
            Insights on Operational Excellence,{' '}
            <span className="italic text-brand-accent">Safety, and Business Performance</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-white/65 mb-10 max-w-2xl mx-auto"
          >
            Explore expert perspectives from Cygnus Consulting on improving operational efficiency,
            safety compliance, and sustainable business performance.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <button
              onClick={openBooking}
              className="bg-brand-blue hover:bg-brand-accent text-white px-8 py-4 rounded-xl font-bold transition-all shadow-xl shadow-brand-blue/30 flex items-center gap-2 group"
            >
              Request Expert Consultation
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <Link
              to="/training/business-excellence"
              className="bg-white/10 hover:bg-white/[0.18] border border-white/20 text-white px-8 py-4 rounded-xl font-bold transition-all"
            >
              Explore Training Programs
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── Authority Strip ───────────────────────────────────────────────────── */}
      <div className="bg-slate-50 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-wrap justify-center gap-10 text-sm">
          {[
            { stat: '15+',  label: 'Years Experience' },
            { stat: '50+', label: 'Organizations Supported' },
            { stat: 'ISO',  label: 'Implementation Specialists' },
          ].map(({ stat, label }) => (
            <div key={label} className="flex items-center gap-2 text-slate-500">
              <span className="font-bold text-brand-navy">{stat}</span>
              <span>{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Featured Insight ──────────────────────────────────────────────────── */}
      <section className="py-16 max-w-7xl mx-auto px-6">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-1 h-6 bg-brand-blue rounded-full" />
          <p className="text-sm font-bold uppercase tracking-widest text-slate-500">Featured Insight</p>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="group grid lg:grid-cols-2 rounded-3xl overflow-hidden border border-slate-100 shadow-lg hover:shadow-2xl transition-all"
        >
          {/* Image */}
          <div className="relative overflow-hidden min-h-[280px] lg:min-h-[400px]">
            <img
              src={featuredArticle.image}
              alt={featuredArticle.title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/30 to-transparent" />
            <div className="absolute top-6 left-6">
              <span className="px-3 py-1 rounded-full bg-brand-navy/85 text-white text-xs font-bold uppercase tracking-wider backdrop-blur-sm">
                {featuredArticle.category}
              </span>
            </div>
          </div>
          {/* Content */}
          <div className="p-10 lg:p-14 flex flex-col justify-center bg-white">
            <div className="flex items-center gap-3 text-xs text-slate-400 mb-4">
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />{featuredArticle.date}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />{featuredArticle.readTime}
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-brand-navy mb-5 leading-tight">
              {featuredArticle.title}
            </h2>
            <p className="text-slate-500 leading-relaxed mb-8 text-lg">{featuredArticle.excerpt}</p>
            <div className="flex items-center justify-between">
              <a
                href={`/blog/${featuredArticle.slug}`}
                onClick={e => e.preventDefault()}
                className="inline-flex items-center gap-2 bg-brand-navy hover:bg-brand-blue text-white px-7 py-3.5 rounded-xl font-bold text-sm transition-all group/btn"
              >
                Read Insight
                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
              </a>
              <span className="flex items-center gap-1.5 text-sm text-slate-400">
                <Heart className="w-4 h-4 text-rose-400 fill-rose-400" />
                {featuredArticle.likes}
              </span>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ── Latest Insights Grid + Sidebar ────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 pb-20">
        <div className="lg:grid lg:grid-cols-[1fr_300px] gap-12 items-start">

          {/* ── Left: Filters + Grid + Pagination ──────────────────────────────── */}
          <div>
            {/* Topic Filters */}
            <div className="mb-10">
              <h3 className="text-sm font-bold uppercase tracking-widest text-slate-500 mb-4">
                Explore Insights by Topic
              </h3>
              <div className="flex flex-wrap gap-2">
                {CATEGORIES.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setCategory(cat)}
                    className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                      activeCategory === cat
                        ? 'bg-brand-navy text-white shadow-md'
                        : 'bg-slate-100 text-slate-600 hover:bg-brand-blue/10 hover:text-brand-blue'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Article Grid */}
            {paginated.length > 0 ? (
              <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-7">
                {paginated.map((article, i) => (
                  <ArticleCard key={article.id} article={article} index={i} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 text-slate-400">
                <p className="text-lg font-medium mb-3">No insights found.</p>
                <button
                  onClick={() => { setCategory('All'); setSearch(''); }}
                  className="text-brand-blue text-sm font-semibold hover:underline"
                >
                  Clear filters
                </button>
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-12">
                <button
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="w-9 h-9 rounded-lg border border-slate-200 flex items-center justify-center text-slate-600 hover:border-brand-blue hover:text-brand-blue disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-9 h-9 rounded-lg text-sm font-bold transition-all ${
                      currentPage === page
                        ? 'bg-brand-navy text-white shadow-md'
                        : 'border border-slate-200 text-slate-600 hover:border-brand-blue hover:text-brand-blue'
                    }`}
                  >
                    {page}
                  </button>
                ))}
                <button
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="w-9 h-9 rounded-lg border border-slate-200 flex items-center justify-center text-slate-600 hover:border-brand-blue hover:text-brand-blue disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          {/* ── Sidebar ────────────────────────────────────────────────────────── */}
          <aside className="mt-16 lg:mt-0 space-y-7 lg:sticky lg:top-28">
            {/* Search */}
            <div className="bg-slate-50 rounded-2xl p-6">
              <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">Search</h4>
              <div className="relative">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Search insights..."
                  value={searchQuery}
                  onChange={e => setSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-blue/40 focus:border-brand-blue transition-all"
                />
              </div>
            </div>

            {/* Topic Tags */}
            <div className="bg-slate-50 rounded-2xl p-6">
              <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">Topic Tags</h4>
              <div className="flex flex-wrap gap-2">
                {SIDEBAR_TAGS.map(tag => (
                  <button
                    key={tag}
                    onClick={() => setSearch(tag)}
                    className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-semibold text-slate-600 hover:bg-brand-blue/10 hover:text-brand-blue hover:border-brand-blue/30 transition-all"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            {/* Popular Insights */}
            <div className="bg-slate-50 rounded-2xl p-6">
              <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-5">Popular Insights</h4>
              <div className="space-y-5">
                {popularArticles.map(article => (
                  <a
                    key={article.id}
                    href={`/blog/${article.slug}`}
                    onClick={e => e.preventDefault()}
                    className="flex gap-3 group"
                  >
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-16 h-12 object-cover rounded-xl flex-shrink-0"
                    />
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-slate-800 group-hover:text-brand-blue transition-colors leading-snug line-clamp-2">
                        {article.title}
                      </p>
                      <span className="flex items-center gap-1 mt-1 text-xs text-slate-400">
                        <Heart className="w-3 h-3 text-rose-400 fill-rose-400" />
                        {article.likes}
                      </span>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Consultation CTA */}
            <div className="bg-brand-navy rounded-2xl p-7 text-center">
              <div className="w-12 h-12 rounded-xl bg-brand-blue/20 flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-6 h-6 text-brand-accent" />
              </div>
              <h4 className="text-white font-bold text-lg mb-2">Need Expert Guidance?</h4>
              <p className="text-slate-400 text-sm mb-5 leading-relaxed">
                Let our consultants help you implement world-class operational systems.
              </p>
              <button
                onClick={openBooking}
                className="w-full bg-brand-blue hover:bg-brand-accent text-white py-3 rounded-xl font-bold text-sm transition-all"
              >
                Request a Consultation
              </button>
            </div>
          </aside>
        </div>
      </section>

      {/* ── Consulting Lead Capture ───────────────────────────────────────────── */}
      <section className="bg-brand-navy py-20 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #fff 1px, transparent 0)', backgroundSize: '40px 40px' }}
        />
        <div className="absolute top-0 right-1/4 w-80 h-80 bg-brand-accent/10 rounded-full blur-[70px] pointer-events-none" />
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-display text-white mb-5 leading-tight"
          >
            Need Help Improving{' '}
            <span className="italic text-brand-accent">Operational Performance?</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-white/65 text-lg mb-10 max-w-2xl mx-auto"
          >
            Our consultants help organizations implement safety systems, improve operational
            efficiency, and meet regulatory compliance.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <button
              onClick={openBooking}
              className="bg-brand-blue hover:bg-brand-accent text-white px-9 py-4 rounded-xl font-bold transition-all shadow-xl shadow-brand-blue/30 flex items-center gap-2 group"
            >
              Schedule a Consultation
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <a
              href="#contact"
              className="bg-white/10 hover:bg-white/[0.18] border border-white/20 text-white px-9 py-4 rounded-xl font-bold transition-all"
            >
              Contact Our Experts
            </a>
          </motion.div>
        </div>
      </section>

      {/* ── Knowledge Resources ───────────────────────────────────────────────── */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-brand-blue font-bold uppercase tracking-widest text-sm mb-3"
            >
              Free Resources
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl font-display text-brand-navy"
            >
              Operational Excellence Resources
            </motion.h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {RESOURCES.map((res, i) => (
              <motion.div
                key={res.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-2xl p-7 border border-slate-100 shadow-sm hover:shadow-lg hover:border-brand-blue/20 transition-all group text-center"
              >
                <div className={`w-14 h-14 ${res.bg} rounded-2xl flex items-center justify-center mx-auto mb-5`}>
                  <res.Icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="font-bold text-brand-navy text-base mb-5 leading-snug">{res.title}</h3>
                <button
                  onClick={() => alert(`"${res.title}" — PDF download coming soon.`)}
                  className="inline-flex items-center gap-2 text-sm font-bold text-brand-blue hover:text-brand-navy transition-colors"
                >
                  <Download className="w-4 h-4" />
                  Download Resource
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Newsletter ────────────────────────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-brand-navy rounded-3xl p-10 md:p-14 text-center"
          >
            <div className="w-14 h-14 rounded-2xl bg-brand-blue/20 flex items-center justify-center mx-auto mb-6">
              <Mail className="w-7 h-7 text-brand-accent" />
            </div>
            <h2 className="text-3xl font-display text-white mb-3 font-bold">
              Stay Updated with Industry Insights
            </h2>
            <p className="text-white/60 mb-8 leading-relaxed">
              Receive expert insights on safety, operational excellence, and business performance.
            </p>

            {newsletterSent ? (
              <div className="bg-emerald-500/20 border border-emerald-500/30 rounded-2xl px-6 py-5 text-emerald-400 font-semibold">
                ✓ You're subscribed! Welcome to the Cygnus insights community.
              </div>
            ) : (
              <form
                onSubmit={e => { e.preventDefault(); setNewsletterSent(true); }}
                className="space-y-3"
              >
                <input
                  required
                  type="text"
                  placeholder="Your name"
                  value={newsletter.name}
                  onChange={e => setNewsletter(p => ({ ...p, name: e.target.value }))}
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3.5 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-brand-blue/50 text-sm"
                />
                <input
                  required
                  type="email"
                  placeholder="Your email address"
                  value={newsletter.email}
                  onChange={e => setNewsletter(p => ({ ...p, email: e.target.value }))}
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3.5 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-brand-blue/50 text-sm"
                />
                <button
                  type="submit"
                  className="w-full bg-brand-blue hover:bg-brand-accent text-white py-4 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2"
                >
                  <Mail className="w-4 h-4" />
                  Subscribe to Insights
                </button>
              </form>
            )}
            <p className="text-white/40 text-xs mt-4">No spam. Unsubscribe anytime.</p>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default BlogPage;
