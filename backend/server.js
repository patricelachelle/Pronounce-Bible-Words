import express from 'express';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 8787;
const apiKey = process.env.GOOGLE_TTS_API_KEY;

app.use(cors());
app.use(express.json({ limit: '1mb' }));

const audioCache = new Map();
const MAX_CACHE_ITEMS = 500;

function makeCacheKey({ word, phonetic, voiceName, languageCode }) {
  return JSON.stringify({
    word: String(word || '').trim().toLowerCase(),
    phonetic: String(phonetic || '').trim().toLowerCase(),
    voiceName: String(voiceName || ''),
    languageCode: String(languageCode || 'en-US'),
  });
}

function buildSynthesisInput(word, phonetic) {
  const cleanWord = String(word || '').trim();
  const cleanPhonetic = String(phonetic || '').trim();

  if (cleanPhonetic) {
    return {
      // Phonetic spelling significantly improves Bible name pronunciation.
      text: `${cleanPhonetic}. ${cleanWord}`,
    };
  }

  return { text: cleanWord };
}

function setCachedValue(key, value) {
  if (audioCache.size >= MAX_CACHE_ITEMS) {
    const firstKey = audioCache.keys().next().value;
    if (firstKey) audioCache.delete(firstKey);
  }
  audioCache.set(key, value);
}

app.post('/api/pronounce', async (req, res) => {
  if (!apiKey) {
    return res.status(500).json({
      error:
        'Pronunciation service is not configured. Missing GOOGLE_TTS_API_KEY on the server.',
    });
  }

  const { word, phonetic = '', languageCode = 'en-US', voiceName = 'en-US-Neural2-F' } = req.body || {};

  if (!word || typeof word !== 'string' || !word.trim()) {
    return res.status(400).json({ error: 'Please provide a valid word.' });
  }

  const cacheKey = makeCacheKey({ word, phonetic, voiceName, languageCode });
  const cached = audioCache.get(cacheKey);
  if (cached) {
    return res.json({ ...cached, cached: true });
  }

  try {
    const response = await fetch(
      `https://texttospeech.googleapis.com/v1/text:synthesize?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          input: buildSynthesisInput(word, phonetic),
          voice: {
            languageCode,
            name: voiceName,
          },
          audioConfig: {
            audioEncoding: 'MP3',
            speakingRate: 0.95,
          },
        }),
      },
    );

    if (!response.ok) {
      const errorPayload = await response.json().catch(() => ({}));
      const message = errorPayload?.error?.message || 'Unable to generate pronunciation audio right now.';
      return res.status(502).json({ error: message });
    }

    const data = await response.json();
    if (!data.audioContent) {
      return res.status(502).json({ error: 'Audio generation failed. Please try again.' });
    }

    const payload = {
      audioContent: data.audioContent,
      mimeType: 'audio/mpeg',
    };

    setCachedValue(cacheKey, payload);
    return res.json({ ...payload, cached: false });
  } catch {
    return res.status(500).json({
      error: 'Unexpected server error while generating pronunciation. Please try again.',
    });
  }
});

app.get('/api/health', (_req, res) => {
  res.json({ ok: true });
});

app.listen(port, () => {
  console.log(`TTS backend listening on http://localhost:${port}`);
});
