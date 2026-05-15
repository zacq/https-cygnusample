# Product Requirements Document
## Cygnus Consulting Website — Current State
**Version:** 2.0 | **Date:** 2026-05-12 | **Status:** Live / Active Development

---

## Changelog
| Version | Date | Summary |
|---|---|---|
| 2.0 | 2026-05-12 | Major update: 4 new routes (catalogue, diagnostic, meet-us, events); booking pipeline rewritten from direct Airtable to n8n → Airtable + Brevo; corrected Airtable IDs; expanded data model (13 fields); new env vars; LeadCaptureModal extended modes (ncaMode/bceMode); duplicate submission guard; DiagnosticCTA component; nav dropdown updated; Hero + CTASection Free Diagnostic CTA; addendum integrated |
| 1.5 | 2026-04-04 | NCA sessions restructured to 2-day format; CPD updated to 20 per session; price updated to KES 5,000; calendar shows day-by-day sub-topics; Apache .htaccess SPA fix + /nca-cpd-training/ redirect; footer Neuraflow credit added |
| 1.4 | 2026-03-23 | PromoPopup widget (2-col, collapsible, IntersectionObserver); payment details in LeadCaptureModal; Testimonials rewritten to 4 real clients; BE page download CTA; ?register=1 PDF deep-link; WAH & NCA fix; all downloads → 2026 BCIE Calendar.pdf |
| 1.3 | 2026-03-23 | Shared NCA sessions extracted to src/data/ncaSessions.ts; all download links updated to 2026 BCIE Calendar.pdf |
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
- Promote training courses (NCA Safety, Business Excellence, 24-course Training Catalogue)
- Provide an AI-assisted pre-qualification channel (Apex chat widget)
- Self-qualify leads through the free Operational Diagnostic Quiz

### 1.3 Target Audience
- Operations managers, plant managers, and C-suite in manufacturing, logistics, healthcare, and public sector
- HR / L&D professionals seeking accredited safety training (NCA, WAH)
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
| Backend / Automation | n8n (self-hosted on Railway) |
| CRM | Airtable (via n8n HTTP Request — not direct from frontend) |
| Email delivery | Brevo API (via n8n — not SMTP) |
| AI Chat backend | n8n (same instance) |
| Hosting | Netlify (primary) / cPanel LiteSpeed (production at cygnus.co.ke) |

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
| `/business-excellence` | `BusinessExcellencePage` | BE consulting program page |
| `/training/nca` | `NCATrainingPage` | NCA safety training schedule & registration |
| `/training/business-excellence` | `BusinessExcellenceTrainingPage` | Business Excellence 3-day program |
| `/training/catalogue` | `TrainingCataloguePage` | 24-course catalogue across 3 categories |
| `/diagnostic` | `DiagnosticPage` | Free Operational Diagnostic Quiz (10 questions) |
| `/meet-us` | `MeetUsPage` | "Can we work together?" intro / 3 pillars |
| `/events` | `EventsPage` | Events & Partners photo gallery (lightbox) |
| `/services` | `ServicesPage` | Full services listing |
| `/blog` | `BlogPage` | Blog index |
| `/blog/:slug` | `ArticlePage` | Individual article |

### 4.2 Home Page Section Order (Conversion Funnel)
1. **Navbar** — transparent → glass scroll, "Book a Call" CTA, mobile hamburger
2. **Hero** — canvas particle network + primary CTAs (Book a Strategy Call + Free Diagnostic)
3. **TrustedTeams** — marquee strip + 3 stats + trust badges
4. **Benefits** — 3 value cards (efficiency, quality, lead times)
5. **ProblemSection** — before/after contrast (navy bg)
6. **Services** — 4 image cards with hover reveal
7. **About** — team photo + 4 bullet points + floating 98% badge
8. **Training** — WAH, 5S, Kaizen, OET course cards (navy bg)
9. **DiagnosticCTA** — inline banner linking to `/diagnostic`
10. **SystemSection** — 5-step process with animated connectors
11. **Testimonials** — infinite-scroll carousel
12. **CTASection** — full-width navy banner (Book a Strategy Call + Free Diagnostic)
13. **Footer** — 4-column + social icons

---

## 5. Component Specifications

### 5.1 Navbar
- Fixed top; transparent on page load; transitions to `bg-white/90 backdrop-blur-xl border-b` on scroll
- Desktop: logo image + navigation links + "Book a Call" button
- Mobile: hamburger → full-screen slide-down menu
- **Navigation links:** Home, Business Excellence, Training (dropdown), Services, Events & Partners, Blog, Contact
- **Training dropdown:** NCA Training, Business Excellence Annual Program, Training Catalogue
- Active route highlighted

