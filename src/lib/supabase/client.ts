import { createBrowserClient } from "@supabase/ssr";
import { ok, type Result } from "neverthrow";
import { env } from "@/env";
import type { Database } from "./database";
import type { SBClient } from "./types";

/**
 * Create a Supabase client for use in browser environments, such as React components.
 *
 * @returns A Supabase client instance for browser usage.
 */
export const createClient = (): Result<SBClient, never> =>
  ok(
    createBrowserClient<Database>(
      env.NEXT_PUBLIC_SUPABASE_URL,
      env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
    ),
  );
