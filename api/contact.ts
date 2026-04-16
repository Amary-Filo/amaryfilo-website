// api/contact.ts

import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Resend } from 'resend';

type ContactPayload = {
  type?: string;
  name?: string;
  contact?: string;
  message?: string;
  company?: string; // honeypot
  meta?: {
    timezone?: string;
    timezoneOffset?: number;
    timezoneGMT?: string;
    currentDateTime?: string;
    browserLanguage?: string;
    userAgent?: string;
    referrerUrl?: string;
    currentUrl?: string;
    pageTitle?: string;
    utmSource?: string | null;
    utmMedium?: string | null;
    utmCampaign?: string | null;
    utmContent?: string | null;
    utmTerm?: string | null;
  };
};

const resendApiKey = process.env['RESEND_API_KEY'];
const contactToEmail = process.env['CONTACT_TO_EMAIL'];
const contactFromEmail = process.env['CONTACT_FROM_EMAIL'];

const resend = resendApiKey ? new Resend(resendApiKey) : null;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX_REQUESTS = 5;

// very simple in-memory limiter
// fine for low-traffic portfolio, not perfect across cold starts/regions
const ipStore = new Map<string, { count: number; expiresAt: number }>();

function getClientIp(req: VercelRequest): string {
  const forwarded = req.headers['x-forwarded-for'];
  if (typeof forwarded === 'string' && forwarded.length > 0) {
    return forwarded.split(',')[0].trim();
  }

  const realIp = req.headers['x-real-ip'];
  if (typeof realIp === 'string' && realIp.length > 0) {
    return realIp.trim();
  }

  return 'unknown';
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const record = ipStore.get(ip);

  if (!record || record.expiresAt <= now) {
    ipStore.set(ip, {
      count: 1,
      expiresAt: now + RATE_LIMIT_WINDOW_MS,
    });
    return false;
  }

  if (record.count >= RATE_LIMIT_MAX_REQUESTS) {
    return true;
  }

  record.count += 1;
  return false;
}

function normalizeText(value: unknown): string {
  return typeof value === 'string' ? value.trim() : '';
}

function escapeHtml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function validatePayload(payload: ContactPayload) {
  const name = normalizeText(payload.name);
  const contact = normalizeText(payload.contact);
  const message = normalizeText(payload.message);
  const company = normalizeText(payload.company);

  if (company) {
    return { ok: false as const, status: 200, error: 'OK' };
  }

  if (!name || name.length < 2 || name.length > 120) {
    return { ok: false as const, status: 400, error: 'Invalid name' };
  }

  if (!contact || !EMAIL_RE.test(contact) || contact.length > 200) {
    return { ok: false as const, status: 400, error: 'Invalid contact email' };
  }

  if (!message || message.length < 10 || message.length > 2000) {
    return { ok: false as const, status: 400, error: 'Invalid message' };
  }

  return {
    ok: true as const,
    data: { name, contact, message },
  };
}

function buildSubject(name: string): string {
  return `Portfolio contact form — ${name}`;
}

function buildTextEmail(
  payload: Required<Pick<ContactPayload, 'meta'>> & {
    name: string;
    contact: string;
    message: string;
  },
): string {
  const meta = payload.meta ?? {};

  return [
    'New contact form submission',
    '',
    `Name: ${payload.name}`,
    `Email: ${payload.contact}`,
    '',
    'Message:',
    payload.message,
    '',
    'Meta:',
    `Page: ${meta.pageTitle ?? ''}`,
    `URL: ${meta.currentUrl ?? ''}`,
    `Referrer: ${meta.referrerUrl ?? ''}`,
    `Browser language: ${meta.browserLanguage ?? ''}`,
    `Timezone: ${meta.timezone ?? ''} (${meta.timezoneGMT ?? ''})`,
    `Submitted at: ${meta.currentDateTime ?? ''}`,
    '',
    'UTM:',
    `utm_source: ${meta.utmSource ?? ''}`,
    `utm_medium: ${meta.utmMedium ?? ''}`,
    `utm_campaign: ${meta.utmCampaign ?? ''}`,
    `utm_content: ${meta.utmContent ?? ''}`,
    `utm_term: ${meta.utmTerm ?? ''}`,
  ].join('\n');
}

