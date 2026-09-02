import { createBrowserClient } from '@supabase/ssr';

const DEFAULT_SUPABASE_URL = "https://zympcihvfsxdlxuvaqtc.supabase.co";
const DEFAULT_SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp5bXBjaWh2ZnN4ZGx4dXZhcXRjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODcxNDg2NjgsImV4cCI6MjEwMjcyNDY2OH0.auKCHnM-kLlKuKxA55b45aUpo-0Kc42EXYxAxetEN5E";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || DEFAULT_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || DEFAULT_SUPABASE_ANON_KEY;

export const supabase = createBrowserClient(
  supabaseUrl,
  supabaseAnonKey
);

