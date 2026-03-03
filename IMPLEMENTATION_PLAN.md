# NeuraFlow Website — Comprehensive Implementation Plan

> Portable blueprint for replicating the sales architecture, floating chatbot, and request callback form on any new frontend.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 19 + TypeScript |
| Build Tool | Vite 7 |
| Styling | Tailwind CSS v4 (`@theme` tokens, no config file) |
| Icons | `lucide-react` |
| Fonts | Inter (body) + Syne (display/headings) via Google Fonts |
| Backend Automation | n8n (self-hosted on Railway) |
| Lead CRM | Airtable |
| Hosting | Netlify (via `netlify.toml`) |

---

## 1. Project Structure

```
src/
├── App.tsx                    ← Root shell, modal state, global click handler
├── main.tsx
├── index.css                  ← Tailwind v4 @theme tokens + custom animations
├── components/
│   ├── Navbar.tsx
│   ├── Hero.tsx               ← Canvas neural-network animation + CTAs
│   ├── TwoGrowthEngines.tsx   ← Core services showcase, opens product modals
│   ├── TrustedTeams.tsx
│   ├── ProblemSection.tsx     ← Before/after contrast section
│   ├── SystemArchitecture.tsx
│   ├── YouTubeSection.tsx
│   ├── FloatingChatWidget.tsx ← AI chatbot (Nova) — primary lead capture
│   ├── BookingModal.tsx       ← Request Callback form → Airtable
│   ├── PricingModal.tsx       ← Content/Academy product tiers
│   ├── SalesPricingModal.tsx  ← Sales system product tiers
│   ├── Academy.tsx            ← Hash-route sub-page (#/academy)
│   └── Footer.tsx
└── utils/
```

---

## 2. Global State & CTA System (App.tsx)

This is the central nervous system that wires every CTA button across the entire site to the booking modal.

### Pattern: Global Click Intercept

```tsx
// App.tsx
const bookingTriggers = [
  "Book a Call", "Book Your Strategy Call", "Book a Strategy Call",
  "Book Demo", "Get Started Free", "Start Pro Trial",
  "Request Callback", "Initiate Strategy Call", "Start Implementation",
];

document.addEventListener('click', (e) => {
  const target = e.target as HTMLElement;
  const closestLink = target.closest('a, button');
  if (!closestLink) return;
  const text = closestLink.textContent?.trim() || "";
  if (bookingTriggers.some(trigger => text.includes(trigger))) {
    e.preventDefault();
    setIsModalOpen(true);
  }
});
```

**Key insight:** Any `<a>` or `<button>` anywhere in the app whose text matches the trigger list
will automatically open the booking modal — no prop drilling needed. Just write the button
text and it works.

### Pattern: Custom Window Events (for deeply nested components)

For components that cannot receive props (standalone modals, deeply nested UI):

```tsx
// Dispatch from anywhere in the app
window.dispatchEvent(new CustomEvent('open-booking-modal'));
window.dispatchEvent(new CustomEvent('open-pricing-modal'));
window.dispatchEvent(new CustomEvent('open-sales-modal'));

// Listen inside the target modal component
useEffect(() => {
  window.addEventListener('open-pricing-modal', handleOpen);
  return () => window.removeEventListener('open-pricing-modal', handleOpen);
}, []);
```

### Hash-based Sub-page Routing (no React Router needed)

```tsx
const [currentHash, setCurrentHash] = useState(window.location.hash);

useEffect(() => {
  const handleHashChange = () => setCurrentHash(window.location.hash);
  window.addEventListener('hashchange', handleHashChange);
  return () => window.removeEventListener('hashchange', handleHashChange);
}, []);

// Renders Academy sub-page on /#/academy
const isAcademy = currentHash === '#/academy' || currentHash === '#academy';
return isAcademy ? <Academy /> : <MainSite />;
```

### Full App.tsx Shell

