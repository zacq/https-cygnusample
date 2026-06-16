import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import CinaLeadModal from '../components/CinaLeadModal';
import './cinaPage.css';

const SYMPTOMS = [
  'Costs & wastages keep increasing',
  'Profit not growing despite continuous effort',
  'No visibility into business performance',
  'Cash flow challenges',
  'Busy team but low productivity',
  'Increased customer complaints',
  'Growth creating chaos',
  'Key decisions depending on few people',
  'Too much firefighting',
  'Strategy not translating into execution',
];

const QUESTIONS = [
  'What operational issue is currently limiting growth?',
  'Where do you believe money is leaking in your business?',
  'What processes create the most customer complaints?',
  'How much management time is spent firefighting?',
  'Which KPIs concern you most right now — and do you really own any?',
  'If you could fix one operational problem this quarter, what would it be?',
  "What's the productivity level of your whole team and machines?",
  "What's preventing your business from scaling faster?",
  'How confident are you that your processes can support future growth?',
  'Do you have a 5-year strategy — and do daily operations execute to achieve it?',
];

interface Program {
  tag: string;
  icon: string;
  title: string;
  desc: string;
  label: string;
  action: 'modal' | 'diagnostic' | 'catalogue' | 'youtube';
}

const TICKER_ITEMS = [
  '📅 Next Executive Roundtable Breakfast — date to be announced. Reserve your seat now.',
  '🎓 Monthly Low-Cost NCA Training — Managing Construction Site Safety. Register today.',
  '📹 Free Monthly Zoom session coming up — register your interest to get the link.',
  '🔔 CINA is growing — invite a fellow business owner to join the network.',
  '📊 Free 5-minute Self-Assessment live now — diagnose your operational health across 10 dimensions.',
];

const PROGRAMS: Program[] = [
  { tag: 'Free', icon: '📹', title: 'Free Monthly Zooms', desc: 'Monthly virtual sessions for awareness and practical insights on operations improvement.', label: 'Register Interest', action: 'modal' },
  { tag: 'Free · In person', icon: '☕', title: 'Executive Roundtable Breakfast', desc: 'Exclusive in-person dialogue for Business Owners, CEOs and Executive Decision Makers.', label: 'Reserve Your Seat', action: 'modal' },
  { tag: 'Free · 5 min', icon: '📊', title: 'Free Self-Assessment', desc: 'Diagnose your operational health across 10 dimensions in under 5 minutes.', label: 'Take the Assessment', action: 'diagnostic' },
  { tag: 'Free content', icon: '▶', title: 'YouTube: Step of Power', desc: 'Content that builds awareness and drives action toward operational excellence.', label: 'Watch & Subscribe', action: 'youtube' },
  { tag: 'Low cost', icon: '📘', title: 'Monthly Low-Cost Training', desc: 'Optimizing staff potential through the practice of operations excellence. See the programs outline.', label: 'View Programs', action: 'catalogue' },
  { tag: 'Free · 1:1', icon: '🤝', title: '1:1 Physical Assessment', desc: 'A free face-to-face dialogue and assessment — plus free affiliate membership.', label: 'Request a Visit', action: 'modal' },
];

const SCOPE = [
  'Operations Improvement & Excellence',
  'Team Productivity',
  'Business Finance Operations',
  'Sales Performance & Business Development',
  'Logistics & Supply Value Chain',
  'ESG Framework',
  'Market Intelligence & Data Analytics',
  'Strategy Deployment',
  'ISO Management Systems',
];

const GAUGE_LEN = 314.16;

function getGaugeState(count: number): { state: string; msg: React.ReactNode } {
  if (count === 0) return {
    state: 'Select what applies',
    msg: <>Most leaders find <b>3 or more</b> of these draining the business at once.</>,
  };
  if (count <= 2) return {
    state: 'Early leaks',
    msg: <>Even <b>{count}</b> active leak{count > 1 ? 's' : ''} compounds over a year. Worth a dialogue before it grows.</>,
  };
  if (count <= 5) return {
    state: 'Significant drag',
    msg: <><b>{count} areas</b> are draining at once — this is exactly where reclaim &amp; re-fill pays back fastest.</>,
  };
  if (count <= 8) return {
    state: 'Heavy drag',
    msg: <><b>{count} areas</b> leaking together. The reclaimable upside here is substantial.</>,
  };
  return {
    state: 'Maximum upside',
    msg: <><b>{count} of 10</b> — almost everything is recoverable. One structured conversation can turn this around.</>,
  };
}