### 5.2 Hero (`src/components/Hero.tsx`)
- **Canvas particle network:** 70 nodes, `MAX_DIST 160px`, gradient glow nodes with connection lines
- **Headline:** "Accelerate *Efficiency*, Maximize **Profit.**"
- **Sub-headline:** "We embed Lean Management, Kaizen principles, and world-class safety standards into your organization — eliminating waste and unlocking sustainable growth."
- **CTAs:** "Book a Strategy Call" (primary) + "Free Diagnostic" (secondary → `/diagnostic`)
- **Stats row:** 15+ Years Experience | 50+ Projects Delivered | 98% Client Satisfaction
- **Floating cards:** Efficiency Gain (+32%), Active Projects bar chart, ISO/Lean badge

### 5.3 TrustedTeams (`src/components/TrustedTeams.tsx`)
- **Marquee:** 12 industries scrolling infinitely; edge fade via CSS mask gradient
- **Stats:** 15+ Years, 50+ Projects, 200+ Organizations
- **Trust badges:** WAH Certified, ISO 9001 Aligned, Lean Six Sigma

### 5.4 ProblemSection (`src/components/ProblemSection.tsx`)
- Dark navy background; section ID `excellence`
- **Left — "Without Cygnus" (red):** 6 pain points with `X` icons
- **Right — "With Cygnus" (emerald):** 6 outcomes with `CheckCircle2` icons
- Inline secondary CTA: "Book a Strategy Call"

### 5.5 Services Section (inline in App.tsx)
- 4 image cards with hover reveal overlay
- Services: Lean Systems Implementation, Safety & CI Training, Continuous Improvement Programs, Management Systems Consulting

### 5.6 About Section (inline in App.tsx)
- Two-column: team photo (left) + content (right)
- Floating badge: "98% Client Satisfaction"

### 5.7 Training Section (inline in App.tsx)
- Navy background; 4 course cards: WAH, Lean 5S Methodology, Kaizen Facilitation, Operational Excellence Transformation (OET)
- OET card links to `/training/business-excellence`

### 5.8 DiagnosticCTA (`src/components/DiagnosticCTA.tsx`)
- Inline banner between Training and SystemSection on home page
- CTA linking to `/diagnostic`

### 5.9 SystemSection (`src/components/SystemSection.tsx`)
- 5-step process: **Assess → Design → Implement → Certify → Improve**
- Connector arrows with `scaleX` animation on scroll
- Bottom CTA: "Book a Strategy Call"

### 5.10 Testimonials (`src/components/Testimonials.tsx`)
- Infinite-scroll carousel (right → left). 4 verified client entries:

| Attribution | Quote excerpt |
|---|---|
| Ex Press Garage — OPEX | "Cygnus transformed our shop floor in 90 days. Lead times dropped by 38%…" |
| El Funi Furniture — OPEX | "The Kaizen facilitation training was immediately practical…" |
| Lead Communication — WAH | "OEE went from 67% to 89% within six months…" |
| Next Gen — WAH | "First-pass yield is now above 98%…" |

### 5.11 CTASection (inline in App.tsx)
- Full-width navy banner
- CTAs: "Book a Strategy Call" (primary) + "Free Diagnostic" (secondary → `/diagnostic`)

### 5.12 Footer (inline in App.tsx)
- 4-column grid: Brand/tagline | Services links | Training links | Contact info
- Social icons: Twitter, Facebook, LinkedIn, WhatsApp
- Copyright: `© [year] Cygnus Consulting. All Rights Reserved. · Built & maintained by Neuraflow`
- "Neuraflow" links to `https://neuraflow.cloud/` (opens new tab, `rel="noopener noreferrer"`, `text-brand-accent`)

---

## 6. Lead Capture System

### 6.1 LeadCaptureModal (`src/components/LeadCaptureModal.tsx`)

**Submission endpoint:** `VITE_BOOKING_WEBHOOK_URL` → n8n → validates → Airtable + Brevo welcome email.
Auth is handled server-side in n8n. No Airtable token in the frontend.

**Props:**
| Prop | Type | Purpose |
|---|---|---|
| `isOpen` | boolean | Controls visibility |
| `onClose` | () => void | Close handler |
| `source` | string | CTA label for Airtable tracking |
| `courseDetail?` | string | Shown in modal header; sent to n8n |
| `heading?` | string | Modal title (default: "Get in Touch") |
| `subheading?` | string | Modal subtitle |
| `postSuccess?` | ReactNode | Custom node shown after success |
| `ncaMode?` | boolean | Enables extended NCA fields |
| `bceMode?` | boolean | Enables extended BCE fields |

