# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev        # Dev server on port 3000 (falls back to 3001, 3002… if in use)
npm run build      # Production build → dist/
npm run lint       # TypeScript type-check only (tsc --noEmit)
npm run preview    # Serve the dist/ build locally
```

No test suite is configured.

---

## Architecture

### Stack
- **React 19 + TypeScript**, Vite 6, Tailwind CSS v4 (`@tailwindcss/vite`)
- **Routing:** `react-router-dom` v7 (BrowserRouter), SPA redirects handled by `netlify.toml`
- **Animation:** `motion/react` (Motion v12) — import from `motion/react`, NOT `framer-motion`
- **Icons:** `lucide-react`

### Entry point
`src/App.tsx` is the root shell. It contains:
1. **Navbar** — transparent → glass on scroll; "Book a Strategy Call" CTA
2. **Home page** — inline sections: Benefits, Services, About, Training, CTASection, Footer
3. **Router** — all routes wrapped in `<BrowserRouter>`
4. **Global click intercept** — `BOOKING_TRIGGERS` / `CTA_SOURCE_MAP` arrays match button text and open `LeadCaptureModal` via `e.preventDefault()`. To add a new CTA trigger, add it to `CTA_SOURCE_MAP` in App.tsx.
5. **Custom event bridge** — `window.dispatchEvent(new CustomEvent('open-booking-modal'))` opens the modal from any component (used by `FloatingChatWidget`).

### Page routes
| Route | Component |
|---|---|
| `/` | Home (inline in App.tsx) |
| `/business-excellence` | `src/pages/BusinessExcellencePage.tsx` |
| `/training/nca` | `src/pages/NCATrainingPage.tsx` |
| `/training/business-excellence` | `src/pages/BusinessExcellenceTrainingPage.tsx` |
| `/training/catalogue` | `src/pages/TrainingCataloguePage.tsx` |
| `/services` | `src/pages/ServicesPage.tsx` |
| `/blog` | `src/pages/BlogPage.tsx` |
| `/blog/:slug` | `src/pages/ArticlePage.tsx` |
| `/diagnostic` | `src/pages/DiagnosticPage.tsx` |
| `/meet-us` | `src/pages/MeetUsPage.tsx` |

### Shared data
- `src/data/ncaSessions.ts` — single source of truth for NCA training sessions. Both `NCATrainingPage` and `PromoPopup` import `NCA_SESSIONS` and `getNextSession()` from here. Update this file to change session dates/topics everywhere at once.
- `src/pages/data/articles.ts` — blog article data.

### Key components
| Component | Purpose |
|---|---|
| `LeadCaptureModal` | Reusable modal → POST to n8n webhook (`VITE_BOOKING_WEBHOOK_URL`). n8n validates and writes to Airtable server-side. Contains a red informational payment box (Paybill 453521) that is **never submitted**. |
| `PromoPopup` | Semi-translucent 2-column widget. Appears when `id="page-hero"` scrolls out of view (IntersectionObserver). LHS: next NCA session from `ncaSessions.ts`. RHS: download CTA for BCIE Calendar PDF. Active on Home, BE, Services, Blog. |
| `FloatingChatWidget` | Apex AI advisor — posts to n8n webhook (`VITE_CHAT_WEBHOOK_URL`), falls back to static responses. |
| `Hero` | Canvas particle network (70 nodes, MAX_DIST 160px). |
| `DiagnosticCTA` | Reusable contextual strip linking to `/diagnostic`. Embedded on Home (between Benefits and ProblemSection), ServicesPage, and BusinessExcellencePage. |
| `DiagnosticPage` | 4-screen animated quiz. Scores across 10 operational dimensions. On completion POSTs to `VITE_DIAGNOSTIC_WEBHOOK_URL` (non-blocking). Results CTA fires `open-booking-modal` event. |

### Styling
- Brand tokens defined in `src/index.css` under `@theme`: `brand-navy` (#0D1F35), `brand-blue` (#1B6EC2), `brand-accent` (#0EA5D6), `brand-gold` (#D4AF37).
- Custom animation keyframes (`testimonialScroll`, etc.) also live in `src/index.css`.

### Env vars
```
VITE_BOOKING_WEBHOOK_URL=      # LeadCaptureModal + ArticlePage comments + TrainingCataloguePage → n8n
VITE_CHAT_WEBHOOK_URL=         # FloatingChatWidget → n8n
VITE_DIAGNOSTIC_WEBHOOK_URL=   # DiagnosticPage quiz results → n8n (non-blocking, optional)
```
Add to `.env` locally; add to Netlify dashboard for production. Never commit `.env` or real tokens in `.env.example`.

> **Security rule:** Never use `VITE_BOOKING_AIRTABLE_TOKEN` or any Airtable PAT in frontend code. All Airtable writes must go through n8n server-side. Exposing tokens in the Vite bundle triggers AV false positives (Avast flags the site as malicious) and gives public read/write access to the entire base.

**Booking webhook URLs:**
- Production (workflow active): `https://primary-production-bfd8.up.railway.app/webhook/96b990ab-967c-4b1f-ab02-b2fd48609280`
- Test (workflow inactive): `https://primary-production-bfd8.up.railway.app/webhook-test/96b990ab-967c-4b1f-ab02-b2fd48609280`

