
export enum Category {
  DATING = 'dating',
  MONEY = 'money',
  WORK = 'work',
  LIFESTYLE = 'lifestyle',
  FRIENDS = 'friends',
  FAMILY = 'family',
  AMBITION = 'ambition',
  PRODUCTIVITY = 'productivity',
  SOCIAL = 'social',
  HUMOR = 'humor'
}

export type ScenarioStatus = 'approved' | 'pending' | 'rejected';

export interface Scenario {
  id: string;
  text_en: string;
  text_fr: string;
  slug_en: string;
  slug_fr: string;
  category: Category;
  createdAt: number;
  status: ScenarioStatus;
  votesGreen: number;
  votesRed: number;
  reportCount: number;
  scoreHot: number;
  createdBy?: string;
  needsReview?: boolean;
}

export type VoteType = 'green' | 'red';
export type Locale = 'en' | 'fr';

export enum TimeFrame {
  TODAY = 'today',
  WEEK = 'week',
  MONTH = 'month',
  ALL = 'all'
}

export interface ModerationTerm {
  term: string;
  locale: 'en' | 'fr' | 'all';
  type: 'blocked' | 'flag';
}