**Standard form fields (always shown):**
| Field | Required |
|---|---|
| Full Name | Yes |
| Phone | Yes |
| Email | Yes |
| Company | No |
| Payment info box (Paybill 453521 · Account: Company Name) | UI only — never submitted |
| Message / How can we help? | No |

**Extended fields (shown when `ncaMode` or `bceMode` is true):**
| Field | Notes |
|---|---|
| ID No | National ID number |
| NCA Reg No | NCA registration number |
| Designation | Job title |
| Sessions Booked | Number of sessions (ncaMode only) |
| M-PESA Ref | Payment reference — must be unique |

**Duplicate submission guard:** On submit, checks `localStorage['cygnus_submissions']` for matching email or M-PESA ref. Blocks re-submission with an inline error message. On success, saves `{ email, mpesaRef }` to localStorage.

**Submission states:** `idle → loading → success | error`

**Payload sent to n8n:**
```json
{
  "fullName": "Jane Mwangi",
  "phone": "+254700000000",
  "email": "jane@company.com",
  "company": "Acme Ltd",
  "message": "Optional message",
  "source": "NCA Training — Safety As a Value",
  "courseDetail": "Safety as a Value · 11 & 14 May 2026",
  "submittedAt": "2026-05-11T08:00:00.000Z",
  "pageUrl": "https://cygnus.co.ke/training/nca",
  "idNo": "12345678",
  "ncaReg": "75553/E/0622",
  "designation": "Site Engineer",
  "mpesaRef": "UEAAC3VGH",
  "sessionCount": "1"
}
```

**Trigger mechanism (global click intercept in App.tsx):**
`CTA_SOURCE_MAP` maps button text → source string. `BOOKING_TRIGGERS = Object.keys(CTA_SOURCE_MAP)`. Global `click` listener on document: any `<button>` or `<a>` whose trimmed text matches (via `.includes()`) opens modal with `e.preventDefault()`.

**Current `CTA_SOURCE_MAP` entries:**
| Button text | Source label |
|---|---|
| Book a Strategy Call | Home — Book Strategy Call |
| Book a Call | Navbar — Book a Call |
| Book a Consultation | General — Book Consultation |
| Book Consultation | General — Book Consultation |
| Request Consultation | General — Request Consultation |
| Request Callback | General — Request Callback |
| Transform My Business | General — Transform My Business |
| Get Started | General — Get Started |
| Get Started Today | General — Get Started Today |
| Initiate Strategy Call | General — Initiate Strategy Call |
| Join the Waitlist | AI Training — Join Waitlist |
| Book This Course | Training Catalogue — Course Booking |

**Custom event:** `window.dispatchEvent(new CustomEvent('open-booking-modal'))` — opens modal from any component.

---

## 7. Floating Chat Widget (`src/components/FloatingChatWidget.tsx`)

### 7.1 UI
- Fixed bottom-right floating button with emerald pulse indicator
- Expandable chat panel (slide-up animation)
- Message history, typing indicator, text input + send button
- Quick reply buttons on first open

### 7.2 AI Persona
- **Name:** Apex — Cygnus Consulting AI Advisor
- **Quick replies:** "Tell me about your services", "Training programs", "Book a consultation", "Pricing"

### 7.3 Webhook Integration
- POST to `VITE_CHAT_WEBHOOK_URL` (n8n on Railway)
- Payload: `{ message, sessionId, timestamp }`
- **Fallback:** Static keyword-based responses when webhook unreachable

### 7.4 Booking Intent Detection
- Detects "book", "consult", "call" in user message → fires `open-booking-modal` event

---

## 8. n8n Automation Layer

n8n is self-hosted on Railway at `https://primary-production-bfd8.up.railway.app`.

**Railway persistence note:** SQLite not persisted across container restarts. Use HTTP Request nodes with API keys in headers (not n8n credential system) for all external services.

---

### 8.1 Booking Lead Capture Workflow

**Workflow name:** `Cygnus Booking Lead Capture`

**Flow:**
```
LeadCaptureModal (browser)
  → POST VITE_BOOKING_WEBHOOK_URL
    → Validate Lead Data (Code node)
    → Is Valid? (IF node)
      → true  → Create Airtable Record → Send Welcome Email (Brevo) → Respond Success
      → false → Respond Validation Error
```

**Production webhook:** `https://primary-production-bfd8.up.railway.app/webhook/96b990ab-967c-4b1f-ab02-b2fd48609280`
**Test webhook:** `https://primary-production-bfd8.up.railway.app/webhook-test/96b990ab-967c-4b1f-ab02-b2fd48609280`

