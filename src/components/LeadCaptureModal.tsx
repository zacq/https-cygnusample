import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Send, Loader2, CheckCircle } from 'lucide-react';

interface LeadCaptureModalProps {
  isOpen: boolean;
  onClose: () => void;
  source: string;
  courseDetail?: string;
  heading?: string;
  subheading?: string;
  postSuccess?: React.ReactNode;
}

const AIRTABLE_TOKEN = import.meta.env.VITE_BOOKING_AIRTABLE_TOKEN as string;
const LEADS_BASE     = import.meta.env.VITE_BOOKING_AIRTABLE_BASE as string;
const LEADS_TABLE    = import.meta.env.VITE_BOOKING_AIRTABLE_TABLE as string;

const initialForm = {
  fullName: '',
  phone: '',
  email: '',
  company: '',
  message: '',
};

const LeadCaptureModal: React.FC<LeadCaptureModalProps> = ({
  isOpen,
  onClose,
  source,
  courseDetail,
  heading = 'Get in Touch',
  subheading = 'No commitment — just clarity on how we can help.',
  postSuccess,
}) => {
  const [formData, setFormData] = useState(initialForm);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  // Lock body scroll while open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  // Reset form after modal closes
  useEffect(() => {
    if (!isOpen) {
      const t = setTimeout(() => {
        setStatus('idle');
        setFormData(initialForm);
        setErrorMsg('');
      }, 350);
      return () => clearTimeout(t);
    }
  }, [isOpen]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');

    const today = new Date().toISOString().split('T')[0];

    const fields: Record<string, string> = {
      Name:    formData.fullName.trim(),
      Phone:   formData.phone.trim(),
      Email:   formData.email.trim(),
      Company: formData.company.trim(),
      Message: formData.message.trim(),
      Source:  source,
      Status:  'New',
      Date:    today,
    };
    if (courseDetail) {
      fields['Course'] = courseDetail;
    }

    try {
      const res = await fetch(
        `https://api.airtable.com/v0/${LEADS_BASE}/${LEADS_TABLE}`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${AIRTABLE_TOKEN}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ fields }),
        }
      );
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err?.error?.message || 'Submission failed');
      }
      setStatus('success');
    } catch (err: unknown) {
      setStatus('error');
      setErrorMsg(
        err instanceof Error ? err.message : 'Something went wrong. Please try again.'
      );
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="lcm-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            key="lcm-panel"
            initial={{ opacity: 0, scale: 0.94, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 24 }}
            transition={{ type: 'spring', damping: 28, stiffness: 300 }}
            className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden"
            onClick={e => e.stopPropagation()}
          >
            {/* Top gradient accent bar */}
            <div className="h-1.5 bg-gradient-to-r from-brand-navy via-brand-blue to-brand-accent" />

            {/* Close button */}
            <button
              onClick={onClose}
              aria-label="Close"
              className="absolute top-5 right-5 z-10 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-800 transition-all"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="p-7 md:p-9">
              {/* ── SUCCESS STATE ── */}
              {status === 'success' && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-10 text-center"
                >
                  <div className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center mb-5">
                    <CheckCircle className="w-10 h-10 text-emerald-500" />
                  </div>
                  <h2 className="text-2xl font-display font-bold text-brand-navy mb-3">
                    Message Received!
                  </h2>
                  <p className="text-slate-500 max-w-xs leading-relaxed">
                    Thank you for reaching out. Our team will be in touch within 24 hours.
                  </p>
                  {postSuccess && (
                    <div className="mt-6 w-full text-left">
                      {postSuccess}
                    </div>
                  )}
                </motion.div>
              )}

              {/* ── FORM STATE ── */}
              {status !== 'success' && (
                <>
                  {/* Header */}
                  <div className="mb-6">
                    <h2 className="text-2xl font-display font-bold text-brand-navy leading-tight mb-1">
                      {heading}
                    </h2>
                    <p className="text-sm text-slate-500">{subheading}</p>
                  </div>

                  {/* Course info box */}
                  {courseDetail && (
                    <div className="mb-5 flex items-start gap-3 bg-brand-navy/5 border border-brand-navy/15 rounded-xl px-4 py-3">
                      <div className="mt-0.5 w-2 h-2 rounded-full bg-brand-accent flex-shrink-0" />
                      <div>
                        <p className="text-xs font-semibold text-brand-navy uppercase tracking-wider mb-0.5">
                          Selected Course
                        </p>
                        <p className="text-sm text-slate-700 font-medium">{courseDetail}</p>
                      </div>
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Full Name */}
                    <div>
                      <label className="text-sm font-semibold text-slate-700 mb-1.5 block">
                        Full Name <span className="text-brand-blue">*</span>
                      </label>
                      <input
                        required
                        type="text"
                        name="fullName"
                        placeholder="Jane Mwangi"
                        value={formData.fullName}
                        onChange={handleChange}
                        className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-blue/40 focus:border-brand-blue transition-all"
                      />
                    </div>

                    {/* Phone + Email */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-semibold text-slate-700 mb-1.5 block">
                          Phone <span className="text-brand-blue">*</span>
                        </label>
                        <input
                          required
                          type="tel"
                          name="phone"
                          placeholder="+254 7XX XXX XXX"
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-blue/40 focus:border-brand-blue transition-all"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-semibold text-slate-700 mb-1.5 block">
                          Email <span className="text-brand-blue">*</span>
                        </label>
                        <input
                          required
                          type="email"
                          name="email"
                          placeholder="jane@company.com"
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-blue/40 focus:border-brand-blue transition-all"
                        />
                      </div>
                    </div>

                    {/* Company */}
                    <div>
                      <label className="text-sm font-semibold text-slate-700 mb-1.5 block">
                        Company / Organisation
                      </label>
                      <input
                        type="text"
                        name="company"
                        placeholder="Acme Industries Ltd (optional)"
                        value={formData.company}
                        onChange={handleChange}
                        className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-blue/40 focus:border-brand-blue transition-all"
                      />
                    </div>

                    {/* Message */}
                    <div>
                      <label className="text-sm font-semibold text-slate-700 mb-1.5 block">
                        How can we help?
                      </label>
                      <textarea
                        name="message"
                        rows={3}
                        placeholder="Briefly describe your challenge or goal (optional)"
                        value={formData.message}
                        onChange={handleChange}
                        className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-blue/40 focus:border-brand-blue transition-all resize-none"
                      />
                    </div>

                    {/* Error */}
                    {status === 'error' && (
                      <p className="text-red-600 text-sm bg-red-50 border border-red-200 rounded-xl px-4 py-3">
                        {errorMsg}
                      </p>
                    )}

                    {/* Submit */}
                    <button
                      type="submit"
                      disabled={status === 'loading'}
                      className="w-full bg-brand-navy hover:bg-brand-blue disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold py-3.5 rounded-xl shadow-lg shadow-brand-navy/20 flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98]"
                    >
                      {status === 'loading' ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Sending…
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5" />
                          Send Message
                        </>
                      )}
                    </button>

                    <p className="text-center text-xs text-slate-400">
                      We respect your privacy. No spam — ever.
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

export default LeadCaptureModal;
