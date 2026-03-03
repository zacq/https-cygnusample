import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const WEBHOOK_URL = import.meta.env.VITE_CHAT_WEBHOOK_URL as string | undefined;

const QUICK_REPLIES = [
  'What services do you offer?',
  'How does Lean Management work?',
  'Tell me about safety training',
  'Book a consultation',
];

const BOT_INTRO = "Hi! 👋 I'm Apex, Cygnus Consulting's AI assistant. Ask me about our Lean Management, Kaizen programs, safety training, or how we can help transform your operations!";

interface Message {
  from: 'bot' | 'user';
  text: string;
}

const FloatingChatWidget: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([{ from: 'bot', text: BOT_INTRO }]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef  = useRef<HTMLInputElement>(null);
  const sessionId = useRef(`cx-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typing]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 200);
  }, [open]);

  const sendMessage = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    setMessages(m => [...m, { from: 'user', text: trimmed }]);
    setInput('');
    setTyping(true);

    // If the user says "book" / "consultation" — trigger the booking modal
    if (/book|consult|call|appointment/i.test(trimmed)) {
      await new Promise(r => setTimeout(r, 700));
      setTyping(false);
      setMessages(m => [...m, {
        from: 'bot',
        text: "I'd love to set that up! 📅 Click the button below to schedule your free strategy call with our team.",
      }]);
      setTimeout(() => window.dispatchEvent(new CustomEvent('open-booking-modal')), 1000);
      return;
    }

    if (WEBHOOK_URL) {
      try {
        const res = await fetch(WEBHOOK_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: trimmed, sessionId: sessionId.current }),
        });
        if (!res.ok) throw new Error('bad response');
        const data = await res.json();
        setTyping(false);
        setMessages(m => [...m, { from: 'bot', text: data.reply ?? "I didn't catch that — please try again!" }]);
      } catch {
        setTyping(false);
        setMessages(m => [...m, {
          from: 'bot',
          text: "Apologies, I'm having a moment 😅 Reach us on WhatsApp or hit 'Book a Consultation' and we'll get back to you fast!",
        }]);
      }
    } else {
      // Fallback static responses when no webhook is configured
      await new Promise(r => setTimeout(r, 900));
      setTyping(false);
      const staticReplies: Record<string, string> = {
        lean:     "Lean Management is about eliminating waste and maximizing value. Cygnus implements the full 5S methodology and Kaizen continuous improvement cycles tailored to your industry.",
        kaizen:   "Kaizen means 'change for better' — small, daily improvements that compound into massive operational gains. We embed this culture across your entire team.",
        safety:   "We offer WAH (Working at Heights) and GWO (Global Wind Organisation) certified safety training. Your team, fully compliant and protected.",
        training: "Our training programs cover Lean, Kaizen, 5S, WAH, and GWO — all hands-on and tailored to your sector.",
        price:    "Engagement pricing is scoped to your organization's size and needs. Book a free call and we'll build a proposal together.",
        default:  "Great question! Our team of consultants would be happy to give you a detailed answer. Would you like to book a free 30-min strategy call?",
      };
      const lower = trimmed.toLowerCase();
      const reply = Object.entries(staticReplies).find(([k]) => lower.includes(k))?.[1] ?? staticReplies.default;
      setMessages(m => [...m, { from: 'bot', text: reply }]);
    }
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) sendMessage(input);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="panel"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', damping: 28, stiffness: 320 }}
            className="w-[340px] max-w-[92vw] rounded-2xl border border-slate-200 bg-white shadow-2xl shadow-slate-900/20 overflow-hidden flex flex-col"
            style={{ maxHeight: '520px' }}
          >
            {/* Header */}
            <div className="flex items-center gap-3 px-4 py-3.5 bg-brand-navy shrink-0">
              <div className="w-9 h-9 rounded-full bg-brand-blue flex items-center justify-center text-white font-bold text-sm shrink-0">
                A
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white font-semibold text-sm leading-tight">Apex — Cygnus AI</p>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <p className="text-white/60 text-[11px]">Online · Replies instantly</p>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close chat"
                className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/70 hover:text-white transition-colors shrink-0"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 min-h-0 bg-slate-50">
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'} gap-2`}
                >
                  {msg.from === 'bot' && (
                    <div className="w-6 h-6 rounded-full bg-brand-navy flex items-center justify-center text-white text-[9px] font-bold shrink-0 mt-0.5">
                      A
                    </div>
                  )}
                  <div className={`max-w-[80%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed ${
                    msg.from === 'user'
                      ? 'bg-brand-navy text-white rounded-br-sm'
                      : 'bg-white border border-slate-200 text-slate-800 rounded-bl-sm shadow-sm'
                  }`}>
                    {msg.text}
                  </div>
                </motion.div>
              ))}

              {typing && (
                <div className="flex justify-start gap-2">
                  <div className="w-6 h-6 rounded-full bg-brand-navy flex items-center justify-center text-white text-[9px] font-bold shrink-0 mt-0.5">A</div>
                  <div className="bg-white border border-slate-200 px-4 py-3 rounded-2xl rounded-bl-sm flex gap-1 items-center shadow-sm">
                    {[0, 150, 300].map(d => (
                      <span key={d} className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: `${d}ms` }} />
                    ))}
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Quick replies — first message only */}
            {messages.length <= 1 && (
              <div className="px-4 pb-3 pt-1 flex flex-wrap gap-2 shrink-0 bg-slate-50 border-t border-slate-100">
                {QUICK_REPLIES.map(q => (
                  <button
                    key={q}
                    onClick={() => sendMessage(q)}
                    className="text-xs px-3 py-1.5 rounded-full border border-brand-blue/30 bg-brand-blue/5 text-brand-blue hover:bg-brand-blue/15 transition-colors"
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <div className="px-3 py-3 border-t border-slate-200 flex gap-2 shrink-0 bg-white">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={onKeyDown}
                placeholder="Type a message..."
                className="flex-1 border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-blue/30 transition-all"
              />
              <button
                onClick={() => sendMessage(input)}
                disabled={!input.trim()}
                aria-label="Send"
                className="w-9 h-9 rounded-xl bg-brand-navy hover:bg-brand-blue flex items-center justify-center text-white transition-colors shrink-0 disabled:opacity-40"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
                </svg>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Launcher button */}
      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        type="button"
        onClick={() => setOpen(v => !v)}
        aria-label={open ? 'Hide chat' : 'Chat with Apex'}
        className="w-14 h-14 rounded-full bg-brand-navy shadow-2xl shadow-brand-navy/40 flex items-center justify-center text-white relative"
      >
        {!open && (
          <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-emerald-400 border-2 border-white animate-pulse" />
        )}
        <AnimatePresence mode="wait">
          {open ? (
            <motion.svg key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }} viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </motion.svg>
          ) : (
            <motion.svg key="chat" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }} viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.8}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M7 8h10M7 12h6m-9 7 2.5-2.5H18a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H6a3 3 0 0 0-3 3v6a3 3 0 0 0 3 3" />
            </motion.svg>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
};

export default FloatingChatWidget;