### Downloadable resource
All download buttons across the site serve `/2026 BCIE Calendar.pdf` from `public/`. To swap the file, replace it in `public/` and update the filename reference in:
- `src/pages/BusinessExcellencePage.tsx` (hero "Explore our Training Program" button)
- `src/pages/BusinessExcellenceTrainingPage.tsx` (download button)
- `src/components/PromoPopup.tsx` (RHS "Download Program" button)

### PDF deep-link
`/training/business-excellence?register=1` auto-opens the "Register for the Program" modal on page load. Used as a clickable link inside the downloadable PDF to redirect offline readers to the registration form.

### Git / deploy
- `netlify.toml` — build: `npm run build`, publish: `dist/`, SPA catch-all redirect to `/index.html`.
- `*_workflow.json` is gitignored (contains Airtable token — import to n8n manually).
- GitHub remote: `https://github.com/zacq/https-cygnusample.git`, branch: `master`.

### cPanel deployment (LiteSpeed/Apache)
`netlify.toml` redirects don't work on cPanel. The server must serve `index.html` for all unknown paths so React Router handles routing client-side.

**SPA routing — use this `.htaccess` (confirmed working on LiteSpeed):**

```apache
ErrorDocument 404 /index.html
```

This single directive is the most reliable option. LiteSpeed honours `ErrorDocument` even when `mod_rewrite` is disabled or `AllowOverride` is restricted — which is common on shared cPanel hosts. The mod_rewrite approach (`RewriteEngine On` / `RewriteRule`) looks correct but silently fails on many LiteSpeed shared hosts.

> **Note:** Direct URL hits return HTTP 404 before React loads, but the page renders correctly for users. SEO impact is minimal for a service business site.

This file is **not** auto-generated by `npm run build` — it must be written into `dist/` after every build.

**Recompile procedure — always follow this exact sequence:**
1. `npm run build` → generates `dist/`
2. Write `dist/.htaccess` with exactly this content (no additions, no changes):
   ```
   ErrorDocument 404 /index.html
   ```
3. Zip `dist/` contents and upload to cPanel `public_html/` via File Manager → Extract
4. Env vars (`VITE_*`) are compiled into the JS bundle at build time — set them in `.env` before building, not in cPanel

> **Rule:** Every time a dist recompile is requested, steps 1 and 2 are always performed together. Never deliver a `dist/` without the `.htaccess`.

---

## n8n Automation Layer

### Infrastructure
- **n8n instance:** self-hosted on Railway at `https://primary-production-bfd8.up.railway.app`
- **Workflow file:** `N8nWorkflow..txt` — import manually into n8n (JSON format). Never committed with real tokens inside.
- **Railway persistence note:** n8n on Railway loses SMTP credentials on container restart (SQLite not persisted). Always use HTTP Request nodes with API keys in headers instead of n8n's credential system for external services.

---

### Booking Lead Capture Workflow

**Workflow name:** `Cygnus Booking Lead Capture`

**Full flow:**
```
LeadCaptureModal (browser)
  → POST VITE_BOOKING_WEBHOOK_URL
    → Validate Lead Data (Code node)
    → Is Valid? (IF node)
      → true  → Create Airtable Record → Send Welcome Email → Respond Success
      → false → Respond Validation Error
```

#### Node breakdown

