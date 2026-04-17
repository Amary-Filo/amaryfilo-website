// api/contact.ts

import type { VercelRequest, VercelResponse } from '@vercel/node';

type ContactRequestBody = {
  name?: string;
  email?: string;
  message?: string;
  website?: string;
  meta?: Record<string, unknown>;
};

type ContactResponse = { ok: true; id: string | null } | { ok: false; error: string };

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function getString(value: unknown): string {
  return typeof value === 'string' ? value.trim() : '';
}

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

module.exports = async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST')
    return res.status(405).json({ ok: false, error: 'Method not allowed' });

  try {
    const { Resend } = await import('resend');

    const resendApiKey = process.env.RESEND_API_KEY;
    const contactToEmail = process.env.CONTACT_TO_EMAIL;
    const contactFromEmail = process.env.CONTACT_FROM_EMAIL;

    if (!resendApiKey) return res.status(500).json({ ok: false, error: 'Missing RESEND_API_KEY' });

    if (!contactToEmail)
      return res.status(500).json({ ok: false, error: 'Missing CONTACT_TO_EMAIL' });

    if (!contactFromEmail)
      return res.status(500).json({ ok: false, error: 'Missing CONTACT_FROM_EMAIL' });

    const body = (req.body ?? {}) as ContactRequestBody;

    const name = getString(body.name);
    const email = getString(body.email);
    const message = getString(body.message);
    const website = getString(body.website);
    const meta = body.meta ?? {};

    // Honeypot: silently accept bot submissions
    if (website) return res.status(200).json({ ok: true, id: null });

    if (!name || !email || !message)
      return res.status(400).json({
        ok: false,
        error: 'Name, email, and message are required',
      });

    if (!isValidEmail(email))
      return res.status(400).json({
        ok: false,
        error: 'Please provide a valid email address',
      });

    const resend = new Resend(resendApiKey);

    const subject = `[amaryfilo.com] New message from ${name}`;

    const html = `
      <div style="font-family: Inter, Arial, sans-serif; color: #111; line-height: 1.6;">
        <h2 style="margin: 0 0 16px;">New contact form submission</h2>

        <p style="margin: 0 0 8px;"><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p style="margin: 0 0 8px;"><strong>Email:</strong> ${escapeHtml(email)}</p>

        <div style="margin: 20px 0;">
          <p style="margin: 0 0 8px;"><strong>Message:</strong></p>
          <div style="padding: 12px 14px; border: 1px solid #ddd; border-radius: 10px; background: #fafafa;">
            ${escapeHtml(message).replace(/\n/g, '<br />')}
          </div>
        </div>

        <hr style="border: 0; border-top: 1px solid #e5e5e5; margin: 24px 0;" />

        <h3 style="margin: 0 0 12px; font-size: 16px;">Meta</h3>
        <pre style="white-space: pre-wrap; font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: 12px; padding: 12px; border-radius: 10px; background: #fafafa; border: 1px solid #eee;">${escapeHtml(
          JSON.stringify(meta, null, 2),
        )}</pre>
      </div>
    `;

    const { data, error } = await resend.emails.send({
      from: contactFromEmail,
      to: contactToEmail,
      subject,
      html,
      replyTo: email,
    });

    if (error) {
      console.error('Resend send error:', error);

      return res.status(500).json({
        ok: false,
        error: error.message || 'Failed to send email',
      });
    }

    return res.status(200).json({
      ok: true,
      id: data?.id ?? null,
    });
  } catch (error) {
    console.error('CONTACT API FAILED:', error);

    return res.status(500).json({
      ok: false,
      error: error instanceof Error ? error.message : 'Unexpected server error',
    });
  }
};
