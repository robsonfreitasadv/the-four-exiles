/**
 * Outgoing e-mail: switched off. The project has no domain of its own yet, so nothing can be sent.
 *
 * To switch on (when there is a domain):
 * 1. Add the domain to Cloudflare and turn on Cloudflare Email Service (Email Sending) for it, with the DNS
 *    records it asks for (SPF, DKIM, DMARC).
 * 2. Add the send_email binding to wrangler.toml (e.g. name = "EMAIL", from address no-reply@<domain>) and to Env.
 * 3. Replace the body below with the call to that binding.
 * 4. Then build on it: a confirmation code at sign-up and "forgot my password" (a one-time code stored only as a
 *    hash, valid for 15 minutes, with the same attempt limits as sign-in), and show the link in SignIn.tsx again.
 */
export interface Email {
  to: string;
  subject: string;
  text: string;
}

export class EmailNotConfigured extends Error {
  constructor() {
    super('E-mail não configurado: o projeto ainda não tem domínio próprio (ver functions/_lib/email.ts).');
    this.name = 'EmailNotConfigured';
  }
}

export async function sendEmail(_email: Email): Promise<never> {
  throw new EmailNotConfigured();
}