```tsx
export function App() {
  const [scrolled, setScrolled] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentHash, setCurrentHash] = useState(window.location.hash);

  const openBooking = () => setIsModalOpen(true);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    const handleHashChange = () => setCurrentHash(window.location.hash);
    const handleBookingEvent = () => setIsModalOpen(true);

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('hashchange', handleHashChange);
    window.addEventListener('open-booking-modal', handleBookingEvent);

    const clickHandler = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const closestLink = target.closest('a, button');
      if (!closestLink) return;
      const text = closestLink.textContent?.trim() || "";
      if (bookingTriggers.some(trigger => text.includes(trigger))) {
        e.preventDefault();
        setIsModalOpen(true);
      }
    };
    document.addEventListener('click', clickHandler);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('hashchange', handleHashChange);
      window.removeEventListener('open-booking-modal', handleBookingEvent);
      document.removeEventListener('click', clickHandler);
    };
  }, []);

  const isAcademy = currentHash === '#/academy' || currentHash === '#academy';

  return (
    <>
      {isAcademy ? (
        <Academy onBookingClick={openBooking} />
      ) : (
        <div className="min-h-screen bg-[#050510] text-white overflow-x-hidden">
          <Navbar scrolled={scrolled} onBookingClick={openBooking} />
          <Hero />
          {/* ...page sections... */}
          <Footer />
          <FloatingChatWidget />
        </div>
      )}
      <BookingModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <PricingModal />
      <SalesPricingModal />
    </>
  );
}
```

---

## 3. Floating Chat Widget — Full Implementation

**Component:** `FloatingChatWidget.tsx`

### Architecture Overview

```
[User Types Message]
        ↓
[POST to n8n Webhook]
        ↓
[n8n: AI Agent (GPT-4o-mini)] ←→ [Window Buffer Memory (keyed by sessionId)]
        ↓
[Extract Lead Info — Code Node]
   Detects <!--LEAD:name=...|phone=...|email=...|summary=--> in AI response
        ↓
[Respond to Webhook] → returns { reply: string } (lead block stripped out)
        ↓ (async, after response sent)
[Has Lead Info — IF Node]
        ↓ true
[Save Lead to Airtable]
```

### Component Code

