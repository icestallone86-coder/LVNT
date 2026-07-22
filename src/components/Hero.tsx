import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, ChevronRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface HeroProps {
  onOpenAppointment?: () => void;
}

export const Hero: React.FC<HeroProps> = () => {
  const { lang, t } = useLanguage();

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-black pt-28 sm:pt-32 pb-20 overflow-hidden">
      {/* Giant Background Watermark Outline LVNT */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
        <h1 className="text-[32vw] font-black tracking-tighter text-outline select-none opacity-15 leading-none">
          LVNT
        </h1>
      </div>

      {/* Hero Content Box */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto flex flex-col items-center">
        {/* Eyebrow / Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-zinc-500 uppercase tracking-[0.45em] text-[11px] sm:text-xs font-semibold mb-8 sm:mb-10 font-mono-tech"
        >
          {t('hero.subtitle')}
        </motion.p>

        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tighter leading-[1.08] mb-8 text-center font-display"
        >
          {lang === 'en' ? (
            <>
              <span className="text-white block">We develop</span>
              <span className="text-white block mb-2 sm:mb-4">talent.</span>
              <span className="text-zinc-600 block">We build</span>
              <span className="text-zinc-600 block">careers.</span>
            </>
          ) : (
            <>
              <span className="text-white block">Nous</span>
              <span className="text-white block">développons</span>
              <span className="text-white block mb-2 sm:mb-4">les talents.</span>
              <span className="text-zinc-600 block">Nous bâtissons</span>
              <span className="text-zinc-600 block">des carrières.</span>
            </>
          )}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4 }}
          className="max-w-2xl text-zinc-400 text-base sm:text-lg md:text-xl font-light leading-relaxed mb-12 sm:mb-16 text-center"
        >
          {t('hero.desc')}
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6 w-full sm:w-auto"
        >
          {/* Découvrir nos services Button */}
          <a
            href="#services"
            className="btn-premium w-full sm:w-auto bg-white text-black px-10 py-5 rounded-none font-bold text-xs uppercase tracking-[0.2em] transition-all duration-300 hover:bg-zinc-200 shadow-2xl flex items-center justify-center gap-3"
          >
            <span>{lang === 'en' ? 'DISCOVER OUR SERVICES' : 'DÉCOUVRIR NOS SERVICES'}</span>
            <ChevronRight size={16} />
          </a>

          {/* Nous contacter ? Button */}
          <a
            href="#contact"
            className="w-full sm:w-auto text-white border-b border-zinc-700 hover:border-white py-3 px-6 text-xs font-semibold uppercase tracking-[0.25em] transition-all duration-300 flex items-center justify-center gap-2 hover:text-zinc-200"
          >
            <span>{t('hero.cta_contact')}</span>
          </a>
        </motion.div>
      </div>

      {/* Down indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-zinc-600 hover:text-zinc-400 transition-colors"
      >
        <a href="#about" aria-label="Défiler vers le bas" className="p-2">
          <ArrowDown size={18} className="animate-bounce" />
        </a>
      </motion.div>
    </section>
  );
};
