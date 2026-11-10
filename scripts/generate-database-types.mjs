/* global fetch, AbortSignal, process, console */
import { mkdtemp, rename, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, URL } from 'node:url';

const defaultOutput = fileURLToPath(new URL('../src/app/lib/db/database.types.ts', import.meta.url));
const defaultProject = 'golkgpeqenyqrcyawjdt';

// Local regeneration and CI deliberately use the same read-only API. Fetch
// and validate first, then replace atomically so a failed request cannot erase
// the checked-in types as shell redirection could.
export async function generateDatabaseTypes({
  token,
  projectRef = defaultProject,
  outputPath = defaultOutput,
  fetchImpl = fetch,
}) {
  if (!token?.trim()) throw new Error('SUPABASE_ACCESS_TOKEN is required to generate database types.');
  if (!/^[a-z0-9]+$/.test(projectRef)) throw new Error('Invalid SUPABASE_PROJECT_REF.');

  const response = await fetchImpl(
    `https://api.supabase.com/v1/projects/${projectRef}/types/typescript?included_schemas=public%2Cgraphql_public`,
    { headers: { Authorization: `Bearer ${token}` }, signal: AbortSignal.timeout(60_000) },
  );
  if (!response.ok) throw new Error(`Supabase type generation failed (HTTP ${response.status}).`);
  const body = await response.json();
  if (typeof body?.types !== 'string' || !body.types.includes('export type Database =')
      || !body.types.includes('export type Json =')) {
    throw new Error('Supabase returned an invalid generated-types response.');
  }

  const target = path.resolve(outputPath);
  const temporary = await mkdtemp(path.join(path.dirname(target), '.database-types-'));
  try {
    const staged = path.join(temporary, 'database.types.ts');
    await writeFile(staged, body.types, 'utf8');
    await rename(staged, target);
  } finally {
    await rm(temporary, { recursive: true, force: true });
  }
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    const args = process.argv.slice(2);
    if (args.length !== 0 && (args.length !== 2 || args[0] !== '--output' || !args[1])) {
      throw new Error('Usage: node scripts/generate-database-types.mjs [--output PATH]');
    }
    await generateDatabaseTypes({
      token: process.env.SUPABASE_ACCESS_TOKEN,
      projectRef: process.env.SUPABASE_PROJECT_REF || defaultProject,
      outputPath: args[1] || defaultOutput,
    });
    console.log('Generated database types from the Supabase Management API.');
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}
