import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Camera } from 'lucide-react';

interface GalleryItem {
  id: number;
  src: string;
  caption: string;
  category: 'events' | 'partnerships';
}

const gallery: GalleryItem[] = [
  // Add photo entries here: { id: 1, src: '/images/events/photo.jpg', caption: 'Caption', category: 'events' }
];

const categories = ['All', 'Events', 'Partnerships'] as const;
type Filter = typeof categories[number];

const EventsPage: React.FC = () => {
  const [filter, setFilter] = useState<Filter>('All');
  const [lightbox, setLightbox] = useState<GalleryItem | null>(null);

  const filtered = filter === 'All'
    ? gallery
    : gallery.filter(g => g.category === filter.toLowerCase());

  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative pt-32 pb-20 bg-brand-navy overflow-hidden">
        <div className="absolute top-0 left-1/3 w-[600px] h-[600px] rounded-full bg-brand-blue/10 blur-[120px] pointer-events-none" />
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #fff 1px, transparent 0)', backgroundSize: '40px 40px' }} />

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-blue/20 border border-brand-blue/40 text-brand-accent text-xs font-bold uppercase tracking-widest mb-6"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-brand-accent animate-pulse" />
            Gallery
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.7 }}
            className="text-5xl md:text-6xl font-display text-white leading-tight mb-4"
          >
            Events &amp;{' '}
            <span className="italic text-brand-accent">Partners</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.28, duration: 0.7 }}
            className="text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed"
          >
            A look at our ongoing work, training events, and the organisations we collaborate with.
          </motion.p>
        </div>
      </section>

      {/* Filter tabs */}
      <section className="max-w-6xl mx-auto px-6 py-10">
        <div className="flex flex-wrap gap-3 mb-10">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${
                filter === cat
                  ? 'bg-brand-blue text-white shadow-md'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="relative group overflow-hidden rounded-2xl bg-slate-100 aspect-[4/3] cursor-pointer shadow-sm hover:shadow-lg transition-shadow"
                onClick={() => setLightbox(item)}
              >
                <img
                  src={item.src}
                  alt={item.caption}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-brand-navy/0 group-hover:bg-brand-navy/40 transition-all duration-300 flex items-end">
                  <p className="text-white text-sm font-medium px-4 py-3 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    {item.caption}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          /* Empty state */
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-20 h-20 rounded-full bg-slate-100 flex items-center justify-center mb-6">
              <Camera className="w-8 h-8 text-slate-400" />
            </div>
            <h3 className="text-xl font-semibold text-slate-700 mb-2">Photos coming soon</h3>
            <p className="text-slate-400 max-w-sm">
              We're curating our gallery. Check back shortly for photos from our events and partnerships.
            </p>
          </div>
        )}
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={() => setLightbox(null)}
          >
            <button
              className="absolute top-5 right-5 text-white/70 hover:text-white transition-colors"
              onClick={() => setLightbox(null)}
            >
              <X className="w-7 h-7" />
            </button>
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="max-w-4xl w-full"
              onClick={e => e.stopPropagation()}
            >
              <img
                src={lightbox.src}
                alt={lightbox.caption}
                className="w-full rounded-xl object-contain max-h-[80vh]"
              />
              {lightbox.caption && (
                <p className="text-white/70 text-sm text-center mt-3">{lightbox.caption}</p>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
};

export default EventsPage;
