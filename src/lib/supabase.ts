
import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/types/supabase';

// Use environment variables if available, otherwise use these placeholder values
// These placeholders allow development to continue without environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://your-project-url.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key';

// Remove the error throw to prevent app from crashing
// This allows the app to load, even if the connection to Supabase will not work

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);
