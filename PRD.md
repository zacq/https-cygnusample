# Product Requirements Document
## Cygnus Consulting Website — Current State
**Version:** 1.0 | **Date:** 2026-03-21 | **Status:** Live / Active Development

---

## Changelog
| Version | Date | Summary |
|---|---|---|
| 1.2 | 2026-03-21 | Addendum implemented: OET 4th training tile, Testimonials carousel, BE Training page 4 new sections (360° OE System, Engagement Tiers, Implementation Roadmap, Key Success Metrics) |
| 1.1 | 2026-03-21 | Added Section 15: full web copy structure for all home page sections |
| 1.0 | 2026-03-21 | Initial PRD — full snapshot of current website state |

---

## 1. Product Overview

### 1.1 Purpose
A marketing and lead-generation website for Cygnus Consulting, a Lean Management and Operational Excellence consultancy based in Riabai Centre, Kiambu, Kenya. The site is designed as a conversion funnel: attract business decision-makers, demonstrate expertise, and capture leads via consultation requests.

### 1.2 Business Objectives
- Convert visitors into booked discovery calls / consultations
- Showcase Lean / Operational Excellence credentials and case results
- Promote training courses (WAH, GWO, 5S, Kaizen)
- Provide an AI-assisted pre-qualification channel (Apex chat widget)

### 1.3 Target Audience
- Operations managers, plant managers, and C-suite in manufacturing, logistics, healthcare, and public sector
- HR / L&D professionals seeking accredited safety training (WAH, GWO)
- Organizations in East Africa looking to implement ISO 9001 / Lean Six Sigma

---

## 2. Technology Stack

| Layer | Technology |
|---|---|
| Framework | React 19 + TypeScript |
| Build tool | Vite 6 |
| Styling | Tailwind CSS v4 (`@tailwindcss/vite`) |
| Animation | `motion/react` (Motion v12) |
| Icons | `lucide-react` |
| Routing | React Router DOM v7 |
| Fonts | Inter (body), Playfair Display (headings) via Google Fonts |
| Backend / CRM | Airtable (REST API) |
| AI Chat backend | n8n (self-hosted on Railway) |
| Hosting | Netlify (SPA redirect configured) |

---

## 3. Brand & Design System

### 3.1 Color Palette (`src/index.css` `@theme`)
| Token | Hex | Usage |
|---|---|---|
| `brand-navy` | `#0D1F35` | Page backgrounds, CTAs, dark sections |
| `brand-blue` | `#1B6EC2` | Primary interactive / link color |
| `brand-accent` | `#0EA5D6` | Cyan highlights, icon accents |
| `brand-gold` | `#D4AF37` | Badges, premium highlights |

### 3.2 Typography
- **Headings:** Playfair Display (`font-display`) — serif, editorial
- **Body / UI:** Inter (`font-sans`) — clean, readable

### 3.3 Utility Classes
- `.glass-card` — frosted glass card (dark backgrounds)
- `.glass-card-light` — frosted glass card (light backgrounds)
- Step connector line via CSS `::after` pseudo-element

### 3.4 Custom Animations
`marquee`, `float`, `float-slow`, `pulse-glow`, `shimmer`, `count-up`, `spin-slow`, `border-pulse`

---

## 4. Site Architecture

### 4.1 Routing (React Router v7)

| Path | Component | Description |
|---|---|---|
| `/` | Home (inline in App.tsx) | Full marketing landing page |
| `/business-excellence` | BusinessExcellencePage | Detailed BE consulting program page |
| `/training/nca` | NCATrainingPage | NCA safety training courses |
| `/training/business-excellence` | BusinessExcellenceTrainingPage | Business Excellence training courses |
| `/services` | ServicesPage | Full services listing |
| `/blog` | BlogPage | Blog index |
| `/blog/:slug` | ArticlePage | Individual article |

