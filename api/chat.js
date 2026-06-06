// ─────────────────────────────────────────────
//  Ask Jakov AI — Vercel Serverless Function
//  Protection: rate limiting, cooldown, sanitization, Turnstile (optional)
// ─────────────────────────────────────────────

const SYSTEM_PROMPT = `You are Ask Jakov AI, the virtual assistant of Jakov Maračić.

INSTRUCTIONS:
- Always prioritize the knowledge base below when answering questions about Jakov, his services, pricing, portfolio, process, and contact information.
- If information is not available in the knowledge base, politely tell the user to contact Jakov directly through the website contact form.
- Do not invent facts. Never guess prices, timelines, or details not listed here.
- Respond in the same language the user writes in (Croatian, English, or German).

---

GENERAL INFORMATION

Name: Jakov Maračić

Jakov has been building websites for approximately 2 years as a side business and passion project.

Languages:
* Croatian
* English
* German

SERVICES

Jakov creates modern websites for:
* Restaurants
* Cafes and bars
* Apartments and holiday rentals
* Hair salons and barbershops
* Tradesmen and local service businesses
* Small businesses and local companies

Main service: Professional websites

Applications: Possible, but require a separate discussion depending on project complexity.

Additional services:
* Hosting setup
* Domain setup
* Website deployment
* Future upgrades and improvements

WHY CHOOSE JAKOV
* Affordable pricing
* Flexible and easy communication
* Fast turnaround
* Modern designs
* Mobile-friendly websites
* Personal approach
* Quick demo creation
* Focus on helping local businesses get more customers

Jakov understands that many local businesses need a professional online presence without spending thousands of euros.

PROCESS
1. Client contacts Jakov.
2. Discussion about needs and goals.
3. Demo website can usually be created within 1–2 days.
4. Full website is typically completed within one week or less.
5. Client reviews the website.
6. Changes are made if needed.
7. Domain and hosting are set up.
8. Website goes live.

PRICING
Pricing depends on: project complexity, number of pages, required features, type of business.
There is no fixed price because every project is different.
Jakov is flexible and tries to find a solution that fits the client's budget.

PAYMENT
Accepted payment methods: Cash, Card

DOMAIN AND HOSTING
The first year of domain setup is included.
After that, domain maintenance is typically around €20 per year.
Website maintenance is optional and can be arranged separately.

WEBSITE FEATURES
All websites are: mobile-friendly, tablet-friendly, desktop-friendly, fast loading, modern looking, professionally structured, built to help businesses gain visibility online.

SEO
Basic SEO practices are included to help businesses appear on Google and improve online visibility.

PORTFOLIO
Examples of previous work are available on the portfolio website.
Jakov has experience creating websites for: restaurants, apartments, hair salons, local businesses.

CONTACT
Contact information can be found at the bottom of the website.
Jakov usually responds the same day.
International projects are possible, but communication usually starts through messages first.

COMMON QUESTIONS

Why do I need a website if I already have Instagram?
A website makes your business look more professional, easier to find on Google, and gives customers a central place to learn about your services, prices, location, and contact details.

Can I edit the website myself?
In many cases yes. Depending on the project, Jakov can provide files or solutions that allow future edits.

Can you make something similar to a website I like?
Yes. Clients can send examples and inspiration, and Jakov can create a similar style adapted to their business.

Do I need professional photos?
Not necessarily. Existing photos can often be used. If better photos are available, they can improve the final result.

Do you create logos?
No. Logo design is not currently offered.

Can I see a demo first?
Yes. Jakov can usually create a demo version before finalizing the project.

How quickly can we start?
Immediately. Just send a message and discuss your project.

What information do you need?
Usually: business information, services offered, contact information, photos (if not already available online), any special requests.

If you do not know an answer, politely suggest contacting Jakov directly through the website contact information.

Keep answers: friendly, professional, concise, helpful, sales-oriented without being pushy.`;

// ─────────────────────────────────────────────
//  Rate limiting config
// ─────────────────────────────────────────────
const HOURLY_LIMIT = 50;
const COOLDOWN_MS  = 2000;
const MAX_MSG_LEN  = 500;
const MAX_HISTORY  = 20;
const WINDOW_MS    = 60 * 60 * 1000;

// In-memory store — best-effort for serverless (resets on cold start).
const ipStore = new Map();

function getRateEntry(ip) {
  const now   = Date.now();
  const entry = ipStore.get(ip);
  if (!entry || now - entry.windowStart > WINDOW_MS) {
    return { count: 0, windowStart: now, lastRequest: 0 };
  }
  return entry;
}

function saveRateEntry(ip, entry) {
  ipStore.set(ip, entry);
  if (ipStore.size > 5000) {
    const now = Date.now();
    for (const [key, val] of ipStore) {
      if (now - val.windowStart > WINDOW_MS) ipStore.delete(key);
    }
  }
}

// ─────────────────────────────────────────────
//  Helpers
// ─────────────────────────────────────────────
function getIP(req) {
  return (
    req.headers['x-forwarded-for']?.split(',')[0]?.trim() ||
    req.headers['x-real-ip'] ||
    req.socket?.remoteAddress ||
    'unknown'
  );
}

function sanitize(text) {
  return text
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '')
    .replace(/<[^>]*>/g, '')
    .replace(/\s{4,}/g, '   ')
    .trim()
    .slice(0, MAX_MSG_LEN);
}

