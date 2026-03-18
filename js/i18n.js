export const storageKeys = {
  locale: 'redgreen_locale',
  consent: 'redgreen_cookie_consent',
  voterKey: 'redgreen_voter_key'
};

export function detectInitialLocale() {
  const saved = localStorage.getItem(storageKeys.locale);
  if (saved === 'fr' || saved === 'en') return saved;
  return navigator.language.toLowerCase().startsWith('fr') ? 'fr' : 'en';
}

export function setLocale(locale) {
  const next = locale === 'fr' ? 'fr' : 'en';
  localStorage.setItem(storageKeys.locale, next);
  return next;
}

export function getVoterKey() {
  const existing = localStorage.getItem(storageKeys.voterKey);
  if (existing) return existing;
  const created = crypto.randomUUID();
  localStorage.setItem(storageKeys.voterKey, created);
  return created;
}

export const uiText = {
  en: {
    brand: 'RedGreen Flags', navHome: 'Home', navAbout: 'About', navGreen: 'What is a green flag?', navRed: 'What is a red flag?', navExamples: 'Examples', navFaq: 'FAQ', navPrivacy: 'Privacy', navContact: 'Contact',
    heroKicker: 'Community-powered relationship culture',
    heroTitle: 'The bilingual home for green flags, red flags, and shareable dating takes.',
    heroBody: 'RedGreen Flags is a static, GitHub Pages compatible website where the community submits short relationship observations, votes on them publicly, and browses the most relatable green flags and red flags in English and French.',
    heroPoints: ['Static frontend ready for GitHub Pages.', 'Persistent public content stored in Supabase.', 'Voting, moderation, language filtering, and long-form educational content in one polished experience.'],
    ctaPrimary: 'Jump to rankings', ctaSecondary: 'Add a flag', browseTitle: 'Browse public flags', searchPlaceholder: 'Search flags, themes, or wording', topGreen: 'Top green flags', topRed: 'Top red flags', trendingFlags: 'Trending flags', latestFlags: 'Latest submissions', addFlag: 'Add a new flag', addBody: 'Write one concise observation. Keep it respectful, public-friendly, and under 140 characters.',
    fieldText: 'Flag text', fieldType: 'Type', fieldLanguage: 'Language', typeGreen: 'Green flag', typeRed: 'Red flag', langAuto: 'Auto detect', langEn: 'English', langFr: 'Français', submit: 'Submit flag', submitHint: 'Community submissions are public. Do not include names, phone numbers, handles, or private details.',
    filterAll: 'All', sortTop: 'Top', sortNew: 'New', sortTrending: 'Trending', filterLanguageAll: 'All languages', random: 'Random flag', copy: 'Copy', share: 'Share', voteUp: 'Upvote', voteDown: 'Downvote', score: 'Score', upvotes: 'Upvotes', downvotes: 'Downvotes', loading: 'Loading community flags…', empty: 'No public flags match these filters yet.', loadMore: 'Load more', endReached: 'You reached the end of the current results.',
    cookieBody: 'We use local storage for language choice, vote protection, and cookie preference. Optional privacy-friendly analytics can also respect your choice.', cookieAccept: 'Accept', cookieRefuse: 'Refuse',
    entertainment: 'Entertainment & information only. This website is not psychological, therapy, or legal advice.', moderation: 'Community content is moderated, but moderation may not be perfect. Use common sense and critical thinking.', footerBlurb: 'RedGreen Flags collects community opinions about relationship behavior. User submissions do not represent universal truth.',
    topSection: 'Top picks', recentSection: 'Fresh from the community', trendingSection: 'What is getting attention now',
    successSubmit: 'Your flag is now public and available in the community feed.', blockedSubmit: 'Your submission was blocked because it contains abusive, hateful, or explicit wording.', duplicateSubmit: 'A very similar flag already exists.', shortError: 'Please write at least 8 characters.', longError: 'Please keep your flag at 140 characters or less.', configWarning: 'Supabase is not configured yet. The website stays fully browsable, but submissions and voting need your project URL and anon key.', genericError: 'Something went wrong. Please try again.', voteSaved: 'Your vote was saved.', voteChanged: 'Your vote was updated.', copySaved: 'Flag text copied.', shareSaved: 'Link copied to your clipboard.',
    statusLive: 'Live sync', statusFallback: 'Auto refresh', statsFlags: 'public flags', statsVotes: 'total votes', statsToday: 'new today', legalTitle: 'Legal and privacy pages', legalBody: 'Review the privacy policy, contact details, FAQs, and educational guides linked in the footer and navigation.',
    pageHomeTitle: 'Home', pageAboutTitle: 'About RedGreen Flags', pagePrivacyTitle: 'Privacy Policy', pageContactTitle: 'Contact', pageGreenTitle: 'What is a Green Flag?', pageRedTitle: 'What is a Red Flag?', pageGreenExamplesTitle: 'Green Flag Examples', pageRedExamplesTitle: 'Red Flag Examples', pageFaqTitle: 'FAQ'
  },
  fr: {
    brand: 'RedGreen Flags', navHome: 'Accueil', navAbout: 'À propos', navGreen: 'Qu’est-ce qu’un green flag ?', navRed: 'Qu’est-ce qu’un red flag ?', navExamples: 'Exemples', navFaq: 'FAQ', navPrivacy: 'Confidentialité', navContact: 'Contact',
    heroKicker: 'Culture relationnelle portée par la communauté',
    heroTitle: 'La plateforme bilingue pour les green flags, les red flags et les phrases relationnelles qui se partagent.',
    heroBody: 'RedGreen Flags est un site statique compatible GitHub Pages où la communauté publie de courtes observations relationnelles, vote publiquement et découvre les green flags et red flags les plus parlants en français et en anglais.',
    heroPoints: ['Frontend statique prêt pour GitHub Pages.', 'Contenu public persistant dans Supabase.', 'Votes, modération, filtrage linguistique et contenus éditoriaux dans une expérience soignée.'],
    ctaPrimary: 'Voir les classements', ctaSecondary: 'Ajouter un flag', browseTitle: 'Parcourir les flags publics', searchPlaceholder: 'Rechercher un flag, un thème ou une formulation', topGreen: 'Top green flags', topRed: 'Top red flags', trendingFlags: 'Flags tendance', latestFlags: 'Dernières contributions', addFlag: 'Ajouter un nouveau flag', addBody: 'Écrivez une observation claire et courte. Gardez-la respectueuse, publique et sous 140 caractères.',
    fieldText: 'Texte du flag', fieldType: 'Type', fieldLanguage: 'Langue', typeGreen: 'Green flag', typeRed: 'Red flag', langAuto: 'Détection auto', langEn: 'English', langFr: 'Français', submit: 'Publier le flag', submitHint: 'Les contributions sont publiques. N’ajoutez ni noms, ni numéros, ni pseudos, ni données privées.',
    filterAll: 'Tous', sortTop: 'Top', sortNew: 'Nouveaux', sortTrending: 'Tendance', filterLanguageAll: 'Toutes langues', random: 'Flag aléatoire', copy: 'Copier', share: 'Partager', voteUp: 'Vote +', voteDown: 'Vote -', score: 'Score', upvotes: 'Votes positifs', downvotes: 'Votes négatifs', loading: 'Chargement des flags…', empty: 'Aucun flag public ne correspond à ces filtres pour le moment.', loadMore: 'Afficher plus', endReached: 'Vous avez atteint la fin des résultats.',
    cookieBody: 'Nous utilisons le stockage local pour la langue, la protection anti-spam du vote et la préférence de cookies. Les analyses optionnelles respectent aussi votre choix.', cookieAccept: 'Accepter', cookieRefuse: 'Refuser',
    entertainment: 'Divertissement et information uniquement. Ce site ne remplace pas un avis psychologique, thérapeutique ou juridique.', moderation: 'Le contenu de la communauté est modéré, mais la modération n’est pas parfaite. Gardez votre esprit critique.', footerBlurb: 'RedGreen Flags rassemble des opinions communautaires sur les comportements relationnels. Les contributions ne représentent pas une vérité universelle.',
    topSection: 'Les mieux classés', recentSection: 'Tout juste publiés', trendingSection: 'Ce qui attire l’attention maintenant',
    successSubmit: 'Votre flag est maintenant public et visible dans le flux communautaire.', blockedSubmit: 'Votre contribution a été bloquée car elle contient un langage abusif, haineux ou explicite.', duplicateSubmit: 'Un flag très proche existe déjà.', shortError: 'Merci d’écrire au moins 8 caractères.', longError: 'Merci de rester à 140 caractères maximum.', configWarning: 'Supabase n’est pas encore configuré. Le site reste consultable, mais les votes et contributions nécessitent votre URL de projet et la clé anon.', genericError: 'Une erreur est survenue. Merci de réessayer.', voteSaved: 'Votre vote a été enregistré.', voteChanged: 'Votre vote a été mis à jour.', copySaved: 'Texte copié.', shareSaved: 'Lien copié dans le presse-papiers.',
    statusLive: 'Synchronisation live', statusFallback: 'Rafraîchissement auto', statsFlags: 'flags publics', statsVotes: 'votes totaux', statsToday: 'nouveaux aujourd’hui', legalTitle: 'Pages légales et confidentialité', legalBody: 'Consultez la politique de confidentialité, la page contact, la FAQ et les guides éditoriaux depuis le pied de page et la navigation.',
    pageHomeTitle: 'Accueil', pageAboutTitle: 'À propos de RedGreen Flags', pagePrivacyTitle: 'Politique de confidentialité', pageContactTitle: 'Contact', pageGreenTitle: 'Qu’est-ce qu’un Green Flag ?', pageRedTitle: 'Qu’est-ce qu’un Red Flag ?', pageGreenExamplesTitle: 'Exemples de Green Flags', pageRedExamplesTitle: 'Exemples de Red Flags', pageFaqTitle: 'FAQ'
  }
};
