import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronRight, Globe } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface NavbarProps {
  onOpenAppointment: () => void;
  onOpenAdmin: () => void;
  isAdminMode: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  isAdminMode
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { lang, setLang, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: t('nav.about'), href: '#about' },
    { name: t('nav.services'), href: '#services' },
    { name: t('nav.talents'), href: '#talents' },
    { name: t('nav.contact'), href: '#contact' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled ? 'glass-nav py-4 shadow-2xl' : 'bg-transparent py-6 lg:py-8'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex justify-between items-center">
          {/* Logo LVNT */}
          <a
            href="#"
            className="group flex items-center gap-3 text-white focus:outline-none"
          >
            <span className="text-2xl sm:text-3xl font-extrabold tracking-[0.4em] uppercase font-display transition-transform duration-300 group-hover:scale-105">
              LVNT
            </span>
            {isAdminMode && (
              <span className="bg-zinc-800 text-xs px-2 py-0.5 rounded text-zinc-300 font-mono-tech border border-zinc-700">
                ADMIN
              </span>
            )}
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-8 text-[11px] uppercase tracking-[0.25em] font-medium text-zinc-400">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="hover:text-white transition-colors duration-300 relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-white hover:after:w-full after:transition-all after:duration-300"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Right Action: Language Switcher (FR / EN) */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center bg-zinc-900/90 border border-zinc-800 rounded-full p-1 text-xs font-mono-tech">
              <Globe size={13} className="text-zinc-500 ml-2 mr-1" />
              <button
                onClick={() => setLang('fr')}
                className={`px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider transition-all ${
                  lang === 'fr'
                    ? 'bg-white text-black shadow'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                FR
              </button>
              <button
                onClick={() => setLang('en')}
                className={`px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider transition-all ${
                  lang === 'en'
                    ? 'bg-white text-black shadow'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                EN
              </button>
            </div>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-white hover:text-zinc-300 focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-black/95 backdrop-blur-2xl lg:hidden pt-28 px-8 pb-12 flex flex-col justify-between"
          >
            <div className="flex flex-col space-y-6">
              <div className="flex items-center justify-between border-b border-zinc-900 pb-3">
                <span className="text-[10px] uppercase tracking-[0.4em] text-zinc-500">
                  Navigation LVNT
                </span>
                <div className="flex items-center gap-1 bg-zinc-900 border border-zinc-800 rounded-full p-0.5 text-xs">
                  <button
                    onClick={() => setLang('fr')}
                    className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      lang === 'fr' ? 'bg-white text-black' : 'text-zinc-400'
                    }`}
                  >
                    FR
                  </button>
                  <button
                    onClick={() => setLang('en')}
                    className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      lang === 'en' ? 'bg-white text-black' : 'text-zinc-400'
                    }`}
                  >
                    EN
                  </button>
                </div>
              </div>

              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-2xl font-bold uppercase tracking-wider text-zinc-300 hover:text-white transition-colors flex items-center justify-between"
                >
                  <span>{link.name}</span>
                  <ChevronRight size={20} className="text-zinc-600" />
                </a>
              ))}
            </div>

            <div className="space-y-4 pt-8 border-t border-zinc-900">
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full bg-white text-black py-4 text-xs font-bold uppercase tracking-[0.2em] flex items-center justify-center gap-2"
              >
                <span>{t('hero.cta_contact')}</span>
              </a>

              <div className="text-center text-[10px] uppercase tracking-widest text-zinc-600 pt-2 font-mono-tech">
                Paris • International — LVNT 2026
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
