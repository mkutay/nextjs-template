import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/db";
import * as schema from "@/db/schema";

if (!process.env.GITHUB_CLIENT_ID || !process.env.GITHUB_CLIENT_SECRET) {
  throw new Error(
    "GITHUB_CLIENT_ID and GITHUB_CLIENT_SECRET environment variables are not set.",
  );
}

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema,
  }),
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    },
  },
});

export type Session = typeof auth.$Infer.Session;
