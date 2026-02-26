
import { Category, Scenario } from './types';

export const generateSeed = (): Scenario[] => {
  const baseData = [
    {
      en: "Your date offers to pay for dinner but then asks you to Venmo them half as soon as you get home.",
      fr: "Votre date propose de payer le dîner mais vous demande un Lydia de la moitié dès que vous rentrez chez vous.",
      cat: Category.DATING
    },
    {
      en: "A job recruiter calls you and tells you the salary upfront before asking any questions.",
      fr: "Un recruteur vous appelle et vous donne le salaire direct avant même de poser une question.",
      cat: Category.WORK
    },
    {
      en: "Your best friend remembers your parents' birthdays and sends them a text every year.",
      fr: "Votre meilleur ami se souvient de l'anniversaire de vos parents et leur envoie un SMS chaque année.",
      cat: Category.FRIENDS
    },
    {
      en: "Someone puts their phone on the table face down during a first date.",
      fr: "Quelqu'un pose son téléphone face contre table pendant un premier rendez-vous.",
      cat: Category.DATING
    },
    {
      en: "A partner who insists on knowing your phone passcode 'just in case of emergency'.",
      fr: "Un partenaire qui insiste pour connaître votre code de téléphone 'juste en cas d'urgence'.",
      cat: Category.DATING
    },
    {
      en: "Your roommate labels their milk with a Sharpie, including the date they bought it.",
      fr: "Votre colocataire marque son lait au feutre, incluant la date d'achat.",
      cat: Category.LIFESTYLE
    },
    {
      en: "A manager who sends 'urgent' emails at 11:30 PM on a Friday.",
      fr: "Un manager qui envoie des emails 'urgents' à 23h30 un vendredi soir.",
      cat: Category.WORK
    },
    {
      en: "Sharing a Netflix account with an ex because 'neither of us wants to lose the algorithm recommendations'.",
      fr: "Partager un compte Netflix avec son ex parce que 'personne ne veut perdre ses recommandations'.",
      cat: Category.SOCIAL
    },
    {
      en: "Your parents show up at your apartment unannounced with groceries they think you need.",
      fr: "Vos parents débarquent chez vous sans prévenir avec des courses qu'ils pensent nécessaires.",
      cat: Category.FAMILY
    },
    {
      en: "A friend who only Venmos you exactly to the cent for shared dinner appetizers.",
      fr: "Un ami qui vous rembourse au centime près pour des tapas partagées au dîner.",
      cat: Category.MONEY
    }
  ];

  const categories = Object.values(Category);
  const scenarios: Scenario[] = [];
  
  // Distribute across all categories
  for (let i = 0; i < 800; i++) {
    const template = baseData[i % baseData.length];
    const category = categories[i % categories.length];
    const id = `scenario-${i}`;
    scenarios.push({
      id,
      text_en: template.en,
      text_fr: template.fr,
      slug_en: `scenario-${i}-en`,
      slug_fr: `scenario-${i}-fr`,
      category: category,
      createdAt: Date.now() - (i * 1000 * 60 * 60),
      status: 'approved',
      votesGreen: Math.floor(Math.random() * 500),
      votesRed: Math.floor(Math.random() * 500),
      reportCount: 0,
      scoreHot: Math.floor(Math.random() * 1000)
    });
  }
  
  return scenarios;
};
