import React, { useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, TrendingUp, ChevronDown } from 'lucide-react';

interface Node {
  x: number; y: number;
  vx: number; vy: number;
  radius: number;
}

const Hero: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let raf: number;
    const nodes: Node[] = [];
    const NODE_COUNT = 70;
    const MAX_DIST = 160;

    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    for (let i = 0; i < NODE_COUNT; i++) {
      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        radius: Math.random() * 1.8 + 0.8,
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      nodes.forEach(n => {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > canvas.width)  n.vx *= -1;
        if (n.y < 0 || n.y > canvas.height) n.vy *= -1;
      });

      // Lines
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx   = nodes[i].x - nodes[j].x;
          const dy   = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < MAX_DIST) {
            const alpha = (1 - dist / MAX_DIST) * 0.28;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(27, 110, 194, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      // Nodes
      nodes.forEach(n => {
        const grad = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.radius * 4);
        grad.addColorStop(0, 'rgba(14, 165, 214, 0.9)');
        grad.addColorStop(1, 'rgba(14, 165, 214, 0)');
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.radius * 4, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();
      });

      raf = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-brand-navy">
      {/* Canvas network */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ opacity: 0.6 }}
      />

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-navy via-brand-navy/90 to-[#0a2a4a]/80 pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-brand-navy to-transparent pointer-events-none" />

      {/* Glow orbs */}
      <div className="absolute top-1/4 left-1/3 w-[600px] h-[600px] rounded-full bg-brand-blue/10 blur-[120px] pointer-events-none animate-pulse-glow" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-brand-accent/8 blur-[80px] pointer-events-none animate-pulse-glow" style={{ animationDelay: '3s' }} />

      <div className="relative z-10 max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center w-full py-20">
        {/* Left — Copy */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-blue/20 border border-brand-blue/40 text-brand-accent text-xs font-bold uppercase tracking-widest mb-6"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-brand-accent animate-pulse" />
            Operational Excellence Partner
          </motion.span>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-display text-white leading-[1.05] mb-6">
            Accelerate{' '}
            <span className="italic text-brand-accent">Efficiency</span>,<br />
            Maximize{' '}
            <span className="relative inline-block">
              Profit.
              <motion.span
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.8, duration: 0.7, ease: "easeOut" }}
                className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-brand-blue to-brand-accent origin-left"
              />
            </span>
          </h1>

          <p className="text-lg md:text-xl text-slate-300 mb-10 max-w-lg leading-relaxed">
            We embed Lean Management, Kaizen principles, and world-class safety standards
            into your organization — eliminating waste and unlocking sustainable growth.
          </p>

          <div className="flex flex-wrap gap-4 mb-12">
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="bg-brand-blue hover:bg-brand-accent text-white px-8 py-4 rounded-xl font-bold text-lg transition-all flex items-center gap-2 group shadow-2xl shadow-brand-blue/30"
            >
              Book a Strategy Call
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.button>
            <motion.a
              href="#services"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="bg-white/10 hover:bg-white/18 backdrop-blur-sm text-white px-8 py-4 rounded-xl font-bold text-lg transition-all border border-white/20"
            >
              Explore Services
            </motion.a>
          </div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.7 }}
            className="flex items-center gap-8 border-t border-white/10 pt-8"
          >
            {[
              { value: '15+', label: 'Years Experience' },
              { value: '500+', label: 'Projects Delivered' },
              { value: '98%', label: 'Client Satisfaction' },
            ].map((stat, i) => (
              <React.Fragment key={stat.label}>
                {i > 0 && <div className="w-px h-10 bg-white/10" />}
                <div>
                  <div className="text-3xl font-bold text-white">{stat.value}</div>
                  <div className="text-sm text-slate-400">{stat.label}</div>
                </div>
              </React.Fragment>
            ))}
          </motion.div>
        </motion.div>

        {/* Right — Floating cards */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="hidden lg:flex flex-col gap-6 relative"
        >
          {/* Main metric card */}
          <div className="animate-float">
            <div className="glass-card rounded-3xl p-8 max-w-sm ml-auto">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-emerald-400" />
                </div>
                <span className="text-white font-semibold">Efficiency Gain</span>
              </div>
              <div className="text-5xl font-bold text-white mb-1">+32%</div>
              <div className="text-slate-400 text-sm">Average operational efficiency improvement within 90 days.</div>
              <div className="mt-4 h-2 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: '72%' }}
                  transition={{ delay: 1.2, duration: 1.4, ease: "easeOut" }}
                  className="h-full bg-gradient-to-r from-brand-blue to-brand-accent rounded-full"
                />
              </div>
            </div>
          </div>

          {/* Secondary card */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8, duration: 0.7 }}
            className="animate-float-slow"
            style={{ animationDelay: '2s' }}
          >
            <div className="glass-card rounded-2xl p-6 max-w-xs">
              <div className="text-xs text-brand-accent font-bold uppercase tracking-widest mb-3">Active Projects</div>
              <div className="flex gap-3 items-end">
                {[65, 82, 54, 91, 73, 88].map((h, i) => (
                  <motion.div
                    key={i}
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: 1 }}
                    transition={{ delay: 1 + i * 0.08, duration: 0.5, ease: "easeOut" }}
                    className="flex-1 rounded-sm origin-bottom"
                    style={{
                      height: `${h * 0.6}px`,
                      background: i === 5
                        ? 'linear-gradient(to top, #1B6EC2, #0EA5D6)'
                        : 'rgba(255,255,255,0.15)',
                    }}
                  />
                ))}
              </div>
              <div className="mt-3 text-white text-sm font-medium">12 ongoing engagements</div>
            </div>
          </motion.div>

          {/* Certification badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="absolute -left-8 top-1/2 -translate-y-1/2"
          >
            <div className="glass-card rounded-2xl px-5 py-4 flex items-center gap-3 animate-float" style={{ animationDelay: '1s' }}>
              <div className="w-9 h-9 rounded-full bg-brand-gold/20 flex items-center justify-center text-lg">⭐</div>
              <div>
                <div className="text-white text-sm font-bold">GWO Certified</div>
                <div className="text-slate-400 text-xs">Safety Standard</div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40 z-10"
      >
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