```tsx
const WEBHOOK_URL = "https://your-n8n-instance.up.railway.app/webhook/your-chat-path";

const QUICK_REPLIES = [
  "What is [Your Brand]?",
  "How does the AI system work?",
  "What's the pricing?",
  "Book a call",
];

const BOT_INTRO = "Hi! 👋 I'm [AssistantName], [Your Brand]'s AI assistant. Ask me anything about our services, pricing, or how we can help your business grow!";

interface Message {
  from: "bot" | "user";
  text: string;
}

export default function FloatingChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([{ from: "bot", text: BOT_INTRO }]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  // Unique session ID generated once per page load — used by n8n memory node
  const sessionId = useRef(`session-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;
    setMessages(m => [...m, { from: "user", text }]);
    setInput("");
    setTyping(true);
    try {
      const res = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, sessionId: sessionId.current }),
      });
      if (!res.ok) throw new Error("Bad response");
      const data = await res.json();
      setTyping(false);
      setMessages(m => [...m, { from: "bot", text: data.reply ?? "I didn't catch that — please try again!" }]);
    } catch {
      setTyping(false);
      // Fallback: always give the user an action path (WhatsApp / booking)
      setMessages(m => [...m, {
        from: "bot",
        text: "I'm having a bit of trouble right now 😅 Reach us on WhatsApp or hit the Book a Call button — we'll get back to you fast!"
      }]);
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3">
      {/* Chat Panel */}
      {open && (
        <div
          className="w-[340px] max-w-[92vw] rounded-2xl border border-white/10 bg-[#0d0d1f] shadow-2xl shadow-black/60 overflow-hidden flex flex-col"
          style={{ maxHeight: "520px" }}
        >
          {/* Header */}
          <div className="flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-violet-700 to-cyan-600 shrink-0">
            <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center text-white font-bold text-sm shrink-0">
              {/* Brand initials */}
              NF
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white font-semibold text-sm leading-tight">Brand Assistant</p>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <p className="text-white/70 text-[11px]">Online · Replies instantly</p>
              </div>
            </div>
            <button onClick={() => setOpen(false)} aria-label="Close chat"
              className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/80 hover:text-white transition-colors shrink-0">
              <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 min-h-0">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"} gap-2`}>
                {msg.from === "bot" && (
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-violet-600 to-cyan-500 flex items-center justify-center text-white text-[10px] font-bold shrink-0 mt-0.5">
                    NF
                  </div>
                )}
                <div className={`max-w-[78%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed ${
                  msg.from === "user"
                    ? "bg-gradient-to-br from-violet-600 to-cyan-500 text-white rounded-br-sm"
                    : "bg-white/8 border border-white/8 text-white/85 rounded-bl-sm"
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}

            {/* Typing indicator */}
            {typing && (
              <div className="flex justify-start gap-2">
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-violet-600 to-cyan-500 flex items-center justify-center text-white text-[10px] font-bold shrink-0 mt-0.5">NF</div>
                <div className="bg-white/8 border border-white/8 px-4 py-3 rounded-2xl rounded-bl-sm flex gap-1 items-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-white/50 animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-white/50 animate-bounce" style={{ animationDelay: "150ms" }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-white/50 animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Quick Replies — shown only on first open */}
          {messages.length <= 1 && (
            <div className="px-4 pb-2 flex flex-wrap gap-2 shrink-0">
              {QUICK_REPLIES.map(q => (
                <button key={q} onClick={() => sendMessage(q)}
                  className="text-xs px-3 py-1.5 rounded-full border border-violet-500/40 bg-violet-500/10 text-violet-300 hover:bg-violet-500/20 transition-colors">
                  {q}
                </button>
              ))}
            </div>
          )}

          {/* Input Bar */}
          <div className="px-3 py-3 border-t border-white/8 flex gap-2 shrink-0">
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && sendMessage(input)}
              placeholder="Type a message..."
              className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-1 focus:ring-violet-500/50"
            />
            <button onClick={() => sendMessage(input)} aria-label="Send"
              className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-600 to-cyan-500 flex items-center justify-center text-white hover:opacity-90 transition-opacity shrink-0">
              <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Launcher Button */}
      <button
        type="button"
        onClick={() => setOpen(v => !v)}
        aria-label={open ? "Hide chat" : "Open chat"}
        className="w-14 h-14 rounded-full bg-gradient-to-br from-violet-600 to-cyan-500 shadow-xl shadow-violet-500/40 flex items-center justify-center text-white hover:scale-105 active:scale-95 transition-transform relative"
      >
        {/* Online pulse dot — only on closed state */}
        {!open && (
          <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-emerald-400 border-2 border-[#0d0d1f] animate-pulse" />
        )}
        {open ? (
          <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.8}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M7 8h10M7 12h6m-9 7 2.5-2.5H18a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H6a3 3 0 0 0-3 3v6a3 3 0 0 0 3 3" />
          </svg>
        )}
      </button>
    </div>
  );
}
```

---

## 4. n8n Chat Backend Workflow

Import `neuraflow_chat_workflow.json` into your n8n instance and reconfigure credentials.

### Node Breakdown

| Node | Type | Purpose |
|---|---|---|
| Chat Webhook | Webhook (POST) | Receives `{ message, sessionId }` from the widget |
| NeuraFlow AI Agent | LangChain Conversational Agent | Runs the AI persona with system prompt |
| OpenAI Chat Model | LangChain LM | `gpt-4o-mini` — balance of speed and quality |
| Window Buffer Memory | LangChain Memory | Keeps last 10 messages per `sessionId` |
| Extract Lead Info | Code (JavaScript) | Strips and parses the hidden `<!--LEAD:...-->` block |
| Respond to Webhook | Respond to Webhook | Returns `{ reply }` to the widget immediately |
| Has Lead Info | IF | Branches: save to Airtable only when all 3 fields collected |
| Save Lead to Airtable | HTTP Request (POST) | Writes the lead record |

### Extract Lead Info — Code Node (JavaScript)

```javascript
const raw = $json.output || '';

// Find hidden lead block embedded by AI
const leadMatch = raw.match(/<!--LEAD:(.*?)-->/);

// Strip the hidden block before returning reply to user
const cleanReply = raw.replace(/<!--LEAD:.*?-->/gs, '').trim();

let lead = null;
if (leadMatch) {
  const parts = {};
  leadMatch[1].split('|').forEach(p => {
    const idx = p.indexOf('=');
    if (idx > -1) {
      parts[p.slice(0, idx).trim()] = p.slice(idx + 1).trim();
    }
  });
  if (parts.name && parts.phone && parts.email) lead = parts;
}

return [{
  json: {
    reply: cleanReply,
    hasLead: !!lead,
    name:    lead ? lead.name    : null,
    phone:   lead ? lead.phone   : null,
    email:   lead ? lead.email   : null,
    summary: lead ? lead.summary : null,
    sessionId: $('Chat Webhook').item.json.body.sessionId
  }
}];
```

### Airtable Save — Body Expression

```json
{
  "fields": {
    "Session ID": "={{ $('Extract Lead Info').item.json.sessionId }}",
    "Name":       "={{ $('Extract Lead Info').item.json.name }}",
    "Phone":      "={{ $('Extract Lead Info').item.json.phone }}",
    "Email":      "={{ $('Extract Lead Info').item.json.email }}",
    "Summary":    "={{ $('Extract Lead Info').item.json.summary }}",
    "Date":       "={{ new Date().toISOString() }}",
    "Status":     "New",
    "Source":     "Chat Widget"
  }
}
```

### Nova AI System Prompt Template

Adapt this for your brand. The hidden lead block format must be preserved exactly.

```
You are [AssistantName], the [Role] for [BrandName] — [brand positioning statement].

YOUR ROLE: Act as a peer-level advisor to [target audience]. Your goal is to secure a [desired action, e.g. Strategy Consultation / Demo Call].

OUR CORE OFFERINGS:
1. [Product/Service 1]: [Short description]
2. [Product/Service 2]: [Short description]

PRICING:
- [Tier 1]: $[price]
- [Tier 2]: $[price]
- [Bundle]: $[price]

PROTOCOLS:
- Maintain an authoritative, [brand tone] tone.
- If visitor seeks [outcome A], recommend [Product A].
- If visitor seeks [outcome B], recommend [Product B].
- Collect contact details sequentially: Name → Phone → Email.

LEAD COLLECTION:
Upon identifying purchase intent, collect details one-by-one. Once Name, Phone, and Email
are all confirmed, append this hidden block to your response (DO NOT display it to the user):
<!--LEAD:name=[name]|phone=[phone]|email=[email]|summary=[one-sentence strategic summary]-->

IDENTITY:
You are [AssistantName]. Never mention OpenAI, Claude, or any underlying AI technology.
```

---

## 5. Request Callback / Booking Modal

**Component:** `BookingModal.tsx`

### Form Fields

| Field | Input Type | Required |
|---|---|---|
| First Name | `text` | Yes |
| Last Name | `text` | Yes |
| Company Name | `text` | Yes |
| Phone Number | `tel` | Yes |
| Email Address | `email` | Yes |
| Preferred Date | `date` | Yes |
| Preferred Time | `select` (Morning / Afternoon / Evening) | Yes |

### Component Code

```tsx
import React, { useState, useEffect } from 'react';
import { X, Send, Calendar, Clock, Loader2, CheckCircle } from 'lucide-react';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AIRTABLE_TOKEN = import.meta.env.VITE_AIRTABLE_TOKEN;
const LEADS_BASE     = import.meta.env.VITE_AIRTABLE_LEADS_BASE;
const LEADS_TABLE    = import.meta.env.VITE_AIRTABLE_LEADS_TABLE;

const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', companyName: '',
    phoneNumber: '', email: '', date: '', time: ''
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  // Lock body scroll when open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  // Reset form after close animation completes
  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setStatus('idle');
        setFormData({ firstName: '', lastName: '', companyName: '', phoneNumber: '', email: '', date: '', time: '' });
      }, 300);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

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
            Name: `${formData.firstName} ${formData.lastName}`.trim(),
            Phone: formData.phoneNumber,
            Email: formData.email,
            Company: formData.companyName,
            'Preferred Date': formData.date,
            'Preferred Time': formData.time,
            Status: 'New',
            Source: 'Website Form',
          }
        })
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err?.error?.message || 'Submission failed');
      }
      setStatus('success');
      setTimeout(() => onClose(), 2500); // Auto-close after showing success
    } catch (err: unknown) {
      setStatus('error');
      setErrorMsg(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    }
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={onClose} // Click backdrop to close
    >
      <div
        className="relative w-full max-w-2xl bg-[#0a0a1a]/90 border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
        onClick={e => e.stopPropagation()} // Prevent close on modal click
      >
        <button onClick={onClose} aria-label="Close"
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/5 border border-white/10 text-white/60 hover:text-white hover:bg-white/10 transition-all">
          <X className="w-5 h-5" />
        </button>

        <div className="p-8 md:p-12">
          {/* Success State */}
          {status === 'success' && (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <CheckCircle className="w-16 h-16 text-emerald-400 mb-4" />
              <h2 className="text-2xl font-bold text-white mb-2">Request Sent!</h2>
              <p className="text-white/60">We've received your callback request and will be in touch shortly.</p>
            </div>
          )}

          {/* Form State */}
          {status !== 'success' && (
            <>
              <div className="text-center mb-10">
                <h2 className="text-3xl font-bold text-white mb-4">Request a Callback</h2>
                <p className="text-white/60 max-w-lg mx-auto">
                  Schedule a free consultation to discover how we can transform your workflows and drive growth.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-white/80">First Name *</label>
                    <input required type="text" name="firstName" placeholder="John"
                      value={formData.firstName} onChange={handleChange}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-violet-500/50 transition-all" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-white/80">Last Name *</label>
                    <input required type="text" name="lastName" placeholder="Doe"
                      value={formData.lastName} onChange={handleChange}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-violet-500/50 transition-all" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-white/80">Company Name *</label>
                    <input required type="text" name="companyName" placeholder="Acme Inc."
                      value={formData.companyName} onChange={handleChange}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-violet-500/50 transition-all" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-white/80">Phone Number *</label>
                    <input required type="tel" name="phoneNumber" placeholder="+1 555 000 0000"
                      value={formData.phoneNumber} onChange={handleChange}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-violet-500/50 transition-all" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-white/80">Email Address *</label>
                  <input required type="email" name="email" placeholder="john.doe@example.com"
                    value={formData.email} onChange={handleChange}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-violet-500/50 transition-all" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-white/80">Preferred Date *</label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                      <input required type="date" name="date" value={formData.date} onChange={handleChange}
                        className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-violet-500/50 transition-all [color-scheme:dark]" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-white/80">Preferred Time *</label>
                    <div className="relative">
                      <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                      <select required name="time" value={formData.time} onChange={handleChange}
                        className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-violet-500/50 transition-all appearance-none">
                        <option value="" disabled className="bg-[#0a0a1a]">Select time</option>
                        <option value="morning"   className="bg-[#0a0a1a]">Morning (9 AM – 12 PM)</option>
                        <option value="afternoon" className="bg-[#0a0a1a]">Afternoon (12 PM – 5 PM)</option>
                        <option value="evening"   className="bg-[#0a0a1a]">Evening (5 PM – 8 PM)</option>
                      </select>
                    </div>
                  </div>
                </div>

                {status === 'error' && (
                  <p className="text-red-400 text-sm text-center bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-3">
                    ⚠️ {errorMsg}
                  </p>
                )}

                <button type="submit" disabled={status === 'loading'}
                  className="w-full bg-violet-500 hover:bg-violet-600 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold py-4 rounded-xl shadow-lg shadow-violet-500/20 flex items-center justify-center gap-2 transition-all transform hover:scale-[1.02] active:scale-[0.98]">
                  {status === 'loading'
                    ? <><Loader2 className="w-5 h-5 animate-spin" /> Sending...</>
                    : <><Send className="w-5 h-5" /> Request Callback</>
                  }
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingModal;
```

### Required Environment Variables

```env
VITE_AIRTABLE_TOKEN=pat_xxxxxxxxxxxxxxxxxxxx
VITE_AIRTABLE_LEADS_BASE=appXXXXXXXXXXXXXX
VITE_AIRTABLE_LEADS_TABLE=tblXXXXXXXXXXXXXX
```

### Required Airtable Table Schema

| Field Name | Field Type |
|---|---|
| Name | Single line text |
| Phone | Phone number |
| Email | Email |
| Company | Single line text |
| Preferred Date | Date |
| Preferred Time | Single line text |
| Status | Single select (`New`, `Contacted`, `Qualified`, `Closed`) |
| Source | Single line text (`Website Form` or `Chat Widget`) |
| Session ID | Single line text (chat leads only) |
| Summary | Long text (chat leads only) |
| Date | Date/time |

---

## 6. Dual Product Modal System

Two separate full-screen modals for two product lines, each self-managing via a custom event.

### Pattern (same for both modals)

```tsx
export default function YourProductModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleOpen = () => {
      setIsOpen(true);
      document.body.style.overflow = 'hidden';
    };
    window.addEventListener('open-your-modal', handleOpen);
    return () => window.removeEventListener('open-your-modal', handleOpen);
  }, []);

  const closeForm = () => {
    setIsOpen(false);
    document.body.style.overflow = 'unset';
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={closeForm} />

      {/* Modal card — scrollable for tall content */}
      <div className="relative w-full max-w-6xl bg-[#0d0d14] rounded-2xl border border-white/10 shadow-2xl overflow-y-auto max-h-[90vh]">
        {/* Close button */}
        {/* 3-column pricing grid */}
        {/* Full-width bundle section */}
        {/* "Back to website" text link at bottom */}
      </div>
    </div>
  );
}
```

### Triggering from a section component

```tsx
// No imports needed — just dispatch the event
<button onClick={() => window.dispatchEvent(new CustomEvent('open-your-modal'))}>
  See Pricing
