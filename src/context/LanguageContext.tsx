import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Language = 'fr' | 'en';

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  fr: {
    // Nav
    'nav.about': 'À propos',
    'nav.services': 'Services',
    'nav.talents': 'Talents',
    'nav.contact': 'Contact',

    // Hero
    'hero.subtitle': 'TURNING POTENTIAL INTO GREATNESS!',
    'hero.title1': "DÉVELOPPEMENT D'ARTISTES &",
    'hero.title2': 'MANAGEMENT MUSICAL',
    'hero.desc': "LVNT accompagne les artistes d'exception et les producteurs visionnaires dans l'optimisation stratégique, créative et commerciale de leur carrière à l'échelle internationale.",
    'hero.cta_talents': 'DÉCOUVRIR LES TALENTS',
    'hero.cta_contact': 'NOUS CONTACTER ?',

    // About
    'about.tag': 'À PROPOS DE LVNT',
    'about.title': "L'EXCELLENCE AU SERVICE DE LA CRÉATION MUSICALE",
    'about.p1': "LVNT est née d'une conviction forte : les carrières durables ne s'improvisent pas. Dans un écosystème musical en constante mutation, nous apportons la rigueur stratégique des grandes entreprises au service de l'expression artistique la plus authentique.",
    'about.p2': "Notre équipe épaule les talents à chaque étape clé : de l'émergence créative jusqu'à la négociation des plus grands contrats internationaux, en passant par le développement d'image et la monétisation.",
    'about.card1_title': 'Savoir-Faire Opératoire',
    'about.card1_desc': 'Une gestion structurée des calendriers de sorties, des budgets de production et des contrats majeurs.',
    'about.card2_title': 'Écosystème International',
    'about.card2_desc': 'Un réseau direct auprès des labels leaders, éditeurs, tourneurs et marques de premier plan.',

    // Services
    'services.tag': 'EXPERTISES',
    'services.title': 'NOS SERVICES DE MANAGEMENT',
    'services.subtitle': "Un accompagnement à 360° taillé pour les exigences de l'industrie musicale moderne.",
    'services.more': 'En savoir plus',
    'services.close': 'Fermer',
    'services.contact_modal': 'Nous contacter ?',
    'services.highlights': 'Points clés :',

    // Service Titles & Short Descs
    'service.s1.title': 'Management Artistique',
    'service.s1.desc': 'Pilotage stratégique global de la carrière et développement à long terme.',
    'service.s2.title': 'Accompagnement Juridique & Contrats',
    'service.s2.desc': 'Négociation et sécurisation des accords majeurs (Labels, Éditions, Distribution).',
    'service.s3.title': 'Direction Artistique & Production',
    'service.s3.desc': 'Supervision globale de la création musicale et des visuels.',
    'service.s5.title': 'Communication et marketing',
    'service.s5.desc': "Relations presse, stratégie d'influence et maîtrise de l'image publique.",
    'service.s6.title': 'Développement Scène & Live',
    'service.s6.desc': 'Stratégie de tournée, booking exclusif et scénographie.',
    'service.s8.title': 'Gestion de projets pro',
    'service.s8.desc': 'Savoir-faire opératoire pour mener un projet de A à Z : calendrier de sorties, gestion budgétaire.',

    // Talents
    'talents.tag': 'ROSTER LVNT',
    'talents.title': 'NOS ARTISTES & PRODUCTEURS',
    'talents.subtitle': 'Des figures majeures et de futurs piliers de la scène musicale actuelle.',
    'talents.all': 'TOUS',
    'talents.artistes': 'ARTISTES',
    'talents.producteurs': 'PRODUCTEURS',
    'talents.compositeurs': 'COMPOSITEURS',
    'talents.listen': 'Écouter',

    // Contact
    'contact.tag': 'INFORMATION',
    'contact.title': 'Nous contacter ?',
    'contact.desc': 'Prêt à propulser votre projet ou votre carrière au niveau supérieur ? Contactez directement notre équipe par email ou téléphone.',
    'contact.email_label': 'EMAIL :',
    'contact.phone_label': 'TÉLÉPHONE :',
    'contact.social_label': 'RÉSEAUX :',
    'contact.form_title': 'Nous laisser un message (formulaire de contact)',
    'contact.form_desc': 'Veuillez renseigner vos coordonnées et les détails de votre demande. Notre équipe vous répondra sous 24h ouvrées.',
    'contact.name': 'NOM COMPLET *',
    'contact.name_placeholder': 'ex: Jean Dupont',
    'contact.email': 'EMAIL PROFESSIONNEL *',
    'contact.email_placeholder': 'jean@exemple.com',
    'contact.phone': 'TÉLÉPHONE',
    'contact.subject': 'OBJET DE LA DEMANDE',
    'contact.subject_placeholder': 'ex: Management, Collaboration, Booking...',
    'contact.message': 'MESSAGE / DÉTAILS DU PROJET *',
    'contact.message_placeholder': 'Décrivez votre vision, vos objectifs et votre calendrier...',
    'contact.send': 'Envoyer le message',
    'contact.success_title': 'Message transmitted avec succès',
    'contact.success_desc': "Merci pour votre intérêt. L'équipe LVNT étudie votre demande et reviendra vers vous très prochainement.",

    // Footer
    'footer.desc': "L'excellence au service de la création musicale et du développement de carrières durables.",
    'footer.nav': 'NAVIGATION',
    'footer.legal': 'Mentions Légales',
    'footer.cookies': 'Gestion des cookies',
    'footer.copyright': 'Copyright 2026 LVNT',
  },
  en: {
    // Nav
    'nav.about': 'About',
    'nav.services': 'Services',
    'nav.talents': 'Talents',
    'nav.contact': 'Contact',

    // Hero
    'hero.subtitle': 'TURNING POTENTIAL INTO GREATNESS!',
    'hero.title1': 'ARTIST DEVELOPMENT &',
    'hero.title2': 'MUSIC MANAGEMENT',
    'hero.desc': 'LVNT supports exceptional artists and visionary producers in the strategic, creative, and commercial optimization of their careers worldwide.',
    'hero.cta_talents': 'DISCOVER TALENTS',
    'hero.cta_contact': 'CONTACT US',

    // About
    'about.tag': 'ABOUT LVNT',
    'about.title': 'EXCELLENCE IN THE SERVICE OF MUSICAL CREATION',
    'about.p1': 'LVNT was born from a strong conviction: sustainable careers are not improvised. In a constantly changing musical ecosystem, we bring the strategic rigor of major companies to serve the most authentic artistic expression.',
    'about.p2': 'Our team supports talent at every key stage: from creative emergence to the negotiation of major international contracts, image development, and monetization.',
    'about.card1_title': 'Operational Know-How',
    'about.card1_desc': 'Structured management of release schedules, production budgets, and major contracts.',
    'about.card2_title': 'International Ecosystem',
    'about.card2_desc': 'A direct network with leading record labels, publishers, promoters, and top brands.',

    // Services
    'services.tag': 'EXPERTISE',
    'services.title': 'OUR MANAGEMENT SERVICES',
    'services.subtitle': '360° support tailored to the demands of the modern music industry.',
    'services.more': 'Learn More',
    'services.close': 'Close',
    'services.contact_modal': 'Contact Us',
    'services.highlights': 'Key Highlights:',

    // Service Titles & Short Descs
    'service.s1.title': 'Artist Management',
    'service.s1.desc': 'Global strategic management of career and long-term development.',
    'service.s2.title': 'Legal & Contractual Support',
    'service.s2.desc': 'Negotiation and securing of major agreements (Labels, Publishing, Distribution).',
    'service.s3.title': 'Artistic Direction & Production',
    'service.s3.desc': 'Global supervision of music creation and visuals.',
    'service.s5.title': 'Communication & Marketing',
    'service.s5.desc': 'Press relations, influence strategy, and public image management.',
    'service.s6.title': 'Live & Stage Development',
    'service.s6.desc': 'Tour strategy, exclusive booking, and stage design.',
    'service.s8.title': 'Professional Project Management',
    'service.s8.desc': 'Operational know-how to run a project from A to Z: release schedule, budget optimization.',

    // Talents
    'talents.tag': 'LVNT ROSTER',
    'talents.title': 'OUR ARTISTS & PRODUCERS',
    'talents.subtitle': "Major figures and future pillars of today's music scene.",
    'talents.all': 'ALL',
    'talents.artistes': 'ARTISTS',
    'talents.producteurs': 'PRODUCERS',
    'talents.compositeurs': 'COMPOSERS',
    'talents.listen': 'Listen',

    // Contact
    'contact.tag': 'INFORMATION',
    'contact.title': 'Contact Us ?',
    'contact.desc': 'Ready to take your project or career to the next level? Contact our team directly by email or phone.',
    'contact.email_label': 'EMAIL :',
    'contact.phone_label': 'PHONE :',
    'contact.social_label': 'SOCIALS :',
    'contact.form_title': 'Leave us a message (contact form)',
    'contact.form_desc': 'Please fill in your contact details and project details. Our team will get back to you within 24 business hours.',
    'contact.name': 'FULL NAME *',
    'contact.name_placeholder': 'e.g. John Doe',
    'contact.email': 'WORK EMAIL *',
    'contact.email_placeholder': 'john@example.com',
    'contact.phone': 'PHONE',
    'contact.subject': 'SUBJECT',
    'contact.subject_placeholder': 'e.g. Management, Collaboration, Booking...',
    'contact.message': 'MESSAGE / PROJECT DETAILS *',
    'contact.message_placeholder': 'Describe your vision, goals, and timeline...',
    'contact.send': 'Send Message',
    'contact.success_title': 'Message successfully sent',
    'contact.success_desc': 'Thank you for your interest. The LVNT team will review your message and reply very soon.',

    // Footer
    'footer.desc': 'Excellence in the service of music creation and sustainable career development.',
    'footer.nav': 'NAVIGATION',
    'footer.legal': 'Legal Notice',
    'footer.cookies': 'Cookie Management',
    'footer.copyright': 'Copyright 2026 LVNT',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [lang, setLangState] = useState<Language>(() => {
    const saved = localStorage.getItem('lvnt_lang');
    return (saved === 'en' || saved === 'fr') ? saved : 'en';
  });

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    localStorage.setItem('lvnt_lang', newLang);
  };

  const t = (key: string): string => {
    return translations[lang]?.[key] || translations['en']?.[key] || translations['fr']?.[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
