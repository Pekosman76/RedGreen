import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.8';

export function createSupabase() {
  const config = window.REDGREEN_CONFIG || {};
  const url = typeof config.SUPABASE_URL === 'string' ? config.SUPABASE_URL.trim() : '';
  const key = typeof config.SUPABASE_ANON_KEY === 'string' ? config.SUPABASE_ANON_KEY.trim() : '';
  if (!url || !key) return null;
  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false }
  });
}

export async function fetchFlags(client) {
  const query = client
    .from('flags')
    .select('id, text, slug, type, language, votes, upvotes, downvotes, status, is_seed, created_at')
    .eq('status', 'approved')
    .order('created_at', { ascending: false })
    .limit(500);
  const { data, error } = await query;
  if (error) throw error;
  return data || [];
}

export async function insertFlag(client, payload) {
  const { data, error } = await client.from('flags').insert(payload).select('id').single();
  if (error) throw error;
  return data;
}

export async function castVote(client, flagId, voterKey, voteType) {
  const { data, error } = await client.rpc('cast_flag_vote', {
    p_flag_id: flagId,
    p_voter_key: voterKey,
    p_vote_type: voteType
  });
  if (error) throw error;
  return data;
}
