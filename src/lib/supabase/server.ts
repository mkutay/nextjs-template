import { createServerClient } from "@supabase/ssr";
import { createClient as supaCreateClient } from "@supabase/supabase-js";
import { fromSafePromise, ok, type Result, type ResultAsync } from "neverthrow";
import { cookies } from "next/headers";
import { env } from "@/env";
import type { Database } from "./database";
import type { SBClient } from "./types";

/**
 * Create a Supabase client for use in server environments, such as Server Components,
 * API routes, or server actions.
 *
 * @returns A Supabase client instance for server usage.
 * @note Especially important if using Fluid compute: Don't put this client in a
 * global variable. Always create a new client within each function when using
 * it.
 */
export const createClient = (): ResultAsync<SBClient, never> =>
  fromSafePromise(cookies()).map((cookieStore) =>
    createServerClient<Database>(
      env.NEXT_PUBLIC_SUPABASE_URL,
      env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll();
          },
          setAll(cookiesToSet) {
            try {
              cookiesToSet.forEach(({ name, value, options }) => {
                cookieStore.set(name, value, options);
              });
            } catch {
              // The `setAll` method was called from a Server Component.
              // This can be ignored if you have proxy refreshing
              // user sessions.
            }
          },
        },
      },
    ),
  );

/**
 * Create a Supabase admin client with the secret key, which has elevated
 * privileges and should only be used in secure server-side environments.
 *
 * @returns A Supabase client with full permissions.
 */
export const createAdminClient = (): Result<SBClient, never> =>
  ok(
    supaCreateClient<Database>(
      env.NEXT_PUBLIC_APP_URL,
      env.SUPABASE_SECRET_KEY,
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false,
        },
      },
    ),
  );
