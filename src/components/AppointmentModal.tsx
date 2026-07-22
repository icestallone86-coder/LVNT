import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Clock, CheckCircle2, User, Mail, Phone, FileText } from 'lucide-react';
import { Appointment, Service } from '../types';

interface AppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  services: Service[];
  preselectedService?: string;
  onAddAppointment: (appointment: Omit<Appointment, 'id' | 'status' | 'createdAt'>) => void;
}

export const AppointmentModal: React.FC<AppointmentModalProps> = ({
  isOpen,
  onClose,
  services,
  preselectedService = '',
  onAddAppointment,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    serviceRequested: preselectedService || (services[0]?.title ?? "Management d'artistes"),
    preferredDate: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0],
    preferredTime: '14:00',
    notes: '',
  });

  const [confirmed, setConfirmed] = useState(false);

  const timeSlots = ['10:00', '11:30', '14:00', '15:30', '17:00'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;

    onAddAppointment({
      name: formData.name,
      email: formData.email,
      phone: formData.phone || 'Non renseigné',
      serviceRequested: formData.serviceRequested,
      preferredDate: formData.preferredDate,
      preferredTime: formData.preferredTime,
      notes: formData.notes,
    });

    setConfirmed(true);
    setTimeout(() => {
      setConfirmed(false);
      onClose();
    }, 3000);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="bg-zinc-950 border border-zinc-800 p-6 sm:p-10 max-w-xl w-full relative shadow-2xl my-8"
        >
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2 text-zinc-400 hover:text-white transition-colors"
            aria-label="Fermer"
          >
            <X size={20} />
          </button>

          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-white text-black flex items-center justify-center font-bold">
              <Calendar size={20} />
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-widest text-zinc-500 font-mono-tech block">
                AGENDA EXÉCUTIF
              </span>
              <h3 className="text-xl font-bold text-white font-display">
                Prendre Rendez-vous
              </h3>
            </div>
          </div>

          {confirmed ? (
            <div className="py-12 text-center space-y-4">
              <CheckCircle2 size={56} className="text-white mx-auto animate-bounce" />
              <h4 className="text-2xl font-bold text-white font-display">
                Rendez-vous pré-réservé !
              </h4>
              <p className="text-zinc-400 text-sm font-light max-w-md mx-auto">
                Votre créneau le <strong className="text-white">{formData.preferredDate}</strong> à <strong className="text-white">{formData.preferredTime}</strong> a bien été enregistré. Notre secrétariat confirme la séance sous 24h par email.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="text-[10px] uppercase tracking-widest text-zinc-500 mb-1.5 block font-mono-tech">
                  VOUS CONCERNE (SERVICE SOUHAITÉ)
                </label>
                <select
                  value={formData.serviceRequested}
                  onChange={(e) => setFormData({ ...formData, serviceRequested: e.target.value })}
                  className="w-full bg-black border border-zinc-800 px-4 py-3 text-white text-sm focus:border-white focus:outline-none transition-colors"
                >
                  {services.map((s) => (
                    <option key={s.id} value={s.title}>
                      {s.title}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] uppercase tracking-widest text-zinc-500 mb-1.5 block font-mono-tech">
                    DATE SOUHAITÉE *
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.preferredDate}
                    onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                    className="w-full bg-black border border-zinc-800 px-4 py-3 text-white text-sm focus:border-white focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="text-[10px] uppercase tracking-widest text-zinc-500 mb-1.5 block font-mono-tech">
                    CRÉNEAU HORAIRE *
                  </label>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {timeSlots.map((slot) => (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => setFormData({ ...formData, preferredTime: slot })}
                        className={`px-3 py-2 text-xs font-mono-tech border transition-colors ${
                          formData.preferredTime === slot
                            ? 'bg-white text-black font-bold border-white'
                            : 'bg-black text-zinc-400 border-zinc-800 hover:border-zinc-600'
                        }`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <label className="text-[10px] uppercase tracking-widest text-zinc-500 mb-1.5 block font-mono-tech">
                  NOM & PRÉNOM *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="ex: Julien Ross"
                  className="w-full bg-black border border-zinc-800 px-4 py-3 text-white text-sm focus:border-white focus:outline-none transition-colors"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] uppercase tracking-widest text-zinc-500 mb-1.5 block font-mono-tech">
                    EMAIL *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="email@domaine.com"
                    className="w-full bg-black border border-zinc-800 px-4 py-3 text-white text-sm focus:border-white focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="text-[10px] uppercase tracking-widest text-zinc-500 mb-1.5 block font-mono-tech">
                    TÉLÉPHONE
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+33 6..."
                    className="w-full bg-black border border-zinc-800 px-4 py-3 text-white text-sm focus:border-white focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] uppercase tracking-widest text-zinc-500 mb-1.5 block font-mono-tech">
                  NOTES & OBJECTIFS DE L&apos;ENTRETIEN
                </label>
                <textarea
                  rows={3}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Précisez succinctement l'objet de votre démarche..."
                  className="w-full bg-black border border-zinc-800 px-4 py-3 text-white text-sm focus:border-white focus:outline-none transition-colors resize-none"
                ></textarea>
              </div>

              <div className="pt-4 flex gap-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="w-1/3 border border-zinc-800 text-zinc-400 py-3 text-xs font-semibold uppercase tracking-wider hover:text-white"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="w-2/3 bg-white text-black py-3 text-xs font-bold uppercase tracking-wider hover:bg-zinc-200 transition-colors"
                >
                  Confirmer le rendez-vous
                </button>
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
