import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

const fallbackAuth = {
  getSession: async () => ({ data: { session: null }, error: null }),
  signOut: async () => ({ data: null, error: null }),
  signInWithPassword: async () => ({ data: { session: null, user: null }, error: new Error("Missing Supabase env") }),
  signUp: async () => ({ data: { session: null, user: null }, error: new Error("Missing Supabase env") }),
  onAuthStateChange: () => ({ subscription: { unsubscribe: () => undefined } }),
};

export const supabase =
  supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey)
    : ({ auth: fallbackAuth } as any);
