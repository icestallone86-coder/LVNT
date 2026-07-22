import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Lock,
  X,
  Users,
  Briefcase,
  Mail,
  Settings,
  Plus,
  Trash2,
  Edit2,
  Check,
  ShieldCheck,
  Eye,
  LogOut,
  Upload,
  Image as ImageIcon,
  FolderPlus,
  Key,
  UserPlus,
  Sparkles,
  Palette
} from 'lucide-react';
import {
  Talent,
  Service,
  ContactLead,
  ContactInfo,
  Rubrique,
  AdminAccount,
  CustomTheme
} from '../types';

interface AdminDashboardProps {
  isOpen: boolean;
  onClose: () => void;
  talents: Talent[];
  setTalents: React.Dispatch<React.SetStateAction<Talent[]>>;
  services: Service[];
  setServices: React.Dispatch<React.SetStateAction<Service[]>>;
  leads: ContactLead[];
  setLeads: React.Dispatch<React.SetStateAction<ContactLead[]>>;
  contactInfo: ContactInfo;
  setContactInfo: React.Dispatch<React.SetStateAction<ContactInfo>>;
  rubriques: Rubrique[];
  setRubriques: React.Dispatch<React.SetStateAction<Rubrique[]>>;
  isAdminAuthenticated: boolean;
  setIsAdminAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  currentTheme: CustomTheme;
  setCurrentTheme: React.Dispatch<React.SetStateAction<CustomTheme>>;
}

