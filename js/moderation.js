const bannedTerms = {
  en: [
    'fuck', 'fucking', 'bitch', 'slut', 'whore', 'asshole', 'motherfucker', 'cunt', 'dick', 'cock', 'pussy', 'cum', 'porn', 'porno', 'nude', 'nudes', 'rape', 'rapist', 'incest', 'blowjob', 'handjob', 'anal', 'xxx',
    'nigger', 'faggot', 'retard', 'tranny', 'spic', 'kike', 'chink', 'coon', 'twat', 'bastard'
  ],
  fr: [
    'pute', 'salope', 'connard', 'connasse', 'encule', 'enculé', 'enculee', 'enculée', 'bite', 'chatte', 'nique', 'niquer', 'viol', 'violeur', 'sexe', 'baise', 'baiser', 'branlette', 'fellation', 'porno', 'porn',
    'pd', 'tafiole', 'sale arabe', 'sale noir', 'sale juif', 'bougnoule', 'tarlouze'
  ]
};

const bannedPatterns = [
  /\b(fuck|shit|bitch|slut|whore|asshole|motherfucker|dick|cock|pussy|cum|porn|nude|rape|anal|blowjob|handjob)\b/i,
  /\b(pute|salope|connard|connasse|encule|bite|chatte|nique|niquer|viol|violeur|branlette|fellation|porno|sexe)\b/i,
  /\b(nigger|faggot|retard|tranny|spic|kike|chink|coon|bougnoule|tafiole|tarlouze)\b/i
];

export function normalizeText(value) {
  return String(value)
    .toLowerCase()
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .replace(/[^a-z0-9\s'-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export function containsBlockedContent(value) {
  const normalized = ` ${normalizeText(value)} `;
  const termHit = Object.values(bannedTerms).flat().some((term) => normalized.includes(` ${normalizeText(term)} `));
  const patternHit = bannedPatterns.some((pattern) => pattern.test(normalized));
  return termHit || patternHit;
}

export { bannedTerms, bannedPatterns };