</button>
```

---

## 7. Sales Page Architecture (Section Order & Funnel Logic)

The page is structured as a deliberate conversion funnel. Section order matters.

```
1. Navbar           Sticky, transparent → blurred glass on scroll.
                    CTA: "Consult" / primary brand action button (right side).

2. Hero             Full-screen. Bold headline + animated canvas background.
                    Primary CTA: booking trigger text.
                    Secondary CTA: scroll-down anchor to architecture/details.

3. Services/Value   Two-column service overview.
                    Each card opens a product/pricing modal on click.

4. Social Proof     Logo strip, trusted teams, testimonials, or case stats.

5. Problem Section  Before/After contrast table.
                    Left column: pain of the old way (red X icons).
                    Right column: your solution (green check icons).
                    Ends with a CTA button inline.

6. System/How       Technical credibility section — deep dive, architecture diagram.

7. Video/Proof      YouTube embed or video testimonial for authority.

8. Footer           Final CTA block (gradient card) + social links + WhatsApp.
                    Includes "All systems operational" status indicator for trust.

9. FloatingChatWidget  Always-visible. Bottom-right. Never leaves the screen.
```

### CTA Everywhere Strategy

- **Hero:** Primary action + secondary scroll CTA
- **Navbar:** "Consult" / "Book" button, always visible
- **Services cards:** "See How It Works" → opens product modal
- **Problem section:** Inline CTA at the bottom of the comparison
- **Footer:** Full-width gradient CTA block with two buttons
- **FloatingChatWidget:** Persistent — captures leads who don't click any CTA
- **Global click intercept:** Any button with a matching text triggers the booking modal automatically

---

## 8. Design System (Tailwind v4 `@theme`)

```css
/* src/index.css */
@import "tailwindcss";

