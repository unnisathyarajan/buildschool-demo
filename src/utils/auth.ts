import { supabase } from './supabase';

export async function createProfile(userId: string, data: { full_name?: string; linkedin_url?: string }) {
  try {
    const { error } = await supabase
      .from('profiles')
      .insert([{ user_id: userId, ...data }]);

    if (error) throw error;
  } catch (error) {
    console.error('Error creating profile:', error);
    throw error;
  }
}