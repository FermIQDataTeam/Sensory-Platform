import assert from 'node:assert/strict';
import { mkdtemp, readFile, readdir, rm, writeFile } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { test } from 'node:test';
import { generateDatabaseTypes } from './generate-database-types.mjs';

async function fixture(t) {
  const directory = await mkdtemp(path.join(os.tmpdir(), 'database-types-test-'));
  t.after(() => rm(directory, { recursive: true, force: true }));
  const outputPath = path.join(directory, 'database.types.ts');
  await writeFile(outputPath, 'existing types');
  return { directory, outputPath };
}

test('writes exact API bytes with both schemas and cleans temporary files', async t => {
  const { directory, outputPath } = await fixture(t);
  const types = 'export type Json = string\nexport type Database = { public: {} }\n';
  await generateDatabaseTypes({
    token: 'test-token', projectRef: 'testproject', outputPath,
    fetchImpl: async (url, options) => {
      assert.equal(url, 'https://api.supabase.com/v1/projects/testproject/types/typescript?included_schemas=public%2Cgraphql_public');
      assert.equal(options.headers.Authorization, 'Bearer test-token');
      return { ok: true, json: async () => ({ types }) };
    },
  });
  assert.equal(await readFile(outputPath, 'utf8'), types);
  assert.deepEqual(await readdir(directory), ['database.types.ts']);
});

test('missing credentials fail before network or file changes', async t => {
  const { outputPath } = await fixture(t);
  await assert.rejects(generateDatabaseTypes({
    outputPath,
    fetchImpl: () => assert.fail('must not call the API'),
  }), /SUPABASE_ACCESS_TOKEN is required/);
  assert.equal(await readFile(outputPath, 'utf8'), 'existing types');
});

for (const [name, response, message] of [
  ['HTTP error', { ok: false, status: 401 }, /HTTP 401/],
  ['invalid JSON', { ok: true, json: async () => { throw new SyntaxError('Invalid JSON'); } }, /Invalid JSON/],
  ['missing types', { ok: true, json: async () => ({ message: 'no types' }) }, /invalid generated-types/],
  ['empty types', { ok: true, json: async () => ({ types: '' }) }, /invalid generated-types/],
]) {
  test(`${name} preserves the existing file`, async t => {
    const { directory, outputPath } = await fixture(t);
    await assert.rejects(generateDatabaseTypes({
      token: 'test-token', outputPath, fetchImpl: async () => response,
    }), message);
    assert.equal(await readFile(outputPath, 'utf8'), 'existing types');
    assert.deepEqual(await readdir(directory), ['database.types.ts']);
  });
}