### 4.2 Home Page Section Order (Conversion Funnel)
1. **Navbar** — transparent → glass scroll, "Book a Call" CTA, mobile hamburger
2. **Hero** — canvas particle network + primary CTAs
3. **TrustedTeams** — marquee strip + 3 stats + trust badges
4. **Benefits** — 3 value cards (efficiency, quality, lead times)
5. **ProblemSection** — before/after contrast (navy bg)
6. **Services** — 4 image cards with hover reveal
7. **About** — team photo + bullet points + floating 98% badge
8. **Training** — WAH, GWO, 5S, Kaizen course cards (navy bg)
9. **SystemSection** — 5-step process with animated connectors
10. **CTASection** — full-width navy banner
11. **Footer** — 4-column + social icons

---

## 5. Component Specifications

### 5.1 Navbar
- Fixed top; transparent background on page load; transitions to `bg-brand-navy/90 backdrop-blur` on scroll
- Desktop: logo + navigation links + "Book a Call" button
- Mobile: hamburger → full-screen slide-down menu
- Navigation links: Home, Services, Training (dropdown), Business Excellence, Blog
- **Training dropdown:** WAH, GWO, 5S/Kaizen, View All Training
- Active route highlighted

### 5.2 Hero (`src/components/Hero.tsx`)
- **Canvas particle network:** 70 nodes, `MAX_DIST 160px`, gradient glow nodes with connection lines, auto-resizes on window resize
- **Headline:** "Accelerate Efficiency, Maximize Profit" with animated underline (`motion/react`)
- **Sub-headline:** "We partner with operations teams to eliminate waste, cut costs, and build world-class systems — without disruption."
- **CTAs:** "Book a Strategy Call" (primary) + "See How It Works" (scroll anchor)
- **Stats row:** 15+ Years Experience | 50+ Projects Delivered | 98% Client Satisfaction
- **Floating cards (staggered entry animation):**
  - Efficiency Gain card: +32%
  - Active Projects bar chart card
  - ISO/Lean Certification badge card

### 5.3 TrustedTeams (`src/components/TrustedTeams.tsx`)
- **Marquee:** 12 industries scrolling infinitely (duplicated for seamless loop); edge fade via CSS mask gradient
- **Stats:** 3 cards — 15+ Years, 50+ Projects, 200+ Organizations
- **Trust badges:** WAH Certified, ISO 9001 Aligned, Lean Six Sigma (with CheckCircle icons)
- Background: `bg-slate-50`

### 5.4 ProblemSection (`src/components/ProblemSection.tsx`)
- Dark navy background; section ID `excellence`
- **Left column — "Without Cygnus" (red-tinted):** 6 pain points with `X` icons
  - Inefficient processes, Missed deadlines, Wasted resources, Low employee morale, Poor quality output, High operational costs
- **Right column — "With Cygnus" (emerald-tinted):** 6 outcomes with `CheckCircle2` icons
  - Streamlined workflows, On-time delivery, Resource optimization, Engaged workforce, Consistent quality, Reduced overheads
- Staggered list item entry animations
- Inline secondary CTA button

### 5.5 Services Section (inline in App.tsx)
- 4 image cards with hover reveal overlay
- Services: Lean Implementation, Process Mapping, Training & Certification, Quality Systems
- Each card: background image, title, short description, hover "Learn More" CTA

### 5.6 About Section (inline in App.tsx)
- Two-column: team photo (left) + content (right)
- 4 bullet points highlighting expertise/approach
- Floating badge: "98% Client Satisfaction"

### 5.7 Training Section (inline in App.tsx)
- Navy background
- 4 course cards: WAH (Working at Heights), GWO (Global Wind Organisation), 5S Workplace Organisation, Kaizen Continuous Improvement
- Each card: icon, title, description, duration/level tags, "Enroll Now" CTA trigger

### 5.8 SystemSection (`src/components/SystemSection.tsx`)
- 5-step process: **Assess → Design → Implement → Certify → Improve**
- Each step: gradient icon, color-coded badge, title, description
- Connector arrows between steps with `scaleX` animation on scroll into view
- Responsive: `md:grid-cols-5` → stacked on mobile
- Bottom CTA box: "Ready to start your transformation?"