**Welcome email — Brevo:**
- API endpoint: `POST https://api.brevo.com/v3/smtp/email`
- Auth: `api-key: BREVO_API_KEY` (in n8n HTTP Request header)
- Sender domain: `cygnus.co.ke` (verified in Brevo; DNS records in cPanel Zone Editor)
- Session-specific Zoom links embedded based on `courseDetail` field match:

| Session | courseDetail match | Zoom Link | Meeting ID | Passcode |
|---|---|---|---|---|
| May 11 & 14 | contains `safety as a value` | [Zoom link] | 845 1553 6711 | 1PFYGt |
| Jun 29 & 30 | default | [Zoom link] | 897 8554 8140 | 3vpRme |

---

### 8.2 Chat Workflow (`Cygnus_chat_workflow.json`)

**Flow:** `Chat Webhook → Cygnus AI Agent → Extract Lead Info → Respond → Has Lead Info? → Save Lead to Airtable`

**Lead extraction marker:**
```html
<!--LEAD:name=John Doe|phone=+254700000000|email=john@co.ke|summary=Interested in Lean training-->
```

**Airtable Chat Leads:** Base `app2yCaMIPgrnUegP` / Table `tblHWaQJU6OxbgUYu`
Fields: Session ID, Name, Phone, Email, Summary, Date (YYYY-MM-DD), Status, Source

---

### 8.3 Diagnostic Quiz Webhook

**Webhook URL:** `VITE_DIAGNOSTIC_WEBHOOK_URL`
`https://primary-production-bfd8.up.railway.app/webhook/diagnostic-submission`

Receives scored quiz results + contact info from `DiagnosticPage`. Workflow routes follow-up based on score category.

---

## 9. Environment Variables

| Variable | Used by | Purpose |
|---|---|---|
| `VITE_BOOKING_WEBHOOK_URL` | `LeadCaptureModal` | n8n booking webhook (n8n writes to Airtable + sends email) |
| `VITE_CHAT_WEBHOOK_URL` | `FloatingChatWidget` | n8n chat webhook |
| `VITE_DIAGNOSTIC_WEBHOOK_URL` | `DiagnosticPage` | n8n diagnostic quiz webhook |

All variables prefixed `VITE_` for Vite client-side exposure. `.env` is gitignored; set in Netlify dashboard for production.

**Note:** `VITE_BOOKING_AIRTABLE_TOKEN`, `VITE_BOOKING_AIRTABLE_BASE`, `VITE_BOOKING_AIRTABLE_TABLE` are no longer used in the frontend. Airtable is written to exclusively through n8n.

---

## 10. Airtable Data Model

### 10.1 Booking Leads (written by n8n Booking Workflow)
**Base:** `appCDdfoFtTmAhsTY` | **Table:** `tblzQJc9lYGjXmSvS`

| Field | Type | Source |
|---|---|---|
| Name | Single line text | `fullName` |
| Email | Single line text | `email` |
| Phone | Phone number | `phone` |
| Company | Single line text | `company` |
| Message | Long text | `message` |
| Source | Single line text | `source` (CTA label) |
| Course / Service Detail | Single line text | `courseDetail` |
| Status | Single select (New / Contacted / In Progress / Converted / Closed) | hardcoded `New` |
| Email Status | Single select (Pending / Sent / Failed) | hardcoded `Pending` on create |
| Date Submitted | Date | `submittedAt.split('T')[0]` → YYYY-MM-DD |
| Page URL | Single line text | `pageUrl` |
| NCA Reg No | Single line text | `ncaReg` (extended mode only) |
| ID No | Single line text | `idNo` (extended mode only) |
| Designation | Single line text | `designation` (extended mode only) |
| Sessions Booked | Single line text | `sessionCount` (ncaMode only) |
| MPESA Ref | Single line text | `mpesaRef` (extended mode only) |
| Comment Text | Long text | Internal notes — not from form |

### 10.2 Chat Leads (written by n8n Chat Workflow)
**Base:** `app2yCaMIPgrnUegP` | **Table:** `tblHWaQJU6OxbgUYu`

| Field | Source |
|---|---|
| Session ID | Chat session UUID |
| Name | Extracted from conversation |
| Phone | Extracted from conversation |
| Email | Extracted from conversation |
| Summary | AI-generated intent summary |
| Date | YYYY-MM-DD (auto) |
| Status | Default blank |
| Source | "Chat Widget" |

---

## 11. Infrastructure & Deployment