function buildHtmlEmail(
  payload: Required<Pick<ContactPayload, 'meta'>> & {
    name: string;
    contact: string;
    message: string;
  },
): string {
  const meta = payload.meta ?? {};

  const safeMessage = escapeHtml(payload.message).replace(/\n/g, '<br />');

  return `
    <div style="font-family: Inter, Arial, sans-serif; color: #111; line-height: 1.6;">
      <h2 style="margin: 0 0 16px;">New contact form submission</h2>

      <p style="margin: 0 0 8px;"><strong>Name:</strong> ${escapeHtml(payload.name)}</p>
      <p style="margin: 0 0 8px;"><strong>Email:</strong> ${escapeHtml(payload.contact)}</p>

      <div style="margin: 20px 0;">
        <p style="margin: 0 0 8px;"><strong>Message:</strong></p>
        <div style="padding: 12px 14px; border: 1px solid #ddd; border-radius: 10px; background: #fafafa;">
          ${safeMessage}
        </div>
      </div>

      <hr style="border: 0; border-top: 1px solid #e5e5e5; margin: 24px 0;" />

      <h3 style="margin: 0 0 12px; font-size: 16px;">Meta</h3>
      <p style="margin: 0 0 6px;"><strong>Page:</strong> ${escapeHtml(meta.pageTitle ?? '')}</p>
      <p style="margin: 0 0 6px;"><strong>URL:</strong> ${escapeHtml(meta.currentUrl ?? '')}</p>
      <p style="margin: 0 0 6px;"><strong>Referrer:</strong> ${escapeHtml(meta.referrerUrl ?? '')}</p>
      <p style="margin: 0 0 6px;"><strong>Browser language:</strong> ${escapeHtml(meta.browserLanguage ?? '')}</p>
      <p style="margin: 0 0 6px;"><strong>Timezone:</strong> ${escapeHtml(meta.timezone ?? '')} ${escapeHtml(meta.timezoneGMT ?? '')}</p>
      <p style="margin: 0 0 6px;"><strong>Submitted at:</strong> ${escapeHtml(meta.currentDateTime ?? '')}</p>

      <h3 style="margin: 20px 0 12px; font-size: 16px;">UTM</h3>
      <p style="margin: 0 0 6px;"><strong>utm_source:</strong> ${escapeHtml(meta.utmSource ?? '')}</p>
      <p style="margin: 0 0 6px;"><strong>utm_medium:</strong> ${escapeHtml(meta.utmMedium ?? '')}</p>
      <p style="margin: 0 0 6px;"><strong>utm_campaign:</strong> ${escapeHtml(meta.utmCampaign ?? '')}</p>
      <p style="margin: 0 0 6px;"><strong>utm_content:</strong> ${escapeHtml(meta.utmContent ?? '')}</p>
      <p style="margin: 0 0 6px;"><strong>utm_term:</strong> ${escapeHtml(meta.utmTerm ?? '')}</p>
    </div>
  `;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ ok: false, error: 'Method Not Allowed' });
  }

  if (!resend || !contactToEmail || !contactFromEmail) {
    return res.status(500).json({
      ok: false,
      error: 'Server is not configured',
    });
  }

  const ip = getClientIp(req);

  if (isRateLimited(ip)) {
    return res.status(429).json({
      ok: false,
      error: 'Too many requests',
    });
  }

  const payload = (req.body ?? {}) as ContactPayload;
  const validation = validatePayload(payload);

  if (!validation.ok) {
    if (validation.status === 200) {
      return res.status(200).json({ ok: true });
    }

    return res.status(validation.status).json({
      ok: false,
      error: validation.error,
    });
  }

  const { name, contact, message } = validation.data;
  const meta = payload.meta ?? {};

  try {
    const result = await resend.emails.send({
      from: contactFromEmail,
      to: [contactToEmail],
      replyTo: contact,
      subject: buildSubject(name),
      text: buildTextEmail({ name, contact, message, meta }),
      html: buildHtmlEmail({ name, contact, message, meta }),
    });

    if (result.error) {
      return res.status(502).json({
        ok: false,
        error: result.error.message || 'Email send failed',
      });
    }

    return res.status(200).json({
      ok: true,
      message: 'Message sent successfully',
    });
  } catch (error) {
    console.error('Contact form submit failed:', error);

    return res.status(500).json({
      ok: false,
      error: 'Internal Server Error',
    });
  }
}