### 5.9 CTASection (inline in App.tsx)
- Full-width navy banner
- Headline + supporting copy + "Book Your Free Consultation" button

### 5.10 Footer (inline in App.tsx)
- 4-column grid: Brand/tagline | Services links | Training links | Contact info
- Contact: +254 717 925 881, info@cygnus.co.ke, Riabai Centre, Kiambu
- Social icons row: Twitter, Facebook, LinkedIn, WhatsApp
- Copyright line

---

## 6. Lead Capture System

### 6.1 LeadCaptureModal (`src/components/LeadCaptureModal.tsx`)
**Unified lead form — replaced the old `BookingModal`.**

**Form Fields:**
| Field | Required | Type |
|---|---|---|
| Full Name | Yes | text |
| Phone | Yes | tel |
| Email | Yes | email |
| Company | No | text |
| Message | No | textarea |

**Optional prop:** `courseDetail` — if set, displays selected course info in the modal header.

**Submission flow:**
1. POST to Airtable REST API: `https://api.airtable.com/v0/{VITE_BOOKING_AIRTABLE_BASE}/{VITE_BOOKING_AIRTABLE_TABLE}`
2. Auth: `Bearer VITE_BOOKING_AIRTABLE_TOKEN`
3. States: `idle → loading → success | error`
4. Success: CheckCircle confirmation + "We'll respond within 24 hours" message
5. Body scroll locked while modal open

**Trigger mechanism (global click intercept in App.tsx):**
Any `<button>` or `<a>` whose trimmed text matches a string in the `BOOKING_TRIGGERS` array → `e.preventDefault()` → opens modal.

**Custom event:** `window.dispatchEvent(new CustomEvent('open-booking-modal'))` — used by FloatingChatWidget when booking intent is detected in conversation.

---

## 7. Floating Chat Widget (`src/components/FloatingChatWidget.tsx`)

### 7.1 UI
- Fixed bottom-right floating button with emerald pulse indicator
- Expandable chat panel (slide-up animation)
- Message history, typing indicator, text input + send button
- Quick reply buttons on first open

### 7.2 AI Persona
- **Name:** Apex — Cygnus Consulting AI Advisor
- **Intro message:** Greets user, offers to explain services, answer questions, or book a call
- **Quick replies:** "Tell me about your services", "Training programs", "Book a consultation", "Pricing"

### 7.3 Webhook Integration
- POST to `VITE_CHAT_WEBHOOK_URL` (n8n on Railway)
- Payload: `{ message, sessionId, timestamp }`
- Receives AI response; displays in chat
- **Fallback:** Static keyword-based responses for: Lean, WAH, GWO, safety, pricing, morale, quality topics

### 7.4 Booking Intent Detection
- Detects keywords: "book", "consult", "call" in user message
- Fires `open-booking-modal` custom event → opens LeadCaptureModal

### 7.5 Event Listeners
- `open-booking-modal` — close chat, open LeadCaptureModal
- `open-chat-widget` — programmatically open chat panel

---

## 8. n8n AI Backend

### 8.1 Workflow: `Cygnus_chat_workflow.json`
**Flow:** `Chat Webhook → Cygnus AI Agent → Extract Lead Info → Respond to Webhook → Has Lead Info? → Save Lead to Airtable`

| Step | Node Type | Detail |
|---|---|---|
| Chat Webhook | Webhook | Production URL on Railway |
| Cygnus AI Agent | AI Agent | Claude/OpenAI; Apex persona; 10-msg window buffer memory |
| Extract Lead Info | Code | Parses hidden `<!--LEAD:name=|phone=|email=|summary=-->` marker |
| Has Lead Info | If | Branches on whether lead data was extracted |
| Save Lead to Airtable | HTTP Request | POST to Chat leads base |

