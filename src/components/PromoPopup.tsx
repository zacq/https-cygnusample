import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, ChevronUp, Download, CalendarDays, Clock4, Award, X } from 'lucide-react';
import { getNextSession } from '../data/ncaSessions';
import LeadCaptureModal from './LeadCaptureModal';

interface PromoPopupProps {
  /** id of the hero section element — popup appears once it leaves viewport */
  heroId?: string;
}

const PromoPopup: React.FC<PromoPopupProps> = ({ heroId = 'page-hero' }) => {
  const [visible, setVisible]       = useState(false);
  const [collapsed, setCollapsed]   = useState(false);
  const [dismissed, setDismissed]   = useState(false);
  const [modalOpen, setModalOpen]   = useState(false);
  const observerRef                  = useRef<IntersectionObserver | null>(null);

  const nextSession = getNextSession();

  useEffect(() => {
    const el = document.getElementById(heroId);
    if (!el) return;

    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          setVisible(true);
        } else {
          setVisible(false);
        }
      },
      { threshold: 0.1 }
    );

    observerRef.current.observe(el);
    return () => observerRef.current?.disconnect();
  }, [heroId, dismissed]);

  if (dismissed) return null;

  return (
    <>
      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ type: 'spring', damping: 26, stiffness: 260 }}
            className="fixed bottom-6 right-6 z-[90] w-[min(680px,calc(100vw-3rem))]"
          >
            {/* Card */}
            <div className="rounded-2xl bg-brand-navy/85 backdrop-blur-md border border-white/10 shadow-2xl overflow-hidden">
              {/* Top accent bar */}
              <div className="h-1 bg-gradient-to-r from-brand-blue via-brand-accent to-brand-blue" />

              {/* Header row */}
              <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/10">
                <span className="text-xs font-bold text-brand-accent uppercase tracking-widest">
                  Cygnus Training
                </span>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setCollapsed(c => !c)}
                    aria-label={collapsed ? 'Expand' : 'Collapse'}
                    className="w-7 h-7 rounded-full flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-all"
                  >
                    {collapsed ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                  <button
                    onClick={() => setDismissed(true)}
                    aria-label="Dismiss"
                    className="w-7 h-7 rounded-full flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-all"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Body — collapses */}
              <AnimatePresence initial={false}>
                {!collapsed && (
                  <motion.div
                    key="body"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <div className="grid sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-white/10 p-4 gap-4 sm:gap-0">

                      {/* ── LHS: Next NCA Session ── */}
                      <div className="sm:pr-4 flex flex-col gap-3">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-lg bg-brand-blue/30 flex items-center justify-center">
                            <Award className="w-4 h-4 text-brand-accent" />
                          </div>
                          <p className="text-xs font-bold text-white uppercase tracking-wider">Next NCA Session</p>
                        </div>

                        {nextSession ? (
                          <>
                            <p className="text-sm font-semibold text-white leading-snug line-clamp-2">
                              {nextSession.topic}
                            </p>
                            <div className="space-y-1">
                              <div className="flex items-center gap-2 text-xs text-slate-300">
                                <CalendarDays className="w-3.5 h-3.5 text-brand-accent shrink-0" />
                                {nextSession.date}
                              </div>
                              <div className="flex items-center gap-2 text-xs text-slate-300">
                                <Clock4 className="w-3.5 h-3.5 text-brand-accent shrink-0" />
                                {nextSession.time}
                              </div>
                              <div className="flex items-center gap-2 text-xs text-slate-300">
                                <Award className="w-3.5 h-3.5 text-brand-accent shrink-0" />
                                {nextSession.cpd} CPD Points · KES 4,000
                              </div>
                            </div>
                            <button
                              onClick={() => setModalOpen(true)}
                              className="mt-auto w-full bg-brand-blue hover:bg-brand-accent text-white text-xs font-bold py-2 rounded-lg transition-all"
                            >
                              Register Now →
                            </button>
                          </>
                        ) : (
                          <p className="text-sm text-slate-400">No upcoming sessions scheduled.</p>
                        )}
                      </div>

                      {/* ── RHS: Continuous Capacity Building ── */}
                      <div className="sm:pl-4 pt-4 sm:pt-0 flex flex-col gap-3">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-lg bg-brand-blue/30 flex items-center justify-center">
                            <Download className="w-4 h-4 text-brand-accent" />
                          </div>
                          <p className="text-xs font-bold text-white uppercase tracking-wider">Continuous Capacity Building</p>
                        </div>
                        <p className="text-sm font-semibold text-white leading-snug">
                          360° Operational Excellence & Business Process Management
                        </p>
                        <p className="text-xs text-slate-400 leading-relaxed">
                          Enterprise transformation framework — Lean, Kaizen, Hoshin Kanri, BPMN and financial governance in one integrated system.
                        </p>
                        <a
                          href="/360-degree-opex-hydro-aluminium.pdf"
                          download
                          className="mt-auto w-full bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-bold py-2 rounded-lg transition-all flex items-center justify-center gap-2"
                        >
                          <Download className="w-3.5 h-3.5" />
                          Download Program
                        </a>
                      </div>

                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Registration modal */}
      {nextSession && (
        <LeadCaptureModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          source={`NCA Promo Popup — ${nextSession.date}`}
          courseDetail={`${nextSession.topic} · ${nextSession.date} · ${nextSession.cpd} CPD`}
          heading="Register for Session"
          subheading={`${nextSession.date} · ${nextSession.time} · ${nextSession.cpd} CPD Points`}
        />
      )}
    </>
  );
};

export default PromoPopup;
