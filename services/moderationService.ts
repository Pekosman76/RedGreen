import { GoogleGenAI, Type } from "@google/genai";
import { Locale, ModerationTerm } from "../types";

// Always use the required initialization format for GoogleGenAI
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// Mock "moderation_terms" collection from Firestore
const MOCKED_BANNED_TERMS: ModerationTerm[] = [
  { term: 'cheat', locale: 'en', type: 'flag' },
  { term: 'tromper', locale: 'fr', type: 'flag' },
  { term: 'thief', locale: 'all', type: 'blocked' },
  { term: 'voleur', locale: 'all', type: 'blocked' },
  { term: 'stole', locale: 'all', type: 'blocked' }
];

export interface ModerationResult {
  isSafe: boolean;
  needsReview: boolean;
  reason?: string;
}

export const moderateText = async (text: string, locale: Locale): Promise<ModerationResult> => {
  // 1. Client-side PII checks
  const piiPatterns = [
    /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/, // Email
    /\b\d{3}[-.]?\d{3}[-.]?\d{4}\b/,   // Phone
    /\bhttps?:\/\/\S+/gi,              // URL
    /@\w+/                             // Handle
  ];

  for (const pattern of piiPatterns) {
    if (pattern.test(text)) {
      return { isSafe: false, needsReview: true, reason: "Contains personal info (email, phone, handle, or URL)." };
    }
  }

  // 2. Length validation
  if (text.length < 30) return { isSafe: false, needsReview: false, reason: "tooShort" };
  if (text.length > 180) return { isSafe: false, needsReview: false, reason: "tooLong" };

  // 3. Local Banned Terms Check
  const lowerText = text.toLowerCase();
  for (const item of MOCKED_BANNED_TERMS) {
    if (item.locale !== 'all' && item.locale !== locale) continue;
    if (lowerText.includes(item.term)) {
      if (item.type === 'blocked') {
        return { isSafe: false, needsReview: true, reason: "blocked" };
      }
      return { isSafe: true, needsReview: true, reason: "flagged" };
    }
  }

  // 4. AI Deep Moderation (Simulating Cloud Function check)
  if (process.env.API_KEY) {
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Analyze this "Red Flag / Green Flag" scenario. 
        It MUST NOT contain: real names, PII, hate speech, sexual content, minors, or accusations of crime.
        It MUST be generic.
        Scenario: "${text}"
        Return JSON { "isSafe": boolean, "needsReview": boolean, "reason": string }.`,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              isSafe: { type: Type.BOOLEAN },
              needsReview: { type: Type.BOOLEAN },
              reason: { type: Type.STRING }
            },
            required: ["isSafe", "needsReview", "reason"]
          }
        }
      });
      
      const result = JSON.parse(response.text || '{"isSafe": true, "needsReview": true, "reason": "system"}');
      return result;
    } catch (error) {
      console.error("AI Moderation Error:", error);
    }
  }

  return { isSafe: true, needsReview: false };
};