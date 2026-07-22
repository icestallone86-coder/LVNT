import React, { useState } from 'react';
import { Instagram, Facebook, Linkedin, Twitter, Music, Lock } from 'lucide-react';
import { ContactInfo } from '../types';
import { LegalModal } from './LegalModal';
import { useLanguage } from '../context/LanguageContext';

interface FooterProps {
  contactInfo: ContactInfo;
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({ contactInfo, onOpenAdmin }) => {
  const { lang, t } = useLanguage();
  const [legalType, setLegalType] = useState<'privacy' | 'terms' | null>(null);
  const [clickCount, setClickCount] = useState(0);

  const handleCopyrightClick = () => {
    const newCount = clickCount + 1;
    setClickCount(newCount);
    if (newCount >= 3) {
      setClickCount(0);
      onOpenAdmin();
    }
  };

  return (
    <>
      <footer className="py-20 px-6 lg:px-12 bg-black border-t border-zinc-900 text-center relative">
        <div className="max-w-7xl mx-auto">
          {/* Big LVNT Typography */}
          <a href="#" className="inline-block mb-10 group">
            <span className="text-4xl sm:text-6xl font-black tracking-[0.5em] text-white uppercase font-display block transition-transform group-hover:scale-105">
              LVNT
            </span>
            <span className="text-[10px] uppercase tracking-[0.4em] text-zinc-500 font-mono-tech mt-2 block">
              {t('hero.tag')}
            </span>
          </a>

          {/* Nav Links */}
          <div className="flex flex-wrap justify-center gap-6 sm:gap-10 text-[11px] uppercase tracking-[0.25em] text-zinc-400 mb-10 font-medium font-mono-tech">
            <a href="#about" className="hover:text-white transition-colors">
              {t('nav.about')}
            </a>
            <a href="#services" className="hover:text-white transition-colors">
              {t('nav.services')}
            </a>
            <a href="#talents" className="hover:text-white transition-colors">
              {t('nav.talents')}
            </a>
            <a href="#contact" className="hover:text-white transition-colors">
              {t('nav.contact')}
            </a>
          </div>

          {/* Socials */}
          <div className="flex justify-center gap-6 text-zinc-500 mb-12">
            <a
              href={contactInfo.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors p-2"
              title="Instagram"
            >
              <Instagram size={18} />
            </a>
            <a
              href={contactInfo.facebook || "https://facebook.com/lvnt_management"}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors p-2"
              title="Facebook"
            >
              <Facebook size={18} />
            </a>
            <a
              href={contactInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors p-2"
              title="LinkedIn"
            >
              <Linkedin size={18} />
            </a>
            <a
              href={contactInfo.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors p-2"
              title="Twitter / X"
            >
              <Twitter size={18} />
            </a>
            <a
              href={contactInfo.spotify}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors p-2"
              title="Spotify"
            >
              <Music size={18} />
            </a>
          </div>

          {/* Legal & Copyright */}
          <div className="pt-8 border-t border-zinc-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] uppercase tracking-widest text-zinc-600 font-mono-tech">
            <div className="flex gap-6">
              <button
                onClick={() => setLegalType('privacy')}
                className="hover:text-zinc-400 transition-colors"
              >
                {lang === 'en' ? 'Privacy Policy' : 'Politique de confidentialité'}
              </button>
              <button
                onClick={() => setLegalType('terms')}
                className="hover:text-zinc-400 transition-colors"
              >
                {lang === 'en' ? 'Terms of Service' : "Conditions d'utilisation"}
              </button>
            </div>

            {/* Secret triple click target for background admin channel */}
            <div
              onClick={handleCopyrightClick}
              className="cursor-pointer select-none hover:text-zinc-400 transition-colors py-1 px-2"
              title="LVNT"
            >
              Copyright 2026 LVNT
            </div>

            {/* Discreet hidden admin entry point (almost invisible dot / lock) */}
            <div className="flex items-center gap-2">
              <button
                onClick={onOpenAdmin}
                className="opacity-20 hover:opacity-100 transition-opacity p-1 text-zinc-500 hover:text-white"
                title={lang === 'en' ? 'Secure Admin Access (Hidden)' : 'Canal Sécurisé Admin (Caché)'}
                aria-label="Admin Access"
              >
                <Lock size={10} />
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* Legal Modal */}
      <LegalModal type={legalType} onClose={() => setLegalType(null)} />
    </>
  );
};
