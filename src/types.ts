export interface Talent {
  id: string;
  name: string;
  role: string;
  category: 'Musique' | 'Direction Artistique' | 'Digital & Content' | 'Production';
  image: string;
  bio: string;
  stats?: string;
  spotifyUrl?: string;
  instagramUrl?: string;
  featured?: boolean;
}

export interface Service {
  id: string;
  title: string;
  iconName: string;
  shortDesc: string;
  fullDesc: string;
  highlights: string[];
}

export interface Advantage {
  id: string;
  title: string;
  desc: string;
  stat?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  avatar: string;
  quote: string;
  rating: number;
}

export interface NewsItem {
  id: string;
  title: string;
  category: string;
  date: string;
  summary: string;
  imageUrl: string;
}

export interface ContactLead {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  date: string;
  status: 'Nouveau' | 'Contacté' | 'En cours' | 'Archivé';
}

export interface Appointment {
  id: string;
  name: string;
  email: string;
  phone: string;
  serviceRequested: string;
  preferredDate: string;
  preferredTime: string;
  notes?: string;
  status: 'Confirmé' | 'En attente' | 'Terminé';
  createdAt: string;
}

export interface ContactInfo {
  email: string;
  phone: string;
  address: string;
  instagram: string;
  facebook?: string;
  linkedin: string;
  twitter: string;
  spotify: string;
}

export interface Rubrique {
  id: string;
  title: string;
  tagline: string;
  description: string;
  category: string;
  image?: string;
  linkText?: string;
  linkUrl?: string;
  badge?: string;
}

export interface AdminAccount {
  id: string;
  name: string;
  role: string;
  pin: string;
  createdAt: string;
  isSuperAdmin?: boolean;
}

export interface CustomTheme {
  accentColor: 'white' | 'gold' | 'emerald' | 'cyan' | 'purple';
  showRubriques: boolean;
}