### 11.1 Hosting
- **Platform:** cPanel LiteSpeed (production at `cygnus.co.ke`) / Netlify (staging)
- **Build command:** `npm run build`
- **Publish dir:** `dist/`
- **SPA redirect (Netlify):** `/* → /index.html 200` (`netlify.toml`)
- **SPA redirect (cPanel/LiteSpeed):** Single-line `.htaccess` — manually written into `dist/` after each build:
  ```apache
  ErrorDocument 404 /index.html
  ```
  > This is the confirmed-working approach on LiteSpeed shared hosting. `RewriteEngine On` / `mod_rewrite` approach silently fails on many shared hosts even when syntax is correct.

**Deploy steps:**
1. `npm run build` → generates `dist/`
2. Write `.htaccess` above into `dist/`
3. Zip `dist/` contents → upload to cPanel `public_html/` via File Manager → Extract
4. Env vars (`VITE_*`) compile into the JS bundle at build time — set in `.env` before building

### 11.2 Git
- **Repo:** `https://github.com/zacq/https-cygnusample.git`
- **Branch:** `master`
- **Gitignored:** `.env`, `*_workflow.json` (contains Airtable/API tokens)

### 11.3 n8n AI Backend
- Self-hosted on Railway
- Workflows imported manually (not in repo)
- Production webhook URLs stored in `.env`

---

## 11b. PromoPopup (`src/components/PromoPopup.tsx`)

Semi-translucent floating widget — fixed bottom-right, `z-[90]`.

**Trigger:** `IntersectionObserver` on `id="page-hero"` — appears when hero scrolls out of view.

**Active pages:** Home (`/`), Business Excellence, Services, Blog

**Layout — two columns:**
| Column | Content |
|---|---|
| LHS — Next NCA Session | Shows next upcoming session from `src/data/ncaSessions.ts`. Topic, date, time, CPD, price. "Register Now" → LeadCaptureModal (ncaMode, pre-filled courseDetail) |
| RHS — Continuous Capacity Building | "Download Program" → `/2026 BCIE Calendar.pdf` |

---

## 11c. Shared NCA Sessions Data (`src/data/ncaSessions.ts`)

Exports `NCA_SESSIONS` and `getNextSession()`. Both `NCATrainingPage` and `PromoPopup` import from here.

**Interface:**
```ts
interface NCASession {
  id:        number;
  date:      string;      // display range, e.g. "11 & 14 May 2026"
  startDate: string;      // ISO for sorting, e.g. "2026-05-11"
  time:      string;
  topic:     string;
  cpd:       number;      // 20 per 2-day session
  day1:      { date: string; topic: string };
  day2:      { date: string; topic: string };
}
```

**2026 Schedule:**
| Dates | Topic | CPD |
|---|---|---|
| 25–26 March | Safety As a Value in the Construction Industry | 20 |
| 13 & 16 April | Managing Construction Site Safety Using Risk Assessment | 20 |
| 27 & 30 April | Operational Excellence for Sustainable Construction | 20 |
| 11 & 14 May | Safety As a Value in the Construction Industry | 20 |
| 25 & 29 May | Managing Construction Site Safety Using Risk Assessment | 20 |
| 15 & 18 June | Operational Excellence for Sustainable Construction | 20 |
| 29–30 June | Safety As a Value in the Construction Industry | 20 |

**Fee:** KES 5,000 per 2-day session · **Time:** 9:00 AM – 4:00 PM both days

---

## 11d. PDF Deep-Link (?register=1)

`BusinessExcellenceTrainingPage` detects `?register=1` on mount via `useSearchParams` and auto-opens the registration modal. Used as a clickable link inside the downloadable PDF.

---

## 11e. Downloadable Resource

All download buttons serve: **`/2026 BCIE Calendar.pdf`** (stored in `public/`).

| Location | Button label |
|---|---|
| BE page hero | Explore our Training Program |
| BE Training page | Download Program Outline |
| PromoPopup RHS | Download Program |

---

## 12. Pages Beyond Home

### 12.1 Business Excellence (`/business-excellence`)
Dedicated consulting program page. Hero CTAs: "Discuss Your Operational Challenge" (opens chat) + "Explore Our Framework" (anchor) + "Explore our Training Program" (download PDF).

### 12.2 Business Excellence Training (`/training/business-excellence`)
3-day program page. Sections: Hero → Why This Training → 360° OE System → Engagement Tiers → Implementation Roadmap → Key Success Metrics → Program Breakdown (Day 1–3) → Who It's For → Testimonials → Registration CTA. `?register=1` auto-opens modal.

