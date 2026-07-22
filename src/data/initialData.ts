import { Talent, Service, Advantage, Testimonial, NewsItem, ContactLead, ContactInfo, Appointment } from '../types';

export const INITIAL_SERVICES: Service[] = [
  {
    id: 's1',
    title: "Management d'artistes",
    iconName: 'UserCheck',
    shortDesc: "Accompagnement 360° et pilotage quotidien de la carrière artistique.",
    fullDesc: "LVNT prend en charge la structuration globale de l'artiste : négociation de contrats, planification stratégique, développement de réseau et défense des intérêts à long terme.",
    highlights: ["Négociations contractuelles", "Coordination des équipes", "Planification stratégique à 3 ans"]
  },
  {
    id: 's2',
    title: "Développement de carrière",
    iconName: 'TrendingUp',
    shortDesc: "Positionnement stratégique pour franchir des caps d'audience et d'impact.",
    fullDesc: "Transformation du potentiel créatif en succès durable par l'analyse de données, le ciblage d'audience et l'expansion sur les marchés clés.",
    highlights: ["Analyse de données streaming", "Stratégie d'export international", "Structuration des revenus"]
  },
  {
    id: 's3',
    title: "Direction artistique",
    iconName: 'Palette',
    shortDesc: "Supervision créative globale pour un univers sonore et visuel puissant.",
    fullDesc: "Conception et alignement de l'univers visuel (pochettes, clips, identité de scène) avec l'ADN musical et la vision de l'artiste.",
    highlights: ["Direction visuelle & clips", "Production executive", "Identité esthétique sur-mesure"]
  },
  {
    id: 's5',
    title: "Communication et marketing",
    iconName: 'Megaphone',
    shortDesc: "Relations presse, stratégie d'influence et maîtrise de l'image publique.",
    fullDesc: "Mise en place de campagnes médias ciblées, storytelling captivant et gestion proactive des relations publiques.",
    highlights: ["Relations presse spécialisées", "Storytelling & Brand voice", "Gestion de crise & e-réputation"]
  },
  {
    id: 's6',
    title: "Booking & Tournées",
    iconName: 'Compass',
    shortDesc: "Placement sur des festivals majeurs, concerts et tournées internationales.",
    fullDesc: "Négociation des dates de spectacles, partenariats de diffusion et élaboration de fiches techniques scéniques optimisées.",
    highlights: ["Programmation festivals", "Tournées mondiales & résidence", "Optimisation des cachés"]
  },
  {
    id: 's8',
    title: "Gestion de projets pro",
    iconName: 'Briefcase',
    shortDesc: "Pilotage d'albums, de lancements d'entreprises et de tournées.",
    fullDesc: "Savoir-faire opératoire pour mener un projet de A à Z : calendrier de sorties, gestion budgétaire et livraison zéro défaut.",
    highlights: ["Project management de sorties", "Rétroplanning rigoureux", "Optimisation budgétaire"]
  }
];

