import { SupabaseClient, createClient } from "@supabase/supabase-js";

let supabase: SupabaseClient | null = null;

const getSupabaseClient = async () => {
  if (!supabase) {
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    const supabaseAPIKey = import.meta.env.VITE_SUPABASE_API_KEY;
    supabase = createClient(supabaseUrl, supabaseAPIKey);
  }
  return supabase;
};

export default getSupabaseClient;
