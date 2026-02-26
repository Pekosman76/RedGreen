
import { Category, Scenario } from './types';

// Updated SEED_SCENARIOS to match the Scenario interface requirements
export const SEED_SCENARIOS: Scenario[] = [
  {
    id: 's1',
    text_en: "Your date offers to pay for dinner but then asks you to Venmo them half as soon as you get home.",
    text_fr: "Votre date propose de payer le dîner mais vous demande un Lydia de la moitié dès que vous rentrez chez vous.",
    slug_en: "venmo-dinner-date",
    slug_fr: "lydia-diner-date",
    category: Category.DATING,
    createdAt: Date.now() - 1000 * 60 * 60 * 2,
    status: 'approved',
    votesGreen: 12,
    votesRed: 154,
    reportCount: 0,
    scoreHot: 166
  },
  {
    id: 's2',
    text_en: "A job recruiter calls you and tells you the salary upfront before asking any questions.",
    text_fr: "Un recruteur vous appelle et vous donne le salaire direct avant même de poser une question.",
    slug_en: "recruiter-salary-upfront",
    slug_fr: "recruteur-salaire-direct",
    category: Category.WORK,
    createdAt: Date.now() - 1000 * 60 * 60 * 5,
    status: 'approved',
    votesGreen: 450,
    votesRed: 5,
    reportCount: 0,
    scoreHot: 455
  },
  {
    id: 's3',
    text_en: "Your best friend remembers your parents' birthdays and sends them a text every year.",
    text_fr: "Votre meilleur ami se souvient de l'anniversaire de vos parents et leur envoie un SMS chaque année.",
    slug_en: "friend-parents-birthday",
    slug_fr: "ami-anniversaire-parents",
    category: Category.FRIENDS,
    createdAt: Date.now() - 1000 * 60 * 60 * 24,
    status: 'approved',
    votesGreen: 890,
    votesRed: 12,
    reportCount: 0,
    scoreHot: 902
  },
  {
    id: 's4',
    text_en: "Someone puts their phone on the table face down during a first date.",
    text_fr: "Quelqu'un pose son téléphone face contre table pendant un premier rendez-vous.",
    slug_en: "phone-face-down-date",
    slug_fr: "telephone-face-contre-table",
    category: Category.DATING,
    createdAt: Date.now() - 1000 * 60 * 60 * 1,
    status: 'approved',
    votesGreen: 340,
    votesRed: 45,
    reportCount: 0,
    scoreHot: 385
  },
  {
    id: 's5',
    text_en: "Your roommate labels their milk with a Sharpie, including the date they bought it.",
    text_fr: "Votre colocataire marque son lait au feutre, incluant la date d'achat.",
    slug_en: "roommate-labels-milk",
    slug_fr: "colocataire-marque-lait",
    category: Category.LIFESTYLE,
    createdAt: Date.now() - 1000 * 60 * 60 * 10,
    status: 'approved',
    votesGreen: 120,
    votesRed: 115,
    reportCount: 0,
    scoreHot: 235
  },
  {
    id: 's6',
    text_en: "A manager who sends 'urgent' emails at 11:30 PM on a Friday.",
    text_fr: "Un manager qui envoie des emails 'urgents' à 23h30 un vendredi soir.",
    slug_en: "friday-night-urgent-email",
    slug_fr: "email-urgent-vendredi-soir",
    category: Category.WORK,
    createdAt: Date.now() - 1000 * 60 * 60 * 48,
    status: 'approved',
    votesGreen: 8,
    votesRed: 950,
    reportCount: 1,
    scoreHot: 958
  },
  {
    id: 's7',
    text_en: "Your partner insists on having separate bank accounts but a shared spreadsheet for expenses.",
    text_fr: "Votre partenaire insiste pour avoir des comptes bancaires séparés mais un tableur partagé pour les dépenses.",
    slug_en: "separate-accounts-spreadsheet",
    slug_fr: "comptes-separes-tableur",
    category: Category.MONEY,
    createdAt: Date.now() - 1000 * 60 * 60 * 72,
    status: 'approved',
    votesGreen: 420,
    votesRed: 80,
    reportCount: 0,
    scoreHot: 500
  },
  {
    id: 's8',
    text_en: "A friend who only calls you when they are driving and has nothing else to do.",
    text_fr: "Un ami qui ne vous appelle que lorsqu'il conduit et qu'il n'a rien d'autre à faire.",
    slug_en: "friend-calls-driving",
    slug_fr: "ami-appel-conduite",
    category: Category.FRIENDS,
    createdAt: Date.now() - 1000 * 60 * 60 * 5,
    status: 'approved',
    votesGreen: 110,
    votesRed: 640,
    reportCount: 0,
    scoreHot: 750
  }
];

export const NAV_LINKS = [
  { name: 'Home', path: '/' },
  { name: 'Categories', path: '/categories' },
  { name: 'Leaderboards', path: '/leaderboards' },
  { name: 'Submit', path: '/submit' },
  { name: 'Insights', path: '/insights' },
  { name: 'FAQ', path: '/faq' },
  { name: 'About', path: '/about' }
];

export const APP_ID = 'redflag-greenflag-v1';
