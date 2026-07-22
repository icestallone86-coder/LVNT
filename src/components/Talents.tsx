import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Instagram, Music, X, Sparkles, Trophy } from 'lucide-react';
import { Talent } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface TalentsProps {
  talents: Talent[];
}

export const Talents: React.FC<TalentsProps> = ({ talents }) => {
  const { lang, t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>('Tous');
  const [selectedTalent, setSelectedTalent] = useState<Talent | null>(null);

  const categories = lang === 'en'
    ? ['All', 'Musique', 'Direction Artistique', 'Digital & Content', 'Production']
    : ['Tous', 'Musique', 'Direction Artistique', 'Digital & Content', 'Production'];

  const filteredTalents =
    (selectedCategory === 'Tous' || selectedCategory === 'All')
      ? talents
      : talents.filter((talent) => talent.category === selectedCategory);

  return (
    <section id="talents" className="py-28 lg:py-36 px-6 lg:px-12 bg-black relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8 border-b border-zinc-900 pb-8">
          <div>
            <span className="text-zinc-500 uppercase tracking-[0.3em] text-xs font-semibold mb-3 block font-mono-tech">
              {t('talents.tag')}
            </span>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white font-display">
              {t('talents.title')}
            </h2>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 text-[11px] uppercase tracking-widest transition-all duration-300 font-mono-tech ${
                  selectedCategory === cat
                    ? 'bg-white text-black font-bold'
                    : 'bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Talents Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
          {filteredTalents.map((talent, idx) => (
            <motion.div
              key={talent.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              onClick={() => setSelectedTalent(talent)}
              className="talent-card relative aspect-[3/4] overflow-hidden group cursor-pointer border border-zinc-900 hover:border-zinc-700 transition-all duration-500"
            >
              {/* Image */}
              <img
                src={talent.image}
                alt={talent.name}
                className="object-cover w-full h-full"
                referrerPolicy="no-referrer"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

              {/* Top Category Badge */}
              <div className="absolute top-6 left-6 z-10">
                <span className="bg-black/70 backdrop-blur-md text-zinc-300 text-[10px] uppercase tracking-widest px-3 py-1 border border-white/10 font-mono-tech">
                  {talent.category}
                </span>
              </div>

              {/* Bottom Details */}
              <div className="absolute bottom-0 left-0 right-0 p-8 z-10">
                <p className="text-2xl sm:text-3xl font-extrabold text-white uppercase tracking-tighter mb-1 font-display group-hover:translate-x-1 transition-transform">
                  {talent.name}
                </p>
                <p className="text-zinc-400 text-xs uppercase tracking-widest mb-4 font-mono-tech">
                  {talent.role}
                </p>

                {talent.stats && (
                  <p className="text-zinc-300 text-xs font-light border-t border-zinc-800 pt-3 flex items-center gap-2">
                    <Trophy size={14} className="text-zinc-400" />
                    <span>{talent.stats}</span>
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Talent Detail Modal */}
      <AnimatePresence>
        {selectedTalent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-6"
            onClick={() => setSelectedTalent(null)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-zinc-950 border border-zinc-800 max-w-3xl w-full relative shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2"
            >
              <button
                onClick={() => setSelectedTalent(null)}
                className="absolute top-4 right-4 z-20 p-2 bg-black/80 text-zinc-400 hover:text-white transition-colors"
                aria-label={t('services.close')}
              >
                <X size={20} />
              </button>

              {/* Left Image */}
              <div className="relative aspect-[3/4] md:aspect-auto">
                <img
                  src={selectedTalent.image}
                  alt={selectedTalent.name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent md:hidden" />
              </div>

              {/* Right Bio & Links */}
              <div className="p-8 sm:p-10 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-zinc-500 font-mono-tech block mb-2">
                    {selectedTalent.category}
                  </span>
                  <h3 className="text-3xl font-extrabold text-white font-display mb-1">
                    {selectedTalent.name}
                  </h3>
                  <p className="text-zinc-400 text-xs uppercase tracking-widest font-mono-tech mb-6">
                    {selectedTalent.role}
                  </p>

                  <p className="text-zinc-300 text-sm leading-relaxed font-light mb-6">
                    {selectedTalent.bio}
                  </p>

                  {selectedTalent.stats && (
                    <div className="bg-zinc-900/80 p-4 border border-zinc-800 text-xs text-zinc-300 font-mono-tech mb-6 flex items-center gap-3">
                      <Sparkles size={16} className="text-white shrink-0" />
                      <span>{selectedTalent.stats}</span>
                    </div>
                  )}
                </div>

                {/* Social Links */}
                <div className="pt-6 border-t border-zinc-800 flex items-center gap-4">
                  {selectedTalent.spotifyUrl && (
                    <a
                      href={selectedTalent.spotifyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white hover:bg-zinc-800 transition-colors"
                      title="Spotify"
                    >
                      <Music size={18} />
                    </a>
                  )}
                  {selectedTalent.instagramUrl && (
                    <a
                      href={selectedTalent.instagramUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white hover:bg-zinc-800 transition-colors"
                      title="Instagram"
                    >
                      <Instagram size={18} />
                    </a>
                  )}
                  <a
                    href="#contact"
                    onClick={() => setSelectedTalent(null)}
                    className="flex-1 bg-white text-black py-3 text-center text-xs font-bold uppercase tracking-wider hover:bg-zinc-200 transition-colors"
                  >
                    {lang === 'en' ? 'Request Collaboration' : 'Demander une collaboration'}
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
