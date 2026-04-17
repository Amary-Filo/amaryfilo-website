// api/contact.ts

import type { VercelRequest, VercelResponse } from '@vercel/node';

function escapeHtml(value: string): string {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

module.exports = async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, error: 'Method not allowed' });
  }

  try {
    const { Resend } = await import('resend');

    const resendApiKey = process.env.RESEND_API_KEY;
    const contactToEmail = process.env.CONTACT_TO_EMAIL;
    const contactFromEmail = process.env.CONTACT_FROM_EMAIL;

    console.log('CONTACT API START');
    console.log('has RESEND_API_KEY:', !!resendApiKey);
    console.log('CONTACT_TO_EMAIL:', contactToEmail);
    console.log('CONTACT_FROM_EMAIL:', contactFromEmail);
    console.log('body:', req.body);

    if (!resendApiKey) {
      return res.status(500).json({ ok: false, error: 'Missing RESEND_API_KEY' });
    }

    if (!contactToEmail) {
      return res.status(500).json({ ok: false, error: 'Missing CONTACT_TO_EMAIL' });
    }

    if (!contactFromEmail) {
      return res.status(500).json({ ok: false, error: 'Missing CONTACT_FROM_EMAIL' });
    }

    const body = (req.body ?? {}) as {
      name?: string;
      contact?: string;
      message?: string;
      type?: string;
      meta?: Record<string, unknown>;
    };

    const name = typeof body.name === 'string' ? body.name.trim() : '';
    const contact = typeof body.contact === 'string' ? body.contact.trim() : '';
    const message = typeof body.message === 'string' ? body.message.trim() : '';
    const type = typeof body.type === 'string' ? body.type : 'question';
    const meta = body.meta ?? {};

    if (!name || !contact || !message) {
      return res.status(400).json({
        ok: false,
        error: 'Name, contact, and message are required',
      });
    }

    const resend = new Resend(resendApiKey);

    const subject = `[amaryfilo.com] New message from ${name}`;

    const html = `
      <h2>New contact form submission</h2>
      <p><strong>Type:</strong> ${escapeHtml(type)}</p>
      <p><strong>Name:</strong> ${escapeHtml(name)}</p>
      <p><strong>Contact:</strong> ${escapeHtml(contact)}</p>
      <p><strong>Message:</strong></p>
      <p>${escapeHtml(message).replace(/\n/g, '<br />')}</p>
      <hr />
      <h3>Meta</h3>
      <pre style="white-space: pre-wrap; font-family: monospace;">${escapeHtml(
        JSON.stringify(meta, null, 2),
      )}</pre>
    `;

    const { data, error } = await resend.emails.send({
      from: contactFromEmail,
      to: contactToEmail,
      subject,
      html,
      replyTo: contact,
    });

    console.log('RESEND DATA:', data);
    console.log('RESEND ERROR:', error);

    if (error) {
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