| # | Node | Type | Purpose |
|---|---|---|---|
| 1 | Booking Form Webhook | Webhook (POST) | Receives JSON from LeadCaptureModal |
| 2 | Validate Lead Data | Code (JS) | Validates fullName/phone/email; normalises fields; detects session from `courseDetail` and builds `emailHtml` + `emailSubject` |
| 3 | Is Valid? | IF | Branches on `isValid` boolean |
| 4 | Create Airtable Record | HTTP Request → Airtable API | Writes lead with `Email Status: Pending` |
| 5 | Send Welcome Email | HTTP Request → Brevo API | Sends HTML welcome email; `continueOnFail: true` so lead is never lost if email fails |
| 6 | Respond Success | Respond to Webhook | `{ success: true, message: "Lead submitted successfully" }` |
| 7 | Respond Validation Error | Respond to Webhook | `{ success: false, message: "Missing required fields: …" }` |

#### Payload sent from LeadCaptureModal

```json
{
  "fullName": "Jane Mwangi",
  "phone": "+254700000000",
  "email": "jane@company.com",
  "company": "Acme Ltd",
  "message": "Optional message",
  "source": "Website Form",
  "courseDetail": "NCA Training — April 2026",
  "submittedAt": "2026-04-13T08:00:00.000Z",
  "pageUrl": "https://cygnusample.com/training/nca"
}
```

#### Airtable — Booking Leads table

**Base:** `appCDdfoFtTmAhsTY` | **Table:** `tblzQJc9lYGjXmSvS`

> **CI Network leads** (`source === "CI Network"`) should be routed to a separate table — **Table:** `tblvMluLXvpLwCpxD` (same base). Add an IF branch in the n8n "Validate Lead Data" code node to detect `body.source === 'CI Network'` and point the Airtable HTTP Request at `tblvMluLXvpLwCpxD`. Fields: Name, Email, Phone, Company, Designation (from `designation`), Message, Source, Course / Service Detail, Status, Email Status, Date Submitted, Page URL. CI Network leads are submitted by `CinaLeadModal` — no payment details, adds `designation` (role/title) field.

| Field | Type | Mapped from |
|---|---|---|
| Name | Single line text | `fullName` |
| Email | Single line text | `email` |
| Phone | Phone number | `phone` |
| Company | Single line text | `company` |
| Message | Long text | `message` |
| Source | Single line text | `source` |
| Course / Service Detail | Single line text | `courseDetail` |
| Status | Single select (New/Contacted/In Progress/Converted/Closed) | hardcoded `New` |
| Email Status | Single select (Pending/Sent/Failed) | hardcoded `Pending` on create |
| Date Submitted | Date | `submittedAt.split('T')[0]` |
| Page URL | Single line text | `pageUrl` |
| Comment Text | Long text | Internal notes — not submitted by form |

#### n8n JSON body pattern (HTTP Request → Airtable)
Always use this format in n8n's HTTP Request node UI — valid JSON with `={{ }}` expressions inside values:
```json
{
  "fields": {
    "Name": "={{ $json.fullName }}",
    "Email": "={{ $json.email }}"
  }
}
```
Do NOT wrap the entire body in a single `={{ ({ ... }) }}` expression — n8n UI treats it as a literal string.

---

### Welcome Email — Brevo

**Why Brevo instead of cPanel SMTP:** Railway's outbound connections time out against cPanel SMTP. Brevo's API works reliably from Railway and doesn't use n8n's credential system (avoids Railway persistence issue).

**Brevo API endpoint:** `POST https://api.brevo.com/v3/smtp/email`
**Auth header:** `api-key: YOUR_BREVO_API_KEY`
**Sender domain:** `cygnus.co.ke` — verified in Brevo; DNS records added to cPanel Zone Editor:

| Type | Name | Value |
|---|---|---|
| TXT | `cygnus.co.ke` | `brevo-code:4689e2daaa6a4f8c31f618ca9c2e5fcd` |
| CNAME | `brevo1._domainkey` | `b1.cygnus-co-ke.dkim.brevo.com` |
| CNAME | `brevo2._domainkey` | `b2.cygnus-co-ke.dkim.brevo.com` |
| TXT | `_dmarc` | `v=DMARC1; p=none; rua=mailto:rua@dmarc.brevo.com` |

**Session-specific emails:** `courseDetail` field is used to detect which session the registrant booked and route the correct Zoom details into the email.

