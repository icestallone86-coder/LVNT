import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Sparkles, FolderPlus } from 'lucide-react';
import { Rubrique } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface CustomRubriquesProps {
  rubriques: Rubrique[];
}

export const CustomRubriques: React.FC<CustomRubriquesProps> = ({ rubriques }) => {
  const { lang, t } = useLanguage();

  if (!rubriques || rubriques.length === 0) return null;

  return (
    <section id="rubriques" className="py-28 lg:py-36 px-6 lg:px-12 bg-zinc-950 border-t border-zinc-900 relative">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6 border-b border-zinc-900 pb-8">
          <div>
            <span className="text-zinc-500 uppercase tracking-[0.3em] text-xs font-semibold mb-3 block font-mono-tech flex items-center gap-2">
              <Sparkles size={14} className="text-white" />
              <span>{lang === 'en' ? 'SPECIAL SECTIONS & PROJECTS' : 'RUBRIQUES SPÉCIALES & PROJETS'}</span>
            </span>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white font-display">
              {lang === 'en' ? 'Custom Focus' : 'Rubriques & Actualités'}
            </h2>
          </div>
          <p className="text-zinc-400 max-w-md text-sm sm:text-base font-light leading-relaxed">
            {lang === 'en'
              ? 'Explore our latest agency developments, studio innovations, and exclusive brand initiatives.'
              : 'Découvrez les derniers développements, innovations studio et initiatives exclusives de l’agence.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {rubriques.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-black border border-zinc-800 p-6 flex flex-col justify-between group hover:border-zinc-500 transition-all duration-300 relative overflow-hidden"
            >
              {item.image && (
                <div className="h-48 -mx-6 -mt-6 mb-6 overflow-hidden relative">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                  {item.badge && (
                    <span className="absolute top-4 left-4 bg-white text-black font-mono-tech text-[10px] font-bold uppercase tracking-widest px-3 py-1">
                      {item.badge}
                    </span>
                  )}
                </div>
              )}

              <div>
                {!item.image && item.badge && (
                  <span className="inline-block bg-zinc-900 border border-zinc-800 text-zinc-300 font-mono-tech text-[10px] font-bold uppercase tracking-widest px-3 py-1 mb-4">
                    {item.badge}
                  </span>
                )}
                <span className="text-zinc-500 text-xs font-mono-tech block uppercase tracking-widest mb-2">
                  {item.category || item.tagline}
                </span>
                <h3 className="text-xl font-extrabold text-white mb-3 font-display group-hover:text-zinc-200 transition-colors">
                  {item.title}
                </h3>
                <p className="text-zinc-400 text-xs sm:text-sm font-light leading-relaxed mb-6">
                  {item.description}
                </p>
              </div>

              {item.linkText && (
                <div className="pt-4 border-t border-zinc-900 flex items-center justify-between text-xs font-bold uppercase tracking-widest text-zinc-300 group-hover:text-white transition-colors">
                  <span>{item.linkText}</span>
                  <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