**Lead extraction marker format:**
```html
<!--LEAD:name=John Doe|phone=+254700000000|email=john@co.ke|summary=Interested in Lean training-->
```

**Airtable Chat Leads fields:** Session ID, Name, Phone, Email, Summary, Date (`YYYY-MM-DD`), Status, Source

---

## 9. Environment Variables

| Variable | Used by | Purpose |
|---|---|---|
| `VITE_BOOKING_AIRTABLE_TOKEN` | LeadCaptureModal | Airtable Bearer auth |
| `VITE_BOOKING_AIRTABLE_BASE` | LeadCaptureModal | Airtable base ID |
| `VITE_BOOKING_AIRTABLE_TABLE` | LeadCaptureModal | Airtable table ID |
| `VITE_CHAT_WEBHOOK_URL` | FloatingChatWidget | n8n webhook endpoint |

All variables prefixed `VITE_` for Vite client-side exposure. `.env` is gitignored; vars set in Netlify dashboard for production.

---

## 10. Airtable Data Model

### 10.1 Booking Leads (from LeadCaptureModal)
**Base:** `appHQyopAvjR5v8Vk` | **Table:** `tblzUc95p4Fjk50Au`

| Field | Source |
|---|---|
| Name | Form input |
| Phone | Form input |
| Email | Form input |
| Company | Form input (optional) |
| Message | Form input (optional) |
| Source | Trigger label (e.g., "Book a Call", "Enroll Now - WAH") |

### 10.2 Chat Leads (from n8n)
**Base:** `app2yCaMIPgrnUegP` | **Table:** `tblHWaQJU6OxbgUYu`

| Field | Source |
|---|---|
| Session ID | Chat session UUID |
| Name | Extracted from conversation |
| Phone | Extracted from conversation |
| Email | Extracted from conversation |
| Summary | AI-generated intent summary |
| Date | `YYYY-MM-DD` (auto) |
| Status | Default blank |
| Source | "Chat Widget" |

---

## 11. Infrastructure & Deployment

### 11.1 Hosting
- **Platform:** Netlify
- **Build command:** `npm run build`
- **Publish dir:** `dist/`
- **SPA redirect:** `/* → /index.html 200` (configured in `netlify.toml`)

### 11.2 Git
- **Repo:** `https://github.com/zacq/https-cygnusample.git`
- **Branch:** `master`
- **Gitignored:** `.env`, `*_workflow.json` (contains Airtable token)

### 11.3 AI Backend
- **n8n** self-hosted on Railway
- Workflow imported manually (not in repo)
- Production webhook URL stored in `.env`

---

## 12. Pages Beyond Home

### 12.1 Business Excellence (`/business-excellence`)
- Dedicated page for the BE consulting program
- Includes downloadable PDF outline (wired in last commit)

### 12.2 Training (`/training`)
- Full training programs overview
- Courses: WAH, GWO, 5S, Kaizen

### 12.3 Services (`/services`)
- Expanded services listing beyond the 4 home cards

### 12.4 Blog (`/blog`) + Articles (`/blog/:slug`)
- Blog index + individual article pages
- Article slugs driven by content (see `Articles.txt` for planned content)

---

## 13. Non-Functional Requirements (Current Implementation)

| Requirement | Implementation |
|---|---|
| Performance | Vite production build, lazy canvas animation, no heavy dependencies |
| Responsiveness | Tailwind breakpoints (`sm`, `md`, `lg`); mobile nav hamburger |
| Accessibility | Lucide icons with aria-labels; semantic HTML structure |
| SEO | React Router SPA; Netlify handles routing; meta tags in `index.html` |
| Security | No secrets in committed files; env vars via Netlify dashboard; Airtable tokens in `.env` only |
| Analytics | Not currently implemented |
| Cookie/GDPR | Not currently implemented |

---

---

## 15. Web Copy Structure

Complete verbatim copy for every visible section of the home page, in render order. Use this as the authoritative copy reference when editing, redesigning, or rewriting content.

---

### 15.1 Navbar

