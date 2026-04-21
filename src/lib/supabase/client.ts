/** biome-ignore-all lint/style/noNonNullAssertion: supabase */
import { createBrowserClient } from "@supabase/ssr";
import { ok } from "neverthrow";
import type { Database } from "./types";

export const createClient = () =>
  ok(
    createBrowserClient<Database>(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_ANON_KEY!,
    ),
  );
