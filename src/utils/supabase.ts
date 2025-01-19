import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseKey);

// Add error handling for fetch failures
supabase.handleError = (error: any) => {
  console.error('Supabase error:', error);
  if (error.message === 'Failed to fetch') {
    return new Error('Network error: Please check your connection');
  }
  return error;
};