### 12.3 NCA Training (`/training/nca`)
NCA safety training schedule. Shows all `NCA_SESSIONS` in calendar format. Registration opens `LeadCaptureModal` in `ncaMode` (extended fields: ID No, NCA Reg, Designation, Sessions Booked, M-PESA Ref, payment info box).

### 12.4 Training Catalogue (`/training/catalogue`)
24 courses across 3 categories with accent-coded cards:

| Category | Accent | Courses |
|---|---|---|
| A — Safety & Sustainability | `#DC2626` (red) | 6 courses |
| B — Business Continuous Improvement & Excellence | `#D4AF37` (gold) | 9 courses |
| C — Logistics | `#1B6EC2` (blue) | 9 courses |

Each card: left accent strip, icon, course number, duration badge, description, idealFor pills, "Book This Course" CTA (wired to global intercept → booking modal).

Section B includes a "Why BCI&E" dark navy feature card (7 reasons) before the course grid.

Page ends with a Contact section (dark navy card) with website/email/phone/location tiles.

### 12.5 Operational Diagnostic Quiz (`/diagnostic`)
Free self-assessment for lead qualification. 10 scored questions across operational areas.

**Areas assessed:**
Process Visibility, Waste & Efficiency, Financial Alignment, Performance Tracking, Continuous Improvement, Leadership Systems, Process Standardization, Technology & Systems, Quality & Defects, Data-Driven Decisions

**Scoring:**
| Score (out of 50) | Category | Color |
|---|---|---|
| 0–19 | Critical | Red |
| 20–29 | Developing | Orange |
| 30–39 | Progressing | Amber |
| 40–50 | Advanced | Emerald |

**Flow:** Intro screen → 10 question slides (animated, back/forward) → Contact capture form → Results screen (score ring, weak areas, recommended services, booking CTA).

Results posted to `VITE_DIAGNOSTIC_WEBHOOK_URL` (n8n). `SERVICE_MAP` maps each weak area to a recommended Cygnus service.

### 12.6 Meet Us (`/meet-us`)
"Can we work together?" page. Hero with 3 pillars: Business Money Operations, Operations Improvement & Excellence, Continuous Improvement Practice. Industries served marquee. Contains its own `LeadCaptureModal` instance.

### 12.7 Events & Partners (`/events`)
Photo gallery with lightbox. Categories: All, Events, Partnerships. Gallery data is an array in the component (`gallery: GalleryItem[]`) — add entries there to populate the page.

### 12.8 Services (`/services`)
Expanded services listing beyond the 4 home cards.

### 12.9 Blog (`/blog`) + Articles (`/blog/:slug`)
Blog index + individual article pages. Article slugs driven by `src/pages/data/articles.ts`.

---

## 13. Non-Functional Requirements

| Requirement | Implementation |
|---|---|
| Performance | Vite production build, lazy canvas animation, no heavy dependencies |
| Responsiveness | Tailwind breakpoints (`sm`, `md`, `lg`); mobile nav hamburger |
| Accessibility | Lucide icons with aria-labels; semantic HTML structure |
| SEO | React Router SPA; SPA redirect via .htaccess; meta tags in `index.html` |
| Security | No secrets in committed files; env vars via Netlify dashboard / `.env` locally; Airtable token only in n8n (server-side) |
| Duplicate submission prevention | `localStorage['cygnus_submissions']` blocks re-use of same email or M-PESA ref |
| Analytics | Not currently implemented |
| Cookie/GDPR | Not currently implemented |

---

## 14. Revision History

> Update this section whenever a significant change is made to the site.

| Version | Date | Changed by | Summary of Changes |
|---|---|---|---|
| 2.0 | 2026-05-12 | zacq | Full PRD refresh: 4 new routes, booking pipeline rewrite (n8n + Brevo), corrected Airtable IDs and data model, new env vars, LeadCaptureModal extended modes + duplicate guard, DiagnosticCTA, TrainingCataloguePage (24 courses), DiagnosticPage (10-question quiz), MeetUsPage, EventsPage, nav + Hero + CTA copy updated, addendum integrated |
| 1.5 | 2026-04-04 | — | NCA sessions → 2-day format; CPD → 20; price → KES 5,000; calendar shows day sub-topics; Apache .htaccess SPA fix + /nca-cpd-training/ 301 redirect; footer Neuraflow credit |
| 1.4 | 2026-03-23 | — | PromoPopup, payment details in modal, Testimonials rewrite, BE hero download CTA, ?register=1 deep-link, WAH & NCA fix, BCIE Calendar PDF, shared sessions data |
| 1.3 | 2026-03-23 | — | Shared NCA sessions data extracted; all download links updated to 2026 BCIE Calendar.pdf |
| 1.1 | 2026-03-21 | — | Added Section 15: complete web copy structure |
| 1.0 | 2026-03-21 | — | Initial PRD snapshot |