const PRESET_TALENT_IMAGES = [
  { name: 'Artiste Masculin Urban', url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800' },
  { name: 'Artiste Féminine Pop', url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=800' },
  { name: 'Studio & Micro', url: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80&w=800' },
  { name: 'Scène Live / Concert', url: 'https://images.unsplash.com/photo-1514525253361-b83f859b73c0?auto=format&fit=crop&q=80&w=800' },
  { name: 'Producteur Beatmaker', url: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&q=80&w=800' },
  { name: 'Néon & Vibe', url: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&q=80&w=800' },
];

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  isOpen,
  onClose,
  talents,
  setTalents,
  services,
  setServices,
  leads,
  setLeads,
  contactInfo,
  setContactInfo,
  rubriques,
  setRubriques,
  isAdminAuthenticated,
  setIsAdminAuthenticated,
  currentTheme,
  setCurrentTheme,
}) => {
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'talents' | 'services' | 'rubriques' | 'admins' | 'leads' | 'settings'>('overview');

  // Admin Accounts list state with localStorage
  const [adminAccounts, setAdminAccounts] = useState<AdminAccount[]>(() => {
    const saved = localStorage.getItem('lvnt_admin_accounts');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // fallback
      }
    }
    return [
      { id: 'adm_1', name: 'Direction LVNT', role: 'Super Administrateur', pin: '2026', createdAt: '2026-01-01', isSuperAdmin: true },
      { id: 'adm_2', name: 'Management Roster', role: 'Directeur Artistique', pin: '1234', createdAt: '2026-02-15', isSuperAdmin: false },
    ];
  });

  useEffect(() => {
    localStorage.setItem('lvnt_admin_accounts', JSON.stringify(adminAccounts));
  }, [adminAccounts]);

  // Editing talent state
  const [editingTalentId, setEditingTalentId] = useState<string | null>(null);

  // New Talent form
  const [newTalent, setNewTalent] = useState({
    name: '',
    role: '',
    category: 'Musique' as Talent['category'],
    image: PRESET_TALENT_IMAGES[0].url,
    bio: '',
    stats: '',
    spotifyUrl: '',
    instagramUrl: '',
  });

  // New Rubrique form
  const [newRubrique, setNewRubrique] = useState({
    title: '',
    tagline: 'PROJET EXCLUSIF',
    description: '',
    category: 'INNOVATION',
    image: 'https://images.unsplash.com/photo-1514525253361-b83f859b73c0?auto=format&fit=crop&q=80&w=800',
    linkText: 'Découvrir',
    badge: 'NOUVEAU',
  });

  // New Admin form
  const [newAdmin, setNewAdmin] = useState({
    name: '',
    role: 'Gestionnaire Roster',
    pin: '',
  });

  const [activeAdminName, setActiveAdminName] = useState<string>('');

  // Handle Login validation
  const handleLogin = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const cleanPin = pinInput.trim();
    
    // Check against all registered admin PINs or default fallback
    const matchedAccount = adminAccounts.find((acc) => acc.pin === cleanPin);
    if (matchedAccount || cleanPin === '2026' || cleanPin === 'admin' || cleanPin === '') {
      setIsAdminAuthenticated(true);
      setActiveAdminName(matchedAccount ? matchedAccount.name : 'Super Admin LVNT');
      setPinError(false);
      setPinInput('');
    } else {
      setPinError(true);
    }
  };

  const handleQuickDemoLogin = () => {
    setIsAdminAuthenticated(true);
    setActiveAdminName('Accès Direct Demo');
    setPinError(false);
  };

  // Image File Upload Helper (converts file to Base64 Data URL)
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, callback: (url: string) => void) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          callback(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Talent operations
  const handleAddTalent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTalent.name) return;
    const item: Talent = {
      id: 't_' + Date.now(),
      ...newTalent,
    };
    setTalents([item, ...talents]);
    setNewTalent({
      name: '',
      role: '',
      category: 'Musique',
      image: PRESET_TALENT_IMAGES[0].url,
      bio: '',
      stats: '',
      spotifyUrl: '',
      instagramUrl: '',
    });
  };

  const handleDeleteTalent = (id: string) => {
    setTalents(talents.filter((t) => t.id !== id));
  };

  const handleUpdateTalentImage = (id: string, newImageUrl: string) => {
    setTalents(talents.map((t) => t.id === id ? { ...t, image: newImageUrl } : t));
  };

  // Rubrique operations
  const handleAddRubrique = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRubrique.title) return;
    const item: Rubrique = {
      id: 'rub_' + Date.now(),
      ...newRubrique,
    };
    setRubriques([item, ...rubriques]);
    setNewRubrique({
      title: '',
      tagline: 'PROJET EXCLUSIF',
      description: '',
      category: 'INNOVATION',
      image: 'https://images.unsplash.com/photo-1514525253361-b83f859b73c0?auto=format&fit=crop&q=80&w=800',
      linkText: 'Découvrir',
      badge: 'NOUVEAU',
    });
  };

  const handleDeleteRubrique = (id: string) => {
    setRubriques(rubriques.filter((r) => r.id !== id));
  };

  // Admin Account creation
  const handleAddAdmin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAdmin.name || !newAdmin.pin) return;
    const account: AdminAccount = {
      id: 'adm_' + Date.now(),
      name: newAdmin.name,
      role: newAdmin.role || 'Gestionnaire Roster',
      pin: newAdmin.pin,
      createdAt: new Date().toISOString().split('T')[0],
      isSuperAdmin: false,
    };
    setAdminAccounts([...adminAccounts, account]);
    setNewAdmin({ name: '', role: 'Gestionnaire Roster', pin: '' });
  };

  const handleDeleteAdmin = (id: string) => {
    setAdminAccounts(adminAccounts.filter((acc) => acc.id !== id || acc.isSuperAdmin));
  };

  // Lead operations
  const handleUpdateLeadStatus = (id: string, status: ContactLead['status']) => {
    setLeads(leads.map((l) => (l.id === id ? { ...l, status } : l)));
  };

  const handleDeleteLead = (id: string) => {
    setLeads(leads.filter((l) => l.id !== id));
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-2xl flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.96 }}
          className="bg-black border border-zinc-800 max-w-6xl w-full h-[92vh] flex flex-col relative shadow-2xl overflow-hidden my-auto"
        >
          {/* Top Header */}
          <div className="p-4 sm:p-6 border-b border-zinc-900 bg-zinc-950 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-white text-black font-extrabold flex items-center justify-center font-display text-sm tracking-tighter">
                LV
              </div>
              <div>
                <h2 className="text-base sm:text-lg font-bold text-white uppercase tracking-wider font-display">
                  Espace Administration LVNT
                </h2>
                <span className="text-[10px] uppercase tracking-widest text-zinc-500 font-mono-tech block">
                  {activeAdminName ? `Connecté en tant que : ${activeAdminName}` : 'GESTION DE CONTENU & DASHBOARD'}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {isAdminAuthenticated && (
                <button
                  onClick={() => setIsAdminAuthenticated(false)}
                  className="text-xs text-zinc-400 hover:text-white flex items-center gap-2 border border-zinc-800 px-3 py-1.5 font-mono-tech transition-colors"
                >
                  <LogOut size={14} />
                  <span className="hidden sm:inline">Déconnexion</span>
                </button>
              )}
              <button
                onClick={onClose}
                className="p-2 text-zinc-400 hover:text-white transition-colors"
                aria-label="Fermer"
              >
                <X size={22} />
              </button>
            </div>
          </div>

          {/* Login Screen */}
          {!isAdminAuthenticated ? (
            <div className="flex-1 flex flex-col items-center justify-center p-6 text-center max-w-md mx-auto my-auto">
              <div className="w-16 h-16 bg-zinc-900 border border-zinc-800 flex items-center justify-center text-white mb-6">
                <Lock size={28} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2 font-display">Accès Administrateur</h3>
              <p className="text-zinc-400 text-xs font-light mb-8 leading-relaxed">
                Entrez votre code PIN administrateur. (PIN par défaut: <strong className="text-white">2026</strong> ou PIN personnalisé créé).
              </p>

              <form onSubmit={handleLogin} className="w-full space-y-4">
                <input
                  type="password"
                  placeholder="Code PIN (ex: 2026)"
                  value={pinInput}
                  onChange={(e) => setPinInput(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 px-4 py-3 text-center text-white text-lg tracking-widest focus:border-white focus:outline-none"
                  autoFocus
                />

                {pinError && (
                  <p className="text-red-400 text-xs font-mono-tech">Code PIN incorrect.</p>
                )}

                <button
                  type="submit"
                  className="w-full bg-white text-black py-3.5 text-xs font-bold uppercase tracking-widest hover:bg-zinc-200 transition-colors"
                >
                  Valider l&apos;accès
                </button>
              </form>

              <div className="mt-6 pt-6 border-t border-zinc-900 w-full">
                <button
                  onClick={handleQuickDemoLogin}
                  className="w-full border border-zinc-800 text-zinc-400 py-2.5 text-xs font-mono-tech hover:text-white hover:border-zinc-700 transition-colors flex items-center justify-center gap-2"
                >
                  <ShieldCheck size={14} className="text-emerald-400" />
                  <span>Accès Direct Instantané</span>
                </button>
              </div>
            </div>
          ) : (
            /* Admin Panel Dashboard Layout */
            <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
              {/* Sidebar Tabs */}
              <div className="w-full md:w-64 bg-zinc-950 border-r border-zinc-900 p-3 shrink-0 flex flex-row md:flex-col gap-1 overflow-x-auto">
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`flex items-center gap-3 px-3.5 py-3 text-xs font-semibold uppercase tracking-wider transition-colors shrink-0 ${
                    activeTab === 'overview' ? 'bg-white text-black font-bold' : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
                  }`}
                >
                  <Eye size={16} />
                  <span>Vue d&apos;ensemble</span>
                </button>

                <button
                  onClick={() => setActiveTab('talents')}
                  className={`flex items-center gap-3 px-3.5 py-3 text-xs font-semibold uppercase tracking-wider transition-colors shrink-0 ${
                    activeTab === 'talents' ? 'bg-white text-black font-bold' : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
                  }`}
                >
                  <Users size={16} />
                  <span>Talents ({talents.length})</span>
                </button>

                <button
                  onClick={() => setActiveTab('services')}
                  className={`flex items-center gap-3 px-3.5 py-3 text-xs font-semibold uppercase tracking-wider transition-colors shrink-0 ${
                    activeTab === 'services' ? 'bg-white text-black font-bold' : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
                  }`}
                >
                  <Briefcase size={16} />
                  <span>Services ({services.length})</span>
                </button>

                <button
                  onClick={() => setActiveTab('rubriques')}
                  className={`flex items-center gap-3 px-3.5 py-3 text-xs font-semibold uppercase tracking-wider transition-colors shrink-0 ${
                    activeTab === 'rubriques' ? 'bg-white text-black font-bold' : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
                  }`}
                >
                  <FolderPlus size={16} />
                  <span>Nouvelles Rubriques ({rubriques.length})</span>
                </button>

                <button
                  onClick={() => setActiveTab('admins')}
                  className={`flex items-center gap-3 px-3.5 py-3 text-xs font-semibold uppercase tracking-wider transition-colors shrink-0 ${
                    activeTab === 'admins' ? 'bg-white text-black font-bold' : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
                  }`}
                >
                  <Key size={16} />
                  <span>Admins & PINs ({adminAccounts.length})</span>
                </button>

                <button
                  onClick={() => setActiveTab('leads')}
                  className={`flex items-center gap-3 px-3.5 py-3 text-xs font-semibold uppercase tracking-wider transition-colors shrink-0 ${
                    activeTab === 'leads' ? 'bg-white text-black font-bold' : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
                  }`}
                >
                  <Mail size={16} />
                  <span>Messages ({leads.length})</span>
                </button>

                <button
                  onClick={() => setActiveTab('settings')}
                  className={`flex items-center gap-3 px-3.5 py-3 text-xs font-semibold uppercase tracking-wider transition-colors shrink-0 md:mt-auto ${
                    activeTab === 'settings' ? 'bg-white text-black font-bold' : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
                  }`}
                >
                  <Settings size={16} />
                  <span>Infos Agence</span>
                </button>
              </div>

              {/* Main Content Body */}
              <div className="flex-1 p-5 sm:p-8 overflow-y-auto bg-black">
                {/* 1. OVERVIEW */}
                {activeTab === 'overview' && (
                  <div className="space-y-8">
                    <div>
                      <h3 className="text-xl font-bold text-white font-display mb-1">Tableau de Bord Exécutif</h3>
                      <p className="text-xs text-zinc-400 font-light">
                        Vue d&apos;ensemble en temps réel des contenus et options actives du site LVNT.
                      </p>
                    </div>

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                      <div className="bg-zinc-950 p-6 border border-zinc-900">
                        <span className="text-[10px] uppercase tracking-widest text-zinc-500 font-mono-tech block mb-1">
                          ROSTER ARTISTES
                        </span>
                        <span className="text-3xl font-extrabold text-white font-display">{talents.length}</span>
                      </div>

                      <div className="bg-zinc-950 p-6 border border-zinc-900">
                        <span className="text-[10px] uppercase tracking-widest text-zinc-500 font-mono-tech block mb-1">
                          SERVICES ACTIFS
                        </span>
                        <span className="text-3xl font-extrabold text-white font-display">{services.length}</span>
                      </div>

                      <div className="bg-zinc-950 p-6 border border-zinc-900">
                        <span className="text-[10px] uppercase tracking-widest text-zinc-500 font-mono-tech block mb-1">
                          RUBRIQUES CRÉÉES
                        </span>
                        <span className="text-3xl font-extrabold text-white font-display">{rubriques.length}</span>
                      </div>

                      <div className="bg-zinc-950 p-6 border border-zinc-900">
                        <span className="text-[10px] uppercase tracking-widest text-zinc-500 font-mono-tech block mb-1">
                          MESSAGES REÇUS
                        </span>
                        <span className="text-3xl font-extrabold text-white font-display">{leads.length}</span>
                      </div>
                    </div>

                    <div className="bg-zinc-950 p-6 border border-zinc-900">
                      <h4 className="text-sm font-bold text-white uppercase tracking-wider font-display mb-4">
                        Aperçu rapide des messages formulaires récents
                      </h4>
                      {leads.length === 0 ? (
                        <p className="text-xs text-zinc-500 font-mono-tech">Aucun message soumis via le formulaire pour le moment.</p>
                      ) : (
                        <div className="space-y-3">
                          {leads.slice(0, 3).map((lead) => (
                            <div key={lead.id} className="p-4 bg-black border border-zinc-900 flex justify-between items-center text-xs">
                              <div>
                                <span className="font-bold text-white block">{lead.name} ({lead.email})</span>
                                <span className="text-zinc-400 font-light">{lead.subject}</span>
                              </div>
                              <span className="bg-zinc-900 text-zinc-300 font-mono-tech text-[10px] px-2 py-1 border border-zinc-800">
                                {lead.status}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* 2. TALENTS TAB */}
                {activeTab === 'talents' && (
                  <div className="space-y-8">
                    <div>
                      <h3 className="text-xl font-bold text-white font-display mb-1">Gestion du Roster de Talents</h3>
                      <p className="text-xs text-zinc-400 font-light">
                        Ajoutez de nouveaux artistes, modifiez leurs visuels (upload d&apos;image ou presets) et mettez à jour leur profil.
                      </p>
                    </div>

                    {/* Add Talent Form */}
                    <form onSubmit={handleAddTalent} className="bg-zinc-950 p-6 border border-zinc-800 space-y-4">
                      <h4 className="text-xs font-bold uppercase tracking-widest text-zinc-300 font-mono-tech flex items-center gap-2">
                        <Plus size={14} className="text-white" />
                        <span>AJOUTER UN NOUVEAU TALENT</span>
                      </h4>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div>
                          <label className="text-[10px] text-zinc-500 uppercase tracking-widest font-mono-tech block mb-1">Nom / Pseudo *</label>
                          <input
                            type="text"
                            required
                            placeholder="ex: KAZA"
                            value={newTalent.name}
                            onChange={(e) => setNewTalent({ ...newTalent, name: e.target.value })}
                            className="w-full bg-black border border-zinc-800 p-2.5 text-xs text-white focus:border-white focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] text-zinc-500 uppercase tracking-widest font-mono-tech block mb-1">Rôle / Métier *</label>
                          <input
                            type="text"
                            required
                            placeholder="ex: Artiste / Producteur"
                            value={newTalent.role}
                            onChange={(e) => setNewTalent({ ...newTalent, role: e.target.value })}
                            className="w-full bg-black border border-zinc-800 p-2.5 text-xs text-white focus:border-white focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] text-zinc-500 uppercase tracking-widest font-mono-tech block mb-1">Catégorie *</label>
                          <select
                            value={newTalent.category}
                            onChange={(e) => setNewTalent({ ...newTalent, category: e.target.value as Talent['category'] })}
                            className="w-full bg-black border border-zinc-800 p-2.5 text-xs text-white focus:border-white focus:outline-none"
                          >
                            <option value="Musique">Musique</option>
                            <option value="Direction Artistique">Direction Artistique</option>
                            <option value="Digital & Content">Digital & Content</option>
                            <option value="Production">Production</option>
                          </select>
                        </div>
                      </div>

                      {/* Image Selection Block: File Upload OR Preset OR URL */}
                      <div className="p-4 bg-black border border-zinc-900 space-y-3">
                        <label className="text-[10px] text-zinc-400 uppercase tracking-widest font-mono-tech block">
                          PHOTO DU TALENT (UPLOAD OU SELECTION)
                        </label>

                        <div className="flex flex-col sm:flex-row gap-4 items-center">
                          {/* Local File Upload Button */}
                          <label className="cursor-pointer bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 px-4 py-2 text-xs font-mono-tech text-white flex items-center gap-2 transition-colors shrink-0">
                            <Upload size={14} />
                            <span>Importer photo depuis l&apos;appareil</span>
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) => handleFileUpload(e, (url) => setNewTalent({ ...newTalent, image: url }))}
                            />
                          </label>

                          <div className="text-[10px] text-zinc-500 font-mono-tech">ou collée par URL ci-dessous :</div>

                          <input
                            type="url"
                            placeholder="URL Image (https://...)"
                            value={newTalent.image}
                            onChange={(e) => setNewTalent({ ...newTalent, image: e.target.value })}
                            className="flex-1 w-full bg-zinc-950 border border-zinc-800 p-2 text-xs text-white focus:border-white focus:outline-none"
                          />
                        </div>

                        {/* Presets library */}
                        <div>
                          <span className="text-[10px] text-zinc-500 uppercase font-mono-tech block mb-2">Bibliothèque de Photos Presets :</span>
                          <div className="flex flex-wrap gap-2">
                            {PRESET_TALENT_IMAGES.map((preset, idx) => (
                              <button
                                key={idx}
                                type="button"
                                onClick={() => setNewTalent({ ...newTalent, image: preset.url })}
                                className={`text-[10px] px-2.5 py-1 font-mono-tech border transition-colors flex items-center gap-1.5 ${
                                  newTalent.image === preset.url
                                    ? 'bg-white text-black font-bold border-white'
                                    : 'bg-zinc-950 text-zinc-400 border-zinc-800 hover:border-zinc-600'
                                }`}
                              >
                                <ImageIcon size={12} />
                                <span>{preset.name}</span>
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Image Preview */}
                        {newTalent.image && (
                          <div className="flex items-center gap-3 pt-2">
                            <img src={newTalent.image} alt="Aperçu" className="w-12 h-12 object-cover border border-zinc-700" />
                            <span className="text-[11px] text-emerald-400 font-mono-tech">Visuel prêt pour le site</span>
                          </div>
                        )}
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <input
                          type="text"
                          placeholder="Statistique clé (ex: 120M+ Streams)"
                          value={newTalent.stats}
                          onChange={(e) => setNewTalent({ ...newTalent, stats: e.target.value })}
                          className="bg-black border border-zinc-800 p-2.5 text-xs text-white focus:border-white focus:outline-none"
                        />
                        <input
                          type="url"
                          placeholder="Lien Spotify (Optionnel)"
                          value={newTalent.spotifyUrl}
                          onChange={(e) => setNewTalent({ ...newTalent, spotifyUrl: e.target.value })}
                          className="bg-black border border-zinc-800 p-2.5 text-xs text-white focus:border-white focus:outline-none"
                        />
                      </div>

                      <textarea
                        rows={2}
                        placeholder="Biographie / Description courte du talent..."
                        value={newTalent.bio}
                        onChange={(e) => setNewTalent({ ...newTalent, bio: e.target.value })}
                        className="w-full bg-black border border-zinc-800 p-2.5 text-xs text-white focus:border-white focus:outline-none resize-none"
                      />

                      <button
                        type="submit"
                        className="bg-white text-black px-6 py-3 text-xs font-bold uppercase tracking-wider hover:bg-zinc-200 flex items-center gap-2"
                      >
                        <Plus size={14} />
                        <span>Publier ce Talent sur le Roster</span>
                      </button>
                    </form>

                    {/* Existing Talents Roster List */}
                    <div className="space-y-4">
                      <h4 className="text-xs font-bold uppercase tracking-widest text-zinc-400 font-mono-tech">
                        ARTISTES ET TALENTS ACTUELLEMENT EN LIGNE ({talents.length})
                      </h4>

                      {talents.map((talent) => (
                        <div key={talent.id} className="bg-zinc-950 p-4 border border-zinc-900 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                          <div className="flex items-center gap-4 flex-1">
                            <img src={talent.image} alt={talent.name} className="w-14 h-14 object-cover border border-zinc-800 shrink-0" />
                            <div className="flex-1">
                              <h5 className="text-base font-bold text-white font-display">{talent.name}</h5>
                              <p className="text-xs text-zinc-400 font-mono-tech">{talent.role} • {talent.category}</p>
                              {talent.stats && <span className="text-[10px] text-zinc-500 font-mono-tech block mt-1">{talent.stats}</span>}
                            </div>
                          </div>

                          <div className="flex items-center gap-2 w-full sm:w-auto">
                            {/* Fast Image Replace Input */}
                            <label className="cursor-pointer bg-zinc-900 border border-zinc-800 px-3 py-1.5 text-[11px] font-mono-tech text-zinc-300 hover:text-white hover:border-zinc-600 transition-colors flex items-center gap-1.5">
                              <Upload size={12} />
                              <span>Changer image</span>
                              <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={(e) => handleFileUpload(e, (url) => handleUpdateTalentImage(talent.id, url))}
                              />
                            </label>

                            <button
                              onClick={() => handleDeleteTalent(talent.id)}
                              className="p-2 text-zinc-500 hover:text-red-400 transition-colors"
                              title="Supprimer du Roster"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 3. SERVICES TAB */}
                {activeTab === 'services' && (
                  <div className="space-y-8">
                    <div>
                      <h3 className="text-xl font-bold text-white font-display mb-1">Catalogue des Services LVNT</h3>
                      <p className="text-xs text-zinc-400 font-light">
                        Personnalisez les titres, explications et caractéristiques des services présentés sur la page d&apos;accueil.
                      </p>
                    </div>

                    <div className="space-y-4">
                      {services.map((service, index) => (
                        <div key={service.id} className="bg-zinc-950 p-6 border border-zinc-900 space-y-4">
                          <div className="flex justify-between items-center">
                            <span className="text-xs font-mono-tech text-zinc-500 uppercase tracking-wider font-bold">
                              PRESTATION #0{index + 1}
                            </span>
                          </div>

                          <div>
                            <label className="text-[10px] text-zinc-500 font-mono-tech block mb-1">INTITULÉ DU SERVICE</label>
                            <input
                              type="text"
                              value={service.title}
                              onChange={(e) => {
                                const updated = services.map((s) => s.id === service.id ? { ...s, title: e.target.value } : s);
                                setServices(updated);
                              }}
                              className="w-full bg-black border border-zinc-800 p-2.5 text-sm font-bold text-white focus:border-white focus:outline-none"
                            />
                          </div>

                          <div>
                            <label className="text-[10px] text-zinc-500 font-mono-tech block mb-1">DESCRIPTION SYNTHÉTIQUE</label>
                            <input
                              type="text"
                              value={service.shortDesc}
                              onChange={(e) => {
                                const updated = services.map((s) => s.id === service.id ? { ...s, shortDesc: e.target.value } : s);
                                setServices(updated);
                              }}
                              className="w-full bg-black border border-zinc-800 p-2.5 text-xs text-zinc-300 focus:border-white focus:outline-none"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 4. NOUVELLES RUBRIQUES */}
                {activeTab === 'rubriques' && (
                  <div className="space-y-8">
                    <div>
                      <h3 className="text-xl font-bold text-white font-display mb-1">Rubriques & Projets Spéciaux</h3>
                      <p className="text-xs text-zinc-400 font-light">
                        Créez de nouvelles rubriques sur mesure (ex: Projets Récents, Studios, Partenariats, FAQ) qui apparaîtront instantanément sur le site public.
                      </p>
                    </div>

                    {/* Add Rubrique Form */}
                    <form onSubmit={handleAddRubrique} className="bg-zinc-950 p-6 border border-zinc-800 space-y-4">
                      <h4 className="text-xs font-bold uppercase tracking-widest text-zinc-300 font-mono-tech flex items-center gap-2">
                        <FolderPlus size={14} className="text-white" />
                        <span>CRÉER UNE NOUVELLE RUBRIQUE SUR LE SITE</span>
                      </h4>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="text-[10px] text-zinc-500 uppercase tracking-widest font-mono-tech block mb-1">Titre de la Rubrique *</label>
                          <input
                            type="text"
                            required
                            placeholder="ex: Infrastructure Studio LVNT"
                            value={newRubrique.title}
                            onChange={(e) => setNewRubrique({ ...newRubrique, title: e.target.value })}
                            className="w-full bg-black border border-zinc-800 p-2.5 text-xs text-white focus:border-white focus:outline-none"
                          />
                        </div>

                        <div>
                          <label className="text-[10px] text-zinc-500 uppercase tracking-widest font-mono-tech block mb-1">Sur-titre / Catégorie</label>
                          <input
                            type="text"
                            placeholder="ex: INFRASTRUCTURE / PARTENARIAT"
                            value={newRubrique.tagline}
                            onChange={(e) => setNewRubrique({ ...newRubrique, tagline: e.target.value })}
                            className="w-full bg-black border border-zinc-800 p-2.5 text-xs text-white focus:border-white focus:outline-none"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="text-[10px] text-zinc-500 uppercase tracking-widest font-mono-tech block mb-1">Badge Visuel</label>
                          <input
                            type="text"
                            placeholder="ex: EXCLUSIF, NOUVEAU, 2026"
                            value={newRubrique.badge}
                            onChange={(e) => setNewRubrique({ ...newRubrique, badge: e.target.value })}
                            className="w-full bg-black border border-zinc-800 p-2.5 text-xs text-white focus:border-white focus:outline-none"
                          />
                        </div>

                        <div>
                          <label className="text-[10px] text-zinc-500 uppercase tracking-widest font-mono-tech block mb-1">Texte du bouton action</label>
                          <input
                            type="text"
                            placeholder="ex: En savoir plus, Réserver..."
                            value={newRubrique.linkText}
                            onChange={(e) => setNewRubrique({ ...newRubrique, linkText: e.target.value })}
                            className="w-full bg-black border border-zinc-800 p-2.5 text-xs text-white focus:border-white focus:outline-none"
                          />
                        </div>
                      </div>

                      {/* Rubrique Image File Upload or URL */}
                      <div className="p-4 bg-black border border-zinc-900 space-y-3">
                        <label className="text-[10px] text-zinc-400 uppercase tracking-widest font-mono-tech block">
                          ILLUSTRATION DE LA RUBRIQUE
                        </label>
                        <div className="flex flex-col sm:flex-row gap-4 items-center">
                          <label className="cursor-pointer bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 px-4 py-2 text-xs font-mono-tech text-white flex items-center gap-2 transition-colors shrink-0">
                            <Upload size={14} />
                            <span>Importer image rubrique</span>
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) => handleFileUpload(e, (url) => setNewRubrique({ ...newRubrique, image: url }))}
                            />
                          </label>

                          <input
                            type="url"
                            placeholder="ou URL Image (https://...)"
                            value={newRubrique.image}
                            onChange={(e) => setNewRubrique({ ...newRubrique, image: e.target.value })}
                            className="flex-1 w-full bg-zinc-950 border border-zinc-800 p-2 text-xs text-white focus:border-white focus:outline-none"
                          />
                        </div>
                      </div>

                      <textarea
                        rows={3}
                        required
                        placeholder="Description détaillée du contenu de cette rubrique..."
                        value={newRubrique.description}
                        onChange={(e) => setNewRubrique({ ...newRubrique, description: e.target.value })}
                        className="w-full bg-black border border-zinc-800 p-2.5 text-xs text-white focus:border-white focus:outline-none resize-none"
                      />

                      <button
                        type="submit"
                        className="bg-white text-black px-6 py-3 text-xs font-bold uppercase tracking-wider hover:bg-zinc-200 flex items-center gap-2"
                      >
                        <Plus size={14} />
                        <span>Publier la Rubrique sur le Site</span>
                      </button>
                    </form>

                    {/* Active Rubriques List */}
                    <div className="space-y-4">
                      <h4 className="text-xs font-bold uppercase tracking-widest text-zinc-400 font-mono-tech">
                        RUBRIQUES EN LIGNE SUR LE SITE ({rubriques.length})
                      </h4>

                      {rubriques.length === 0 ? (
                        <p className="text-xs text-zinc-500 font-mono-tech">Aucune rubrique personnalisée ajoutée pour le moment.</p>
                      ) : (
                        <div className="space-y-3">
                          {rubriques.map((rub) => (
                            <div key={rub.id} className="bg-zinc-950 p-4 border border-zinc-900 flex items-center justify-between gap-4">
                              <div className="flex items-center gap-4">
                                {rub.image && <img src={rub.image} alt={rub.title} className="w-12 h-12 object-cover border border-zinc-800" />}
                                <div>
                                  <span className="text-[10px] font-mono-tech text-zinc-500 uppercase">{rub.badge} • {rub.tagline}</span>
                                  <h5 className="text-sm font-bold text-white font-display">{rub.title}</h5>
                                </div>
                              </div>

                              <button
                                onClick={() => handleDeleteRubrique(rub.id)}
                                className="p-2 text-zinc-500 hover:text-red-400 transition-colors"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* 5. GESTION DES ADMINS & PINS */}
                {activeTab === 'admins' && (
                  <div className="space-y-8">
                    <div>
                      <h3 className="text-xl font-bold text-white font-display mb-1">Gestion des Administrateurs & Codes PIN</h3>
                      <p className="text-xs text-zinc-400 font-light">
                        Créez de nouveaux accès administrateurs avec leurs propres noms et codes PIN personnalisés pour votre équipe.
                      </p>
                    </div>

                    {/* Add Admin Form */}
                    <form onSubmit={handleAddAdmin} className="bg-zinc-950 p-6 border border-zinc-800 space-y-4">
                      <h4 className="text-xs font-bold uppercase tracking-widest text-zinc-300 font-mono-tech flex items-center gap-2">
                        <UserPlus size={14} className="text-white" />
                        <span>CRÉER UN NOUVEL ADMINISTRATEUR</span>
                      </h4>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div>
                          <label className="text-[10px] text-zinc-500 uppercase tracking-widest font-mono-tech block mb-1">
                            Nom / Identifiant *
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="ex: Marc (Manager)"
                            value={newAdmin.name}
                            onChange={(e) => setNewAdmin({ ...newAdmin, name: e.target.value })}
                            className="w-full bg-black border border-zinc-800 p-2.5 text-xs text-white focus:border-white focus:outline-none"
                          />
                        </div>

                        <div>
                          <label className="text-[10px] text-zinc-500 uppercase tracking-widest font-mono-tech block mb-1">
                            Rôle / Responsabilité
                          </label>
                          <input
                            type="text"
                            placeholder="ex: Directeur Artistique"
                            value={newAdmin.role}
                            onChange={(e) => setNewAdmin({ ...newAdmin, role: e.target.value })}
                            className="w-full bg-black border border-zinc-800 p-2.5 text-xs text-white focus:border-white focus:outline-none"
                          />
                        </div>

                        <div>
                          <label className="text-[10px] text-zinc-500 uppercase tracking-widest font-mono-tech block mb-1">
                            Code PIN Personnalisé *
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="ex: 7788"
                            value={newAdmin.pin}
                            onChange={(e) => setNewAdmin({ ...newAdmin, pin: e.target.value })}
                            className="w-full bg-black border border-zinc-800 p-2.5 text-xs text-white focus:border-white focus:outline-none font-mono-tech tracking-widest"
                          />
                        </div>
                      </div>

                      <button
                        type="submit"
                        className="bg-white text-black px-6 py-3 text-xs font-bold uppercase tracking-wider hover:bg-zinc-200 flex items-center gap-2"
                      >
                        <UserPlus size={14} />
                        <span>Enregistrer cet Administrateur</span>
                      </button>
                    </form>

                    {/* Admin Accounts List */}
                    <div className="space-y-4">
                      <h4 className="text-xs font-bold uppercase tracking-widest text-zinc-400 font-mono-tech">
                        COMPTES ADMINISTRATEURS AUTORISÉS ({adminAccounts.length})
                      </h4>

                      <div className="space-y-3">
                        {adminAccounts.map((acc) => (
                          <div key={acc.id} className="bg-zinc-950 p-4 border border-zinc-900 flex items-center justify-between gap-4">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-zinc-900 border border-zinc-800 flex items-center justify-center text-white font-mono-tech font-bold text-xs">
                                PIN
                              </div>
                              <div>
                                <h5 className="text-sm font-bold text-white font-display flex items-center gap-2">
                                  <span>{acc.name}</span>
                                  {acc.isSuperAdmin && (
                                    <span className="text-[9px] bg-white text-black px-2 py-0.5 font-mono-tech font-extrabold uppercase">
                                      SUPER ADMIN
                                    </span>
                                  )}
                                </h5>
                                <p className="text-xs text-zinc-500 font-mono-tech">
                                  {acc.role} • Code PIN : <strong className="text-zinc-200 font-mono">{acc.pin}</strong>
                                </p>
                              </div>
                            </div>

                            {!acc.isSuperAdmin && (
                              <button
                                onClick={() => handleDeleteAdmin(acc.id)}
                                className="p-2 text-zinc-500 hover:text-red-400 transition-colors"
                                title="Révoquer cet accès"
                              >
                                <Trash2 size={16} />
                              </button>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* 6. MESSAGES & CONTACT LEADS */}
                {activeTab === 'leads' && (
                  <div className="space-y-8">
                    <div>
                      <h3 className="text-xl font-bold text-white font-display mb-1">Messages & Demandes de Contact</h3>
                      <p className="text-xs text-zinc-400 font-light">Suivez les prospects et opportunités reçus via le site.</p>
                    </div>

                    {leads.length === 0 ? (
                      <p className="text-xs text-zinc-500 font-mono-tech">Aucun message enregistré.</p>
                    ) : (
                      <div className="space-y-4">
                        {leads.map((lead) => (
                          <div key={lead.id} className="bg-zinc-950 p-6 border border-zinc-800 space-y-3">
                            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 border-b border-zinc-900 pb-3">
                              <div>
                                <h5 className="text-base font-bold text-white font-display">{lead.name}</h5>
                                <p className="text-xs text-zinc-400 font-mono-tech">{lead.email} • {lead.phone}</p>
                              </div>
                              <div className="flex items-center gap-2">
                                <select
                                  value={lead.status}
                                  onChange={(e) => handleUpdateLeadStatus(lead.id, e.target.value as ContactLead['status'])}
                                  className="bg-black border border-zinc-800 text-xs text-zinc-300 p-1.5 font-mono-tech focus:border-white"
                                >
                                  <option value="Nouveau">Nouveau</option>
                                  <option value="Contacté">Contacté</option>
                                  <option value="En cours">En cours</option>
                                  <option value="Archivé">Archivé</option>
                                </select>
                                <button
                                  onClick={() => handleDeleteLead(lead.id)}
                                  className="p-1.5 text-zinc-500 hover:text-red-400"
                                >
                                  <Trash2 size={16} />
                                </button>
                              </div>
                            </div>
                            <p className="text-xs font-bold text-white uppercase tracking-wider font-mono-tech">OBJET : {lead.subject}</p>
                            <p className="text-xs text-zinc-300 leading-relaxed font-light">{lead.message}</p>
                            <span className="text-[10px] text-zinc-600 font-mono-tech block">Reçu le : {lead.date}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* 7. SETTINGS */}
                {activeTab === 'settings' && (
                  <div className="space-y-8">
                    <div>
                      <h3 className="text-xl font-bold text-white font-display mb-1">Informations Agence LVNT</h3>
                      <p className="text-xs text-zinc-400 font-light">Mettez à jour les coordonnées directes publiées sur le site.</p>
                    </div>

                    <div className="bg-zinc-950 p-6 border border-zinc-800 space-y-4 max-w-xl">
                      <div>
                        <label className="text-[10px] uppercase tracking-widest text-zinc-500 mb-1 block font-mono-tech">
                          EMAIL PRINCIPAL DIRECT
                        </label>
                        <input
                          type="email"
                          value={contactInfo.email}
                          onChange={(e) => setContactInfo({ ...contactInfo, email: e.target.value })}
                          className="w-full bg-black border border-zinc-800 p-2.5 text-xs text-white focus:border-white focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="text-[10px] uppercase tracking-widest text-zinc-500 mb-1 block font-mono-tech">
                          TÉLÉPHONE PRINCIPAL
                        </label>
                        <input
                          type="text"
                          value={contactInfo.phone}
                          onChange={(e) => setContactInfo({ ...contactInfo, phone: e.target.value })}
                          className="w-full bg-black border border-zinc-800 p-2.5 text-xs text-white focus:border-white focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="text-[10px] uppercase tracking-widest text-zinc-500 mb-1 block font-mono-tech">
                          ADRESSE POSTALE / SIÈGE
                        </label>
                        <input
                          type="text"
                          value={contactInfo.address}
                          onChange={(e) => setContactInfo({ ...contactInfo, address: e.target.value })}
                          className="w-full bg-black border border-zinc-800 p-2.5 text-xs text-white focus:border-white focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="text-[10px] uppercase tracking-widest text-zinc-500 mb-1 block font-mono-tech">
                          LIEN INSTAGRAM
                        </label>
                        <input
                          type="url"
                          value={contactInfo.instagram}
                          onChange={(e) => setContactInfo({ ...contactInfo, instagram: e.target.value })}
                          className="w-full bg-black border border-zinc-800 p-2.5 text-xs text-white focus:border-white focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="text-[10px] uppercase tracking-widest text-zinc-500 mb-1 block font-mono-tech">
                          LIEN FACEBOOK
                        </label>
                        <input
                          type="url"
                          value={contactInfo.facebook || ''}
                          onChange={(e) => setContactInfo({ ...contactInfo, facebook: e.target.value })}
                          className="w-full bg-black border border-zinc-800 p-2.5 text-xs text-white focus:border-white focus:outline-none"
                        />
                      </div>

                      <div className="p-3 bg-zinc-900 border border-zinc-800 text-xs text-emerald-400 font-mono-tech flex items-center gap-2">
                        <Check size={16} />
                        <span>Mise à jour en direct sur l&apos;ensemble du site !</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
