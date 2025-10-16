# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Aura is a car-sharing platform built with Next.js 15 (App Router), similar to Turo. It connects car owners with renters in local communities. The stack includes Next.js, React 19, TypeScript, Tailwind CSS 4, Prisma ORM with PostgreSQL, and NextAuth.js for authentication.

## Development Commands

```bash
# Start development server (uses Turbopack)
npm run dev

# Build for production (uses Turbopack)
npm run build

# Start production server
npm start

# Run linting
npm run lint

# Prisma commands
npx prisma studio              # Open database GUI browser
npx prisma migrate dev         # Create and apply new migrations
npx prisma migrate deploy      # Apply migrations (production)
npx prisma generate            # Regenerate Prisma Client after schema changes
npx prisma db push             # Sync schema without migrations (dev only)

# Docker commands
docker-compose up --build      # Run app with PostgreSQL in containers
```

## Architecture & Key Patterns

### Database Models (Prisma)

The schema in `prisma/schema.prisma` defines the core domain:

- **User**: Accounts with both credentials and OAuth support. Users can be both car owners and renters.
- **Account/Session**: NextAuth.js authentication tables for managing sessions and OAuth providers.
- **Car**: Vehicle listings with make/model, pricing, location, features (array), images (array), and availability.
- **Booking**: Rental reservations with status enum (PENDING, CONFIRMED, ACTIVE, COMPLETED, CANCELLED).
- **Review**: Ratings and comments linked to bookings, with dual relationships (author gives review, recipient receives review).

Key relationships:
- Users own multiple Cars (one-to-many)
- Users make multiple Bookings (one-to-many)
- Cars have multiple Bookings (one-to-many)
- Bookings have one optional Review (one-to-one)
- Reviews connect author (renter), recipient (owner), car, and booking

### Authentication (NextAuth.js)

Configuration in `src/lib/auth.ts`:
- Supports both credentials (email/password with bcrypt) and Google OAuth
- Uses JWT session strategy (not database sessions)
- Custom pages at `/auth/signin` and `/auth/signup`
- User ID is added to session via JWT callback
- PrismaAdapter handles OAuth account linking

Type augmentation in `src/types/next-auth.d.ts` adds `id` to session user.

### API Routes

Follow Next.js 15 App Router conventions in `src/app/api/`:
- Use `route.ts` files with named HTTP method exports (GET, POST, etc.)
- Import `prisma` from `@/lib/prisma` (singleton pattern prevents hot-reload issues)
- Example pattern in `src/app/api/register/route.ts`: validate input, check existing records, hash passwords, create records, return JSON with proper status codes

### Component Structure

Components in `src/components/`:
- `header.tsx`: Navigation with auth state
- `car-card.tsx`: Car listing card display
- `search-filters.tsx`: Filter UI for car search
- `booking-form.tsx`: Date selection and booking creation
- `booking-card.tsx`: Booking display with status
- `providers.tsx`: Wraps NextAuth SessionProvider

### Path Aliases

TypeScript paths configured in `tsconfig.json`:
- `@/*` maps to `src/*`
- Use `@/lib/prisma`, `@/components/header`, etc. for imports

### Styling

Tailwind CSS 4 with inline theme configuration in `src/app/globals.css`:
- Uses `@import "tailwindcss"` (v4 pattern)
- Custom CSS variables for colors via `@theme inline`
- Dark mode support via `prefers-color-scheme`

## Environment Variables

Required in `.env.local`:

```bash
DATABASE_URL="postgresql://username:password@localhost:5432/aura_carshare"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="generate-with-openssl-rand-base64-32"
GOOGLE_CLIENT_ID="optional-for-google-oauth"
GOOGLE_CLIENT_SECRET="optional-for-google-oauth"
```

## Important Configuration Notes

### Next.js Config (`next.config.js`)

- Output mode: `standalone` (optimized for Docker/serverless)
- Image domains: Allows multiple placeholder services and unsplash
- Remote patterns: Permissive (any HTTPS/HTTP domain) for flexibility
- **Build errors ignored**: `eslint.ignoreDuringBuilds` and `typescript.ignoreBuildErrors` are both `true` for faster iteration

### Database Workflow

1. Modify `prisma/schema.prisma`
2. Run `npx prisma migrate dev --name description` to create migration
3. Run `npx prisma generate` to update Prisma Client types
4. Restart TypeScript server in your editor for type updates

The Prisma singleton in `src/lib/prisma.ts` prevents multiple instances during Next.js hot-reloading.

## Deployment

The app supports multiple deployment platforms (see `DEPLOYMENT.md`):
- Vercel (recommended) with automatic PostgreSQL provisioning
- Docker via `Dockerfile` and `docker-compose.yml`
- Netlify (config in `netlify.toml`)
- Nexlayer (config in `nexlayer.yaml`)
- Railway, Heroku, DigitalOcean

Key deployment steps:
1. Set environment variables on platform
2. Run `npx prisma migrate deploy` post-deployment
3. Verify database connection via `/api/health` endpoint

## Code Patterns to Follow

### API Route Structure

```typescript
import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    // Validate input
    // Interact with Prisma
    return NextResponse.json({ data }, { status: 200 })
  } catch (error) {
    console.error("Error:", error)
    return NextResponse.json({ error: "Message" }, { status: 500 })
  }
}
```

### Protected Routes

Use `getServerSession(authOptions)` from `next-auth` in Server Components or API routes:

```typescript
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

const session = await getServerSession(authOptions)
if (!session) {
  // Redirect or return unauthorized
}
```

### Prisma Queries

Always use the singleton instance:

```typescript
import { prisma } from "@/lib/prisma"

const cars = await prisma.car.findMany({
  where: { available: true },
  include: { owner: true, reviews: true }
})
```

## Testing & Validation

While there's no test suite configured, when adding features:
1. Test authentication flows (sign up, sign in, sign out)
2. Verify Prisma schema changes with `prisma validate`
3. Check API routes with manual curl/Postman testing
4. Test UI responsiveness across mobile/desktop breakpoints
5. Verify environment variables work in both dev and production builds
