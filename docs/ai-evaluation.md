# AI evaluation

This record separates tested software controls from model-quality measurements.
Passing a contract or QC test does not establish that generated prose is true.

## Recorded run

On November 10, 2026, the focused suite below passed **85 tests across 9 files**
against application code at commit `06f7e1c`. The run used Node.js 24.22.1 and
Vitest 3.2.7 with dependencies matching the repository lockfile. This documentation
change does not modify application code or add tests.

The tests use fixed fixtures, including the reference/demo Coconut Cheddar
snapshot, and mocked network responses. They did not call a deployed RAG service,
query a live database, or run a WebGPU language model. The PDF test exercises
headless generation and QC metadata, not visual inspection of every page.

| Test file | Passed |
| --- | ---: |
| [`evidence-assist/evidence-assist.test.ts`](../src/app/lib/evidence-assist/evidence-assist.test.ts) | 9 |
| [`evidence-assist/report-grounding.test.ts`](../src/app/lib/evidence-assist/report-grounding.test.ts) | 5 |
| [`local-llama/report-writer.test.ts`](../src/app/lib/local-llama/report-writer.test.ts) | 8 |
| [`local-llama/runtime.test.ts`](../src/app/lib/local-llama/runtime.test.ts) | 1 |
| [`report-evaluator.test.ts`](../src/app/lib/report-evaluator.test.ts) | 7 |
| [`report-qc/report-qc.test.ts`](../src/app/lib/report-qc/report-qc.test.ts) | 32 |
| [`report-qc/report-qc-v7-regression.test.ts`](../src/app/lib/report-qc/report-qc-v7-regression.test.ts) | 15 |
| [`report-qc/report-qc-render.test.ts`](../src/app/lib/report-qc/report-qc-render.test.ts) | 1 |
| [`rag-client.test.ts`](../src/app/lib/rag-client.test.ts) | 7 |

To reproduce after installing the locked dependencies with pnpm 10:

```bash
pnpm install --frozen-lockfile
node node_modules/vitest/vitest.mjs run \
  src/app/lib/evidence-assist/evidence-assist.test.ts \
  src/app/lib/evidence-assist/report-grounding.test.ts \
  src/app/lib/local-llama/report-writer.test.ts \
  src/app/lib/local-llama/runtime.test.ts \
  src/app/lib/report-evaluator.test.ts \
  src/app/lib/report-qc/report-qc.test.ts \
  src/app/lib/report-qc/report-qc-v7-regression.test.ts \
  src/app/lib/report-qc/report-qc-render.test.ts \
  src/app/lib/rag-client.test.ts
```

## Evaluation categories

### 1. Retrieval accuracy

- **Test input:** A fixed cheese report context and mocked Evidence Assist
  candidates, including eligible literature, duplicates, and ineligible cards.
- **Expected behavior:** Request bounded scientific/method/validation guidance;
  retain at most five distinct eligible sources; return `no_match` when none qualify.
- **Actual behavior:** All five report-grounding tests passed. The request test
  checks `maxCards: 8`, `minimumRelevance: 0.45`, and permitted evidence uses.
- **Pass/fail criteria:** Those assertions must hold for the integration tests.
  They are not a passage-ranking accuracy gate. A retrieval-quality gate still
  needs a frozen corpus, independently reviewed query-to-passage labels, and
  agreed Recall@k and ranking thresholds before evaluating held-out queries.
- **Known limitations:** Retrieval runs in a separate Python service. These
  frontend tests neither execute search nor establish Recall@k, MRR, or nDCG.
  No retrieval-accuracy percentage is claimed from this run.

### 2. Citation validity

- **Test input:** Narrative sections with valid evidence IDs or
  `[evidence:totally.fake.id]`; literature cards with source locators; mocked
  article-opening responses, including stale paths.
- **Expected behavior:** Reject invented evidence IDs, preserve minimal citation
  records, and use authenticated article access with the tested recovery paths.
- **Actual behavior:** The narrative evaluator rejects the fake ID. Grounding
  retains the citation label, sanitized title, and protected source locator while
  discarding raw excerpts. The mocked article-access tests pass.
- **Pass/fail criteria:** Unknown IDs must fail evaluation; writer-safe evidence
  must exclude private retrieval fields; article access must follow the tested
  authentication and recovery behavior. A claim-support review must additionally
  match each material claim to a passage that supports its wording and scope.
- **Known limitations:** These are distinct checks across the narrative evaluator,
  grounding layer, and client. Their passing does not establish that every local
  Llama sentence has a valid citation. Mocked source access does not prove a live
  source exists, and an existing citation does not prove entailment.

### 3. Evidence grounding

- **Test input:** Evidence cards containing private paths, raw excerpts,
  internal notes, and retrieval identifiers; a fixed report context with scores,
  uncertainty, and literature-use boundaries.
