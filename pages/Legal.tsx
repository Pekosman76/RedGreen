
import React from 'react';
import { useParams } from 'react-router-dom';

interface LegalProps {
  pageOverride?: string;
}

const Legal: React.FC<LegalProps> = ({ pageOverride }) => {
  const { page } = useParams();
  const currentPage = pageOverride || page;

  const renderContent = () => {
    switch(currentPage) {
      case 'privacy':
        return (
          <div className="prose dark:prose-invert max-w-none">
            <h1>Politique de Confidentialité (RGPD)</h1>
            <p>Dernière mise à jour : 20 mai 2024</p>
            <h2>1. Introduction</h2>
            <p>RedFlag / GreenFlag s'engage à protéger votre vie privée conformément au Règlement Général sur la Protection des Données (RGPD).</p>
            <h2>2. Données Collectées</h2>
            <p>Nous ne collectons aucune donnée personnelle identifiable (PII) par défaut. Nous utilisons :</p>
            <ul>
              <li><strong>Local Storage :</strong> Pour stocker vos votes et éviter les doublons.</li>
              <li><strong>Analytics :</strong> Données anonymes sur l'utilisation du site pour améliorer l'expérience.</li>
            </ul>
            <h2>3. Vos Droits</h2>
            <p>Vous avez le droit d'accéder, de rectifier ou de demander la suppression de toute donnée vous concernant. Contactez-nous à support@rf-gf.com.</p>
          </div>
        );
      case 'terms':
        return (
          <div className="prose dark:prose-invert max-w-none">
            <h1>Conditions d'Utilisation (CGU)</h1>
            <h2>1. Acceptation</h2>
            <p>En utilisant ce site, vous acceptez nos conditions de service. Le site est destiné à un usage ludique et social uniquement.</p>
            <h2>2. Contenu Utilisateur</h2>
            <p>Vous êtes responsable des scénarios que vous soumettez. Il est interdit de soumettre du contenu diffamatoire, haineux, sexuel ou impliquant des mineurs.</p>
            <h2>3. Limitation de Responsabilité</h2>
            <p>Les scénarios sont fictifs et génériques. Nous déclinons toute responsabilité quant à l'interprétation des votes dans la vie réelle.</p>
          </div>
        );
      case 'notice':
        return (
          <div className="prose dark:prose-invert max-w-none">
            <h1>Mentions Légales</h1>
            <p><strong>Éditeur :</strong> RF/GF Media SAS, Paris, France.</p>
            <p><strong>Hébergement :</strong> Firebase (Google Cloud Platform).</p>
            <p><strong>Contact :</strong> hello@rf-gf.com</p>
          </div>
        );
      case 'moderation':
        return (
          <div className="prose dark:prose-invert max-w-none">
            <h1>Politique de Modération</h1>
            <p>Chaque scénario est filtré par nos algorithmes IA avant d'être revu par un humain.</p>
            <ul>
              <li><strong>Interdit :</strong> Noms réels, coordonnées, insultes, mineurs, contenu sexuel.</li>
              <li><strong>Obligatoire :</strong> Format générique ("Un ami...", "Votre partenaire...").</li>
            </ul>
          </div>
        );
      case 'cookies':
        return (
          <div className="prose dark:prose-invert max-w-none">
            <h1>Politique relative aux Cookies</h1>
            <p>Nous utilisons des cookies essentiels pour le fonctionnement du site et des cookies analytiques tiers.</p>
          </div>
        );
      default:
        return <p>Page non trouvée.</p>;
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-16 bg-white dark:bg-gray-800 rounded-3xl my-8 shadow-xl">
      {renderContent()}
    </div>
  );
};

export default Legal;
