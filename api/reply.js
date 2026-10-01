const MODEL_ORDER = [
  'gemini-3.8-flash',
  'gemini-3.5-flash-lite',
  'gemini-3.6-flash',
  'gemini-3.5-flash'
];

const RETRYABLE_STATUS = new Set([404, 408, 429, 500, 502, 503, 504]);

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store, max-age=0');
  res.setHeader('Content-Type', 'application/json; charset=utf-8');

  if (req.method === 'OPTIONS') {
    res.setHeader('Allow', 'POST, OPTIONS');
    return res.status(204).end();
  }

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST, OPTIONS');
    return res.status(405).json({ error: 'Method not allowed.' });
  }

  const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_AI_API_KEY || process.env.GOOGLE_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'Willow AI is not configured.' });
  }

  const parts = Array.isArray(req.body?.parts) ? req.body.parts : [];
  if (!parts.length) {
    return res.status(400).json({ error: 'Nothing to generate from.' });
  }

  const requestStarted = Date.now();
  const hardBudgetMs = 28500;
  let lastProviderStatus = 502;
  let lastProviderMessage = '';
  let retryAfterSeconds = null;

  for (let index = 0; index < MODEL_ORDER.length; index += 1) {
    const model = MODEL_ORDER[index];
    const elapsed = Date.now() - requestStarted;
    const remaining = hardBudgetMs - elapsed;
    if (remaining < 1800) break;

    const attemptTimeout = Math.min(index === 0 ? 9000 : 6500, remaining - 500);
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), attemptTimeout);

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent?key=${encodeURIComponent(apiKey)}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          signal: controller.signal,
          body: JSON.stringify({
            contents: [{ role: 'user', parts }],
            generationConfig: {
              temperature: 0.9,
              maxOutputTokens: 2200,
              responseMimeType: 'application/json'
            }
          })
        }
      );

      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        lastProviderStatus = response.status;
        lastProviderMessage = data?.error?.message || `Gemini ${model} request failed.`;
        const retryHeader = response.headers.get('retry-after');
        if (retryHeader) retryAfterSeconds = Number(retryHeader) || retryAfterSeconds;

        console.warn('Willow Gemini fallback', {
          model,
          status: response.status,
          message: lastProviderMessage.slice(0, 240)
        });

        if (RETRYABLE_STATUS.has(response.status)) continue;
        return res.status(response.status).json({ error: providerMessageForStatus(response.status) });
      }

      const text = data?.candidates?.[0]?.content?.parts?.map(part => part.text || '').join('').trim();
      if (!text) {
        lastProviderStatus = 502;
        lastProviderMessage = `Gemini ${model} returned no text.`;
        continue;
      }

      const parsed = parseJson(text);
      const replies = normaliseReplies(parsed?.replies);
      if (!replies.length) {
        lastProviderStatus = 502;
        lastProviderMessage = `Gemini ${model} returned unusable JSON.`;
        continue;
      }

      return res.status(200).json({ replies, model });
    } catch (error) {
      if (error?.name === 'AbortError') {
        lastProviderStatus = 504;
        lastProviderMessage = `${model} timed out.`;
        console.warn('Willow Gemini timeout', { model, attemptTimeout });
        continue;
      }

      lastProviderStatus = 502;
      lastProviderMessage = error?.message || String(error);
      console.error('Willow Gemini error', { model, error: lastProviderMessage });
      continue;
    } finally {
      clearTimeout(timer);
    }
  }

  console.error('Willow exhausted Gemini fallbacks', {
    status: lastProviderStatus,
    message: lastProviderMessage.slice(0, 300)
  });

  if (lastProviderStatus === 429) {
    return res.status(429).json({
      error: 'Willow has reached its current AI usage limit. Try again shortly.',
      retryAfter: retryAfterSeconds
    });
  }

  if (lastProviderStatus === 503) {
    return res.status(503).json({ error: 'Willow is under heavy demand right now. Try again shortly.' });
  }

  if (lastProviderStatus === 504) {
    return res.status(504).json({ error: 'Willow took too long to respond. Try again.' });
  }

  return res.status(502).json({ error: 'Willow could not generate a response. Try again.' });
}

function parseJson(text) {
  const cleaned = text
    .replace(/^```json\s*/i, '')
    .replace(/^```\s*/i, '')
    .replace(/```$/i, '')
    .trim();

  try {
    return JSON.parse(cleaned);
  } catch {
    const first = cleaned.indexOf('{');
    const last = cleaned.lastIndexOf('}');
    if (first !== -1 && last > first) {
      try { return JSON.parse(cleaned.slice(first, last + 1)); }
      catch { return null; }
    }
    return null;
  }
}

function normaliseReplies(items) {
  if (!Array.isArray(items)) return [];
  return items
    .map((item, index) => {
      if (typeof item === 'string') return { label: `Option ${index + 1}`, text: item.trim() };
      if (!item || typeof item !== 'object') return null;
      const text = String(item.text || item.reply || item.message || '').trim();
      if (!text) return null;
      return {
        label: String(item.label || item.tone || item.category || `Option ${index + 1}`).trim(),
        text
      };
    })
    .filter(Boolean)
    .slice(0, 50);
}

function providerMessageForStatus(status) {
  if (status === 400) return 'Willow could not read that request. Try a shorter message or screenshot.';
  if (status === 401 || status === 403) return 'Willow AI access needs attention.';
  return 'Willow could not generate a response. Try again.';
}
