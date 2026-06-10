# Nexlayer — aura-carshare

<!-- nexlayer:meta version=1 analyzed=2026-06-10T17:09:39Z repo=https://github.com/FrankHonore/aura-carshare branch=main -->

> **For AI agents (Claude Code, Cursor, Gemini CLI, Copilot):**
> This file is the **project context** for this Nexlayer deployment — tech stack, env vars, secrets, live URL.
> For full platform detail (nexlayer.yaml schema, Dockerfile rules, CI/CD, task recipes) read **`nexlayer.skills`** in this repo.
>
> **Critical rules (full detail in `nexlayer.skills`):**
> - Inter-pod refs: `${podName:port}` only — never `localhost` or bare hostnames
> - Docker Hub images: prefix with `mirror.gcr.io/library/` — bare tags fail on the cluster
> - Secrets: set in the Nexlayer dashboard — never commit to `nexlayer.yaml` or Dockerfile
>
> **This file:** `agent-managed` sections update automatically. `user-editable` sections (Local Development Setup, Nexlayer Deployment Plan, Build Notes) are yours — preserved across re-analysis.

## Project Summary
<!-- nexlayer:section agent-managed=project_summary -->
Aura is a modern car-sharing platform similar to Turo, connecting car owners with renters. It features car listings, booking management, user profiles, and secure authentication.
<!-- nexlayer:end -->

## Technology Stack
<!-- nexlayer:section agent-managed=tech_stack -->
| Name | Kind | Version | Detected From |
|------|------|---------|---------------|
| Next.js | framework | 16.1.6 | package.json |
| TypeScript | language | 5 | package.json |
| PostgreSQL | database | 15 | docker-compose.yml |
| Prisma | tool | 7.3.0 | package.json |
| NextAuth.js | framework | 4.24.11 | package.json |
| Tailwind CSS | framework | 4 | package.json |
<!-- nexlayer:end -->

## Repository Structure
<!-- nexlayer:section agent-managed=structure_map -->
- src/app/ — Next.js 15 App Router (Pages and API Routes)
- src/components/ — Reusable React UI components
- src/lib/ — Utility functions and configuration
- src/types/ — TypeScript type definitions
- prisma/ — Database schema and migrations
<!-- nexlayer:end -->

## External Services Required
<!-- nexlayer:section agent-managed=external_deps -->
_No external services detected._
<!-- nexlayer:end -->

## Local Development Setup
<!-- nexlayer:section user-editable=local_setup -->
### Prerequisites

- Node.js >= 18
- npm

### Environment variables

Copy `.env.example` to `.env.local` and fill in:

```
DATABASE_URL=postgresql://username:password@localhost:5432/aura_carshare
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here
```

### Steps

1. `npm install` — Install project dependencies
2. `npx prisma generate` — Generate Prisma client
3. `npm run dev` — Start Next.js development server on http://localhost:3000

<!-- nexlayer:end -->

## Nexlayer Setup
<!-- nexlayer:section agent-managed=nexlayer_setup -->
### Pod Environment Variables

| Pod | Variable | Value | Kind |
|-----|----------|-------|------|
| `"app"` | `NODE_ENV` | `production` | plain |
| `"app"` | `PORT` | `"3000"` | plain |
| `"app"` | `DATABASE_URL` | `postgresql://postgres:carshare2024@database.pod:5432/aura_carshare` | plain |
| `"app"` | `NEXTAUTH_URL` | _(set via Nexlayer dashboard)_ | secret |
| `"app"` | `NEXTAUTH_SECRET` | _(set via Nexlayer dashboard)_ | secret |
| `database` | `POSTGRES_USER` | `postgres` | plain |
| `database` | `POSTGRES_PASSWORD` | _(set via Nexlayer dashboard)_ | secret |
| `database` | `POSTGRES_DB` | `aura_carshare` | plain |
| `database` | `PGDATA` | `/var/lib/postgresql/data/pgdata` | plain |
| `postgres-data` | `size` | `2Gi` | plain |
| `postgres-data` | `mountPath` | `/var/lib/postgresql` | plain |