| Session | courseDetail match | Zoom Link | Meeting ID | Passcode |
|---|---|---|---|---|
| May 11 & 14 | contains `safety as a value` | `https://us06web.zoom.us/j/84515536711?pwd=jvKybt8VnGIKrBaSOi0EXxyc1Jn2vo.1` | `845 1553 6711` | `1PFYGt` |
| Jun 29 & 30 | default (Risk Assessment / June) | `https://us06web.zoom.us/j/89785548140?pwd=sTHQyngQjaBU3aeSoDybal94eAVbvC.1` | `897 8554 8140` | `3vpRme` |

- Detection logic lives in the **Validate Lead Data** code node — update there when adding new sessions
- Static Zoom link per event — one fixed link sent to all registrants (no per-user generation needed)
- `emailHtml` and `emailSubject` are built in the code node and passed to the Brevo HTTP Request node

---

### FloatingChatWidget — Apex AI

**Webhook:** `VITE_CHAT_WEBHOOK_URL`
**Persona:** Apex — Cygnus Consulting AI advisor
**Lead extraction:** hidden `<!--LEAD:name=|phone=|email=|summary=-->` marker in agent output
**Memory:** Window Buffer Memory, 10-message context, keyed on `sessionId`
**Airtable:** Chat leads base `app2yCaMIPgrnUegP`, table `tblHWaQJU6OxbgUYu`
**Fallback:** static responses when webhook unreachable

---

## Documented decisions

| Decision | Reason |
|---|---|
| Route booking modal through n8n instead of direct Airtable | Keeps Airtable token out of frontend bundle; enables server-side automation |
| Use HTTP Request node for Brevo (not emailSend node) | n8n on Railway loses credentials on restart — API key in header is persistent |
| Use Brevo instead of cPanel SMTP | cPanel SMTP times out from Railway's network |
| `continueOnFail: true` on email node | Lead capture is more critical than email delivery — lead is never lost if email fails |
| Static Zoom link per event | Simpler and more reliable than per-user Zoom generation for cohort-based training |
| `pageUrl: window.location.href` in payload | Tracks which page/course the registration came from |
| Route ArticlePage comments through n8n (not direct Airtable) | Airtable PAT in frontend bundle triggered Avast AV false positive; removed token entirely |
| TrainingCataloguePage uses LeadCaptureModal with courseDetail | Each course card passes its title + category as courseDetail so Airtable records are clearly attributed |
| CINA page (`/meet-us`) uses `CinaLeadModal` not `LeadCaptureModal` | CINA has its own dark-themed modal, no payment details box, adds `designation` (role/title) field, posts with `source: "CI Network"` for n8n routing to separate Airtable table |
| `e.stopPropagation()` on TrainingCataloguePage book buttons | Prevents global click intercept in App.tsx from also firing and opening a second modal |

---

## Errors & Resolutions Log

### 1. n8n webhook body wrapper (typeVersion 2)
**Symptom:** Validation always failed — `Missing required fields: fullName, email` — even when fields were present in the payload.
**Root cause:** n8n webhook node typeVersion 2 wraps the POST body under `.body`. So `$input.first().json` is `{ headers, body, params, query }`, not the payload itself.
**Fix:** First line of every Code node that reads webhook data:
```js
const raw = $input.first().json;
const body = raw.body !== undefined ? raw.body : raw;
```
This handles both typeVersion 1 (raw payload) and typeVersion 2 (wrapped payload).

---

### 2. Airtable token in frontend bundle → AV false positive
**Symptom:** Avast flagged `cygnus.co.ke` as "malicious code detected". Site appeared unsafe to visitors.
**Root cause:** `ArticlePage.tsx` was calling `api.airtable.com` directly from the browser using `VITE_BOOKING_AIRTABLE_TOKEN`. Vite compiles all `VITE_*` env vars into the JS bundle in plain text. Security scanners pattern-match API tokens in client-side JS — identical pattern to data-stealing malware.
**Fix:** Removed direct Airtable call from `ArticlePage.tsx`. Article comments now POST to `VITE_BOOKING_WEBHOOK_URL` (n8n) with `phone: 'N/A'` and `source: 'Article Comment'`. Token removed from bundle entirely.
**Verification:** `grep -r "pat6fupitSdxr6AXE" dist/assets/` — returns nothing after fix.

---

