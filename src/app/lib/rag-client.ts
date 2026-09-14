import { supabase } from './supabase';

const LOCAL_RAG_BASE_URL = 'http://127.0.0.1:8000';
const DEFAULT_RAG_TIMEOUT_MS = 30_000;
const MAX_RAG_TIMEOUT_MS = 300_000;

export interface RagRequestInit extends RequestInit {
  /** Caller deadline. Longer report workflows can opt in up to five minutes. */
  timeoutMs?: number;
}

/** Resolve the Food RAG service without allowing localhost in production. */
export function ragBaseUrl(): string {
  const configured = (import.meta.env.VITE_NFI_RAG_URL as string | undefined)?.trim().replace(/\/$/, '');
  if (configured) return configured;
  if (import.meta.env.DEV || import.meta.env.MODE === 'test') return LOCAL_RAG_BASE_URL;
  throw new Error('VITE_NFI_RAG_URL is required for production Evidence Assist requests.');
}

function requestId() {
  return typeof globalThis.crypto?.randomUUID === 'function'
    ? globalThis.crypto.randomUUID()
    : `rag-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

/**
 * Shared authenticated transport for the separate RAG service. Supabase JWTs
 * carry the tenant and role claims supplied by the access-token hook. Cookies
 * stay disabled so browser calls use one auditable authentication mechanism.
 */
/**
 * CloudFront reaches the RAG API through a Lambda function URL protected by an
 * Origin Access Control, which signs every origin request with SigV4. Lambda
 * does not accept unsigned payloads, so a request carrying a body must present
 * a SHA-256 of that body in `x-amz-content-sha256` or the origin rejects the
 * signature with a 403 before the application ever sees it.
 *
 * GET and HEAD carry no body and need nothing.
 *
 * https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/private-content-restricting-access-to-lambda.html
 */
async function addBodyHash(headers: Headers, body: BodyInit | null | undefined): Promise<void> {
  if (body === null || body === undefined) return;
  if (headers.has('x-amz-content-sha256')) return;

  let bytes: Uint8Array;
  if (typeof body === 'string') {
    bytes = new TextEncoder().encode(body);
  } else if (body instanceof Uint8Array) {
    bytes = body;
  } else if (body instanceof ArrayBuffer) {
    bytes = new Uint8Array(body);
  } else if (body instanceof Blob) {
    bytes = new Uint8Array(await body.arrayBuffer());
  } else {
    // FormData, URLSearchParams and ReadableStream serialise in ways we cannot
    // reproduce here without consuming the body. Nothing in this client sends
    // those today; if that changes, serialise to a string or Blob first rather
    // than letting the request fail at the origin with an opaque 403.
    throw new Error(
      'Evidence Assist requests must use a string, Blob or buffer body so the payload hash can be computed.',
    );
  }

  const digest = await crypto.subtle.digest('SHA-256', bytes as unknown as ArrayBuffer);
  const hex = Array.from(new Uint8Array(digest))
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('');
  headers.set('x-amz-content-sha256', hex);
}

export async function ragFetch(path: string, init: RagRequestInit = {}): Promise<Response> {
  const { data, error } = await supabase.auth.getSession();
  if (error) throw new Error(`Unable to authenticate the Evidence Assist request: ${error.message}`);

  const accessToken = data.session?.access_token;
  if (!accessToken && import.meta.env.PROD) {
    throw new Error('An authenticated session is required to use Evidence Assist.');
  }

  const headers = new Headers(init.headers);
  if (!headers.has('Accept')) headers.set('Accept', 'application/json');
  if (!headers.has('X-Request-ID')) headers.set('X-Request-ID', requestId());
  if (accessToken) headers.set('Authorization', `Bearer ${accessToken}`);
  await addBodyHash(headers, init.body);

  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  const timeoutMs = Math.min(
    MAX_RAG_TIMEOUT_MS,
    Math.max(1, Number.isFinite(init.timeoutMs) ? Number(init.timeoutMs) : DEFAULT_RAG_TIMEOUT_MS),
  );
  const controller = new AbortController();
  const callerSignal = init.signal;
  let timedOut = false;
  const forwardAbort = () => controller.abort(callerSignal?.reason);
  if (callerSignal?.aborted) forwardAbort();
  else callerSignal?.addEventListener('abort', forwardAbort, { once: true });
  const timeout = globalThis.setTimeout(() => {
    timedOut = true;
    controller.abort();
  }, timeoutMs);
  const { timeoutMs: _timeoutMs, signal: _signal, ...fetchInit } = init;

  try {
    return await fetch(`${ragBaseUrl()}${normalizedPath}`, {
      ...fetchInit,
      headers,
      signal: controller.signal,
      credentials: 'omit',
    });
  } catch (error) {
    if (timedOut) {
      throw Object.assign(
        new Error(`Evidence Assist request timed out after ${timeoutMs} ms.`),
        { cause: error },
      );
    }
    throw error;
  } finally {
    globalThis.clearTimeout(timeout);
    callerSignal?.removeEventListener('abort', forwardAbort);
  }
}

type ResearchSourceInput = {
  sourcePath: string;
  title: string;
  excerpt?: string;
};

class ArticleViewerError extends Error {
  constructor(readonly status: number) {
    super(`Article viewer unavailable (${status}).`);
  }
}

async function loadIndexedSource(input: ResearchSourceInput, opened: Window | null) {
  const params = new URLSearchParams({ source_path: input.sourcePath, title: input.title });
  if (input.excerpt) params.set('excerpt', input.excerpt);
  const response = await ragFetch(`/source?${params.toString()}`, { headers: { Accept: 'text/html' } });
  if (!response.ok) throw new ArticleViewerError(response.status);
  const objectUrl = URL.createObjectURL(new Blob([await response.text()], { type: 'text/html' }));
  if (opened) opened.location.href = objectUrl;
  else window.open(objectUrl, '_blank', 'noopener,noreferrer');
  window.setTimeout(() => URL.revokeObjectURL(objectUrl), 60_000);
}

/** Open an authenticated source document without placing credentials in a URL. */
export async function openRagSource(input: ResearchSourceInput): Promise<void> {
  if (!input.sourcePath.trim()) throw new Error('This article does not have a saved source location.');
  const opened = window.open('about:blank', '_blank');
  if (opened) opened.opener = null;
  try {
    await loadIndexedSource(input, opened);
  } catch (error) {
    opened?.close();
    throw error;
  }
}

function normalizedSourceTitle(value: string) {
  return value
    .toLowerCase()
    .split(/[\\/]/)
    .pop()
    ?.replace(/\.(?:pdf|docx?|txt)$/i, '')
    .replace(/\s*\(\d+\)\s*$/, '')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim() ?? '';
}

async function resolveSourcePathByTitle(input: ResearchSourceInput) {
  const response = await ragFetch('/api/library/documents');
  if (!response.ok) throw new Error(`Article library unavailable (${response.status}).`);
  const payload = await response.json() as {
    documents?: Array<{ title?: string; filename?: string; corpusPath?: string; originalPath?: string }>;
  };
  const target = normalizedSourceTitle(input.title);
  const match = (payload.documents ?? []).find(document => {
    const candidates = [document.title, document.filename].filter((value): value is string => Boolean(value));
    return candidates.some(value => {
      const candidate = normalizedSourceTitle(value);
      return candidate === target
        || (candidate.length >= 8 && target.length >= 8
          && (candidate.includes(target) || target.includes(candidate)));
    });
  });
  const resolved = match?.corpusPath || match?.originalPath || '';
  if (!resolved) throw new Error('The approved article is no longer linked to a source file.');
  return resolved;
}

async function resolveLegacySourcePath(input: ResearchSourceInput) {
  if (!/^(?:approved nfi literature library|verified local|verified literature|literature source)/i.test(input.sourcePath)) {
    return input.sourcePath;
  }
  return resolveSourcePathByTitle(input);
}

async function openResolvedResearchSource(input: ResearchSourceInput, opened: Window | null) {
  const storagePrefix = 'supabase://literature-imports/';
  if (!input.sourcePath.startsWith(storagePrefix)) {
    await loadIndexedSource(input, opened);
    return;
  }
  const storagePath = input.sourcePath.slice(storagePrefix.length);
  const { data, error } = await supabase.storage.from('literature-imports').createSignedUrl(storagePath, 300);
  if (error) throw error;
  if (opened) opened.location.href = data.signedUrl;
  else window.open(data.signedUrl, '_blank', 'noopener,noreferrer');
}

/** Opens either an uploaded publication or an indexed library source. */
export async function openResearchSource(input: ResearchSourceInput): Promise<void> {
  if (!input.sourcePath.trim()) throw new Error('This article does not have a saved source location.');
  const opened = window.open('about:blank', '_blank');
  if (opened) opened.opener = null;
  try {
    const sourcePath = await resolveLegacySourcePath(input);
    try {
      await openResolvedResearchSource({ ...input, sourcePath }, opened);
    } catch (error) {
      if (!(error instanceof ArticleViewerError) || ![404, 410].includes(error.status)) throw error;
      const repairedPath = await resolveSourcePathByTitle(input);
      if (repairedPath === sourcePath) throw error;
      await openResolvedResearchSource({ ...input, sourcePath: repairedPath }, opened);
    }
  } catch (error) {
    opened?.close();
    throw error;
  }
}