### Secrets Required

Set these in the Nexlayer dashboard before deploying:

- `NEXTAUTH_URL` (`"app"` pod)
- `NEXTAUTH_SECRET` (`"app"` pod)
- `POSTGRES_PASSWORD` (`database` pod)

### nexlayer.yaml

```yaml
application:
  name: aura-carshare
  pods:
    - name: "app"
      image: "registry.nexlayer.io/nexlayer-mcp/frank/aura-carshare:1770580373"
      path: "/"
      servicePorts: [3000]
      vars:
        NODE_ENV: production
        PORT: "3000"
        DATABASE_URL: postgresql://postgres:carshare2024@database.pod:5432/aura_carshare
        NEXTAUTH_URL: <% URL %>
        NEXTAUTH_SECRET: nexlayer-secret-2024-production
    - name: database
      image: postgres:14
      servicePorts:
        - 5432
      vars:
        POSTGRES_USER: postgres
        POSTGRES_PASSWORD: carshare2024
        POSTGRES_DB: aura_carshare
        PGDATA: /var/lib/postgresql/data/pgdata
      volumes:
        - name: postgres-data
          size: 2Gi
          mountPath: /var/lib/postgresql
```

<!-- nexlayer:end -->

## Nexlayer Deployment Plan
<!-- nexlayer:section user-editable=deployment_plan -->
### Pod Topology

| Pod | Image | Port | Role |
|-----|-------|------|------|
| aura-app | mirror.gcr.io/library/node:22-alpine | 3000 | web |
| aura-db | mirror.gcr.io/library/postgres:15-alpine | 5432 | database |

### Inter-pod environment variables

- `aura-app` pod: `DATABASE_URL=postgresql://postgres:password@${aura-db:5432}/aura_carshare`

### Deployment notes

- The application pod uses ${aura-db:5432} for database connectivity.
- The Dockerfile performs a 'prisma db push' on startup to synchronize the schema.
- Official mirror images are used for Node and Postgres to comply with platform rules.

<!-- nexlayer:end -->

## Build Notes
<!-- nexlayer:section user-editable=build_notes -->
<!-- Add notes for future builds here — preserved across re-analysis -->
<!-- nexlayer:end -->

## Nexlayer Configuration
<!-- nexlayer:section agent-managed=nexlayer_config -->
**Last deployed:** 2026-06-10T17:10:49Z  
**Live URL:** https://bold-butterfly-aura-carshare.cloud.nexlayer.ai  
**Runtime:**  · **Port:** auto-detected  
**Deploy branch:** main  

```yaml
application:
  name: aura-carshare
  pods:
    - name: "app"
      image: "registry.nexlayer.io/nexlayer-mcp/frank/aura-carshare:1770580373"
      path: "/"
      servicePorts: [3000]
      vars:
        NODE_ENV: production
        PORT: "3000"
        DATABASE_URL: postgresql://postgres:carshare2024@database.pod:5432/aura_carshare
        NEXTAUTH_URL: <% URL %>
        NEXTAUTH_SECRET: nexlayer-secret-2024-production
    - name: database
      image: postgres:14
      servicePorts:
        - 5432
      vars:
        POSTGRES_USER: postgres
        POSTGRES_PASSWORD: carshare2024
        POSTGRES_DB: aura_carshare
        PGDATA: /var/lib/postgresql/data/pgdata
      volumes:
        - name: postgres-data
          size: 2Gi
          mountPath: /var/lib/postgresql
```
<!-- nexlayer:end -->

## Build History
<!-- nexlayer:section agent-managed=build_history -->
| Date | Status | Notes |
|------|--------|-------|
| 2026-06-10T17:09:39Z | analyzed | initial repo analysis |
| 2026-06-10T17:10:49Z | success | deployed https://bold-butterfly-aura-carshare.cloud.nexlayer.ai |
<!-- nexlayer:end -->
