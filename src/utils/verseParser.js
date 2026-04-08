const WORD_REGEX = /([A-Za-z]+(?:'[A-Za-z]+)?)/g;

function normalizeWord(value) {
  return String(value || '')
    .toLowerCase()
    .replace(/[^a-z']/g, '');
}

export function createWordLookup(words) {
  const lookup = new Map();

  words.forEach((entry) => {
    const normalized = normalizeWord(entry.word);
    if (!normalized || lookup.has(normalized)) return;
    lookup.set(normalized, entry);
  });

  return lookup;
}

export function parseVerse(verseText, wordLookup) {
  if (!verseText) return [];

  const tokens = [];
  let cursor = 0;

  for (const match of verseText.matchAll(WORD_REGEX)) {
    const [rawWord] = match;
    const start = match.index ?? 0;

    if (start > cursor) {
      tokens.push({ text: verseText.slice(cursor, start), isWord: false });
    }

    const normalized = normalizeWord(rawWord);
    const matchedWord = wordLookup.get(normalized) || null;

    tokens.push({
      text: rawWord,
      normalized,
      isWord: true,
      isKnown: Boolean(matchedWord),
      matchedWord,
    });

    cursor = start + rawWord.length;
  }

  if (cursor < verseText.length) {
    tokens.push({ text: verseText.slice(cursor), isWord: false });
  }

  return tokens;
}
