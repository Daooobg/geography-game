import { createClient } from '@supabase/supabase-js';

// Създаваме singleton инстанция
let supabaseInstance = null;

/**
 * Връща съществуващата инстанция на Supabase или създава нова
 */
export function getSupabaseClient() {
  if (supabaseInstance) return supabaseInstance;
  
  supabaseInstance = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || '',
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '',
    {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true
      }
    }
  );
  
  return supabaseInstance;
}

// За съвместимост със стария код
export const supabase = getSupabaseClient(); 