export const INITIAL_TALENTS: Talent[] = [
  {
    id: 't1',
    name: "KAZA",
    role: "Artiste / Compositeur",
    category: "Musique",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=1000",
    bio: "KAZA incarne le renouveau de la musique urbaine alternative avec un style mélodique avant-gardiste et plus de 120M de streams accumulés.",
    stats: "120M+ Streams • 2 Albums d'Or",
    spotifyUrl: "https://spotify.com",
    instagramUrl: "https://instagram.com",
    featured: true
  },
  {
    id: 't2',
    name: "MÉLODIE V.",
    role: "Auteure-Interprète",
    category: "Musique",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=1000",
    bio: "Voix suave et compositions envoûtantes. Mélodie collabore avec les plus grands réalisateurs internationaux pour façonner une soul moderne.",
    stats: "45M+ Streams • Collaborations Luxe",
    spotifyUrl: "https://spotify.com",
    instagramUrl: "https://instagram.com",
    featured: true
  },
  {
    id: 't3',
    name: "MARC ROSS",
    role: "Producteur Executive & DJ",
    category: "Production",
    image: "https://images.unsplash.com/photo-1493225255756-d9584f8606e9?auto=format&fit=crop&q=80&w=1000",
    bio: "Pionnier des sonorités électroniques minimalistes, Marc produit pour les défilés de haute couture à Paris, Milan et New York.",
    stats: "30+ Synchronisations Cinéma & Fashion",
    instagramUrl: "https://instagram.com",
    featured: true
  },
  {
    id: 't4',
    name: "ELENA G.",
    role: "Directrice Artistique & Réalisatrice",
    category: "Direction Artistique",
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=1000",
    bio: "Elena conçoit des univers esthétiques audacieux pour des clips cumulés à plus de 50 millions de vues et récompenses visuelles.",
    stats: "Winner Music Video Awards 2025",
    instagramUrl: "https://instagram.com",
    featured: false
  },
  {
    id: 't5',
    name: "SORA",
    role: "Créateur Digital & Brand Stylist",
    category: "Digital & Content",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=1000",
    bio: "Pionnier de la création de contenu immersif et du streatwear d'auteur, SORA façonne le lien entre culture jeune et maisons historiques.",
    stats: "1.2M+ Communauté Globale",
    instagramUrl: "https://instagram.com",
    featured: false
  }
];

export const INITIAL_ADVANTAGES: Advantage[] = [
  {
    id: 'a1',
    title: "Accompagnement Personnalisé",
    desc: "Un interlocuteur unique dédié à 100% à votre projet avec un suivi quotidien sur mesure.",
    stat: "1:1"
  },
  {
    id: 'a2',
    title: "Vision Stratégique à Long Terme",
    desc: "Plutôt que des buzz éphémères, nous construisons un patrimoine artistique et financier pérenne.",
    stat: "5 ans+"
  },
  {
    id: 'a3',
    title: "Réseau de Partenaires d'Élite",
    desc: "Accès privilégié aux labels majeurs, maisons de mode, directeurs de festival et agences média.",
    stat: "Global"
  },
  {
    id: 'a4',
    title: "Développement d'Image Premium",
    desc: "Une esthétique millimétrée alignée avec les standards du luxe et de l'innovation culturelle.",
    stat: "Haute Couture"
  },
  {
    id: 'a5',
    title: "Gestion Financière & Juridique",
    desc: "Protection absolue de vos droits d'auteur, optimisation fiscale et négociation des rémunérations.",
    stat: "SÉCURITÉ"
  },
  {
    id: 'a6',
    title: "Rigueur & Discipline",
    desc: "Un niveau d'exigence et de professionnalisme digne des grands groupes internationaux.",
    stat: "EXCELLENCE"
  }
];

export const INITIAL_TESTIMONIALS: Testimonial[] = [
  {
    id: 'tes1',
    name: "KAZA",
    role: "Artiste Musique Urbaine",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=200",
    quote: "Grâce à LVNT, mon projet est passé d'une initiative indépendante à une véritable marque installée. Leur niveau d'exigence et leur vision stratégique ont tout changé.",
    rating: 5
  },
  {
    id: 'tes2',
    name: "Sarah L.",
    role: "VP Brand Partnerships - Maison de Luxe",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200",
    quote: "LVNT est la seule agence de management artistique avec laquelle nous travaillons les yeux fermés. Professionnalisme irréprochable et respect du calendrier créatif.",
    rating: 5
  },
  {
    id: 'tes3',
    name: "Marc Ross",
    role: "Producteur & DJ International",
    avatar: "https://images.unsplash.com/photo-1493225255756-d9584f8606e9?auto=format&fit=crop&q=80&w=200",
    quote: "Un accompagnement humain exceptionnel conjugué à une force de frappe internationale. Mes opportunités de tournée ont triplé en 18 mois.",
    rating: 5
  }
];

