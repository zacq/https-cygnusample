import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const WEBHOOK_URL = import.meta.env.VITE_CHAT_WEBHOOK_URL as string | undefined;

const QUICK_REPLIES = [
  'ESG implementation for my organization',
  'Strategy execution and alignment',
  'Financial optimization frameworks',
  'Process improvement and Kaizen',
];

const BOT_INTRO = "Hello! 👋 I'm Apex, Cygnus Consulting's AI advisor.\n\nWhat operational challenge is your business facing today? I can help with Lean systems, safety training, or continuous improvement — let's find the right solution together.";

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

  useEffect(() => {
    const handler = () => setOpen(true);
    window.addEventListener('open-chat-widget', handler);
    return () => window.removeEventListener('open-chat-widget', handler);
  }, []);

  const sendMessage = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    setMessages(m => [...m, { from: 'user', text: trimmed }]);
    setInput('');
    setTyping(true);

    // Book / consult intent — open the booking modal directly
    if (/book|consult|call|appointment|strategy/i.test(trimmed)) {
      await new Promise(r => setTimeout(r, 700));
      setTyping(false);
      setMessages(m => [...m, {
        from: 'bot',
        text: "Great — let's get that locked in! 📅 Click below to fill in your details and a Cygnus consultant will confirm your free strategy call within 24 hours.",
      }]);
      setTimeout(() => window.dispatchEvent(new CustomEvent('open-booking-modal')), 900);
      return;
    }

    // Hit the n8n webhook if configured
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
        setMessages(m => [...m, {
          from: 'bot',
          text: data.reply ?? "I didn't quite catch that — could you rephrase?",
        }]);
      } catch {
        setTyping(false);
        setMessages(m => [...m, {
          from: 'bot',
          text: "Sorry, I'm having a brief connectivity issue. You can reach us directly on WhatsApp (+254 717 925 881) or click 'Book a Consultation' and we'll be in touch within 24 hours.",
        }]);
      }
      return;
    }

    // Static fallback responses (no webhook configured)
    await new Promise(r => setTimeout(r, 950));
    setTyping(false);

    const lower = trimmed.toLowerCase();
    let reply: string;

    if (/lean|5s|kaizen|waste|efficien|produc/i.test(lower)) {
      reply = "Lean Management is about eliminating waste and maximising the value your team delivers every day. Cygnus deploys full 5S and Kaizen systems tailored to your industry — our clients typically see 25–35% efficiency gains within 90 days. What sector are you operating in?";
    } else if (/wah|height|fall|harness|working at height/i.test(lower)) {
      reply = "Our WAH (Working at Heights) certification is a 2–3 day programme covering harness use, anchor systems, fall prevention, and emergency rescue — keeping your team safe and legally compliant. How many staff would you need certified?";
    } else if (/gwo|wind|turbine|renewable/i.test(lower)) {
      reply = "GWO (Global Wind Organisation) training is our internationally recognised 4–5 day certification for wind energy workers — covering Basic Safety, First Aid, Fire Awareness, and Manual Handling. Is your team working in the renewables sector?";
    } else if (/safe|incident|accident|compliance|certif/i.test(lower)) {
      reply = "Safety is non-negotiable. Cygnus offers WAH and GWO certified training that reduces workplace incidents and keeps you fully compliant with industry standards. Would you like to tell me more about your team's current safety setup?";
    } else if (/price|cost|fee|how much|quote/i.test(lower)) {
      reply = "Engagement scope and pricing is tailored to your organisation's size and specific challenge. The best way to get an accurate picture is a free 30-minute strategy call with our team — no commitment needed. Can I get your name to get started?";
    } else if (/morale|turnover|staff|team|culture/i.test(lower)) {
      reply = "Low morale and high turnover are often symptoms of unclear processes and no sense of ownership. Our Kaizen programmes give every employee a role in improvement — which drives engagement dramatically. What does your current team structure look like?";
    } else if (/quality|defect|error|rework/i.test(lower)) {
      reply = "Quality issues usually trace back to process gaps, not people. Our Lean implementation identifies root causes and puts structured controls in place — reducing defects and rework measurably. What's your current quality challenge?";
    } else {
      reply = "That's a great starting point. At Cygnus, we help organisations tackle exactly these kinds of operational challenges through Lean Management, safety training, and continuous improvement programmes. To point you to the right solution — what industry are you in and how large is your team?";
    }

    setMessages(m => [...m, { from: 'bot', text: reply }]);
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
            style={{ maxHeight: '540px' }}
          >
            {/* Header */}
            <div className="flex items-center gap-3 px-4 py-3.5 bg-brand-navy shrink-0">
              <div className="relative">
                <div className="w-9 h-9 rounded-full bg-brand-blue flex items-center justify-center text-white font-bold text-sm">
                  A
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-400 border-2 border-brand-navy" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white font-semibold text-sm leading-tight">Apex — Cygnus AI</p>
                <p className="text-white/55 text-[11px] mt-0.5">Operational Excellence Advisor · Online</p>
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
                  <div className={`max-w-[80%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed whitespace-pre-line ${
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

            {/* Quick replies — shown only on first message */}
            {messages.length <= 1 && (
              <div className="px-4 pb-3 pt-2 flex flex-wrap gap-2 shrink-0 bg-slate-50 border-t border-slate-100">
                {QUICK_REPLIES.map(q => (
                  <button
                    key={q}
                    onClick={() => sendMessage(q)}
                    className="text-xs px-3 py-1.5 rounded-full border border-brand-blue/30 bg-brand-blue/5 text-brand-blue hover:bg-brand-blue/15 transition-colors text-left"
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
                placeholder="Describe your operational challenge..."
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

      {/* Launcher */}
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
