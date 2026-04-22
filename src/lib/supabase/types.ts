import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "./database";

/**
 * A type alias for the Supabase client, parameterised with the application's
 * database schema.
 */
export type SBClient = SupabaseClient<Database>;
