import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Send, Calendar, Clock, Loader2, CheckCircle, Building2 } from 'lucide-react';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AIRTABLE_TOKEN = import.meta.env.VITE_BOOKING_AIRTABLE_TOKEN as string;
const LEADS_BASE     = import.meta.env.VITE_BOOKING_AIRTABLE_BASE as string;
const LEADS_TABLE    = import.meta.env.VITE_BOOKING_AIRTABLE_TABLE as string;

const initialForm = {
  firstName: '', lastName: '', companyName: '',
  phoneNumber: '', email: '', date: '', time: '',
};

const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState(initialForm);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      const t = setTimeout(() => { setStatus('idle'); setFormData(initialForm); }, 350);
      return () => clearTimeout(t);
    }
  }, [isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');

    try {
      const res = await fetch(`https://api.airtable.com/v0/${LEADS_BASE}/${LEADS_TABLE}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${AIRTABLE_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fields: {
            Name:             `${formData.firstName} ${formData.lastName}`.trim(),
            Phone:            formData.phoneNumber,
            Email:            formData.email,
            Company:          formData.companyName,
            'Preferred Date': formData.date,
            'Preferred Time': formData.time,
            Status:           'New',
            Source:           'Website Form',
          },
        }),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err?.error?.message || 'Submission failed');
      }
      setStatus('success');
      setTimeout(() => onClose(), 3000);
    } catch (err: unknown) {
      setStatus('error');
      setErrorMsg(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
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
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            key="modal"
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 20 }}
            transition={{ type: 'spring', damping: 28, stiffness: 300 }}
            className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden"
            onClick={e => e.stopPropagation()}
          >
            {/* Top accent bar */}
            <div className="h-1.5 bg-gradient-to-r from-brand-navy via-brand-blue to-brand-accent" />

            {/* Close */}
            <button
              onClick={onClose}
              aria-label="Close"
              className="absolute top-5 right-5 z-10 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-800 transition-all"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="p-8 md:p-10">
              {/* Success */}
              {status === 'success' && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-14 text-center"
                >
                  <div className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center mb-6">
                    <CheckCircle className="w-10 h-10 text-emerald-500" />
                  </div>
                  <h2 className="text-2xl font-display font-bold text-brand-navy mb-3">Request Received!</h2>
                  <p className="text-slate-500 max-w-sm">
                    Thank you. Our team will reach out within 24 hours to confirm your consultation.
                  </p>
                </motion.div>
              )}

              {/* Form */}
              {status !== 'success' && (
                <>
                  <div className="mb-8">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 rounded-xl bg-brand-navy flex items-center justify-center">
                        <Building2 className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-display font-bold text-brand-navy leading-tight">
                          Book a Strategy Call
                        </h2>
                        <p className="text-sm text-slate-500">Free consultation — no commitments</p>
                      </div>
                    </div>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-semibold text-slate-700 mb-1.5 block">First Name *</label>
                        <input
                          required type="text" name="firstName" placeholder="John"
                          value={formData.firstName} onChange={handleChange}
                          className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-blue/40 focus:border-brand-blue transition-all"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-semibold text-slate-700 mb-1.5 block">Last Name *</label>
                        <input
                          required type="text" name="lastName" placeholder="Doe"
                          value={formData.lastName} onChange={handleChange}
                          className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-blue/40 focus:border-brand-blue transition-all"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-semibold text-slate-700 mb-1.5 block">Company *</label>
                        <input
                          required type="text" name="companyName" placeholder="Acme Industries"
                          value={formData.companyName} onChange={handleChange}
                          className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-blue/40 focus:border-brand-blue transition-all"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-semibold text-slate-700 mb-1.5 block">Phone *</label>
                        <input
                          required type="tel" name="phoneNumber" placeholder="+254 7XX XXX XXX"
                          value={formData.phoneNumber} onChange={handleChange}
                          className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-blue/40 focus:border-brand-blue transition-all"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-semibold text-slate-700 mb-1.5 block">Email Address *</label>
                      <input
                        required type="email" name="email" placeholder="john@company.com"
                        value={formData.email} onChange={handleChange}
                        className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-blue/40 focus:border-brand-blue transition-all"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-semibold text-slate-700 mb-1.5 block">Preferred Date *</label>
                        <div className="relative">
                          <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                          <input
                            required type="date" name="date"
                            value={formData.date} onChange={handleChange}
                            min={new Date().toISOString().split('T')[0]}
                            className="w-full border border-slate-200 rounded-xl pl-10 pr-4 py-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-blue/40 focus:border-brand-blue transition-all"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="text-sm font-semibold text-slate-700 mb-1.5 block">Preferred Time *</label>
                        <div className="relative">
                          <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                          <select
                            required name="time"
                            value={formData.time} onChange={handleChange}
                            className="w-full border border-slate-200 rounded-xl pl-10 pr-4 py-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-blue/40 focus:border-brand-blue transition-all appearance-none bg-white"
                          >
                            <option value="" disabled>Select time</option>
                            <option value="morning">Morning (9 AM – 12 PM)</option>
                            <option value="afternoon">Afternoon (12 PM – 5 PM)</option>
                            <option value="evening">Evening (5 PM – 8 PM)</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    {status === 'error' && (
                      <p className="text-red-600 text-sm bg-red-50 border border-red-200 rounded-xl px-4 py-3">
                        ⚠️ {errorMsg}
                      </p>
                    )}

                    <button
                      type="submit"
                      disabled={status === 'loading'}
                      className="w-full bg-brand-navy hover:bg-brand-blue disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl shadow-lg shadow-brand-navy/20 flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98]"
                    >
                      {status === 'loading'
                        ? <><Loader2 className="w-5 h-5 animate-spin" /> Sending Request...</>
                        : <><Send className="w-5 h-5" /> Request Consultation</>
                      }
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

export default BookingModal;
