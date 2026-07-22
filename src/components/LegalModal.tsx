import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShieldCheck } from 'lucide-react';

interface LegalModalProps {
  type: 'privacy' | 'terms' | null;
  onClose: () => void;
}

export const LegalModal: React.FC<LegalModalProps> = ({ type, onClose }) => {
  if (!type) return null;

  const isPrivacy = type === 'privacy';

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-6 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-zinc-950 border border-zinc-800 p-8 sm:p-12 max-w-2xl w-full relative shadow-2xl my-8"
        >
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2 text-zinc-400 hover:text-white transition-colors"
            aria-label="Fermer"
          >
            <X size={20} />
          </button>

          <div className="flex items-center gap-3 mb-6">
            <ShieldCheck size={24} className="text-white" />
            <h3 className="text-xl font-bold text-white uppercase tracking-wider font-display">
              {isPrivacy ? 'Politique de Confidentialité' : "Conditions d'Utilisation"}
            </h3>
          </div>

          <div className="space-y-4 text-xs sm:text-sm text-zinc-300 font-light leading-relaxed max-h-[60vh] overflow-y-auto pr-2">
            {isPrivacy ? (
              <>
                <p>
                  <strong>1. Collecte des données :</strong> LVNT collecte uniquement les données personnelles transmises volontairement via notre formulaire de contact et notre système de réservation de rendez-vous (Nom, Email, Téléphone, Message).
                </p>
                <p>
                  <strong>2. Utilisation des informations :</strong> Ces données servent exclusivement à répondre à vos demandes de collaboration, d&apos;accompagnement ou d&apos;information. Elles ne sont en aucun cas cédées ni vendues à des tiers commercialement.
                </p>
                <p>
                  <strong>3. Protection & Conservation :</strong> Vos données sont conservées de manière sécurisée et conformément aux exigences du RGPD en vigueur. Vous pouvez demander leur suppression à tout moment en écrivant à contact@lvnt.com.
                </p>
              </>
            ) : (
              <>
                <p>
                  <strong>1. Propriété Intellectuelle :</strong> L&apos;ensemble des contenus présentés sur le site officiel de LVNT (logos, typographies, images, créations, textes) sont la propriété exclusive de LVNT SAS ou de ses artistes partenaires. Toute reproduction sans autorisation préalable est strictement interdite.
                </p>
                <p>
                  <strong>2. Responsabilité :</strong> LVNT s&apos;efforce de fournir des informations exactes et mises à jour. Toutefois, LVNT ne saurait être tenu responsable d&apos;éventuelles erreurs ou omissions fortuites.
                </p>
                <p>
                  <strong>3. Droit Applicable :</strong> Les présentes conditions sont régies par le droit français. Tout litige relatif à l&apos;utilisation du site sera soumis à la compétence exclusive des tribunaux de Paris.
                </p>
              </>
            )}
          </div>

          <div className="pt-6 border-t border-zinc-800 mt-6 flex justify-end">
            <button
              onClick={onClose}
              className="bg-white text-black px-6 py-2.5 text-xs font-bold uppercase tracking-wider hover:bg-zinc-200 transition-colors"
            >
              Fermer
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