---

## 15. Web Copy Structure

Complete verbatim copy for every visible section of the home page, in render order.

---

### 15.1 Navbar

| Element | Copy |
|---|---|
| Logo | Image (`/images/logo.png`) + wordmark **Cygnus.** (dot in brand-blue) |
| Nav link 1 | Home |
| Nav link 2 | Business Excellence |
| Nav link 3 (dropdown) | Training ▾ |
| — dropdown item 1 | NCA Training |
| — dropdown item 2 | Business Excellence Annual Program |
| — dropdown item 3 | Training Catalogue |
| Nav link 4 | Services |
| Nav link 5 | Events & Partners |
| Nav link 6 | Blog |
| Nav link 7 | Contact |
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
| Secondary CTA | Free Diagnostic (→ /diagnostic) |
| Stat 1 | **15+** / Years Experience |
| Stat 2 | **50+** / Projects Delivered |
| Stat 3 | **98%** / Client Satisfaction |
| Floating card 1 — label | Efficiency Gain |
| Floating card 1 — metric | +32% |
| Floating card 1 — caption | Average operational efficiency improvement within 90 days. |
| Floating card 2 — label | Active Projects |
| Floating card 2 — caption | 7 ongoing engagements |
| Floating badge — line 1 | Profitability, Growth |
| Floating badge — line 2 | and Sustainability |

---

### 15.3 TrustedTeams

| Element | Copy |
|---|---|
| Eyebrow | Trusted Across Industries |
| H2 | Serving Leaders Across East Africa |
| Marquee | Manufacturing · Energy & Utilities · Logistics & Transport · Healthcare · Construction · Mining & Resources · Automotive · Food & Beverage · Pharmaceuticals · Renewable Energy · Government & Public Sector · Retail & Distribution |
| Stat 1 | **15+** / Years of Excellence |
| Stat 2 | **50+** / Projects Delivered |
| Stat 3 | **200+** / Organizations Served |
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
| Card 1 title | Increased Efficiency |
| Card 1 body | Eliminate waste in processes — streamlined operations and improved resource allocation that show up directly in your bottom line. |
| Card 2 title | Enhanced Quality & Safety |
| Card 2 body | Identify and rectify defects early, reduce errors, and build a culture where safety and quality are non-negotiable. |
| Card 3 title | Shorter Lead Times |
| Card 3 body | Reduce cycle times for faster delivery and more responsive service — giving you a decisive edge over competitors. |

---

### 15.5 ProblemSection

| Element | Copy |
|---|---|
| Eyebrow badge | The Burning Problem |
| H2 | Still Running on *Old Systems?* |
| Sub-copy | Every day without a structured excellence system is money, safety, and morale slipping through the cracks. |
| Without Cygnus — ✗ 1 | Inefficient processes quietly burning your profit margins |
| Without Cygnus — ✗ 2 | Safety incidents disrupting operations and risking lives |
| Without Cygnus — ✗ 3 | Poor employee morale and high costly turnover |
| Without Cygnus — ✗ 4 | Reactive firefighting with no structured system |
| Without Cygnus — ✗ 5 | Siloed teams working against — not with — each other |
| Without Cygnus — ✗ 6 | No clear metrics; decisions made on gut instinct |
| With Cygnus — ✓ 1 | Streamlined Lean systems delivering measurable ROI |
| With Cygnus — ✓ 2 | Certified safety compliance — WAH & NCA standards |
| With Cygnus — ✓ 3 | A culture of Kaizen: every employee drives improvement |
| With Cygnus — ✓ 4 | Proactive management frameworks that prevent breakdowns |
| With Cygnus — ✓ 5 | Unified teams aligned around shared operational goals |
| With Cygnus — ✓ 6 | KPI-driven decisions with transparent performance tracking |
| CTA pre-copy | The gap between where you are and where you could be is one conversation away. |
| CTA button | Book a Strategy Call → |

---

### 15.6 Services

| Element | Copy |
|---|---|
| Eyebrow | What We Do |
| H2 | Specialized Solutions for Operational Excellence |
| Header link | View All Services → |
| Card 1 title | Lean Systems Implementation |
| Card 2 title | Safety & Continuous Improvement Training |
| Card 3 title | Continuous Improvement Programs |
| Card 4 title | Management Systems Consulting |

---

### 15.7 About