### 3. Brevo email silently failing — Railway IP change
**Symptom:** Webhook returns `{"success":true}`, Airtable records created, but no welcome emails ever delivered. All 93 records showed `Email Status: Pending`.
**Root cause:** Railway container restarted and got a new outbound IP. Brevo's IP allowlist security feature blocked all requests from the unrecognised IP (`34.21.207.239`) with `401 Unauthorized`.
**Fix:** Log into `app.brevo.com` → Security → Authorised IPs → add the new Railway IP.
**Long-term fix:** Remove all IP restrictions from Brevo entirely. The API key is secret and server-side only — IP whitelist adds no practical security but breaks silently on every Railway restart.
**How to diagnose:** In n8n → Executions → open latest execution → click Send Welcome Email node → Output tab shows the 401 error and the unrecognised IP address.

---

### 4. DiagnosticPage auto-scrolls to bottom on load
**Symptom:** Navigating to `/diagnostic` always opened at the bottom of the page.
**Root cause:** React Router's scroll position is inherited from the previous page.
**Fix:** Added `useEffect` in `DiagnosticPage.tsx`:
```tsx
useEffect(() => {
  window.scrollTo({ top: 0, behavior: 'instant' });
}, [screen]);
```
Fires on mount (screen=0) and every time the quiz advances to the next screen.

---

### 5. Missing lucide-react icon import breaks page
**Symptom:** `Uncaught ReferenceError: BarChart3 is not defined` in `App.tsx` — CTASection crashed.
**Root cause:** Added `<BarChart3 />` icon to CTASection but forgot to include it in the lucide-react import at the top of `App.tsx`.
**Fix:** Add the icon name to the existing import statement. Always check the import line when adding new lucide icons to a file.

---

### 6. Apostrophe in JSX single-quoted string literal
**Symptom:** TypeScript errors `TS1005: ':' expected` and `TS1381: Unexpected token` at the line containing "we'll".
**Root cause:** Using a straight apostrophe `'` inside a single-quoted JSX string `'we'll'` terminates the string early.
**Fix:** Use double quotes for strings containing apostrophes: `"we'll"`. Or use `&apos;` / `{'\''}`  as alternatives.

---

### 7. SSL certificate expired — ZeroSSL not auto-renewing
**Symptom:** Site showed browser SSL warning. Avast flagged site. Page rendered without CSS (browser blocked sub-resources on invalid cert). cPanel AutoSSL showed "will not renew — not issued via AutoSSL".
**Root cause:** ZeroSSL 90-day free cert expired (25 Feb → 26 May 2026). cPanel's AutoSSL only auto-renews certs it issued — manually uploaded ZeroSSL certs are ignored.
**Fix in progress:** Migrating to Cloudflare (free plan). Cloudflare issues its own SSL cert that never expires from the user's perspective. Nameserver update at KENIC registrar is the final step.
**cPanel AutoSSL note:** The SSL/TLS Wizard on this hosting account shows "There are no SSL/TLS products available" — the hosting provider has not enabled AutoSSL/Let's Encrypt. Manual cert upload is the only cPanel option, which means repeating every 90 days.

---

### 8. TrainingCataloguePage form not connected to Airtable
**Symptom:** "Book This Course" buttons on training catalogue relied on global click intercept but opened a generic modal with no course context. No data connected to Airtable.
**Fix:** Converted `TrainingCataloguePage` to a stateful component. Each `CourseCard` now calls `onBook(course.title)` which sets `selectedCourse` state as `"Category — Course Title"` and opens `LeadCaptureModal` with `courseDetail` and `source: 'Training Catalogue'` pre-filled. Used `e.stopPropagation()` to prevent the global click intercept from also firing.

---

### 9. Meet Us page team photo showing ceiling instead of team
**Symptom:** `/meet-us` page showed a blurry ceiling with lights instead of the team photo.
**Root cause 1:** Wrong filename — code referenced `team-photo.jpg.jpeg` but actual file was `team photo.jpeg` (space in name, no hyphen).
**Root cause 2:** `objectPosition: 'center top'` was cropping to the top of the image (the ceiling). 
**Fix:** Corrected the `src` to `/images/team photo.jpeg` and removed `object-cover`, `maxHeight`, and `objectPosition` constraints so the full image renders at its natural dimensions.

---

## Pending work

| Item | Status | Notes |
|---|---|---|
| Cloudflare SSL migration | In progress | Cloudflare account created; nameserver update at KENIC pending |
| IntaSend payment integration | Planned | STK Push flow; account setup required first |
| Resend welcome emails to 93 pending registrants | Pending | All records from before June 2026 have Email Status: Pending — never received welcome email due to Brevo IP block |
| Brevo IP restriction | Recommended | Remove IP whitelist from Brevo to prevent future silent failures on Railway restart |