@theme {
  --font-sans: "Inter", ui-sans-serif, system-ui;
  --font-display: "Syne", sans-serif;

  /* Replace these with your brand palette */
  --color-brand-bg:        #030308;  /* Near-black page background */
  --color-brand-primary:   #8b5cf6;  /* Violet — primary CTAs, accents */
  --color-brand-secondary: #06b6d4;  /* Cyan — secondary accents */
  --color-brand-accent:    #f0abfc;  /* Light pink — badges, highlights */
}

@layer base {
  body {
    @apply font-sans bg-brand-bg text-white/90 antialiased;
    letter-spacing: -0.01em;
  }
  h1, h2, h3, h4, .font-display {
    @apply font-display font-bold tracking-tight text-white;
  }
}

/* Marquee animation — for logo strips */
@keyframes marquee {
  0%   { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}
.animate-marquee {
  animation: marquee 40s linear infinite;
  width: max-content;
}

/* Float animation — for floating badges */
@keyframes float {
  0%, 100% { transform: translateY(0); }
  50%       { transform: translateY(-10px); }
}
.animate-float { animation: float 6s ease-in-out infinite; }

/* Soft pulse — for glow orbs */
@keyframes pulse-soft {
  0%, 100% { opacity: 0.15; transform: scale(1); }
  50%       { opacity: 0.25; transform: scale(1.05); }
}
.animate-pulse-soft { animation: pulse-soft 8s ease-in-out infinite; }

/* Smooth scroll globally */
* { scroll-behavior: smooth; }

/* Text selection highlight */
::selection { @apply bg-brand-primary/30 text-white; }
```

### Repeating Card Pattern

```html
<!-- Dark glass card with colored border accent -->
<div class="p-8 rounded-2xl border border-violet-500/30
            bg-gradient-to-b from-violet-900/30 to-[#0a0a2f]
            hover:border-violet-500/50 transition-all duration-300">
```

### Hero Canvas Animation

The Hero section uses a `<canvas>` element to render a moving neural-network node graph:
- 60 nodes with random positions and slow velocities
- Nodes connect with faint violet lines when within 120px of each other
- Each node renders as a radial gradient dot (violet → transparent)
- Animates with `requestAnimationFrame`, cleans up on unmount
- `resize` event handler resets canvas dimensions

---

## 9. Navbar Pattern

```tsx
// Props
interface NavbarProps {
  scrolled: boolean;       // from App.tsx scroll listener
  onBookingClick: () => void;
}

// Scroll state classes
className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
  scrolled
    ? "bg-brand-bg/80 backdrop-blur-2xl border-b border-white/5 shadow-2xl py-2"
    : "bg-transparent py-4"
}`}
```

Key behaviors:
- Transparent on load → blurred dark glass on scroll (20px threshold)
- Desktop: logo left, nav links center, CTA button right
- Mobile: hamburger toggle, dropdown menu with all links + CTA
- "Contact" nav item calls `onBookingClick` directly
- CTA button uses the `onBookingClick` prop (not the global text intercept)

---

## 10. Lead Capture Channels Summary

| Channel | Trigger | Mechanism | Airtable Source Tag |
|---|---|---|---|
| Floating Chat | User opens widget and chats | n8n AI agent collects conversationally | `Chat Widget` |
| Booking Modal | Any CTA button click | Direct form → Airtable REST API | `Website Form` |
| WhatsApp | Footer link / chat fallback | External app link | (external) |

Both Airtable channels write `Status: "New"` — ready for CRM pipeline management.

---

## 11. Adaptation Checklist for a New Website

Work through this list to port the system to any new frontend:

### Chat Widget
- [ ] Replace `WEBHOOK_URL` with your n8n Railway/cloud instance URL
- [ ] Update `BOT_INTRO` with your assistant name and brand pitch
- [ ] Update `QUICK_REPLIES` with questions relevant to your services
- [ ] Update avatar initials/logo in the chat header and bot bubble

### n8n Workflow
- [ ] Import `neuraflow_chat_workflow.json` into your n8n instance
- [ ] Set up OpenAI credential in n8n
- [ ] Set up Airtable HTTP Header Auth credential in n8n
- [ ] Update the Airtable base/table URL in the "Save Lead to Airtable" node
- [ ] Rewrite the system prompt with your brand identity, pricing, and lead collection instructions
- [ ] Update `allowedOrigins` on the webhook node to your domain (or keep `*` for dev)

### Booking Modal
- [ ] Add `.env` file: `VITE_AIRTABLE_TOKEN`, `VITE_AIRTABLE_LEADS_BASE`, `VITE_AIRTABLE_LEADS_TABLE`
- [ ] Create matching Airtable table with the schema from Section 5
- [ ] Update form field labels and placeholder text to match your brand
- [ ] Update phone number placeholder to your region format

### App-level Wiring
- [ ] Update `bookingTriggers` array in `App.tsx` with your CTA button labels
- [ ] Add `<FloatingChatWidget />` inside the main layout (outside any conditional renders)
- [ ] Add `<BookingModal isOpen={isModalOpen} onClose={...} />` at the root level
- [ ] Add scroll listener for navbar state

### Styling
- [ ] Replace `@theme` color tokens with your brand palette
- [ ] Replace Google Fonts in `index.html` with your chosen typefaces
- [ ] Update gradient directions/colors in section cards to match your brand

### Content
- [ ] Update footer social links with real URLs
- [ ] Update WhatsApp link with your business phone number
- [ ] Replace footer link categories with your real site pages
- [ ] Update copyright entity name

---

## 12. Dependencies (package.json)

```json
{
  "dependencies": {
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "lucide-react": "^0.474.0",
    "clsx": "^2.1.1",
    "tailwind-merge": "^3.0.0"
  },
  "devDependencies": {
    "vite": "^7.0.0",
    "@vitejs/plugin-react": "^5.0.0",
    "@tailwindcss/vite": "^4.0.0",
    "tailwindcss": "^4.0.0",
    "typescript": "^5.0.0",
    "@types/react": "^19.0.0",
    "@types/react-dom": "^19.0.0"
  }
}
```

Install: `npm install` or `bun install`
Dev server: `npm run dev`
Build: `npx vite build` (use `npx` for Linux/Netlify compatibility)
