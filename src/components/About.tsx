import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

export const About: React.FC = () => {
  const { lang, t } = useLanguage();

  return (
    <section id="about" className="py-28 lg:py-36 px-6 lg:px-12 bg-zinc-950 border-t border-zinc-900 relative">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-zinc-500 uppercase tracking-[0.3em] text-xs font-semibold mb-4 block font-mono-tech">
              {t('about.tag')}
            </span>

            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-8 leading-tight font-display">
              {lang === 'en' ? (
                <>
                  More than an agency, <br />
                  <span className="text-zinc-500">a growth partner.</span>
                </>
              ) : (
                <>
                  Plus qu&apos;une agence, <br />
                  <span className="text-zinc-500">un partenaire de croissance.</span>
                </>
              )}
            </h2>

            <p className="text-zinc-400 text-base sm:text-lg leading-relaxed font-light mb-8">
              {t('about.p1')}
            </p>

            <p className="text-zinc-400 text-base sm:text-lg leading-relaxed font-light font-light">
              {t('about.p2')}
            </p>
          </motion.div>

          {/* Right Image & Philosophy Box */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative aspect-[4/5] sm:aspect-[3/4] overflow-hidden border border-zinc-800">
              <img
                src="Lvntlogo.jpeg"
                alt="LVNT Studio & Direction"
                className="w-full h-full object-cover filter grayscale contrast-125 hover:grayscale-0 transition-all duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80" />
            </div>

            {/* Floating Quote Card */}
            <div className="absolute -bottom-8 -left-4 sm:-left-8 bg-black/90 p-6 sm:p-8 border border-zinc-800 max-w-md backdrop-blur-xl hidden sm:block">
              <p className="text-zinc-300 italic text-sm sm:text-base leading-relaxed mb-3">
                {lang === 'en'
                  ? '“Excellence is a habit, not an isolated act. We build careers destined to stand the test of time.”'
                  : '“L’excellence est une habitude, pas un acte isolé. Nous construisons des carrières destinées à traverser le temps.”'}
              </p>
              <span className="text-[11px] text-zinc-500 uppercase tracking-widest font-bold block font-mono-tech">
                — {lang === 'en' ? 'LVNT Executive Direction' : 'Direction LVNT'}
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
