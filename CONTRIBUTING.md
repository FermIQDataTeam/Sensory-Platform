# Contributing

## Set up the project

Requirements:

- Node.js 22.13–24
- pnpm 10
- Supabase CLI for database work

```bash
corepack enable
pnpm install
pnpm dev
```

Add the required Supabase browser configuration to an untracked `.env` file as
described in the README before starting the development server.

Keep changes focused, preserve unrelated work in the repository, and include
tests or documentation when behavior changes.

## Before opening a pull request

Run the checks that match the change. The standard local set is:

```bash
pnpm check:runtime
pnpm typecheck
pnpm lint
pnpm test
pnpm build
```

Also run:

- `pnpm test:coverage` for domain or AI-contract changes;
- `pnpm test:e2e` for user-facing workflows;
- `pnpm test:rls:local` for authentication, authorization, or data-access work;
- `pnpm test:migration-drift` for migration-checking scripts.

## Database changes

The database schema is the source of truth. Do not create client-side substitutes
for missing schema behavior.

1. Inspect the linked live schema before writing a migration.
2. Add a forward migration in `supabase/migrations/` using the existing
   `YYYYMMDDHHMMSS_snake_case.sql` naming convention.
3. Apply the migration in the intended release order.
4. Regenerate types from the live schema with `pnpm db:types`. Set
   `SUPABASE_ACCESS_TOKEN` in your shell; do not commit it. The command defaults
   to the production project used by CI; set `SUPABASE_PROJECT_REF` explicitly
   when targeting another project. Both local generation and CI use the same
   read-only Supabase Management API for `public` and `graphql_public`.
5. Never edit `src/app/lib/db/database.types.ts` by hand.
6. Run the generated-type, migration-drift, tenant-isolation, type, test, and
   build checks that apply.

If the live schema, migrations, generated types, and application code disagree,
stop and document the mismatch before attempting a fix.

CI fails closed on `main` when the linked production schema is ahead of the
branch or generated database types are stale. Never apply a production migration
ahead of the code that depends on it.

Type generation validates the API response before replacing the file, so a
failed request leaves the current types intact. Run `pnpm test:db-types` when
changing that generator. If CI detects drift, its `generated-database-types`
artifact preserves the exact output for inspection; review the complete diff
and project identity before adopting it. Generator metadata or formatting can
also change without a database migration, so investigate rather than hand-edit
the file or weaken the comparison.

## Product invariants

- `projects` is the canonical project identity.
- Organization and role boundaries must remain enforced by Row Level Security.
- A confirmed GO decision is required before concept and commercialization-report
  work.
- Demo or reference evidence must remain visibly separated from evidence that
  can support client release.
- Important AI output remains reviewable and bounded by deterministic validation.

## Pull requests

Use the pull request template. Describe the completed behavior, evidence or
schema impact, verification performed, and the safest rollback path. Never add
real client data, panelist data, personal credentials, or server secrets to a
commit.