| Element | Copy |
|---|---|
| Eyebrow | Who We Are |
| H2 | Your Partner in *Operational Excellence* |
| Body | Cygnus Consulting is a leading firm with unmatched specialty in Lean Management Systems. We focus on the continuous improvement and optimization of processes, operations, and resources within our clients' organizations — helping East Africa's best businesses operate at their peak. |
| Bullet 1 | Competitive advantage through process efficiency |
| Bullet 2 | Adaptability to market changes and disruptions |
| Bullet 3 | Sustainability of long-term operational growth |
| Bullet 4 | Maximized productivity, morale, and team alignment |
| CTA button | Learn More About Cygnus → |
| Floating badge | **98%** / Client Satisfaction |

---

### 15.8 Training

| Element | Copy |
|---|---|
| Eyebrow | Certified Training |
| H2 | Build the Skills That *Protect & Perform* |
| Sub-copy | Internationally recognised certifications delivered on-site or at our training centres across Kenya. |
| Card 1 (WAH) | Working at Heights · 2–3 Days · All Levels |
| Card 2 (5S) | Lean 5S Methodology · 1–2 Days · All Teams |
| Card 3 (KZN) | Kaizen Facilitation · 3 Days · Management |
| Card 4 (OET) | Operational Excellence Transformation · Advanced Program · links to /training/business-excellence |
| Section CTA | Book a Strategy Call → |
| CTA sub-note | On-site & remote delivery available across East Africa |

---

### 15.9 SystemSection

| Element | Copy |
|---|---|
| Eyebrow badge | How We Work |
| H2 | Our Approach to *Operational Excellence* |
| Step 1 | Assess — Evaluate operational challenges, risks, and compliance gaps. |
| Step 2 | Design — Develop tailored management systems aligned with industry standards. |
| Step 3 | Implement — Deploy operational frameworks and training programs across the organization. |
| Step 4 | Certify — Prepare organizations for global certifications and regulatory compliance. |
| Step 5 | Improve — Drive continuous operational improvement and sustain performance gains. |
| Bottom box H3 | Ready to start your transformation? |
| Bottom box sub | Our first consultation is free. No obligations, just clarity. |
| Bottom box CTA | Book a Strategy Call → |

---

### 15.10 CTASection

| Element | Copy |
|---|---|
| Eyebrow badge | Start Your Transformation |
| H2 | Ready to *Accelerate* Your Progress & Transform Your Business? |
| Sub-copy | Join hundreds of organizations across East Africa that have unlocked peak operational performance with Cygnus. |
| Primary CTA | Book a Strategy Call → |
| Secondary CTA | Free Diagnostic (→ /diagnostic) |

---

### 15.11 Footer

| Element | Copy |
|---|---|
| Logo wordmark | **Cygnus.** |
| Tagline | East Africa's leading operational excellence consultancy. Lean systems, safety training, and continuous improvement — built for lasting results. |
| Services links | Lean Implementation, WAH Training, Safety Management, Systems Consulting |
| Company links | About Cygnus, Our Process, Case Studies, Blog & Insights, Careers |
| Contact | Riabai Centre, Kiambu, Kenya · +254 717 925 881 · info@cygnus.co.ke |
| Status indicator | ● All systems operational |
| Social links | Twitter (@cygnus_safety) · Facebook (CygnusSafetyConsulting) · LinkedIn · WhatsApp (+254717925881) |
| Copyright | © [year] Cygnus Consulting. All Rights Reserved. · Built & maintained by Neuraflow |
| Footer links | Privacy Policy · Terms of Service |

---

### 15.12 LeadCaptureModal

| Element | Copy |
|---|---|
| Default heading | Get in Touch |
| Default subheading | No commitment — just clarity on how we can help. |
| Field 1 | Full Name * |
| Field 2 | Phone Number * |
| Field 3 | Email Address * |
| Field 4 | Company (optional) |
| Payment box | Paybill: 453521 · Account No: Company Name (never submitted) |
| Field 5 | Message / How can we help? (optional) |
| Extended: Field 6 | ID No |
| Extended: Field 7 | NCA Reg No |
| Extended: Field 8 | Designation |
| Extended: Field 9 | Sessions Booked (ncaMode only) |
| Extended: Field 10 | M-PESA Ref |
| Submit button | Send Request / (loading: Sending…) |
| Success heading | Request Received! |
| Success body | We'll respond within 24 hours. |
| Duplicate email error | This email address has already been used to register. Contact us if you need assistance. |
| Duplicate MPESA error | This M-PESA reference has already been used. Each payment reference can only be used once. |

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
