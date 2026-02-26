
const VOTE_KEY = 'rf_gf_votes';

export const getVotesFromStorage = (): Record<string, 'green' | 'red'> => {
  const data = localStorage.getItem(VOTE_KEY);
  if (!data) return {};
  try {
    const parsed = JSON.parse(data);
    return parsed;
  } catch (e) {
    return {};
  }
};

export const saveVoteToStorage = (scenarioId: string, vote: 'green' | 'red') => {
  const current = getVotesFromStorage();
  current[scenarioId] = vote;
  localStorage.setItem(VOTE_KEY, JSON.stringify(current));
};