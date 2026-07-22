import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  UserCheck,
  TrendingUp,
  Palette,
  ShieldCheck,
  Megaphone,
  Compass,
  Handshake,
  Briefcase,
  Sparkles,
  Building2,
  ArrowUpRight,
  X,
  CheckCircle2,
  Mail
} from 'lucide-react';
import { Service } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface ServicesProps {
  services: Service[];
  onSelectServiceForAppointment?: (serviceTitle: string) => void;
}

const ICON_MAP: Record<string, React.FC<{ size?: number; className?: string }>> = {
  UserCheck,
  TrendingUp,
  Palette,
  ShieldCheck,
  Megaphone,
  Compass,
  Handshake,
  Briefcase,
  Sparkles,
  Building2,
};

export const Services: React.FC<ServicesProps> = ({
  services,
}) => {
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const { lang, t } = useLanguage();

  const getServiceTitle = (service: Service) => {
    if (lang === 'en') {
      const translated = t(`service.${service.id}.title`);
      if (translated !== `service.${service.id}.title`) return translated;
    }
    return service.title;
  };

  const getServiceDesc = (service: Service) => {
    if (lang === 'en') {
      const translated = t(`service.${service.id}.desc`);
      if (translated !== `service.${service.id}.desc`) return translated;
    }
    return service.shortDesc;
  };

  return (
    <section id="services" className="py-28 lg:py-36 px-6 lg:px-12 bg-black relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6 border-b border-zinc-900 pb-8">
          <div>
            <span className="text-zinc-500 uppercase tracking-[0.3em] text-xs font-semibold mb-3 block font-mono-tech">
              {t('services.tag')}
            </span>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white font-display">
              {t('services.title')}
            </h2>
          </div>
          <p className="text-zinc-400 max-w-md text-sm sm:text-base font-light leading-relaxed">
            {t('services.subtitle')}
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-px bg-zinc-900 border border-zinc-900">
          {services.map((service, index) => {
            const IconComponent = ICON_MAP[service.iconName] || Sparkles;
            const displayTitle = getServiceTitle(service);
            const displayDesc = getServiceDesc(service);

            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                onClick={() => setSelectedService(service)}
                className="bg-black p-8 hover:bg-zinc-950 transition-all duration-300 group cursor-pointer relative flex flex-col justify-between h-full border border-transparent hover:border-zinc-800"
              >
                <div>
                  <div className="flex items-center justify-between mb-8">
                    <div className="w-12 h-12 border border-zinc-800 flex items-center justify-center text-zinc-400 group-hover:text-white group-hover:border-zinc-500 transition-colors">
                      <IconComponent size={20} />
                    </div>
                    <ArrowUpRight
                      size={18}
                      className="text-zinc-700 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
                    />
                  </div>

                  <h3 className="text-lg font-bold text-white mb-3 uppercase tracking-tight font-display group-hover:text-white">
                    {displayTitle}
                  </h3>

                  <p className="text-zinc-500 text-xs sm:text-sm font-light leading-relaxed mb-6 group-hover:text-zinc-400 transition-colors">
                    {displayDesc}
                  </p>
                </div>

                <div className="pt-4 border-t border-zinc-900 flex items-center justify-between text-[10px] uppercase tracking-widest text-zinc-600 group-hover:text-zinc-300 font-mono-tech">
                  <span>{t('services.more')}</span>
                  <span>0{index + 1}</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Service Detail Modal */}
      <AnimatePresence>
        {selectedService && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-6"
            onClick={() => setSelectedService(null)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-zinc-950 border border-zinc-800 p-8 sm:p-12 max-w-2xl w-full relative shadow-2xl"
            >
              <button
                onClick={() => setSelectedService(null)}
                className="absolute top-6 right-6 p-2 text-zinc-400 hover:text-white transition-colors"
                aria-label={t('services.close')}
              >
                <X size={20} />
              </button>

              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-white text-black flex items-center justify-center">
                  {React.createElement(
                    ICON_MAP[selectedService.iconName] || Sparkles,
                    { size: 24 }
                  )}
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-zinc-500 font-mono-tech block">
                    SERVICE LVNT
                  </span>
                  <h3 className="text-2xl font-bold text-white font-display">
                    {getServiceTitle(selectedService)}
                  </h3>
                </div>
              </div>

              <p className="text-zinc-300 text-base font-light leading-relaxed mb-8">
                {selectedService.fullDesc}
              </p>

              <div className="mb-8">
                <h4 className="text-xs uppercase tracking-widest text-zinc-400 font-bold mb-4 font-mono-tech">
                  {t('services.highlights')}
                </h4>
                <ul className="space-y-3">
                  {selectedService.highlights.map((h, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-3 text-sm text-zinc-300"
                    >
                      <CheckCircle2 size={16} className="text-white shrink-0" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-6 border-t border-zinc-800 flex flex-col sm:flex-row gap-4 justify-end">
                <button
                  onClick={() => setSelectedService(null)}
                  className="px-6 py-3 border border-zinc-800 text-zinc-400 text-xs font-semibold uppercase tracking-wider hover:text-white hover:border-zinc-600 transition-colors"
                >
                  {t('services.close')}
                </button>
                <a
                  href="#contact"
                  onClick={() => setSelectedService(null)}
                  className="px-6 py-3 bg-white text-black text-xs font-bold uppercase tracking-wider hover:bg-zinc-200 transition-colors flex items-center justify-center gap-2"
                >
                  <Mail size={14} />
                  <span>{t('services.contact_modal')}</span>
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
