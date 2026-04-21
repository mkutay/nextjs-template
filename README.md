# nextjs-template

A Next.js template that is generic enough to be used for any project, with a batteries-included stack:

- **Framework**: Next.js 16 (App Router, Turbopack)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4, shadcn/ui
- **Auth**: Better Auth (email + password, GitHub OAuth)
- **Database**: Drizzle ORM + PostgreSQL
- **Error handling**: neverthrow
- **Linting / Formatting**: Biome
- **Testing**: Vitest (unit), Playwright (e2e)
- **Runtime**: Bun

---

## Getting started

### 1. Install dependencies

```bash
bun install
```

### 2. Configure environment variables

Copy the example file and fill in your values:

```bash
cp .env.example .env.development
```

| Variable               | Description                                           |
| ---------------------- | ----------------------------------------------------- |
| `DATABASE_URL`         | PostgreSQL connection string                          |
| `BETTER_AUTH_SECRET`   | Random secret for signing sessions                    |
| `BETTER_AUTH_URL`      | Base URL of the app (e.g. `http://localhost:3000`)    |
| `GITHUB_CLIENT_ID`     | GitHub OAuth app client ID                            |
| `GITHUB_CLIENT_SECRET` | GitHub OAuth app client secret                        |
| `NEXT_PUBLIC_APP_URL`  | Public base URL (used by the client-side auth helper) |

Create a GitHub OAuth app at <https://github.com/settings/developers>.  
Set the callback URL to `http://localhost:3000/api/auth/callback/github`.

### 3. Start the local database

```bash
docker compose up -d
```

This starts a PostgreSQL 17 container on `localhost:5432` with:

- **User**: `postgres`
- **Password**: `postgres`
- **Database**: `mydb`

Data is persisted in a named Docker volume (`postgres_data`).

### 4. Run database migrations

```bash
bun db:push        # push schema directly (quick for local dev)
# or
bun db:generate    # generate SQL migration files
bun db:migrate     # apply them
```

### 5. Start the dev server

```bash
bun run dev
```

---

## Docker (production build)

A multi-stage Dockerfile is included. It uses Bun to install deps and build the app, then copies only the standalone output into a minimal runner image.

```bash
# Build the image
docker build -t next-app .

# Run the container (pass env vars at runtime — never bake secrets into images)
docker run -p 3000:3000 \
  -e DATABASE_URL=postgres://... \
  -e BETTER_AUTH_SECRET=... \
  -e BETTER_AUTH_URL=https://yourapp.com \
  -e GITHUB_CLIENT_ID=... \
  -e GITHUB_CLIENT_SECRET=... \
  -e NEXT_PUBLIC_APP_URL=https://yourapp.com \
  next-app
```

---

## Scripts

| Command                 | Description                      |
| ----------------------- | -------------------------------- |
| `bun run dev`           | Start dev server (Turbopack)     |
| `bun run build`         | Production build                 |
| `bun run start`         | Start production server          |
| `bun run typecheck`     | TypeScript type-check            |
| `bun run check`         | Biome lint + format              |
| `bun run test`          | Vitest unit tests                |
| `bun run test:watch`    | Vitest in watch mode             |
| `bun run test:coverage` | Vitest with coverage             |
| `bun run e2e`           | Playwright end-to-end tests      |
| `bun run e2e:ui`        | Playwright UI mode               |
| `bun db:generate`       | Generate Drizzle migration files |
| `bun db:migrate`        | Apply migrations                 |
| `bun db:push`           | Push schema directly (dev)       |
| `bun db:studio`         | Open Drizzle Studio              |

---

## Add shadcn/ui components

```bash
bunx shadcn@latest add button
```
