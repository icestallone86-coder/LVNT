import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, Send, Instagram, Facebook, Linkedin, Twitter, CheckCircle2 } from 'lucide-react';
import { ContactInfo, ContactLead } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface ContactSectionProps {
  contactInfo: ContactInfo;
  onAddLead: (lead: Omit<ContactLead, 'id' | 'date' | 'status'>) => void;
  onOpenAppointment?: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  contactInfo,
  onAddLead,
}) => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    onAddLead({
      name: formData.name,
      email: formData.email,
      phone: formData.phone || 'Non renseigné',
      subject: formData.subject || 'Demande de contact générale',
      message: formData.message,
    });

    setSubmitted(true);
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' });

    setTimeout(() => {
      setSubmitted(false);
    }, 6000);
  };

  return (
    <section id="contact" className="py-28 lg:py-36 px-6 lg:px-12 bg-black border-t border-zinc-900 relative">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
        {/* Left Info Column: Nous contacter ? */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-zinc-500 uppercase tracking-[0.3em] text-xs font-semibold mb-3 block font-mono-tech">
            {t('contact.tag')}
          </span>
          <h2 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white mb-8 leading-tight font-display">
            {t('contact.title')}
          </h2>

          <p className="text-zinc-400 text-base sm:text-lg font-light leading-relaxed mb-12">
            {t('contact.desc')}
          </p>

          {/* Direct Contact Options: email & telephone */}
          <div className="space-y-6">
            <div className="flex items-center gap-6 group">
              <div className="w-12 h-12 bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 group-hover:text-white group-hover:border-zinc-600 transition-all">
                <Mail size={18} />
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-widest text-zinc-500 font-mono-tech block">{t('contact.email_label')}</span>
                <a href={`mailto:${contactInfo.email}`} className="text-zinc-200 font-medium hover:text-white transition-colors text-lg">
                  {contactInfo.email}
                </a>
              </div>
            </div>

            <div className="flex items-center gap-6 group">
              <div className="w-12 h-12 bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 group-hover:text-white group-hover:border-zinc-600 transition-all">
                <Phone size={18} />
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-widest text-zinc-500 font-mono-tech block">{t('contact.phone_label')}</span>
                <a href={`tel:${contactInfo.phone}`} className="text-zinc-200 font-medium hover:text-white transition-colors text-lg">
                  {contactInfo.phone}
                </a>
              </div>
            </div>
          </div>

          {/* Social Links with Facebook */}
          <div className="mt-12 pt-8 border-t border-zinc-900 flex items-center gap-4">
            <span className="text-xs uppercase tracking-widest text-zinc-500 font-mono-tech">{t('contact.social_label')}</span>
            <a href={contactInfo.instagram} target="_blank" rel="noopener noreferrer" className="p-3 bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white transition-colors" title="Instagram">
              <Instagram size={16} />
            </a>
            <a href={contactInfo.facebook || "https://facebook.com/lvnt_management"} target="_blank" rel="noopener noreferrer" className="p-3 bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white transition-colors" title="Facebook">
              <Facebook size={16} />
            </a>
            <a href={contactInfo.linkedin} target="_blank" rel="noopener noreferrer" className="p-3 bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white transition-colors" title="LinkedIn">
              <Linkedin size={16} />
            </a>
            <a href={contactInfo.twitter} target="_blank" rel="noopener noreferrer" className="p-3 bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white transition-colors" title="Twitter / X">
              <Twitter size={16} />
            </a>
          </div>
        </motion.div>

        {/* Right Form Column: Nous laisser un message (formulaire de contact) */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-zinc-950 p-8 sm:p-12 border border-zinc-900"
        >
          <h3 className="text-2xl font-bold text-white mb-2 font-display">
            {t('contact.form_title')}
          </h3>
          <p className="text-zinc-400 text-xs font-light mb-8">
            {t('contact.form_desc')}
          </p>

          {submitted ? (
            <div className="bg-zinc-900 border border-zinc-700 p-8 text-center my-12">
              <CheckCircle2 size={40} className="text-white mx-auto mb-4" />
              <h4 className="text-lg font-bold text-white mb-2 uppercase tracking-wide font-display">
                {t('contact.success_title')}
              </h4>
              <p className="text-zinc-400 text-sm font-light">
                {t('contact.success_desc')}
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="text-[10px] uppercase tracking-widest text-zinc-500 mb-2 block font-mono-tech">
                  {t('contact.name')}
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder={t('contact.name_placeholder')}
                  className="w-full bg-black border border-zinc-800 px-4 py-3 text-white text-sm focus:border-white focus:outline-none transition-colors"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="text-[10px] uppercase tracking-widest text-zinc-500 mb-2 block font-mono-tech">
                    {t('contact.email')}
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder={t('contact.email_placeholder')}
                    className="w-full bg-black border border-zinc-800 px-4 py-3 text-white text-sm focus:border-white focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="text-[10px] uppercase tracking-widest text-zinc-500 mb-2 block font-mono-tech">
                    {t('contact.phone')}
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+33 6 00 00 00 00"
                    className="w-full bg-black border border-zinc-800 px-4 py-3 text-white text-sm focus:border-white focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] uppercase tracking-widest text-zinc-500 mb-2 block font-mono-tech">
                  {t('contact.subject')}
                </label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder={t('contact.subject_placeholder')}
                  className="w-full bg-black border border-zinc-800 px-4 py-3 text-white text-sm focus:border-white focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="text-[10px] uppercase tracking-widest text-zinc-500 mb-2 block font-mono-tech">
                  {t('contact.message')}
                </label>
                <textarea
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder={t('contact.message_placeholder')}
                  className="w-full bg-black border border-zinc-800 px-4 py-3 text-white text-sm focus:border-white focus:outline-none transition-colors resize-none"
                ></textarea>
              </div>

              <button
                type="submit"
                className="btn-premium w-full bg-white text-black py-4 text-xs font-bold uppercase tracking-[0.2em] hover:bg-zinc-200 transition-colors flex items-center justify-center gap-2"
              >
                <Send size={14} />
                <span>{t('contact.send')}</span>
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
};
