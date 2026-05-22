# nextjs-template

A Next.js template that is generic enough to be used for any project, but also has some nice features like:

- TS
- biome
- vitest
- playwright
- tailwind
- shadcn
- neverthrow
- bun

## Add components

```bash
bunx shadcn@latest add button
```

## Testing

```bash
bun run test # for unit tests
bun run e2e # for end-to-end tests
```

See `package.json` for more scripts.

## Environments

The following environment file needs to be copied into `.env.test`, `.env.production`, and `.env.development`:

```bash
NEXT_PUBLIC_SUPABASE_URL=http://localhost:54321
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your-publishable-key
SUPABASE_SECRET_KEY=your-secret-key

NEXT_PUBLIC_APP_URL=http://localhost:3000
```