// ─────────────────────────────────────────────
//  Cloudflare Turnstile verification (optional)
//  Activate by setting TURNSTILE_SECRET_KEY in Vercel env vars.
// ─────────────────────────────────────────────
async function verifyTurnstile(token, ip) {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return true;

  try {
    const res = await fetch('https://challenges.cloudflare.com/turnstile/v1/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ secret, response: token, remoteip: ip }),
    });
    const data = await res.json();
    return data.success === true;
  } catch (err) {
    console.error('[TURNSTILE] Verification request failed:', err.message);
    return false;
  }
}

// ─────────────────────────────────────────────
//  Handler
// ─────────────────────────────────────────────
module.exports = async function handler(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const ip  = getIP(req);
  const now = Date.now();

  const friendly = (msg) => res.status(200).json({ reply: msg });

  // ── 1. Parse body ────────────────────────────
  let messages, turnstileToken;
  try {
    const parsed   = req.body || {};
    messages       = parsed.messages;
    turnstileToken = parsed.turnstileToken || null;
  } catch {
    console.warn(`[ABUSE] IP ${ip} — invalid body`);
    return friendly('Neispravan zahtjev. Osvježite stranicu i pokušajte ponovo.');
  }

  // ── 2. Validate message structure ────────────
  if (!Array.isArray(messages) || messages.length === 0) {
    return friendly('Poruka ne može biti prazna.');
  }

  if (messages.length > MAX_HISTORY) {
    messages = messages.slice(-MAX_HISTORY);
  }

  const lastMsg = messages[messages.length - 1];
  const rawText = lastMsg?.parts?.[0]?.text ?? '';

  if (!rawText.trim()) {
    return friendly('Poruka ne može biti prazna.');
  }

  // ── 3. Max length check ──────────────────────
  if (rawText.length > MAX_MSG_LEN) {
    console.warn(`[ABUSE] IP ${ip} — oversized message: ${rawText.length} chars`);
    return friendly(`Poruka je preduga. Maksimalno ${MAX_MSG_LEN} znakova.`);
  }

  // ── 4. Sanitize input ────────────────────────
  const cleanText = sanitize(rawText);
  if (!cleanText) {
    return friendly('Poruka ne može biti prazna.');
  }
  messages[messages.length - 1].parts[0].text = cleanText;

  // ── 5. Rate limiting ─────────────────────────
  const entry = getRateEntry(ip);

  if (entry.lastRequest && now - entry.lastRequest < COOLDOWN_MS) {
    const remaining = Math.ceil((COOLDOWN_MS - (now - entry.lastRequest)) / 1000);
    console.warn(`[ABUSE] IP ${ip} — cooldown violation`);
    return friendly(`Previše brzo. Pričekajte ${remaining}s prije sljedeće poruke.`);
  }

  if (entry.count >= HOURLY_LIMIT) {
    console.warn(`[ABUSE] IP ${ip} — hourly limit reached: ${entry.count}`);
    return friendly(`Dosegli ste limit od ${HOURLY_LIMIT} poruka na sat. Molim kontaktirajte Jakova direktno putem kontakt forme.`);
  }

  // ── 6. Turnstile verification (if activated) ─
  if (process.env.TURNSTILE_SECRET_KEY) {
    if (!turnstileToken) {
      console.warn(`[ABUSE] IP ${ip} — missing Turnstile token`);
      return friendly('Sigurnosna provjera nije prošla. Osvježite stranicu i pokušajte ponovo.');
    }
    const valid = await verifyTurnstile(turnstileToken, ip);
    if (!valid) {
      console.warn(`[ABUSE] IP ${ip} — Turnstile verification failed`);
      return friendly('Sigurnosna provjera nije prošla. Osvježite stranicu i pokušajte ponovo.');
    }
  }

  // ── 7. Update rate entry ─────────────────────
  saveRateEntry(ip, {
    count:       entry.count + 1,
    windowStart: entry.windowStart || now,
    lastRequest: now,
  });

  // ── 8. Gemini API ────────────────────────────
  const API_KEY = process.env.GEMINI_API_KEY;
  if (!API_KEY) {
    console.warn('[CONFIG] GEMINI_API_KEY not set');
    return friendly('Asistent trenutno nije dostupan. Molim kontaktirajte Jakova direktno putem kontakt forme na dnu stranice.');
  }

  try {
    const geminiRes = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          system_instruction: { parts: [{ text: SYSTEM_PROMPT }] },
          contents: messages,
          generationConfig: { maxOutputTokens: 600, temperature: 0.7 },
        }),
      }
    );

    if (!geminiRes.ok) {
      const errText = await geminiRes.text();
      console.error(`[GEMINI] API error ${geminiRes.status}:`, errText);
      return friendly('Asistent je trenutno nedostupan. Molim pokušajte za koji trenutak ili kontaktirajte Jakova direktno.');
    }

    const data  = await geminiRes.json();
    const reply = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim() ||
      'Žao mi je, ne mogu odgovoriti trenutno. Kontaktirajte Jakova direktno putem kontakt forme.';

    return res.status(200).json({ reply });

  } catch (err) {
    console.error('[FUNCTION] Unhandled error:', err.message);
    return friendly('Nešto je pošlo po krivu. Molim kontaktirajte Jakova direktno putem kontakt forme.');
  }
};