| Element | Copy |
|---|---|
| Logo wordmark | **Cygnus.** (dot in brand-blue) |
| Nav link 1 | Home |
| Nav link 2 | Business Excellence |
| Nav link 3 (dropdown) | Training ▾ |
| — dropdown item 1 | NCA Training |
| — dropdown item 2 | Business Excellence Training |
| Nav link 4 | Services |
| Nav link 5 | Blog |
| Nav link 6 | Contact |
| Primary CTA button | Book a Call → |
| Mobile CTA (full menu) | Book a Strategy Call |

---

### 15.2 Hero

| Element | Copy |
|---|---|
| Eyebrow badge | Operational Excellence Partner |
| H1 line 1 | Accelerate *Efficiency*, |
| H1 line 2 | Maximize **Profit.** |
| Sub-headline | We embed Lean Management, Kaizen principles, and world-class safety standards into your organization — eliminating waste and unlocking sustainable growth. |
| Primary CTA | Book a Strategy Call → |
| Secondary CTA | Explore Services |
| Stat 1 | **15+** / Years Experience |
| Stat 2 | **50+** / Projects Delivered |
| Stat 3 | **98%** / Client Satisfaction |
| Floating card — label | Efficiency Gain |
| Floating card — metric | +32% |
| Floating card — caption | Average operational efficiency improvement within 90 days. |
| Floating card 2 — label | Active Projects |
| Floating card 2 — caption | 7 ongoing engagements |
| Floating badge — line 1 | Profitability, Growth |
| Floating badge — line 2 | and Sustainability |
| Scroll indicator | Scroll ↓ |

---

### 15.3 TrustedTeams

| Element | Copy |
|---|---|
| Eyebrow | Trusted Across Industries |
| H2 | Serving Leaders Across East Africa |
| **Marquee industries** | Manufacturing · Energy & Utilities · Logistics & Transport · Healthcare · Construction · Mining & Resources · Automotive · Food & Beverage · Pharmaceuticals · Renewable Energy · Government & Public Sector · Retail & Distribution |
| Stat card 1 | **15+** / Years of Excellence |
| Stat card 2 | **50+** / Projects Delivered |
| Stat card 3 | **200+** / Organizations Served |
| Badge 1 | ✓ WAH Certified |
| Badge 2 | ✓ ISO 9001 Aligned |
| Badge 3 | ✓ Lean Six Sigma |

---

### 15.4 Benefits

| Element | Copy |
|---|---|
| Eyebrow | Our Promise |
| H2 | To Install a Culture of *Continuous Improvement* |
| Sub-copy | We don't just consult — we transform your organizational DNA to focus on value and excellence. |
| **Card 1** | |
| — Title | Increased Efficiency |
| — Body | Eliminate waste in processes — streamlined operations and improved resource allocation that show up directly in your bottom line. |
| **Card 2** | |
| — Title | Enhanced Quality & Safety |
| — Body | Identify and rectify defects early, reduce errors, and build a culture where safety and quality are non-negotiable. |
| **Card 3** | |
| — Title | Shorter Lead Times |
| — Body | Reduce cycle times for faster delivery and more responsive service — giving you a decisive edge over competitors. |

---

### 15.5 ProblemSection

| Element | Copy |
|---|---|
| Eyebrow badge | The Burning Problem |
| H2 | Still Running on *Old Systems?* |
| Sub-copy | Every day without a structured excellence system is money, safety, and morale slipping through the cracks. |
| **Without Cygnus column heading** | Without Cygnus |
| ✗ Item 1 | Inefficient processes quietly burning your profit margins |
| ✗ Item 2 | Safety incidents disrupting operations and risking lives |
| ✗ Item 3 | Poor employee morale and high costly turnover |
| ✗ Item 4 | Reactive firefighting with no structured system |
| ✗ Item 5 | Siloed teams working against — not with — each other |
| ✗ Item 6 | No clear metrics; decisions made on gut instinct |
| **With Cygnus column heading** | With Cygnus |
| ✓ Item 1 | Streamlined Lean systems delivering measurable ROI |
| ✓ Item 2 | Certified safety compliance — WAH & GWO standards |
| ✓ Item 3 | A culture of Kaizen: every employee drives improvement |
| ✓ Item 4 | Proactive management frameworks that prevent breakdowns |
| ✓ Item 5 | Unified teams aligned around shared operational goals |
| ✓ Item 6 | KPI-driven decisions with transparent performance tracking |
| CTA pre-copy | The gap between where you are and where you could be is one conversation away. |
| CTA button | Book a Strategy Call → |