export const INITIAL_NEWS: NewsItem[] = [
  {
    id: 'n1',
    title: "LVNT annonce la signature exclusive de MÉLODIE V.",
    category: "SIGNATURE",
    date: "14 FÉVRIER 2026",
    summary: "La célèbre interprète soul rejoint le roster LVNT pour la supervision globale de son prochain album international.",
    imageUrl: "https://images.unsplash.com/photo-1514525253361-b83f859b73c0?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 'n2',
    title: "Partenariat Majeur entre LVNT et la Fashion Week de Paris",
    category: "PARTENARIAT",
    date: "28 JANVIER 2026",
    summary: "Trois artistes accompagnés par LVNT composeront la bande sonore de défilés prestigieux lors de la haute couture.",
    imageUrl: "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 'n3',
    title: "Analyse : Comment structurer sa carrière artistique en 2026 ?",
    category: "INSIGHTS",
    date: "10 JANVIER 2026",
    summary: "Découvrez notre note blanche sur l'indépendance financière et la monétisation des droits dans l'écosystème streaming actuel.",
    imageUrl: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80&w=800"
  }
];

export const INITIAL_CONTACT_INFO: ContactInfo = {
  email: "contact@lvnt.com",
  phone: "+33 (0)1 89 71 40 20",
  address: "12 Place Vendôme, 75001 Paris, France",
  instagram: "https://instagram.com/lvnt_management",
  facebook: "https://facebook.com/lvnt_management",
  linkedin: "https://linkedin.com/company/lvnt",
  twitter: "https://twitter.com/lvnt_agency",
  spotify: "https://spotify.com"
};

export const INITIAL_LEADS: ContactLead[] = [
  {
    id: 'lead1',
    name: "Alexandre Moreau",
    email: "alex.moreau@musiclabel.com",
    phone: "+33 6 12 34 56 78",
    subject: "Proposition de Co-production & Booking Festival",
    message: "Bonjour l'équipe LVNT, nous souhaiterions programmer KAZA sur notre festival estival à Paris en juillet 2026. Merci de nous recontacter.",
    date: "2026-07-20 14:30",
    status: 'Nouveau'
  },
  {
    id: 'lead2',
    name: "Camille Dupont",
    email: "camille@fashionagency.fr",
    phone: "+33 6 98 76 54 32",
    subject: "Demande de partenariat de marque",
    message: "Nous préparons une campagne internationale pour une marque de haute horlogerie et cherchons un talent incarnant l'élégance et la modernité.",
    date: "2026-07-19 11:15",
    status: 'En cours'
  }
];

export const INITIAL_APPOINTMENTS: Appointment[] = [
  {
    id: 'app1',
    name: "Thomas Laurent",
    email: "t.laurent@gmail.com",
    phone: "+33 7 44 22 11 00",
    serviceRequested: "Management d'artistes",
    preferredDate: "2026-07-28",
    preferredTime: "14:00",
    notes: "Présentation de mon projet d'album et recherche d'un management structurant.",
    status: 'Confirmé',
    createdAt: "2026-07-20"
  }
];

export const INITIAL_RUBRIQUES = [
  {
    id: 'rub1',
    title: "Studios & Infrastructures Audio Haute-Fidélité",
    tagline: "ÉQUIPEMENT PRODUCTIONS LVNT",
    description: "Infrastructures d'enregistrement acoustique traitées, régies SSL & Neve, cabines privatives de prises de voix à Paris et Londres.",
    category: "INFRASTRUCTURE",
    image: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&q=80&w=800",
    linkText: "Explorer le Studio",
    badge: "2026"
  },
  {
    id: 'rub2',
    title: "Partenariats Luxe & Synchronisation Média",
    tagline: "MARQUES & CINÉMA",
    description: "Placement de titres, bandes originales de défilés de mode et partenariats d'égérie exclusifs pour les artistes du roster LVNT.",
    category: "PARTENARIATS",
    image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80&w=800",
    linkText: "En savoir plus",
    badge: "BRANDING"
  }
];
