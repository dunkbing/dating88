import { createClient } from 'supabase';
import { SUPABASE_ANON_KEY, SUPABASE_URL } from '@/utils/config.ts';

export const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