---

### 15.6 Services

| Element | Copy |
|---|---|
| Eyebrow | What We Do |
| H2 | Specialized Solutions for Operational Excellence |
| Header link | View All Services → |
| **Card 1** | |
| — Tag | Core Service |
| — Title | Lean Systems Implementation |
| — Body | End-to-end deployment of Lean Management Systems using 5S Methodology and Kaizen to eliminate waste and drive measurable ROI. |
| — Hover CTA | Learn More → |
| **Card 2** | |
| — Tag | Certification |
| — Title | Safety & continuous Improvement Training |
| — Body | Comprehensive certified safety training standards for your workforce. |
| — Hover CTA | Learn More → |
| **Card 3** | |
| — Tag | Long-term |
| — Title | Continuous Improvement Programs |
| — Body | Sustained CI culture programs that boost productivity, employee morale, and long-term sustainable profitability. |
| — Hover CTA | Learn More → |
| **Card 4** | |
| — Tag | Strategic |
| — Title | Management Systems Consulting |
| — Body | Strategic advisory to align your leadership, processes, and people for resilient long-term operational excellence. |
| — Hover CTA | Learn More → |

---

### 15.7 About

| Element | Copy |
|---|---|
| Eyebrow | Who We Are |
| H2 | Your Partner in *Operational Excellence* |
| Body paragraph | Cygnus Consulting is a leading firm with unmatched specialty in Lean Management Systems. We focus on the continuous improvement and optimization of processes, operations, and resources within our clients' organizations — helping East Africa's best businesses operate at their peak. |
| ✓ Bullet 1 | Competitive advantage through process efficiency |
| ✓ Bullet 2 | Adaptability to market changes and disruptions |
| ✓ Bullet 3 | Sustainability of long-term operational growth |
| ✓ Bullet 4 | Maximized productivity, morale, and team alignment |
| CTA button | Learn More About Cygnus → |
| Floating badge — metric | **98%** |
| Floating badge — label | Client Satisfaction |

---

### 15.8 Training

| Element | Copy |
|---|---|
| Eyebrow | Certified Training |
| H2 | Build the Skills That *Protect & Perform* |
| Sub-copy | Internationally recognised certifications delivered on-site or at our training centres across Kenya. |
| **Card 1** | |
| — Code | WAH |
| — Title | Working at Heights |
| — Body | Comprehensive certification covering harness use, anchor points, rescue procedures, and fall prevention protocols. |
| — Duration | 2–3 Days |
| — Level | All Levels |
| **Card 2** | |
| — Code | 5S |
| — Title | Lean 5S Methodology |
| — Body | Sort, Set in Order, Shine, Standardise, Sustain — practical implementation training for your entire shop floor. |
| — Duration | 1–2 Days |
| — Level | All Teams |
| **Card 3** | |
| — Code | KZN |
| — Title | Kaizen Facilitation |
| — Body | Train your internal team to lead Kaizen events — from problem identification to solution deployment and sustainment. |
| — Duration | 3 Days |
| — Level | Management |
| Section CTA | Book a Strategy Call → |
| CTA sub-note | On-site & remote delivery available across East Africa |

> **Note:** Training section currently renders 3 cards (WAH, 5S, KZN). GWO card referenced in memory does not appear in current home Training section; it may exist on the `/training/nca` page.

---

### 15.9 SystemSection

