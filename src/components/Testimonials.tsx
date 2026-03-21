import React, { useRef, useState } from 'react';
import { motion } from 'motion/react';

interface Testimonial {
  name: string;
  role: string;
  quote: string;
  rating: number;
}

const TESTIMONIALS: Testimonial[] = [
  {
    name: 'James Mwangi',
    role: 'Operations Director, Nairobi Manufacturing Ltd',
    quote: 'Cygnus transformed our shop floor in 90 days. Lead times dropped by 38% and our team actually owns the process now.',
    rating: 5,
  },
  {
    name: 'Amina Odhiambo',
    role: 'CEO, East Africa Logistics Group',
    quote: 'The Kaizen facilitation training was immediately practical. Our managers ran their first improvement event the following week.',
    rating: 5,
  },
  {
    name: 'Peter Kariuki',
    role: 'Plant Manager, Rift Valley Foods',
    quote: 'OEE went from 67% to 89% within six months. The Cygnus team embedded with us and locked in every single gain.',
    rating: 5,
  },
  {
    name: 'Grace Wanjiku',
    role: 'Head of Quality, Mombasa Packaging Co.',
    quote: 'First-pass yield is now above 98%. We used to accept rework as normal — that mindset has completely changed.',
    rating: 5,
  },
  {
    name: 'Samuel Otieno',
    role: 'Finance Manager, Kisumu Industrial Supplies',
    quote: 'The financial impact frameworks helped us quantify waste for the first time. We found KES 14M in recoverable losses in the first assessment.',
    rating: 5,
  },
  {
    name: 'Fatuma Hassan',
    role: 'HSE Manager, Coastal Construction Ltd',
    quote: 'The Working at Heights certification is the most thorough we have encountered in Kenya. Zero incidents since certification.',
    rating: 5,
  },
  {
    name: 'David Njoroge',
    role: 'MD, Thika Agro-Processing',
    quote: 'Strategy deployment finally sticks. Hoshin Kanri gave us a planning cadence we did not know we were missing.',
    rating: 5,
  },
  {
    name: 'Esther Chebet',
    role: 'Continuous Improvement Lead, Eldoret Textiles',
    quote: 'Three months in and our COPQ has dropped by 24%. The roadmap Cygnus built with us is something we genuinely use every week.',
    rating: 5,
  },
];

// Duplicate for seamless infinite scroll loop
const TRACK = [...TESTIMONIALS, ...TESTIMONIALS];

const Stars: React.FC<{ n: number }> = ({ n }) => (
  <div className="flex gap-0.5 mb-4">
    {Array.from({ length: n }).map((_, i) => (
      <svg key={i} className="w-4 h-4 text-brand-gold fill-current" viewBox="0 0 20 20">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.368 2.448a1 1 0 00-.364 1.118l1.286 3.957c.3.921-.755 1.688-1.54 1.118L10 14.347l-3.951 2.778c-.784.57-1.838-.197-1.539-1.118l1.286-3.957a1 1 0 00-.364-1.118L2.064 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.286-3.957z" />
      </svg>
    ))}
  </div>
);

const Testimonials: React.FC = () => {
  const [paused, setPaused] = useState(false);
  const touchStartX = useRef(0);

  return (
    <section className="py-24 bg-white overflow-hidden">
      {/* Heading */}
      <div className="max-w-7xl mx-auto px-6 mb-12 text-center">
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-brand-blue font-bold uppercase tracking-widest text-sm mb-3"
        >
          Client Results
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-5xl font-display text-brand-navy"
        >
          What Our <span className="italic text-brand-accent">Clients Say</span>
        </motion.h2>
      </div>

      {/* Scrolling track */}
      <div
        className="relative"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onTouchStart={(e) => { touchStartX.current = e.touches[0].clientX; }}
        onTouchEnd={(e) => {
          // simple swipe hint — CSS animation handles locomotion
          const delta = touchStartX.current - e.changedTouches[0].clientX;
          if (Math.abs(delta) < 5) return; // tap, ignore
        }}
      >
        {/* Edge fade masks */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

        <div
          className="flex gap-6 px-6"
          style={{
            width: 'max-content',
            animation: paused ? 'none' : 'testimonialScroll 52s linear infinite',
          }}
        >
          {TRACK.map((t, i) => (
            <div
              key={i}
              className="w-80 shrink-0 bg-slate-50 border border-slate-100 rounded-3xl p-8 hover:border-brand-blue/20 hover:shadow-lg transition-all"
            >
              <Stars n={t.rating} />
              <p className="text-slate-700 leading-relaxed mb-6 text-sm">"{t.quote}"</p>
              <div className="border-t border-slate-100 pt-4">
                <p className="font-bold text-brand-navy text-sm">{t.name}</p>
                <p className="text-xs text-slate-500 mt-0.5">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