- **Expected behavior:** Project only allowed guidance into the writer packet,
  retain `doesNotSupport` limitations, and reject forbidden fields in writer input.
- **Actual behavior:** Projection and packet tests pass. Nested `sourcePath`
  input is rejected; the writer packet excludes source paths, retrieved excerpts,
  and chunk IDs. QC also blocks the tested path/backend/raw-retrieval leakage.
- **Pass/fail criteria:** No prohibited fields in the tested writer packet;
  boundaries retained; the injected leakage cases must fail their guards.
  Generated-claim support still requires comparison with the underlying evidence.
- **Known limitations:** An allowlisted packet constrains the input; it does not
  guarantee that a model obeys it. Pattern-based leakage detection cannot catch
  every paraphrase or unsupported inference. No human-rated grounding rate has
  been established by this run.

### 4. Unsupported claims

- **Test input:** Literature incorrectly labeled `product_specific`; a
  “Consumers prefer this product” claim with zero concept responses, or one
  response plus an unrelated evidence ID; unsupported commercialization wording.
- **Expected behavior:** Fail closed on escalated literature permissions and
  block the tested unsupported claims without changing a valid sensory GO.
- **Actual behavior:** The Evidence Assist parser rejects the permission
  escalation. QC blocks export for the zero- and one-response preference fixtures.
  The one-response test also verifies that sensory GO remains GO. Version 7
  regression tests flag commercialization, packaging, and population-confusion
  examples as blocking errors.
- **Pass/fail criteria:** Every injected prohibited case must trigger its expected
  rejection or export blocker. A clean conditional draft may pass QC but must not
  become `clientReady` merely because its QC score is high.
- **Known limitations:** These are authored negative cases, not a measured model
  hallucination rate or proof of an incident involving users. Novel wording may
  evade the rules; human review remains necessary.

### 5. Output consistency

- **Test input:** Fixed context and structured prose; a short executive summary;
  truncated JSON (`{"executiveSummary":`).
- **Expected behavior:** Preserve complete sections, replace incomplete sections
  with bounded fallback copy, and retain the recorded decision and limitations.
- **Actual behavior:** Writer tests verify that only the short summary is replaced
  in an otherwise complete response, while truncated JSON produces five fallback
  sections. The stage/QC fixtures preserve conditional advancement and distinguish
  sensory GO from launch authorization.
- **Pass/fail criteria:** These deterministic assertions must pass. For a future
  repeated-generation evaluation, hold the packet, model, and sampling settings
  fixed; compare decision, numbers, evidence boundaries, and required limitations
  across runs. Any unsupported material change should fail review even if wording
  differs acceptably.
- **Known limitations:** No repeated live-Llama generation study was run. The
  tests establish fallback and validation behavior, not semantic consistency
  across model runs, devices, or model versions.

## Documented failure fix: incomplete local-model output

The repository records a concrete recovery change in
[`62c94ce — recover incomplete drafts`](https://github.com/FermIQDataTeam/Sensory-Platform/commit/62c94cef4fdfc626bed689db96de7d089c4db241).
This is evidence of an implemented fix and regression coverage; the commit and
tests do not establish how often the failure occurred or whether it affected
external users.

- **Problem:** The writer previously passed model output directly to a strict
  parser. Truncated JSON or missing/short sections could throw instead of
  producing a reviewable draft.
- **Detection evidence:** The parser rejects incomplete prose. Regression tests
  explicitly supply a short summary and truncated JSON. These reproduce the
  failure conditions; no claim is made about who first noticed them.
- **Response:** `resolveLocalReportSections` preserves complete sections and
  supplies deterministic copy from the report snapshot for incomplete sections.
  The writer records a fallback warning and still runs QC, with up to two focused
  correction passes. Critical blockers prevent approval/export; recovery itself
  is not human approval.
- **Verified now:** Both recovery tests pass in the recorded run. One replaces
  only the executive summary; the truncated-JSON case supplies all five sections.
- **Remaining limitation:** Structurally complete prose can still be wrong, and
  deterministic fallback can be less useful than a successful model draft.
  Retrieval relevance and citation presence do not independently establish that
  a generated claim is supported.

## What remains to measure

Before claiming end-to-end AI quality, freeze a versioned evaluation set with
independently reviewed passage and claim-support labels. Include unanswerable
queries, tempting but irrelevant sources, missing evidence, and contradictory
inputs. Record the service/index version, model/settings, retrieved passages,
writer packet, raw output, fallback/repair use, QC findings, and human verdicts.

Report retrieval metrics, supported-claim counts with denominators, unsupported
claim counts, and material disagreements across repeated generations separately.
Set release thresholds before evaluating held-out cases. This repository's
current test counts and internal QC scores are not substitutes for those results.