| Element | Copy |
|---|---|
| Eyebrow badge | How We Work |
| H2 | Our Approach to *Operational Excellence* |
| **Step 1** | |
| — Label | Step 1 |
| — Title | Assess |
| — Body | Evaluate operational challenges, risks, and compliance gaps. |
| **Step 2** | |
| — Label | Step 2 |
| — Title | Design |
| — Body | Develop tailored management systems aligned with industry standards. |
| **Step 3** | |
| — Label | Step 3 |
| — Title | Implement |
| — Body | Deploy operational frameworks and training programs across the organization. |
| **Step 4** | |
| — Label | Step 4 |
| — Title | Certify |
| — Body | Prepare organizations for global certifications and regulatory compliance. |
| **Step 5** | |
| — Label | Step 5 |
| — Title | Improve |
| — Body | Drive continuous operational improvement and sustain performance gains. |
| Bottom box — H3 | Ready to start your transformation? |
| Bottom box — sub | Our first consultation is free. No obligations, just clarity. |
| Bottom box — CTA | Book a Strategy Call → |

---

### 15.10 CTASection

| Element | Copy |
|---|---|
| Eyebrow badge | Start Your Transformation |
| H2 | Ready to *Accelerate* Your Progress & Transform Your Business? |
| Sub-copy | Join hundreds of organizations across East Africa that have unlocked peak operational performance with Cygnus. |
| Primary CTA | Book a Strategy Call → |
| Secondary CTA | Contact Us |

---

### 15.11 Footer

| Element | Copy |
|---|---|
| Logo wordmark | **Cygnus.** |
| Tagline | East Africa's leading operational excellence consultancy. Lean systems, safety training, and continuous improvement — built for lasting results. |
| **Services column heading** | Services |
| — Link 1 | Lean Implementation |
| — Link 2 | WAH Training |
| — Link 3 | Safety Management |
| — Link 4 | Systems Consulting |
| **Company column heading** | Company |
| — Link 1 | About Cygnus |
| — Link 2 | Our Process |
| — Link 3 | Case Studies |
| — Link 4 | Blog & Insights |
| — Link 5 | Careers |
| **Contact column heading** | Contact |
| — Address | Riabai Centre, Kiambu, Kenya |
| — Phone | +254 717 925 881 |
| — Email | info@cygnus.co.ke |
| Status indicator | ● All systems operational |
| Social links | Twitter (@cygnus_safety) · Facebook (CygnusSafetyConsulting) · LinkedIn · WhatsApp (+254717925881) |
| Copyright | © [year] Cygnus Consulting. All Rights Reserved. |
| Footer links | Privacy Policy · Terms of Service |

---

### 15.12 LeadCaptureModal (Lead Form)

| Element | Copy |
|---|---|
| Form field 1 placeholder | Full Name * |
| Form field 2 placeholder | Phone Number * |
| Form field 3 placeholder | Email Address * |
| Form field 4 placeholder | Company (optional) |
| Form field 5 placeholder | Message / How can we help? (optional) |
| Submit button | Send Request / (loading: Sending…) |
| Success heading | Request Received! |
| Success body | We'll respond within 24 hours. |

---

### 15.13 Floating Chat Widget (Apex)

| Element | Copy |
|---|---|
| AI name | Apex |
| Intro message | Hi! I'm Apex, Cygnus Consulting's AI advisor. How can I help you today? |
| Quick reply 1 | Tell me about your services |
| Quick reply 2 | Training programs |
| Quick reply 3 | Book a consultation |
| Quick reply 4 | Pricing |
| Input placeholder | Type a message… |

---

## 14. Revision History

> Update this section whenever a significant change is made to the site.

| Version | Date | Changed by | Summary of Changes |
|---|---|---|---|
| 1.1 | 2026-03-21 | — | Added Section 15: complete web copy structure for all home page sections and modals |
| 1.0 | 2026-03-21 | — | Initial PRD snapshot. All modals unified under LeadCaptureModal. BE PDF download wired. Blog routes added. |
