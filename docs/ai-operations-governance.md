# AI operations governance

## Current controls

- Authenticated research requests carry a unique request ID and a bounded
  per-operation deadline. The default is 30 seconds; longer report and import
  operations opt into higher limits capped at five minutes.
- Caller cancellation is forwarded, and timeouts fail with a clear error.
- Commercialization-report prose is written in the administrator's browser with
  a WebGPU-backed Llama model; it is not sent to OpenAI.
- A verified writer packet limits the local model to approved facts, claims,
  decisions, limitations, and actions.
- Deterministic quality checks validate the report and can request up to two
  focused local correction passes.
- Missing or malformed model sections receive evidence-bounded deterministic
  copy and a visible warning; critical quality findings block approval and
  export.
- Saved reports record model identity, token counts, correction count, execution
  location, and external model cost.
- Concept-image generation is authenticated and subject to tenant controls,
  budgets, audit records, and server-side enforcement.

## Boundaries

The remote research service supports Evidence Assist, literature management,
and diagnostics. The existing Vercel path and the AWS development path are
described in the [deployment topology](operations-runbook.md#deployment-topology).
On AWS, CloudFront routes `/api/*` to the service. The Python implementation and
shared AWS infrastructure live in a separate private repository; both deployment
paths are distinct from report writing in the administrator's browser.

Local report generation requires WebGPU, sufficient storage, and compatible
graphics memory. If the model cannot start or generation is cancelled, the
report is not saved. Partial structured output may use governed fallback copy,
but it remains subject to the same quality and release gates.

Hosted AI usage is recorded, but organization-wide budget and concurrency
guarantees are not claimed for every hosted feature. Any future expansion of
those controls requires a schema migration, regenerated database types,
tenant-isolation tests, and server-side enforcement before contacting a model.
