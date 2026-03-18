import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import {
  ArrowLeft, Calendar, Clock, Tag, Heart, Send, Loader2, CheckCircle,
  ArrowRight, ChevronRight,
} from 'lucide-react';
import { ARTICLES_DATA, type ContentSection } from '../data/articles';
import LeadCaptureModal from '../components/LeadCaptureModal';

// ─── Airtable (comments) ──────────────────────────────────────────────────────
const AIRTABLE_TOKEN = import.meta.env.VITE_BOOKING_AIRTABLE_TOKEN as string;
const LEADS_BASE     = import.meta.env.VITE_BOOKING_AIRTABLE_BASE as string;
const LEADS_TABLE    = import.meta.env.VITE_BOOKING_AIRTABLE_TABLE as string;

// ─── Content renderer ─────────────────────────────────────────────────────────
const RenderSection: React.FC<{
  section: ContentSection;
  onCtaClick: (label: string, source: string) => void;
}> = ({ section, onCtaClick }) => {
  switch (section.type) {
    case 'heading':
      return (
        <h2 className="text-2xl md:text-3xl font-display font-bold text-brand-navy mt-10 mb-4 leading-tight">
          {section.content}
        </h2>
      );
    case 'subheading':
      return (
        <h3 className="text-xl font-bold text-brand-navy mt-7 mb-3 leading-snug">
          {section.content}
        </h3>
      );
    case 'text':
      return (
        <p className="text-slate-600 leading-relaxed mb-5 text-[1.05rem]">
          {section.content}
        </p>
      );
    case 'quote':
      return (
        <blockquote className="my-8 pl-5 border-l-4 border-brand-blue">
          <p className="text-lg text-slate-700 italic leading-relaxed">
            "{section.content}"
          </p>
        </blockquote>
      );
    case 'bullets':
      return (
        <ul className="space-y-2 my-5 ml-2">
          {section.items.map((item, i) => (
            <li key={i} className="flex items-start gap-3 text-slate-600 text-[1.05rem]">
              <span className="mt-1.5 w-2 h-2 rounded-full bg-brand-blue flex-shrink-0" />
              {item}
            </li>
          ))}
        </ul>
      );
    case 'numbered':
      return (
        <ol className="space-y-3 my-5 ml-2">
          {section.items.map((item, i) => (
            <li key={i} className="flex items-start gap-3 text-slate-600 text-[1.05rem]">
              <span className="font-bold text-brand-blue flex-shrink-0 w-6">{i + 1}.</span>
              {item}
            </li>
          ))}
        </ol>
      );
    case 'results':
      return (
        <div className="my-6 space-y-2">
          {section.items.map((item, i) => (
            <div key={i} className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
              <span className="text-slate-700 font-medium">{item}</span>
            </div>
          ))}
        </div>
      );
    case 'image':
      return (
        <figure className="my-8">
          <div className="rounded-2xl overflow-hidden shadow-md">
            <img
              src={section.src}
              alt={section.alt}
              className="w-full h-64 md:h-80 object-cover"
              loading="lazy"
            />
          </div>
          {section.caption && (
            <figcaption className="mt-3 text-center text-sm text-slate-400 italic">
              {section.caption}
            </figcaption>
          )}
        </figure>
      );
    case 'cta':
      return (
        <div className="my-10 bg-brand-navy rounded-2xl px-8 py-8 text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-[0.04] pointer-events-none"
            style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #fff 1px, transparent 0)', backgroundSize: '32px 32px' }} />
          <div className="relative z-10">
            <p className="text-white/70 text-sm uppercase tracking-widest font-bold mb-3">Take Action</p>
            <button
              onClick={() => onCtaClick(section.label, section.source)}
              className="bg-brand-blue hover:bg-brand-accent text-white px-8 py-4 rounded-xl font-bold text-lg transition-all shadow-xl shadow-brand-blue/30 flex items-center gap-2 mx-auto group"
            >
              {section.label}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      );
    default:
      return null;
  }
};

