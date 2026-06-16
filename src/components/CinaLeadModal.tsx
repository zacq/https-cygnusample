import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface CinaLeadModalProps {
  isOpen: boolean;
  onClose: () => void;
  programInterest?: string;
}

const WEBHOOK_URL = import.meta.env.VITE_BOOKING_WEBHOOK_URL as string;

const empty = {
  fullName: '',
  phone: '',
  email: '',
  company: '',
  roleTitle: '',
  message: '',
};

const CinaLeadModal: React.FC<CinaLeadModalProps> = ({
  isOpen,
  onClose,
  programInterest = '',
}) => {
  const [form, setForm] = useState(empty);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      const t = setTimeout(() => {
        setStatus('idle');
        setForm(empty);
        setErrorMsg('');
      }, 320);
      return () => clearTimeout(t);
    }
  }, [isOpen]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');

    const payload = {
      fullName:        form.fullName.trim(),
      phone:           form.phone.trim(),
      email:           form.email.trim(),
      company:         form.company.trim(),
      designation:     form.roleTitle.trim(),
      message:         form.message.trim(),
      source:          'CI Network',
      courseDetail:    programInterest || 'CINA General Interest',
      submittedAt:     new Date().toISOString(),
      pageUrl:         window.location.href,
    };

    try {
      const res = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || data.success === false)
        throw new Error(data.message || 'Submission failed');
      setStatus('success');
    } catch (err: unknown) {
      setStatus('error');
      setErrorMsg(err instanceof Error ? err.message : 'Something went wrong — please try again.');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="cina-modal-bg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="cm-backdrop"
          onClick={onClose}
        >
          <motion.div
            key="cina-modal-panel"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 26, stiffness: 280 }}
            className="cm-panel"
            onClick={e => e.stopPropagation()}
          >
            <div className="cm-accent-bar" />

            <button className="cm-close" onClick={onClose} aria-label="Close">
              ✕
            </button>

            <div className="cm-body">
              {status === 'success' ? (
                <div className="cm-success">
                  <div className="cm-success-icon">✓</div>
                  <h3>Welcome to CINA!</h3>
                  <p>
                    We've received your details and will be in touch within 24 hours.
                    We look forward to connecting with you.
                  </p>
                </div>
              ) : (
                <>
                  <div className="cm-chip">Continuous Improvement Network</div>
                  <h2 className="cm-heading">Join the CI Network</h2>
                  <p className="cm-sub">
                    Tell us about yourself — we'll reach out within 24 hours.
                  </p>

                  {programInterest && (
                    <div className="cm-program-pill">{programInterest}</div>
                  )}

                  <form className="cm-form" onSubmit={handleSubmit}>
                    <div className="cm-field">
                      <label className="cm-label">
                        Full Name <span className="req">*</span>
                      </label>
                      <input
                        required
                        className="cm-input"
                        type="text"
                        name="fullName"
                        placeholder="Jane Mwangi"
                        value={form.fullName}
                        onChange={onChange}
                      />
                    </div>

                    <div className="cm-row">
                      <div className="cm-field">
                        <label className="cm-label">
                          Phone <span className="req">*</span>
                        </label>
                        <input
                          required
                          className="cm-input"
                          type="tel"
                          name="phone"
                          placeholder="+254 7XX XXX XXX"
                          value={form.phone}
                          onChange={onChange}
                        />
                      </div>
                      <div className="cm-field">
                        <label className="cm-label">
                          Email <span className="req">*</span>
                        </label>
                        <input
                          required
                          className="cm-input"
                          type="email"
                          name="email"
                          placeholder="jane@company.com"
                          value={form.email}
                          onChange={onChange}
                        />
                      </div>
                    </div>

                    <div className="cm-row">
                      <div className="cm-field">
                        <label className="cm-label">Company / Organisation</label>
                        <input
                          className="cm-input"
                          type="text"
                          name="company"
                          placeholder="Acme Ltd (optional)"
                          value={form.company}
                          onChange={onChange}
                        />
                      </div>
                      <div className="cm-field">
                        <label className="cm-label">Role / Title</label>
                        <input
                          className="cm-input"
                          type="text"
                          name="roleTitle"
                          placeholder="CEO, Director… (optional)"
                          value={form.roleTitle}
                          onChange={onChange}
                        />
                      </div>
                    </div>

                    <div className="cm-field">
                      <label className="cm-label">How can we help?</label>
                      <textarea
                        className="cm-textarea"
                        name="message"
                        placeholder="Briefly describe your business challenge or goal (optional)"
                        value={form.message}
                        onChange={onChange}
                      />
                    </div>

                    {status === 'error' && (
                      <div className="cm-error">{errorMsg}</div>
                    )}

                    <button
                      type="submit"
                      disabled={status === 'loading'}
                      className="cbtn cbtn-gold cm-submit"
                    >
                      {status === 'loading' ? 'Sending…' : <>Let's Connect <span className="arrow">→</span></>}
                    </button>
                    <p className="cm-privacy">No spam — ever. We respect your privacy.</p>
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

export default CinaLeadModal;