const MeetUsPage: React.FC = () => {
  const [selected, setSelected] = useState<Set<number>>(new Set());
  const [modal, setModal] = useState<{ open: boolean; program: string }>({ open: false, program: '' });
  const pageRef = useRef<HTMLDivElement>(null);

  const openModal = (program = '') => setModal({ open: true, program });
  const closeModal = () => setModal(m => ({ ...m, open: false }));

  const pct = Math.round((selected.size / SYMPTOMS.length) * 100);
  const dashOffset = GAUGE_LEN - (GAUGE_LEN * pct / 100);
  const { state: gaugeState, msg: gaugeMsg } = getGaugeState(selected.size);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  useEffect(() => {
    const root = pageRef.current;
    if (!root) return;
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });
    root.querySelectorAll('.reveal').forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);

  const toggleSymptom = (i: number) => {
    setSelected(prev => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i); else next.add(i);
      return next;
    });
  };

  return (
    <div id="cina-page" ref={pageRef}>

      {/* ── Nav ─────────────────────────────────────────────── */}
      <nav className="cina-nav">
        <div className="wrap nav-inner">
          <a className="brand" href="#top">
            <span className="brand-mark">C</span>
            <span>
              <b>CINA</b>
              <span className="sub">CONTINUOUS IMPROVEMENT NETWORK</span>
            </span>
          </a>
          <div className="nav-links">
            <a href="#diagnostic">Diagnose</a>
            <a href="#programs">Programs</a>
            <a href="#philosophy">Philosophy</a>
            <a href="#scope">Scope</a>
          </div>
          <button className="cbtn cbtn-primary" onClick={() => openModal()}>
            Let's Connect <span className="arrow">→</span>
          </button>
        </div>
      </nav>

      {/* ── Ticker ──────────────────────────────────────────── */}
      <div className="cina-ticker" aria-label="Monthly updates">
        <span className="ticker-label">MONTHLY UPDATES</span>
        <div className="ticker-track-wrap">
          <div className="ticker-track">
            {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
              <span key={i} className="ticker-item">{item}<span className="ticker-dot">◆</span></span>
            ))}
          </div>
        </div>
      </div>

      {/* ── Hero ────────────────────────────────────────────── */}
      <header className="hero" id="top">
        <div className="wrap hero-grid">
          <div className="hero-copy reveal in">
            <div className="eyebrow hero-eyebrow">Continuous Improvement Network Association</div>
            <h1>
              Reclaim
              <span className="refill">&amp; Re-Fill</span>
            </h1>
            <p className="hook">
              Your business is leaking value you can't see —{' '}
              <em>profit, cash flow, capacity</em>.
            </p>
            <p className="lede">
              You're a Business Owner, CEO or Executive Decision Maker. CINA exists to
              connect, equip and empower you to <b>reclaim</b> wasted operational potential —
              and <b>re-fill</b> your business with profitability, cash flow and sustainable growth.
            </p>
            <div className="hero-cta">
              <button className="cbtn cbtn-gold" onClick={() => openModal()}>
                Book: Let's Connect <span className="arrow">→</span>
              </button>
              <a className="cbtn cbtn-ghost" href="#diagnostic">
                Try the 60-second diagnostic
              </a>
            </div>
            <div className="hero-proof">
              <span>10 operational dimensions</span>
              <span>Free self-assessment</span>
              <span>Under 5 minutes</span>
            </div>
          </div>

          <div className="hero-visual reveal in">
            <div className="float-pill">RECLAIM &amp; RE-FILL</div>
            <div className="portrait">
              <div className="portrait-photo" />
              <div className="portrait-frame">
                <span className="portrait-tag">For decision makers</span>
                <h4>Operations excellence,<br />built for owners &amp; CEOs.</h4>
              </div>
            </div>
            <div className="gauge-card">
              <div className="gc-label">Operational health</div>
              <div className="gc-num">10<small>/10</small></div>
              <div className="gc-sub">dimensions diagnosed, in under 5 minutes.</div>
            </div>
          </div>
        </div>
      </header>

      {/* ── Diagnostic ──────────────────────────────────────── */}
      <section className="diag" id="diagnostic">
        <div className="wrap diag-inner">
          <div className="diag-copy reveal">
            <div className="eyebrow diag-eyebrow">Are you awake at night?</div>
            <h2>Imagining how your business is not responding…</h2>
            <p className="sub">
              Tap every symptom that sounds familiar. Watch how much potential is sitting
              locked up — value CINA helps you reclaim.
            </p>
            <div className="symptoms">
              {SYMPTOMS.map((s, i) => (
                <div
                  key={i}
                  className={`sym${selected.has(i) ? ' on' : ''}`}
                  role="checkbox"
                  aria-checked={selected.has(i)}
                  tabIndex={0}
                  onClick={() => toggleSymptom(i)}
                  onKeyDown={e => { if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); toggleSymptom(i); } }}
                >
                  <span className="tick">
                    <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </span>
                  <span>{s}</span>
                </div>
              ))}
            </div>
          </div>

          <aside className="meter reveal">
            <div className="meter-label">Estimated reclaimable potential</div>
            <svg className="gauge-svg" width="240" height="140" viewBox="0 0 240 140" aria-hidden="true">
              <path d="M20 130 A100 100 0 0 1 220 130" fill="none" stroke="rgba(255,255,255,.10)" strokeWidth="16" strokeLinecap="round" />
              <path
                d="M20 130 A100 100 0 0 1 220 130"
                fill="none"
                stroke="url(#gg)"
                strokeWidth="16"
                strokeLinecap="round"
                strokeDasharray="314.16"
                strokeDashoffset={dashOffset}
                style={{ transition: 'stroke-dashoffset .6s cubic-bezier(.2,.7,.2,1)' }}
              />
              <defs>
                <linearGradient id="gg" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0" stopColor="#E86A52" />
                  <stop offset="1" stopColor="#F0B14B" />
                </linearGradient>
              </defs>
            </svg>
            <div className="gauge-readout">
              <div className="pct"><span>{pct}</span><small>%</small></div>
              <div className="state">{gaugeState}</div>
            </div>
            <p className="meter-msg">{gaugeMsg}</p>
            <button className="cbtn cbtn-gold" onClick={() => openModal('Diagnostic — Reclaim Potential')}>
              Reclaim it — Let's Connect <span className="arrow">→</span>
            </button>
          </aside>
        </div>
      </section>

      {/* ── 10 Questions ────────────────────────────────────── */}
      <section className="section" id="questions">
        <div className="wrap">
          <div className="section-head reveal">
            <div className="eyebrow">Ask yourself</div>
            <h2>10 questions every business leader must answer</h2>
            <p>Honest answers here are where reclaiming begins. No diagnosis, no plan — until you can name what's really happening.</p>
          </div>
          <div className="q-grid">
            {QUESTIONS.map((q, i) => (
              <div className="q reveal" key={i}>
                <span className="qn">{i + 1}</span>
                <p>{q}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Driver Band ─────────────────────────────────────── */}
      <section className="band">
        <div className="wrap band-inner reveal">
          <h2>
            Operations Improvement &amp; Excellence is your strategic driver of{' '}
            <span className="hl">Profitability, Cash Flow, Customer Satisfaction, Growth and Sustainability.</span>
          </h2>
          <div className="drivers">
            {['Profitability', 'Cash Flow', 'Customer Satisfaction', 'Growth', 'Sustainability'].map(d => (
              <span className="driver" key={d}>{d}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Programs ────────────────────────────────────────── */}
      <section className="section" id="programs">
        <div className="wrap">
          <div className="section-head center reveal">
            <div className="eyebrow">We are CINA — understand our programs</div>
            <h2>How CINA supports your journey</h2>
            <p>Most of it is free. All of it moves you from awareness to action.</p>
          </div>
          <div className="prog-grid">
            {PROGRAMS.map(p => (
              <div className="prog reveal" key={p.title}>
                <div className="pico" aria-hidden="true">{p.icon}</div>
                <span className="ptag">{p.tag}</span>
                <h3>{p.title}</h3>
                <p>{p.desc}</p>
                {p.action === 'modal' && (
                  <button className="plink" onClick={() => openModal(p.title)}>
                    {p.label} <span className="arrow">→</span>
                  </button>
                )}
                {p.action === 'diagnostic' && (
                  <Link className="plink" to="/diagnostic">
                    {p.label} <span className="arrow">→</span>
                  </Link>
                )}
                {p.action === 'catalogue' && (
                  <Link className="plink" to="/training/catalogue">
                    {p.label} <span className="arrow">→</span>
                  </Link>
                )}
                {p.action === 'youtube' && (
                  <a className="plink" href="https://www.youtube.com/@PoweringHouseTransformative" target="_blank" rel="noopener noreferrer">
                    {p.label} <span className="arrow">→</span>
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Philosophy ──────────────────────────────────────── */}
      <section className="section philo" id="philosophy">
        <div className="wrap philo-grid">
          <div className="reveal">
            <div className="eyebrow" style={{ color: 'var(--azure)', marginBottom: 16 }}>The philosophy</div>
            <h2>Business Money <span className="amp">&amp;</span> Business Excellence</h2>
            <p className="quote" style={{ marginTop: 24 }}>
              "Everybody has a need they wish and desire to be addressed. Knowing the pain
              point, addressing the need and satisfying it requires insightful engagement."
            </p>
            <p>
              Not about disconnected tools — but <b>real Operations Improvement and Excellence</b>.
              To increase market impact, win customer loyalty, accelerate profitability and
              improve commercial excellence, every business leader needs the right skills
              and a network to draw from.
            </p>
            <p>
              Business Owners and Decision Makers — welcome for dialogue. This might be the
              missing link you've been waiting much longer for.
            </p>
          </div>
          <div className="pillars reveal">
            <div className="pillar">
              <span className="pn">01</span>
              <div>
                <h4>Business Money Operations</h4>
                <p>Optimizing cash flow and setting up finance structures to close cash leakages.</p>
              </div>
            </div>
            <div className="pillar">
              <span className="pn">02</span>
              <div>
                <h4>Operations Improvement &amp; Excellence</h4>
                <p>Building from basics — process flow, waste reduction, value stream, productivity and workplace organization.</p>
              </div>
            </div>
            <div className="pillar">
              <span className="pn">03</span>
              <div>
                <h4>Continuous Improvement Practice</h4>
                <p>Change is people-driven. We capacity-build your team with continuous professional programs — low investment, real improvement.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Scope ───────────────────────────────────────────── */}
      <section className="section scope-section" id="scope">
        <div className="wrap">
          <div className="section-head center reveal">
            <div className="eyebrow">Key scope</div>
            <h2>One network. Every lever that moves the business.</h2>
            <p>The full system we work across — so improvement in one area doesn't leak out of another.</p>
          </div>
          <div className="scope-grid">
            {SCOPE.map((s, i) => (
              <div className="scope-item reveal" key={s}>
                <div className="sn">{String(i + 1).padStart(2, '0')}</div>
                <h4>{s}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Our Leads ───────────────────────────────────────── */}
      <section className="section" id="leads">
        <div className="wrap">
          <div className="section-head center reveal">
            <div className="eyebrow">Our leads</div>
            <h2>The people behind the network</h2>
          </div>
          <div className="leads-grid reveal">
            <div className="lead">
              <div className="lead-photo">
                <img src="/images/ci-network/anthony.jpg" alt="Anthony Maina" />
              </div>
              <h4>Anthony Maina</h4>
              <span>CEO — Food Cloud Mega</span>
              <span style={{ fontSize: 12, color: 'var(--azure)', fontFamily: '"Space Mono", monospace', letterSpacing: '.06em', display: 'block', marginTop: 4 }}>Market Intelligence &amp; Data Analytics</span>
            </div>
            <div className="lead">
              <div className="lead-photo">
                <img src="/images/ci-network/gachoka.jpg" alt="Gachoka Kang'ata" />
              </div>
              <h4>Gachoka Kang'ata</h4>
              <span>CEO — Cygnus Safety Consulting</span>
              <span style={{ fontSize: 12, color: 'var(--azure)', fontFamily: '"Space Mono", monospace', letterSpacing: '.06em', display: 'block', marginTop: 4 }}>Business Finance Operations &amp; Excellence</span>
            </div>
            <div className="lead">
              <div className="lead-photo">
                <img src="/images/ci-network/esther.jpg" alt="Esther Maina" />
              </div>
              <h4>Esther Maina</h4>
              <span>CEO — M-Link Group International</span>
              <span style={{ fontSize: 12, color: 'var(--azure)', fontFamily: '"Space Mono", monospace', letterSpacing: '.06em', display: 'block', marginTop: 4 }}>Business Development</span>
            </div>
            <div className="lead">
              <div className="lead-photo">
                <img src="/images/ci-network/julius.jpg" alt="Julius Mugo" />
              </div>
              <h4>Julius Mugo</h4>
              <span>CEO — Quest Spark Consulting</span>
              <span style={{ fontSize: 12, color: 'var(--azure)', fontFamily: '"Space Mono", monospace', letterSpacing: '.06em', display: 'block', marginTop: 4 }}>Igniting Potential &amp; Productivity of Team</span>
            </div>
            <div className="lead">
              <div className="lead-photo">
                <img src="/images/ci-network/newton.jpg" alt="Newton Opiyo" />
              </div>
              <h4>Newton Opiyo</h4>
              <span>Sales Consultant &amp; Business Coach — Bannem Business Consultancy</span>
              <span style={{ fontSize: 12, color: 'var(--azure)', fontFamily: '"Space Mono", monospace', letterSpacing: '.06em', display: 'block', marginTop: 4 }}>Sales Performance &amp; Business Development</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Final CTA ───────────────────────────────────────── */}
      <section className="final" id="connect">
        <div className="wrap final-inner reveal">
          <h2>Ready to Reclaim Your Business Potential?</h2>
          <p>
            One conversation can be the turning point. Connect with CINA and let's
            explore what's possible for your business.
          </p>
          <div className="final-cta">
            <button className="cbtn cbtn-gold" onClick={() => openModal()}>
              Book: Let's Connect <span className="arrow">→</span>
            </button>
            <a className="cbtn cbtn-ghost" href="https://www.linkedin.com/in/continuous-improvement-network-association-63a362416?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" target="_blank" rel="noopener noreferrer">
              Connect on LinkedIn
            </a>
          </div>
        </div>
      </section>

      {/* ── Footer ──────────────────────────────────────────── */}
      <footer className="cina-foot">
        <div className="wrap">
          <div className="foot-grid">
            <div>
              <a className="brand" href="#top">
                <span className="brand-mark">C</span>
                <span>
                  <b>CINA</b>
                  <span className="sub">CONTINUOUS IMPROVEMENT NETWORK</span>
                </span>
              </a>
              <p className="tag">East Africa's network for operational excellence — helping owners and CEOs reclaim wasted potential.</p>
            </div>
            <div>
              <h5>Services</h5>
              <ul>
                <li><a href="#scope">Operations Excellence</a></li>
                <li><a href="#scope">Business Finance Ops</a></li>
                <li><a href="#scope">Team Productivity</a></li>
                <li><a href="#scope">Strategy Deployment</a></li>
              </ul>
            </div>
            <div>
              <h5>Company</h5>
              <ul>
                <li><a href="#philosophy">Philosophy</a></li>
                <li><a href="#programs">Programs</a></li>
                <li><a href="#diagnostic">Self-Assessment</a></li>
                <li><a href="#connect">Contact</a></li>
              </ul>
            </div>
            <div>
              <h5>Contact</h5>
              <div className="foot-contact" style={{ marginBottom: 12 }}>📍&nbsp; Riabai Centre, Kiambu, Kenya</div>
              <button className="cbtn cbtn-primary" onClick={() => openModal()} style={{ fontSize: 14, padding: '11px 18px' }}>
                Book a dialogue <span className="arrow">→</span>
              </button>
            </div>
          </div>
          <div className="foot-bottom">
            <span>© {new Date().getFullYear()} CINA — Continuous Improvement Network Association</span>
            <span>RECLAIM &amp; RE-FILL</span>
          </div>
        </div>
      </footer>

      <CinaLeadModal
        isOpen={modal.open}
        onClose={closeModal}
        programInterest={modal.program}
      />
    </div>
  );
};

export default MeetUsPage;