// ─── Comment Section ──────────────────────────────────────────────────────────
const CommentSection: React.FC<{ articleTitle: string }> = ({ articleTitle }) => {
  const [form, setForm] = useState({ name: '', email: '', comment: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch(`https://api.airtable.com/v0/${LEADS_BASE}/${LEADS_TABLE}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${AIRTABLE_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fields: {
            Name:    form.name.trim(),
            Email:   form.email.trim(),
            Message: form.comment.trim(),
            Source:  'Article Comment',
            Course:  articleTitle,
            Status:  'New',
            Date:    new Date().toISOString().split('T')[0],
          },
        }),
      });
      if (!res.ok) throw new Error('Failed');
      setStatus('success');
      setForm({ name: '', email: '', comment: '' });
    } catch {
      setStatus('error');
    }
  };

  const inputClass = 'w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-blue/40 focus:border-brand-blue transition-all';

  return (
    <section className="mt-16 pt-10 border-t border-slate-100">
      <h3 className="text-2xl font-display font-bold text-brand-navy mb-8">
        Leave a Comment
      </h3>

      {status === 'success' ? (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-emerald-50 border border-emerald-200 rounded-2xl px-6 py-5 flex items-center gap-3 text-emerald-700"
        >
          <CheckCircle className="w-5 h-5 flex-shrink-0" />
          <span className="font-medium">Thank you for your comment! We'll review and respond shortly.</span>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-semibold text-slate-700 mb-1.5 block">Comment *</label>
            <textarea
              required
              name="comment"
              rows={4}
              placeholder="Share your thoughts, questions, or experiences…"
              value={form.comment}
              onChange={handleChange}
              className={`${inputClass} resize-none`}
            />
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-semibold text-slate-700 mb-1.5 block">Name *</label>
              <input
                required
                type="text"
                name="name"
                placeholder="Your name"
                value={form.name}
                onChange={handleChange}
                className={inputClass}
              />
            </div>
            <div>
              <label className="text-sm font-semibold text-slate-700 mb-1.5 block">Email *</label>
              <input
                required
                type="email"
                name="email"
                placeholder="your@email.com"
                value={form.email}
                onChange={handleChange}
                className={inputClass}
              />
            </div>
          </div>

          {status === 'error' && (
            <p className="text-red-600 text-sm bg-red-50 border border-red-200 rounded-xl px-4 py-3">
              Something went wrong. Please try again.
            </p>
          )}

          <button
            type="submit"
            disabled={status === 'loading'}
            className="bg-brand-navy hover:bg-brand-blue disabled:opacity-60 text-white px-8 py-3.5 rounded-xl font-bold flex items-center gap-2 transition-all"
          >
            {status === 'loading'
              ? <><Loader2 className="w-4 h-4 animate-spin" /> Submitting…</>
              : <><Send className="w-4 h-4" /> Post Comment</>
            }
          </button>
          <p className="text-xs text-slate-400">Your email will not be published.</p>
        </form>
      )}
    </section>
  );
};

// ─── Main Page ────────────────────────────────────────────────────────────────
const ArticlePage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const article = ARTICLES_DATA.find(a => a.slug === slug);

  const [modal, setModal] = useState<{ open: boolean; label: string; source: string }>(
    { open: false, label: '', source: '' }
  );
  const openCta = (label: string, source: string) =>
    setModal({ open: true, label, source });

  useEffect(() => { window.scrollTo(0, 0); }, [slug]);

  if (!article) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white px-6 text-center">
        <h1 className="text-4xl font-display font-bold text-brand-navy mb-4">Article Not Found</h1>
        <p className="text-slate-500 mb-8">The article you're looking for doesn't exist or has been moved.</p>
        <Link to="/blog" className="bg-brand-navy text-white px-8 py-3.5 rounded-xl font-bold hover:bg-brand-blue transition-all">
          ← Back to Insights
        </Link>
      </div>
    );
  }

  const related = ARTICLES_DATA.filter(a => a.slug !== slug && a.category === article.category).slice(0, 3);
  const fallbackRelated = ARTICLES_DATA.filter(a => a.slug !== slug).slice(0, 3 - related.length);
  const relatedArticles = [...related, ...fallbackRelated].slice(0, 3);

  return (
    <div className="min-h-screen bg-white">
      {/* ── Hero ── */}
      <section className="bg-brand-navy pt-32 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #fff 1px, transparent 0)', backgroundSize: '40px 40px' }} />
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-brand-blue/10 rounded-full blur-[80px] pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto px-6">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-white/50 mb-8">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link to="/blog" className="hover:text-white transition-colors">Insights</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-white/70 truncate max-w-[200px]">{article.title}</span>
          </div>

          {/* Category badge */}
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-blue/20 border border-brand-blue/30 text-brand-accent text-xs font-bold uppercase tracking-widest mb-5">
            <Tag className="w-3 h-3" />
            {article.category}
          </span>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-3xl md:text-5xl font-display font-bold text-white leading-tight mb-6"
          >
            {article.title}
          </motion.h1>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-5 text-sm text-white/55">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />{article.date}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" />{article.readTime}
            </span>
            <span className="flex items-center gap-1.5">
              <Heart className="w-4 h-4 text-rose-400" />Cygnus Consulting
            </span>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-5">
            {article.tags.map(tag => (
              <span key={tag} className="px-3 py-1 rounded-full bg-white/10 text-white/70 text-xs font-medium">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Hero Image ── */}
      <div className="max-w-4xl mx-auto px-6 -mt-1">
        <div className="rounded-b-3xl overflow-hidden shadow-2xl">
          <img
            src={article.heroImage}
            alt={article.title}
            className="w-full h-64 md:h-96 object-cover"
          />
        </div>
      </div>

      {/* ── Article Body ── */}
      <article className="max-w-4xl mx-auto px-6 py-14">
        <div className="max-w-3xl mx-auto">
          {article.sections.map((section, i) => (
            <RenderSection key={i} section={section} onCtaClick={openCta} />
          ))}
        </div>

        {/* Comment Section */}
        <div className="max-w-3xl mx-auto">
          <CommentSection articleTitle={article.title} />
        </div>
      </article>

      {/* ── Related Articles ── */}
      {relatedArticles.length > 0 && (
        <section className="bg-slate-50 py-16">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl font-display font-bold text-brand-navy">Related Insights</h3>
              <Link to="/blog" className="text-brand-blue font-semibold text-sm flex items-center gap-1 hover:text-brand-navy transition-colors">
                View All <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedArticles.map(rel => (
                <Link
                  key={rel.slug}
                  to={`/blog/${rel.slug}`}
                  className="group bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl hover:border-brand-blue/20 transition-all flex flex-col"
                >
                  <div className="overflow-hidden h-44">
                    <img
                      src={rel.heroImage}
                      alt={rel.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <span className="text-xs font-bold text-brand-blue uppercase tracking-wider mb-2">{rel.category}</span>
                    <h4 className="text-base font-bold text-brand-navy leading-snug mb-3 group-hover:text-brand-blue transition-colors line-clamp-2">
                      {rel.title}
                    </h4>
                    <div className="mt-auto flex items-center gap-1 text-xs text-slate-400">
                      <Clock className="w-3 h-3" />{rel.readTime}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── CTA Banner ── */}
      <section className="py-16 bg-brand-navy">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-brand-accent font-bold uppercase tracking-widest text-sm mb-3">Ready to Transform?</p>
          <h2 className="text-3xl md:text-4xl font-display text-white mb-6">
            Let's Build Operational Excellence Together
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => openCta('Book a Strategy Call', `Article: ${article.title}`)}
              className="bg-brand-blue hover:bg-brand-accent text-white px-8 py-4 rounded-xl font-bold transition-all shadow-xl shadow-brand-blue/30 flex items-center gap-2 group"
            >
              Book a Strategy Call
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <Link
              to="/blog"
              className="bg-white/10 hover:bg-white/20 border border-white/20 text-white px-8 py-4 rounded-xl font-bold transition-all flex items-center gap-1.5"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Insights
            </Link>
          </div>
        </div>
      </section>

      {/* Modal */}
      <LeadCaptureModal
        isOpen={modal.open}
        onClose={() => setModal(s => ({ ...s, open: false }))}
        source={modal.source}
        heading={modal.label || 'Get in Touch'}
        subheading="Our team will reach out within 24 hours."
      />
    </div>
  );
};

export default ArticlePage;
